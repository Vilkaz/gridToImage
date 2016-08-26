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
    var verticalStep = width/amountOfVerticalLines;
    var amountOfHorizontalLines = $('#linesHorizantal').val();
    var horizontalStep = height/amountOfHorizontalLines;
    canvasContainer.empty();
    canvasContainer.append(canvasDiv);
    drawGridOnCanvas(this);

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

    function drawGridOnCanvas(obj) {
        var c = document.getElementById("canvasID");
        var ctx = c.getContext("2d");
        drawVerticlaLines(ctx);
        drawHorizontalLines(ctx);
        ctx.stroke();
        drawRectangle(ctx);
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

    function drawRectangle(ctx){
        var xWidth = pictureContainer.width();
        var yHeight = pictureContainer.height();
        var amountOfVerticalLines = $('#linesVertical').val();
        var verticalStep = xWidth/amountOfVerticalLines;
        var amountOfHorizontalLines = $('#linesHorizantal').val();
        var horizontalStep = height/amountOfHorizontalLines;
        for (var xx = 0;xx<this.width;xx+=verticalStep){
            var lineReport="";
            for(var yy=0;yy<this.height;yy+=horizontalStep){
                if (isRectangleEmpty(ctx, xx,yy)){
                    lineReport+="_";
                }else {
                    lineReport+="X"
                };
            }
            console.log(lineReport);
        }
}

    function isRectangleEmpty(ctx, x,y){
        var pixels = ctx.getImageData(x, y, horizontalStep, verticalStep).data;
        var empty = true;
        $.each(pixels, function(iterator){
            if (pixels[iterator]!=0){
                empty=false;
            };
        })
        return empty;
    };

    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

}