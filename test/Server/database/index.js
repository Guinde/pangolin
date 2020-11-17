const mongoose = require("mongoose");
const env = require(`../environment/${process.env.NODE_ENV}.js`);

//Set up mongoose connection
const mongoDB = env.dbURl;
try {
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Connect to the database");
} catch (e) {
  console.error("Connection fail ! => " + e);
}
