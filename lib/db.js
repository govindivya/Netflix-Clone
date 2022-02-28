import mongoose from "mongoose";

async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("server connected");
    })
    .catch((e) => {
      console.log("Some error in mongo", e);
    });
}

export default connectDB;
