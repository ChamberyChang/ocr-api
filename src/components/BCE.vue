<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="bce">
        <div id="app">
          <div>
            <v-col class="selector">
              <v-menu transition="fade-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-1"
                    fab
                    icon
                    large
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark> mdi-pencil </v-icon>
                    {{ lang }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title @click="setLang('en')"
                      >English</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title @click="setLang('ja')"
                      >日本語</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title @click="setLang('zh')"
                      >简体中文</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title @click="setLang('ko')"
                      >한국어</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title @click="setLang('fr')"
                      >française</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title @click="setLang('de')"
                      >Deutsch</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title @click="setLang('ru')"
                      >русский</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-dialog v-model="dialog" max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    fab
                    icon
                    large
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark> mdi-format-list-bulleted-square </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5">
                    BCE {{ $t("common.setting") }}
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="apiKey"
                      dense
                      label="API Key"
                      filled
                      clearable
                    ></v-text-field>
                    <v-text-field
                      v-model="secretKey"
                      dense
                      label="Secret Key"
                      filled
                      clearable
                    ></v-text-field>
                    <v-text-field
                      v-model="token"
                      dense
                      label="Access Token"
                      filled
                      clearable
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text large @click="requestToken()">
                      {{ $t("common.get") }} Token
                    </v-btn>
                    <v-btn color="primary" text large @click="dialog = false">
                      {{ $t("common.close") }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>

            <v-col class="upload">
              <v-file-input
                v-model="images"
                label="Upload"
                chips
                multiple
                color="deep-purple accent-4"
                accept="image/*"
                prepend-icon="mdi-camera"
                filled
                clearable
                @change="uploadImg"
              >
              </v-file-input>
              <v-btn
                color="primary"
                class="ma-2 white--text"
                large
                @click="handleOCR()"
              >
                {{ $t("common.submit") }}
                <v-icon right dark> mdi-cloud-upload </v-icon>
              </v-btn>
            </v-col>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col
        v-for="(url, index) in urls"
        :key="index"
        class="d-flex child-flex"
        cols="4"
      >
        <v-card class="pa-2" outlined tile>
          <v-img :src="url" aspect-ratio="1" class="grey lighten-2">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      v-model="responses"
      v-for="(res, i) in responses"
      :key="i"
      class="d-flex child-flex"
    >
      <v-col cols="12" md="8">
        <v-textarea
          clearable
          counter
          filled
          clear-icon="mdi-close-circle"
          label="Results"
          auto-grow
          :value="res"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :multi-line="multiLine">
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          {{ $t("common.close") }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import _ from "lodash";
import ocr from "@/plugins/baidubce";
import resizeImg from "@/plugins/resizeImage";
import getAccessToken from "@/plugins/getToken";
export default {
  name: "BCE",
  data: () => ({
    urls: [],
    images: [],
    error: null,
    multiLine: true,
    snackbar: false,
    apiKey: "",
    secretKey: "",
    token: [],
    lang: "ja",
    responses: [],
    dialog: false,
  }),
  methods: {
    // language initialize
    setLang(lang) {
      this.lang = lang;
    },
    // check and display images
    uploadImg() {
      this.urls = [];
      if (!this.images.length) {
        return;
      }
      for (const img of this.images) {
        if (!img) {
          this.error = `${this.$t("ocr.uploadError")}${this.$t("ocr.tip")}`;
          this.snackbar = true;
          return;
        }
        this.urls.push(URL.createObjectURL(img));
      }
    },
    // pre-loader for OCR images
    async handleOCR() {
      this.responses = [];
      this.snackbar = false;
      if (!this.images.length) {
        this.error = `${this.$t("ocr.uploadError")}${this.$t("ocr.tip")}`;
        this.snackbar = true;
        return;
      }
      for (const img of this.images) {
        await this.bce(img);
      }
    },
    /** start OCR.space
     * @param {File} file
     */
    async bce(file) {
      const result = await ocr(
        await resizeImg(file, {
          quality: 0.9,
          maxWidth: 1920,
          maxHeight: 1080,
        }),
        this.lang,
        this.token
      )
        .then((r) => this.responses.push(r.join("\n")))
        .catch((e) => ({
          IsErroredOnProcessing: true,
          ErrorMessage: String(e),
        }));
      this.snackbar = false;
      if (result.IsErroredOnProcessing) {
        this.snackbar = true;
        this.error = `${this.$t("ocr.error")}${_.castArray(result.ErrorMessage)
          .map((msg) => (msg.endsWith(".") ? msg : `${msg}.`))
          .join(" ")}`;
        return;
      }
    },
    async requestToken() {
      this.token = [];
      if (!(this.apiKey && this.secretKey)) return;
      else {
        const request = await getAccessToken(this.apiKey, this.secretKey)
          .then((rq) => this.token.push(rq))
          .catch((e) => ({
            IsErroredOnProcessing: true,
            ErrorMessage: String(e),
          }));
        this.snackbar = false;
        if (request.IsErroredOnProcessing) {
          this.snackbar = true;
          this.error = `${this.$t("ocr.error")}${_.castArray(
            request.ErrorMessage
          )
            .map((msg) => (msg.endsWith(".") ? msg : `${msg}.`))
            .join(" ")}`;
          return;
        }
      }
    },
  },
};
</script>
