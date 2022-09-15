require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const sportsRoutes = require('./apis/sportsApi/sportsRoutes');
const eventsRoutes = require('./apis/eventsApi/eventsRoutes');
const { gameInProgressChecker } = require('./services/jobsService');

// list controllers here
//const dashboardController = require('./dashboardApi/dashboardController');

const app = express();

// middleware to attach body to request as json
app.use(express.json());

// global middleware before express moves onto routes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/sports', sportsRoutes);
app.use('/api/events', eventsRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    gameInProgressChecker.start();
    //listen for requests
    app.listen (process.env.PORT, () => {
      console.log('connected and listening on port 4000');
    });
  })
  .catch((error) => {
    console.log(error);
  });
