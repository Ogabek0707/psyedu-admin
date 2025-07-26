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
        // if(res.response == "Phone or Password is incorrect") {
        //     Notification({ text: "Phone or Password is incorrect !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        // }else if(res.message == "User logged in successfully"){
        //     localStorage.setItem("access_token", res?.access_token);
        //     localStorage.setItem("refresh_token", res?.refresh_token);
        //     Notification({ text: "Successful logged in!!!" }, { type: "success" }, { time: "3500" }, { description: "" });

        //     router.push({ name: "statistics" })
        // }
      } catch (err) {
        if(err) {
            Notification({ text: "Not found !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        }
      }
    }
  }
})
