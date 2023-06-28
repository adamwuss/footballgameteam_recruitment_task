const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  loaderOptions: {
    scss: {
      prependData: `@import "@/styles/main.scss";`
    }
  }
})
