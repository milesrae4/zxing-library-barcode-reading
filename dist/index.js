"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const barcode_1 = require("./lib/barcode");
async function main() {
    const pdf417Image = fs_1.readFileSync('fake-drivers-license.jpg');
    const pdf417Image2 = fs_1.readFileSync('fake-drivers-license-greyscale.jpg');
    const pdf417Image3 = fs_1.readFileSync('fake-dl-pdf417.jpg');
    const decodePdf417Results = barcode_1.detectAndScan(pdf417Image);
    const decodePdf417Results2 = barcode_1.detectAndScan(pdf417Image2);
    const decodePdf417Results3 = barcode_1.detectAndScan(pdf417Image3);
    console.log('Results: ', {
        fakeDlPdf417: decodePdf417Results === null || decodePdf417Results === void 0 ? void 0 : decodePdf417Results.getText(),
        fakeDlGreyscale: decodePdf417Results2 === null || decodePdf417Results2 === void 0 ? void 0 : decodePdf417Results2.getText(),
        fakeDlLicense: decodePdf417Results3 === null || decodePdf417Results3 === void 0 ? void 0 : decodePdf417Results3.getText(),
    });
}
main().catch(err => {
    console.error('Fatal App Error: ', err);
    process.exit(1);
});
