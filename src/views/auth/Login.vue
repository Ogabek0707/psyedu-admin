<template>
    <div class="w-full h-[100vh] img">
        <div class="w-full h-full flex justify-around items-center">
            <div></div>
            <div class="p-[32px] rounded-2xl form">
                <div class="text-center">
                    <svg-icon class="w-[58px] h-[58px] m-auto text-gray-200" type="mdi" :path="mdiAccountCircle"></svg-icon>
                    <h1 class="text-[30px] text-gray-200 font-bold mb-[24px]">Login</h1>
                </div>
                <Form @submit="handleSubmit" class="w-[320px] flex flex-col gap-[20px] ">
                    <div>
                        <label for="phone" class="text-gray-300 font-semibold">Phone Number</label>
                        <br>
                        <InputMask unstyled autocomplete="off" type="text" mask="+998-99-999-99-99" name="phone" class="w-full bg-transparent border border-gray-200 p-[12px] text-gray-200 rounded-lg focus:border-green-500 focus:ring-green-500" placeholder="+998*********" v-model="form.phone" />
                    </div>
                    <div>
                        <label for="password" class="text-gray-300 font-semibold">Password</label>
                        <br>
                        <Password unstyled autocomplete="off" type="password" :feedback="false" name="password" class="w-full p-3 bg-transparent border border-gray-200 text-gray-200 rounded-lg focus:outline-none focus:ring-0" placeholder="Password" v-model="form.password" />
                    </div>
                    <Button unstyled type="submit" class="w-full bg-gradient-to-r from-[#204d74] to-[rgb(55, 55, 55)] hover:from-[#104d74] transition-colors duration-800 cursor-pointer hover:to-[rgb(55, 55, 25)] text-white py-3 rounded-lg font-semibold transition shadow-lg" label="Login" />
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Form } from '@primevue/forms';
import InputMask from 'primevue/inputmask';
import Button from 'primevue/button';
import Password from 'primevue/password'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountCircle } from '@mdi/js';
import { useAuthStore } from "../../stores/auth";
import Notification from '@/plugins/Notification';

const store = useAuthStore();

const form = ref({
    phone: '',
    password: ''
})

const handleSubmit = async (e) => {
    if(form.value.phone === '' || form.value.password === ''){
        Notification({ text: "Please you must complete all the fields !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
    }else {
        let phone = e.values.phone.replace(/[^\d+]/g, '')
        if(phone.length === 13){
            let payload = {
                phone: phone,
                password: e.values.password
            }
            console.log(payload);
            await store.authLogin(payload);
        }else {
            Notification({ text: "Please enter the full phone number !!!" }, { type: "danger" }, { time: "3500" }, { description: "" });
        }
    }
}

</script>

<style lang="scss" scoped>
.img {
    background-image: url('../../assets/images/psych-2-D0xdJ1_L.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.form {
    background-image: linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 0) 51%,
    rgb(32, 77, 116)
    );
}
</style>