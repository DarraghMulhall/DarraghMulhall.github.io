function receiveResults(){
    var results = window.location.search.substring(1)
    console.log(results)
    var decoded = decodeURI(results)
    console.log(decoded)
    var data = JSON.parse(decoded)
    console.log(data)

    return data
}


function renderBarChart(results){
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
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

function cleanURL(){
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
    }
}

function main(){
    var results = receiveResults()
    renderBarChart(results)
    //cleanURL()
}


main()




