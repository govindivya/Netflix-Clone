import axios from "axios";
import Head from "next/head";
import { useEffect,useState } from "react";
import MovieThumbnail from "../components/MovieThumbnail";

const Watchlist = () => {
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    async function getMovies() {
      let watchLaterList = JSON.parse(localStorage.getItem("NEXTFLIXVIDEO"));
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
          "/api/movie/getall",
          {
            list: watchLaterList,
          },
          config
        );
        setWatchLater([...data.moviesList]);
      } catch (error) {
        console.log(error);
      }
    }
    getMovies();
  },[]);

  return (
    <>
      <Head>
        <title>Watchlist</title>
      </Head>
      <section className="relative space-x-5 max-w-full  w-full  min-h-[calc(100vh-72px)]">
        {(watchLater === null ||watchLater.lenght === 0) && (
          <div className="relative w-full min-h-[calc(100vh-72px)] grid place-content-center ">
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
        {watchLater.lenght!==0 && (
          <div className="relative flex flex-col  space-y-2 my-10 px-10  mx-auto overflow-y-hidden">
            <h2 className="font-semibold text-2xl pl-2 text-gray-200">
              Your watch later list
            </h2>
            <div className="flex scrollbar-hide p-2 space-x-5 overflow-y-hidden overflow-x-scroll w-screen max-w-full">
              {Array.from(watchLater).map((item, index) => (
                <MovieThumbnail
                  key={item.id}
                  result={item}
                  isMovie={item.type === "movie" ? true : false}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Watchlist;
