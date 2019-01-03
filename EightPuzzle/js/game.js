// imagePath must be wrapped in 'url()'
function setUpTheGrid(imagePath) {

    console.log(imagePath);

    var grid = $("#gameGrid");
    var cells = grid.children();

    var gw = grid.width();
    var gh = grid.height();
    var w = grid.width() / 3;
    var h = grid.height() / 3;

    cells.each(function (index) {
        var cell = $(this);
        var l = w * (index % 3);
        var t = h * Math.floor(index / 3);

        cell.css({
            top: t,
            left: l,
            width: w,
            height: h,
            "background": imagePath + " no-repeat",
            "background-size": gw + "px " + gh + "px",
            "background-position": (-l) + "px " + (-t) + "px"
        });
    });

}

function shuffle(moves) {

}

function switchCellsWithIndex(a, b) {

}

function switchCells(a, b) {

}
