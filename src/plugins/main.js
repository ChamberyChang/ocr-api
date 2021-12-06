const ocr = require("./src/plugin/ocr");

/**
 * OCR
 *
 * @param {*} context
 * @returns
 */
function doOCR(imgs, lang) {
  for (const img of imgs) {
    ocr
      .default(img, lang)
      .then((results) => console.log(results.join("\n")))
      .catch((e) => {
        console.log("OCRは死んだ");
        console.error(`${global.getTime()} [error] OCR`);
        console.error(e);
      });
  }
}
