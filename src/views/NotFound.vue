<template>
  <div class="error">
    <h1>404</h1>
    <p>您访问的地址不存在 <i style="font-size: 1.5em">{{ count }}</i>&nbsp;秒内返回主页面</p>
    <el-button type="primary" @click="left">点击跳转到home</el-button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      timer: null,
      count: undefined,
    }
  },
  watch: {
    $router(to, from){
      console.log(to, from, '$router');
    }
  },
  methods: {
    left() {
      this.$router.push("/home")
      window.clearInterval(this.timer)
    },
    setTime() {
      this.count = 5
      this.timer = window.setInterval(() => {
        this.count--;
        if (this.count <= 0) {
          this.left();
        }
      }, 1000);
    }
  },
  // 路由组件展示在页面中调用
  activated(){
    console.log('404组件被激活了')
    // 可以设置定时器
    this.setTime()
  },
  // 路由组件不展示在页面时调用
  deactivated(){
    console.log('组件失活了')
    this.left()
  }
};
</script>

<style lang="less" scoped>
.error {
  width: 400px;
  padding: 10px;
  text-align: center;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  // 水平居中,宽已知高未知情况下
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  h1, p, .el-button {
    margin: 20px 0;
  }
}
</style>