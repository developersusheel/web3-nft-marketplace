import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import { Navbar, Footer } from '../components';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <div className="dark:bg-nft-dark bg-white min-h-screen">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" crossOrigin="anonymous" />
  </ThemeProvider>
);

export default MyApp;
