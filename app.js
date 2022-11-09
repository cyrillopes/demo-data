const path = require('path'); //Native tool to mention the path of the folder
const express = require('express');
const cors = require('cors');

const AppError = require('./utils/AppError');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();
app.use(
  cors({
    //Cross origin
    origin: 'http://localhost:3000',
    credentials: true, // accepting any data sent
  })
);
app.set('view engine', 'pug'); //Letting express know what template we are going to use
app.set('views', path.join(__dirname, 'views')); //Letting express know where to find the pug files

// GLOBAL MIDDLEWARE
// Serving static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewRouter);
app.use('/api/category', categoryRouter);
app.use('/api/products', productRouter);

//Handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} on this server!!`, 404)); //coming from AppError class in utils folder
});

module.exports = app;
