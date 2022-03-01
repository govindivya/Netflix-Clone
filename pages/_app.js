import "../styles.css";
// pages/_app.js
import { SessionProvider } from "next-auth/react";
import axios from "axios";
import  Header  from "../components/Header";
import Footer from "../components/Footer";

/******************************************************************************* */
axios.defaults.baseURL=process.env.BASE_URL
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Header/>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
