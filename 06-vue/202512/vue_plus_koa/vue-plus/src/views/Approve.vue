<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" ref="form">
        <el-form-item label="审批状态" prop="state">
          <el-select v-model="queryForm.applyState">
            <el-option value="" label="全部"></el-option>
            <el-option :value="1" label="待审批"></el-option>
            <el-option :value="2" label="审批中"></el-option>
            <el-option :value="3" label="审批拒绝"></el-option>
            <el-option :value="4" label="审批通过"></el-option>
            <el-option :value="5" label="作废"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getApplyList">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <el-table :data="applyList" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
          :width="item.width" :formatter="item.formatter" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleDetail(scope.row)" v-if="
              scope.row.curAuditUserName == userInfo.userName &&
              [1, 2].includes(scope.row.applyState)
            ">审核</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" class="pagination" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog title="审核" width="50%" v-model="showDetailModal">
      <el-form label-width="120px" label-suffix=":" :model="auditForm" ref="dialogForm" :rules="rules">
        <el-form-item label="申请人">
          <div>
            {{ detail.applyUser.userName }}
          </div>
        </el-form-item>
        <el-form-item label="休假类型">
          <div>
            {{ detail.applyTypeName }}
          </div>
        </el-form-item>
        <el-form-item label="休假时间">
          <div>
            {{ detail.time }}
          </div>
        </el-form-item>
        <el-form-item label="休假时长">
          <div>
            {{ detail.leaveTime }}
          </div>
        </el-form-item>
        <el-form-item label="休假原因">
          <div>
            {{ detail.reasons }}
          </div>
        </el-form-item>
        <el-form-item label="审批状态">
          <div>
            {{ detail.applyStateName }}
          </div>
        </el-form-item>
        <el-form-item label="审批人">
          <div>
            {{ detail.curAuditUserName }}
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :rows="3" placeholder="请输入审核备注" v-model="auditForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleApprove('pass')">审核通过</el-button>
          <el-button type="primary" @click="handleApprove('refuse')">驳回</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, onMounted, getCurrentInstance, ref } from "vue";
import utils from "@/utils/utils";
import { getApplyList } from '@/api'

export default {
  name: "User",
  setup() {
    const { proxy } = getCurrentInstance();
    // 查询条件
    const queryForm = reactive({
      applyState: 1,
    });
    // 验证规则
    const rules = reactive({
      remark: [
        {
          required: true,
          message: "请输入审核备注",
          trigger: ["change", "blur"],
        },
      ],
    });
    // 生命周期函数
    onMounted(_getApplyList);
    // 表格列表
    const columns = reactive([
      {
        label: "单号",
        prop: "orderNo",
      },
      {
        label: "申请人",
        prop: "applyUser",
        formatter(row) {
          return row.applyUser.userName;
        },
      },
      {
        label: "休假时间",
        prop: "",
        formatter(row) {
          return (
            utils.formateDate(new Date(row.startTime), "yyyy-MM-dd") +
            "到" +
            utils.formateDate(new Date(row.endTime), "yyyy-MM-dd")
          );
        },
      },
      {
        label: "休假时长",
        prop: "leaveTime",
      },
      {
        label: "休假类型",
        prop: "applyType",
        formatter(row, column, value) {
          return {
            1: "事假",
            2: "调休",
            3: "年假",
          }[value];
        },
      },
      {
        label: "休假原因",
        prop: "reasons",
      },
      {
        label: "申请时间",
        prop: "createTime",
        formatter(row, column, value) {
          return utils.formateDate(new Date(value));
        },
      },
      {
        label: "审批人",
        prop: "auditUsers",
      },
      {
        label: "当前审批人",
        prop: "curAuditUserName",
      },
      {
        label: "审批状态",
        prop: "applyState",
        formatter(row, column, value) {
          return {
            1: "待审批",
            2: "审批中",
            3: "审批拒绝",
            4: "审批通过",
            5: "作废",
          }[value];
        },
      },
    ]);
    // 分页参数
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 10,
    });
    // 申请列表
    const applyList = ref([]);
    // 重置表单
    const handleReset = (form) => {
      proxy.$refs[form].resetFields();
    };
    // 分页点击
    const handleCurrentChange = (current) => {
      pager.pageNum = current;
      getUserlist();
    };

    const _getApplyList = async () => {
      let params = { ...queryForm, ...pager, type: "approve" };
      console.log(1234);
      let { list, page } = await getApplyList(params);
      applyList.value = list;
      pager.total = page.total;
    };
    const handleClose = () => {
      showDetailModal.value = false;
      handleReset("dialogForm");
    };
    const handleApprove = (action) => {
      proxy.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          try {
            let params = {
              action,
              remark: auditForm.remark,
              _id: detail.value._id,
            };
            await proxy.$api.leaveApprove(params);
            proxy.$message.success("处理成功");
            handleClose();
            _getApplyList();
            await proxy.$store.dispatch("noticeCountGet")

          } catch (error) { }
        }
      });
    };
    const showDetailModal = ref(false);
    let detail = ref({});
    const handleDetail = (row) => {
      // showDetailModal.value = true;
      let data = { ...row };
      data.applyTypeName = {
        1: "事假",
        2: "调休",
        3: "年假",
      }[data.applyType];
      data.time =
        utils.formateDate(new Date(data.startTime), "yyyy-MM-dd") +
        "到" +
        utils.formateDate(new Date(data.endTime), "yyyy-MM-dd");

      data.applyStateName = {
        1: "待审批",
        2: "审批中",
        3: "审批拒绝",
        4: "审批通过",
        5: "作废",
      }[data.applyState];
      detail.value = data;
      showDetailModal.value = true;
    };
    const userInfo = proxy.$store.state.userInfo;
    const auditForm = reactive({
      remark: "",
    });
    return {
      handleReset,
      handleCurrentChange,
      queryForm,
      columns,
      applyList,
      handleClose,
      rules,
      showDetailModal,
      detail,
      handleDetail,
      getApplyList: _getApplyList,
      userInfo,
      auditForm,
      handleApprove,
    };
  },
};
</script>

<style lang="scss"></style>