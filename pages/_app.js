import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import createEmotionCache from '../src/util/createEmotionCache'
import { CacheProvider } from '@emotion/react';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// import App from 'next/app'

// This is used to create pages for us
//  https://nextjs.org/docs/advanced-features/custom-app

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps }, }) {

  return (
      <CacheProvider value={emotionCache}>
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
      </CacheProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
