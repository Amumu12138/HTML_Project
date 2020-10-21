var test = window.test || {};

/**
 * @desc 设置cookie
 * @param {String} name 
 * @param {String} value 
 * @param {number} day 
 */
test.setCookie = function (name, value, day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires=' + date;
}

/**
 * @desc 获取cookie
 * @param {String} name 
 */
test.getCookie = function (name) {
    var reg = RegExp(name + '=([^;]+)');
    var arr = document.cookie.match(reg);
    if (arr) {
        return arr[1];
    } else {
        return '';
    }
}

/**
 * @desc 删除cookie
 * @param {*} name 
 */
test.delCookoe = function (name) {
    setCookie(name, null, -1);
}

window.TEST = test;