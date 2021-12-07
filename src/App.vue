<template v-slot:default>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item>
              <v-list-item-title @click="changeLang('en')"
                >English
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="changeLang('ja')"
                >日本語
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="changeLang('zh')"
                >简体中文
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <slot>
        <v-tabs v-model="tab" fixed-tabs slider-color="primary">
          <v-tab to="/">{{ $t("common.home") }}</v-tab>
          <v-tab to="/about">{{ $t("common.about") }}</v-tab>
        </v-tabs>
      </slot>

      <v-btn
        href="https://github.com/ChamberyChang/ocr-app"
        target="_blank"
        text
      >
        <span class="mr-2">GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    tab: null,
  }),

  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>
