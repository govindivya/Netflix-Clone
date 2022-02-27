import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Login from "../../components/Login";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { Rating } from "@mui/material";

const Tv = ({ movie ,rating,reviews}) => {

  const router = useRouter();
  const {id}=router.query
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const { data: session } = useSession();
  const [showPlayer, setShowPlayer] = useState(false);
  const options = {
    size: "medium",
    value: rating,
    readOnly: true,
    precision: 1,
    max: 10,
  };
  const index = movie.videos.results.findIndex(
    (element) => element.type === "Trailer"
  );
  const index1 = movie.videos.results.findIndex(
    (element) => element.type === "Clip"
  );
  const [url, setUrl] = useState(
    `https://www.youtube.com/watch?v=${movie.videos?.results[index]?.key}`
  );
  const [isTrailer, setIsTrailer] = useState(true);

  const saveToPlaylist = async () => {
    var locaDataList = JSON.parse(localStorage.getItem("NEXTFLIXVIDEO"));
    let history;
    if (!locaDataList) {
      history = [];
    }
    else{
      history=Array.from(locaDataList)
    }
    let isContain = false;
    history.forEach((item) => {
      if (item.type === "tv" && item.id === id) {
        isContain = true;
      }
    });
    if (!isContain) {
      history.push({
        type: "tv",
        id,
      });
      localStorage.setItem("NEXTFLIXVIDEO", JSON.stringify(history));
    }
  };
  //
  return !session ? (
    <Login />
  ) : movie ? (
    <>
      <Head>
        <title>{movie.title || movie.original_name}</title>
      </Head>
      <section className="relative z-50 min-h-[calc(100vh-72px)] m-0 min-w-full max-w-full">
        <div className="absolute top-0 left-0 w-full h-[calc(100vh-72px)]">
          <Image
            src={
              `${BASE_URL}${movie.backdrop_path || movie.poster_path}` ||
              `${BASE_URL}${movie.poster_path}`
            }
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>
        <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {movie.title || movie.original_name}
          </h1>
          <div className="flex items-center space-x-3 md:space-x-5">
            <button
              className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
              onClick={() => {
                setUrl(
                  `https://www.youtube.com/watch?v=${movie.videos?.results[index1]?.key}`
                );
                setShowPlayer(true);
                setIsTrailer(false);
                saveToPlaylist();
              }}
            >
              <img
                src="/images/play-icon-black.svg"
                alt=""
                className="h-6 md:h-8"
              />
              <span className="uppercase font-medium tracking-wide">Play</span>
            </button>

            <button
              className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
              onClick={() => {
                setUrl(
                  `https://www.youtube.com/watch?v=${movie.videos?.results[index]?.key}`
                );
                setShowPlayer(true);
                setIsTrailer(true);
                saveToPlaylist();
              }}
            >
              <img
                src="/images/play-icon-white.svg"
                alt=""
                className="h-6 md:h-8"
              />
              <span className="uppercase font-medium tracking-wide">
                Trailer
              </span>
            </button>

            <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
              <PlusIcon className="h-6" />
            </div>

            <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
              <img src="/images/group-icon.svg" alt="" />
            </div>
          </div>
          <Rating {...options} />

          <p className="text-xs md:text-sm">
            {movie.release_date || movie.first_air_date}
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            {movie.genres.map((genre) => genre.name + " ")}
          </p>
          <h4 className="text-sm md:text-lg max-w-4xl">{movie.overview}</h4>
        </div>

        {showPlayer && (
          <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
        )}

        <div
          className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
            showPlayer ? "opacity-100 z-50" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
            <span className="font-semibold">
              {isTrailer ? "Playing Trailer" : "Playing Movie"}
            </span>
            <div
              className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
              onClick={(e) => setShowPlayer(false)}
            >
              <XIcon className="h-5" />
            </div>
          </div>
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={url}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              controls={true}
              playing={showPlayer}
            />
          </div>
        </div>
      </section>
      <section className="relative w-full h-auto max-w-full p-5 overflow-hidden flex flex-col items-center">
        <h1>Reviews</h1>
        {Array.from(reviews.results).map((item, index) => (
          <div
            key={item.id}
            className="flex shadow-sm mb-5 md:mb-10 shadow-gray-500 w-full max-w-[1020px] relative flex-col justify-center items-center p-5"
          >
            <h4 className="relative py-2 max-w-full border-b px-5 mb-5 md:text-lg text-blue-400 font-medium">
              {item.author_details.username.toString().toUpperCase()}
            </h4>
            <Rating
              size="medium"
              value={
                item.author_details.rating ? item.author_details.rating : 0
              }
              max={10}
            />
            <p className="relative max-w-full font-light overflow-x-hidden text-gray-300">
              {item.content.toString().substring(0, 500)}
              <span className="hidden" id={item.id}>
                {item.content.toString().substring(500)}
              </span>
              <span
                className="realtive text-blue-500 mx-2 cursor-pointer"
                onClick={(e) => {
                  var elem = document.getElementById(item.id);
                  var elem2 = document.getElementById(item.id + index);
                  elem2.classList.add("hidden");
                  elem.classList.remove("hidden");
                }}
                id={item.id + index}
              >
                read more...
              </span>
            </p>
          </div>
        ))}
      </section>
    </>
  ) : (
    <>
      <div className="relative min-h-[100vh-72px] p-0 m-0 w-full max-w-full grid place-content-center-center">
        <div className="flex justify-center align-middle w-auto h-auto">
          <h1 className="font-medium text-gray-300">Something went wrong</h1>
          <button
            className="py-2 px-5 border-2 border-white text-black hover:bg-white hover:text-black hover:border-black"
            onClick={(e) => router.push("/")}
          >
            GO HOME
          </button>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.query;
  const [movieDetails, ReviewsData] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}&language=en-hi&append_to_response=videos`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.TMDB_KEY}&language=en-hi&append_to_response=videos`
    ),
  ]);
  const movie = await movieDetails.json();
  const reviews = await ReviewsData.json();
  let totalRatings = 5;
  Array.from(reviews.results).map((item, index) => {
    totalRatings += Number(item.author_details.rating);
  });
  totalRatings /= Array.from(reviews.results).length;
  return {
    props: {
      movie,
      session,
      reviews,
      rating: totalRatings,
    },
  };
}
export default Tv;
