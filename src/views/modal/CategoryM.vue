<template>
    <div>
        <AppModal v-model="dialog">
            <div class="w-full p-[20px]">
                <h1 v-if="form.name" class="text-[27px] text-center font-semibold">Kategoriyani o'zgartiring</h1>
                <h1 v-else class="text-[27px] text-center font-semibold">Kategoriya qo'shing</h1>
                <div class="w-full px-[20px] mt-[20px] text-center">
                    <Form :initialValues="form" @submit="handleSubmit">
                        <InputText unstyled type="text" placeholder="Kategoriyani kiriting" name="name" class="w-[90%] h-[50px] dark:text-white dark:placeholder:text-white px-[15px] border border-black rounded-lg focus:border-none focus:ring-1 focus:border-[blue]"/>
                        <Button unstyled icon="pi pi-spin pi-circle" :loading="isLoading" type="submit" class="w-[90%] mt-[24px] mb-[10px] bg-[#6a73fa] cursor-pointer text-white py-3 rounded-lg font-semibold transition hover:bg-blue-700" :label="btn_title" />
                    </Form> 
                </div>
            </div>
        </AppModal>
        <AppModal v-model="dialog2">
            <div class="w-full p-[20px]">
                <h1 class="text-[27px] text-center font-semibold">Haqiqatdan o‘chirishni xohlaysizmi?</h1>
                <div class="w-full px-[20px] mt-[20px] flex justify-center items-center gap-[80px]">
                    <button class="w-[100px] bg-[red] cursor-pointer min-h-[50px] text-white font-semibold rounded-lg hover:bg-red-700 transition" @click="deleteCategory">Ha</button>
                    <button class="w-[100px] bg-[#6a73fa] cursor-pointer min-h-[50px] text-white font-semibold rounded-lg hover:bg-blue-700 transition" @click="dialog2 = false">Yo'q</button>
                </div>
            </div>
        </AppModal>
    </div>
</template>

<script setup>
import AppModal from '@/components/ui/app-modal.vue';
import { ref, computed, watch } from 'vue';
import InputText from 'primevue/inputtext'
import Button from 'primevue/button';
import { Form } from '@primevue/forms';
import { useCategoryStore } from '@/stores/category';

const dialog = ref(false)
const dialog2 = ref(false)
const isLoading = ref(false)
const store = useCategoryStore()
const categoryId = ref('')

const form = ref({
    name: '',
    categoryId: ''
})

const handleSubmit = async (e) => {
    isLoading.value = true
    console.log(e);
    if(!form.value.categoryId){
        let payload = {
            name: e.values.name
        }
        await store.addCategory(payload)
    }else {
        
        let payload = {
            name: e.values.name,
            subcategoryId: form.value.categoryId
        }
        await store.editCategory({...payload})
    }
    isLoading.value = false
}

const deleteCategory = async () => {
    console.log(categoryId.value);
    await store.deleteCategory(categoryId.value)
}

const btn_title = computed(() => {
    console.log(isLoading.value);
    if(isLoading.value) {
            if(form.value.name){
                return "Kategoriya o'zgartirilmoqda"
            }else {
                return "Kategoriya qo'shilmoqda"
            }
      }else {
            if(form.value.name){
                return "Kategoriyani o'zgartiring"
            }else {
                return "Kategoriya qo'shing"
            }
      }
});

const Delete = (item) => {
    if(item){
        categoryId.value = item.id 
        dialog2.value = true
    }else {
        categoryId.value = ''
    }
    
}

const openModal = (item) => {
    console.log(item);
    if(item){
        form.value = {...item}
        form.value.name = item.name
        form.value.categoryId = item.id
    }else {
        form.value.name = ''
    }
    dialog.value = true
}
defineExpose({openModal,Delete});
</script>

<style lang="scss" scoped>

</style>