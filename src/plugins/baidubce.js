import Vue from "vue";
import _ from "lodash";
import Qs from "qs";

let token = false;

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
 * get AccessToken
 *
 * @returns AccessToken
 */
const getAccessToken = async (apiKey, secretKey) => {
  if (token) {
    if (token.date + 2592000000 - 86400000 > new Date().getTime())
      return token.accessToken;
  }
  const accessToken = await Vue.axios
    .get(
      `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`
    )
    .then((r) => r.data.access_token);
  return accessToken;
};

/**
 * OCR 识别
 *
 * @param {File} file image
 * @param {string} [lang=null] language
 * @returns {Promise<string[]>} result
 */
export default async (file, lang, apiKey, secretKey) => {
  const addon = {};
  addon.language_type = languageEnum[lang];

  const image = Buffer.from(file.toString(), "binary").toString("base64");
  const access_token = await getAccessToken(apiKey, secretKey);
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
