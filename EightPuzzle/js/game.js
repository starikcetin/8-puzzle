function setUpTheGrid(image) {
    $("#gameGrid").makeGridCellsUniformWithExplicitStartAndEnd();
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
    // fisher - yates
    
    var aRow = a.gridRowStart();
    var aCol = a.gridColumnStart();

    a.gridRowStart(b.gridRowStart());
    a.gridColumnStart(b.gridColumnStart());

    b.gridRowStart(aRow);
    b.gridColumnStart(aCol);
}
