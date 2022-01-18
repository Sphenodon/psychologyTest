const User = require("./db");
const {Parser: Json2csvParser} = require("json2csv");

const Test = function (){

}

Test.postResults = (name, age, gamer, comment, results) => {
    User.create({
        name: name,
        age: age,
        gamer: gamer,
        comment: comment,
        results: results
    }).then(res=>{
        const user = {name: res.name, age: res.age, gamer: res.gamer, comment: res.comment, results: res.results};
        console.log(user);
    }).catch(err=>console.log(err));
}

Test.getResults = async () => {
    return await User.findAll({raw: true})
        .then(users => {
            const jsonUsers = JSON.parse(JSON.stringify(users));
            const csvFields = ['name', 'age', 'gamer', 'comment', "results"];
            const json2csvParser = new Json2csvParser({csvFields});
            return json2csvParser.parse(jsonUsers);
        })
        .catch(err => {
            console.log(err);
        });
}

Test.getDataset = async () => {
    return await User.findAll({raw: true})
        .then(users => {
            return JSON.parse(JSON.stringify(users));
        })
        .catch(err => {
            console.log(err);
        });
}

Test.getDataForGraphs = async () => {
    let dataSet;
    await Test.getDataset()
        .then(result => {
            dataSet = result;
        })
        .catch(err => {
            console.log(err);
        });
    let result = [];
    let labelForGraph = new Set;
    let dataForGraph = [];
    let data;
    let finalDataSet = [];

    for (let i = 0; i < dataSet.length; i++) {
        data = dataSet[i]['results'].split(", ").filter(x => x.trim().length && !isNaN(x)).map(Number);
        for (let j = 0; j < data.length - 1; j = j + 2) {
            labelForGraph.add(data[j]);
            dataForGraph.push(data[j + 1]);
        }
    }

    for (let i = 0; i < dataForGraph.length; i += 12) {
        result.push(dataForGraph.slice(i, i + 12));
    }

    for (let j = 0; j < result[0].length; j++) {
        finalDataSet[j] = [];
    }

    for (let i = 0; i < dataSet.length; i++) {
        data = result[i];
        for (let j = 0; j < data.length; j++) {
            finalDataSet[j].push(data[j]);
        }
    }

    function findMedian(data) {
        // extract the .values field and sort the resulting array
        let m = data.map(function (v) {
            return v;
        }).sort(function (a, b) {
            return a - b;
        });
        // console.log(m);
        let middle = Math.floor((m.length - 1) / 2); // NB: operator precedence
        if (m.length % 2) {
            return m[middle];
        } else {
            return (m[middle] + m[middle + 1]) / 2.0;
        }
    }

    let medianList = [];
    for (let i = 0; i < finalDataSet.length; i++) {
        medianList.push(findMedian(finalDataSet[i]));
    }

    return medianList;
}

module.exports = Test;