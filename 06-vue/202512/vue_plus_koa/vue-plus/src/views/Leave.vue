<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" :model="queryForm" ref="form">
        <el-form-item label="审批状态" prop="applyState">
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
      <div class="action">
        <el-button type="primary" @click="handleApply">申请休假</el-button>
      </div>
      <el-table :data="applyList" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
          :width="item.width" :formatter="item.formatter" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleDetail(scope.row)">查看</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row._id)"
              v-if="[1, 2].includes(scope.row.applyState)">作废</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" class="pagination" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog title="申请休假" v-model="showModal" width="70%">
      <el-form ref="dialogForm" :model="leaveForm" label-width="120px" :rules="rules">
        <el-form-item label="休假类型" prop="applyType" required>
          <el-select v-model="leaveForm.applyType">
            <el-option label="事假" :value="1"></el-option>
            <el-option label="调休" :value="2"></el-option>
            <el-option label="年假" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="休假日期" required>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="startTime" required>
                <el-date-picker v-model="leaveForm.startTime" type="date" placeholder="选择开始日期"
                  @change="(val) => handleDateChange('startTime', val)" />
              </el-form-item>
            </el-col>
            <el-col :span="2"> - </el-col>
            <el-col :span="8">
              <el-form-item prop="endTime" required>
                <el-date-picker v-model="leaveForm.endTime" type="date" placeholder="选择结束日期"
                  @change="(val) => handleDateChange('endTime', val)" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="休假时长" required prop="leaveTime">
          {{ leaveForm.leaveTime }}
        </el-form-item>
        <el-form-item label="休假原因" required prop="reasons">
          <el-input type="textarea" :row="3" placeholder="请输入休假的原因" v-model="leaveForm.reasons">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="申请休假详情" width="50%" v-model="showDetailModal">
      <el-steps :active="detail.applyState > 2 ? 3 : 1" :process-status="detail.applyState == 2 ? 'finish' : 'process'"
        :finish-status="getstatus(detail.applyState)">
        <el-step title="待审批"></el-step>
        <el-step title="审批中"></el-step>
        <el-step title="审批通过/审批拒绝"></el-step>
      </el-steps>
      <el-form label-width="120px" label-suffix=":">
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
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  reactive,
  onMounted,
  getCurrentInstance,
  ref,
} from "vue";
import utils from "@/utils/utils";
import { leaveOperate } from '@/api'

export default {
  name: "User",
  setup() {
    const { proxy } = getCurrentInstance();
    // 查询条件
    const queryForm = reactive({
      applyState: "",
    });
    // 申请休假表单
    const leaveForm = reactive({
      applyType: 1,
      startTime: "",
      endTime: "",
      leaveTime: "0天",
      reasons: "",
    });
    // dialog显示
    const showModal = ref(false);
    // 操作标识
    const action = ref("create");
    // 验证规则
    const rules = reactive({
      startTime: [
        {
          type: "date",
          required: true,
          message: "请输入开始时间",
          trigger: "change",
        },
      ],
      endTime: [
        {
          type: "date",
          required: true,
          message: "请输入结束时间",
          trigger: "change",
        },
      ],
      reasons: [
        {
          required: true,
          message: "请输入休假原因",
          trigger: ["change", "blur"],
        },
      ],
    });
    // 生命周期函数
    onMounted(() => {
      getApplyList();
    });
    function getstatus(status) {
      switch (status) {
        case 4:
          return 'success'
        case 5:
          return 'error'
        case 3:
          return 'error'
        case 1:
          return 'finish'
        case 2:
          return 'success'
      }
    }
    // 表格列表
    const columns = reactive([
      {
        label: "单号",
        prop: "orderNo",
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
      let params = { ...queryForm, ...pager };
      let { list, page } = await getApplyList(params);
      applyList.value = list;
      pager.total = page.total;
    };

    const handleApply = async () => {
      showModal.value = true;
      action.value = "create";
    };
    const handleClose = () => {
      showModal.value = false;
      handleReset("dialogForm");
    };
    const handleSubmit = () => {
      proxy.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          try {
            let params = { ...leaveForm, action: action.value };
            let res = await leaveOperate(params);
            proxy.$message.success("创建成功");
            handleClose();
            getApplyList();
            await proxy.$store.dispatch("noticeCountGet")
          } catch (error) { }
        }
      });
    };
    const handleDateChange = (key, val) => {
      let { startTime, endTime } = leaveForm;
      if (!startTime || !endTime) return;
      if (startTime > endTime) {
        proxy.$message.error("开始日期不能晚于结束日期");
        leaveForm.leaveTime = "0天";
        setTimeout(() => {
          leaveForm[key] = "";
        }, 0);
      } else {
        leaveForm.leaveTime =
          (endTime - startTime) / (24 * 60 * 60 * 1000) + 1 + "天";
      }
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
    const handleDelete = async (_id) => {
      try {
        let params = { _id, action: "delete" };
        let res = await leaveOperate(params);
        proxy.$message.success("删除成功");
        getApplyList();
        await proxy.$store.dispatch("noticeCountGet")
      } catch (error) { }
    };
    return {
      handleReset,
      handleCurrentChange,
      queryForm,
      columns,
      applyList,
      leaveForm,
      showModal,
      handleApply,
      handleClose,
      handleSubmit,
      rules,
      handleDateChange,
      showDetailModal,
      detail,
      handleDetail,
      handleDelete,
      getstatus
    };
  },
};
</script>

<style lang="scss"></style>