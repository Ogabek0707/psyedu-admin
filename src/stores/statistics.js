import { defineStore } from 'pinia'
import StatisticsApi from '../api/main/StatisticsApi'
import Notification from '../plugins/Notification'
import router from '@/router'

export const useStatisticsStore = defineStore('statistics', {
  state: () => ({
    statistics: [],
  }),

  actions: {
    async GetStatistics() {
      try {
        const res = await StatisticsApi.getStatistics()
        this.statistics = res.data
        console.log(res.data);
      } catch (err) {
        if(err) {
            Notification({ text: "Not found !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        }
      }
    }
  }
})
