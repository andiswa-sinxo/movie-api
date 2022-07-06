var express = require('express')
var cors = require('cors')
const PgPromise = require("pg-promise");
var app = express()
require('dotenv').config()

var API =  require('./script') 
app.use(express.json())
app.use(cors())

// let useSSL = false;
// let local = process.env.LOCAL || false;
// if (process.env.DATABASE_URL && !local){
//     useSSL = true;
// }

// const pool = new Pool({
//     connectionString,
//     ssl :  {
//     rejectUnauthorized: false
//     }
//   });

const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);

API(app, db);


let PORT = process.env.PORT;
// console.log(PORT);

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
})