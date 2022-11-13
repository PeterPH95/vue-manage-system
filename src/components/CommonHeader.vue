<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ $t("sys." + item.name) }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
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
      <!-- 用户区 -->
      <el-dropdown  @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.png" alt="me" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">{{ $t("common.personal") }}</el-dropdown-item>
          <el-dropdown-item command="b">{{ $t("common.exit") }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapMutations(['clearMenu', 'clearTab', 'clearLoginData', "clearPerms", 'setLanguage']),
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    // 切换语言
    handleSelect(command){
      if (command === 'zh') {
        this.$i18n.locale = 'zh'
        this.setLanguage('简体中文')
      }else {
        this.$i18n.locale = 'en'
        this.setLanguage('English')
      }
    },
    // 退出
    handleCommand(command){
      switch (command) {
        case 'a':
          console.log('个人信息');
          break;
        case 'b':
          // null值传给clearMenu的第二个参数
          this.clearMenu(null);
          // 重置按钮权限
          this.clearPerms()
          // 清除面包屑tabs
          this.clearTab()
          // 重置i18n
          this.clearLoginData(this.$i18n);
          this.$router.push('/login');
          // 防止退出登录后，再登录时，路由重名警告
          // window.location.reload()
          break;
        default:
          break;
      }
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabList,
      language: state => state.user.userLoginData.language
    })
  },
  mounted(){
    // console.log(this.tags, 'tags');
  }
};
</script>

<style lang="less" scoped>
.header-container {
  background-color: #545c64;
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
    .text {
      color: #fff;
      margin-left: 20px;
      font-size: 14px;
    }
    /deep/.el-breadcrumb__item {//防止样式不生效
      .el-breadcrumb__inner {
        &.is-link {
          color: #c9c5c5;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      } 
    }
  }

  .r-content {
    display: flex;
    align-items: center;
    .language {
      font-size: 14px;
      color: #c9c5c5;
      padding: 0 20px;
    }
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>