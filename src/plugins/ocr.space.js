import Vue from "vue";

const languageEnum = {
  zh: "chs",
  tw: "cht",
  en: "eng",
  ja: "jpn",
  ko: "kor",
  fr: "fre",
  de: "ger",
  ru: "rus",
};

/**
 * OCR 识别
 *
 * @param {File} image image file
 * @param {string} [lang] language
 * @param {string} [apikey] API key
 * @returns {Promise<string[]>} results
 */
export default async (image, lang, apikey) => {
  apikey = apikey || "helloworld";
  lang = languageEnum[lang];
  var data = new FormData();
  data.append("apikey", apikey);
  data.append("base64Image", image);
  data.append("filetype", "JPG");
  data.append("language", lang);
  return await Vue.axios
    .post("https://api.ocr.space/parse/image", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((r) =>
      r.data.ParsedResults[0].ParsedText.replace(/( *)\r\n$/, "").split("\r\n")
    );
};
