import { NAMESPACE } from "@/config/constants"

// localstorage的二次封装
export default {
    // 获取storage对象
    getStorage() {
        return JSON.parse(localStorage.getItem(NAMESPACE) || '{}');
    },
    // 设置storage对象键值,并存放在本地localstorage中
    setItem(key: string, value: unknown) {
        const storage = this.getStorage();
        storage[key] = value;
        localStorage.setItem(NAMESPACE, JSON.stringify(storage));
    },
    // 根据key键获取存放在本地localstorage中的值
    getItem(key: string) {
        return this.getStorage()[key] ?? {};
    },
    // 清空storage中key键的数据
    clearItem(key: string) {
        const storage = this.getStorage();
        delete storage[key];
        localStorage.setItem(NAMESPACE, JSON.stringify(storage));
    },
    // 清空本地localStorage中全部数据
    cleatAll() {
        localStorage.clear();
    }
}