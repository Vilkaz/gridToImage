/**
 * Created by vkukanauskas on 29/08/2016.
 */
imageScanner = {
    imgUrl: "",
    gridPixelWidth: 10,
    gridPixelHeight: 10,
    myImage: new Image(),
    imageWidth: 0,
    imageHeight: 0,
    canvasID: "",
    canvas: "",
    gContent: "",
    accuracy: 1,//1 = check every pixel, 10 = every tenth e.t.c.

    getBinaryListFromImage: function (param) {
        this.initGivenParameters(param);
        var binaryArray = this.getImageScan();
        return binaryArray;
    },

    initGivenParameters: function (param) {
        /**
         * the necessary parameters
         */
        this.imgUrl = param.imageURL;
        this.gridPixelWidth = param.gridPixelWidth;
        this.gridPixelHeight = param.gridPixelHeight;
    },
    initGraphicalContent: function () {
        var canvas = document.getElementById(this.canvasID);// i have to select the canvas element after i apend him.
        this.gContext = canvas.getContext("2d");
    },
    drawImageOnCanvas: function () {
        this.gContext.drawImage(this.myImage, 0, 0, this.imageWidth, this.imageHeight);
    },
    getImageScan: function() {
        this.myImage.src = imageScanner.imgUrl;
        var is = this;
        return  is.getArrayFromCanvas(this.myImage.onload = function () {
            is.imageHeight = is.myImage.height;
            is.imageWidth = is.myImage.width;
            is.appendCanvasToBody();
            is.initGraphicalContent();
            is.drawImageOnCanvas();
            console.log("image is loaded");
        })
    },
    appendCanvasToBody: function () {
        this.canvasID = this.getUniqueID();
        this.canvas = this.getCanvas();
        $('body').append(this.canvas);
        /**
         * i have to change the size AFTER the append, else the default values overwrite my values ...
         * the this.canvas.height =  this.imageHeight; does not work here ....
         * i have to select the new dom element  ... don't ask ..
         */
        $('#' + this.canvasID).attr("height", this.imageHeight);
        $('#' + this.canvasID).attr("width", this.imageWidth);
    },
    getCanvas: function () {
        var is = this;
        var canvas = $('<canvas />').attr({
            // Style: 'position:absolute; left:-5000px;right -5000', //so that we don't need an css file included
            id: is.canvasID
        })
        return canvas;
    },
    getUniqueID: function () {
        var id;
        do {
            id = "myUniqueID" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 25);
        } while ($('#' + id).length != 0)
        return id;
    },
    getJsonFromCanvas: function () {
        var lineByLineAnalyses = {};
        var lineIndex = 0;
        var is = this;
        for (var y = 0; y < is.imageHeight; y += is.gridPixelHeight) {
            var line = [];
            for (var x = 0; x < is.imageWidth; x += is.gridPixelWidth) {
                if (is.isRectangleEmpty(x, y)) {
                    line.push(0);
                } else {
                    line.push(1);
                }
            }
            lineByLineAnalyses[lineIndex++] = line;
        }
        return lineByLineAnalyses;
    },
    isRectangleEmpty: function (x, y) {
        var widthOfPixelRegion = this.getWidthOfPixelRegion(x);
        var heightOfPixelRegion = this.getHeigthOfPixelRegion(y);
        var pixels = this.gContext.getImageData(x, y, widthOfPixelRegion, heightOfPixelRegion).data;
        var empty = true;
        var step = this.accuracy;
        var is = this;
        for (var i = 0; i < pixels.length; i += 4 * step) {
            var isPixelEmpty = is.isItWhite(pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]);
            if (!isPixelEmpty) {
                empty = false;
            }
        }
        return empty;
    },
    getWidthOfPixelRegion: function (x) {
        if (x + this.gridPixelWidth > this.imageWidth) {
            return this.imageWidth - x;
        }
        return this.gridPixelWidth;
    }
    ,

    getHeigthOfPixelRegion: function (y) {
        if (y + this.gridPixelHeight > this.imageHeight) {
            return this.imageHeight - y;
        }
        return this.gridPixelHeight;
    }
    ,


    isItWhite: function (r, g, b, alpha) {
        return (r + g + b == 765 || alpha == 0);//765 is not always achieved, if working with jpg, try lower value       }

    },
    getBinaryArithmeticFromBooleans: function (booleanJson) {
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
    },
    getArrayFromCanvas: function () {
        console.log("request for calculations");
        var booleanJson = this.getJsonFromCanvas()
        return this.getBinaryArithmeticFromBooleans(booleanJson);
    }


}
