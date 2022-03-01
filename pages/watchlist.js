import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import MovieThumbnail from "../components/MovieThumbnail";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

const Watchlist = () => {
  const [watchLater, setWatchLater] = useState([]);
  const [laoding, setLoading] = useState(true);
  const { data: session, loading } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/logout");
  }
  useEffect(() => {
    async function getMovies() {
      let watchLaterList = JSON.parse(localStorage.getItem("NEXTFLIXVIDEO"));
      try {
        if (watchLaterList) {
          const config = { headers: { "Content-Type": "application/json" } };
          const { data } = await axios.post(
            "/api/movie/getall",
            {
              list: watchLaterList,
            },
            config
          );
          if (Array.from(data.moviesList).length !== 0)
            setWatchLater([...data.moviesList]);
          else setWatchLater([]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMovies();
  }, []);

  return (
    <>
      <Head>
        <title>Watchlist</title>
      </Head>
      <section className="relative space-x-5 max-w-full   w-full  min-h-[100vh]">
        {watchLater.length === 0 && !laoding && (
          <div className="relative w-full bg-home min-h-[calc(100vh-72px)] grid place-content-center ">
            <div className="relative flex justify-center flex-col items-center">
              <h1 className="text-3xl">NO MOVIE FOUND</h1>
              <button
                className="border border-white hover:bg-white hover:text-black hover:border-blue-100 py-2 px-5 text-gray-300 mt-10"
                onClick={(e) => {
                  router.push("/movies");
                }}
              >
                Add Moviews
              </button>
            </div>
          </div>
        )}
        {watchLater.length !== 0 && (
          <div className="relative flex flex-col  mx-auto overflow-y-hidden">
            <h2 className="font-semibold text-xl px-2  mb-5 md:px-5 lg:px-10 w-full text-gray-200">
              Your watch later list
            </h2>
            <div className="flex relative flex-col px-2  md:px-5 lg:px-10 scrollbar-hide space-y-4 md:space-y-6   w-screen max-w-full">
              {Array.from(watchLater).map((item, index) => (
                <div key={item.id} className="flex h-auto justify-evenly">
                  <div className="flex w-full justify-start">
                    <MovieThumbnail
                      result={item}
                      isMovie={item.type === "movie" ? true : false}
                    />
                  </div>
                  <div className="flex relative flex-col w-full justify-start items-start">
                    <h1
                      component="h1"
                      className=" text-xl text-red-500 md:text-2xl lg:text-3xl"
                    >
                      {item.original_title ||
                        item.title ||
                        item.original_name ||
                        item.title}
                    </h1>
                    <h3>
                      <span className="mr-2"> Release </span>{" "}
                      {"Unknown" || item.release_date}
                    </h3>
                    <h2>
                      <span className="mr-2"> Average </span> Rating{" "}
                      {item.vote_average}
                    </h2>
                    <h2>
                      <span className="mr-2"> Total </span> Ratings{" "}
                      {item.vote_count}
                    </h2>
                    {item.genres.map((item, ind) => (
                      <p key={ind}>{item.name},</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
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
export default Watchlist;
