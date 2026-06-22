import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import EmptyState from './components/EmptyState.jsx'

export default function App() {
  const [activeChat, setActiveChat] = useState(null)

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      {activeChat ? <ChatWindow contact={activeChat} /> : <EmptyState />}
    </div>
  )
}
