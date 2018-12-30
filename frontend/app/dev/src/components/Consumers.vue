<template>
  <div class="consumers col-lg-8 offset-lg-2">
    <h1 class="title">
      Consumers
    </h1>
    <button
      type="button"
      class="btn btn-default btn-lg btn-primary add-consumer"
      :disabled="editing.id!=null || consumersInProgress"
      @click="addConsumer()"
    >
      <span
        class="glyphicon glyphicon-plus"
        aria-hidden="true"
      /> {{ $t('LABEL.CONSUMER.ADD') }}
    </button>

    <div class="form-group ">
      <label for="consumerTypeFilter">
        {{ $t('LABEL.CONSUMERTYPE.FILTER') }}
      </label>
      <select
        id="consumerTypeFilter"
        v-model="consumerTypeFilter"
        class="form-control consumer-type-filter"
      >
        <option value="">
          {{ $t('LABEL.CONSUMERTYPE.ALL') }}
        </option>
        <option
          v-for="(ctype,key) in consumerTypes"
          :value="key"
        >
          {{ $t(ctype) }}
        </option>
      </select>
    </div>

    <div v-if="!consumersInProgress">
          <table class="table table-striped table-bordered">
            <thead>
            <tr class="headers-row">
              <th scope="col">
                {{ $t('LABEL.CONSUMER.HEADER.ID') }}
              </th>
              <th scope="col">
                {{ $t('LABEL.CONSUMER.HEADER.NAME') }}
              </th>
              <th scope="col">
                {{ $t('LABEL.CONSUMER.HEADER.TYPE') }}
              </th>
              <th scope="col">
                {{ $t('LABEL.CONSUMER.HEADER.ACTIONS') }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="item in list"
              class="consumer-row"
              >
              <td scope="row">
                <span>
                  {{ item.id }}
                </span>
              </td>
              <td scope="row">
                <span v-if="editing.id!==item.id">
                  {{ item.name }}
                </span>
                <div v-if="editing.id==item.id">
                  <input
                          v-model="item.name"
                          type="text"
                          :placeholder="$t('LABEL.CONSUMER.FULLNAME')"
                          class="form-control consumer-control"
                          name="name"
                          required
                          :class="{'is-invalid': item.errors && item.errors.name}"
                          @input="changeName(item)"
                  >
                  <span
                          v-if="item.errors && item.errors.name && item.errors.name.required"
                          class="error text-danger"
                  >
                    {{ $t('LABEL.NAME.ERROR.REQUIRED') }}
                  </span>
                </div>
              </td>
              <td>
                <span v-if="editing.id!==item.id">
                  {{ getType(item.consumer_type) }}
                </span>
                <div v-if="editing.id===item.id">
                  <select
                          v-model="item.consumer_type"
                          class="form-control consumer-control"
                          name="consumer_type"
                          :class="{'is-invalid': item.errors && item.errors.consumer_type}"
                          @change="changeType(item)"
                  >
                    <option value="">
                      {{ $t('LABEL.CONSUMERTYPE.NOOPTION') }}
                    </option>
                    <option
                            v-for="(ctype,key) in consumerTypes"
                            :value="key"
                    >
                      {{ $t(ctype) }}
                    </option>
                  </select>
                  <span
                          v-if="item.errors && item.errors.consumer_type && item.errors.consumer_type.required"
                          class="error text-danger"
                  >
                    {{ $t('LABEL.CONSUMERTYPE.ERROR.REQUIRED') }}
                  </span>
                </div>
              </td>
              <td>
                <template v-if="!actionInProgress || editing.id!==item.id">
                    <button
                            v-if="editing.id===item.id"
                            type="button"
                            class="btn btn-default btn-lg save-consumer"
                            :disabled="!canSave(item)"
                            @click="save(item)"
                    >
                    <span
                            class="glyphicon glyphicon-saved action-button save"
                            data-toggle="tooltip"
                            title="Save"
                    />
                    </button>


                    <span class="icon-separator" />

                    <button
                            v-if="editing.id!==item.id"
                            type="button"
                            class="btn btn-default btn-lg remove-consumer"
                            :disabled="(editing.id!=null&&editing.id!==item.id)||actionInProgress"
                            @click="showPrompt(item)"
                    >
                    <span
                            class="glyphicon glyphicon-trash action-button remove"
                            data-toggle="tooltip"
                            title="Remove"
                    />
                    </button>
                    <button
                            v-if="editing.id===item.id"
                            type="button"
                            class="btn btn-default btn-lg "
                            @click="cancel(item)"
                    >
                    <span
                            class="glyphicon glyphicon-remove action-button remove"
                            data-toggle="tooltip"
                            title="Cancel"
                    />
                    </button>
                </template>

                <template v-if="actionInProgress && toRemoveItem.id===item.id">
                  <div
                  class="spinner-border text-primary actions-spinner"
                  role="status"
                  >
                      <span class="sr-only">
                      Loading...
                      </span>
                    </div>
                </template>
              </td>
            </tr>
            </tbody>
          </table>

          <b-pagination
                  v-model="currentPage"
                  size="lg"
                  :total-rows="consumers.length"
                  :per-page="pageSize"
                  @change="changePage"
          />
    </div>

    <div v-if="consumersInProgress">
      <div
        class="spinner-border text-primary consumers-spinner"
        role="status"
        >
        <span class="sr-only">
          Loading...
          </span>
      </div>
    </div>



    <div>
      <!-- Modal Component -->
      <b-modal
        id="modal1"
        ref="modalRef"
        :title="$t('LABEL.CONSUMER.DELETE.MODAL.TITLE')"
        @ok="remove(item)"
        @cancel="cancelPrompt()"
      >
        <p>{{ $t('LABEL.CONSUMER.DELETE.MODAL.MESSAGE') }}</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
    const emptyRow= {id: null};
    export default {
        name: "Consumers",
        data(){
          return {
              editing: emptyRow,
              editingNew: false,
              consumerTypeFilter:'',
              list: [],
              consumersInProgress:false,
              actionInProgress: false,
              toRemoveItem:null,
              currentPage:1,
              pageSize: 10
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
        watch: {
          consumerTypeFilter(newValue){
              this.editing=emptyRow;
              this.editingNew=false;
              this.currentPage=1;
              this.consumersInProgress=true;
              this.$store.dispatch('getConsumers',newValue ).then(() => this.updateList());
          }
        },



        mounted() {
            this.getConsumers();
            this.$store.dispatch('getConsumerTypes');
        },
        methods:{

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
                    this.actionInProgress=true;
                    this.$store.dispatch('createConsumer', {name:item.name, consumer_type:item.consumer_type,
                                    consumer_type_filter: this.consumerTypeFilter
                    }).then(() => {
                        this.actionInProgress=false;
                        this.getConsumers();
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
                this.actionInProgress=true;
               this.$store.dispatch('removeConsumer', {
                   id: item.id,
                   consumer_type_filter: this.consumerTypeFilter
               }).then(() => {

                   this.actionInProgress=false;
                   this.getConsumers();
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
            },

            getConsumers(){
                this.consumersInProgress=true;
                this.$store.dispatch('getConsumers').then(() => this.updateList());
            },
            updateList(){
                this.consumersInProgress=false;
                this.list=[].concat(this.consumers).splice((this.currentPage-1)*this.pageSize, this.pageSize);
            },
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/variables';

    .add-consumer{
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .consumers-spinner{
      margin-top:10px;
      width: 50px; height: 50px
    }
    .actions-spinner{
      width: 30px; height: 30px
    }
    .refresh{
        color: #2e5cd2;
        font-size: $bodyFontSize;

        @media #{$media} and #{$maxaspect}, #{$media} and (max-width: $max-width) {
            font-size: $bodyFontSize/1.2;
        }
    }
    .consumer-type-filter{
        width:40%;
        display:inline-block;
        margin-left: 8px;
        font-size: $bodyFontSize - 1;
        @media #{$media} and #{$maxaspect}, #{$media} and (max-width: $max-width) {
            font-size: $bodyFontSize/1.2;
        }


    }
    .consumer-control{
        font-size: $bodyFontSize;
        height: fit-content;

        @media #{$media} and #{$maxaspect}, #{$media} and (max-width: $max-width) {
            font-size: $bodyFontSize/1.2;
        }
    }
    .action-button{
        font-size: 2.4vh;
        cursor: pointer;
    }
    .save{
        color: #1ca127;
        @extend .action-button;
    }
    .remove{
        color: #d20d17;
        @extend .action-button;
    }
    .icon-separator{
        margin: 0 3px 3px 0;
    }
    .consumers{
        margin-top: 3%;
        font-size: $bodyFontSize;

        @media #{$media} and #{$maxaspect}, #{$media} and (max-width: $max-width) {
            font-size: $bodyFontSize/1.2;
        }


    }
    .headers-row{
        :first-child{
          width: 10%;
        }

        * {
            width: 35%;
            @media #{$media} and #{$maxaspect}, #{$media} and (max-width: $max-width) {
                width: 30%;
            }
        }

        :last-child{
            width: 20%;
            @media #{$media} and #{$maxaspect}, #{$media} and (max-width: $max-width) {
                width: 30%;
            }
        }

    }

    td{
        @media #{$media} and #{$maxaspect}, #{$media} and (max-width: $max-width) {
            padding: 0.25rem;
        }
    }


</style>