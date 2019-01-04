const grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// imagePath must be wrapped in 'url()'
function setUpTheGame(imagePath) {
    console.log("setUpTheGame imagePath:" + imagePath);

    $(".gameCell").css("background-image", imagePath);
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
        }
    }
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

    moveToSlot(identity1, slot2, callback);
    moveToSlot(identity2, slot1); //only need the callback from one of them.
}

function moveToSlot(identity, slot, callback) {
    console.log("moveToSlot identity: " + identity + " slot: " + slot);
    const cell = cellIdentities[identity];

    cell.animate({
        top: calcCellTop(slot),
        left: calcCellLeft(slot)
    }, 250, callback);
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