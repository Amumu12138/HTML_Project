/**
 * 请求地址： http://wthrcdn.etouch.cn/weather_mini
 * 请求方法： get
 * 请求参数： city(城市名；字符串类型)
 * 响应内容： 天气信息
 */

// //功能实现： 回车查询、点击查询
const BASE_URL = "http://wthrcdn.etouch.cn/weather_mini?city=";
var weatherApp = new Vue({
    el: "#app",
    data: {
        city: "",
        weatherList: []
    },
    methods: {
        //查询天气
        reachWeather: function(){
            axios.get(BASE_URL + this.city).then((retData) => {
                console.log("reachWeather retData = ", retData);
                this.weatherList = retData.data.data.forecast;
            }, (error)=> {
                console.log("reachWeather error = ", error);
            }).catch((err) => {
                console.error();("reachWeather catch err = ", err);
            });
        },
        //获取城市
        getCity: function(value) {
            this.city = value;
            this.reachWeather();
        }
    }
});