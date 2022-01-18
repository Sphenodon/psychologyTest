function createMedianChart() {
    const ctx = document.getElementById('medianChart');
    const chartName = 'Медианные значения пользователей'

    let medianList = $('#medianList').html().split(',');
    let labels = [];
    for (let i = 1; i <= medianList.length; i++) {
        labels.push(i);
    }
    // console.log(medianList)
    myChart(ctx, labels, medianList, chartName);
}