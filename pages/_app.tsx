import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Navbar from '../components/navbar';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }: AppProps) {

  const [supabaseClient] = useState(createBrowserSupabaseClient())

 return(
  <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Navbar/>
      <AnimatePresence 
          initial={false}
          mode="wait"
          onExitComplete={() => window.scrollTo(0, 0)}
      >
      <Component {...pageProps} />
      </AnimatePresence>
    </SessionContextProvider>
 )
  
  
}

export default MyApp
