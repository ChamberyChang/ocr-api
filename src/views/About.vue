<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col class="about">
        <h1 class="display-2 font-weight-bold mb-3">
          {{ $t("common.message") }}
        </h1>
        <p class="subheading font-weight-regular">
          {{ $t("common.author")
          }}<a href="https://github.com/ChamberyChang" target="_blank"
            >MA21502</a
          >
          <br />{{ $t("common.abstract") }}
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          {{ $t("common.usingAPI") }}
        </h2>

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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "About",
  props: {
    msg: String,
  },
  data: () => ({
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
