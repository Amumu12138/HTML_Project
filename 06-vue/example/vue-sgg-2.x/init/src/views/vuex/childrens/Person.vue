<template>
  <div class="person-root">
    <input
      type="text"
      v-model.trim="newPerson"
      placeholder="请输入姓名"
      @keyup.enter="handleUnshift"
    />
    <button @click="handleCheckPerson">验证名字中是否存在'张'</button>
    <ol>
      <li v-for="(item, index) in personList" :key="index">{{ item }}</li>
    </ol>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "person",
  data() {
    return {
      newPerson: "",
    };
  },
  computed: {
    ...mapGetters("person", ["personList"]),
  },
  methods: {
    ...mapMutations("person", { addPerson: "ADD_PERSON" }),
    ...mapActions("person", ["addZhangPerson"]),
    handleUnshift() {
      if (!this.newPerson) return;

      this.addPerson(this.newPerson);
      this.newPerson = "";
    },
    handleCheckPerson() {
      if (!this.newPerson) return;

      this.addZhangPerson(this.newPerson);
      this.newPerson = "";
    },
  },
};
</script>

<style>
</style>