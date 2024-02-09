const mongoose = require("mongoose");

async function dbConnect() {
  const promise = new Promise((resolve, reject) => {
    if (!process.env.MONGO_URI) {
      reject("MONGO_URI not found");
    }
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URI);

    const db = mongoose.connection;
    db.on("error", (error) => {
      console.error("connection error:", error);
      reject("connection error");
    });
    db.once("open", () => {
      console.log("Database connected");
      resolve("Database connected");
    });
  });
}

module.exports = dbConnect;
