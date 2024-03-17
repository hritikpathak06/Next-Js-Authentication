import mongoose from "mongoose";

export async function connectDatabase() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB Connection Error. Please make sure mongoDB is running",
        err
      );
    });
  } catch (error) {
    console.log(`Something Went Wrong`, error);
  }
}
