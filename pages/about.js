import { async } from "@firebase/util";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

const About = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push("/logout");
  }
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <section className="relative min-h-screen w-full max-w-full">
        <div className="relative flex flex-col h-[50vh] shadow-sm shadow-gray-400 items-center justify-center md:flex-row md:justify-evenly w-full lg:h-[100vh] px-2">
          <div className="md:pl-10 px-2">
            <h1 className=" text-red-500  font-bold mb-4 md:text-4xl  lg:text-5xl text-2xl">
              Enjoy on your TV.
            </h1>
            <h3 className=" text-gray-100 font-normal mb-4 lg:3xl md:text-2xl text-xl">
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more
            </h3>
          </div>

          <img className="w-[50%] object-cover" src="/images/2.svg" alt="" />
        </div>
        <div className="relative flex flex-col h-[50vh] shadow-sm shadow-gray-400  items-center justify-center md:flex-row md:justify-evenly w-full lg:h-[100vh] px-2">
          <div className="md:pl-10 px-2">
            <h1 className=" text-red-500 font-bold mb-4 md:text-4xl  lg:text-5xl text-2xl">
              Download your shows to watch offline.
            </h1>
            <h3 className=" text-gray-100 font-normal mb-4 lg:3xl md:text-2xl text-xl">
              Save your favourites easily and always have something to watch.
            </h3>
          </div>
          <img
            className="w-[50%] md:p-14 p-10 lg:p-20 object-cover"
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
            alt=""
          />
        </div>
        <div className="relative flex flex-col h-[50vh] shadow-sm shadow-gray-400  items-center justify-center md:flex-row md:justify-evenly w-full lg:h-[100vh] px-2">
          <div className="md:pl-10 px-2">
            <h1 className=" text-red-500 font-bold mb-4 md:text-4xl  lg:text-5xl text-2xl">
              Create profiles for children.
            </h1>
            <h3 className=" text-gray-100 font-normal mb-4 lg:3xl md:text-2xl text-xl">
              Send children on adventures with their favourite characters in a
              space made just for them—free with your membership.
            </h3>
          </div>
          <img
            className="w-[50%] md:p-14 p-10 lg:p-20 object-cover"
            src="https://occ-0-3752-3646.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVxdX2WnFSp49eXb1do0euaj-F8upNImjofE77XStKhf5kUHG94DPlTiGYqPeYNtiox-82NWEK0Ls3CnLe3WWClGdiJP.png"
            alt=""
          />
        </div>
        <div className="relative w-full flex flex-col md:flex-row justify-start items-start md:justify-center md:items-center"></div>
      </section>
      <Footer/>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props:{
      session
    }
  }
}

export default About;
