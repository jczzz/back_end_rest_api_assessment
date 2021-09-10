require('dotenv').config({path:"./config/config.env"});
const express = require('express');
const app = express();

const pingRouter = require('./routes/ping');
const postRouter = require('./routes/posts');
const errorHandler = require("./middleware/errorHandler");

// allow to get data from the request.body
app.use(express.json());

app.use('/api/ping', pingRouter);
app.use('/api/posts', postRouter);

// Error Handler Middleware   
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>console.log(`server is running on port ${PORT}`));

module.exports = app; // for testing