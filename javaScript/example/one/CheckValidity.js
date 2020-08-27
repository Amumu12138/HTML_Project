var Example = Example || {};

/**
 * @desc JavaScript 验证API
 * 一、约束验证DOM方法
 * 方法                             描述
 * checkValidity()            如果input元素中的数据是合法的返回true,否则返回false
 * setCustomValidity()        设置input元素的vaildationMessage属性,用于自定义错误提示信息的方法
 *                            使用setCustiomValidity设置了自定义提示后,validity.customError就会
 *                            变成true,则checkValidity总是会返回false,如果非要重新判断需要取消
 *                            自定义提示，例如:setCustomValidity('')、setCustomValidity(null)、
 *                            setCustomValidity(undefined)            
 * 二、约束验证DOM属性
 * 属性                             描述
 * validity                     布尔属性值,返回input输入值是否合法
 * validationMessage            浏览器错误提示信息
 * willValidate                 指定input是否需要验证
 * 
 * 三、Validity属性
 * input元素的validity睡醒包含一系列关于validity数据属性
 * 属性                             描述
 * customError                  设置为true,如果设置了自定义的validity信息
 * patternMismatch              设置为true,如果元素的值不匹配他的模式属性
 * rangeOverflow                设置为true,如果元素的值大于设置的最大值
 * rangeUnderflow               设置为true,如果元素的值小于它的最小值
 * stepMismatch                 设置为true,如果元素的值不是按按照规定的step属性设置
 * tooLong                      设置为true,如果元素的值超过了maxLength属性设置的长度
 * typeMismatch                 设置为true,如果元素的值不是预期相匹配的类型
 * valueMissing                 设置为true,如果元素没有值      
 * valid                        设置为true,如果元素的值是合法的
 */
Example.CheckValidity = function () {
    //	您只能在 HTML 输出中使用 document.write。如果您在文档加载后使用该方法，会覆盖整个文档。
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}