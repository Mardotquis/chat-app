import Head from 'next/head'
import { useRouter } from 'next/router'
import useSocket from '../hooks/useSocket';
import { useState } from 'react'

export default function HomePage() {

  const router = useRouter()
  const [username, setUsername] = useState('')
  useSocket()

  const onUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const enterRoom = (e) => {
    // utilizing native onSubmit event, but preventing default behavior
    e.preventDefault();

    if (!username.trim().length) {
      alert('Please enter a valid name.')
      return;
    }

    router.push({
      pathname: '/room',
      query: { username },
    })
  }


  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Chat App built in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className='mt-[30%] flex flex-col items-center'>
        <h1 className='center text-lg md:text-4xl'>Welcome! Please enter your name 🙂</h1>

        <form onSubmit={enterRoom} className="mt-8 flex flex-col items-center">
          {/* adding `label` for A11y, but hiding it because of the implicit instructions above */}
          <label htmlFor="username" className='sr-only'>Name</label>
          <input type="text" id='username' onChange={onUsernameChange} required
            className="border-solid border-2 border-blue-500 rounded text-center text-2xl block"
          />
          <button type="submit" className='mt-6 p-2 text-white bg-green-400 rounded'>Enter Room</button>
        </form>
      </section>
    </>
  )
}
