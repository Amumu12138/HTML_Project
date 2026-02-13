/**
 * 定义: 元组就是定长的数组
 * 原理: 元组的存储效率比较好,因为元组是固定的,不会出现扩容现象,
 * 使用场景: 数组数量固定的情况
 * 语法: let h: [string, string]
 */

let area: [number, number]
area = [5, 5]
area = [0] // 提示不能将类型“[number]”分配给类型“[number, number]”。源具有 1 个元素，但目标需要 2 个
area = ['1', '2'] // 提示不能将类型“string”分配给类型“number”