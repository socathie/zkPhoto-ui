import { ethers } from "ethers";
import address from './artifacts/address.json'
import zkPhotoArtifact from './artifacts/zkPhoto.json'
import { generateCalldata } from './zkPhoto_js/generate_calldata'

let zkPhoto: ethers.Contract;

export async function connectContract() {
    const { ethereum } = window;

    let provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    console.log('signer: ', await signer.getAddress());

    zkPhoto = new ethers.Contract(address['zkPhoto'], zkPhotoArtifact.abi, signer);

    console.log("Connect to zkPhoto Contract:", zkPhoto);
}

export async function getTokenURI(tokenId: number) {
    await connectContract();

    let errorMsg;
    let tokenURI = await zkPhoto.tokenURI(tokenId)
        .catch((error: any) => {
            errorMsg = error.data.message;
        });

    //console.log("tokenURI: ", tokenURI);
    console.log("error: ", errorMsg);

    if (errorMsg) {
        throw errorMsg;
    }

    return tokenURI;
}

export async function getTokenData(tokenId: number) {
    await connectContract();

    let errorMsg;
    let tokenData = await zkPhoto.getData(tokenId)
        .catch((error: any) => {
            errorMsg = error.data.message;
        });

    //console.log("tokenData: ", tokenData);
    console.log("error: ", errorMsg);

    if (errorMsg) {
        throw errorMsg;
    }

    return tokenData;
}

export async function generateWitness(data: Array<Array<Array<number>>>) {
    let a = [];
    let b = [];
    let c = [];
    let d = [];

    for (var i = 0; i < 16; i++) {
        let calldata = await generateCalldata(data[i]);
        if (!calldata) throw 'Error: Fail to generate witness.';
        console.log('calldata generated');
        a.push(calldata[0]);
        b.push(calldata[1]);
        c.push(calldata[2]);
        d.push(calldata[3]);
    }

    return { a, b, c, d };
}

export async function mint(name: string, description: string, image: string, witness: { a: any; b: any; c: any; d: any }) {
    await connectContract();

    let errorMsg;

    let txn = await zkPhoto.mint(name, description, image, witness.a, witness.b, witness.c, witness.d)
        .catch((error: any) => {
            errorMsg = error.data.message;
        });

    console.log("transaction: ", txn);
    console.log("error: ", errorMsg);

    if (errorMsg) {
        throw errorMsg;
    }

    return txn;
}
