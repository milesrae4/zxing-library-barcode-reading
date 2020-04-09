import {
  BarcodeFormat,
  DecodeHintType,
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer,
  MultiFormatReader,
} from '@zxing/library/esm5';
import { decode } from 'jpeg-js';

export const detectAndScan = (fileData: Buffer) => {
  const barcodeScanner = new MultiFormatReader();
  const hints = new Map();
  const formats = [BarcodeFormat.PDF_417];
  const rawFileData = decode(fileData);

  try {
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    hints.set(DecodeHintType.TRY_HARDER, true);

    barcodeScanner.setHints(hints);

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
      rawFileData.height,
    );

    const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));

    const results = barcodeScanner.decode(binaryBitmap);

    return results;
  } catch (err) {
    console.error('Error Reading Barcode: ', err.message);
  }
};
