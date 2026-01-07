<script setup lang="ts">
interface IUserMenuItem {
    children: Array<IUserMenuItem>;
    menuType: number;
    _id: string;
    path: string;
    icon: string;
    menuName: string;
}

const props = defineProps({
    userMenu: {
        type: Array<IUserMenuItem>,
        default: () => []
    }
})
</script>

<template>
    <template v-for="menu in userMenu">
        <el-sub-menu v-if="
            menu.children &&
            menu.children.length > 0 &&
            menu.children[0].menuType == 1
        " :key="menu._id" :index="menu.path">
            <template #title>
                <!-- <i :class="menu.icon.split('-')?.at(-1)"></i> -->
                <!-- 更改为element-plus/icons-vue图标 -->
                <el-icon :size="16">
                    <component :is="menu.icon.split('-')?.at(-1)?.toLowerCase()"></component>
                </el-icon>
                <span>{{ menu.menuName }}</span>
            </template>
            <tree-menu :userMenu="menu.children"></tree-menu>
        </el-sub-menu>
        <el-menu-item v-else-if="menu.menuType == 1" :index="menu?.path ?? '/path'">{{ menu.menuName }}</el-menu-item>
    </template>
</template>

<style></style>