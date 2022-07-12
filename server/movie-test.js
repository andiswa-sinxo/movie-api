const assert = require('assert')
const movies = require('./script')
const pg = require('pg');

const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://andiswa:andiswa.09@localhost:5432/movie_list';

const pool = new Pool({
    connectionString
});

