$('.answerA').hide()
$('.answerB').hide()
$('#plus').hide()
$('#minus').hide()
$('#times').hide()
$('#equal').hide()
$('#delResult').hide();

//show Answer Matrix
function optionChanged(matrixName, value){
    $(`.answer${matrixName}`).slideUp()
    $(`.answer${matrixName}${value}`).slideDown('slow')
}