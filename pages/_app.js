import "../styles.css";
import Header from "../components/Header";
// pages/_app.js
import { SessionProvider } from "next-auth/react";

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
