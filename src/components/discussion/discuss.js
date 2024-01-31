// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:8000'); // Update with your server URL

// const App = () => {
//     const [name, setName] = useState('');
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         const getName = () => {
//             const enteredName = prompt('Enter your name to join');
//             if (enteredName) {
//                 setName(enteredName);
//                 socket.emit('new-user-joined', enteredName);
//             }
//         };

//         getName();

//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     useEffect(() => {
//         socket.on('user-joined', (user) => {
//             setMessages((prevMessages) => [...prevMessages, `${user} joined the chat`]);
//         });

//         socket.on('receive', (data) => {
//             setMessages((prevMessages) => [...prevMessages, `${data.name}: ${data.message}`]);
//         });
//     }, []);

//     const sendMessage = (e) => {
//         e.preventDefault();
//         if (message.trim() !== '') {
//             socket.emit('send', message);
//             setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
//             setMessage('');
//         }
//     };

//     return (
//         <div>
//             <h1>React Chat App</h1>
//             <div>
//                 {messages.map((msg, index) => (
//                     <div key={index}>{msg}</div>
//                 ))}
//             </div>
//             <form onSubmit={sendMessage}>
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type your message"
//                 />
//                 <button type="submit">Send</button>
//             </form>
//         </div>
//     );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Navbar from './Navbar';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';
import './style.css'

const socket = io('http://localhost:8000');



const Discuss = () => {
    const gradientStyle = {
        background: `
        linear-gradient(rgb(255,255,255),rgb(198 220 222))
      `,
      };
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');

//   useEffect(() => {
//     const getName = async () => {
//       const namee =  prompt('Enter your name to join');
//       setName(namee);
//       socket.emit('new-user-joined', namee);
//     };

//     getName();

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

  const appendMessage = async(content, position) => {
    setMessages([...messages, { content, position }]);
  };

  const handleSendMessage = (message) => {
    appendMessage(`You: ${message}`, 'right');
    socket.emit('send', message);
  };

  useEffect(() => {
    socket.on('user-joined', async(namee) => {
      appendMessage(`Someone joined the chat`, 'middle');
    });

    socket.on('receive', async(data) => {
      appendMessage(`Someone: ${data.message}`, 'left');
    });

    socket.on('left', async(namee) => {
      appendMessage(`Someone left the chat`, 'middle');
    });
  }, [messages]);

  return (
    <div className='pt-28 h-screen' style={gradientStyle} >
      <Navbar />
      <MessageContainer messages={messages} />
      <SendMessageForm onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Discuss;