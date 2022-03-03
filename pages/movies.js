import MoviesCollections from "../components/MoviesCollections";
import { getSession ,useSession} from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Login from "../components/Login";
const Movies = ({
  popularMovies,
  top_ratedMovies,
  upComingMovies,
  trendingAll,
}) => {
  const { data: session, loading } = useSession();
  const router = useRouter();

  if(!session){
    return <Login/>
  }
  return (
  <>
  <Head>
    <title>Movies</title>
  </Head>
    <section className="relative  max-w-full min-h-screen w-full">
      <MoviesCollections
        isMovie={true}
        results={popularMovies}
        title="Popular Movies"
      />
      <MoviesCollections
        isMovie={true}
        results={trendingAll}
        title="Popular Movies"
      />
      <MoviesCollections
        isMovie={true}
        results={upComingMovies}
        title="Popular Movies"
      />
      <MoviesCollections
        isMovie={true}
        results={top_ratedMovies}
        title="Popular Movies"
      />
    </section>
    <Footer/>
  </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const [popularMoviesRes, topRatedMoviesRes, upComingRes, trendingRes] =
    await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=hi-Hi&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=hi-Hi&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=hi-Hi&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}&language=hi-Hi&page=1`
      ),
    ]);
  const [popularMovies, top_ratedMovies, upComingMovies, trendingAll] =
    await Promise.all([
      popularMoviesRes.json(),
      topRatedMoviesRes.json(),
      upComingRes.json(),
      trendingRes.json(),
    ]);
  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      top_ratedMovies: top_ratedMovies.results,
      upComingMovies: upComingMovies.results,
      trendingAll: trendingAll.results,
    },
  };
}

export default Movies;
