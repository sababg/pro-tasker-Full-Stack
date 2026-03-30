import "dotenv/config";
import mongoose from "mongoose";

const URI = process.env.MONGO_URI || "";

async function connectDB() {
  try {
    await mongoose.connect(URI);
    console.log("Connection to MongoDB successful!");
  } catch (err) {
    console.error("Error connecting to MongoDB: ", err);
  }
}
connectDB();
