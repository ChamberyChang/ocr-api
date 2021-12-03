import Axios from 'axios';

const LANGAlias = {
  ch: 'chs',
  cn: 'chs',
  zh: 'chs',
  zhs: 'chs',
  zht: 'cht',
  en: 'eng',
  jp: 'jpn',
  ko: 'kor',
  fr: 'fre',
  ge: 'ger',
  ru: 'rus',
};

/**
 * OCR.space
 *
 * @param {{ url: string }} url URL
 * @param {string} [lang] language setting
 * @returns {Promise<string[]>} result
 */
export default async ({ url }, lang) => {
  const { defaultLANG, apikey } = global.config.bot.ocr['ocr.space'];
  lang = lang || defaultLANG;
  const result = await Axios.get(
    `https://api.ocr.space/parse/imageurl?apikey=${apikey || 'helloworld'}&url=${encodeURIComponent(url)}&language=${
      LANGAlias[lang] || lang || 'eng'
    }`).then(r => r.data.ParsedResults[0].ParsedText.replace(/( *)\r\n$/, '').split('\r\n'));
  return result;
};
