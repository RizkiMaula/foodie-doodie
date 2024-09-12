import '@/styles/globals.css';
// import AppWrapper from './AppWrapper';

export default function App({ Component, pageProps }) {
  return (
    // <AppWrapper>
    <Component {...pageProps} />
    //  </AppWrapper>
  );
}
