/**
 * Created by vkukanauskas on 29/08/2016.
 */
binaryArrayGenerator = {
    getBinaryListFromImage: function (param) {
        this.pictureContainer = $('#' + param.pictureContainerID);
        this.canvasContainer = $('#' + param.canvasContainerId);
        this.imgUrl = this.pictureContainer.attr("src");
        // this.imgUrl = param.pictureURL;
        this.imgWidth = this.pictureContainer.width();
        this.imgHeight = this.pictureContainer.height();
        this.accuracy = param.accuracy; //1 = check every pixel, 3 = every third, e.t.c. use with caution ! ! !
        this.amountOfVerticalLines = param.amountOfVerticalLines;
        this.widthStep = Math.ceil(this.imgWidth / this.amountOfVerticalLines);
        this.amountOfHorizontalLines = param.amountOfHorizontalLines;
        this.heigthStep =Math.ceil(this.imgHeight / this.amountOfHorizontalLines);
        this.canvasID = getUniqueID();
        this.canvasDiv = getCanvas(this.canvasID);
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
        var c = document.getElementById(this.canvasID);
        this.gContext = c.getContext("2d");
        drawImage(this);

        function getCanvas(id) {
            var canvas =$('<canvas />').attr({
                // Style: 'position:absolute; left:-5000px;right -5000', //so that we don't need an css file included
                id: id
            })
            return canvas;
        };

        function getUniqueID() {
            var id;
            do {
                id = "myUniqueID"+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 25);
            } while ($('#' + id).length != 0)
            return id;
        }

        function drawGridOnCanvas(gridMaker) {
            var booleanJson = getJsonFromCanvas(gridMaker);
            var binaryJson = getBinaryArithmeticFromBooleans(booleanJson);
            console.log(binaryJson);
            drawVerticlaLines(gridMaker);
            drawHorizontalLines(gridMaker);
            gridMaker.gContext.stroke();
            return binaryJson;

        }

        function getBinaryArithmeticFromBooleans(booleanJson) {
            var binaryArray = [];

            for (var index in booleanJson) {
                var binaryNumber = 0;
                var array = booleanJson[index];
                var counter = array.length - 1;
                var power = 0;
                for (; counter >= 0; counter--) {
                    if (array[counter] == 1) {
                        binaryNumber += Math.pow(2, power);
                    }
                    power++;
                }
                binaryArray.push(binaryNumber);
            }

            return binaryArray;

        }

        function drawImage(gridMaker) {
            var base_image = new Image();
            base_image.src = gridMaker.imgUrl;
            gridMaker.gContext = c.getContext("2d");
            base_image.onload = function () {
                gridMaker.gContext.drawImage(base_image, 0, 0, gridMaker.imgWidth, gridMaker.imgHeight);
                drawGridOnCanvas(gridMaker);
            }
        }

        function getJsonFromCanvas(gridMaker) {
            var lineByLineAnalyses = {};
            var lineIndex = 0;
            for (var y = 0; y < gridMaker.imgHeight; y += gridMaker.heigthStep) {
                var line = [];
                for (var x = 0; x < gridMaker.imgWidth; x += gridMaker.widthStep) {
                    if (isRectangleEmpty(gridMaker, x, y)) {
                        line.push(0);
                    } else {
                        line.push(1);
                    }
                }
                lineByLineAnalyses[lineIndex++] = line;
            }
            console.log(lineByLineAnalyses);
            return lineByLineAnalyses;
        }

        function isRectangleEmpty(gridMaker, x, y) {
            var widthOfPixelRegion = getWidthOfPixelRegion(gridMaker, x);
            var heigthOfPixelRegion = getHeigthOfPixelRegion(gridMaker, y);
            var pixels = gridMaker.gContext.getImageData(x, y, widthOfPixelRegion, heigthOfPixelRegion).data;
            var empty = true;
            var step = gridMaker.accuracy;
            for (var i = 0; i < pixels.length; i += 4 * step) {
                var isPixelEmpty = isItWhite(pixels[i], pixels[i + 1], pixels[i + 2], pixels[i+3]);
                if (!isPixelEmpty) {
                    empty = false;
                }
            }
            return empty;
        };

        function getWidthOfPixelRegion(gridMaker, x) {
            if (x + gridMaker.widthStep > gridMaker.imgWidth) {
                return gridMaker.imgWidth - x;
            }
            return gridMaker.widthStep;
        }

        function getHeigthOfPixelRegion(gridMaker, y) {
            if (y + gridMaker.heigthStep > gridMaker.imgHeight) {
                return gridMaker.imgHeight - y;
            }
            return gridMaker.heigthStep;
        }


        function isItWhite(r, g, b, alpha) {
            return (r + g + b == 765 ||alpha ==0);//765 is not allways ancheved, and it helps with jpg
        }

        function drawVerticlaLines(gridMaker) {
            for (var x = 0; x <= gridMaker.imgWidth; x += gridMaker.widthStep) {
                gridMaker.gContext.moveTo(x, 0);
                gridMaker.gContext.lineTo(x, gridMaker.imgHeight);
            }
        }

        function drawHorizontalLines(gridMaker) {
            for (var y = 0; y <= gridMaker.imgHeight; y += gridMaker.heigthStep) {
                gridMaker.gContext.moveTo(0, y);
                gridMaker.gContext.lineTo(gridMaker.imgWidth, y);
            }
        }

    }
}
