import { readFileSync } from 'fs';
import { detectAndScan } from './lib/barcode';


async function main() {
  const pdf417Image = readFileSync('fake-drivers-license.jpg');

  const startTimeDecode = Date.now();
  const decodePdf417Results3 = detectAndScan(pdf417Image);
  const timeResultsDecode = Date.now() - startTimeDecode;
  

  console.log('Results: ', {
    timeDecode: timeResultsDecode,
    decodeResults: decodePdf417Results3,
  })
}

main().catch(err => {
  console.error('Fatal App Error: ', err);
  process.exit(1);
});
