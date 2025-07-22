<template>
    <div>
        Hello world
        <Form @submit="handleSubmit">
            <div class="p-fluid space-y-4">
                <div>
                    <InputText type="text" name="username" placeholder="Username"  v-model="form.username" />
                </div>

                <div>
                    <Password type="password" name="password" placeholder="Password"  v-model="form.password" toggleMask />
                </div>

                <Button type="submit" label="Submit" />
            </div>
        </Form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password'
 

const form = ref({
  username: '',
  password: ''
})

const handleSubmit = (e) => {
    console.log(e.values);
}

</script>

<style lang="scss" scoped></style>