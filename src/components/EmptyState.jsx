import { MessageSquare, Shield, Zap, Lock } from 'lucide-react'

export default function EmptyState() {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#0a0a0f', padding: 40
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: 24,
        background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24, boxShadow: '0 0 40px rgba(124,58,237,0.4)'
      }}>
        <MessageSquare size={36} color="#fff" />
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Welcome to Chat-X</h2>
      <p style={{ color: '#8b8b9e', fontSize: 15, marginBottom: 40, textAlign: 'center', maxWidth: 320 }}>
        Select a conversation to start messaging, or start a new chat.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { icon: Lock, label: 'End-to-end encrypted' },
          { icon: Zap, label: 'Real-time messaging' },
          { icon: Shield, label: 'Privacy first' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#1a1a24', border: '1px solid #2a2a3a',
            borderRadius: 10, padding: '8px 14px', fontSize: 13, color: '#8b8b9e'
          }}>
            <Icon size={14} style={{ color: '#7c3aed' }} /> {label}
          </div>
        ))}
      </div>
    </div>
  )
}
