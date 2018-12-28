<template>
    <div class="consumers col-lg-8 offset-lg-2">
        <h1 class="title">Consumers</h1>
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
            <tr v-for="item in list">
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


                    <button type="button" class="btn btn-default btn-lg " @click="save(item)" :disabled="!canSave(item)"  v-if="editing.id===item.id">
                        <span class="glyphicon glyphicon-saved save" data-toggle="tooltip" title="Save"  ></span>
                    </button>


                    <span class="icon-separator"></span>

                    <button type="button" class="btn btn-default btn-lg " @click="showPrompt(item)"
                            :disabled="editing.id!=null&&editing.id!==item.id"
                            v-if="editing.id!==item.id"
                            data-target="#deleteModal"
                    >
                        <span class="glyphicon glyphicon-trash remove" data-toggle="tooltip" title="Remove"></span>
                    </button>
                    <button type="button" class="btn btn-default btn-lg " @click="cancel(item)"  v-if="editing.id===item.id">
                        <span class="glyphicon glyphicon-remove remove" data-toggle="tooltip" title="Cancel"></span>
                    </button>

                </td>
            </tr>

            </tbody>
        </table>

        <b-pagination size="lg" @change="changePage" :total-rows="consumers.length"
                      v-model="currentPage" :per-page="pageSize"></b-pagination>


        <div>
            <!-- Modal Component -->
            <b-modal id="modal1" :title="$t('LABEL.CONSUMER.DELETE.MODAL.TITLE')" ref="modalRef" @ok="remove(item)"
                     @cancel="cancelPrompt()">
                <p >{{$t('LABEL.CONSUMER.DELETE.MODAL.MESSAGE')}}</p>

            </b-modal>
        </div>




    </div>

</template>

<script>
    //import bModal from 'bootstrap-vue/es/components/modal/modal'
   // import bPagination from 'bootstrap-vue/es/components/pagination/pagination'

    const emptyRow= {id: null};
    export default {
        name: "consumers",
        data(){
          return {
              editing: emptyRow,
              editingNew: false,
              consumerTypeFilter:'',
              list: [],
              toRemoveItem:null,
              currentPage:1,
              pageSize: 5
          }
        },
        watch: {
          consumerTypeFilter(newValue){
              this.editing=emptyRow;
              this.editingNew=false;
              this.currentPage=1;
              this.$store.commit('changeConsumerTypeFilter',newValue);
              this.$store.dispatch('getConsumers').then(() => this.updateList());
          }
        },
        methods:{
            updateList(){
                this.list=[].concat(this.consumers).splice((this.currentPage-1)*this.pageSize, this.pageSize);
            },
            changePage(newPage){
                this.list=[].concat(this.consumers).splice((newPage-1)*this.pageSize, this.pageSize);
            },
            getType(id){
                return this.$t(this.consumerTypes[id]) || '--';
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
                    this.$store.dispatch('createConsumer', {name:item.name, consumer_type:item.consumer_type,
                                    consumer_type_filter: this.consumerTypeFilter
                    }).then(() => {
                        this.updateList()
                        this.cancel();
                    });
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
                this.list.unshift(newEl);
                this.editingNew=true;
                this.editing=Object.assign({}, newEl);
            },
            showPrompt(item){
                this.toRemoveItem=item;
                this.$refs.modalRef.show();
            },
            remove(){
                let item = this.toRemoveItem;
               this.$store.dispatch('removeConsumer', {
                   id: item.id,
                   consumer_type_filter: this.consumerTypeFilter
               }).then(() => {

                   this.updateList()
                   this.cancelPrompt();
               });
            },
            cancelPrompt(){
                this.toRemoveItem=null;
            },
            cancel(){
                this.list = this.list.filter(x => x.id>=0 && x.id!=null);
                this.editing=emptyRow;
                this.editingNew=false;
            }
        },
        computed: {
            consumers(){
                return this.$store.getters.consumers;
            },
            consumerTypes(){
                const list = this.$store.getters.consumerTypes;
                return list.reduce((prev,curr) => {
                    prev[curr.id] = curr.label;
                    return prev;
                },{})
            }
        },

        mounted() {
            this.$store.dispatch('getConsumers').then(_ => this.updateList());
            this.$store.dispatch('getConsumerTypes');
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