import Head from 'next/head'
import Emoji from 'a11y-react-emoji'
import { SolidarityActionsList } from '../components/SolidarityActions'

export default function Home() {
  return (
    <div className='min-h-screen p-4 md:py-6 md:px-7 flex flex-col justify-center'>
      <Head>
        <title>Game Worker Solidarity Project</title>
        <meta name="description" content="A living history of game worker solidarity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='mt-auto'>
        <h1 className='text-4xl font-bold'>
          <div className='text-gray-400'>A living history of</div>
          <div>game worker solidarity</div>
        </h1>

        <div className='py-6' />

        <section>
          <SolidarityActionsList />
        </section>
      </main>

      <div className='py-6' />

      <footer className='mt-auto'>
        <a className='text-gray-500' href='https://commonknowledge.coop'>
          Developed with <Emoji symbol='✊' label='worker power' /> by Common Knowledge Co-operative
        </a>
      </footer>
    </div>
  )
}
