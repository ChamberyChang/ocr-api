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

      <v-col class="home">
        <h1 class="display-2 font-weight-bold mb-3">
          {{ $t("common.message") }}
        </h1>
      </v-col>
    </v-row>

    <v-row class="function">
      <OCR />

      <v-card>
        <HelloWorld />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import OCR from "@/components/OCR.vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
    OCR,
  },
};
</script>
