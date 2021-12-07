<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="100"
        />
      </v-col>

      <v-col class="home">
        <h1 class="display-1 font-weight-bold mb-3">
          {{ $t("common.title") }}
        </h1>
      </v-col>
    </v-row>

    <v-row class="function">
      <Ocr />
    </v-row>
  </v-container>
</template>

<script>
import Ocr from "@/components/OCR";
export default {
  name: "Home",
  components: {
    Ocr,
  },
};
</script>
