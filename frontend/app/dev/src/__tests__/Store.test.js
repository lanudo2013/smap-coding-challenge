
import { mutations, getters, actions } from '../store/store';

import * as api from '../api';

//jest.mock(path, moduleFactory) takes a module factory argument. A module factory is a function that returns the mock.
jest.mock('../api', () => {
    let consumers=[
        {id:1, name:'Jhon', consumer_type:'high'},
        {id:2, name:'Mark', consumer_type:'low'},
    ];
    const statistics=[
        {id:1, total_bill:3242.22, consumerId: 1, year: 2015},
        {id:2, total_bill: 191212, consumerId: 2, year: 2015},
        {id:3, total_bill:9242.22, consumerId: 1, year: 2016},
        {id:4, total_bill: 431212, consumerId: 2, year: 2016}
    ]


    return {
            getConsumers(type) {

                return Promise.resolve(consumers.filter(x => type=='' || x.consumer_type === type))
            },
            getStatistics(consumerId,years){

                return Promise.resolve(statistics.filter(x =>
                    (consumerId == null || consumerId == x.consumerId) &&
                    (years == null || x.year === years[0])
                ))
            },
            createConsumer(data){
                data.id = consumers.length+1;
                consumers.push(data);
                return Promise.resolve({success:true});
            },
            removeConsumer(id){
                consumers=consumers.filter(x => x.id!==id);
                return Promise.resolve({success:true});

            },

            // utils to retrieve data
            _getStatistics(){
                return statistics;
            },
            _getConsumers(){
                return consumers;
            }

    };
});


// destructure assign `mutations`
const { changeConsumers, changeConsumerTypeFilter,
    changeConsumerTypes, changeStatistics } = mutations;



describe('Test Mutations and Getters', () =>{
    let state;

    beforeEach(()=> {
        state = { consumers: [], consumerTypes:[],statistics:[],consumerTypeFilter:'' }
    })


    it('changeConsumers', () => {
        // apply mutation
        changeConsumers(state, [{id:1}, {id:2}])
        // assert result
        expect(getters.consumers(state)).toBeTruthy();
        expect(getters.consumers(state)).toHaveLength(2);
    })

    it('changeConsumerTypes', () => {
        changeConsumerTypes(state, [{id:1}, {id:2}, {id:4}]);

        expect(getters.consumerTypes(state)).toBeTruthy();
        expect(getters.consumerTypes(state)).toHaveLength(3);
    })

    it('changeConsumerTypeFilter', () => {
        changeConsumerTypeFilter(state, 'low')
        expect(getters.consumerTypeFilter(state)).toBeTruthy();
        expect(getters.consumerTypeFilter(state)).toEqual('low');
    })

    it('changeStatistics', () => {
        changeStatistics(state, [{id:33}, {id:66}, {id:99}])
        expect(getters.statistics(state)).toBeTruthy();
        expect(getters.statistics(state)[0]).toEqual({id:33});
        expect(getters.statistics(state)).toHaveLength(3);
    })
});




describe('Test Actions', () =>{
    let commit, state, consumerListSize = 2;
    beforeEach(() => {
        state = {};
        commit = jest.fn();
    })

    it('getConsumers', (done) => {

        actions.getConsumers({ commit, state },'low')
            .then(() => {
                expect(commit.mock.calls).toHaveLength(2);
                expect(commit.mock.calls[0][0]).toEqual('changeConsumerTypeFilter');
                expect(commit.mock.calls[0][1]).toEqual('low');
                expect(commit.mock.calls[1][0]).toEqual('changeConsumers');
                expect(commit.mock.calls[1][1]).toEqual([api._getConsumers()[1]]);

                done();
            });
    })

    it('getStatistics', (done) => {
        actions.getStatistics({ commit, state },{selectedConsumer:1, years:[2016]})
            .then(() => {
                expect(commit.mock.calls).toHaveLength(1);
                expect(commit.mock.calls[0][0]).toEqual('changeStatistics');
                expect(commit.mock.calls[0][1]).toEqual([api._getStatistics()[2]]);
                done();
            });
    })


    it('createConsumer', (done) => {
        const newCons={name:'Jim', consumer_type:'extra_high'};
        actions.createConsumer({ commit, state },newCons)
            .then(() => {
                actions.getConsumers({ commit, state }, '').then(() => {
                    expect(commit.mock.calls).toHaveLength(2);
                    expect(api._getConsumers()).toHaveLength(consumerListSize+1);
                    consumerListSize++;
                    done();
                })


            });
    })


    it('removeConsumer', (done) => {

        actions.removeConsumer({ commit, state },{id: 1})
            .then(() => {
                actions.getConsumers({ commit, state }, '').then(() => {
                    const currConsumers = api._getConsumers();
                    expect(currConsumers).toHaveLength(consumerListSize-1);
                    expect(currConsumers[0].id).toEqual(2);
                    consumerListSize--;

                    done();
                })
            });
    })


});