const {Pool} = require("pg");
const dbConfig = require("../config/db.config.js")

const connection = new Pool({
    max: dbConfig.MAX,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    database: dbConfig.DATABASE,
    password: dbConfig.PASSWORD
});

connection.connect(function (err){
    if (err){
        return console.error("Error: " + err.message);
    }else {
        console.log("Connect successful");
    }
});

// connection.query("CREATE TABLE users (id serial PRIMARY KEY, name varchar(127) NOT NULL, age integer NOT NULL, " +
//     "gamer integer NOT NULL, comment varchar(4095) NOT NULL, results varchar(2047) NOT NULL);")
//     .then(result =>{
//         console.log(result[0]);
//     })
//     .catch(err =>{
//         console.log(err);
//     });

// CREATE TABLE users (
//     id serial PRIMARY KEY,
//     name varchar(127) NOT NULL,
//     age integer NOT NULL,
//     gamer integer NOT NULL,
//     comment varchar(4095) NOT NULL,
//     results varchar(2047) NOT NULL
// );

connection.query("SELECT * FROM users")
    .then(result =>{
        console.log(result[0]);
    })
    .catch(err =>{
        console.log(err);
    });

module.exports = connection;
