/**
 * Created by vkukanauskas on 29/08/2016.
 */
gridMaker = {
    drawGrid: function () {
        this.pictureContainer = $('#picture');
        this.canvasContainer = $('#canvasContainer');
        this.imgWidth = this.pictureContainer.width();
        this.imgHeight = this.pictureContainer.height();
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
        this.gContext= this.canvasDiv.getContext("2d")
        drawGridOnCanvas(this);

        function getCanvas() {
            var canvas = $('<canvas/>');
            var pictureDiv = $('#picture');
            var imgUrl = pictureDiv.attr("src");
            $(canvas).attr("id", "canvasID");
            $(canvas).addClass("grid");
            $(canvas).css("background-image", "url(" + imgUrl + ")");
            return canvas;
        }

        function drawGridOnCanvas(gridMaker) {
            var c = document.getElementById("canvasID");
            var ctx = c.getContext("2d");
            drawVerticlaLines(ctx,gridMaker);
            drawHorizontalLines(ctx,gridMaker);
            ctx.stroke();
            // drawRectangle(ctx);
        }

        function drawVerticlaLines(ctx,gridMaker) {
            for (var x = 0; x <= gridMaker.imgWidth; x += gridMaker.verticalStep) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, gridMaker.imgHeight);
            }
        }

        function drawHorizontalLines(ctx,gridMaker) {
            for (var y = 0; y <= gridMaker.imgHeight; y += gridMaker.horizontalStep) {
                ctx.moveTo(0, y);
                ctx.lineTo(gridMaker.imgWidth, y);
            }
        }

        function drawRectangle(ctx) {
            var lineByLineanalyses = {};
            var lineIndex=0;
            for (var y = 0; y <= this.imgHeight; y += this.horizontalStep) {
                var line = [];
                for (var x = 0; x <= this.imgWidth; y += this.verticalStep) {
                    if (isRectangleEmpty(ctx, x, y)) {
                        line.push(0);
                    } else {
                        line.push(1);
                    }
                    ;
                }
                lineByLineanalyses[lineIndex++]=line;
            }
            console.log(lineByLineanalyses);

        };

        function isRectangleEmpty(ctx, x, y) {
            var pixels = ctx.getImageData(x, y, this.horizontalStep, this.verticalStep).data;
            var empty = true;
            $.each(pixels, function (iterator) {
                if (pixels[iterator] != 0) {
                    empty = false;
                }
                ;
            })
            return empty;
        };

        function rgbToHex(r, g, b) {
            if (r > 255 || g > 255 || b > 255)
                throw "Invalid color component";
            return ((r << 16) | (g << 8) | b).toString(16);
        }

    }
}