const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo db connected successfully = ");
  } catch (err) {
    console.log("Mongo db Error = ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB
