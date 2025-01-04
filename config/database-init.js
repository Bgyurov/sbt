require("dotenv").config();
const mongoose = require("mongoose");
const dbUri = process.env.MONGOD_CONNECT_URI;

async function initDatabase() {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(dbUri);

    console.log("DB connected");
  } catch (error) {
    console.log("Error: ", error);
  }
}

module.exports = initDatabase;
