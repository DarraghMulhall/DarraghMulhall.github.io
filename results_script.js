function receiveResults(){
    var results = window.location.search.substring(1)
    var decoded = decodeURI(results)
    var data = JSON.parse(decoded)

    return data
}


function renderBarChart(results){
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Big Five Personality Traits"
        },
        axisY: {
            title: "Score"
        },
        data: [{        
            type: "column",  
            legendMarkerColor: "grey",
            dataPoints: [      
                { y: results["ext"], label: "Extraversion" },
                { y: results["neu"],  label: "Agreeableness" },
                { y: results["con"],  label: "Conscientiousness" },
                { y: results["neu"],  label: "Neuroticism" },
                { y: results["opn"],  label: "Openness" }
            ]
        }]
    });
    chart.render()
}


function main(){
    var results = receiveResults()
    renderBarChart(results)
}


main()




