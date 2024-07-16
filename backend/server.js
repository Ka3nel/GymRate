require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const reviewRoutes = require("./routes/reviews");
const gymRoutes = require("./routes/gyms");
const { getGymReviews } = require("./controllers/reviewController");

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  next();
});

//routes
app.use("/api/reviews", reviewRoutes);
app.use("/api/user", userRoutes);
app.use("/api/gyms", gymRoutes);
app.get("/api/gyms/:gym_id/reviews", getGymReviews);

//connect to the database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
