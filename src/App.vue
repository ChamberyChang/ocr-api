<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" small>
              <v-icon>mdi-translate</v-icon>
              <v-icon small> mdi-chevron-down </v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group v-model="lang" color="primary">
              <v-subheader>TRANSLATIONS</v-subheader>
              <v-list-item>
                <v-list-item-title @click="changeLang('en')"
                  >English</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="changeLang('ja')"
                  >日本語</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="changeLang('zh')"
                  >简体中文</v-list-item-title
                >
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>

      <v-spacer></v-spacer>

      <v-tabs fixed-tabs>
        <v-tab to="/">Home</v-tab>
        <v-tab to="/about">About</v-tab>
      </v-tabs>

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
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),

  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>
