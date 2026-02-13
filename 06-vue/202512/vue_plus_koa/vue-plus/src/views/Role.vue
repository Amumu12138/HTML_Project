<template>
  <div class="role-manage">
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" ref="form">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd">创建</el-button>
      </div>
      <el-table :data="roleList" style="width: 100%" row-key="_id">
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
          :width="item.width" :formatter="item.formatter" />
        <el-table-column label="操作" width="280">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="primary" @click="handlePermission(scope.row)">设置权限</el-button>
            <el-button type="danger" size="small" @click="handelDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="pager.total" class="pagination"
        :page-size="pager.pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog title="角色新增" v-model="showModal" :before-close="handleCloseDialog">
      <el-form :model="roleForm" label-width="120px" ref="dialogForm" :rules="rules">
        <el-form-item prop="roleName" label="角色名称">
          <el-input placeholder="请输入角色名称" v-model="roleForm.roleName" />
        </el-form-item>
        <el-form-item prop="remark" label="备注">
          <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="roleForm.remark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="设置权限" v-model="showPermission" :before-close="handlePermissionClose">
      <el-form label-width="120px">
        <el-form-item prop="roleName" label="角色名称">
          {{ curRoleName }}
        </el-form-item>
        <el-form-item prop="remark" label="选择权限">
          <el-tree :data="menuList" show-checkbox node-key="_id" :props="{ label: 'menuName' }" default-expand-all
            ref="permissionTree" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handlePermissionClose">取消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import utils from "@/utils/utils";

export default {
  name: "role",
  data() {
    return {
      queryForm: {
        roleName: "",
      },
      columns: [
        {
          label: "角色名称",
          prop: "roleName",
          width: 180,
        },
        {
          label: "备注",
          prop: "remark",
        },
        {
          label: "权限列表",
          prop: "permissionList",
          formatter: (_, __, value) => {
            let names = [];
            let list = value.halfCheckedKeys || [];
            console.log(this.actionMap, 'actionMap')
            list.map((key) => {
              let name = this.actionMap[key];
              if (key && name) names.push(name);
            });
            return names.join(",");
          },
        },
        {
          label: "创建时间", // 按钮权限的标识
          prop: "createTime",
          formatter(_, __, value) {
            return utils.formateDate(new Date(value));
          },
          width: 180,
        },
        {
          label: "更新时间", // 按钮权限的标识
          prop: "updateTime",
          formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          },
          width: 180,
        },
      ],
      roleList: [],
      pager: {
        total: 0,
        pageSize: 10,
      },
      showModal: false,
      roleForm: {},
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
        ],
      },
      action: "",
      showPermission: false,
      curRoleName: "",
      curRoleId: "",
      menuList: [],
      actionMap: {},
    };
  },
  mounted() {
    this.getRoleList();
    this.getMenuList();
  },
  methods: {
    async getRoleList() {
      const { list, page } = await this.$api.roleList({
        ...this.pager,
        ...this.queryForm,
      });
      this.roleList = list;
      this.pager.total = page.total;
    },
    async handelDelete(_id) {
      await this.$api.roleOperate({ _id, action: "delete" });
      this.$message.success("删除成功");
      this.getRoleList();
    },
    handleAdd() {
      this.showModal = true;
      this.action = "create";
    },
    handleRoleQuery() { },
    // 表单重置
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    handleCloseDialog() {
      this.handleReset("dialogForm");
      this.showModal = false;
    },
    handleClose() {
      this.handleReset("dialogForm");
      this.showModal = false;
    },
    // 角色编辑
    handleEdit(row) {
      this.action = "edit";
      this.showModal = true;
      this.$nextTick(() => {
        this.roleForm = {
          _id: row._id,
          remark: row.remark,
          roleName: row.roleName,
        };
      });
    },
    // 角色删除
    async handleDel(_id) {
      await this.$api.roleOperate({ _id, action: "delete" });
      this.$message.success("删除成功");
      this.getRoleList();
    },
    // 角色提交
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { roleForm, action } = this;
          let params = { ...roleForm, action };
          let res = await this.$api.roleOperate(params);
          if (res) {
            this.showModal = false;
            this.$message.success("创建成功");
            this.handleReset("dialogForm");
            this.getRoleList();
          }
        }
      });
    },
    handleCurrentChange(current) {
      this.pager.pageNum = current;
      this.getRoleList();
    },
    handlePermissionClose() {
      this.showPermission = false;
    },
    handlePermission(row) {
      this.curRoleId = row._id;
      this.curRoleName = row.roleName;
      this.showPermission = true;
      // 第二步 设置节点
      const { checkedKeys } = row.permissionList;
      setTimeout(() => {
        this.$refs.permissionTree.setCheckedKeys(checkedKeys);
      });
    },
    async getMenuList() {
      const list = await this.$api.menuList();
      this.menuList = list;
      this.getActionMap(list);
    },
    async handlePermissionSubmit() {
      let nodes = this.$refs.permissionTree.getCheckedNodes();
      let halfKeys = this.$refs.permissionTree.getHalfCheckedKeys();
      let checkedKeys = [];
      let parentKeys = [];
      nodes.map((node) => {
        if (!node.children) {
          checkedKeys.push(node._id);
        } else {
          parentKeys.push(node._id);
        }
      });
      let params = {
        _id: this.curRoleId,
        permissionList: {
          checkedKeys,
          halfCheckedKeys: parentKeys.concat(halfKeys),
        },
      };
      await this.$api.updatePermission(params);
      this.showPermission = false;
      this.$message.success("设置成功");
      this.getRoleList();
    },
    getActionMap(list) {
      let actionMap = {};
      console.log(list, 'list')
      const deep = (arr) => {
        while (arr.length) {
          let item = arr.pop();
          if (item.children && item.action) {
            actionMap[item._id] = item.menuName;
          }
          if (item.children) {
            deep(item.children);
          }
        }
      };
      deep(JSON.parse(JSON.stringify(list)));
      console.log(actionMap, 'actionMap')
      this.actionMap = actionMap;
    },
  },
};
</script>

<style lang="scss"></style>