<script setup>
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import { getTableData, getCountData, getChartData } from '@/api/api';

const getImageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};

const tableData = ref([]);
const countData = ref([]);
const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
});

// 图表容器引用
const echartRef = ref(null);
const userEchartRef = ref(null);
const videoEchartRef = ref(null);

// 图表实例引用
const chartInstances = ref([]);

// ResizeObserver 实例
const resizeObserver = ref(null);

// 深拷贝工具函数
const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
};

// 这个是折线图和柱状图两个图表共用的公共配置
const baseXOptions = reactive({
    // 图例文字颜色
    textStyle: {
        color: "#333",
    },
    legend: {},
    grid: {
        left: "20%",
    },
    // 提示框
    tooltip: {
        trigger: "axis",
    },
    xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
            lineStyle: {
                color: "#17b3a3",
            },
        },
        axisLabel: {
            interval: 0,
            color: "#333",
        },
    },
    yAxis: [
        {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#17b3a3",
                },
            },
        },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
});

const pieOptions = reactive({
    tooltip: {
        trigger: "item",
    },
    legend: {},
    color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],
    series: [],
});

// 初始化图表
const initChart = (domElement, options) => {
    if (!domElement) return null;
    
    try {
        const chartInstance = echarts.init(domElement);
        chartInstance.setOption(options);
        chartInstances.value.push(chartInstance);
        return chartInstance;
    } catch (error) {
        console.error('图表初始化失败:', error);
        return null;
    }
};

// 渲染订单数据图表
const renderOrderChart = (orderData) => {
    const orderChartOptions = deepClone(baseXOptions);
    orderChartOptions.xAxis.data = orderData.date;
    orderChartOptions.series = Object.keys(orderData.data[0]).map(val => ({
        name: val,
        data: orderData.data.map(item => item[val]),
        type: 'line',
    }));
    return initChart(echartRef.value, orderChartOptions);
};

// 渲染用户数据图表
const renderUserChart = (userData) => {
    const userChartOptions = deepClone(baseXOptions);
    userChartOptions.xAxis.data = userData.map(item => item.date);
    userChartOptions.series = [
        {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar',
        },
        {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar',
        },
    ];
    return initChart(userEchartRef.value, userChartOptions);
};

// 渲染视频数据图表
const renderVideoChart = (videoData) => {
    const videoChartOptions = deepClone(pieOptions);
    videoChartOptions.series = [
        {
            data: videoData,
            type: 'pie',
        },
    ];
    return initChart(videoEchartRef.value, videoChartOptions);
};

// 监听图表大小变化
const setupResizeObserver = () => {
    // 清理旧的观察者
    if (resizeObserver.value) {
        resizeObserver.value.disconnect();
    }

    // 创建新的观察者
    resizeObserver.value = new ResizeObserver(() => {
        chartInstances.value.forEach(instance => {
            instance.resize();
        });
    });

    // 观察所有图表容器
    [echartRef.value, userEchartRef.value, videoEchartRef.value].forEach(ref => {
        if (ref) {
            resizeObserver.value.observe(ref);
        }
    });
};

// 清理图表资源
const cleanUpCharts = () => {
    // 清理图表实例
    chartInstances.value.forEach(instance => {
        instance.dispose();
    });
    chartInstances.value = [];

    // 清理观察者
    if (resizeObserver.value) {
        resizeObserver.value.disconnect();
        resizeObserver.value = null;
    }
};

const fetchTableData = async () => {
    try {
        const data = await getTableData();
        tableData.value = data.tableData;
    } catch (error) {
        console.error('获取表格数据失败:', error);
    }
};

const fetchCountData = async () => {
    try {
        const data = await getCountData();
        countData.value = data;
    } catch (error) {
        console.error('获取统计数据失败:', error);
    }
};

const fetchChartData = async () => {
    try {
        // 清理旧的图表资源
        cleanUpCharts();

        const { orderData, userData, videoData } = await getChartData();

        // 渲染各个图表
        renderOrderChart(orderData);
        renderUserChart(userData);
        renderVideoChart(videoData);
        // 设置大小变化监听
        setupResizeObserver();
    } catch (error) {
        console.error('获取图表数据或渲染失败:', error);
    }
};

onMounted(() => {
    fetchTableData();
    fetchCountData();
    fetchChartData();
});

// 组件卸载前清理资源
onBeforeUnmount(() => {
    cleanUpCharts();
});
</script>

<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:20px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="getImageUrl('user')" class="user" />
                    <div class="user-info">
                        <p class="user-info-admin">Admin</p>
                        <p class="user-info-p">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间:<span>2024-06-30</span></p>
                    <p>上次登录地点:<span>北京</span></p>
                </div>
            </el-card>

            <el-card shadow="hover" class="user-table">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top:20px">
            <div class="num">
                <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name">
                    <component :is="item.icon" class="icons" :style="{ background: item.color }"></component>
                    <div class="detail">
                        <p class="num">￥{{ item.value }}</p>
                        <p class="txt">￥{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card class="top-echart">
                <div ref="echartRef" class="echart" style="height:280px"></div>
            </el-card>

            <div class="graph">
                <el-card>
                    <div ref="userEchartRef" class="userEchart" style="height:240px; overflow: hidden;"></div>
                </el-card>
                <el-card>
                    <div ref="videoEchartRef" class="videoEchart" style="height:240px; overflow: hidden;"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<style scoped lang="less">
.home {
    height: 100%;
    overflow: hidden;

    .user {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;

        }

        .user-info {
            p {
                line-height: 40px;
            }

            .user-info-p {
                color: #999;
            }

            .user-info-admin {
                font-size: 35px
            }
        }
    }

    .login-info {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999;

            span {
                color: #666;
                margin-left: 60px;
            }
        }
    }

    .user-table {
        margin-top: 20px;
    }

    .num {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 20px;
        }

        .icons {
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }

        .detail {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .num {
                font-size: 30px;
                margin-bottom: 10px
            }

            .txt {
                font-size: 15px;
                text-align: center;
                color: #999;
            }
        }
    }

    .graph {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .el-card {
            width: 48%;
            height: 260px;

            :deep(.el-card__body) {
                overflow: hidden;
            }
        }
    }
}
</style>
