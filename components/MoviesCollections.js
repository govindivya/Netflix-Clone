import MovieThumbnail from "./MovieThumbnail"
const MoviesCollections = ({results,title,isMovie}) => {
  return (
    <div className="relative flex flex-col  space-y-2 my-10 px-0 md:px-10  mx-auto overflow-y-hidden">
         <h2 className="font-semibold  ">{title}</h2>
        <div className="flex scrollbar-hide p-2 space-x-2 md:space-x-5 overflow-y-hidden overflow-x-scroll w-screen max-w-full">
        {
           Array.from(results).map((item,index)=>(
             <MovieThumbnail key={item.id} result ={item} isMovie={isMovie}/>
           ))
         }
        </div>
    </div>
  )
}

export default MoviesCollections
