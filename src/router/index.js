import { createRouter,createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/admin/Dashbod.vue'
const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/dashbod',
        name: 'dashboard',
        component: Dashboard
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;