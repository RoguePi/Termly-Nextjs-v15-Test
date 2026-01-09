import type { AppProps } from 'next/app';
import TermlyCMP from '../components/TermlyConsent';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <TermlyCMP 
        websiteUUID="270c91dd-6788-48d0-823d-1e04be35bede"
        autoBlock={true}
      />
    </>
  );
}
