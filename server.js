import express from "express";
const app = express();
app.use(express.json());

// .ENV
import "dotenv/config.js";
const PORT = process.env.PORT || 9001

// Cors
import cors from 'cors';
app.use(cors());

// Routes
import router from './app/routes/Routes.js'
app.use(router)

// Database Connection
import pg from 'pg'
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://rlnqchka:r1RE_nLRI5oHmtFkypY7dO387O4wc55z@silly.db.elephantsql.com/rlnqchka" //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log('running');
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});

app.listen(PORT, (err) => console.log(`Servidor Rodando na Porta: ${PORT}`))