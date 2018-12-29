import Vue from 'vue'
import VueRouter from 'vue-router';

import Consumers from '../components/Consumers';
import Statistics from '../components/Statistics';
import NotFound from '../components/NotFound';
import Welcome from '../components/Welcome';


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Welcome

        },
        {
            path: '/consumers',
            component: Consumers

        },
        {
            path: '/statistics',
            component: Statistics

        },
        {
            path: "*",
            component: NotFound,
            meta: { requiresGuest: true }
        }

    ]
});

export default router;