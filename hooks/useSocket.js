import { useEffect, useState } from 'react'

import io from 'socket.io-client';

/*
  custom hook to initially connect to the socket and...
  - return the connected status
  - return the socket's instance for reuse
*/
export default function useSocket () {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let currSocket;

    const initSocket = async () => {
      await fetch('/api/socket')
      currSocket = io();
      setSocket(currSocket);

      currSocket.on('connect', () => {
        setIsConnected(true);
      })
    }
    initSocket()

    if (currSocket) return () => currSocket.disconnect();
  }, []);

  return { isConnected, socket }
}
