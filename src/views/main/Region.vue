<template>
    <RegionM ref="addRegion"/>
    <div class="flex flex-col justify-center items-center px-[20px] pt-[24px]">
        <div>
            <h1 class="text-[24px] font-semibold mb-[24px]">Viloyatlar</h1>
        </div>
        <div class="w-[95%] bg-white flex justify-between items-center p-6 my-[24px] rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.12)]">
            <div>
                <InputText v-model="search" unstyled placeholder="Viloyatlarni qidirish..." class="w-[710px] h-[50px] dark:text-white dark:placeholder:text-white px-[10px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
            <button class="min-w-[60px] bg-[#6a73fa] cursor-pointer min-h-[50px] sm:px-6 text-white rounded-lg shadow-md hover:bg-blue-700 transition" @click="AddRegion">Viloyat yaratish</button>
        </div>
        <AppTable :headers="headers" :body="filteredCategories">
            <template #body_index="{index}">
                <span>{{ (params.page - 1) * params.limit + index + 1 }}</span>
            </template>
            <template #body_action="{item}">
                <button class="mr-[10px]"><svg-icon type="mdi" class="text-green-500" :path="mdiFileDocumentEditOutline" @click="editRegion(item)"></svg-icon></button>
                <button class="ml-[10px]"><svg-icon type="mdi" class="text-[red]" :path="mdiDelete" @click="deleteRegion(item)"></svg-icon></button>
            </template>
        </AppTable>
        <div class="flex justify-center my-[20px]">
            <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getRegion"/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { useRegionStore } from '@/stores/region';
import AppTable from '@/components/ui/app-table2.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFileDocumentEditOutline, mdiDelete } from '@mdi/js';
import VPagination from '@hennge/vue3-pagination'
import InputText from 'primevue/inputtext'
import RegionM from '../modal/RegionM.vue';

const store = useRegionStore()
const search = ref('')
const addRegion = ref('')

const params = reactive ({
    page: 1,
    limit: 9,
    last_page: null
})

const headers = ref([
    {title: 'No', value: 'index'},
    {title: 'Viloyat', value: 'name'},
    {title: 'Boshqarish', value: 'action'},
])

const filteredCategories = computed(() => {
  if (!search.value) return store?.region || []

  return (store?.region || []).filter(item =>
    item.name?.toLowerCase().includes(search.value.toLowerCase())
  )
})

const AddRegion = () => {
    addRegion.value.openModal()
}
const editRegion = (item) => {
    addRegion.value.openModal(item)
}
const deleteRegion = (item) => {
    addRegion.value.Delete(item)
}


onMounted( () => {
    store.getRegionLength()
    store.getRegion(params)
    console.log(store.region);
})
const getRegion = () => {
    store.getRegion(params)
};
</script>

<style lang="scss" scoped>

</style>