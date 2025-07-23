// stores/auth.js

import { defineStore } from 'pinia'
import authApi from '../api/auth/AuthApi'
import Notification from '../plugins/Notification'
import router from '@/router'
// import { markProgrammaticNavigation } from '@/utils/navigationGuard'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    userInfo: JSON.parse(localStorage.getItem('user_info')) || {}
  }),

  actions: {
    async authLogin(payload) {
      try {
        const res = await authApi.Login(payload)
        console.log(res);
        if(res.response == "Phone or Password is incorrect") {
            Notification({ text: "Phone or Password is incorrect !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        }else if(res.message == "User logged in successfully"){
            localStorage.setItem("access_token", res?.access_token);
            localStorage.setItem("refresh_token", res?.refresh_token);
            Notification({ text: "Successful logged in!!!" }, { type: "success" }, { time: "3500" }, { description: "" });

            // markProgrammaticNavigation()
            router.push({ name: "home" })
        }
      } catch (err) {
        if(err.response.data.message == "user not found") {
            Notification({ text: "User not found !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        }
      }
    },

    logout() {
      this.token = null
      this.refreshToken = null
      this.userInfo = {}

      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user_info")

      router.push({ name: "Login" })
    }
  }
})
