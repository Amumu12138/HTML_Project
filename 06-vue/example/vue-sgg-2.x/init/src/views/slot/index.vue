<template>
  <div class="slot-root">
    <top-com></top-com>
    <Categroy class="categroy" title="默认插槽">
      <ul>
        <li v-for="(item, index) in games" :key="index">{{ item }}</li>
      </ul>
    </Categroy>

    <Categroy class="categroy" title="具名插槽">
      <template v-slot:test>
        <h3>this is test slot</h3>
      </template>
    </Categroy>

    <Categroy class="categroy" title="作用域插槽">
      <template v-slot:test2="{ footData }">
        <p>{{ footData }}</p>
        <ol>
          <li v-for="(item, index) in footData" :key="index">{{ item }}</li>
        </ol>
      </template>
    </Categroy>
  </div>
</template>

<script>
import Categroy from "./childrens/Category.vue";

export default {
  name: "slot-root",
  components: { Categroy },
  data() {
    return {
      games: ["英雄联盟", "穿越火线", "地下城与勇士", "王者荣耀"],
    };
  },
};
</script>

<style lang="less" scoped>
.slot-root {
  .categroy {
    float: left;
    margin: 0 10px;
    padding: 10px;
    background: skyblue;
    li {
      text-align: center;
    }
  }
}
</style>