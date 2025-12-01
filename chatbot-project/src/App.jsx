import { useState, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import ChatInput from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages'))); // Destructuring the array

  useEffect(() => {
    Chatbot.addResponses({
      "Whats my name?": "Your name is Rafael Maia", 
      "Where do i live?": "You live in the city of Barra Mansa in the State of Rio de Janeiro",
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])

  return (
    <div className="app-container">
      {chatMessages.length === 0 && <p className="welcome-message">Welcome to the chatbot project! Send a message using the textbox below.</p>}
      <ChatMessages 
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
