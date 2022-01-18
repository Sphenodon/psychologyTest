const Test = require('../models/test.model');

exports.getTest = async function (request, response) {
    const medianList = await Test.getDataForGraphs();
    response.render("test",{
        medianList: medianList,
    });
}

exports.getThanks = async function (request, response) {
    response.render("thanks", {

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

exports.getData = async function (request, response) {
    if (request.session.username == 'admin') {
        let csv = await Test.getResults();

        response.setHeader("Content-Type", "text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=users.csv");
        response.status(200).end(csv);
    } else {
        response.status(403).send('Access Denied!');
    }
}