import { shallowMount,createLocalVue  } from '@vue/test-utils';
import Statistics from '../components/Statistics';
import statistics from '../mocks/statistics.json';
import consumers from '../mocks/consumers.json';
import {consumerTypes} from "../api";
import {EmptyComponent} from "../api/utils";
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);


describe('Statistics component', () => {
    let actions;
    let store;
    let getters;
    let getConsumersAction, getStatistics;
    let wrapper;
    let setupChart;

    beforeEach(() => {

        getConsumersAction = jest.fn();
        getStatistics = jest.fn().mockReturnValue(Promise.resolve({}));

        actions = {
            getConsumers: getConsumersAction,
            getStatistics: getStatistics,
            getConsumerTypes: jest.fn()
        };
        getters = {
            statistics: () => statistics,
            consumers: () => consumers,
            consumerTypes: () => consumerTypes
        }
        store = new Vuex.Store({
            state: {},
            actions,
            getters
        });

        wrapper = shallowMount(Statistics, {
            store,
            localVue,
            mocks: {
                $t: () => {
                },
            },
            stubs: {
                'b-form-checkbox': EmptyComponent('b-form-checkbox'),
            }
        });

        setupChart = jest.spyOn(wrapper.vm, 'setupChart');
    })

    it("should create Component", () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });


    it("should render consumers on select control and select one consumer", () => {
        const selectC = wrapper.find('#consumer');
        expect(selectC).toBeTruthy();
        const options=selectC.findAll('option');
        expect(options).toHaveLength(consumers.length+1);

        selectC.element.value = 1;
        selectC.trigger('change');

        expect(wrapper.vm.selectedConsumer).toEqual(1);

    });

    it("should invoke setupChart after clicking on generate button", () => {
        const generateButton = wrapper.find('#generate-button');
        expect(generateButton).toBeTruthy();
        expect(generateButton.attributes('disabled')).toEqual('disabled');
        wrapper.vm.selectedConsumer=1;
        expect(generateButton.attributes('disabled')).toBeFalsy();
        generateButton.trigger('click');
        expect(setupChart).toBeTruthy();
    });


});





