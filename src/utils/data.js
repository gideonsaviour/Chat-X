export const currentUser = {
  id: 'u1',
  name: 'Gideon Saviour',
  avatar: 'GS',
  status: 'online',
  bio: 'Building the future, one chat at a time.'
}

export const contacts = [
  { id: 'u2', name: 'David Lawrence', avatar: 'DL', status: 'online', lastSeen: 'now', unread: 3, lastMessage: 'Can we jump on a call?' },
  { id: 'u3', name: 'Sarah Chen', avatar: 'SC', status: 'online', lastSeen: 'now', unread: 0, lastMessage: 'The designs look amazing 🔥' },
  { id: 'u4', name: 'Marcus Webb', avatar: 'MW', status: 'away', lastSeen: '5m ago', unread: 1, lastMessage: 'Check the repo when you can' },
  { id: 'u5', name: 'Priya Sharma', avatar: 'PS', status: 'offline', lastSeen: '2h ago', unread: 0, lastMessage: 'See you tomorrow!' },
  { id: 'u6', name: 'James Okafor', avatar: 'JO', status: 'online', lastSeen: 'now', unread: 0, lastMessage: 'Sent you the files' },
  { id: 'u7', name: 'Luna Park', avatar: 'LP', status: 'offline', lastSeen: '1d ago', unread: 0, lastMessage: 'Great working with you' },
]

export const groups = [
  { id: 'g1', name: 'Finite Brand Team', avatar: 'FB', members: 6, status: 'group', unread: 5, lastMessage: 'Sarah: Pushing the new designs now', lastSeen: 'now' },
  { id: 'g2', name: 'Chat-X Dev', avatar: 'CX', members: 4, status: 'group', unread: 0, lastMessage: 'Marcus: All tests passing ✅', lastSeen: '10m ago' },
  { id: 'g3', name: 'Bitcoin Builders', avatar: 'BB', members: 12, status: 'group', unread: 2, lastMessage: 'James: Block 850,000 just mined!', lastSeen: '30m ago' },
]

export const generateMessages = (contactId) => [
  { id: 1, senderId: contactId, text: 'Hey! How is everything going?', time: '10:00 AM', status: 'read' },
  { id: 2, senderId: 'u1', text: 'All good! Just finishing up the Chat-X build. It\'s looking really clean.', time: '10:02 AM', status: 'read' },
  { id: 3, senderId: contactId, text: 'That\'s awesome. What features are you adding?', time: '10:03 AM', status: 'read' },
  { id: 4, senderId: 'u1', text: 'Real-time messaging, group chats, voice/video calls, media sharing, end-to-end encryption and online status. The works!', time: '10:05 AM', status: 'read' },
  { id: 5, senderId: contactId, text: 'End-to-end encryption? That\'s next level 🔐', time: '10:06 AM', status: 'read' },
  { id: 6, senderId: 'u1', text: 'Yeah, privacy first. Every message is encrypted before it leaves your device.', time: '10:08 AM', status: 'read' },
  { id: 7, senderId: contactId, text: 'Can we jump on a call?', time: '10:10 AM', status: 'delivered' },
]

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export const getStatusColor = (status) => {
  switch(status) {
    case 'online': return '#10b981'
    case 'away': return '#f59e0b'
    default: return '#4a4a5e'
  }
}
