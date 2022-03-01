export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { list } = req.body;
      let newList = Array.from(list);
      let moviesList=[];
      for(let i=0;i<newList.length;i++){
        let item = newList[i];
        let data = await fetch(`https://api.themoviedb.org/3/${item.type}/${item.id}?api_key=${process.env.TMDB_KEY}&language=en-hi&append_to_response=videos`)
        data =await data.json();
        data.type =item.type;
        moviesList.push(data)
      }
      res.status(200).json({ moviesList });
    } else {
      res.status(400).json({ message: "Route not found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
}
