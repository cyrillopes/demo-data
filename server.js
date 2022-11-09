require('dotenv').config({ path: './config.env' });
// require('dotenv').config();
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Rejection... Server shutting down', err);
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');
const port = process.env.PORT || 3001;

//?YOU CAN USE THIS MONGODB URL TO RUN THE APPLICATION
// const DB =
//   'mongodb+srv://cyrillo:admin@cluster0.v3nzy.mongodb.net/?retryWrites=true&w=majority';
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
console.log(DB);

mongoose
  .connect(DB, {
    // option just in case of deprecation warnings if the mongoose package get updated
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to DB'));

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection.. Server Shutting down', err);
  server.close(() => {
    process.exit(1);
  });
});
