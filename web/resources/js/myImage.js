/**
 * Created by vkukanauskas on 26/08/2016.
 */
function getBinaryOnClick() {
    var param = {
        pictureContainerID: "picture",
        canvasContainerId: "canvasContainer",
        amountOfVerticalLines: $('#linesVertical').val(),
        amountOfHorizontalLines: $('#linesHorizantal').val(),
        accuracy: 1
    }
    var bynariArray = binaryArrayGenerator.getBinaryListFromImage(param);
    console.log(binaryArrayGenerator.getBinaryListFromImage(param));
    console.log("debuger here");
}