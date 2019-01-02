function setUpTheGrid(image) {

    var grid = $("#gameGrid");
    var cells = grid.children();

    var w = grid.width() / 3;
    var h = grid.height() / 3;

    cells.each(function (index) {
        var cell = $(this);
        var l = w * (index % 3);
        var t = h * Math.floor(index / 3);

        cell.css({top: t, left: l, width: w, height: h});
    });

}

function shuffle(moves) {

}

function switchCellsWithIndex(a, b) {

}

function switchCells(a, b) {

}
