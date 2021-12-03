import ocr_space from './ocr/ocr.space';
import baidubce from './ocr/baidubce';

const ocrs = {
  'ocr.space': ocr_space,
  baidubce,
};

module.exports = {
  get default() {
    return ocrs[global.config.ocr.use];
  },
  ...ocrs,
};
