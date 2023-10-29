const mongoose = require("mongoose");

const db =
  "mongodb+srv://dipum906:dipum906@mern-estate.nhbxd9i.mongodb.net/Authusers";

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
