import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import {signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const hideMenu = () => {
    if (typeof window !== "undefined") {
      document.getElementById("menu").classList.add("left-hidden");
      document.getElementById("menu").classList.remove("left-0");
    }
  };
  const displayMenu = () => {
    if (typeof window !== "undefined") {
      document.getElementById("menu").classList.add("left-0");
      document.getElementById("menu").classList.remove("left-hidden");
    }
  };
  return (
    <header className="sticky min-w-full box-border  md:px-2 bg-[#040714] top-0 z-[1000] flex items-center px-5  h-[72px]">
      <img
        onClick={displayMenu}
        src="/images/logo.svg"
        alt=""
        className="cursor-pointer h-20 w-20 md:h-15 md:w-15 m-1"
      />
      <div
        id="menu"
        className="absolute left-hidden  md:flex-1 transition-all duration-500 ease-linear top-0  p-8 md:p-4  md:h-[72px] bg-[#040e36] md:bg-[#040714]  z-50 h-[100vh] w-auto   flex flex-col align-top justify-start md:right-0 md:left-0 md:z-auto   md:flex-row md:relative md:ml-5 md:flex md:items-center md:space-x-2"
      >
        <a
          className="header-link  group absolute top-0 -right-5 md:hidden"
          onClick={hideMenu}
        >
          <XIcon className="h-8 mr-4 md:h-4 md:mr-auto" />
        </a>
        <a className="header-link group" onClick={(e)=>router.push("/")}>
          <HomeIcon className="h-8 mr-4 md:h-4 md:mr-auto" />
          <span className="span">Home</span>
        </a>
        <a className="header-link group" onClick={(e)=>router.push("/search")}>
          <SearchIcon className="h-8 mr-4 md:h-4 md:mr-auto" />
          <span className="span">Search</span>
        </a>
        <a className="header-link group" onClick={(e)=>router.push("/watchlist")}>
          <PlusIcon className="h-8 mr-4 md:h-4 md:mr-auto" />
          <span className="span">Saved</span>
        </a>
        <a className="header-link group" onClick={(e)=>router.push("/originals")}>
          <StarIcon className="h-8 mr-4 md:h-4 md:mr-auto " />
          <span className="span">Originals</span>
        </a>
        <a className="header-link group"
        onClick={()=>router.push("/movies")}>
          <img
            src="/images/movie-icon.svg"
            alt=""
            className="h-8 mr-4 md:h-4 md:mr-auto"
          />
          <span className="span">Movies</span>
        </a>
      </div>

      {session && (
        <img
          src={session.user.image}
          className="w-10 h-10 rounded-full ml-auto cursor-pointer"
          onClick={() => {router.push('/logout')}}
        />
      )}
    </header>
  );
}

export default Header;
