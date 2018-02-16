function renderQs(){
    $.when( $.getJSON('20qs_test.json'), $.getJSON('choice_scores.json') ).then(function( qs, choice_scores ){
        var choice_titles = ["Very Inaccurate", "Moderately Inaccurate", "Neither Accurate Nor Inaccurate", "Moderately Accurate", "Very Accurate"]
        qs_arr = qs[0];
        var choices = choice_scores[0]
        for(var i=0; i<qs_arr.length; i++){
            var choice_cells_html = ''

            for(var j=0; j<5; j++){
                    choice_cells_html += '<td>'+choice_titles[j]+'<input type="RADIO" class="Q'+(i+1)+'" name="Q'+(i+1)+'" value="'
                        +choices[qs_arr[i]["plus-or-minus"]][j]["score"]+'"></td>'
            }

            $('#questions_table').append('<tr><td>'+qs_arr[i]["text"]+'</td>' + choice_cells_html)   
       }
        console.log(qs_arr)
        console.log(choices)
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

    console.log(eSum + " " + aSum + " " + cSum + " " + nSum + " " + oSum)
    var jsonObj = '{"ext":'+eSum+', "agr":'+aSum+', "con":'+cSum+', "neu":'+nSum+', "ext":'+eSum+'}'
    window.location = "show_results.html?" + JSON.stringify(jsonObj)
}


function processSubmitClick(){
    $('#submit_answers').click(function() {
    if(checkIfAllQsAnswered())
        processAnswers()
    else
        alert("All questions must be answered")
    });
}


var qs_arr = []

renderQs()
processSubmitClick()


