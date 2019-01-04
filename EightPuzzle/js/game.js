const grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let gameIsOn = false;

// imagePath must be wrapped in 'url()'
function setUpTheGame(imagePath) {
    console.log("setUpTheGame imagePath:" + imagePath);

    $(".gameCell").css("background-image", imagePath);

    resetActives();
}

function shuffleCells(amount, callback) {
    console.log("shuffleCells amount:" + amount);

    stepper(0, 0, amount, callback);

    function stepper(forbiddenSlot, currentStep, goal, finalCallback) {
        if (currentStep < goal) {
            shuffleStep(forbiddenSlot, function (newForbiddenSlot) {
                stepper(newForbiddenSlot, currentStep + 1, goal, finalCallback);
            });
        } else {
            finalCallback();
            resetActives();
            gameIsOn = true;
        }
    }
}

function makeNeighborsActive(slot) {
    const neighbors = neighborSlotsOfSlot(slot);
    neighbors.forEach(function (val) {
        const identity = grid[val];
        const cell = cellIdentities[identity];
        cell.addClass("activeCell");
    });
}

function makeEveryoneActive() {
    $(".gameCell").addClass("activeCell");
}

function makeEveryoneInactive() {
    $(".gameCell").removeClass("activeCell");
}

function resetActives() {
    makeEveryoneInactive();
    makeNeighborsActive(slotOfDummy());
}

function shuffleStep(forbiddenSlot, callback) {
    console.log("shuffle step forbiddenSlot: " + forbiddenSlot);

    const slotOfDummy = grid.indexOf(0);
    const neighborSlots = neighborSlotsOfSlot(slotOfDummy).exceptValue(forbiddenSlot);
    const randomNeighborSlot = neighborSlots.randomElement();

    swapIdentitiesInSlots(slotOfDummy, randomNeighborSlot, function () {
        callback(slotOfDummy);
    });
}

function swapIdentitiesInSlots(slot1, slot2, callback) {
    console.log("swapIdentitiesInSlots slot1: " + slot1 + " slot2: " + slot2);

    const identity1 = grid[slot1];
    const identity2 = grid[slot2];

    grid.swap(slot1, slot2);

    moveToSlot(identity1, slot2, function () {
        if (callback !== undefined) {
            callback();
        }
    });
    moveToSlot(identity2, slot1); //only need the callback from one of them.
}

function moveToSlot(identity, slot, callback) {
    console.log("moveToSlot identity: " + identity + " slot: " + slot);
    const cell = cellIdentities[identity];

    cell.animate({
        top: calcCellTop(slot),
        left: calcCellLeft(slot)
    }, 500, callback);
}

function neighborSlotsOfSlot(slot) {
    var returnArr = [];

    var up = slot - 3;
    var down = slot + 3;
    var left = slot - 1;
    var right = slot + 1;

    if (valid(up))
        returnArr.push(up);

    if (valid(down))
        returnArr.push(down);

    if (valid(left))
        returnArr.push(left);

    if (valid(right))
        returnArr.push(right);

    return returnArr;

    function valid(i) {
        var m3d = Math.abs((i % 3) - (slot % 3));
        return 0 <= i && i < 9 && (m3d === 1 || m3d === 0);
    }
}

function getNeighborSlotsOfDummy() {
    return neighborSlotsOfSlot(slotOfDummy(0));
}

function slotOfDummy() {
    return grid.indexOf(0);
}

function cellClicked(identity) {
    if (!gameIsOn) {
        console.log("game is not on");
        return;
    }

    const slot = grid.indexOf(identity);

    if (getNeighborSlotsOfDummy().includes(slot)) {
        console.log("clicked on active identity: " + identity);
        makeEveryoneActive();
        swapIdentitiesInSlots(slotOfDummy(), slot, function () {
            resetActives();
            checkVictoryAndAct();
        });

    } else {
        console.log("clicked on inactive identity: " + identity);
    }
}

function checkVictoryAndAct() {
    const victory = didWeWin();
    console.log("did we win? " + victory);

    if (victory) {
        gameIsOn = false;
        makeEveryoneActive();

        $("#gameIsOn").fadeOut(250, function () {
            $("#victory").fadeIn(250);
        });
    }
}

function didWeWin() {
    for (var i = 0; i < grid.length; i++) {
        if (grid[i] !== i) {
            return false;
        }
    }

    return true;
}