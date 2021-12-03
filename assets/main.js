import _ from 'lodash';
const ocr = require('./src/plugin/ocr');


/**
 * OCR
 *
 * @param {*} context
 * @returns
 */
function doOCR(context) {
  const msg = context.message;
  const imgs = getImgs(msg);
  let lang = null;
  const langSearch = /(?<=--lang=)[a-zA-Z]{2,3}/.exec(msg);
  if (langSearch) lang = langSearch[0];

  for (const img of imgs) {
    ocr
      .default(img, lang)
      .then(results => replyMsg(context, results.join('\n')))
      .catch(e => {
        replyMsg(context, 'OCRは死んだ');
        console.error(`${global.getTime()} [error] OCR`);
        console.error(e);
      });
  }
}
