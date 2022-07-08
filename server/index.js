var express = require('express')
var cors = require('cors')
const PgPromise = require("pg-promise");
var app = express()
require('dotenv').config()

var API = require('./script')
app.use(express.json())
app.use(cors())






const DATABASE_URL = process.env.DATABASE_URL;
const config = {
    connectionString: DATABASE_URL
}
if (process.env.NODE_ENV == 'production') {
    config.ssl = {
        rejectUnauthorized: false
    }
}
const pgp = PgPromise({});
const db = pgp(config);

API(app, db);


let PORT = process.env.PORT;
// console.log(PORT);

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
})