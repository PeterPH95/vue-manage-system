<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#fff"
    :collapse="isCollapse"
  >
    <h3 class="bg-title">{{isCollapse ? $t("common.s-background") : $t("common.background")}}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ $t("sys." + item.name) }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ $t("sys." + item.name) }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.name" >
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">
          <i :class="`el-icon-${subItem.icon}`"></i>
          {{ $t("sys." + subItem.name) }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 点击菜单跳转,避免路由跳转到本身报错
    // ‘/’重定向特别处理，虽然'/'和'/home'不同，但重定向会导致路由跳到本身
    clickMenu(item) {
        console.log(item)
        // 跳转路由
        if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
            this.$router.push(item.path)
        }
        // 增加面包屑记录
        this.$store.commit("selectMenu", item)
    }
  },
  computed: {
    // 无子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    // 有子菜单,二级菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
        return this.$store.state.tab.isCollapse;
    },
    // 获取路由信息,先在缓存中找
    menuData() {
      return this.$store.state.tab.menu || JSON.parse(Cookie.get('menu'));
    }
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border: none;
  .bg-title {
    line-height: 60px;
    height: 60px;
    font-size: 20px;
    text-align: center;
    // filter: blur(0.05px);
    background-color: #545c64;
    border-right: 1px solid #979595;
    color: #eeeaea;
  }
  .el-menu-item {
    // border-right: 1px solid #979595;
  }
}
</style>
