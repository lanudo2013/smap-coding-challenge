<template>
  <div class="statistics">
    <h1 class="title">
      {{ $t('LABEL.STATISTICS.TITLE') }}
    </h1>

    <form>
      <div class="form-group row">
        <label
          for="consumer"
          class="col-2 col-form-label"
        >
          {{ $t('LABEL.STATISTICS.FORM.CONSUMER') }}:
        </label>
        <div class="col-lg-5 col-md-5 col-sm-10  col-xl-5 loading" v-if="loadingConsumers">
          <div v-if="loadingConsumers">
            <label
                    class="col-form-label "
            >
              {{ $t('LABEL.STATISTICS.FORM.LOADING') }}...
            </label>
          </div>
        </div>


        <div class="col-lg-5 col-md-5 col-sm-10  col-xl-5" v-if="!loadingConsumers">
          <select
            id="consumer"
            v-model="selectedConsumer"
            class="form-control"
          >
            <option value="">
              {{ $t('LABEL.STATISTICS.CONSUMER.SELECTONE') }}
            </option>
            <option
              v-for="cons in consumers"
              :value="cons.id"
            >
              {{ cons.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-2 col-form-label">
          {{ $t('LABEL.STATISTICS.FORM.YEAR') }}:
        </label>

        <div class="col-lg-5 col-md-5 col-sm-10  col-xl-5">
          <b-form-checkbox
            v-for="y in years"
            :key="y.name"
            v-model="y.selected"
            value="true"
          >
            {{ y.name }}
          </b-form-checkbox>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-2 col-form-label" />
        <div class="col-lg-5 col-md-5 col-sm-10  col-xl-5">
          <div class="text-left">
            <div style="display: inline-block">
              <button
                      type="button"
                      class="btn btn-default btn-lg btn-primary right"
                      :disabled="!selectedConsumer || !years.some(x => x.selected) || loading"
                      @click="doRequestIfFilters()"
              >
              <span
                      class="glyphicon glyphicon-refresh"
                      aria-hidden="true"
              /> {{ $t('LABEL.STATISTICS.BUTTON.GENERATE') }}
              </button>
            </div>


            <div class="spinner-border text-primary spinner" role="status" v-if="loading"/>
          </div>
        </div>
      </div>
    </form>


    <div
      v-if="consumerInfo&&isChart&&!loading"
      class="general-data"
    >
      <span class="header">
        Name:
      </span>
      <span class="value">
        {{ consumerInfo.name }}
      </span>

      <span class="header">
        Consumer Type:
      </span>
      <span class="value">
        {{ getType(consumerInfo.consumer_type) }}
      </span>
    </div>
    <div id="chart" ></div>
  </div>
</template>

<script>
    import * as d3 from 'd3';
    export default {

        name: "Statistics",
        data(){
            return {
                chartWidth: 0,
                chartHeight: 0,
                loading: false,
                loadingConsumers: false,
                years:[{name:2016, selected:true}, {name:2017, selected:true}],
                status: false,
                selectedConsumer: null,
                isChart:false,
                consumerInfo: null

            }
        },
        computed:{
            yearsSelected(){
                return this.years.filter(x=>x.selected);
            },
            consumers(){
                let list = this.$store.getters.consumers;
                list.sort((x,y) => (x.name||'').toLowerCase().localeCompare((y.name+'').toLowerCase()));
                return list;
            },

            consumerTypes(){
                return this.$store.getters.consumerTypes;
            },
            statistics(){
                let list = this.$store.getters.statistics;

                if (this.yearsSelected.length>0) {
                    let obj = list.reduce((prev,curr) => {
                        prev[curr.month] = prev[curr.month] || {total_bill:0, consumption:0, total_cost:0};
                        prev[curr.month].total_bill += curr.total_bill;
                        prev[curr.month].consumption += curr.consumption;
                        prev[curr.month].total_cost += curr.total_cost;
                        return prev;
                    }, {});

                    list= Object.keys(obj).map(x => ({
                        total_bill: obj[x].total_bill,
                        consumption: obj[x].consumption,
                        total_cost: obj[x].total_cost,
                        month: parseInt(x)
                    }))
                }

                return list.sort(
                    (x,y) => x.month > y.month ? 1 : (y.month > x.month ? -1 : 0)
                );
            }
        },
        beforeMount(){
            this.axisLabels=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DIC']
                .map(x => this.$t('LABEL.STATISTICS.CHART.XAXE.'+x));
        },
        mounted(){
            this.loadingConsumers=true;
            this.$store.dispatch('getConsumers').then(() => this.loadingConsumers=false);
            window.addEventListener('resize',this.setupChart)
            this.$store.dispatch('getConsumerTypes');

        },
        methods:{
            getType(id){
                const type=this.consumerTypes.filter(x => x.id===id)[0];
                if (!type){ return '--'; }
                return this.$t(type.label);
            },

            doRequestIfFilters(){
                if (this.selectedConsumer && this.yearsSelected.length>0){
                    this.loading=true;
                    d3.select("svg").remove();
                    d3.select(".tooltip").remove();
                    this.$store.dispatch('getStatistics', {
                        selectedConsumer: this.selectedConsumer,
                        years: this.yearsSelected.length === this.years.length ? null: this.yearsSelected.map(x => x.name)
                    }).then(() => this.setupChart())
                }


            },
            setupChart(){
                this.loading=false;
                d3.select("svg").remove();
                d3.select(".tooltip").remove();
                if (this.statistics.length==0){
                    this.isChart=false;
                    return;
                }
                this.consumerInfo=this.consumers.filter(x => this.selectedConsumer===x.id)[0];

                const data= this.statistics;
                const width = window.innerWidth;
                const height = window.innerHeight;
                let margin = {top: 80, right: width*0.05, bottom: 30, left: 30};

                this.chartWidth=width*0.75;
                this.chartHeight = height*(width<800? 0.35 : 0.45);


                let svg = d3.select("#chart").append("svg").attr("width", this.chartWidth+ margin.right + margin.left)
                    .attr("height", this.chartHeight+ margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                let  g = svg;


                let x0Dom=this.axisLabels;

                let x0=d3.scaleBand()
                    .domain( this.axisLabels)
                    .range([0, this.chartWidth])
                    .paddingInner(0.1);

                const x1Dom=[this.$t('LABEL.STATISTICS.YAXE.CONSUMPTION'),
                    this.$t('LABEL.STATISTICS.YAXE.TOTALBILL'),
                    this.$t('LABEL.STATISTICS.YAXE.TOTALCOST')];

                let x1 = d3.scaleBand()
                    .range([0, x0.bandwidth()])
                    .domain(x1Dom)
                    .padding(0.05);

                const max=Math.max(Math.max.apply(null,data.map(x => x.consumption)),
                    Math.max.apply(null,data.map(x => x.total_bill)), Math.max.apply(null,data.map(x => x.total_cost)));
                let y = d3.scaleLinear()
                    .range([this.chartHeight, 0])
                    .domain([0, 1.1*max]).nice();

                let z = d3.scaleOrdinal()
                    .range(["#41c54d", "#ff9a39", "#2e5cd2"]);


                const that=this;

                // Define the div for the tooltip
                const div = d3.select("#chart").append("div")
                    .attr("class", "tooltip")
                    .style('background-color', 'white')
                    .style('border', 'black solid 2px')
                    .style('font-size', '10px')
                    .style("opacity", 0);

                svg.append("g")
                    .selectAll("g")
                    .data(data)
                    .enter().append("g")
                    .attr("class","bar")
                    .attr("transform", function(d,i) {
                        return "translate(" + x0(x0Dom[i]) + ",0)";
                    })

                    .selectAll("rect")
                    .data(function(d) {
                        return [
                            d.consumption,
                            d.total_bill,
                            d.total_cost
                        ];
                    })
                    .enter().append("rect")

                    .attr("y", function(d) {
                        return y(d);
                    })
                    .attr("x", function(d,i) {
                        return x1(x1Dom[i]);
                    })
                    .attr("fill", function(d,i) {
                        return z(i); })
                    .attr("width", x1.bandwidth())
                    .attr("height", function(d) {
                        return that.chartHeight - y(d);
                    })
                    .on('mouseover', function(value,index,x,y,z){
                        const d3Aux=d3;
                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
                        div	.html('<span><b>'+x1Dom[index]+':</b> $'+parseFloat(value).toFixed(2)+'</span>')
                            .style("left", (d3Aux.event.pageX-40) + "px")
                            .style("top", (d3Aux.event.pageY-80) + "px");
                    })
                    .on('mouseout', function(){
                        div.transition()
                            .duration(200)
                            .style("opacity", 0);
                    })
                ;

                const yearsSel=this.yearsSelected.map(x=>x.name);

                svg.append("text")
                    .attr("x", (this.chartWidth / 2))
                    .attr("y", 0 - (margin.top / 1.6))
                    .attr("text-anchor", "middle")
                    .style("font-size", "20px")
                    .style("font-weight", "bold")
                    .text(this.$t('LABEL.STATISTICS.CHART.TITLE')+" "+yearsSel.join(', '));

                g.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + this.chartHeight + ")")
                    .call(d3.axisBottom(x0));

                g.append("g")
                    .attr("class", "y axis")
                    .call(d3.axisLeft(y).ticks(null, "s"))
                    .append("text")
                    .attr("x", 2)
                    .attr("y", y(y.ticks().pop()) + 0.5)
                    .attr("dy", "0.32em")
                    .attr("fill", "#000")
                    .attr("font-weight", "bold")
                    .attr("text-anchor", "start")
                    .text(this.$t('LABEL.STATISTICS.CHART.YAXE.NAME'));

                let legend = g.append("g")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .attr("text-anchor", "end")
                    .selectAll("g")
                    .data(x1Dom.slice())
                    .enter().append("g")
                    .attr("transform", function(d, i) {
                        let list = x1Dom.slice(1,i+1);
                        let lng= 0;
                        list.forEach(x => lng += x.length);

                        return "translate(" + (lng*6 + i * 40 + 40) + ",0)";
                    });

                legend.append("rect")
                    .attr("y", -35)
                    .attr("x", 10)
                    .attr("width", 15)
                    .attr("height", 15)
                    .attr("fill", z)
                    .attr("stroke", z)
                    .attr("stroke-width",2);

                legend.append("text")
                    .attr("y", -27)
                    .attr("dy", "0.32em")
                    .text(function(d) { return d; });
                this.isChart=true;



            }
        },
        unmounted(){
            window.removeEventListener('resize');
        }

    }
</script>

<style scoped lang="scss">
    @import '../assets/variables';
    .spinner{
      margin-left: 10px;
      margin-bottom: -8px;
      width: 30px; height: 30px
    }

    .loading{
      text-align: left;
      @media #{$media} and #{$maxaspect}, #{$media} and (max-width: $max-width) {
        text-align: center;
      }
    }

    #consumer{
        height: fit-content;
        font-size: $bodyFontSize;
        @media #{$media} and #{$maxaspect}, #{$media} and (max-width: $max-width) {
            font-size: $bodyFontSize/1.2;
        }
    }

    .header{
        font-weight:bold;
    }
    .general-data{
        margin-bottom: 2px ;
        margin-top: 22px;
    }

    .value{
        font-size: $bodyFontSize+2;
        margin-right: 2vw;
    }
</style>