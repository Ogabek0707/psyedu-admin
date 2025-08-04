import { defineStore } from 'pinia'
import CategoryApi from '@/api/main/CategoryApi'
import Notification from '../plugins/Notification'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    category: [],
    categoryLength: [],
  }),

  actions: {
    async getCategoryLength() {
      try {
        const res = await CategoryApi.getCategoryLength()
        this.categoryLength = res.data.length
        console.log(res.data);
      } catch (err) {
        console.log(err);
        if(err) {
            // Notification({ text: "Not found !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        }
      }
    },
    async getCategory(payload) {
      try {
        const res = await CategoryApi.getCategory(payload)
        this.category = res.data
        payload.last_page = Math.ceil(this.categoryLength / payload.limit)
        // console.log(res);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
        if(err) {
            // Notification({ text: "Not found !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        }
      }
    },
    async addCategory(payload) {
      try {
        const res = await CategoryApi.addCategory(payload)
        if(res.message == 'Subcategory created successfully!'){
            Notification({ text: "Kategoriya muvaffaqiyatli qo‘shildi !!!" }, { type: "success" }, { time: "3500" }, { description: "" });
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
        console.log(res);
      } catch (err) {
        console.log(err);
        if(err.response.data.error == 'Subcategory name already exists') {
            Notification({ text: "Bu Kategoriya mavjud !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
            setTimeout(() => {
                location.reload()
            }, 3000);
        }else {
            setTimeout(() => {
                location.reload()
            },);
            Notification({ text: "Not found !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        }
      }
    },
    async editCategory(payload) {
      try {
        const res = await CategoryApi.editCategory(payload)
        console.log(res);
      } catch (err) {
        console.log(err);
        Notification({ text: "Xatolik yuz berdi !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        setTimeout(() => {
            location.reload()
        }, 3000);
      }
    },
    async deleteCategory(payload) {
      try {
        const res = await CategoryApi.deleteCategory(payload)
        if(res.message == 'Subcategory deleted successfully!'){
            Notification({ text: `${res.data.name} muvaffaqiyatli o'chirildi !!!` }, { type: "success" }, { time: "3500" }, { description: "" });
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
        console.log(res);
      } catch (err) {
        console.log(err);
        Notification({ text: "Internal server error !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        setTimeout(() => {
            location.reload()
        }, 3000);
      }
    }
  }
})
