import { Server } from 'socket.io'
import chat from './chat'

const SocketHandler = (_, res) => {
  if (!res.socket.server.io) {
    console.log('Socket is initializing...')

    const io = new Server(res.socket.server)
    // append new SocketIO server to Next.js socket server response
    // NOTE: this breaks HMR and will require server restarts for API changes
    res.socket.server.io = io

  chat(io);
}

  res.end()
}

export default SocketHandler;
