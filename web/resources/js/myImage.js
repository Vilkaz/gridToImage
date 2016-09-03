/**
 * Created by vkukanauskas on 26/08/2016.
 */
function getBinaryOnClick() {
    var param = {
        imageURL: "http://localhost:8080/javax.faces.resource/img/test4Corners.png.xhtml",
        gridPixelWidth: 10,
        gridPixelHeight: 10
    }
    var array = imageScanner.getBinaryListFromImage(param)
    console.log(array);

}