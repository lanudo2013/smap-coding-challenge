import { shallowMount,createLocalVue  } from '@vue/test-utils';
import Consumers from '../components/Consumers';
import consumers from '../mocks/consumers.json';
import {consumerTypes} from "../api";
import Vuex from 'vuex';
import {EmptyComponent} from "../api/utils";

/*
      Assuming using babel-preset-env with webpack, the default Babel config disables ES modules transpilation because
      webpack already knows how to handle ES modules. However, we do need to enable it for our tests because Jest tests
      run directly in Node.
 */

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Consumers component', () => {
    let actions;
    let store;
    let getters;
    let getConsumersAction, createConsumers, removeConsumer;
    let wrapper;

    beforeEach(() => {

        getConsumersAction = jest.fn();
        createConsumers = jest.fn();
        removeConsumer = jest.fn().mockReturnValue(Promise.resolve({}));

        actions = {
            getConsumers: getConsumersAction,
            getConsumerTypes: jest.fn(),
            createConsumer: createConsumers,
            removeConsumer: removeConsumer
        };
        getters = {
            consumers: () => consumers,
            consumerTypes: () => consumerTypes
        }
        store = new Vuex.Store({
            state: {},
            actions,
            getters
        });


        wrapper = shallowMount(Consumers, {
            store,
            localVue,
            mocks:{
                $t: () => {},
            },
            methods:{
                save(item){
                    this.$store.dispatch('createConsumer', {name:item.name, consumer_type:item.consumer_type,
                        consumer_type_filter: this.consumerTypeFilter});
                }
            },
            stubs:{
                'b-pagination': EmptyComponent('b-pagination'),
                'b-modal': {
                    render() {
                        return EmptyComponent('b-modal')
                    },
                    methods: {
                        show() {
                        }
                    }
                }

            }
        });
    })

    it("should create Component", () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });


    it("should change consumer types control", (done) => {

        const value = 'low';
        const select = wrapper.find('#consumerTypeFilter');
        select.element.value = value;
        select.trigger('change');

        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.consumerTypeFilter).toEqual(value);
            expect(getConsumersAction.mock.calls).toHaveLength(2);
            done();
        });


    });



    it("should render 10 rows in consumers table given first page. " +
        "Additional row when clicking on Add Consumer button", () => {

        wrapper.vm.updateList();
        let rows = wrapper.findAll('tr.consumer-row');
        expect(rows).toHaveLength(10);
        const button = wrapper.find('button.add-consumer');
        button.trigger('click');
        rows = wrapper.findAll('tr.consumer-row');
        expect(rows).toHaveLength(11);

    });


    it("should invoke create consumer action", (done) => {
        wrapper.vm.updateList();
        const button = wrapper.find('button.add-consumer');
        button.trigger('click');
        let rows = wrapper.findAll('tr.consumer-row');
        expect(rows.at(0)).toBeTruthy();
        const first= rows.at(0);


        const nameInput=first.find('input[name="name"]');
        const consumerTypeSelect=first.find('select[name="consumer_type"]');

        const typeValue = 'high';
        consumerTypeSelect.element.value = typeValue;
        consumerTypeSelect.trigger('change');

        const nameValue = 'Mark Green';
        nameInput.element.value = nameValue;
        nameInput.trigger('input');

        const firstItem = wrapper.vm.list[0];
        expect(firstItem.name).toEqual(nameValue);
        expect(firstItem.consumer_type).toEqual(typeValue);

        const saveButton=first.find('button.save-consumer');
        expect(saveButton).toBeTruthy();
        saveButton.trigger('click');

        wrapper.vm.$nextTick(() => {
            expect(createConsumers.mock.calls).toHaveLength(1);
            done();
        });



    });



    it("should invoke remove consumer action", (done) => {
        wrapper.vm.updateList();
        let rows = wrapper.findAll('tr.consumer-row');
        expect(rows.at(0)).toBeTruthy();
        const first= rows.at(0);


        const removeButton=first.find('button.remove-consumer');
        expect(removeButton).toBeTruthy();
        removeButton.trigger('click');

        expect(wrapper.vm.toRemoveItem).toBeTruthy();
        wrapper.vm.remove();

        wrapper.vm.$nextTick(() => {
            expect(removeConsumer.mock.calls).toHaveLength(1);
            done();
        });
    });

})