$(function () {
    var homeContentTimer = setInterval(function () {
        $("#homeContent").children().each(function (index) {
            if ($(this).hasClass("hide") === false) {
                $(this).addClass("hide");
                $(this).nextCircular().removeClass("hide");
                return false;
            }
        });
    }, 2000);
});