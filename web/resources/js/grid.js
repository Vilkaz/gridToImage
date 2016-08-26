/**
 * Created by vkukanauskas on 26/08/2016.
 */
function makeGrid() {
    var pictureContainer = $('#picture');
    var canvasContainer = $('#canvasContainer');
    var canvasDiv = getCanvas();
    this.width = pictureContainer.width();
    this.height = pictureContainer.height();
    var amountOfVerticalLines = $('#linesVertical').val();
    var verticalStep = this.width/amountOfVerticalLines;
    var amountOfHorizontalLines = $('#linesHorizantal').val();
    var horizontalStep = this.height/amountOfHorizontalLines;
    canvasContainer.empty();
    canvasContainer.append(canvasDiv);
    drawGridOnCanvas();

    function getCanvas() {
        var canvas = $('<canvas/>');
        var pictureDiv = $('#picture');
        var imgUrl= pictureDiv.attr("src");
        $(canvas).attr("id", "canvasID");
        $(canvas).attr("width", this.width);
        $(canvas).attr("height", this.height);
        $(canvas).addClass("grid");
        $(canvas).css("background-image", "url(" + imgUrl + ")");
        return canvas;
    }

    function drawGridOnCanvas() {
        var c = document.getElementById("canvasID");
        var ctx = c.getContext("2d");
        drawVerticlaLines(ctx);
        drawHorizontalLines(ctx);
        ctx.stroke();
    }

    function drawVerticlaLines(ctx) {
        for (var x = 0; x <= this.width; x += verticalStep) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
        }
    }
    function drawHorizontalLines(ctx) {
        for (var y = 0; y <= this.height; y += horizontalStep) {
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
        }
    }

}