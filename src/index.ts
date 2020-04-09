import { readFileSync } from 'fs';
import { detectAndScan } from './lib/barcode';


async function main() {
  const pdf417Image = readFileSync('fake-drivers-license.jpg');
  const pdf417Image2 = readFileSync('fake-drivers-license-greyscale.jpg');
  const pdf417Image3 = readFileSync('fake-dl-pdf417.jpg');

  const decodePdf417Results = detectAndScan(pdf417Image);
  const decodePdf417Results2 = detectAndScan(pdf417Image2);
  const decodePdf417Results3 = detectAndScan(pdf417Image3);

  console.log('Results: ', {
    fakeDlPdf417: decodePdf417Results?.getText(),
    fakeDlGreyscale: decodePdf417Results2?.getText(),
    fakeDlLicense: decodePdf417Results3?.getText(),
  })
}

main().catch(err => {
  console.error('Fatal App Error: ', err);
  process.exit(1);
});
