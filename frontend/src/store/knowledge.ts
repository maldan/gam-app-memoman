import { ActionContext } from 'vuex';
import { MainTree } from '@/store/index';
import Axios from 'axios';

export interface IKnowledge {
  id: string;
  tags: string[];
  description: string;
  created: string;
}

export interface KnowledgeStore {
  tag: string;
  list: IKnowledge[];
  tags: Record<string, number>;
}
export type KnowledgeActionContext = ActionContext<KnowledgeStore, MainTree>;

export default {
  namespaced: true,
  state(): KnowledgeStore {
    return {
      tag: '',
      list: [],
      tags: {},
    };
  },
  mutations: {
    SET_LIST(state: KnowledgeStore, list: IKnowledge[]): void {
      state.list = list;
      state.tags = {};
      for (let i = 0; i < state.list.length; i++)
        for (let j = 0; j < state.list[i].tags.length; j++)
          state.tags[state.list[i].tags[j]] = ~~state.tags[state.list[i].tags[j]] + 1;
    },
  },
  actions: {
    async getList(action: KnowledgeActionContext): Promise<void> {
      const list = (await Axios.get(`${action.rootState.main.API_URL}/knowledge/list`)).data
        .response;
      action.commit('SET_LIST', list);
    },
    async add(action: KnowledgeActionContext, payload: IKnowledge): Promise<void> {
      await Axios.post(`${action.rootState.main.API_URL}/knowledge`, {
        ...payload,
        tags: (payload.tags as unknown as string).split(',').map((x) => x.trim()),
      });
      await action.dispatch('getList');
    },
    async update(action: KnowledgeActionContext, payload: IKnowledge): Promise<void> {
      await Axios.patch(`${action.rootState.main.API_URL}/knowledge`, {
        ...payload,
        tags: (payload.tags as unknown as string).split(',').map((x) => x.trim()),
      });
      await action.dispatch('getList');
    },
    async delete(action: KnowledgeActionContext, id: unknown): Promise<void> {
      await Axios.delete(`${action.rootState.main.API_URL}/knowledge?id=${id}`);
      await action.dispatch('getList');
    },
  },
};
