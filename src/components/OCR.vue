<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="ocr">
        <div id="app">
          <div>
            <v-file-input
              v-model="files"
              label="File input"
              filled
              multiple
              prepend-icon="mdi-camera"
              @change="uploadFile"
            >
              <template v-slot:selection="{ text }">
                <v-chip small label color="primary">
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
          </div>
          <div v-if="url" style="position: relative">
            <v-img :src="url"></v-img>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import resizeImg from "@/utils/resizeImage";
export default {
  name: "OCR",
  data: () => ({
    url: "",
  }),
  methods: {
    async uploadFile() {
      const file = await resizeImg(this.$refs.preview.files[0], {
        quality: 0.9,
        maxWidth: 1920,
        maxHeight: 1080,
      });
    },
  },
};
</script>
