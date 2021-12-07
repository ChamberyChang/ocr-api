import Vue from "vue";

/**
 * get AccessToken
 * @param {string} apiKey
 * @param {string} secretKey
 * @returns AccessToken
 */
export default async (apiKey, secretKey) => {
  const accessToken = await Vue.axios
    .get(
      `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`
    )
    .then((r) => r.data.access_token);
  return accessToken;
};
