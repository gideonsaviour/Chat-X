import { useState } from 'react'
import { MessageSquare, Users, Phone, Settings, Search, Plus, Shield, Bell } from 'lucide-react'
import { contacts, groups, currentUser, getStatusColor } from '../utils/data.js'

const Avatar = ({ initials, size = 40, status }) => (
  <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 600, color: '#fff', letterSpacing: '-0.5px'
    }}>{initials}</div>
    {status && (
      <div style={{
        position: 'absolute', bottom: 1, right: 1,
        width: size * 0.28, height: size * 0.28, borderRadius: '50%',
        background: getStatusColor(status),
        border: '2px solid #0a0a0f'
      }} />
    )}
  </div>
)

const ChatItem = ({ chat, active, onClick }) => (
  <div onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
    cursor: 'pointer', borderRadius: 12, margin: '2px 8px',
    background: active ? 'rgba(124,58,237,0.15)' : 'transparent',
    border: active ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent',
    transition: 'all 0.15s ease'
  }}
  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
  >
    <Avatar initials={chat.avatar} size={44} status={chat.status} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: '#f1f1f5' }}>{chat.name}</span>
        <span style={{ fontSize: 11, color: '#4a4a5e' }}>{chat.lastSeen}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
        <span style={{ fontSize: 13, color: '#8b8b9e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 160 }}>{chat.lastMessage}</span>
        {chat.unread > 0 && (
          <span style={{
            background: '#7c3aed', color: '#fff', fontSize: 11, fontWeight: 700,
            borderRadius: 10, padding: '1px 7px', minWidth: 20, textAlign: 'center'
          }}>{chat.unread}</span>
        )}
      </div>
    </div>
  </div>
)

export default function Sidebar({ activeChat, setActiveChat }) {
  const [tab, setTab] = useState('chats')
  const [search, setSearch] = useState('')

  const allChats = [...contacts, ...groups]
  const filtered = allChats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  const displayed = tab === 'chats' ? filtered.filter(c => !c.members) : tab === 'groups' ? filtered.filter(c => c.members) : filtered

  const navItems = [
    { id: 'chats', icon: MessageSquare, label: 'Chats' },
    { id: 'groups', icon: Users, label: 'Groups' },
    { id: 'calls', icon: Phone, label: 'Calls' },
  ]

  return (
    <div style={{
      width: 320, background: '#111118', borderRight: '1px solid #2a2a3a',
      display: 'flex', flexDirection: 'column', height: '100vh', flexShrink: 0
    }}>
      {/* Header */}
      <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid #2a2a3a' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar initials={currentUser.avatar} size={36} status="online" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#f1f1f5' }}>Chat-X</div>
              <div style={{ fontSize: 11, color: '#7c3aed', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Shield size={10} /> End-to-end encrypted
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ background: 'none', border: 'none', color: '#8b8b9e', cursor: 'pointer', padding: 6, borderRadius: 8 }}><Bell size={18} /></button>
            <button style={{ background: 'none', border: 'none', color: '#8b8b9e', cursor: 'pointer', padding: 6, borderRadius: 8 }}><Settings size={18} /></button>
            <button style={{
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', border: 'none',
              color: '#fff', cursor: 'pointer', padding: 6, borderRadius: 8
            }}><Plus size={18} /></button>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#4a4a5e' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search conversations..."
            style={{
              width: '100%', padding: '9px 12px 9px 34px',
              background: '#1a1a24', border: '1px solid #2a2a3a', borderRadius: 10,
              color: '#f1f1f5', fontSize: 13, outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '8px 16px', gap: 4 }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setTab(item.id)} style={{
            flex: 1, padding: '7px 4px', border: 'none', borderRadius: 8, cursor: 'pointer',
            background: tab === item.id ? 'rgba(124,58,237,0.2)' : 'transparent',
            color: tab === item.id ? '#8b5cf6' : '#8b8b9e',
            fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            transition: 'all 0.15s'
          }}>
            <item.icon size={14} /> {item.label}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
        {displayed.map(chat => (
          <ChatItem
            key={chat.id}
            chat={chat}
            active={activeChat?.id === chat.id}
            onClick={() => setActiveChat(chat)}
          />
        ))}
      </div>
    </div>
  )
}
