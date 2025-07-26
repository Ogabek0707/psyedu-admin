<template>
  <div class="h-[71px] w-full flex justify-between items-center px-[25px] relative shadow-[0_6px_12px_-4px_rgba(0,0,0,0.12)] bottom-0">
    <div class="flex items-center gap-[25px]">
      <button @click="isOpen = !isOpen"><svg-icon type="mdi" :path="mdiMenu" :class="isOpen ? 'hidden' : 'block'" class="w-[38px] h-[38px] text-gray-400 cursor-pointer"></svg-icon></button>
      <button @click="isOpen = !isOpen"><svg-icon type="mdi" :path="mdiArrowRight" :class="isOpen ? 'block' : 'hidden'" class="w-[38px] h-[38px] ml-[-30px] text-gray-400 cursor-pointer"></svg-icon></button>
      <div>
        <h1 class="text-[#6a73fa] text-[20px] font-bold">{{ receivedValue }}</h1>
      </div>
    </div>
      <!-- <div class="w-[35px] h-[35px] rounded-[50%] bg-gray-400">
        <h1 class="text-center text-white text-[20px] mt-[2px] font-light cursor-pointer" @click="Profile">M</h1>
      </div> -->
      <!-- <aside :class="isHide ? 'warehouse__user-show' : 'warehouse__user-hide'" class="fixed z-[1000]">
        <div class="ul">
          <div class="hover w-full mt-[12px] cursor-pointer">
            <div class="flex gap-[10px] ml-[10px] items-center li">
              <div class="w-[35px] h-[35px] rounded-[50%] bg-gray-400">
                <svg-icon type="mdi" :path="mdiAccount" class="text-[20px] mt-[3px] ml-[6px] text-white"></svg-icon>
              </div>
              <p class="font-normal">Profile</p>
            </div>
          </div>
          <div class="hover w-full cursor-pointer">
            <div class="flex gap-[10px] mt-[3px] ml-[10px] items-center li">
              <div class="w-[35px] h-[35px] rounded-[50%] bg-gray-400">
                <svg-icon type="mdi" :path="mdiAccount" class="text-[20px] mt-[3px] ml-[6px] text-white"></svg-icon>
              </div>
              <p class="font-normal">My Account</p>
            </div>
          </div>
          <span class="w-full border-[0.5px] border-gray-300 mt-[8px]"></span>
          <div class="hover w-full cursor-pointer">
            <div class="flex gap-[18px] mt-[8px] ml-[14px] items-center li">
              <svg-icon type="mdi" :path="mdiAccountPlus" class="text-[20px] text-gray-400"></svg-icon>
              <p class="font-normal">Add another Account</p>
            </div>
          </div>
          <div class="hover w-full cursor-pointer">
            <div class="flex gap-[15px] mt-[5px] ml-[16px]  items-center li">
              <svg-icon type="mdi" :path="mdiCog" class="text-[20px] text-gray-400"></svg-icon>
              <p class="font-normal">Settings</p>
            </div>
          </div>
          <div class="hover w-full cursor-pointer" @click="LogOut">
            <div class="flex gap-[14px] mt-[5px] ml-[18px] mb-[10px] items-center li">
              <svg-icon type="mdi" :path="mdiLogout" class="text-[20px] text-gray-400"></svg-icon>
              <p class="font-normal">LogOut</p>
            </div>
          </div>
        </div>
      </aside> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { UseSidebar } from '@/hooks/UseSidebar';
// import { emitter } from '@/mitt';
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccount, mdiAccountPlus, mdiCog, mdiArrowRight, mdiMenu} from '@mdi/js';
import { useRouter } from 'vue-router';

const receivedValue = ref('Statistikalar');
// const isHide = ref(false)
const router = useRouter()
const {isOpen} = UseSidebar()
// console.log(isOpen);
let prevValue = null;

onMounted(() => {
  // Boshlang‘ich qiymat
  receivedValue.value = localStorage.getItem('sidebarValue');
  prevValue = receivedValue.value;

  // Har 500ms da tekshiradi
  setInterval(() => {
    const currentValue = localStorage.getItem('sidebarValue');
    if (currentValue !== prevValue) {
      receivedValue.value = currentValue;
      prevValue = currentValue;
      // console.log('Detected change:', currentValue);
    }
  }, 100); // yoki 1000ms
});
</script>

<style scoped lang="scss">

$bg-color: #fff;
$blue-color: #435EBE;

.hover:hover {
  background: #ededed;
  border-radius: 10px;
  color: #12486B;
  font-weight: bold;
}
.warehouse__user-hide{
        display: none;
}
      .warehouse__user-show{
        display: block;
        position: absolute;
        top: 105%;
        right: 20px;
        width: 250px;
        background-color: #9a9a9a;
        border-radius: 15px;
        box-shadow: 10px 10px 15px rgba(202, 202, 202, 0.5), 
                   -10px -10px 15px rgba(202, 202, 202, 0.5);
        .ul{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          /* gap: 10px; */
          background-color: $bg-color;
          .li{
            width: 100%;
            text-align: center;
            padding: 5px;
            font-size: 17px;
            transition: all 0.4s linear;
            letter-spacing: 0.4px;
          }
        }
      }
</style>
