import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
// Vuetify
// eslint-disable-next-line import/no-extraneous-dependencies,import/extensions
import 'vuetify/styles';
// eslint-disable-next-line import/no-extraneous-dependencies,import/order
import { createVuetify } from 'vuetify';
// eslint-disable-next-line import/no-extraneous-dependencies,import/order
import * as components from 'vuetify/components';
// eslint-disable-next-line import/no-extraneous-dependencies,import/order
import * as directives from 'vuetify/directives';

import '@/assets/main.css';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .use(store)
  .use(router)
  .mount('#app');
