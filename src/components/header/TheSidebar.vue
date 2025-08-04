<template>
  <div :class="[
    'fixed left-0 z-20 overflow-y-scroll inset-y-0 transition-transform duration-[700ms] linear media lg:static',
    isOpen ? ' w-[80px]' : ' w-[252px]',
  ]">
    <div class="flex items-center justify-center bg-white">
      <div class="w-full text-[20px] h-[70px] flex justify-center items-center gap-3 bg-[#6a73fa]">
        <svg-icon type="mdi" :path="mdiSchool" class="w-[58px] h-[58px] text-white"></svg-icon>
        <h1 :class="isOpen ? 'hidden' : 'block'" class="text-white text-[32px] font-medium">PsyEdu</h1>
      </div>
    </div>
    <hr>
    <div class="mt-[20px] w-full overflow-y-scroll">
      <!-- <router-link v-for="(item, index) in AdminMenu" :key="index" :to="item.path"
        class="media2 flex w-full items-center gap-[10px] pl-[10px] text-gray-400 font-medium hover:bg-gray-200" active-class="active"
        @click="send(item.label)">
        <svg-icon type="mdi" :class="isOpen ? 'ml-[15px] h-[55px]' : ''"  class="w-[26px] h-[26px]" :path="item.icon"></svg-icon>
        <span :class="isOpen ? 'hidden' : 'block'" class="py-[15px] font-semibold">{{ item.label }}</span>
      </router-link> -->

      <div class="w-full">
        <div v-for="(item, index) in AdminMenu" :key="index" class="font-medium">
          <!-- Agar item.children bo‘lsa, accordion -->
          <div v-if="item.children">
            <div class="flex items-center justify-between cursor-pointer hover:bg-gray-200 px-[10px] py-[15px]"
              @click="toggleAccordion(item.name)">
              <div class="flex items-center gap-2 text-gray-400">
                <svg-icon type="mdi" :class="isOpen ? 'ml-[10px] h-[55px]' : ''" class="w-[26px] h-[26px]"
                  :path="item.icon" />
                <span :class="isOpen ? 'hidden' : 'block'" class="font-semibold">{{ item.label }}</span>
              </div>
              <span class="text-gray-400">
                {{ openItems.includes(item.name) ? '▲' : '▼' }}
              </span>
            </div>

            <!-- Children sahifalar -->
            <transition name="fade" class="w-full">
              <div v-if="openItems.includes(item.name)" class="w-full flex flex-col gap-1 py-1">
                <router-link v-for="(child, childIndex) in item.children" :key="childIndex" :to="child.path"
                  active-class="active"
                  class="w-full py-[10px] font-semibold pl-[30px] text-gray-400 hover:bg-gray-200 text-[15px]"
                  @click="send(child)">
                  <span>- {{ child.label }}</span>
                </router-link>
              </div>
            </transition>
          </div>

          <!-- Agar children yo‘q bo‘lsa, oddiy link -->
          <router-link v-else :to="item.path"
            class="flex items-center py-[15px] gap-[10px] pl-[10px] text-gray-400 font-medium hover:bg-gray-200"
            active-class="active" @click="sendAndClose(item.label)">
            <svg-icon type="mdi" :class="isOpen ? 'ml-[15px] h-[55px]' : ''" class="w-[26px] h-[26px]"
              :path="item.icon" />
            <span :class="isOpen ? 'hidden' : 'block'" class="font-semibold">{{ item.label }}</span>
          </router-link>
        </div>
      </div>

      <div class="flex justify-center pt-[8px]">
        <button
          class="flex gap-[10px] pl-[10px] font-semibold w-[95%] cursor-pointer p-3 rounded-md transition bg-gray-200 hover:bg-blue-100 text-gray-700 hover:text-blue-600 justify-start"
          @click="exit">
          <svg-icon type="mdi" :class="isOpen ? 'ml-[15px]' : ''" class="w-[26px] h-[26px]"
            :path="mdiExitToApp"></svg-icon>
          <span :class="isOpen ? 'hidden' : 'block'">Chiqish</span>
        </button>
      </div>
    </div>
  </div>
  <AppModal v-model="dialog">
    <div class="w-full">
      <div class="w-full bg-[red] mt-[-10px] py-[20px]">
        <span class="text-[45px] flex justify-center items-center">⚠️</span>
        <h1 class="text-[24px] text-center font-semibold text-white">Ogohlantirish!</h1>
        <p class="text-center text-[20px] text-white">Siz platformadan chiqshni xohlaysizmi?</p>
      </div>
      <div class="w-full px-[20px] mt-[20px] flex justify-center items-center gap-[80px]">
        <button
          class="w-[100px] bg-[red] cursor-pointer min-h-[50px] text-white font-semibold rounded-lg hover:bg-red-700 transition"
          @click="exitSite">Ha</button>
        <button
          class="w-[100px] bg-[#6a73fa] cursor-pointer min-h-[50px] text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          @click="dialog = false">Yo'q</button>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { ref, onMounted, watch } from "vue";
import { AdminMenu } from "../menu/AdminMenu";
import { UseSidebar } from "@/hooks/UseSidebar";
import { mdiSchool, mdiExitToApp } from '@mdi/js';
import router from "@/router";
import AppModal from "../ui/app-modal.vue";

import { useRoute } from 'vue-router';

const openItems = ref([]); // faqat bitta ochilgan item

function toggleAccordion(name) {
  openItems.value = openItems.value.includes(name) ? [] : [name]
}

// Children bosilganda faqat label yuboriladi, accordion yopilmaydi
function send(label) {
  console.log('Sent:', label)
  localStorage.setItem('sidebarValue', label);
}

// Children yo‘q bo‘lsa va oddiy item bosilsa, accordion yopiladi
function sendAndClose(label) {
  console.log('Sent:', label)
  openItems.value = [] // sidebar yopiladi
}

const { isOpen } = UseSidebar();
const dialog = ref(false)

const exit = () => {
  dialog.value = true
}
const exitSite = () => {
  router.push({ name: 'login' })
}

watch(isOpen, (newVal) => {
  console.log('isOpen o‘zgardi:', newVal)
});

// const send = (value) => {
//   localStorage.setItem('sidebarValue', value);
//   // console.log(value);
// }
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
