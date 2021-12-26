// GLOBAL ENVIROMENT VARIABLES
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './utils/config.env' });

process.on('uncaughtException', (err) => {
  console.log('SERVER ERROR: ', err);
  process.exit(0);
});

// APP
const app = require('./app');
const nodemon = require('nodemon');

// DB CONNECTION
const DB = process.env.DB_CONNECTION_STRING.replace(
  '<password>',
  process.env.DB_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log('connection> ', con);
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.log('MongoDB connected failed: ', error);
  });

// SERVER
const PORT = process.env.PORT;
const SERVER = app.listen(PORT, process.env.LOCALHOST, () => {
  console.log(`App is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('SERVER ERROR: ', err);
  SERVER.close(() => {
    process.exit(1);
  });
});
