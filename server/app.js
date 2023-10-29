const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");

const port = 8000;

// app.get("/", (req, res) => {
//   res.send("Hello server");
// });
app.use(express.json());
app.use(cors);

app.use(router);

app.listen(port, () => {
  console.log(`Server running at port no ${port}`);
});
