var Example = Example || {};

/**
 * @desc JavaScript Boolean 布尔对象
 * Boolean 布尔对象用于将非布尔值转化为布尔值(true或false)
 * 
 * 一、创建Boolean对象
 * Boolean对象代表两个值"true"或者"false"
 * 示例: 
 * var myBoolean = new Boolean();
 * 注意: 如果布尔对象五初始值或其值为0,-0,null,...,false,undefined,NaN,那么该对象的值为false,
 * 否则其值为true。
 */
Example.Boolean = function() {
    console.log("------ Amumu  Boolean -------");
}

if(typeof module !== "undefined"){
    module.export = Example[Object.keys(Example)[0]];
}