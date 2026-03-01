'use client'
/**
 * NauticalRouteMap
 * Real tile-based nautical chart using Leaflet + ESRI Ocean Base tiles.
 * Renders waypoints at their real lat/lon with PINN BOG callouts.
 * SSR-safe: Leaflet only loads in the browser via useEffect.
 */
import { useEffect, useRef } from 'react'

interface Waypoint {
    label: string
    lat: number
    lon: number
    bog: number      // static ERA5 PINN value
    simBog: number   // -1 = not yet revealed
    revealed: boolean
    isProp: boolean
    sst: number
    hs: number
}

interface Props {
    waypoints: Waypoint[]
    // bounding box hint for initial view  
    bounds?: { lonMin: number; lonMax: number; latMin: number; latMax: number }
}

export default function NauticalRouteMap({ waypoints, bounds }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<any>(null)
    const markersRef = useRef<any[]>([])
    const polylineRef = useRef<any>(null)

    // Initialise the map once on mount
    useEffect(() => {
        if (!containerRef.current || mapRef.current) return

        // Dynamic import so Leaflet never runs on the server
        import('leaflet').then((L) => {
            if (!containerRef.current) return

            // Fix React StrictMode double-mount issue
            if ((containerRef.current as any)._leaflet_id) {
                (containerRef.current as any)._leaflet_id = null
            }

            // Fix default icon paths (broken by webpack bundling)
            delete (L.Icon.Default.prototype as any)._getIconUrl
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            })

            // Centre on route midpoint
            const midLat = waypoints.reduce((s, w) => s + w.lat, 0) / waypoints.length
            const midLon = waypoints.reduce((s, w) => s + w.lon, 0) / waypoints.length

            const map = L.map(containerRef.current, {
                center: [midLat, midLon],
                zoom: 4,
                zoomControl: true,
                attributionControl: true,
                scrollWheelZoom: false,
            })
            mapRef.current = map

            // ── TILE LAYERS ──────────────────────────────────────────────────
            // ESRI Ocean Base — real bathymetric nautical chart
            const esriOcean = L.tileLayer(
                'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
                { attribution: 'Tiles © Esri — ESRI Ocean', maxZoom: 13 }
            )
            // ESRI Ocean Reference overlay (labels, depth contours)
            const esriOceanRef = L.tileLayer(
                'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
                { attribution: '', maxZoom: 13, opacity: 0.7 }
            )
            esriOcean.addTo(map)
            esriOceanRef.addTo(map)

            // ── ROUTE POLYLINE ───────────────────────────────────────────────
            const latlngs: [number, number][] = waypoints.map(w => [w.lat, w.lon])
            const poly = L.polyline(latlngs, {
                color: 'rgba(30,80,180,0.5)',
                weight: 2,
                dashArray: '8 6',
            }).addTo(map)
            polylineRef.current = poly

            // ── WAYPOINT MARKERS ─────────────────────────────────────────────
            markersRef.current = waypoints.map((w, i) => {
                const col = bogColor(w.bog)
                const marker = L.circleMarker([w.lat, w.lon], {
                    radius: 10,
                    fillColor: '#1d4ed8',
                    color: '#60a5fa',
                    weight: 2,
                    fillOpacity: 0.85,
                }).addTo(map)

                marker.bindPopup(
                    `<div style="font-family:monospace;font-size:12px;line-height:1.6;min-width:160px">
                        <b style="color:${col}">W${i + 1} — ${w.label}</b><br/>
                        Lat/Lon: ${w.lat.toFixed(1)}° / ${w.lon.toFixed(1)}°<br/>
                        SST: <span style="color:#f97316">${w.sst} °C</span> &nbsp; Hs: <span style="color:#3b82f6">${w.hs} m</span><br/>
                        <b>PINN BOG: <span style="color:${col}">${w.bog.toFixed(5)} %/day</span></b>
                    </div>`,
                    { maxWidth: 220 }
                )
                return marker
            })

            // Fit map to waypoints
            if (bounds) {
                map.fitBounds([
                    [bounds.latMin + 2, bounds.lonMin + 2],
                    [bounds.latMax - 2, bounds.lonMax - 2],
                ])
            } else {
                map.fitBounds(waypoints.map(w => [w.lat, w.lon] as [number, number]))
            }
        })

        return () => {
            mapRef.current?.remove()
            mapRef.current = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Update markers whenever simulation results change
    useEffect(() => {
        if (!mapRef.current || markersRef.current.length === 0) return
        import('leaflet').then((L) => {
            waypoints.forEach((w, i) => {
                const m = markersRef.current[i]
                if (!m) return
                const ab = w.simBog >= 0 ? w.simBog : w.bog
                const col = bogColor(ab)

                m.setStyle({
                    fillColor: w.revealed ? col : '#1d4ed8',
                    color: w.revealed ? col : '#60a5fa',
                    fillOpacity: w.revealed ? 0.92 : 0.5,
                    radius: w.isProp ? 16 : 10,
                })

                // Update popup with simulation result when revealed
                if (w.revealed) {
                    m.setPopupContent(
                        `<div style="font-family:monospace;font-size:12px;line-height:1.6;min-width:180px">
                            <b style="color:${col}">W${i + 1} — ${w.label}</b><br/>
                            Lat/Lon: ${w.lat.toFixed(1)}° / ${w.lon.toFixed(1)}°<br/>
                            SST: <span style="color:#f97316">${w.sst} °C</span> &nbsp; Hs: <span style="color:#3b82f6">${w.hs} m</span><br/>
                            <b>PINN BOG: <span style="color:${col}">${ab.toFixed(5)} %/day</span></b><br/>
                            <span style="color:#64748b;font-size:10px">✓ Computed by Fourier PINN model</span>
                        </div>`
                    )
                }
            })

            // Update route line: glow on revealed segments
            const latlngs: [number, number][] = waypoints.map(w => [w.lat, w.lon])
            if (polylineRef.current) {
                polylineRef.current.setLatLngs(latlngs)
                // Color the line segments by simulation state
                const anyRevealed = waypoints.some(w => w.revealed)
                polylineRef.current.setStyle({
                    color: anyRevealed ? 'rgba(99,179,237,0.9)' : 'rgba(30,80,180,0.5)',
                    weight: anyRevealed ? 2.5 : 2,
                    dashArray: anyRevealed ? undefined : '8 6',
                })
            }
        })
    }, [waypoints])

    return (
        <>
            {/* Leaflet CSS */}
            {/* eslint-disable-next-line @next/next/no-page-custom-font */}
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            />
            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    height: 420,
                    borderRadius: 8,
                    border: '1px solid #0a1f40',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            />
            {/* Overlay: ESRI attribution + technical label */}
            <div style={{
                position: 'relative', marginTop: 4,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <span style={{ fontSize: 8, color: '#334155', fontFamily: 'monospace' }}>
                    Tiles © Esri — ESRI Ocean Base + Reference · EQUIRECTANGULAR
                </span>
                <span style={{ fontSize: 8, color: '#334155', fontFamily: 'monospace' }}>
                    Click waypoints for BOG detail · Scroll to zoom
                </span>
            </div>
        </>
    )
}

function bogColor(bog: number): string {
    return bog > 0.20 ? '#ef4444' : bog > 0.13 ? '#f59e0b' : '#10b981'
}
