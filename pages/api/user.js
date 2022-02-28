import connectDb from "../../lib/db";
import User from "../../Model/User";

const Handler = async (req, res) => {
  try {
    await connectDb();
    if (req.method === "POST" || req.method === "PUT") {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(200).json({ success: true });
      }
      else{
        await User.create(req.body);
      }
      res.status(200).json({ success: true });
    } else if (req.method === "GET") {
      const user = await User.findOne({email:req.body.email});
      if(!user){
        res.status(400).json({"message":"User not found"});
      }

      res.status(200).json({ success: true, user });
    } else if (req.method === "DELETE") {
      await User.findOneAndDelete({email:req.body.email});
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ message: "Route not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal sever error", error });
  }
};

export default Handler;
