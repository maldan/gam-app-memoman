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
    async add(priority: number, description: string, created: string, deadline: string) {
      return (
        await Axios.post(`${API_URL}/todo`, {
          priority,
          description,
          created,
          deadline,
        })
      ).data.response;
    },
    async delete(id: string) {
      return (await Axios.delete(`${API_URL}/todo?id=${id}`)).data.response;
    },
  },

  note: {
    async getList() {
      return (await Axios.get(`${API_URL}/note/list`)).data.response;
    },
    async get(id: string) {
      return (await Axios.get(`${API_URL}/note?id=${id}`)).data.response;
    },
    async update(note: any) {
      return (await Axios.patch(`${API_URL}/note`, note)).data.response;
    },
    async add(description: string, tags: string[], created: string) {
      return (
        await Axios.post(`${API_URL}/note`, {
          description,
          tags,
          created,
        })
      ).data.response;
    },
    async delete(id: string) {
      return (await Axios.delete(`${API_URL}/note?id=${id}`)).data.response;
    },
  },

  /* knowledge: {
    async getList() {
      return (await Axios.get(`${API_URL}/knowledge/list`)).data.response;
    },
    async get(id: string) {
      return (await Axios.get(`${API_URL}/knowledge?id=${id}`)).data.response;
    },
    async update(knowledge: any) {
      return (await Axios.patch(`${API_URL}/knowledge`, knowledge)).data.response;
    },
    async add(description: string, tags: string[], created: string) {
      return (
        await Axios.post(`${API_URL}/knowledge`, {
          description,
          tags,
          created,
        })
      ).data.response;
    },
    async delete(id: string) {
      return (await Axios.delete(`${API_URL}/knowledge?id=${id}`)).data.response;
    },
  },*/
};
