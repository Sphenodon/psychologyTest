const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js")

const connection = mysql.createPool({
    connectionLimit: dbConfig.CONNECTION_LIMIT,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    database: dbConfig.DATABASE,
    password: dbConfig.PASSWORD
});

connection.getConnection(function (err){
    if (err){
        return console.error("Error: " + err.message);
    }else {
        console.log("Connect successful");
    }
})

connection.promise().query("SELECT * FROM users")
    .then(result =>{
        console.log(result[0]);
    })
    .catch(err =>{
        console.log(err);
    });

module.exports = connection;
