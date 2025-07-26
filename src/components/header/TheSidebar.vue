<template>
  <div :class="[
    'fixed left-0 z-20 overflow-y-auto inset-y-0 transition-transform duration-[700ms] linear media lg:static',
    isOpen ? ' w-[80px]' : ' w-[252px]',
  ]"
    >
    <div class="flex items-center justify-center bg-white">
      <div class="w-full text-[20px] h-[70px] flex justify-center items-center gap-3 bg-[#6a73fa]">
        <svg-icon type="mdi" :path="mdiSchool" class="w-[58px] h-[58px] text-white"></svg-icon>
        <h1 :class="isOpen ? 'hidden' : 'block'" class="text-white text-[32px] font-medium">PsyEdu</h1>
      </div>
    </div>
    <hr>
    <div class="mt-[20px] w-full">
      <router-link v-for="(item, index) in AdminMenu" :key="index" :to="item.path"
        class="media2 flex w-full items-center gap-[10px] pl-[10px] text-gray-400 font-medium hover:bg-gray-200" active-class="active"
        @click="send(item.label)">
        <svg-icon type="mdi" :class="isOpen ? 'ml-[15px] h-[55px]' : ''"  class="w-[26px] h-[26px]" :path="item.icon"></svg-icon>
        <span :class="isOpen ? 'hidden' : 'block'" class="py-[15px] font-semibold">{{ item.label }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { ref, onMounted, watch } from "vue";
import { AdminMenu } from "../menu/AdminMenu";
import { UseSidebar } from "@/hooks/UseSidebar";
import { mdiSchool } from '@mdi/js';

const { isOpen } = UseSidebar();

watch(isOpen, (newVal) => {
  console.log('isOpen o‘zgardi:', newVal)
})

const send = (value) => {
  localStorage.setItem('sidebarValue', value);
  // console.log(value);
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 240px;
  height: 100%;
  border-right: 1px solid #e5e5e5;
  overflow-y: auto;
  transform: translateX(0);
  background-color: rgb(239, 239, 239);
}

.active {
  color: #6a73fa;
}

.active:hover {
  color: #6a73fa;
}
</style>
