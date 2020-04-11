import {
  BarcodeFormat,
  DecodeHintType,
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer
} from '@zxing/library/esm5';
import PDF417Reader from '@zxing/library/esm5/core/pdf417/PDF417Reader';
import StringEncoding from '@zxing/library/esm5/core/util/StringEncoding';
import { TextDecoder } from 'text-encoding';
import { decode } from 'jpeg-js';

StringEncoding.customDecoder = (stringContent, encodingName) => new TextDecoder(encodingName).decode(stringContent);

export const detectAndScan = (fileData: Buffer) => {
  const barcodeScanner = new PDF417Reader();
  const rawFileData = decode(fileData);

  try {
    const len = rawFileData.width * rawFileData.height;

    const luminancesUint8Array = new Uint8ClampedArray(len);

    for (let i = 0; i < len; i++) {
      luminancesUint8Array[i] =
        ((rawFileData.data[i * 4] + rawFileData.data[i * 4 + 1] * 2 + rawFileData.data[i * 4 + 2]) /
          4) &
        0xff;
    }

    const luminanceSource = new RGBLuminanceSource(
      luminancesUint8Array,
      rawFileData.width,
      rawFileData.height
    );

    const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));

    const results = barcodeScanner.decode(binaryBitmap);

    return results.getText();
  } catch (err) {
    console.error('Error Reading Barcode: ', err.message);
  }
};
