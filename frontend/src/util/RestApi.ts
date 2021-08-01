import Axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || `${window.location.origin}/api`;

export const RestApi = {
  main: {},
  todo: {
    async getList() {
      return (await Axios.get(`${API_URL}/todo/list`)).data.response;
    },
    async get(id: string) {
      return (await Axios.get(`${API_URL}/todo?id=${id}`)).data.response;
    },
    async update(todo: any) {
      return (await Axios.patch(`${API_URL}/todo`, todo)).data.response;
    },
    async add(priority: number, description: string, deadline: string) {
      return (
        await Axios.post(`${API_URL}/todo`, {
          priority,
          description,
          deadline,
        })
      ).data.response;
    },
    async delete(id: string) {
      return (await Axios.delete(`${API_URL}/todo?id=${id}`)).data.response;
    },
  },
};
