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
      <v-col class="about">
        <h1 class="display-1 font-weight-bold mb-3">
          {{ $t("common.title") }}
        </h1>
      </v-col>
    </v-row>
    <v-card>
      <HelloWorld />
    </v-card>
  </v-container>
</template>

<script>
import HelloWorld from "@/components/HelloWorld";
export default {
  name: "About",
  components: {
    HelloWorld,
  },
  props: {
    msg: String,
  },
};
</script>
