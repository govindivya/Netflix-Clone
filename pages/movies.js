import axios from "axios";
const Movies = () => {
  return (
    <section className="relative max-w-full min-h-screen w-full"></section>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const [
    popularMoviesRes,
    popularShowsRes,
    topRatedMoviesRes,
    topRatedShowsRes,
  ] = [
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
  ];
}

export default Movies;
