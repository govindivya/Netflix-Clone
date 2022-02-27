import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./../firebase";
import Login from "../components/Login";
import Slider from "../components/Slider";
import Brand from "../components/Brand";
import MoviesCollections from "../components/MoviesCollections";
import { useRouter } from "next/router";
import axios from "axios";
import MovieThumbnail from "../components/MovieThumbnail";
/****************************************************************************************************/

export default function Home({
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
  upComingMovies,
}) {
  const { data: session, loading } = useSession();
  const [history, setHistory] = useState([]);
  const [similar,setSimilar]=useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchHistory = async () => {
      var locaDataList = JSON.parse(localStorage.getItem("NEXTFLIXVIDEO"));
      if (!locaDataList) {
        locaDataList = [];
        localStorage.setItem("NEXTFLIXVIDEO", JSON.stringify(locaDataList));
        return;
      }
      let localMoviesList = Array.from(locaDataList);
      if (localMoviesList.length === 0) {
        return;
      } else {
        let arrayOfMovie = [];
        for (let i = 1; i <= localMoviesList.length; i++) {
          let { data } = await axios.get(
            `/api/${localMoviesList[i - 1].type}/history/${localMoviesList[i - 1].id}`
          );
          arrayOfMovie.push({
            ...data.movie,
            type: `${localMoviesList[i - 1].type}`,
          });
        }
    
        setHistory([...arrayOfMovie]);
        setIsFetched(true);
      }
    };
    fetchHistory();
  }, [id]);

  useEffect(() => {
    // This is used to save user in database
    const saveUser = async () => {
      /**/
      if (session) {
        const q = query(
          collection(db, "users"),
          where("email", "==", session.user.email)
        );
        const userExist = await getDocs(q);
        if (userExist.size !== 0) {
          return;
        }
        const user = await addDoc(collection(db, "users"), {
          name: session.user.name,
          email: session.user.email,
          imageUrl: session.user.image,
        });
      }
    };
    saveUser();
  }, [session]);

  return (
    <div>
      <Head>
        <title>Netflix-Clone</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? (
        <Login />
      ) : (
        <main className="relative min-h-screen bg-home bg-fixed bg-center bg-cover bg-no-repeat">
          <Slider />
          <Brand />
          {
            <div className="relative flex flex-col  space-y-2 my-10 px-10  mx-auto overflow-y-hidden">
              <h2 className="font-semibold  ">Your views</h2>
              <div className="flex scrollbar-hide p-2 space-x-5 overflow-y-hidden overflow-x-scroll w-screen max-w-full">
                {isFetched &&
                  history.map((item) => (
                    <MovieThumbnail
                      key={item.id}
                      result={item}
                      isMovie={item.type === "movie" ? true : false}
                    />
                  ))}
              </div>
            </div>
          }
          <MoviesCollections
            isMovie={true}
            results={popularMovies}
            title="Popular Movies"
          />
          <MoviesCollections
            isMovie={true}
            results={upComingMovies}
            title="Upcoming Movies"
          />
          <MoviesCollections
            results={popularShows}
            isMovie={false}
            title="Popular Shows"
          />
          <MoviesCollections
            isMovie={true}
            results={top_ratedMovies}
            title="Top Rated Movies"
          />
          <MoviesCollections
            isMovie={false}
            results={top_ratedShows}
            title="Top Rated Shows"
          />
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const [
    popularMoviesRes,
    popularShowsRes,
    topRatedMoviesRes,
    topRatedShowsRes,
    upComingRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=hi-Hi&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_KEY}&language=hi-Hi&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=hi-Hi&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_KEY}&language=hi-Hi&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=hi-Hi&page=1`
    ),


  ]);
  const [popularMovies, popularShows, top_ratedMovies, top_ratedShows,upComingMovies,latestMovies] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      topRatedMoviesRes.json(),
      topRatedShowsRes.json(),
      upComingRes.json(),
    ]);
  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
      upComingMovies:upComingMovies.results,
    },
  };
}
