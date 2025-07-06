// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui"],
  devtools: { enabled: true },
  css: ["~/app.css"],
  compatibilityDate: "2025-05-15",
  // eslint: {
  //   config: {
  //     stylistic: {
  //       semi: true,
  //       quotes: "double",
  //       commaDangle: "always-multiline",
  //       indent: 2,
  //     },
  //   },
  // },
  routeRules: {
    "/": { prerender: true },
  },
});
