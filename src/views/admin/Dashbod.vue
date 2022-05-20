<template>
     <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-xl-8 col-sm-12">
            <router-link 
                :to="{name: 'dashboard'}"
                class="btn btn-primary btn-sm rounded shadow mb-3">
                Add
            </router-link>
            <button @click="logOut()" class="btn btn-warning btn-sm rounded shadow mb-3 mx-3 text-white">Logout</button>
                <div class="card rounded shadow ">
                    <div class="card-header">
                        List User
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(list, index) in users" :key="index">
                                    <td>{{ ++index }}</td>
                                    <td>{{ list.name }}</td>
                                    <td>{{ list.email }}</td>
                                    <td>
                                        <div class="btn-group">
                                            <router-link 
                                            :to="{name: ''}" class="btn btn-sm btn-outline-info"
                                            >Edit</router-link>
                                            <button class="btn btn-sm btn-outline-danger" 
                                            @click.prevent="destroy(list.id, index)">Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted,ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    setup(){
        let users = ref([]);
        const router = useRouter();
        onMounted(() => {
            axios.get('http://localhost:8000/api/v1/auth/list' ,{
                headers : {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then((result) => {
                users.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        });
        function logOut(){
            localStorage.setItem('token', false);
            router.push({name: 'login'});
        }
        function destroy(id, index){
            axios.delete(
                'http://localhost:8000/api/v1/auth/list/' + id,
                users
            )
        }
        return {
            users,
            logOut,
            destroy
        }
    }
}
</script>