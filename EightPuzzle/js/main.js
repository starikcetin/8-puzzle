const imageCount = 3;
const imageFolderPath = "res/";
const imageExtension = ".jpg";

$(function () {

    $("html").disableSelection();

//    //
//    $("#home").hide();
//    $("#game").show();
//    setUpTheGrid(undefined);
//    return;
//    //

//
// home
//
    var homeContentCycle = $("#homeContent")
            .encapsulateLargestChild()
            .fadeCycleChildren(500, 500, 500);

    $("#homeToImageSelectButton").click(function () {
        $("#home").fadeOut(350, function () {
            clearInterval(homeContentCycle);
            $("#imageSelect").fadeIn(350);
        });
    });

//
// image select
//
    var selectedImageIndex = 0;

    for (var i = 0; i < imageCount; i++) {
        // closures always get the i = 3, so we need to fix that with a const.
        // this will force interpreter to create a new variable for each value.
        const indexForClosure = i;

        $('<div/>')
                .css({"background-image": getImageWithIndex(indexForClosure)})
                .addClass('imageButton')
                .click(function () {
                    selectedImageIndex = indexForClosure;

                    $('#selectedImageButton').removeAttr('id');
                    $(this).attr('id', 'selectedImageButton');

                    $('#continueButton')
                            .css({visibility: 'visible'})
                            .animate({opacity: '1'}, 350);
                })
                .appendTo('#imageButtonContainer');
    }

    $("#continueButton").click(function () {
        setUpTheGrid(getImageWithIndex(selectedImageIndex));

        $("#imageSelect").fadeOut(350, function () {
            $("#game").fadeIn(350);
        });
    });

//
// game
//

    
});

function getImageWithIndex(index) {
    return "url(" + imageFolderPath + index + imageExtension + ")";
}