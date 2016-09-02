/**
 * Created by vkukanauskas on 29/08/2016.
 */
gridMaker = {
    getBinaryListFromImage: function () {
        this.pictureContainer = $('#picture');
        this.canvasContainer = $('#canvasContainer');
        this.imgUrl = this.pictureContainer.attr("src");
        this.imgWidth = Math.ceil(this.pictureContainer.width());
        this.imgHeight = Math.ceil(this.pictureContainer.height());
        this.accuracy = 1; //1 = check every pixel, 3 = every third, e.t.c. use with caution ! ! !
        this.amountOfVerticalLines = $('#linesVertical').val();
        this.gridPixelWidth = Math.ceil(this.imgWidth / this.amountOfVerticalLines);
        this.amountOfHorizontalLines = $('#linesHorizantal').val();
        this.gridPixelHeight = Math.ceil(this.imgHeight / this.amountOfHorizontalLines);
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
            base_image.onload = function () {
                gridMaker.gContext.drawImage(base_image, 0, 0, gridMaker.imgWidth, gridMaker.imgHeight);
                drawGridOnCanvas(gridMaker);
            }
        }


        function drawVerticlaLines(gridMaker) {
            for (var x = 0; x <= gridMaker.imgWidth; x += gridMaker.gridPixelWidth) {
                gridMaker.gContext.moveTo(x, 0);
                gridMaker.gContext.lineTo(x, gridMaker.imgHeight);
            }
        }

        function drawHorizontalLines(gridMaker) {
            for (var y = 0; y <= gridMaker.imgHeight; y += gridMaker.gridPixelHeight) {
                gridMaker.gContext.moveTo(0, y);
                gridMaker.gContext.lineTo(gridMaker.imgWidth, y);
            }
        }

        function getJsonFromCanvas(gridMaker) {
            var lineByLineAnalyses = {};
            var lineIndex = 0;
            for (var y = 0; y < gridMaker.imgHeight; y += gridMaker.gridPixelHeight) {
                var line = [];
                for (var x = 0; x < gridMaker.imgWidth; x += gridMaker.gridPixelWidth) {
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
                var isPixelEmpty = isItWhite(pixels[i], pixels[i + 1], pixels[i + 2], pixels[i+3]);
                if (!isPixelEmpty) {
                    empty = false;
                }
            }
            return empty;
        };

        function getWidthOfPixelRegion(gridMaker, x) {
            if (x+ gridMaker.gridPixelWidth> gridMaker.imgWidth) {
                return gridMaker.imgWidth - x-1;
            }
            return gridMaker.gridPixelWidth;
        }

        function getHeigthOfPixelRegion(gridMaker, y) {
            if (y+gridMaker.gridPixelWidth > gridMaker.imgHeight) {
                return gridMaker.imgHeight - y-1;
            }
            return gridMaker.gridPixelHeight;
        }


        function isItWhite(r, g, b, alpha) {
            return (r + g + b == 765 || alpha==0);
        }

    }
}