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
  app: {
    head: {
      title: "Predict Your Monthly Electricity Bill", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  routeRules: {
    "/": { prerender: true },
  },
});
