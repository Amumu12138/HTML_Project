<template>
  <div class="v-for-root">
    <top-com></top-com>
    <p>人员列表</p>
    <input type="text" placeholder="请输入关键字" v-model="wordKey" />
    <ul>
      <li v-for="item in filterWatchPersonList" :key="item.id">
        {{ item.name }}-{{ item.age }}-{{ item.sex }}
      </li>
    </ul>

    <input type="text" placeholder="请输入关键字" v-model="computWordKey" />
    <button @click="sortType = 2">升序排序</button>
    <button @click="sortType = 1">降序排序</button>
    <button @click="sortType = 0">原顺序排序</button>
    <ul>
      <li v-for="item in filterComputedPersonList" :key="item.id">
        {{ item.name }}-{{ item.age }}-{{ item.sex }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "v-for",
  data() {
    return {
      wordKey: "",
      computWordKey: "",
      sortType: 0,
      personList: [
        {
          id: "001",
          name: "邓禹",
          age: 23,
          sex: "男",
        },
        {
          id: "002",
          name: "邓奉",
          age: 20,
          sex: "男",
        },
        {
          id: "003",
          name: "阴丽华",
          age: 20,
          sex: "女",
        },
        {
          id: "004",
          name: "阴识",
          age: 23,
          sex: "男",
        },
        {
          id: "005",
          name: "刘秀",
          age: 28,
          sex: "男",
        },
        {
          id: "006",
          name: "刘玄",
          age: 30,
          sex: "男",
        },
      ],
      filterWatchPersonList: [],
    };
  },
  watch: {
    // 利用监听属性实现关键字过滤
    wordKey: {
      immediate: true,
      handler(newVal) {
        console.log("wordKey newVal -->", newVal);
        this.filterWatchPersonList = this.personList.filter((item) => {
          return item.name.indexOf(newVal) !== -1;
        });
        return this.filterWatchPersonList;
      },
    },
  },
  computed: {
    // 利用计算属性实现关键字过滤
    filterComputedPersonList() {
      const newArr = this.personList.filter((item) => {
        return item.name.indexOf(this.computWordKey) !== -1;
      });
      if (this.sortType) {
        newArr.sort((p1, p2) => {
          return this.sortType === 1 ? p2.age - p1.age : p1.age - p2.age;
        });
      }

      return newArr;
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped >
.v-for-root {
  input {
    height: 24px;
    padding: 4px;
  }
}
</style>