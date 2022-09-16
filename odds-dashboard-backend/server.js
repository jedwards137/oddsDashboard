require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const eventsRoutes = require('./apis/eventsApi/eventsRoutes');
const sportsRoutes = require('./apis/sportsApi/sportsRoutes');
const { startJobs } = require('./services/jobsService');

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
app.use('/api/events', eventsRoutes);
app.use('/api/sports', sportsRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    startJobs();

    //listen for requests
    app.listen (process.env.PORT, () => {
      console.log('connected and listening on port 4000');
    });
  })
  .catch((error) => {
    console.log(error);
  });
