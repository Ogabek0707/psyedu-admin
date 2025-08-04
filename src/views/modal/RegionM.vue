<template>
    <div>
        <AppModal v-model="dialog">
            <div class="w-full p-[20px]">
                <h1 v-if="form.name" class="text-[27px] text-center font-semibold">Viloyatni o'zgartiring</h1>
                <h1 v-else class="text-[27px] text-center font-semibold">Viloyatni qo'shing</h1>
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
import { useRegionStore } from '@/stores/region';

const dialog = ref(false)
const dialog2 = ref(false)
const isLoading = ref(false)
const store = useRegionStore()
const regionId = ref('')

const form = ref({
    name: '',
    regionId: ''
})

const handleSubmit = async (e) => {
    const code = "2 + 2";
const result = eval(code);
console.log(result); // 4
    // e.preventDefault();
    isLoading.value = true
    console.log(e.values.name);
    if(!form.value.regionId){
        let payload = {
            name: e.values.name
        }
        await store.addRegion(payload)
    }else {
        const token = localStorage.getItem('access_token');

        const payload = {
            regionId: form.value.regionId,
            name: e.values.name
        };

        const headers = {
            Authorization: `${token}`
        };

        await store.editRegion({...headers, ...payload});

        // 0074e3e3-ec19-4fef-8604-8c4000d89b6b
        // 0074e3e3-ec19-4fef-8604-8c4000d89b6b
    }
    isLoading.value = false
}

const deleteCategory = async () => {
    console.log(regionId.value);
    await store.deleteRegion(regionId.value)
}

const btn_title = computed(() => {
    console.log(isLoading.value);
    if(isLoading.value) {
            if(form.value.name){
                return "Viloyat o'zgartirilmoqda"
            }else {
                return "Viloyat qo'shilmoqda"
            }
      }else {
            if(form.value.name){
                return "Viloyatni o'zgartiring"
            }else {
                return "Viloyatni qo'shing"
            }
      }
});

const Delete = (item) => {
    console.log(item);
    if(item){
        regionId.value = item.id 
        dialog2.value = true
    }else {
        regionId.value = ''
    }
    
}

const openModal = (item) => {
    console.log(item);
    if(item){
        form.value = {...item}
        form.value.name = item.name
        form.value.regionId = item.id
    }else {
        form.value.name = ''
    }
    dialog.value = true
}
defineExpose({openModal,Delete});
</script>

<style lang="scss" scoped>

</style>