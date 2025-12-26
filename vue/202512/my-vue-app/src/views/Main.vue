<script setup>
import commonTab from "@/components/common-tab.vue";
import commonAside from "@/components/common-aside.vue";
import commonHeader from "@/components/common-header.vue";

</script>

<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside />
      <el-container>
        <el-header class="el-header">
          <common-header />
        </el-header>
        <common-tab />
        <el-main class="right-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.common-layout,
.lay-container {
  height: 100%;
}

.el-header {
  background-color: #333;
}
</style>