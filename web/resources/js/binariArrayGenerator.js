/**
 * Created by vkukanauskas on 29/08/2016.
 */
binaryArrayGenerator = {
    getBinaryListFromImage: function (param) {
        this.pictureContainer = $(param.pictureContainerID);
        this.canvasContainer = $(param.canvasContainerId);;
        this.imgUrl = this.pictureContainer.attr("src");
        this.imgWidth = this.pictureContainer.width();
        this.imgHeight = this.pictureContainer.height();
        this.accuracy = param.accuracy; //1 = check every pixel, 3 = every third, e.t.c. use with caution ! ! !
        this.amountOfVerticalLines = param.amountOfVerticalLines;
        this.verticalStep = Math.ceil(this.imgWidth / this.amountOfVerticalLines);// else we are checking pixels outside of visible canvas
        this.amountOfHorizontalLines = param.amountOfHorizontalLines;
        this.horizontalStep = Math.ceil(this.imgHeight / this.amountOfHorizontalLines);// else we are checking pixels outside of visible canvas 
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
        var c = document.getElementById(param.canvasContainerId);
        this.gContext = c.getContext("2d");
        drawImage(this);

        function getCanvas() {
            var canvas = $('<canvas/>');
            $(canvas).attr("id", "canvasID");
            $(canvas).addClass("grid");
            return canvas;
        }

        function drawGridOnCanvas(gridMaker) {
            var booleanJson =  getJsonFromCanvas(gridMaker);
            var binaryJson = getBinaryArithmeticFromBooleans(booleanJson);
            console.log(binaryJson);
            return binaryJson;
            // drawVerticlaLines(gridMaker);
            // drawHorizontalLines(gridMaker);
            // gridMaker.gContext.stroke();
        }

        function getBinaryArithmeticFromBooleans(booleanJson){
            var binaryArray=[];

            for (var index in booleanJson){
                var binaryNumber=0;
                var array = booleanJson[index];
                var counter = array.length-1;
                var power=0;
                for (;counter>0;counter--){
                    var empty = array[counter];
                    if (array[counter]==1){
                        binaryNumber+=Math.pow(2,power++);
                    }
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
            return lineByLineAnalyses;
        }

        function isRectangleEmpty(gridMaker, x, y) {
            var widthOfPixelRegion = getWidthOfPixelRegion(gridMaker, x);
            var heigthOfPixelRegion = getHeigthOfPixelRegion(gridMaker, y);
            var pixels = gridMaker.gContext.getImageData(x, y, widthOfPixelRegion, heigthOfPixelRegion).data;
            var empty = true;
            var step = Math.ceil(gridMaker.accuracy);
            var amountOfPixels = pixels.length;
            for (var i = 0; i < amountOfPixels; i += 4 * step) {
                var isPixelEmpty = isItWhite(pixels[i], pixels[i + 1], pixels[i + 2]);
                if (!isPixelEmpty) {
                    empty = false;
                }
            }
            return empty;
        };

        function getWidthOfPixelRegion(gridMaker, x) {
            if (x+ gridMaker.verticalStep> gridMaker.imgWidth) {
                return gridMaker.imgWidth - x-1;
            }
            return gridMaker.verticalStep;
        }

        function getHeigthOfPixelRegion(gridMaker, y) {
            if (y+gridMaker.verticalStep > gridMaker.imgHeight) {
                return gridMaker.imgHeight - y-1;
            }
            return gridMaker.horizontalStep;
        }


        function isItWhite(r, g, b) {
            return r + g + b == 765;
        }

    }
}
