Run `yarn install` to install dependencies

Then `yarn dev` to start the app.

## Initial Issue:
- The app will output 3 results from trying to detect a PDF-417 drivers license from an image. However it is unable to detect the barcodes, and just throws an error stating `No Multiformat Readers could detect the code`. 

## Solution:
- See Github Issue: https://github.com/zxing-js/library/issues/289
- Repo changed to reflect working code.
