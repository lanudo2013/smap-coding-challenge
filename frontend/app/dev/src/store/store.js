import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        consumers: [],
        consumerTypes: [],
        consumerTypeFilter: ''
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
        }
    },
    actions: {
      getConsumers(params){
          const {commit}= params;
          const type = params.getters.consumerTypeFilter;
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
                .then(data => {
                    if(data.success){
                        return primitives.dispatch('getConsumers');
                    }
                })
                .catch(error => {
                })
        },
        removeConsumer(primitives, payload){
            return axios.delete('/api/consumer/'+payload.id)
                .then(response => response.data)
                .then(data => {
                    if(data.success){
                        return primitives.dispatch('getConsumers');
                    }
                })
        }
    },
    getters: {
        consumers: state => state.consumers,
        consumerTypes: state => state.consumerTypes,
        consumerTypeFilter: state => state.consumerTypeFilter
    }

});
