<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="ocr">
        <div id="app">
          <div>
            <v-col class="selector">
              <v-menu transition="fade-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-model="lang"
                    dark
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
                    <v-list-item-title @click="setLang('ru')"
                      >русский</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-dialog v-model="dialog" max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    <v-icon dark> mdi-format-list-bulleted-square </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5">
                    BCE {{ $t("common.setting") }}
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="apikey"
                      label="API Key"
                      filled
                      clearable
                    ></v-text-field>
                    {{ $t("bce.setting") }}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      {{ $t("common.close") }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>

            <v-col class="upload">
              <v-file-input
                v-model="image"
                label="Upload"
                chips
                color="deep-purple accent-4"
                accept="image/*"
                prepend-icon="mdi-camera"
                filled
                @change="uploadImg"
              >
              </v-file-input>
            </v-col>

            <v-btn color="primary" block @click="OCR()">
              {{ $t("common.submit") }}
            </v-btn>
            <v-col>
              <v-img :src="url"></v-img>
            </v-col>
          </div>

          <v-container fluid>
            <v-textarea
              v-model="response"
              clearable
              counter
              filled
              clear-icon="mdi-close-circle"
              label="Results"
              auto-grow
              :value="this.response"
            ></v-textarea>
          </v-container>
        </div>
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
import ocr from "@/plugins/ocr.space";
import resizeImg from "@/plugins/resizeImage";
export default {
  name: "BCE",
  data: () => ({
    url: null,
    image: null,
    error: null,
    multiLine: true,
    snackbar: false,
    apikey: "helloworld",
    lang: "ja",
    response: null,
    dialog: false,
  }),
  methods: {
    setLang(lang) {
      this.lang = lang;
    },
    async uploadImg() {
      this.url = URL.createObjectURL(this.image);
    },
    /**
     * @param {File} file
     */
    async OCR() {
      const result = await ocr(
        await resizeImg(this.image, {
          quality: 0.9,
          maxWidth: 1920,
          maxHeight: 1080,
        }),
        this.lang,
        this.apikey
      )
        .then((response) => (this.response = response.join("\n")))
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
      }
    },
  },
};
</script>
