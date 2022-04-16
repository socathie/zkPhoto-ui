import { BigNumber } from "ethers";
import Jimp from "jimp";
import { Buffer } from "buffer";

export default async function array2uri(array: Array<Array<any>>) {

    let imgArray = Array.from({ length: 64 }, e => Array.from({ length: 64 }, e => Array.from({ length: 4 }, e => 255)));

    for (let k = 0; k < 16; k++) {
        let x = (k % 4) * 16;
        let y = (k / 4 >> 0) * 16;
        let idx = 0;

        for (let j = 0; j < 16; j += 2) {
            for (let i = 0; i < 16; i += 2) {
                let tmp = BigNumber.from(array[k][idx]).toHexString().slice(2).padStart(30, '0');
                //console.log(tmp);

                imgArray[y + j][x + i][0] = parseInt(tmp.slice(0, 2), 16);
                imgArray[y + j][x + i][1] = parseInt(tmp.slice(2, 4), 16);
                imgArray[y + j][x + i][2] = parseInt(tmp.slice(4, 6), 16);

                imgArray[y + j][x + i + 1][0] = parseInt(tmp.slice(8, 10), 16);
                imgArray[y + j][x + i + 1][1] = parseInt(tmp.slice(10, 12), 16);
                imgArray[y + j][x + i + 1][2] = parseInt(tmp.slice(12, 14), 16);

                imgArray[y + j + 1][x + i][0] = parseInt(tmp.slice(16, 18), 16);
                imgArray[y + j + 1][x + i][1] = parseInt(tmp.slice(18, 20), 16);
                imgArray[y + j + 1][x + i][2] = parseInt(tmp.slice(20, 22), 16);

                imgArray[y + j + 1][x + i + 1][0] = parseInt(tmp.slice(24, 26), 16);
                imgArray[y + j + 1][x + i + 1][1] = parseInt(tmp.slice(26, 28), 16);
                imgArray[y + j + 1][x + i + 1][2] = parseInt(tmp.slice(28, 30), 16);

                idx++;
            }
        }
    }

    //console.log(ctx.getImageData(0,0,64,64));

    const jimp = new Jimp(64, 64) as Jimp;
    
    jimp.bitmap.data = Buffer.from(imgArray.flat().flat());

    //console.log(jimp);

    const dataURL = await jimp.getBase64Async("image/png");
    //console.log(dataURL);

    return dataURL;
}