<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-xl-8 col-sm-12">
                <div class="card rounded shadow">  
                    <div class="card-header">
                        Login
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="submit()">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">name</label>
                                <input v-model="data.name" type="text" class="form-control">
                                    <div id="validationServerUsernameFeedback" v-if="errors.name" class="invalid-feedback">
                                    {{ errors.name[0] }} 
                                    </div> 
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input v-model="data.password" type="password" class="form-control" >     
                                 <div id="validationServerUsernameFeedback" v-if="errors.password" class="invalid-feedback">
                                    {{ errors.password[0] }} 
                                    </div> 
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive,ref } from 'vue'
import axios from 'axios'
export default {
    setup(){
        const data=reactive({
            name: '',
            password: ''
        });
        const router = useRouter();
        const errors = ref([]);

        function submit(){
            axios.post('http://localhost:8000/api/v1/auth/login',
            data
        )
            .then((response) => {
                router.push({
                    name: 'dashboard'
                });
                const token = response.data.token;
                localStorage.setItem('token', token);
            }).catch((err) =>{
                errors.value = err.response.data.errors
            });
        }
        return {
            data,
            router,
            errors,
            submit
        }
    }


    
}
</script>