const mongoose = require('mongoose');
require('dotenv').config();
console.log(process.env.MONGODB_URI);

// dotenv process for DB accsess
const mongodburl =
  process.env.MONGODB_URI ||
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster1.p3vpljo.mongodb.net/?retryWrites=true&w=majority`;
// Connect to MongoDB
mongoose
  .connect(mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = mongoose.connection;