const Test = require('../models/test.model.js');

exports.getTest = function (request, response) {
    response.render("test",{

    });
}

exports.getThanks = function (request, response) {
    response.render("thanks",{

    });
}

exports.postTest = function (request, response) {
    if(!request.body) return response.sendStatus(400);

    const name = request.body.name;
    const age = request.body.age;
    const gamer = request.body.gamer;
    const comment = request.body.comment;
    const results = request.body.results;

    Test.postResults(name, age, gamer, comment, results);

    response.redirect("/thanks");
}