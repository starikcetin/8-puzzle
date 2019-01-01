function setUpTheGrid(image) {
    // functionality
    $(".gameCell").each(function (index) {
        $(this).text(index);

        // these are 0-based
        var col = index % 3;
        var row = Math.floor(index / 3);

        // adding 1 to 0-based values, because css grid is 1-based
        $(this).css({
            "grid-area": (row + 1) + " / " + (col + 1) + " / span 1 / span 1"}
        );
    });

    shuffle($("#gameGrid"), 3);
}

function shuffle(grid, moves) {
    
}

function switchCellsWithIndex(grid, i1, i2) {
    var a = $(grid.children()[i1]);
    var b = $(grid.children()[i2]);
    
    switchCells(a, b);
}

function switchCells(a, b) {
    var aRow = row(a);
    var aCol = col(a);

    setRow(a, row(b));
    setCol(a, col(b));

    setRow(b, aRow);
    setCol(b, aCol);
}

function setRow(cell, value) {
    cell.css("grid-row", value + " / span 1");
}

function setCol(cell, value) {
    cell.css("grid-column", value + " / span 1");
}

function row(cell) {
    return cell.css("grid-row").charAt(0);
}

function col(cell) {
    return cell.css("grid-column").charAt(0);
}