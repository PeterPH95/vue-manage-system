<template>
  <el-row>
    <!-- 左部分 -->
    <el-col :span="8" style="padding: 0 10px">
      <!-- 左上部分 -->
      <el-card class="box-card" shadow="hover">
        <div class="user">
          <img src="../assets/images/user.png" alt="" />
          <div class="user-info">
            <p class="name">{{ loginData.name }}</p>
            <p class="access">{{ loginData.role }}</p>
          </div>
        </div>
        <div class="login-info">
          <p>登陆的时间：<span>{{ loginData.time }}</span></p>
          <p>登陆的地点：<span>{{ loginData.addr }}</span></p>
        </div>
      </el-card>
      <!-- 左下部分 -->
      <el-card
        class="box-card"
        style="margin-top: 20px; height: 450px"
        shadow="hover"
      >
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column
            v-for="(value, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="value"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右部分 -->
    <el-col :span="16" style="padding: 0 10px">
      <!-- 右上部分 -->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          shadow="hover"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="value">￥&nbsp;{{ item.value }}</p>
            <p class="desp">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图 -->
      <el-card class="box-card" shadow="hover" style="height: 270px">
        <div ref="echarts1" style="height: 270px"></div>
      </el-card>
      <!-- 柱、饼图 -->
      <div class="graph">
        <el-card class="box-card" shadow="hover">
          <div ref="echarts2" style="height: 250px"></div>
        </el-card>
        <el-card class="box-card" shadow="hover">
          <div ref="echarts3" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "品牌",
        todayBuy: "今日销量",
        monthBuy: "本月销量",
        totalBuy: "总销量",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 6666,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 666,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 6666,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 6666,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 666,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 6666,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      // 获取登录信息
      userLoginData: state => state.user.userLoginData
    }),
    loginData(){
      return JSON.parse(sessionStorage.getItem('userLoginData')) || this.userLoginData
    }
  },
  mounted() {
    // 获取图表数据
    getData().then(({ data }) => {
      const { tableData, userData, videoData } = data.data;
      this.tableData = tableData;
      // console.log(data);

      // 折线图数据获取配置echarts
      // 初始化echarts实例
      var chart1 = echarts.init(this.$refs.echarts1);
      /* 折线图配置项 */
      const orderData = data.data.orderData;
      // console.log(orderData);
      // 取出图例名
      const keyArr = Object.keys(orderData.data[0]);
      // 获取每组数据和图标类型
      const series = [];

      keyArr.forEach((key) => {
        series.push({
          name: key,
          type: "line", // 折线
          data: orderData.data.map((item) => item[key]),
        });
      });

      const orderOption = {
        // 图例
        legend: {
          data: keyArr,
        },
        // x轴
        xAxis: {
          data: orderData.date,
        },
        // y轴
        yAxis: {},
        // 数据
        series,
      };
      // 使用刚指定的配置项和数据显示图表。
      chart1.setOption(orderOption);

      /** 柱图配置项 */
      var chart2 = echarts.init(this.$refs.echarts2);
      const userOption = {
        legend: {
          textStyle: {
            color: "#333",
          },
        },
        grid: {},
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: userData.map((item) => item.date),
        },
        yAxis: {},
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      chart2.setOption(userOption);

      /** 饼图配置项 */
      var chart3 = echarts.init(this.$refs.echarts3);
      const videoOption = {
				series: [
					{
						type: 'pie',
						data: videoData
					}
				]
      };
      chart3.setOption(videoOption);
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 50px 0;
  }
  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}

.login-info {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: space-between;
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    margin-left: 50px;
    span {
      color: #666;
      margin-left: 100px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    font-size: 30px;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .value {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .desp {
      font-size: 14px;
      text-align: center;
      color: #999;
    }
  }
}

.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    height: 260px;
    width: 48%;
  }
}
</style>