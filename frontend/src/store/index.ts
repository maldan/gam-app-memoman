import { createStore } from 'vuex';

import modal, { ModalStore } from '../gam_sdk_ui/vue/store/modal';
import main, { MainStore } from './main';
import todo, { TodoStore } from './todo';
import knowledge, { KnowledgeStore } from './knowledge';

export type MainTree = {
  main: MainStore;
  modal: ModalStore;
  todo: TodoStore;
  knowledge: KnowledgeStore;
};

export default createStore({
  modules: { main, modal, todo, knowledge },
});
