import { useState, useRef, useEffect } from 'react'
import {
  Phone, Video, MoreVertical, Send, Paperclip, Smile,
  Mic, Shield, Check, CheckCheck, Image, File, Lock, X
} from 'lucide-react'
import { generateMessages, currentUser, getStatusColor } from '../utils/data.js'

const Avatar = ({ initials, size = 40, status }) => (
  <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 600, color: '#fff'
    }}>{initials}</div>
    {status && (
      <div style={{
        position: 'absolute', bottom: 1, right: 1,
        width: size * 0.28, height: size * 0.28, borderRadius: '50%',
        background: getStatusColor(status), border: '2px solid #0a0a0f'
      }} />
    )}
  </div>
)

const CallModal = ({ type, contact, onClose }) => (
  <div style={{
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
  }}>
    <div style={{
      background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: 24,
      padding: 48, textAlign: 'center', width: 320
    }}>
      <Avatar initials={contact.avatar} size={80} />
      <div style={{ marginTop: 20, fontSize: 22, fontWeight: 700 }}>{contact.name}</div>
      <div style={{ color: '#8b8b9e', marginTop: 4, fontSize: 14 }}>
        {type === 'video' ? '📹 Video calling...' : '📞 Calling...'}
      </div>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 36 }}>
        <button onClick={onClose} style={{
          background: '#ef4444', border: 'none', color: '#fff',
          width: 56, height: 56, borderRadius: '50%', cursor: 'pointer', fontSize: 22
        }}>✕</button>
        <button style={{
          background: '#10b981', border: 'none', color: '#fff',
          width: 56, height: 56, borderRadius: '50%', cursor: 'pointer', fontSize: 22
        }}>{type === 'video' ? '📹' : '📞'}</button>
      </div>
    </div>
  </div>
)

export default function ChatWindow({ contact }) {
  const [messages, setMessages] = useState(generateMessages(contact.id))
  const [input, setInput] = useState('')
  const [callType, setCallType] = useState(null)
  const [recording, setRecording] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    setMessages(generateMessages(contact.id))
  }, [contact.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const newMsg = {
      id: Date.now(), senderId: 'u1',
      text: input, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    }
    setMessages(prev => [...prev, newMsg])
    setInput('')

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1, senderId: contact.id,
        text: 'Got it! 👍', time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered'
      }])
    }, 1500)
  }

  const isMine = (msg) => msg.senderId === 'u1'

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0a0f' }}>
      {callType && <CallModal type={callType} contact={contact} onClose={() => setCallType(null)} />}

      {/* Header */}
      <div style={{
        padding: '14px 20px', borderBottom: '1px solid #2a2a3a',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#111118'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar initials={contact.avatar} size={42} status={contact.status} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{contact.name}</div>
            <div style={{ fontSize: 12, color: contact.status === 'online' ? '#10b981' : '#8b8b9e', display: 'flex', alignItems: 'center', gap: 4 }}>
              {contact.status === 'online' ? '● Online' : contact.members ? `${contact.members} members` : `Last seen ${contact.lastSeen}`}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[
            { icon: Phone, action: () => setCallType('voice'), tip: 'Voice call' },
            { icon: Video, action: () => setCallType('video'), tip: 'Video call' },
            { icon: MoreVertical, action: () => {}, tip: 'More' },
          ].map(({ icon: Icon, action, tip }) => (
            <button key={tip} onClick={action} title={tip} style={{
              background: 'none', border: 'none', color: '#8b8b9e', cursor: 'pointer',
              padding: 8, borderRadius: 8, transition: 'all 0.15s',
              display: 'flex', alignItems: 'center'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1a1a24'; e.currentTarget.style.color = '#f1f1f5' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#8b8b9e' }}
            ><Icon size={20} /></button>
          ))}
        </div>
      </div>

      {/* Encryption notice */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        padding: '8px 16px', fontSize: 12, color: '#4a4a5e'
      }}>
        <Lock size={11} /> Messages are end-to-end encrypted. No one outside this chat can read them.
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px' }}>
        {messages.map((msg, i) => {
          const mine = isMine(msg)
          return (
            <div key={msg.id} className="fade-in" style={{
              display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start',
              marginBottom: 6
            }}>
              {!mine && i === 0 || (!isMine(messages[i-1] || msg) && !mine) ? (
                <div style={{ marginRight: 8, alignSelf: 'flex-end' }}>
                  <Avatar initials={contact.avatar} size={28} />
                </div>
              ) : <div style={{ width: 36 }} />}

              <div style={{
                maxWidth: '68%',
                background: mine ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : '#1a1a24',
                border: mine ? 'none' : '1px solid #2a2a3a',
                borderRadius: mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '10px 14px',
              }}>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: mine ? '#fff' : '#f1f1f5' }}>{msg.text}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: mine ? 'rgba(255,255,255,0.6)' : '#4a4a5e' }}>{msg.time}</span>
                  {mine && (
                    msg.status === 'read' ? <CheckCheck size={12} style={{ color: '#a78bfa' }} /> :
                    msg.status === 'delivered' ? <CheckCheck size={12} style={{ color: 'rgba(255,255,255,0.4)' }} /> :
                    <Check size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
                  )}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px', borderTop: '1px solid #2a2a3a',
        background: '#111118', display: 'flex', alignItems: 'flex-end', gap: 8
      }}>
        <div style={{ display: 'flex', gap: 2 }}>
          <button title="Attach file" style={{ background: 'none', border: 'none', color: '#8b8b9e', cursor: 'pointer', padding: 8, borderRadius: 8 }}><Paperclip size={18} /></button>
          <button title="Send image" style={{ background: 'none', border: 'none', color: '#8b8b9e', cursor: 'pointer', padding: 8, borderRadius: 8 }}><Image size={18} /></button>
        </div>

        <div style={{ flex: 1, position: 'relative' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
            placeholder="Message..."
            rows={1}
            style={{
              width: '100%', background: '#1a1a24', border: '1px solid #2a2a3a',
              borderRadius: 12, padding: '10px 14px', color: '#f1f1f5', fontSize: 14,
              outline: 'none', resize: 'none', fontFamily: 'inherit', lineHeight: 1.5,
              maxHeight: 120, overflowY: 'auto'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          <button style={{ background: 'none', border: 'none', color: '#8b8b9e', cursor: 'pointer', padding: 8, borderRadius: 8 }}><Smile size={18} /></button>
          {input.trim() ? (
            <button onClick={sendMessage} style={{
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              border: 'none', color: '#fff', cursor: 'pointer',
              width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}><Send size={16} /></button>
          ) : (
            <button
              onMouseDown={() => setRecording(true)}
              onMouseUp={() => setRecording(false)}
              style={{
                background: recording ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                border: 'none', color: '#fff', cursor: 'pointer',
                width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s'
              }}
            ><Mic size={16} /></button>
          )}
        </div>
      </div>
    </div>
  )
}
