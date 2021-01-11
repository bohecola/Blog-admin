import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    options: {
      customProperties: true
    },
    dark: false,
    themes: {
      light: {
        "h-bg": "#fff",
        "h-appbar-search": "#F5F5F5",
        "h-list-header-button": "#eeeeee",
        primary: "#03A9F4"
      }
    }
  }  
})