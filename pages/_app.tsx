import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }: AppProps) {

  const [supabaseClient] = useState(createBrowserSupabaseClient())

 return(
  <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Navbar/>
      <Component {...pageProps} />
    </SessionContextProvider>
 )
  
  
}

export default MyApp
