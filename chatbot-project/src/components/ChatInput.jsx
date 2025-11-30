import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import LoandigMessage from '../assets/loading-spinner.gif'
import './ChatInput.css'

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  function handleInput(event) {
    setInputText(event.target.value);
  };

  async function sendMessage() {
    if (isLoading === false && inputText != ''){
      const newChatMessages = [
        ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          id: crypto.randomUUID()
        }
      ]

      setChatMessages(newChatMessages);

      setInputText('');
      setIsLoading(true);

      setChatMessages([
        ...newChatMessages,
        {
          message: <img className="loading-message" src={LoandigMessage}/>,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);

      const response = await Chatbot.getResponseAsync(inputText);

      setIsLoading(false);
      
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);
    }
  };

  function handleKeyDown() {
    if (event.key === 'Enter'){
      sendMessage()
    }
    else if (event.key === 'Escape') {
      setInputText('');
    }
  };

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot" 
        size="30"
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button 
        onClick={sendMessage}
        className="send-button"
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput