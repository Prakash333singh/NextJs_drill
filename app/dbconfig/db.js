import mongoose from "mongoose";

export async function connectDB() {
  try {
    // console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
