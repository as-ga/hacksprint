import mongoose from "mongoose";

const connection = {};

export async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGODB_DB}` || ""
    );
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(1);
  }
}
