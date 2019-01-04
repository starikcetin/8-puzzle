const imageCount = 3;
const imageFolderPath = "res/";
const imageExtension = ".jpg";

let gridWidth;
let gridHeight;
let cellWidth;
let cellHeight;

$(function () {
    $("html").disableSelection();

    let grid = $("#gameGrid");
    gridWidth = grid.width();
    gridHeight = grid.height();
    cellWidth = grid.width() / 3;
    cellHeight = grid.height() / 3;

    home();
    imageSelect();
    game();

//    // --- DEBUG BEGIN ---
//    $("#home").hide();
//    $("#game").show();
//    setUpTheGame(getImageWithIndex(0));
//    // --- DEBUG END   ---
});


function home() {
    const homeContentCycle = $("#homeContent")
            .encapsulateLargestChild()
            .fadeCycleChildren(500, 500, 500);

    $("#homeToImageSelectButton").click(function () {
        $("#home").fadeOut(350, function () {
            clearInterval(homeContentCycle);
            $("#imageSelect").fadeIn(350);
        });
    });
}

function imageSelect() {
    let selectedImageIndex = 0;

    for (let i = 0; i < imageCount; i++) {
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
        setUpTheGame(getImageWithIndex(selectedImageIndex));

        $("#imageSelect").fadeOut(350, function () {
            $("#game").fadeIn(350);
        });
    });
}

const cellIdentities = [];

function game() {
    for (let i = 0; i < 9; i++) {
        const indexForClosure = i;

        const left = calcCellLeft(i);
        const top = calcCellTop(i);
        const margin = 5;

        const cell = $("<div>")
                .text(i)
                .addClass("gameCell")
                .css({
                    top: top,
                    left: left,
                    width: cellWidth - margin * 2,
                    height: cellHeight - margin * 2,
                    "background-size": gridWidth + "px " + gridHeight + "px",
                    "background-position": (-left) + "px " + (-top) + "px",
                    "margin": margin + "px"
                })
                .click(function () {
                    cellClicked(indexForClosure);
                })
                .appendTo("#gameGrid");

        if (i === 0) {
            cell
                    .text("dummy")
                    .attr("id", "dummyCell");
        }

        cellIdentities[indexForClosure] = cell;
    }

    $("#shuffleAmountSelect select").change(function () {
        const selected = $(this).find(":selected");

        if (selected.index() !== 0) {
            $('#shuffleAmountSelect').animate({opacity: 0}, 250, function () {

                shuffleCells(selected.text(), function () {
                    $('#shuffleAmountSelect').fadeOut(0, function () {
                        $('#gameIsOn').fadeIn(250);
                    });

                });
            });
        }
    });
}

function getImageWithIndex(index) {
    return "url(" + imageFolderPath + index + imageExtension + ")";
}

function calcCellLeft(i) {
    return cellWidth * (i % 3);
}

function calcCellTop(i) {
    return cellHeight * Math.floor(i / 3);
}