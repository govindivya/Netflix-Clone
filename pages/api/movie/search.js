
export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name } = req.body;
      let data1 = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${name}`
      );
      data1 = await data1.json();
      data1.results.forEach((result)=>{
        result.type="movie"
      })
      let data2 = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_KEY}&query=${name}`
      );
      data2 = await data2.json();
      data2.results.forEach((result)=>{
        result.type="movie"
      })
      const list =  [...data1.results,...data2.results]
      res.status(200).json({list});
    } else {
      res.status(400).json({ message: "route not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
}
