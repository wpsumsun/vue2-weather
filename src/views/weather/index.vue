<template>
  <div class="wrap">
    <mt-header title="" fixed>
      <span slot="left">
        <i class="iconfont icon-add"></i>
      </span>
      <span slot="right">
        <i class="iconfont icon-setting"></i>
      </span>
    </mt-header>
    <div class="list">
      <mt-swipe :auto="0">
        <mt-swipe-item v-for="(detail, index) in weather" :key="index">
          <div class="content">
            <p>{{ detail.city_name }}</p>
            <p>{{ detail.now.text }}</p>
            <p>{{ detail.now.temperature }}°</p>
            <p>{{ detail.future[0].low }}°/{{ detail.future[0].high }}°</p>
          </div>
          <div class="weather-list">
            <div class="detail" v-for="(item, index) in detail.future" :key="index">
              <p>{{ item.day }}</p>
              <img :src="`//weixin.jirengu.com/images/weather/code/${item.code1}.png`">
              <p>{{ item.low }}°/{{ item.high }}°</p>
            </div>
          </div>
          <div id="charts">
            <div id="main" :style="{width: chartWidth + 'px',height: chartHeight + 'px'}" ref="chart"></div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import echarts from "echarts"
  import fetch from 'isomorphic-fetch'
  import crypto from 'crypto-js'

  export default {
    name: 'weather',
    computed: {
      ...mapState([
        'weather',
        'cityDetail',
        'tab',
      ]),
      ...mapGetters([
        'timeX',
        'temperatureY',
      ]),

    },
    data() {
      return {
        chartWidth: window.screen.width,
        chartHeight: window.screen.height/3,
      }
    },
    created() {
      this.find()
    },
    updated() {
      this.chartInit()
    },
    methods: {
      ...mapActions([
        'find'
      ]),

      chartInit() {
        const width = window.client
        var myChart = echarts.init(this.$refs.chart[this.tab])
        this.$refs.chart[this.tab].style.width = `${window.screen.width}px`
        this.$refs.chart[this.tab].style.height = `${window.screen.height/3}px`
        myChart.setOption({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.timeX
          },
          yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
          },
          series: [{
            type: 'line',
            data: this.temperatureY
          }]
        });
      },
    },
  }

</script>

<style lang="less" scoped>
  .list {
    margin-top: 40px;
    height: 50vh;
    .content {
      display: flex;
      flex-direction: column;
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1.8;
      }
    }
    .weather-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      p {
        line-height: 1.8;
        text-align: center;
      }
      img {
        max-width: 80%;
        margin: 10px 0;
      }
    }
    #main {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
