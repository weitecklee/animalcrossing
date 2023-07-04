import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;500;700&display=swap" rel="stylesheet" />
        <meta name="description" content="Showcase of my Animal Crossing: New Horizons island and its villagers" />
        <meta property="og:url" content="https://myanimalcrossingisland.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="My Animal Crossing Island" />
        <meta property="og:description" content="Showcase of my Animal Crossing: New Horizons island and its villagers" />
        <meta property="og:image" content="https://myanimalcrossingisland.vercel.app/Animal_Crossing_Leaf.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="myanimalcrossingisland.vercel.app" />
        <meta property="twitter:url" content="https://myanimalcrossingisland.vercel.app/" />
        <meta name="twitter:title" content="My Animal Crossing Island" />
        <meta name="twitter:description" content="Showcase of my Animal Crossing: New Horizons island and its villagers" />
        <meta name="twitter:image" content="https://myanimalcrossingisland.vercel.app/Animal_Crossing_Leaf.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}