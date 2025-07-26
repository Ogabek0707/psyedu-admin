<template>
    <div class="flex justify-center items-center flex-col pt-[50px]">
        <AppTable :headers="headers" :body="store?.statistics">
            <template #body_averageInitialPercentage="{item}">
                <span>{{ item.averageInitialPercentage }}%</span>
            </template>
            <template #body_averageFinalPercentage="{item}">
                <span>{{ item.averageFinalPercentage }}.0%</span>
            </template>
            <template #body_growthPercentage="{item}">
                <span style="color: red;">{{ item.growthPercentage }}.0%</span>
            </template>
        </AppTable>
        <div class="w-[95%] h-[490px] p-[24px] mt-[80px] mb-[40px] bg-white rounded-[16px] shadow-[0_0_12px_rgba(0,0,0,0.12)]">
            <Bar
      :data="chartData"
      :options="chartOptions"
    />
        </div>
    </div>
</template>

<script setup>
import { useStatisticsStore } from '@/stores/statistics';
import { ref, onMounted, computed } from 'vue';
import AppTable from '@/components/ui/app-table.vue';
import { reactive } from 'vue';
import { Bar } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

const store = useStatisticsStore()


const params = {
    page: 1,
    limit: 5,
    last_page: null
}

const headers = ref([
    {title: 'VILOYATLAR', value: 'regionName'},
    {title: "BOSHLANG'ICH %", value: 'averageInitialPercentage'},
    {title: 'YAKUNIY %', value: 'averageFinalPercentage'},
    {title: 'NATIJA %', value: 'growthPercentage'},
])

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    // Tooltip sozlamalarini yangilaymiz
    tooltip: {
      mode: 'index',
      intersect: false,
      
      // --- OYNANI KATTALASHTIRISH UCHUN QO'SHIMCHALAR ---
      padding: 20,        // Oyna ichidagi bo'sh joyni oshirish
      titleFont: {
        size: 18,         // Sarlavha (hudud nomi) shriftini kattalashtirish
      },
      bodyFont: {
        size: 16,         // Asosiy ma'lumot (foizlar) shriftini kattalashtirish
      },
      titleSpacing: 6,    // Sarlavha va ma'lumotlar orasidagi joy
      bodySpacing: 4,     // Ma'lumot qatorlari orasidagi joy
      // ----------------------------------------------------

      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`,
      },
    },
    datalabels: {
      display: 'auto',
      anchor: 'end',
      align: 'end',
      font: {
        weight: 'bold',
      },
      color: (context) => {
        return context.dataset.data[context.dataIndex] === 0 ? 'white' : '#555';
      },
      backgroundColor: (context) => {
        return context.dataset.data[context.dataIndex] === 0
          ? context.dataset.backgroundColor
          : null;
      },
      borderRadius: 4,
      padding: {
        top: 2,
        bottom: 2,
        left: 4,
        right: 4,
      },
      formatter: (value) => {
        return value.toFixed(2) + '%';
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      min: 0,
      ticks: {
        stepSize: 25,
        callback: (value) => `${value}%`,
      },
    },
  },
};

const chartData = computed(() => {
  const backendData = store.statistics;

  const labels = ['Respublika'];
  const initialData = [5.00];
  const finalData = [8.50];
  const growthData = [3.50];

  if (backendData) {
    backendData.forEach(item => {
      labels.push(item.regionName);
      initialData.push(item.averageInitialPercentage);
      finalData.push(item.averageFinalPercentage);
      growthData.push(item.growthPercentage);
    });
  }

  return {
    labels: labels,
    datasets: [
      { label: 'Boshlang\'ich', backgroundColor: '#8A63D2', data: initialData, },
      { label: 'Yakuniy', backgroundColor: '#22C55E', data: finalData, },
      { label: 'O\'sish', backgroundColor: '#F97316', data: growthData, },
    ],
  };
});

onMounted( () => {
    store.GetStatistics()
})

</script>

<style lang="scss" scoped>

</style>