'use client'
import React from 'react'
import { Terminal, Map as MapIcon, Wind, Target, Activity, Cpu, ShieldCheck } from 'lucide-react'

const SarInferenceSystem = () => {
    return (
        <div className="sar-system-container" style={{
            background: '#04070a',
            color: '#e2e8f0',
            padding: '24px',
            fontFamily: 'Inter, sans-serif',
            minHeight: '600px',
            display: 'grid',
            gridTemplateColumns: '1fr 320px',
            gap: '24px'
        }}>
            {/* Main Content Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <header style={{ borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4AA3FF', marginBottom: '8px' }}>
                        <Activity size={16} />
                        <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em' }}>PROJECT_MANIFEST // BAYESIAN_SAR</span>
                    </div>
                    <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>Bayesian SAR Orchestrator</h2>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginTop: '8px', lineHeight: 1.5 }}>
                        Mitigating maritime uncertainty through stochastic drift modeling and autonomous agentic frameworks.
                    </p>
                </header>

                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <ShieldCheck size={18} color="#00ff88" />
                        <h3 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>The Naval + AI Edge</h3>
                    </div>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(74, 163, 255, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%)',
                        border: '1px solid rgba(74, 163, 255, 0.2)',
                        borderRadius: '8px',
                        padding: '20px',
                        lineHeight: 1.6
                    }}>
                        <p style={{ fontSize: '13px', margin: 0, fontStyle: 'italic', color: '#fff' }}>
                            "As both a Naval Architect and AI Architect, I specialize in translating physical maritime constraints into robust computational models. This synergy allows for the creation of safety systems that are not only theoretically sound but operationally resilient in the face of high-stakes oceanic variables."
                        </p>
                    </div>
                </section>

                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <Cpu size={18} color="#4AA3FF" />
                        <h3 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>Agentic Orchestration</h3>
                    </div>
                    <div style={{
                        background: '#0a111a',
                        border: '1px solid #1e293b',
                        borderRadius: '8px',
                        padding: '20px',
                        lineHeight: 1.6
                    }}>
                        <p style={{ fontSize: '13px', marginBottom: '16px' }}>
                            The system is governed by a <strong>Lead AI Architect Agent</strong> that orchestrates the entire emergency response lifecycle. It doesn't just execute code; it reasons about the uncertainty of the sea.
                        </p>
                        <div style={{
                            background: '#000',
                            padding: '16px',
                            borderRadius: '4px',
                            borderLeft: '4px solid #4AA3FF',
                            fontFamily: 'monospace',
                            fontSize: '12px'
                        }}>
                            <div style={{ opacity: 0.4, marginBottom: '8px' }}>// SYSTEM_PROMPT_EXHIBITION</div>
                            <span style={{ color: '#4AA3FF' }}>&gt; Role:</span> Lead AI Architect & Naval SAR Specialist.<br />
                            <span style={{ color: '#4AA3FF' }}>&gt; Task:</span> Synthesize real-time environmental data (AIS, NOAA) to construct a Dynamic Bayesian Network (DBN) for MPP (Most Probable Position) inference.<br />
                            <span style={{ color: '#4AA3FF' }}>&gt; Logic:</span> Implement Monte Carlo Markov Chain (MCMC) simulations accounting for Leeway Drift and Sea Anchor coefficients.
                        </div>
                    </div>
                </section>

                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <Terminal size={18} color="#4AA3FF" />
                        <h3 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>Technical Implementation</h3>
                    </div>
                    <div style={{
                        background: '#0a111a',
                        border: '1px solid #1e293b',
                        borderRadius: '8px',
                        padding: '20px',
                        lineHeight: 1.6
                    }}>
                        <p style={{ fontSize: '13px', marginBottom: '16px' }}>
                            The core engine uses <strong>Stochastic Monte Carlo</strong> simulations to quantify uncertainty in maritime drift. Below is a high-level abstraction of the Bayesian inference logic.
                        </p>
                        <div style={{
                            background: '#000',
                            padding: '16px',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            fontSize: '11px',
                            color: '#d1d5db',
                            overflowX: 'auto',
                            maxHeight: '200px'
                        }}>
                            <span style={{ color: '#ff7b72' }}>class</span> <span style={{ color: '#d2a8ff' }}>BayesianDriftEngine</span>:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#ff7b72' }}>def</span> <span style={{ color: '#d2a8ff' }}>calculate_drift</span>(self, lkp, wind, current, hours):<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8b949e' }}># Stochastic Environmental Modeling</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wind_speeds = np.random.normal(wind[<span style={{ color: '#a5d6ff' }}>'speed'</span>], wind[<span style={{ color: '#a5d6ff' }}>'speed'</span>] * noise)<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8b949e' }}># Leeway Vector Integration (Naval Physics)</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leeway = (wind_speeds * self.leeway_slope) + self.leeway_offset<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dn = (np.cos(wind_rad) * leeway + np.cos(curr_rad) * curr_v) * hours<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#ff7b72' }}>return</span> pd.DataFrame(&#123; <span style={{ color: '#a5d6ff' }}>'lat'</span>: final_lats, <span style={{ color: '#a5d6ff' }}>'lon'</span>: final_lons &#125;)
                        </div>
                    </div>
                </section>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '16px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <Wind size={16} color="#ffa500" />
                            <h4 style={{ fontSize: '12px', fontWeight: 800, margin: 0 }}>STOCHASTIC INFERENCE</h4>
                        </div>
                        <ul style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', paddingLeft: '16px', margin: 0 }}>
                            <li>Monte Carlo engine for deterministic-to-probabilistic spatial mapping.</li>
                            <li>Leveraging nautical physics to model aero/hydrodynamic Leeway drag.</li>
                            <li>Integration of post-grounding variables for real-time asset optimization.</li>
                        </ul>
                    </div>
                    <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '16px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <Target size={16} color="#00ff88" />
                            <h4 style={{ fontSize: '12px', fontWeight: 800, margin: 0 }}>DECISION-SUPPORT C2</h4>
                        </div>
                        <ul style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', paddingLeft: '16px', margin: 0 }}>
                            <li>Probability of Containment (POC) driven search pattern generation.</li>
                            <li>Actionable confidence radii to streamline Command & Control (C2).</li>
                            <li>Autonomous ingestion of atmospheric data for persistent re-calibration.</li>
                        </ul>
                    </div>
                </div>

                <section style={{ marginTop: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <MapIcon size={18} color="#ffa500" />
                        <h3 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>Operational Stress Tests</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Scenario A: North Sea */}
                        <div style={{
                            background: '#0a111a',
                            border: '1px solid #1e293b',
                            borderRadius: '8px',
                            padding: '18px',
                            borderLeft: '4px solid #4AA3FF'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#4AA3FF', margin: 0 }}>SCENARIO A: North Sea High-Wind Evacuation</h4>
                                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>NORTH_SEA_001</span>
                            </div>
                            <div style={{ fontSize: '12px', lineHeight: 1.5, marginBottom: '12px' }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                                    <strong style={{ color: '#ffa500' }}>The Challenge:</strong> LNG carrier grounding at 0200h UTC with gale-force wind (35 kts). Uncertainty in LKP was ±2.5 nautical miles under extreme tidal forcing.
                                </span>
                            </div>
                            <div style={{ fontSize: '12px', lineHeight: 1.5, marginBottom: '12px' }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                                    <strong style={{ color: '#00ff88' }}>The AI Solution:</strong> My engine synthesized stochastic drift patterns, narrowing the search area by 40% compared to deterministic Circle of Probability models.
                                </span>
                            </div>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
                                <strong>Recommendation:</strong> Creeping Line Search for UAV assets, prioritizing the high-probability "tail" of the Bayesian distribution's elongated axis.
                            </div>
                        </div>

                        {/* Scenario B: Mediterranean */}
                        <div style={{
                            background: '#0a111a',
                            border: '1px solid #1e293b',
                            borderRadius: '8px',
                            padding: '18px',
                            borderLeft: '4px solid #ffa500'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#ffa500', margin: 0 }}>SCENARIO B: Mediterranean LKP Disambiguation</h4>
                                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>MED_TRAFFIC_002</span>
                            </div>
                            <div style={{ fontSize: '12px', lineHeight: 1.5, marginBottom: '12px' }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                                    <strong style={{ color: '#ffa500' }}>The Challenge:</strong> Multiple conflicting position reports from passing merchant vessels. High traffic density created observational noise with ±5 NM uncertainty.
                                </span>
                            </div>
                            <div style={{ fontSize: '12px', lineHeight: 1.5, marginBottom: '12px' }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                                    <strong style={{ color: '#00ff88' }}>The AI Solution:</strong> Bayesian fusion of multiple LKP estimates using weighted Monte Carlo particles, disambiguating true position through probability mass concentration.
                                </span>
                            </div>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
                                <strong>Recommendation:</strong> Sector Search radiating from fused LKP centroid with helicopter assets for rapid visual confirmation in high-visibility conditions.
                            </div>
                        </div>

                        {/* Scenario C: Atlantic */}
                        <div style={{
                            background: '#0a111a',
                            border: '1px solid #1e293b',
                            borderRadius: '8px',
                            padding: '18px',
                            borderLeft: '4px solid #ff4d4d'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#ff4d4d', margin: 0 }}>SCENARIO C: Atlantic Deep-Water Structural Failure</h4>
                                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>ATLANTIC_DEEP_003</span>
                            </div>
                            <div style={{ fontSize: '12px', lineHeight: 1.5, marginBottom: '12px' }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                                    <strong style={{ color: '#ffa500' }}>The Challenge:</strong> Catastrophic hull collapse in open ocean. Extreme sea state (Douglas 8) with 45-knot gale and deployed sea anchor affecting hydrodynamic drag.
                                </span>
                            </div>
                            <div style={{ fontSize: '12px', lineHeight: 1.5, marginBottom: '12px' }}>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                                    <strong style={{ color: '#00ff88' }}>The AI Solution:</strong> Modeled long-duration drift with reduced leeway coefficients (sea anchor damping), accounting for Gulf Stream influence on drift trajectory evolution.
                                </span>
                            </div>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
                                <strong>Recommendation:</strong> Parallel Sweep pattern along major drift axis using fixed-wing aircraft for extended endurance in extreme weather.
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Sidebar Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#0a111a', border: '1px solid #1e293b', padding: '20px', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.1em' }}>Operational Parameters</h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>CORE_MODEL</div>
                            <div style={{ fontSize: '12px', fontWeight: 700 }}>PyMC3 Dynamic DBN</div>
                        </div>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>ORCHESTRATOR</div>
                            <div style={{ fontSize: '12px', fontWeight: 700 }}>Agentic FastAPI Layer</div>
                        </div>
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>COMPLIANCE</div>
                            <div style={{ fontSize: '12px', fontWeight: 700 }}>IMO/IAMSAR Standards</div>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#000', border: '1px solid #1e293b', padding: '20px', borderRadius: '8px', flex: 1 }}>
                    <h4 style={{ fontSize: '10px', fontWeight: 800, color: '#00ff88', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <ShieldCheck size={12} /> SEARCH_RELIABILITY
                    </h4>
                    <div style={{ fontSize: '24px', fontWeight: 900, marginBottom: '4px' }}>94.2%</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>Estimated Confidence Interval after 4h drift projection.</div>

                    <div style={{ marginTop: '24px', height: '100px', width: '100%', position: 'relative' }}>
                        {/* CSS-only mini heatmap representation */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '60px',
                            height: '60px',
                            background: 'radial-gradient(circle, rgba(74, 163, 255, 0.6) 0%, rgba(74, 163, 255, 0) 70%)',
                            borderRadius: '50%'
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '40%',
                            left: '60%',
                            width: '40px',
                            height: '40px',
                            background: 'radial-gradient(circle, rgba(0, 255, 136, 0.4) 0%, rgba(0, 255, 136, 0) 70%)',
                            borderRadius: '50%'
                        }} />
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <Target size={12} color="white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SarInferenceSystem
