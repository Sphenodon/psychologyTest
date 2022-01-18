function createUserChart() {
    const ctx = document.getElementById('userChart');
    const chartName = 'Ваши результаты'

    let userScoreList = $('#inputResults').val().split(', ').filter(x => x.trim().length && !isNaN(x)).map(Number);
    let labelForGraph = [];
    let dataForGraph = [];

    for (let j = 0; j < userScoreList.length - 1; j = j + 2) {
        labelForGraph.push(userScoreList[j]);
        dataForGraph.push(userScoreList[j + 1]);
    }

    // console.log(userScoreList, "userScoreList")

    myChart(ctx, labelForGraph, dataForGraph, chartName);
}