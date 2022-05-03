import Head from 'next/head';
import LandingBackground from "../components/LandingBackground/LandingBackground"
import Home from "../components/Home/Home"

export default function Index() {
  return (
    <div style={{ position: 'relative' }}>
      <Head>
        <link rel='shorcut icon' href='/codePDFicon.ico' />
        <title>codePDF</title>
      </Head>
      <Home />
      <LandingBackground />
    </div>
  )
}