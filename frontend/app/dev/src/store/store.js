import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        consumers: [],
        consumerTypes: [],
        consumerTypeFilter: '',
        statistics:[]
    },
    mutations: {
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
    },
    actions: {
        getConsumers(params, type){
              const {commit}= params;
              if (type == null){
                  type = params.getters.consumerTypeFilter;
              }else{
                  commit('changeConsumerTypeFilter', type)
              }
              return axios.get('/api/consumers/'+ (type != null && type !== '' ? type : ''))
                  .then(response => response.data)
                  .then(data => commit('changeConsumers', data))
        },
        getConsumerTypes({commit}){
            return Promise.resolve([
                {id: 'low', label: 'LABEL.CONSUMERTYPE.LOW'},
                {id: 'high', label: 'LABEL.CONSUMERTYPE.HIGH'},
                {id: 'extra_high', label: 'LABEL.CONSUMERTYPE.EXTRAHIGH'}
            ]).then(data => commit('changeConsumerTypes',data));
        },
        createConsumer(primitives, payload){
            const data = {name:payload.name, consumer_type:payload.consumer_type};
            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: JSON.stringify(data),
                url: '/api/consumer/',
            };
            //axios(options);
            return axios(options)
                .then(response => response.data)
                .catch(() => {
                })
        },
        removeConsumer(primitives, payload){
            return axios.delete('/api/consumer/'+payload.id)
                .then(response => response.data)

        },
        getStatistics(primitives, payload){
            return axios.get('/api/monthly_statistics/'+payload.selectedConsumer,
                            payload.years? {params: {year: payload.years[0]}} : null)
                .then(response => response.data)
                .then((data) => {
                    primitives.commit('changeStatistics', data)
                })
        }
    },
    getters: {
        consumers: state => state.consumers,
        consumerTypes: state => state.consumerTypes,
        consumerTypeFilter: state => state.consumerTypeFilter,
        statistics: state => state.statistics
    }

});
