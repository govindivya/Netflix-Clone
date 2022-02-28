import User from "../../Model/User";
import connectDb from "../../lib/db";

const Handler = async (req, res) => {
  try {
    await connectDb();

    /******************************************************************************** */
    if (req.method === "POST") {
      const { id, type, email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "User not found" });
      }

      user.watchlist.forEach((item) => {
        if (item.id === id && item.type === type) {
          res.status(200).json({ success: true });
        }
      });
      await user.watchlist.push({ id, type });
      await user.save();
      res.status(200).json({ success: true });
    } else if (req.method === "GET") {
    /******************************************************************************** */
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(400).json({ message: "User not found" });
      }
      const watchlist = await user.watchlist;
      res.status(200).json({ success: true, watchlist });
    } else if (req.method === "DELETE") {
    /******************************************************************************** */
      const { id, type, email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "User not found" });
      }

      let index = -1;
      user.watchlist.forEach((item, ind) => {
        if (item.id === id && item.type === type) {
          index = ind;
        }
      });
      if (index !== -1) {
        user.watchlist.splice(index, 1);
      }
      await user.save();
      res.status(200).json({ success: true });
    } else {
    /******************************************************************************** */
      res.status(400).json({ message: "Route not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export default Handler;
