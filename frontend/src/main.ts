import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './main.scss';
import 'vue-wysiwyg/dist/vueWysiwyg.css';

createApp(App).use(router).mount('#app');
