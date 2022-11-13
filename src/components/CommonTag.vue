<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.label"
      size="small"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="handleClick(item)"
      @close="handleClose(item, index)"
    >
      {{ $t("sys." + item.name) }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    ...mapMutations(["colseTab"]),
    // 点击面包屑跳转
    handleClick(item) {
      this.$router.push({
        name: item.name,
      });
    },
    // 删除面包屑，更新vuex
    handleClose(item, index) {
      const len = this.tags.length - 1;
      this.colseTab(item);
      // 当前关闭的tag不是激活状态
      if (this.$route.name !== item.name) {
        return;
      }
      // 关闭的是最后一个tag，路由往前跳转
      if (index === len) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        // 关闭中间的tag
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 10px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>