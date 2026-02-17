'use client'
import { Terminal } from 'lucide-react'

interface InferenceConsoleProps {
    logs: string[]
}

const InferenceConsole = ({ logs }: InferenceConsoleProps) => {
    return (
        <div className="inference-console" style={{
            background: '#000',
            border: '1px solid #1e293b',
            padding: '6px 8px',
            borderRadius: 4,
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, borderBottom: '1px solid #1e293b', paddingBottom: 4, marginBottom: 4 }}>
                <Terminal size={12} color="#00ff88" />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#00ff88', fontFamily: 'monospace' }}>COMPUTATIONAL_INFERENCE_LOG</span>
            </div>
            <div className="console-lines" style={{ flex: 1, overflowY: 'auto', fontFamily: 'monospace', fontSize: '9px', lineHeight: 1.4 }}>
                {logs.length === 0 ? (
                    <div style={{ color: '#475569' }}>[SYSTEM] Awaiting evidence propagation...</div>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} style={{ color: log.includes('CRITICAL') ? '#ff4d4d' : '#00ff88', marginBottom: 2 }}>
                            <span style={{ color: '#475569', marginRight: 8 }}>[{i.toString().padStart(4, '0')}]</span>
                            {log}
                        </div>
                    ))
                )}
            </div>
            <style jsx>{`
                .console-lines::-webkit-scrollbar { width: 4px; }
                .console-lines::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
            `}</style>
        </div>
    )
}

export default InferenceConsole
