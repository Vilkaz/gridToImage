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
        imageURL: "http://localhost:8080/javax.faces.resource/img/test4Corners.png.xhtml",
        gridPixelWidth: 10,
        gridPixelHeight: 20
    }
    var array = imageScanner.getBinaryListFromImage(param2)
    console.log(array);

}