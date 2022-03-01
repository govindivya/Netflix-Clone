import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieThumbnail from "../components/MovieThumbnail";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import Footer from "../components/Footer";
import Login from "../components/Login";
/******************************************************************************************* */
const Search = () => {
  const [movies, setMovies] = useState(null);
  const [movieName, setMovieName] = useState("");
  const [searched,setSearched]=useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if(searched){
      window.scrollTo(0,600);
      setSearched(false);
    }
  }, [searched]);

  async function getMovie(e) {
    e.preventDefault();
    let name = movieName;
    setMovieName("");
    name = name.toString().split(" ");
    let query = "";
    name.forEach((item, index) => {
      if (index < name.lenght - 1) {
        query += `+${item}`;
      } else {
        query += item;
      }
    });
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/movie/search",
        { name: query },
        config
      );
      setMovies(data.list);
      setSearched(true);
    } catch (error) {
      console.log(error);
    }
  }
  if (!session) {
    return <Login />;
  }
  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <section className="relative w-full min-h-[calc(100vh-72px)]  bg-cover h-auto max-w-full">
        <div className="flex flex-col h-auto items-center bg-hero  justify-center relative min-h-[calc(100vh-72px)]">
          <h1 className="text-xl text-center font-bold md:text-3xl md:font-extrabold text-red-600 mb-2">
            Unlimited movies,shows and more
          </h1>
          <h1 className="text-xl text-center font-bold md:text-2xl md:font-bold text-gray-300 mb-2">
            Watch anytime cancel anytime
          </h1>
          <form
            className=" flex justify-center items-center"
            onSubmit={getMovie}
          >
            <input
              onChange={(e) => setMovieName(e.target.value)}
              value={movieName}
              className="md:py-4 md:px-4 px-4 py-2 text-gray-600 md:ml-auto  md:min-w-[500px] outline-none border-none bg-gray-300  md:w-full"
              placeholder="Search your favourite"
            />
            <button className="md:py-4 py-2 px-2  md:px-5 bg-red-500  hover:bg-red-600">
              Search
            </button>
          </form>
        </div>
        {movies !== null && (
          <div className="relative flex flex-col  space-y-2 my-10 px-10  mx-auto overflow-y-hidden">
            <h2 className="font-semibold text-2xl pl-2 text-gray-200">
              Some results are here
            </h2>
            <div className="flex scrollbar-hide p-2 space-x-5 overflow-y-hidden overflow-x-scroll w-screen max-w-full">
              {Array.from(movies).map((item, index) => (
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
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
export default Search;
