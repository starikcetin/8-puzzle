const imageCount = 3;
const imageFolderPath = "res/";
const imageExtension = ".jpg";

$(function () {

    $("html").disableSelection();

    home();
    imageSelect();
    game();

    // --- DEBUG BEGIN ---
    $("#home").hide();
    $("#game").show();
    setUpTheGame(getImageWithIndex(0));
    // --- DEBUG END   ---
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
    const grid = $("#gameGrid");

    const gw = grid.width();
    const gh = grid.height();
    const w = grid.width() / 3;
    const h = grid.height() / 3;

    for (let i = 0; i < 9; i++) {
        const indexForClosure = i;

        const l = w * (i % 3);
        const t = h * Math.floor(i / 3);
        
        const margin = 5;

        const cell = $("<div>")
            .text(i)
            .addClass("gameCell")
            .css({
                top: t,
                left: l,
                width: w - margin*2,
                height: h - margin*2,
                "background-size": gw - margin*2 + "px " + gh - margin*2 + "px",
                "background-position": (-l) + "px " + (-t) + "px",
                "margin": margin + "px"
            })
            .click(() => cellClicked(indexForClosure, cell))
            .appendTo("#gameGrid");

        if (i === 0) {
            cell
                .text("dummy")
                .attr("id", "dummyCell");
        }

        cellIdentities[i] = cell;
    }

    $("#shuffleAmountSelect select").change(function () {
        const selected = $(this).find(":selected");

        if (selected.index() !== 0) {
            $('#shuffleAmountSelect').fadeOut(250);

            shuffle(selected.text(), 3000, function () {
                $('#gameIsOn').fadeIn(250);
            });
        }
    });
}

function getImageWithIndex(index) {
    return "url(" + imageFolderPath + index + imageExtension + ")";
}