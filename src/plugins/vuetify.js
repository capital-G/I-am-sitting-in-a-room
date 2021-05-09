import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: "black", // #E53935
          secondary: "black", // #FFCDD2
          accent: "black", // #3F51B5
        },
      },
    },
  })