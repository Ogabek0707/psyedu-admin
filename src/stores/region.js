import { defineStore } from 'pinia'
import RegionApi from '@/api/main/RegionApi'
import Notification from '../plugins/Notification'

export const useRegionStore = defineStore('region', {
  state: () => ({
    region: [],
    regionLength: [],
  }),

  actions: {
    async getRegionLength() {
      try {
        const res = await RegionApi.getRegionLength()
        this.regionLength = res.data.length
        console.log(res.data.length);
      } catch (err) {
        console.log(err);
        if(err) {
            Notification({ text: "Not found !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        }
      }
    },
    async getRegion(payload) {
      try {
        const res = await RegionApi.getRegion(payload)
        this.region = res.data
        // payload.last_page = Math.ceil(this.regionLength / payload.limit)
        console.log(res.data);
      } catch (err) {
        console.log(err);
        if(err) {
            Notification({ text: "Not found !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        }
      }
    },
    async addRegion(payload) {
      try {
        const res = await RegionApi.addRegion(payload)
        if(res.message == 'Region muvaffaqiyatli yaratildi'){
            Notification({ text: "Region muvaffaqiyatli qo‘shildi !!!" }, { type: "success" }, { time: "3500" }, { description: "" });
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
        console.log(res);
      } catch (err) {
        console.log(err.response.data);
        if(err.response.data.message == 'Region name already exists!') {
            Notification({ text: "Bu Viloyat mavjud !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
            setTimeout(() => {
                location.reload()
            }, 3000);
        }else {
            Notification({ text: "Not found !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
            setTimeout(() => {
                // location.reload()
            },);
        }
      }
    },
    async editRegion(payload) {
      try {
        const res = await RegionApi.editRegion(payload)
        if(res.message == 'Region muvaffaqiyatli yangilandi'){
            Notification({ text: "Region muvaffaqiyatli yangilandi!!!" }, { type: "success" }, { time: "3500" }, { description: "" });
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
        console.log(res);
      } catch (err) {
        console.log(err);
        Notification({ text: "Xatolik yuz berdi !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        setTimeout(() => {
            // location.reload()
        }, 3000);
      }
    },
    async deleteRegion(payload) {
      try {
        const res = await RegionApi.deleteRegion(payload)
        if(res.message == 'Region muvaffaqiyatli o\'chirildi'){
            Notification({ text: `${res.data.name} muvaffaqiyatli o'chirildi !!!` }, { type: "success" }, { time: "3500" }, { description: "" });
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
        console.log(res);
      } catch (err) {
        console.log(err);
        console.log(err);
        Notification({ text: "Internal server error !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        setTimeout(() => {
            location.reload()
        }, 3000);
      }
    }
  }
})
