
import { ref, watch } from "vue";

// localStorage'dan holatni o'qish
const saved = localStorage.getItem("sidebar_open") === "true";

// reactive holat yaratish
const isOpen = ref(saved);

// har safar isOpen o'zgarsa localStorage'ga yozish
watch(isOpen, (newVal) => {
  localStorage.setItem("sidebar_open", newVal.toString());
});

// boshqa komponentlarga foydalanish uchun export qilish
export function UseSidebar() {
  return {
    isOpen
  };
}
