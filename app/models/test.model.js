const sql = require('./db.js')

const Test = function (){

}

Test.postResults = (name, age, gamer, comment, results) => {
    sql.query("INSERT INTO users (name, age, gamer, comment, results) VALUES (?,?,?,?,?)", [name, age, gamer, comment, results], function(err, data) {
            if(err) return console.log(err);
        });
}

module.exports = Test;