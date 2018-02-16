function receiveResults(){
    var results = window.location.search.substring(1)
    var data = JSON.parse(results)
    console.log(data)
}

receiveResults()