export default function img2array(id: string) {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const img = document.getElementById(id) as any;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const dataURL = canvas.toDataURL("image/png");

    const data = imageData.data;

    let array: Array<Array<Array<number>>>;
    array = [];
    let tmp: Array<Array<number>>;
    tmp = [];

    for (var i = 0; i < data.length; i += 4) {
        if ((i % (img.width * 4) === 0) && (i > 0)) {
            array.push(tmp);
            tmp = [];
        }
        tmp.push([data[i], data[i + 1], data[i + 2]]);
    }
    array.push(tmp);

    let slicedArray = sliceArray(array);

    return ({
        'dataURL': dataURL,
        'data': slicedArray
    })
}

function sliceArray(array: Array<Array<Array<number>>>) {
    let slicedArray: Array<Array<Array<number>>>;
    slicedArray = [];
    for (var k = 0; k < 16; k++) {
        var x = (k % 4) * 256;
        var y = (k / 4 >> 0) * 256;
        let tmp: Array<Array<number>>;
        tmp = [];
        for (var j = 0; j < 256; j++) {
            for (var i = 0; i < 256; i++) {
                tmp.push(array[y+j][x+i]);
            }
        }
        slicedArray.push(tmp);
    }
    return slicedArray;
}