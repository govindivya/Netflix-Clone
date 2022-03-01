export default async function handler(req, res) {
   try {
    const { id } = req.query;
    let movie = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.TMDB_KEY}&language=en-hi&append_to_response=videos`
    );
    movie = await movie.json();
    res.status(200).json({
        movies:movie.results
    })
   } catch (error) {
  res.status(500).json({message:"Internal server error"});
     
   }
  }
  