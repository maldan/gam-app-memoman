import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import TODO from '../page/TODO.vue';
import Knowledge from '../page/Knowledge.vue';
import Notes from '../page/Notes.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'TODO',
    component: TODO,
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: Knowledge,
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
