/**
 * Created by vkukanauskas on 26/08/2016.
 */
MyImage = {
    src: "",
    width: "",
    height: "",
    getMyImage: function (imageSrc) {
        this.init(imageSrc);
        return this;
    }, init: function (imageSrc) {
        this.src = imageSrc;
        this.initHeightAndWidth();
    },
    initHeightAndWidth: function () {
        var tmpImg = new Image(this.src);
        var myImage = this;
        myImage.width = tmpImg.width;
        myImage.height = tmpImg.height;
        console.log(tmpImg.width);
    }
}

