$(function () {
    var homeContentCycle = $("#homeContent").encapsulateLargestChild().fadeCycleChildren(500, 500, 500);
});

function homeToImageSelectButton() {
    $("#home").fadeOut(350, function () {
        $("#imageSelect").fadeIn(350);
    });
}