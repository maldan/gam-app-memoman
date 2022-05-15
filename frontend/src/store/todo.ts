import { ActionContext } from 'vuex';
import { MainTree } from '@/store/index';
import Axios from 'axios';

export interface ITodo {
  id: string;
  priority: number;
  description: string;
  deadline: string;
  created: string;
}

export interface TodoStore {
  list: ITodo[];
}
export type TodoActionContext = ActionContext<TodoStore, MainTree>;

export default {
  namespaced: true,
  state(): TodoStore {
    return {
      list: [],
    };
  },
  mutations: {
    SET_LIST(state: TodoStore, list: ITodo[]): void {
      state.list = list;
    },
  },
  actions: {
    async getList(action: TodoActionContext): Promise<void> {
      const list = (await Axios.get(`${action.rootState.main.API_URL}/todo/list`)).data.response;
      action.commit('SET_LIST', list);
    },
  },
};
