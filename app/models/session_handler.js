const session = require('express-session');
const dbConfig = require("../config/db.config.js");
const pg = require("pg");
const pgSession = require('connect-pg-simple')(session);

const pgPool = new pg.Pool({
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
    database: dbConfig.DATABASE,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        idle: dbConfig.pool.idle
    }
});

module.exports = {
    createStore: function() {
        return new pgSession({
            pool : pgPool,
            tableName : 'sessions',
            createTableIfMissing: true
        })
}
}



