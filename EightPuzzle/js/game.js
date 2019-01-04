let currentGrid = [];
let dummyIndex = 0;

// imagePath must be wrapped in 'url()'
function setUpTheGame(imagePath) {
    $(".gameCell").css("background-image", imagePath);
    currentGrid = originalGrid.slice();
}

