const dbConfig = require("../config/db.config.js")
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: "postgres",
    host: dbConfig.HOST,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((err) => console.error('Unable to connect to the database: ', err))

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(127),
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    gamer: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    comment: {
        type: Sequelize.STRING(4095),
        allowNull: false
    },
    results: {
        type: Sequelize.STRING(2047),
        allowNull: false
    }
});


//(re)create table
// User.sync({ force: true })

// CREATE TABLE users (
//     id serial PRIMARY KEY,
//     name varchar(127) NOT NULL,
//     age integer NOT NULL,
//     gamer integer NOT NULL,
//     comment varchar(4095) NOT NULL,
//     results varchar(2047) NOT NULL
// );

// sequelize.query("SELECT * FROM users")
//     .then(result =>{
//         console.log(result[0]);
//     })
//     .catch(err =>{
//         console.log(err);
//     });

module.exports = User;
