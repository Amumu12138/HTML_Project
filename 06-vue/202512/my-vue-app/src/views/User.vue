<!-- 用户管理 -->
<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getUserData, deleteUser, addUser, editUser } from '@/api/api';

const tableData = ref([]);
const _getUserData = async () => {
    let data = await getUserData(config);
    tableData.value = data.list.map(item => ({
        ...item,
        sexLabel: item.sex === 1 ? '男' : '女'
    }));
    console.log(tableData.value, data);
    config.total = data.count;
};

const tableLabel = reactive([
    {
        prop: 'name',
        label: '姓名'
    },
    {
        prop: 'age',
        label: '年龄'
    },
    {
        prop: 'sexLabel',
        label: '性别'
    },
    {
        prop: 'birth',
        label: '出生日期',
        width: 200
    },
    {
        prop: 'addr',
        label: '地址',
        width: 400
    },
]);
const formInline = reactive({
    keyWord: ''
});
const config = reactive({
    name: '',
    total: 0,
    page: 1
});

const handleSearch = () => {
    config.name = formInline.keyWord;
    _getUserData();
};

const handleClear = () => {
    config.name = '';
    _getUserData();
};
const handleChange = (page) => {
    config.page = page;
    _getUserData();
};
const handleDelete = ({ id }) => {
    ElMessageBox.confirm("你确定要删除吗?").then(async () => {
        await deleteUser({ id });
        ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success'
        });
        _getUserData();
    });
};
const action = ref('add');
const dialogVisible = ref(false);
const formUser = reactive({
    sex: 1
});
//表单校验规则
const rules = reactive({
    name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
    age: [
        { required: true, message: "年龄是必填项", trigger: "blur" },
        { type: "number", message: "年龄必须是数字" },
    ],
    sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
    birth: [{ required: true, message: "出生日期是必选项" }],
    addr: [{ required: true, message: '地址是必填项' }]
});

const userFormRef = ref();
const handleClose = () => {
    // 获取表单重置表单
    dialogVisible.value = false;
    userFormRef.value.resetFields();
};
const handleCancel = () => {
    dialogVisible.value = false;
    userFormRef.value.resetFields();
};

const handleAdd = () => {
    dialogVisible.value = true;
    action.value = 'add';
};

const timeFormat = (time) => {
    var time = new Date(time);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    function add(m) {
        return m < 10 ? "0" + m : m;
    }
    return year + "-" + add(month) + "-" + add(date);
};

const onSubmit = () => {
    // 先要校验
    userFormRef.value.validate(async (vaild) => {
        if (vaild) {
            let res = null;
            formUser.birth = /^\d{4}-\d{2}-\d{2}$/.test(formUser.birth) ? formUser.birth : timeFormat(formUser.birth);
            if (action.value === 'add') {
                res = await addUser(formUser);
            } else {
                res = await editUser(formUser);
            }
            if (res) {
                dialogVisible.value = false;
                userFormRef.value.resetFields();
                _getUserData();
            }
        } else {
            ElMessage({
                showClose: true,
                message: '请输入正确的内容',
                type: 'error'
            });

        }
    });
};

const handleEdit = (val) => {
    action.value = 'edit';
    dialogVisible.value = true;
    nextTick(() => {
        Object.assign(formUser, { ...val, sex: '' + val.sex });
    });
};

onMounted(_getUserData);
</script>

<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input placeholder="请输入用户名"
v-model.trim="formInline.keyWord"
clearable
                    @clear="handleClear"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="tableData" style="width: 100%" :border="true">
            <el-table-column v-for="item in tableLabel"
:key='item.prop'
:width="item.width ? item.width : 125"
                :prop="item.prop"
:label="item.label"
resizable />
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pager"
background
layout="total, prev, pager, next"
size="small"
:total="config.total"
            @current-change="handleChange" />
    </div>
    <el-dialog v-model="dialogVisible"
:title="action == 'add' ? '新增用户' : '编辑用户'"
width="35%"
        :before-close="handleClose">
        <!--需要注意的是设置了:inline="true"，
		会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
		在css进行处理-->
        <el-form ref="userFormRef" :inline="true" :model="formUser" :rules="rules">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formUser.name" placeholder="请输入姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item class="select-clearn" label="性别" prop="sex">
                        <el-select v-model="formUser.sex" placeholder="请选择">
                            <el-option label="男" :value="1" />
                            <el-option label="女" :value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出生日期" prop="birth">
                        <el-date-picker v-model="formUser.birth"
type="date"
placeholder="请输入"
format="YYYY-MM-DD"
                            style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="formUser.addr" placeholder="请输入地址" />
                </el-form-item>
            </el-row>
            <el-row style="justify-content: flex-end">
                <el-form-item>
                    <el-button type="primary" @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<style scoped lang="less">
.user-header {
    display: flex;
    justify-content: space-between;
}

.table {
    position: relative;
    height: calc(100% - 50px);
    width: 100%;

    .pager {
        position: absolute;
        right: 10px;
        bottom: 30px;
    }

    .el-table {
        width: 100%;
        height: 500px;
    }
}

.select-clearn {
    display: flex;
}
</style>
