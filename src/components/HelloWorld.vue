<template>
  <v-row class="text-center">
    <v-expansion-panels multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h3 class="text-center">
            {{ $t("common.profile") }}
          </h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class="subheading font-weight-regular">
            {{ $t("common.author")
            }}<a href="https://github.com/ChamberyChang" target="_blank"
              >MA21502</a
            >
            <br />{{ $t("common.abstract") }}
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h3 class="text-center">
            {{ $t("common.usingAPI") }}
          </h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row justify="center">
            <a
              v-for="(ocr, i) in ocrAPI"
              :key="i"
              :href="ocr.href"
              class="subheading mx-3"
              target="_blank"
            >
              {{ ocr.text }}
            </a>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h3 class="text-center">
            {{ $t("common.links") }}
          </h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row justify="center">
            <a
              v-for="(link, i) in importantLinks"
              :key="i"
              :href="link.href"
              class="subheading mx-3"
              target="_blank"
            >
              {{ link.text }}
            </a>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    importantLinks: [
      {
        text: "Vuetify",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Vue.js",
        href: "https://vuejs.org/",
      },
      {
        text: "Node.js",
        href: "https://nodejs.org/",
      },
      {
        text: "AXIOS",
        href: "https://axios-http.com/",
      },
    ],
    ocrAPI: [
      {
        text: "ocr.space",
        href: "https://ocr.space",
      },
      {
        text: "Baidu Cloud Engine",
        href: "https://intl.cloud.baidu.com",
      },
    ],
  }),
};
</script>
