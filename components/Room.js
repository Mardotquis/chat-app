import { useEffect, useState } from 'react'

import { useRouter } from 'next/router';
import useSocket from '../hooks/useSocket';

export default function Room() {
  const [message, setMessage] = useState('');
  const { socket, isConnected } = useSocket();

  const [chat, setChat] = useState({});

  const router = useRouter();
  const username = router.query.username;


  useEffect(() => {
    if (!socket) return;
    // initially get all messages
    socket.emit('getMessages');

    const messagesListener = (message) => {
      setChat((prevChat) => {
        const newMessages = { ...prevChat };
        /*
          indexing by `id` sets new messages if necessary, but avoids
          creating duplicates as new users join and `getMessages` is emitted
        */
        newMessages[message.id] = message;

        return newMessages;
      });
    }

    // add main listener and cleanup on unmount/re-renders
    socket.on('message', messagesListener)
    return () => {
      socket.off('message', messagesListener)
    }
  }, [socket, isConnected])


  const onMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const submitMessage = (e) => {
    e.preventDefault();

    socket.emit('message', {
      user: username,
      message,
    })
    setMessage('')
  }

  return (
    <section className="bg-blue-100">
      <h1 className="font-semibold text-lg md:text-5xl text-center text-slate-600">
        Chat Room
      </h1>

      <div className='mt-4 px-2 min-h-[90vh] font-mono'>
        {[...Object.values(chat)]
          .map((message) => {
            const time = new Date(message.time).toLocaleTimeString();
            const isCurrentUser = message.user.username === username;

            return (
              <div
                key={message.id}
                title={`Sent at ${time}`}
                className="flex mb-4 text-xl border-2 border-dotted border-b-blue-400 border-opacity-25">
                <span className={`font-semibold text-sm md:text-xl ${isCurrentUser ? 'text-green-500' : 'text-red-500'}`}>
                  {message.user.username}
                </span> <p className="ml-2 text-sm md:text-lg max-w-[90%]">{message.value}</p>
                <span className="ml-auto text-xs md:text-sm">{time}</span>
              </div>
            )
          })
        }
      </div>

      <div className="sticky bottom-0 w-full bg-slate-600">
        <form onSubmit={submitMessage} className="px-2 py-4 flex justify-center">
          <label htmlFor="message" className='sr-only'>Message</label>
          <input
            type="text"
            id='message'
            onChange={onMessageChange}
            value={message}
            placeholder={isConnected ? "Type a message..." : "Connecting..."}
            required
            className="w-full p-2 border-solid border-2 border-black rounded text-center text-lg"
          />
          <button type="submit" className='ml-2 p-2 text-white bg-blue-400 rounded'>Send</button>
        </form>
      </div>
    </section>
  )
}
