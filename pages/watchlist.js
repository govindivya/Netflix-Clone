import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect ,useRef} from "react";

const Watchlist = () => {
  const router = useRouter();
  var watchLater=useRef(null);
  useEffect(() => {
    console.log(localStorage.getItem("NEXTFLIXVIDEOSAVED"));
    watchLater.current = localStorage.getItem("NEXTFLIXVIDEOSAVED");
    if (!watchLater) {
      watchLater.current = [];
      localStorage.setItem("NEXTFLIXVIDEOSAVED", JSON.stringify(watchLater));
    }
  }, [])
  
  return (
    <>
      <Head>
        <title>Watchlist</title>
      </Head>
      <section className="relative space-x-5 max-w-full  w-full  min-h-[calc(100vh-72px)]">
        {
         (watchLater.current ===null || watchLater.current.length===0)&&
          <div className="relative w-full min-h-[calc(100vh-72px)] grid place-content-center ">
             <div className="relative flex justify-center flex-col items-center">
               <h1 className="text-3xl">NO MOVIE FOUND</h1>
               <button className="border border-white hover:bg-white hover:text-black hover:border-blue-100 py-2 px-5 text-gray-300 mt-10" onClick={e=>{
                 router.push("/movies")
               }}>Add Moviews</button>
             </div>
          </div>
        }
      </section>
    </>
  );
};

export default Watchlist;
