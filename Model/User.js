import mongoose from "mongoose";

var Schema = mongoose.Schema;

var user = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  imageUrl: {
    type: String,
  },
  watchlist: [
    { id: String, type: String, required: [true, "Movie id is required"] },
  ],
  history: [
    { id: String, type: String, required: [true, "Movie id is required"] },
  ],
  since: {
    type: Date,
    default: Date.now(),
  },
});
mongoose.models={};
const User =   mongoose.model("User",user);

export default User;

