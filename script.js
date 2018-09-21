function receiveUsername(){
    var results = window.location.search.substring(1)
    var decoded = decodeURI(results)
    var index = decoded.indexOf("=")
    var username = decoded.substring(index+1)
    console.log(username)
    if(username.charAt(0) == '@'){
        username = username.substring(1)
    }
    return username
}



function renderQs(){
    $.when( $.getJSON('20qs_test.json'), $.getJSON('choice_scores.json') ).then(function( qs, choice_scores ){
        var choice_titles = ["Very Inaccurate", "Moderately Inaccurate", "Neither Accurate Nor Inaccurate", "Moderately Accurate", "Very Accurate"]
        qs_arr = qs[0];
        var choices = choice_scores[0]
        for(var i=0; i<qs_arr.length; i++){
            var choice_cells_html = ''

            for(var j=0; j<5; j++){
                    choice_cells_html += '<td style="width">'+choice_titles[j]+'<br><input type="RADIO" class="Q'+(i+1)+'" name="Q'+(i+1)+'" style="height:20px; width:20px;" value="'
                        +choices[qs_arr[i]["plus-or-minus"]][j]["score"]+'"></td>'
            }

            $('#questions_table').append('<tr><td>'+(i+1)+'.</td><td>'+qs_arr[i]["text"]+'</td>' + choice_cells_html)   
       }
        $('#submit_answers').css('display', 'inline-block')
        
    });
}

//retrieve the test the user is doing and use that for loop length
function checkIfAllQsAnswered(){
    for(var i=0; i<20; i++){
        if(!$('.Q'+(i+1)).is(':checked')){
            return false
        }
    }
    return true
}

function getArrayOfUnansweredQs(){
    var qs = []
    for(var i=0; i<20; i++){
        if(!$('.Q'+(i+1)).is(':checked')){
            qs.push("Q"+(i+1))
        }
    }
    return qs
}



function processAnswers(){
    var count = 0;

    var eSum = 0
    var aSum = 0
    var cSum = 0
    var nSum = 0
    var oSum = 0

    $('input:checked').each(function(){
        var domain = qs_arr[count]["domain"]
        switch(domain){
            case 'E':
                eSum+=parseInt($(this).val())
                break
            case 'A':
                aSum+=parseInt($(this).val())
                break
            case 'C':
                cSum+=parseInt($(this).val())
                break
            case 'N':
                nSum+=parseInt($(this).val())
                break
            case 'O':
                oSum+=parseInt($(this).val())
                break
        }
        count++
    });
    var username = receiveUsername()
    var jsonObj = {"ext":eSum,"agr":aSum,"con":cSum,"neu":nSum,"opn": oSum}
    
    window.location = "show_results.html?" + JSON.stringify(jsonObj)
    //disable post of data as server no longer running to receive request.
    
//     $.ajax({
//         type: 'POST',
//         data: JSON.stringify({"username": username, "scores": {"ext":eSum,"agr":aSum,"con":cSum,"neu":nSum,"opn": oSum}}),
//         contentType: 'application/json',
//         url: 'https://ec2-35-177-200-56.eu-west-2.compute.amazonaws.com:3000',
//         success: function(data) {
//             window.location = "show_results.html?" + JSON.stringify(jsonObj)
//         }
//     });
    
}


function processSubmitClick(){
    $('#submit_answers').click(function() {
    if(checkIfAllQsAnswered())
        processAnswers()
    else{
        var str = ""
        var arr = getArrayOfUnansweredQs()
        for(var i=0; i<arr.length; i++){
            str += arr[i] + ", "
        }
        str = str.substring(0, str.length - 2);
        alert("All questions must be answered.\n\nUnanswered qs: "+str)
    }
        
    });
}

function main(){
    receiveUsername()
    var qs_arr = []
    renderQs()
    processSubmitClick()
}

main()




