import { createRouter, createWebHistory } from 'vue-router';
import UsersList from '../components/UsersList.vue';
import TaskList from '../components/TaskList.vue';
import TaskForm from '../components/TaskForm.vue';

const routes = [
    { path: '/', component: UsersList },
    { path: '/tasks/:token', component: TaskList, props: true },
    { path: '/task-form', name: 'TaskForm', component: TaskForm, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;