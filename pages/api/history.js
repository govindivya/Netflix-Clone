import { getServerSession } from "next-auth";
import connectDb from "../../lib/db";
import User from "../../Model/User";

const Handler = async (req, res) => {
  try {
    
    await connectDb();
    /******************************************************************************** */
    if (req.method === "POST") {
      const { id, type,email } = req.body;
      const user = await User.findOne({ email });
      if(!user){
        res.status(400).json({"message":"User not found"});
      }

      user.history.forEach((item) => {
        if (item.id === id && item.type === type) {
          res.status(200).json({ success: true });
        }
      });
      user.history.push({ id, type });
      await user.save();
      res.status(200).json({ success: true });
    } else if (req.method === "GET") {
      /******************************************************************************** */
      const user = await User.findOne({ email: session.user.email });
      if(!user){
        res.status(400).json({"message":"User not found"});
      }

      const history = await user.history;
      res.status(200).json({ success: true, history });
    } else if (req.method === "DELETE") {
      /******************************************************************************** */
      const user = await User.findOne({ email: session.user.email });
      if(!user){
        res.status(400).json({"message":"User not found"});
      }

      const { id, type } = req.body;
      let index = -1;
      user.history.forEach((item, ind) => {
        if (item.id === id && item.type === type) {
          index = ind;
        }
      });
      if (index !== -1) {
        user.history.splice(index, 1);
      }
      await user.save();
      res.status(200).json({ success: true });
    } else {
      /******************************************************************************** */
      res.status(400).json({ message: "Route not found" });
    }
  } catch (error) {
    /******************************************************************************** */

    res.status(500).json({ message: "Internal server error" });
  }
};

export default Handler;
