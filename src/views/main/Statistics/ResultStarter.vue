<template>
    <div class="flex justify-center items-center flex-col pt-[50px]">
        <div class="w-full flex justify-between items-center px-[32px] pb-[27px]">
            <h1 class="text-[24px] font-bold">Boshlang'ich test natijalari</h1>
            <div class="flex justify-center items-center gap-[15px]">
                <div>
                    <h1 class="font-semibold mb-[5px]">Hududni tanlang:</h1>
                    <Select
                        v-model="selectedRegion"
                        :options="regionOptions"
                        optionLabel="name"
                        placeholder="Hammasi"
                        class="w-full md:w-56"
                    />
                </div>
                <button @click="downloadExcel" class="mt-[29px] flex gap-[5px] bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition ">
                    <svg-icon type="mdi" :path="mdiFileDownloadOutline"></svg-icon> 
                    <span>Excel formatda yuklash</span>
                </button>
            </div>
        </div>
        <AppTable :headers="headers" :body="store?.resultStarter">
            <template #body_index="{index}">
                <span>{{ (params.page - 1) * params.limit + index + 1 }}</span>
            </template>
            <template #body_firstName="{item}">
                <div class="flex justify-center gap-1">
                    <span>{{ item.user.firstName }}</span> 
                    <span>{{ item.user.lastName }}</span>
                </div>
            </template>
            <template #body_percentage="{item}">
                <span>{{ item.percentage || 0 }}%</span>
            </template>
            <template #body_score="{item}">
                <span>{{ item.score || 0 }}</span>
            </template>
            <template #body_region>
                <span>Topilmadi</span>
            </template>
            <template #body_cityName="{item}">
                <span>{{ item.user.cityName }}</span>
            </template>
            <template #body_schoolName="{item}">
                <span>{{ item.user.schoolName }}</span>
            </template>
        </AppTable>
        <div class="flex justify-center my-[20px]">
            <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getResultStarter"/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import AppTable from '@/components/ui/app-table2.vue';
import { useResultStarterStore } from '@/stores/result/resultStarter';
import { useRegionStore } from '@/stores/region';
import VPagination from '@hennge/vue3-pagination'
import Select from 'primevue/select'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFileDownloadOutline } from '@mdi/js';

const store = useResultStarterStore()
const store2 = useRegionStore()

const allRegion = { name: 'Hammasi', value: 'all' }
const selectedRegion = ref(allRegion)
const firstLoad = ref(true)

const params = {
    page: 1,
    limit: 20,
    last_page: null,
    testType: 'first'
}


const regionOptions = computed(() => {
  const regions = store2?.region || []
  return [allRegion, ...regions.map(r => ({ name: r.name, value: r }))]
})

watch(selectedRegion, (newVal) => {
    console.log(newVal);
  if (firstLoad.value && newVal?.value === 'all') {
    
  }
  // endi boshqa tanlov bo‘lsa hech nima qilmaydi
})



const params2 = {
    page: 1,
    limit: 20,
    last_page: null,
}

const headers = ref([
    {title: 'No', value: 'index'},
    {title: 'Ism-Familya', value: 'firstName'},
    {title: "Test Natijasi (number)", value: 'score'},
    {title: 'Test natijasi %', value: 'percentage'},
    {title: 'Viloyat', value: 'region'},
    {title: 'Hudud', value: 'cityName'},
    {title: 'Maktab', value: 'schoolName'},
])

const getResultStarter = () => {
    store.GetResultStarter(params)
}
onMounted(() => {
//   if (selectedRegion.value.value === 'all') {
//     store.GetResultStarter(params)
//   }
  store2.getRegion(params2)
//   console.log(selectedRegion);
});

</script>

<style lang="scss" scoped>

</style>