# Chat App

Welcome to my Chat App project!

This project is written in React while utilizing [Next.js](https://nextjs.org/), [Taildwind CSS](https://tailwindcss.com/), and [Socket.io](https://socket.io/).

## Getting Started

First, install the required packages and run the development server:

```bash
yarn && yarn dev
# or
npm i && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Instructions

1. Enter your **Name** on the Welcome screen and click the *Enter Room* button.
2. Once inside the **Room**, use the field at the bottom to send a message and click *Send*. This will broadcast your message to all clients currently viewing the Room.
3. To test the ability to see other messages in real time, feel free to open the [Home](http://localhost:3000) page in another tab and enter a new name to join the room.

    > You can also open a new tab and attach a different name to the `username` query param!
    > http://localhost:3000/room?username=NAME


## About the project

- I built this project in React using [Next.js](https://nextjs.org/) to take advantage of it's built-in features, such as API routes, which can help improve the development experience and add a ton of flexibility to the application. A separate server wasn't required for this initial MVP, but I'd be more than happy to talk through how I'd expect this project to scale!
- I'm using [Taildwind CSS](https://tailwindcss.com/) for styling because it's a lightweight CSS utility library that's easy to use and refactor later if necessary.
- All connections are handled using WebSockets to have a two-way communication between the client(s) and server to easily share updates. [Socket.io](https://socket.io/) is managing these connections for both parties.
