import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/profile-1.jpg'
import LoandigMessage from '../assets/loading-spinner.gif'
import './ChatMessage.css'

function ChatMessage({ message, sender, time }) {
  // const message = props.message;
  // const sender = props.sender;
  // const { sender, message } = props - Destructuring

  if (sender === 'robot' && message === '__loading__') {
    return (
      <div className='chat-message-robot'>
        <img src={RobotProfileImage} className="chat-message-profile" />
        <div className="chat-message-textbox">
          <div className='chat-message-text'><img className="loading-message" src={LoandigMessage}/></div>
          <div className='chat-message-time'>{time}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={
      sender === 'robot' 
      ? 'chat-message-robot' 
      : 'chat-message-user'
    }>
      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-textbox">
        <div className='chat-message-text'>{message}</div>
        <div className='chat-message-time'>{time}</div>
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}

export default ChatMessage