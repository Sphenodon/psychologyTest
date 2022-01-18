const myChart = (ctx, labels, data, chartName) =>{
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: chartName,
                data: data,
                backgroundColor: 'rgb(255,95,0)',
                borderColor: 'rgb(255,95,0)',
                tension: 0.1,
            }]
        },
        options: {
            scales: {
                x: {
                    display: true,
                    title:{
                        display: true,
                        align: 'center',
                        text: 'Забег',
                        color: '#ff1d1d',
                        font: {
                            family: 'cursive',
                            size: 20,
                            style: 'italic',
                            lineHeight: 1.2,
                        },
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Cчёт',
                        color: '#191',
                        font: {
                            family: 'cursive',
                            size: 20,
                            style: 'italic',
                            lineHeight: 1.2
                        },
                    }
                }
            }
        }
    });
};