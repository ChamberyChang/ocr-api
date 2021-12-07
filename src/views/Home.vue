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

        <v-card flat>
          <v-tabs v-model="model" slider-color="primary" fixed-tabs>
            <v-tab>
              <v-img
                :src="require('../assets/ocrspace.png')"
                class="my-3"
                contain
                height="80"
                width="100"
              />
            </v-tab>
            <v-tab>
              <v-img
                :src="require('../assets/bce.svg')"
                class="my-3"
                contain
                height="80"
                width="100"
              />
            </v-tab>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="function">
      <v-col cols="12">
        <v-tabs-items v-model="model">
          <v-tab-item>
            <v-container fluid>
              <Ocr />
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid>
              <Bce />
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Ocr from "@/components/OCR";
import Bce from "@/components/BCE";
export default {
  name: "Home",
  components: {
    Ocr,
    Bce,
  },
  data: () => ({
    model: "tab-1",
  }),
};
</script>
