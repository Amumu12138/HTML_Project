<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" :model="user" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select v-model="user.state">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
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
        <el-button type="primary" @click="handleCreate" v-has="'user-add'">新增</el-button>
        <el-button type="danger" @click="handlePatchDelete" v-has="'user-patch-delete'">批量删除</el-button>
      </div>
      <el-table :data="userList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
          :width="item.width" :formatter="item.formatter" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)" v-has="'user-edit'">编辑</el-button>
            <el-button type="danger" size="small" @click="handelDelete(scope.row)" v-has="'user-delete'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :total="pager.total" class="pagination"
        :page-size="pager.pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog :title="action === 'add' ? '用户新增' : '编辑用户'" v-model="showModal" :before-close="handleCloseDialog">
      <el-form :model="userForm" label-width="120px" ref="dialogForm" :rules="rules">
        <el-form-item prop="userName" label="用户名">
          <el-input placeholder="请输入用户名称" v-model="userForm.userName" :disabled="action == 'edit'" />
        </el-form-item>
        <el-form-item prop="userEmail" label="邮箱">
          <el-input placeholder="请输入用户邮箱" v-model="userForm.userEmail" :disabled="action == 'edit'">
            <template #append> @jason.com </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号">
          <el-input placeholder="请输入手机号" v-model="userForm.mobile" />
        </el-form-item>
        <el-form-item prop="job" label="岗位">
          <el-input placeholder="请输入岗位" v-model="userForm.job" />
        </el-form-item>
        <el-form-item prop="state" label="状态">
          <el-select v-model="userForm.state">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="roleList" label="系统角色">
          <el-select v-model="userForm.roleList" placeholder="请选择用户角色" multiple style="width: 100%">
            <el-option v-for="role in roleList" :key="role._id" :label="role.roleName" :value="role._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="deptId" label="部门">
          <el-cascader v-model="userForm.deptId" placeholder="请选择所属部门" :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }" clearable />
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
import { reactive, onMounted, getCurrentInstance, ref, toRaw } from "vue";
import utils from "@/utils/utils";
import { getUserList, getDeptList, getRoleList, userDelete, userSubmit } from '@/api'
export default {
  name: "User",
  setup() {
    const { proxy } = getCurrentInstance();
    const user = reactive({
      state: 0,
    });
    const userList = ref([]);
    const columns = reactive([
      {
        label: "用户ID",
        prop: "userId",
      },
      {
        label: "用户名",
        prop: "userName",
      },
      {
        label: "用户邮箱",
        prop: "userEmail",
      },
      {
        label: "用户角色",
        prop: "role",
        formatter(row, column, value) {
          return {
            0: "管理员",
            1: "普通用户",
          }[value];
        },
      },
      {
        label: "用户状态",
        prop: "state",
        formatter(row, column, value) {
          return {
            1: "在职",
            2: "离职",
            3: "试用期",
          }[value];
        },
      },
      {
        label: "注册时间",
        prop: "createTime",
        formatter(row, column, value) {
          return utils.formateDate(new Date(value));
        },
      },
      {
        label: "最后登录时间",
        prop: "lastLoginTime",
        formatter(row, column, value) {
          console.log(value);
          return utils.formateDate(new Date(value));
        },
      },
    ]);
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 10,
    });
    const checkedUserIds = ref([]);

    const _getUserlist = async () => {
      let params = { ...user, ...pager };
      try {
        const { page, list } = await getUserList(params);
        // list.forEach((item) => {
        //   userList.push(item);
        // });
        userList.value = list;
        pager.total = page.total;
      } catch (error) { }
    };
    onMounted(() => {
      Promise.all([_getUserlist(), _getDeptList(), getRoleList()])
    });

    const handleQuery = () => {
      _getUserlist();
    };
    const handleReset = (form) => {
      proxy.$refs[form].resetFields();
    };
    const handleCurrentChange = (current) => {
      pager.pageNum = current;
      _getUserlist();
    };
    const handelDelete = async (row) => {
      const res = await userDelete({
        userIds: [row.userId],
      });

      if (res.modifiedCount > 0) {
        proxy.$message.success("删除成功");
        _getUserlist();
      } else {
        proxy.$message.error("删除失败");
      }
    };
    const handlePatchDelete = async () => {
      if (checkedUserIds.value.length == 0) {
        proxy.$message.error("请选择要删除的用户");
        return;
      }
      const res = await userDelete({
        userIds: checkedUserIds.value,
      });
      if (res.modifiedCount > 0) {
        proxy.$message.success("删除成功");
        _getUserlist();
      } else {
        proxy.$message.error("删除失败");
      }
    };
    const handleSelectionChange = (list) => {
      let arr = [];
      list.map((item) => {
        arr.push(item.userId);
      });
      checkedUserIds.value = arr;
    };
    const showModal = ref(false);
    const handleCreate = () => {
      action.value = "add";
      showModal.value = true;
    };
    const rules = reactive({
      userName: [
        {
          required: true,
          message: "请输入用户名称",
          trigger: "blur",
        },
      ],
      userEmail: [
        {
          required: true,
          message: "请输入邮箱",
          trigger: "blur",
        },
      ],
      deptId: [
        {
          required: true,
          message: "请选择部门",
          trigger: "blur",
        },
      ],
      mobile: [
        {
          pattern: /1[3-9]\d{9}/,
          message: "请输入正确的手机号格式",
          trigger: "blur",
        },
      ],
    });
    const userForm = reactive({
      state: 1,
    });
    const roleList = ref([]);
    const _getRoleList = async () => {
      const list = await getRoleList();
      roleList.value = list;
    };
    const deptList = ref([]);
    const _getDeptList = async () => {
      const list = await getDeptList();
      deptList.value = list;
    };
    const handleClose = () => {
      showModal.value = false;
      handleReset("dialogForm");
    };
    const action = ref("add");
    const handleSubmit = () => {
      proxy.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let params = toRaw(userForm);
          params.userEmail += "@jason.com";
          params.action = action.value;
          let res = await userSubmit(params);
          if (res) {
            showModal.value = false;
            proxy.$message.success("新增用户成功");
            handleReset("dialogForm");
            _getUserlist();
          }
        }
      });
    };
    const handleEdit = (row) => {
      action.value = "edit";
      showModal.value = true;
      proxy.$nextTick(() => {
        row.state = Number(row.state);
        Object.assign(userForm, row);
      });
    };
    const handleCloseDialog = () => {
      showModal.value = false
      handleReset("dialogForm");
    };
    return {
      user,
      userList,
      columns,
      pager,
      handleQuery,
      handleReset,
      getUserlist: _getUserlist,
      handleCurrentChange,
      handelDelete,
      // totalNum,
      handlePatchDelete,
      checkedUserIds,
      handleSelectionChange,
      handleCreate,
      showModal,
      userForm,
      rules,
      getRoleList: _getRoleList,
      getDeptList: _getDeptList,
      roleList,
      deptList,
      handleClose,
      handleSubmit,
      handleEdit,
      action,
      handleCloseDialog,
    };
  },
};
</script>

<style lang="scss"></style>