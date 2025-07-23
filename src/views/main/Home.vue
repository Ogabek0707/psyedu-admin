<template>
    <div>
        Home Page
        <button @click="back">back</button>
    </div>
</template>

<script setup>
import router from '@/router';
import { markProgrammaticNavigation } from '@/utils/navigationGuard';


const back = () => {
    markProgrammaticNavigation()
    router.push({name: 'login'})
    console.log("salom dunyo");

}

</script>

<style lang="scss" scoped>

</style>