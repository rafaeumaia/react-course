import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import dayjs from 'dayjs'
import './ChatInput.css'

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const [timeSent, setTimeSent] = useState(() => {
    const timeInMiliseconds = dayjs().valueOf();

    return dayjs(timeInMiliseconds).format('h:mma')
  })

  function handleInput(event) {
    setInputText(event.target.value);
  };

  async function sendMessage() {
    const timeInMiliseconds = dayjs().valueOf();
    setTimeSent(dayjs(timeInMiliseconds).format('h:mma'))
    console.log(timeSent)

    if (isLoading === false && inputText != ''){
      const newChatMessages = [
        ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          id: crypto.randomUUID(),
          time: timeSent
        }
      ]

      setChatMessages(newChatMessages);

      setInputText('');
      setIsLoading(true);

      setChatMessages([
        ...newChatMessages,
        {
          message: '__loading__',
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
          id: crypto.randomUUID(),
          time: timeSent
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