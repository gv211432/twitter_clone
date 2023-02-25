// this route connects the mogondb to this app
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Successfully connected to database");
  },
    err => {
      console.log(err);
      process.exit(1);
    })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

// if database gets disconnectd
mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected !!");
});