<template>
  <div id="app">
    <h1>{{ $t("message") }}</h1>
    <div>
      <input type="file" ref="preview" @change="uploadFile" />
    </div>
    <div v-if="url" style="position: relative">
      <div style="position: absolute" @click="deletePreview">X</div>
      <img :src="url" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      url: "",
    };
  },
  methods: {
    uploadFile() {
      const file = this.$refs.preview.files[0];
      this.url = URL.createObjectURL(file);
      this.$refs.preview.value = "";
    },
    deletePreview() {
      this.url = "";
      URL.revokeObjectURL(this.url);
    },
  },
};
</script>
