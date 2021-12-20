import Vue from "vue";
import _ from "lodash";
import Qs from "qs";

const languageEnum = {
  zh: "CHN_ENG",
  en: "ENG",
  ja: "JAP",
  ko: "KOR",
  fr: "FRE",
  de: "GER",
  ru: "RUS",
};

/**
 * blob to base64
 * @param {Blob} blob
 * @returns {Promise<string[]>} base64
 */
const blobToBase64 = async (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

/**
 * OCR 识别
 *
 * @param {Blob} file image
 * @param {String} [lang] language
 * @param {String} access_token token
 * @returns {Promise<string[]>} result
 */
export default async (file, lang, access_token) => {
  const addon = {};
  addon.language_type = languageEnum[lang];
  const image = await blobToBase64(file);

  const result = await Vue.axios
    .post(
      `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic`,
      Qs.stringify({
        access_token,
        image,
        ...addon,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((r) => r.data.words_result);
  return _.map(result, "words");
};
