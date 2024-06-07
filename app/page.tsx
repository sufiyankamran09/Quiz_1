import Head from 'next/head';
import Tweet from './components/Tweet';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Twitter UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Tweet/>
  </main>
    </div>
  );
}