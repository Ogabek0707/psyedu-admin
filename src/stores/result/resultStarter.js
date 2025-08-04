import { defineStore } from 'pinia'
import ResultStarterApi from '@/api/main/result/ResultStarterApi'
import Notification from '../../plugins/Notification'

export const useResultStarterStore = defineStore('resultStarter', {
  state: () => ({
    resultStarter: [],
  }),

  actions: {
    async GetResultStarter(payload) {
      try {
        const res = await ResultStarterApi.getResultStarter(payload)
        this.resultStarter = res.data.data
        payload.last_page = Math.ceil(res.data.total / payload.limit)
        console.log(res.data.data);
      } catch (err) {
        if(err) {
          console.log(err);
            Notification({ text: "Not found !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        }
      }
    }
  }
})
