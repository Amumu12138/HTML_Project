/**
 * 1、歌曲搜索接口
 * 请求地址；https://autumnfish.cn/search
 * 请求方法：get
 * 请求参数：keywords(查询关键字：字符串类型)
 * 响应内容：歌曲搜索结果
 * 
 * 2、歌曲url获取
 * 请求地址：https://autumnfish.cn/song/url
 * 请求方法：get
 * 请求参数：id(歌曲id: number类型)
 * 响应内容：歌曲的url地址
 * 
 * 3、歌曲详情获取
 * 请求地址：https://autumnfish.cn/song/detail
 * 请求方法：get
 * 请求参数：ids(歌曲id: number类型)
 * 响应内容：歌曲详情(包括封面信息)
 * 
 * 4、歌曲评论获取
 * 请求地址：https://autumnfish.cn/comment/hot?type=0
 * 请求方法：get
 * 请求参数：id(歌曲id,type固定为0)
 * 响应内容：歌曲的热门评论
 * 
 * 5、mv地址获取
 * 请求地址；https://autumnfish.cn/mv/url
 * 请求方法：get
 * 请求参数: id(mvid,为0表示没有mv)
 * 响应内容：mv的地址
 */
//功能实现：音乐查询、音乐播放、歌曲封面、歌曲评论、播放动画、播放MV
var musicPlayer = new Vue({
    el: "#app",
    data: {

    },
    methods: {

    }

});