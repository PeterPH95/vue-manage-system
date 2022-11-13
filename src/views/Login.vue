<template>
  <div class="bg">
    <el-form
      ref="userForm"
      label-width="70px"
      :inline="true"
      class="login-container"
      :model="userForm"
      :rules="rules"
    >
      <h3 class="login_title">{{ $t("common.sign-in") }}
        <!-- 语言选择 -->
        <el-dropdown class="language" @command="handleSelect">
          <span>
            {{ this.language }} <i class="el-icon-arrow-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">简体中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="userForm.password"
          placeholder="请输入密码"
          @change="submit"
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit" class="login-submit"
        >{{$t("common.login")}}</el-button
      >
    </el-form>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { getMenu, getAddr, getBtn } from "../api";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      userForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      language: '简体中文'
    };
  },
  computed: {
    // ...mapState({
    //   language: state => state.user.userLoginData.language
    // })
  },
  methods: {
    // 设置登录信息
    ...mapMutations([ 'setLoginData', 'setLanguage', 'setLanguage', 'setPerms' ]),
    // 切换语言
    handleSelect(command){
      if (command === 'zh') {
        this.$i18n.locale = 'zh'
        this.language = '简体中文'
        // this.setLanguage('中文')
      }else {
        this.$i18n.locale = 'en'
        this.language = 'English'
        // this.setLanguage('English')
      }
    },
    // 提交登录信息
    submit() {
      this.$refs.userForm.validate((valid) => {
        // 先表单验证
        if (valid) {
          getMenu(this.userForm).then(({ data }) => {
            // 用户账号验证
            if (data.code === 20000) {
              // 保存token
              Cookie.set("token", data.data.token);
              // 保存用户登录信息(时间+地点)到vuex中
              getAddr().then((res) => {
                // console.log(res);
                this.setLoginData({
                  username: this.userForm.username,
                  menu: data.data.menu, 
                  address: res.data.data.address,
                  language: this.language
                })
              }).catch(err => {
                console.log("获取地址的端口挂了",err);
                this.setLoginData({
                  username: this.userForm.username,
                  menu: data.data.menu, 
                  language: this.language
                })
              })
              // 获取用户按钮权限信息
              getBtn(this.userForm).then(({data}) => {
                // console.log(data);
                this.setPerms(data.data.perms)
              }).catch(err => {
                console.log('按钮权限没获取到！！！');
              })
              // vuex保存路由，持久化
              this.$store.commit("setMenu", data.data.menu);
              this.$store.commit("addMenu", this.$router);
              // 跳转到首页
              this.$router.push("/home");
            } else {
              console.log(data.data.message);
              this.$message.error("管理员账号为admin，密码任意");
            }
          });
        }
      });
    },
  },
  mounted() {
    console.log("登录组件Login");
    this.$message.error("管理员账号为admin，密码任意");
  },
};
</script>

<style lang="less" scoped>
// .bg {
//   position: relative;
//   width:100%;
//   min-width: 1600px;
//   height: 100%;
//   min-height: 907px;
//   background: url("../assets/images/a.jpg") center/cover no-repeat;
// }
.login-container {
  width: 400px;
  padding: 35px 35px 15px;
  border-radius: 15px;
  // background-color: rgba(255, 255, 255, 0.05);
  // box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25),-3px -3px 4px rgba(255, 255, 255, 0.15);
  // backdrop-filter: blur(10px);
  // color: #fff;
  border: 1px solid #eaeaea;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
  background-color: #fff;
  text-align: center;

  // 水平居中,宽已知高未知情况下
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .login_title {
    padding-left: 40px;
    margin-bottom: 40px;
    // text-align: center;
    color: #505050;
    .language {
      float: right;
      right: -15px;
      margin-top: 5px;
      font-size: 12px;
      font-weight: normal;
    }
  }
  .el-form-item {
    margin-bottom: 22px;
    .el-input {
      width: 198px;
    }
  }
  .login-submit {
    margin: 10px auto;
  }
}
.el-dropdown-menu__item {
    font-size: 12px;
    padding: 0 10px;
    line-height: 18px;
  }
</style>