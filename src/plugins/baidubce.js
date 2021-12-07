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
 * OCR 识别
 *
 * @param {File} file image
 * @param {string} [lang=null] language
 * @param {string} access_token token
 * @returns {Promise<string[]>} result
 */
export default async (file, lang, access_token) => {
  const language_type = languageEnum[lang];

  const image = Buffer.from(file.toString(), "binary").toString("base64");

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
