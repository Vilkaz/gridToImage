/**
 * Created by vkukanauskas on 26/08/2016.
 */
function getBinaryOnClick() {
    // var param = {
    //     pictureContainerID: "picture",
    //     canvasContainerId: "canvasContainer",
    //     amountOfVerticalLines: $('#linesVertical').val(),
    //     amountOfHorizontalLines: $('#linesHorizantal').val(),
    //     accuracy: 1
    // }
    // var bynariArray = binaryArrayGenerator.getBinaryListFromImage(param);


    var param2 = {
        imageURL : "http://www.clker.com/cliparts/L/X/7/n/H/j/transparent-arrow-hi.png",
        gridPixelWidth: 10,
        gridPixelHeight: 20
    }
    var test2 = imageScanner.getBinaryListFromImage(param2);
    console.log(test2);
}