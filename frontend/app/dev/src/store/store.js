import Vue from 'vue';
import Vuex from 'vuex';
import {createConsumer, getConsumers, getConsumerTypes, getStatistics, removeConsumer} from '../api';

Vue.use(Vuex);


export const mutations = {
    changeConsumers(state, consumers) {
        state.consumers = consumers;
    },
    changeConsumerTypes(state, consumerTypes){
        state.consumerTypes = consumerTypes;
    },
    changeConsumerTypeFilter(state, type){
        state.consumerTypeFilter=type;
    },
    changeStatistics(state, list){
        state.statistics=list;
    }
};

export const getters = {
    consumers: state => state.consumers,
        consumerTypes: state => state.consumerTypes,
    consumerTypeFilter: state => state.consumerTypeFilter,
    statistics: state => state.statistics
};


export const actions = {
    getConsumers(params, type){
        const {commit}= params;
        if (type == null){
            type = params.getters.consumerTypeFilter;
        }else{
            commit('changeConsumerTypeFilter', type)
        }
        return getConsumers(type)
            .then(data => commit('changeConsumers', data))
    },
    getConsumerTypes({commit}){
        return getConsumerTypes().then(data => commit('changeConsumerTypes',data));
    },
    createConsumer(primitives, payload){
        const data = {name:payload.name, consumer_type:payload.consumer_type};
        return createConsumer(data);
    },
    removeConsumer(primitives, payload){
        return removeConsumer(payload.id);
    },
    getStatistics(primitives, payload){
        return getStatistics(payload.selectedConsumer, payload.years)
            .then((data) => {
                primitives.commit('changeStatistics', data)
            })
    }
}



export const store = new Vuex.Store({
    state:{
        consumers: [],
        consumerTypes: [],
        consumerTypeFilter: '',
        statistics:[]
    },
    mutations: mutations,
    actions: actions,
    getters: getters

});
