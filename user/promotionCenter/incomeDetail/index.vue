<template>
  <div class="MonthsCon">
    <div id="MonthsConChart" style="height: 600upx"></div>
  </div>
</template>

<script>
import { number } from "echarts";
import * as echarts from "echarts";

export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  props: {
    showTime: Array,
  },
  methods: {
    initMap() {
      var myChart = this.$echarts.init(
        document.getElementById("MonthsConChart")
      );
      const option = {
        // title:{
        //   text:"每日涨幅"
        // },
        legend: {
          icon: "rect", //形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 10, // 设置宽度
          itemHeight: 4, // 设置高度
          itemGap: 24, // 设置间距
          //文字居下
          x: "center",
          // y: "bottom",
          // xdata: ["昨天", "今天"],
          // data: ["昨天涨幅", "今天涨幅", "整体涨幅"],
          textStyle: {
            //文字样式
            color: "#c1dafc",
            fontSize: "12",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // dataZoom: [
        //   {
        //     xAxisIndex: 0, //这里是从X轴的0刻度开始
        //     show: true,
        //     startValue: 0, // 从头开始。
        //     endValue: 5, // 一次性展示6个
        //   },
        // ],
        xAxis: [
          {
            data: [...this.showTime],
            axisPointer: {
              type: "shadow",
            },
            axisLabel: {
              //x轴文字的配置
              show: true,
              interval: 1, //使x轴文字显示全
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "金额",
            interval: 10,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "笔数",
            interval: 5,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "金额",
            type: "line",
            color: "#FA5151",
            yAxisIndex: 0,
            data: [1, 9, 5, 50, 1, 9, 5, 7, 1, 9, 5, 11, 15, 17, 11],
          },
          {
            name: "笔数",
            type: "line",
            color: "#07B9B9",
            yAxisIndex: 1,
            data: [3, 8, 1, 7, 3, 8, 25, 7, 3, 8, 1, 12, 11, 15, 17],
          },
        ],
        // color: ["#b1de6a", "#4ab0ee"],
      };

      myChart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.MonthsCon {
  border: 1px solid #d8d8d8;
  border-radius: 20upx;
  margin-top: 20upx;
}
</style>