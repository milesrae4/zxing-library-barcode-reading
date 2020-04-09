Run `yarn install` to install dependencies

Then `yarn dev` to start the app.

The app will output 3 results from trying to detect a PDF-417 drivers license from an image. However it is unable to detect the barcodes, even though the zxing cli installed via `pip3 install zxing` is able to successfully read these codes when running `zxing ./{imageFile}`. 