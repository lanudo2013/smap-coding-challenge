import Vue from "vue";
import App from "./App";
import {store} from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/glyphicons.css';
import Router from './router';
import VueI18n from 'vue-i18n'
import I18NLocales from './i18n'
import { Pagination , Modal,FormCheckbox } from 'bootstrap-vue/es/components';
import './assets/custom.scss';

//internationalization
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: I18NLocales.locale,
    messages: I18NLocales.locales
})
Vue.config.lang = I18NLocales.locale;


// bootstrap vue
Vue.use(Pagination);
Vue.use(Modal);
Vue.use(FormCheckbox);


if (process.env.NODE_ENV === 'development') {
    require('./mocks/http-mocks');
}

/* eslint-disable no-new */
new Vue({
    el: "#app",
    components: { App },
    template: "<App/>",
    store,
    i18n,
    router: Router
});