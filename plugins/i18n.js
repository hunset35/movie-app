// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// import en from '../locales/en'
// import tw from '../locales/tw'
// Vue.use(VueI18n)
// export default ({ app, store }) => {
//   app.i18n = new VueI18n({
//     locale: store.state.locale,
//     fallbackLocale: 'en',
//     messages: {
//       en: en,
//       zh: tw,
//     },
//   })
//   app.i18n.path = (link) => {
//     if (app.i18n.locale === app.i18n.fallbackLocale) {
//       return `/${link}`
//     }
//     return `/${app.i18n.locale}/${link}`
//   }
// }
