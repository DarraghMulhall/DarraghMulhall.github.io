document.write(5 + 6);

var qs_arr = []

$.getJSON('20qs_test.json', function (data) {
    qs_arr = JSON.parse(JSON.stringify(data))
    for(var i=0; i<data; i++){
        $('#questions_table').append('<tr><td>'+qs_arr[i]["text"]+'</td><td></td></tr>');
    }
});

var choices_arr = []
$.getJSON('choice_scores.json', function (data) {
    choices_arr = data
});
console.log(qs_arr.length)
for(var i=0; i<qs_arr.length; i++){
    console.log("shalom")
    $('#questions_table').append('<tr><td>'+qs_arr[i]["text"]+'</td><td>more data</td></tr>');
}
