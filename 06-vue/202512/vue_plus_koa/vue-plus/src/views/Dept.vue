<template>
  <div class="dept-manage">
    <div class="query-form">
      <el-form :inline="true" ref="queryForm" :model="queryForm">
        <el-form-item label="部门名称" prop="deptName">
          <el-input placeholder="请输入部门名称" v-model="queryForm.deptName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDeptList" type="primary">查询</el-button>
          <el-button @click="handleReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleOpen">创建</el-button>
      </div>
      <el-table :data="deptList" row-key="_id" :tree-props="{ children: 'children' }" stripe>
        <el-table-column v-for="item in columns" :key="item.prop" v-bind="item"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDel(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="action == 'create' ? '创建部门' : '编辑部门'" v-model="showModel">
      <el-form ref="dialogForm" :model="deptForm" :rules="rules" label-width="120px">
        <el-form-item label="上级部门" prop="parentId">
          <el-cascader placeholder="请选择上级部门" v-model="deptForm.parentId"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }" clearable :options="deptList"
            :show-all-levels="true">
          </el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input placeholder="请输入部门的名称" v-model="deptForm.deptName"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="userName">
          <el-select placeholder="请选择部门负责人" v-model="deptForm.userName" @change="handleUser">
            <el-option v-for="item in userList" :key="item.userId" :label="item.userName"
              :value="`${item.userId}/${item.userName}/${item.userEmail}`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="deptForm.userEmail" disabled></el-input>
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
import { getDeptList, deptOperate, userAllList, deptOperate } from '@/api'

export default {
  name: "dept",
  data() {
    return {
      queryForm: {
        deptName: "",
      },
      columns: [
        {
          label: "部门名称",
          prop: "deptName",
        },
        {
          label: "负责人",
          prop: "userName",
        },
        {
          label: "更新时间",
          prop: "updateTime",
        },
        {
          label: "创建时间",
          prop: "createTime",
        },
      ],
      deptList: [],

      userList: [],
      action: "",
      showModel: false,
      userList: [],
      deptForm: {
        parentId: [null],
      },
      rules: {
        parentId: [
          {
            required: true,
            message: "请选择上级部门",
            trigger: "blur",
          },
        ],
        deptName: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "blur",
          },
        ],
        userName: [
          {
            required: true,
            message: "请选择负责人",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this._getDeptList();
    this.getAllUserList();
  },
  methods: {
    async _getDeptList() {
      let list = await getDeptList(this.queryForm);
      this.deptList = list;
    },
    handleReset(form) {
      this.$refs[form].resetFields();
    },

    handleEdit(row) {
      this.showModel = true;
      this.action = "edit";
      this.$nextTick(() => {
        Object.assign(this.deptForm, row, {
          userName: `${row.userId}/${row.userName}/${row.userEmail}`,
        });
      });
    },
    handleOpen() {
      this.showModel = true;
      this.action = "create";
    },
    handleClose() {
      this.showModel = false;
      this.handleReset("dialogForm");
    },
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let params = { ...this.deptForm, action: this.action };
          delete params.userEmail;

          let res = await deptOperate(params);
          if (res) {
            this.showModel = false;
            this.$message.success("操作成功");
            this.handleClose();
            this._getDeptList();
          }
        }
      });
    },
    async getAllUserList() {
      this.userList = await userAllList();
    },
    handleUser(val) {
      const [userId, userName, userEmail] = val.split("/");
      Object.assign(this.deptForm, { userId, userName, userEmail });
    },
    async handleDel(_id) {
      this.action = "delete";
      await deptOperate({ action: this.action, _id });
      this.$message.success("删除成功");
      this._getDeptList();
    },
  },
};
</script>
