<template>
    <div class="consumers">
        <button type="button" class="btn btn-default btn-lg btn-primary add-consumer" @click="addConsumer()"
                :disabled="editing.id!=null">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> {{$t('LABEL.CONSUMER.ADD')}}
        </button>

        <div class="form-group ">
            <label for="consumerTypeFilter">{{$t('LABEL.CONSUMERTYPE.FILTER')}}</label>
            <select class="form-control consumer-type-filter" id="consumerTypeFilter"
                    v-model="consumerTypeFilter">
                <option value="">{{$t('LABEL.CONSUMERTYPE.ALL')}}</option>
                <option v-for="(ctype,key) in consumerTypes" :value="key">{{$t(ctype)}}</option>
            </select>
            <button type="button" class="btn btn-default" @click="refreshSearch()">
                <span class="glyphicon glyphicon-refresh refresh" data-toggle="tooltip" title="Refresh"  ></span>
            </button>

            
        </div>

        <table class="table table-striped table-bordered">
            <thead>
            <tr>
                <th scope="col" width="40%">{{$t('LABEL.CONSUMER.HEADER.NAME')}}</th>
                <th scope="col" width="40%">{{$t('LABEL.CONSUMER.HEADER.TYPE')}}</th>
                <th scope="col" width="20%">{{$t('LABEL.CONSUMER.HEADER.ACTIONS')}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in consumers">
                <td scope="row">
                    <span v-if="editing.id!==item.id">{{item.name}}</span>
                    <div v-if="editing.id==item.id">
                        <input  type="text" v-model="item.name" :placeholder="$t('LABEL.CONSUMER.FULLNAME')"
                                class="form-control consumer-control" required
                                :class="{'is-invalid': item.errors && item.errors.name}"
                                @input="changeName(item)"
                        />
                        <span class="error text-danger"
                              v-if="item.errors && item.errors.name && item.errors.name.required">
                            {{$t('LABEL.NAME.ERROR.REQUIRED')}}
                        </span>

                    </div>

                </td>
                <td>
                    <span v-if="editing.id!==item.id">{{getType(item.consumer_type)}}</span>
                    <div v-if="editing.id===item.id">
                        <select v-model="item.consumer_type" class="form-control consumer-control"
                                :class="{'is-invalid': item.errors && item.errors.consumer_type}"
                                @change="changeType(item)"
                        >
                            <option value="">{{$t('LABEL.CONSUMERTYPE.NOOPTION')}}</option>
                            <option v-for="(ctype,key) in consumerTypes" :value="key">{{$t(ctype)}}</option>
                        </select>
                        <span class="error text-danger"
                              v-if="item.errors && item.errors.consumer_type && item.errors.consumer_type.required">
                            {{$t('LABEL.CONSUMERTYPE.ERROR.REQUIRED')}}
                        </span>
                    </div>


                </td>
                <td>
                    <button type="button" class="btn btn-default btn-lg " @click="edit(item)" :disabled="editing.id!=null&&editing.id!==item.id"
                                        v-if="editing.id!==item.id">
                        <span class="glyphicon glyphicon-pencil edit" data-toggle="tooltip" title="Edit"  ></span>
                    </button>

                    <button type="button" class="btn btn-default btn-lg " @click="save(item)" :disabled="!canSave(item)"  v-if="editing.id===item.id">
                        <span class="glyphicon glyphicon-saved save" data-toggle="tooltip" title="Save"  ></span>
                    </button>


                    <span class="icon-separator"></span>

                    <button type="button" class="btn btn-default btn-lg " @click="remove(item)" :disabled="editing.id!=null&&editing.id!==item.id"
                            v-if="editing.id!==item.id">
                        <span class="glyphicon glyphicon-trash remove" data-toggle="tooltip" title="Remove"></span>
                    </button>
                    <button type="button" class="btn btn-default btn-lg " @click="cancel(item)"  v-if="editing.id===item.id">
                        <span class="glyphicon glyphicon-remove remove" data-toggle="tooltip" title="Cancel"></span>
                    </button>

                </td>
            </tr>

            </tbody>
        </table>


    </div>

</template>

<script>
    import {getConsumers,getConsumerTypes, createConsumer} from '../api';

    const emptyRow= {id: null};
    export default {
        name: "consumers",
        data(){
          return {
              consumers: [],
              consumerTypes: {},
              editing: emptyRow,
              editingNew: false,
              consumerTypeFilter:''
          }
        },
        watch: {
          consumerTypeFilter(newValue){
              this.fetchConsumers(newValue);
          }
        },
        methods:{
            fetchConsumers(type) {
                this.editing=emptyRow;
                this.editingNew=false;
                getConsumers(type).then(data => this.consumers=data);
            },
            refreshSearch(){
                this.fetchConsumers(this.consumerTypeFilter);
            },
            getType(id){
                return this.$t(this.consumerTypes[id]) || '--';
            },
            edit(item){
                this.editing={...item};
                if (this.editingNew){
                    this.consumers = this.consumers.filter(x => x.id>=0 && x.id!=null);
                    this.editingNew=false;
                }

            },
            canSave(item){
                return item.errors==null ||
                    (item.errors.name==null && item.errors.consumer_type==null);
            },
            changeName(item){
                item.errors = item.errors || {};
                if (item.name===''){
                    item.errors.name = {required:true};
                }else{
                    delete item.errors.name;
                }
            },
            changeType(item){
                item.errors = item.errors || {};
                if (item.consumer_type===''){
                    item.errors.consumer_type = {required:true};
                }else{
                    delete item.errors.consumer_type;
                }
            },
            save(item){
                this.changeName(item);
                this.changeType(item);


                if (this.canSave(item)){
                    createConsumer(item.name,item.consumer_type)
                        .then(_ => {
                            this.editing=emptyRow;
                            this.editingNew=false;
                         })

                }else{
                    this.$forceUpdate();
                }

            },
            addConsumer(){
                const newEl={
                    id: -1,
                    name: '',
                    consumer_type: ''
                }
                this.consumers.unshift(newEl);
                this.editingNew=true;
                this.editing={...newEl};
            },
            remove(item){
               this.consumers = this.consumers.filter(x => x.id!==item.id);
            },
            cancel(item){
                if (item.id >= 0){
                    Object.assign(item, this.editing);
                }else if (this.editingNew){
                    this.consumers = this.consumers.filter(x => x.id>=0 && x.id!=null);
                }
                this.editing=emptyRow;
                this.editingNew=false;


            }
        },
        mounted() {
            Promise.all([
                getConsumers(),
                getConsumerTypes()
            ]).then(values => {
                this.consumers= values[0];
                this.consumerTypes = values[1].reduce((prev,curr) => {
                    prev[curr.id] = curr.label;
                    return prev;
                },{});
            })


        }
    }
</script>

<style scoped>
    .add-consumer{
        margin-bottom: 2%;
    }
    .refresh{
        color: #2e5cd2;
        font-size: 16px;
    }
    .consumer-type-filter{
        width:40%;
        display:inline-block;
        margin-left: 8px;
        font-size: 12px;

    }
    .consumer-control{
        font-size: 14px;
        height: fit-content;
    }
    .edit{
        color: #ff9a39;
        font-size: 2.4vh;
        cursor: pointer;
    }
    .save{
        color: #1ca127;
        font-size: 2.4vh;
        cursor: pointer;
    }
    .remove{
        color: #d20d17;
        font-size: 2.4vh;
        cursor: pointer;
    }
    .icon-separator{
        margin: 0 3px 3px 0;
    }
    .consumers{
        margin-top: 3%;
    }

</style>