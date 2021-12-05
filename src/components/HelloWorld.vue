<template>
  <div id="app">
    <h1>{{ $t('hello') }}</h1>
    <div>
      <input type="file" ref="preview" @change="uploadFile">
    </div>
    <div v-if="url" style="position:relative">
      <div style="position:absolute" @click="deletePreview">X</div>
      <img :src="url">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      url:""
    }
  },
  methods:{
    uploadFile() {
      const file = this.$refs.preview.files[0];
      this.url = URL.createObjectURL(file);
      this.$refs.preview.value = "";
    },
    deletePreview() {
      this.url = '';
      URL.revokeObjectURL(this.url);
    }
  }
}

</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  },
  "ja": {
    "hello": "ハロー i18n in SFC!"
  },
  "cn": {
    "hello": "哈喽 i18n in SFC!"
  }
}
</i18n>

<style lang="scss">
#arkn-depot {
  .image-select {
    min-height: 300px;
    border: 2px dashed #aaa;
    flex-direction: column;
    justify-content: center;
    // iPhone X bug
    margin: 0 4px;
  }
  .result {
    position: relative;
    &-scrollable {
      overflow-x: auto;
    }
    &-progress {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.9);
    }
    &-container {
      position: relative;
      background-size: cover;
      overflow: hidden;
    }
    &-square {
      position: absolute;
      border: 2px solid #353535;
      box-sizing: border-box;
      &::before {
        content: '';
        background-color: #fff;
      }
    }
    &-square::before,
    &-sim {
      position: absolute;
      left: -2px;
      top: 100%;
      height: 30%;
      width: 100%;
      padding: 2px;
      box-sizing: content-box;
    }
    &-sim {
      background-color: #353535;
      font-size: 20px;
      color: #fff;
      justify-content: center;
      transition: opacity 0.1s;
      &:hover {
        opacity: 0.87;
      }
      &-img {
        display: inline-block;
        height: 100%;
        filter: brightness(1);
      }
      &-warn {
        display: inline-block;
        position: absolute;
        top: 4px;
        left: 4px;
      }
    }
    &-square.disabled {
      background-color: rgba(199, 199, 199, 0.8);
      border-color: #c7c7c7;
      .result {
        &-sim {
          background-color: #c7c7c7;
          color: #999;
          &:hover {
            opacity: 1;
          }
          &-img,
          &-warn {
            opacity: 0.2;
          }
        }
      }
    }
  }
  #debug {
    display: flex;
    flex-wrap: wrap;
    .debug {
      &-item {
        display: inline-flex;
        align-items: center;
        min-width: 315px;
      }
      &-img {
        width: 60px;
        height: 60px;
        border: 2px solid #f00;
        border-right-width: 0;
      }
      &-num-img {
        height: 60px;
        border: 2px solid #f00;
      }
    }
  }
  .debug-checkbox {
    color: #fff;
    &-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      padding: 4px 14px;
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(3px);
      border-bottom-right-radius: 4px;
    }
    input:not(:checked) + .mdui-checkbox-icon:after {
      border-color: rgba(255, 255, 255, 0.8);
    }
    .mdui-checkbox-icon {
      box-shadow: none;
    }
  }
  .test-img {
    display: block;
    max-width: 100%;
  }
}
.mdui-theme-layout-dark #arkn-depot {
  .result-container {
    filter: brightness(0.9);
  }
}
</style>
