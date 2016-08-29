/**
 * Created by vkukanauskas on 29/08/2016.
 */
gridMaker = {
    drawGrid: function () {
        this.pictureContainer = $('#picture');
        this.canvasContainer = $('#canvasContainer');
        this.imgUrl = this.pictureContainer.attr("src");
        this.imgWidth = this.pictureContainer.width();
        this.imgHeight = this.pictureContainer.height();
        this.accuracy = 1; //1 = check every pixel, 3 = every third, e.t.c.
        this.amountOfVerticalLines = $('#linesVertical').val();
        this.verticalStep = this.imgWidth / this.amountOfVerticalLines;
        this.amountOfHorizontalLines = $('#linesHorizantal').val();
        this.horizontalStep = this.imgHeight / this.amountOfHorizontalLines;
        this.canvasDiv = getCanvas(this);
        this.canvasContainer.empty();
        this.canvasContainer.append(this.canvasDiv);
        /**
         * i have to change the size AFTER the append, else the default values overwrite my values ...
         */
        $(this.canvasDiv).attr("height", this.imgHeight);
        $(this.canvasDiv).attr("width", this.imgWidth);

        /**
         * this initialisation only works, if i get the div after it was apended.
         * i can't just take this.canvasDiv here, it won't work
         */
        var c = document.getElementById("canvasID");
        this.gContext = c.getContext("2d");
        drawImage(this);

        function getCanvas() {
            var canvas = $('<canvas/>');
            var pictureDiv = $('#picture');
            var imgUrl = pictureDiv.attr("src");
            $(canvas).attr("id", "canvasID");
            $(canvas).addClass("grid");
            // $(canvas).css("background-image", "url(" + imgUrl + ")");
            return canvas;
        }

        function drawGridOnCanvas(gridMaker) {
            getJsonFromCanvas(gridMaker);
            drawVerticlaLines(gridMaker);
            drawHorizontalLines(gridMaker);
            gridMaker.gContext.stroke();
        }

        function drawImage(gridMaker) {
            var base_image = new Image();
            base_image.src = gridMaker.imgUrl;
            base_image.onload = function () {
                gridMaker.gContext.drawImage(base_image, 0, 0, gridMaker.imgWidth, gridMaker.imgHeight);
                drawGridOnCanvas(gridMaker);
            }
        }


        function drawVerticlaLines(gridMaker) {
            for (var x = 0; x <= gridMaker.imgWidth; x += gridMaker.verticalStep) {
                gridMaker.gContext.moveTo(x, 0);
                gridMaker.gContext.lineTo(x, gridMaker.imgHeight);
            }
        }

        function drawHorizontalLines(gridMaker) {
            for (var y = 0; y <= gridMaker.imgHeight; y += gridMaker.horizontalStep) {
                gridMaker.gContext.moveTo(0, y);
                gridMaker.gContext.lineTo(gridMaker.imgWidth, y);
            }
        }

        function getJsonFromCanvas(gridMaker) {
            var lineByLineAnalyses = {};
            var lineIndex = 0;
            for (var y = 0; y < gridMaker.imgHeight; y += gridMaker.horizontalStep) {
                var line = [];
                for (var x = 0; x < gridMaker.imgWidth; x += gridMaker.verticalStep) {
                    if (isRectangleEmpty(gridMaker, x, y)) {
                        line.push(0);
                    } else {
                        line.push(1);
                    }
                }
                lineByLineAnalyses[lineIndex++] = line;
            }
            console.log(lineByLineAnalyses);
        }

        function isRectangleEmpty(gridMaker, x, y) {
            var pixels = gridMaker.gContext.getImageData(x, y, gridMaker.verticalStep, gridMaker.horizontalStep).data;
            var empty = true;
            var step = gridMaker.accuracy;
            var amountOfPixels = pixels.length;
            for (var i = 0; i < amountOfPixels; i += 4 * step) {
                var isPixelEmpty = isItWhite(pixels[i], pixels[i + 1], pixels[i + 2]);
                if (!isPixelEmpty) {
                    empty = false;
                }
            }
            // drawRectangle({
            //     x: x,
            //     y: y,
            //     empty: empty,
            //     gridMaker: gridMaker
            // })

            return empty;
        };

        function drawRectangle(parameter) {
            var gContext = parameter.gridMaker.gContext;

            gContext.strokeStyle = (parameter.empty) ? "white" : "black";
            gContext.fillRect(
                parameter.x,
                parameter.y,
                parameter.gridMaker.verticalStep,
                parameter.gridMaker.horizontalStep);
        }


        function isItWhite(r, g, b) {
            return r + g + b == 765;
        }

    }
}