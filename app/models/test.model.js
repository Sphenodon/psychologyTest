const sql = require('./db.js')

const Test = function (){

}

Test.postResults = (name, age, gamer, comment, results) => {
    sql.query("INSERT INTO users (name, age, gamer, comment, results) VALUES ($1,$2,$3,$4,$5)", [name, age, gamer, comment, results], function(err, data) {
            if(err) return console.log(err);
        });
}

module.exports = Test;