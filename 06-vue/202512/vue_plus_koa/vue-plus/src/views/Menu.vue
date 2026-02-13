<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" ref="form">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="queryForm.menuState">
            <el-option :value="1" label="正常"></el-option>
            <el-option :value="2" label="停用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd(1)">创建</el-button>
      </div>
      <el-table :data="menuList" style="width: 100%" row-key="_id">
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
          :width="item.width" :formatter="item.formatter" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleAdd(2, scope.row)">新增</el-button>
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handelDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="用户新增" v-model="showModal" :before-close="handleCloseDialog">
      <el-form :model="menuForm" label-width="120px" ref="dialogForm" :rules="rules">
        <el-form-item prop="parentId" label="父级菜单">
          <el-cascader v-model="menuForm.parentId" :options="menuList"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }" clearable />
          <span>不选则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item prop="menuType" label="菜单类型">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="menuName" label="菜单名称">
          <el-input placeholder="请输入菜单名称" v-model="menuForm.menuName" />
        </el-form-item>
        <el-form-item prop="icon" label="菜单图标" v-show="menuForm.menuType == 1">
          <el-input placeholder="请输入菜单图标" v-model="menuForm.icon" />
        </el-form-item>
        <el-form-item prop="path" label="路由地址" v-show="menuForm.menuType == 1">
          <el-input placeholder="请输入路由地址" v-model="menuForm.path" />
        </el-form-item>
        <el-form-item prop="menuCode" label="权限标识" v-show="menuForm.menuType == 2">
          <el-input placeholder="请输入权限标识" v-model="menuForm.menuCode" />
        </el-form-item>
        <el-form-item prop="component" label="组件路径" v-show="menuForm.menuType == 1">
          <el-input placeholder="请输入组件路径" v-model="menuForm.component" />
        </el-form-item>
        <el-form-item prop="menuState" label="菜单状态" v-show="menuForm.menuType == 1">
          <el-radio-group v-model="menuForm.menuState">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import utils from "@/utils/utils";
import { menuList } from '@/api'
export default {
  name: "Menu",
  data() {
    return {
      menuList: [],
      queryForm: {
        menuState: 1,
      },
      menuForm: {
        menuState: 1,
        menuType: 1,
        parentId: [null],
      },
      showModal: false,
      action: "add",
      columns: [
        {
          label: "菜单名称",
          prop: "menuName",
          width: 180,
        },
        {
          label: "图标",
          prop: "icon",
        },
        {
          label: "权限标识", // 按钮权限的标识
          prop: "menuCode",
        },
        {
          label: "路由地址", // 按钮权限的标识
          prop: "path",
        },
        {
          label: "组件路径", // 按钮权限的标识
          prop: "component",
        },
        {
          label: "菜单状态", // 按钮权限的标识
          prop: "menuState",
          formatter(row, column, value) {
            return {
              1: "正常",
              2: "停用",
            }[value];
          },
        },
        {
          label: "创建时间", // 按钮权限的标识
          prop: "createTime",
          formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          },
          width: 180,
        },
      ],
      rules: {
        menuName: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "长度在2-8个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    async getMenuList(menuForms = this.menuForms) {
      const res = await menuList(menuForms);
      this.menuList = res;
    },
    handleQuery() {
      this.getMenuList(this.queryForm);
    },
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    handleAdd(type, row) {
      this.showModal = true;
      this.action = "add";
      console.log(type);
      console.log(this.showModal);
      if (type == 2) {
        this.menuForm.parentId = [...row.parentId, row._id].filter(
          (item) => item
        );
      }
    },
    async handleDelete(_id) {
      await this.$api.menuSubmit({ _id, action: "delete" });
      this.$message.success("删除成功");
      this.getMenuList();
    },
    handleEdit(row) {
      this.showModal = true;
      this.action = "edit";
      this.$nextTick(() => {
        Object.assign(this.menuForm, row);
      });
      // this.menuForm = row;
    },
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { action, menuForm } = this;
          let params = { ...menuForm, action };
          let res = await this.$api.menuSubmit(params);
          this.showModal = false;
          this.$message.success("操作成功");
          this.handleReset("dialogForm");
          this.getMenuList();
        }
      });
    },
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
    },
    handleCloseDialog() {
      this.handleReset("dialogForm");
      this.showModal = false;
    },
    async handelDelete(_id) {
      await this.$api.menuSubmit({ _id, action: "delete" });
      this.$message.success("删除成功");
      this.getMenuList();
    },
  },
};
</script>

<style lang="scss"></style>