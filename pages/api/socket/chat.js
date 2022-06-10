import { v4 as uuid } from 'uuid';

/*
  initializing these collections outside the Connection so they persist between sessions/users
*/
const messages = new Set();
const users = new Map();

class Connection {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;

    // connecting all handlers to their methods
    socket.on('message', (value) => this.handleMessage(value));
    socket.on('getMessages', () => this.getMessages());
    socket.on('connect_error', (err) => {
      console.error(`connect_error due to ${err.message}`);
    });
  }

  sendMessage(message) {
    this.io.sockets.emit('message', message);
  }

  getMessages() {
    messages.forEach((message) => this.sendMessage(message));
  }

  createUser(username) {
    // storing new users using the `socket` object(persistent between calls)
    users.set(this.socket, { username: username || 'Anonymous', userId: uuid()})
  }

  handleMessage(value) {
    const { user, message } = value;
    if(!users.has(this.socket)) this.createUser(user)

    const newMessage = {
      id: uuid(),
      user: users.get(this.socket),
      value: message,
      time: Date.now()
    };

    messages.add(newMessage);
    this.sendMessage(newMessage);
  }

}

export default function chat(io) {
  io.on('connection', (socket) => {
    console.log('New connection!')
    /*
      a new Collection is created each time using the same SocketIO(`io`) instance so
      it's able to keep track of server + messages
    */
    new Connection(io, socket);
  });
};
