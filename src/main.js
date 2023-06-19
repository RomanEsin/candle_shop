import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as labsComponents from 'vuetify/labs/components'

import '@/assets/main.css';

const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
});

createApp(App)
  .use(vuetify)
  .use(store)
  .use(router)
  .mount('#app');
