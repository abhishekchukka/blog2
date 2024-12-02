const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv").config();
connectDb();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use("/api/posts", require("./routes/blogRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
