import mongoose from "mongoose";

async function dbConnection() {
   const connect = await mongoose.connect(
      'mongodb://0.0.0.0:27017/typescript'
   )
   console.log("db connect");

}


export default dbConnection;