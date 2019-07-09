require('dotenv').config();         // to access .env private secrets n stuff
const config = require('config');   // to access /config/default.json public secrets n stuff

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// middleware
app.use(express.json());

const { NODE_ENV } = process.env
const isDevMode = NODE_ENV === 'development'
const isProductionMode = NODE_ENV === 'production'

// config
const quote = isDevMode ? config.get('TAFAKARI_LA_BABU') : config.get('QUOTE_OF_THE_DAY')
const db = process.env.MONGO_URI;

//connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDb connected...'))
  .catch(err => console.log(err));

// use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// or use..

// serve static assets if production
// remember to insert post build script, :)
if (isProductionMode) {
  // set static folder
  app.use(express.static('client/build'));

  //serve index.html for any req
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`${quote}, :) \nServer started on port ${PORT}`));
