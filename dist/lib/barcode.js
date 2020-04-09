"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const esm5_1 = require("@zxing/library/esm5");
const jpeg_js_1 = require("jpeg-js");
exports.detectAndScan = (fileData) => {
    const barcodeScanner = new esm5_1.MultiFormatReader();
    const hints = new Map();
    const formats = [esm5_1.BarcodeFormat.PDF_417];
    const rawFileData = jpeg_js_1.decode(fileData);
    try {
        hints.set(esm5_1.DecodeHintType.POSSIBLE_FORMATS, formats);
        hints.set(esm5_1.DecodeHintType.TRY_HARDER, true);
        barcodeScanner.setHints(hints);
        const len = rawFileData.width * rawFileData.height;
        const luminancesUint8Array = new Uint8ClampedArray(len);
        for (let i = 0; i < len; i++) {
            luminancesUint8Array[i] =
                ((rawFileData.data[i * 4] + rawFileData.data[i * 4 + 1] * 2 + rawFileData.data[i * 4 + 2]) /
                    4) &
                    0xff;
        }
        const luminanceSource = new esm5_1.RGBLuminanceSource(luminancesUint8Array, rawFileData.width, rawFileData.height);
        const binaryBitmap = new esm5_1.BinaryBitmap(new esm5_1.HybridBinarizer(luminanceSource));
        const results = barcodeScanner.decode(binaryBitmap);
        return results;
    }
    catch (err) {
        console.error('Error Reading Barcode: ', err.message);
    }
};
