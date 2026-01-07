package com.paojiao.sdk3.controller.pay;


import com.paojiao.sdk3.common.util.PayUtil;
import com.paojiao.sdk3.controller.thirdsdk.HttpAgent;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

/**
 * @Description
 * @Author zhouzhenyi
 * @Date 2020/11/10
 **/
public class Test {

    public static void main(String[] args) throws UnsupportedEncodingException {
String form ="    \n" +
        "    \n" +
        "\n" +
        "\n" +
        "<!DOCTYPE HTML>\n" +
        "<html>\n" +
        "<head>\n" +
        "    <meta charset=\"gb2312\" />\n" +
        "    <meta name=\"keywords\" content=\"\" />\n" +
        "    <meta name=\"description\" content=\"\" />\n" +
        "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n" +
        "    <title>支付宝 - 网上支付 安全快速！</title>\n" +
        "    <link rel=\"icon\" href=\"https://i.alipayobjects.com/common/favicon/favicon.ico\" type=\"image/x-icon\" />\n" +
        "    <link rel=\"shortcut icon\" href=\"https://i.alipayobjects.com/common/favicon/favicon.ico\" type=\"image/x-icon\" />\n" +
        "    <link href=\"https://a.alipayobjects.com\" rel=\"dns-prefetch\" />\n" +
        "<link href=\"https://app.alipay.com\" rel=\"dns-prefetch\" />\n" +
        "<link href=\"https://my.alipay.com\" rel=\"dns-prefetch\" />\n" +
        "<link href=\"https://lab.alipay.com\" rel=\"dns-prefetch\" />\n" +
        "<link href=\"https://cashier.alipay.com\" rel=\"dns-prefetch\" />\n" +
        "<link href=\"https://financeprod.alipay.com\" rel=\"dns-prefetch\" />\n" +
        "<link href=\"https://shenghuo.alipay.com\" rel=\"dns-prefetch\" />\n" +
        "\n" +
        "\n" +
        "<!-- uitpl:/component/trackerTime.vm -->\n" +
        "    <!-- FD:106:alipay/tracker/iconfont.vm:START --><style>\n" +
        "@font-face {\n" +
        "    font-family: \"rei\";\n" +
        "    src: url(\"https://i.alipayobjects.com/common/fonts/rei.eot?20150616\"); /* IE9 */\n" +
        "    src: url(\"https://i.alipayobjects.com/common/fonts/rei.eot?20150616#iefix\") format(\"embedded-opentype\"), /* IE6-IE8 */\n" +
        "    url(\"https://i.alipayobjects.com/common/fonts/rei.woff?20150616\") format(\"woff\"), /* chrome 6+、firefox 3.6+、Safari5.1+、Opera 11+ */\n" +
        "    url(\"https://i.alipayobjects.com/common/fonts/rei.ttf?20150616\")  format(\"truetype\"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */\n" +
        "    url(\"https://i.alipayobjects.com/common/fonts/rei.svg?20150616#rei\") format(\"svg\"); /* iOS 4.1- */\n" +
        "}\n" +
        ".iconfont {\n" +
        "    font-family:\"rei\";\n" +
        "    font-style: normal;\n" +
        "    font-weight: normal;\n" +
        "    cursor: default;\n" +
        "    -webkit-font-smoothing: antialiased;\n" +
        "}\n" +
        "</style>\n" +
        "<!-- FD:106:alipay/tracker/iconfont.vm:END -->\n" +
        "<script type=\"text/javascript\">\n" +
        "  window._to = { start: new Date() };\n" +
        "</script>\n" +
        "\n" +
        "<!-- FD:106:alipay/tracker/monitor.vm:START --><!-- FD:106:alipay/tracker/sai_seer.vm:START --><script type=\"text/javascript\">\n" +
        "\n" +
        "!function(n){function o(r){if(t[r])return t[r].exports;var i=t[r]={exports:{},id:r,loaded:!1};return n[r].call(i.exports,i,i.exports,o),i.loaded=!0,i.exports}var t={};return o.m=n,o.c=t,o.p=\"\",o(0)}([function(n,o){\"use strict\";window.Sai={log:function(){},error:function(){},lost:function(){},off:function(){},on:function(){},_DATAS:[],_EVENTS:[]}}]);\n" +
        "\n" +
        "</script>\n" +
        "<!-- FD:106:alipay/tracker/sai_seer.vm:END --><!-- FD:106:alipay/tracker/monitor.vm:END -->\n" +
        "<!-- FD:106:alipay/tracker/seajs.vm:START -->\n" +
        "\n" +
        "\n" +
        "<!-- monitor 防错代码 -->\n" +
        "<script>\n" +
        "(function(win){\n" +
        "  if(!win.monitor){win.monitor = {};}\n" +
        "\n" +
        "  var METHODS = [\"lost\", \"log\", \"error\", \"on\", \"off\"];\n" +
        "\n" +
        "  for(var i=0,method,l=METHODS.length; i<l; i++){\n" +
        "    method = METHODS[i];\n" +
        "    if(\"function\" !== typeof win.monitor[method]){\n" +
        "      win.monitor[method] = function(){};\n" +
        "    }\n" +
        "  }\n" +
        "})(window);\n" +
        "</script>\n" +
        "\n" +
        "<!-- seajs以及插件 -->\n" +
        "<script charset=\"utf-8\" crossorigin=\"anonymous\" id=\"seajsnode\" onerror=\"window.monitor && monitor.lost && monitor.lost(this.src)\" src=\"https://a.alipayobjects.com:443/??seajs/seajs/2.2.3/sea.js,seajs/seajs-combo/1.0.0/seajs-combo.js,seajs/seajs-style/1.0.2/seajs-style.js,seajs/seajs-log/1.0.0/seajs-log.js,jquery/jquery/1.7.2/jquery.js,gallery/json/1.0.3/json.js,alipay-request/3.0.8/index.js\"></script>\n" +
        "\n" +
        "<!-- seajs config 配置 -->\n" +
        "<script>\n" +
        "seajs.config({\n" +
        "  alias: {\n" +
        "    '$': 'jquery/jquery/1.7.2/jquery',\n" +
        "    '$-debug': 'jquery/jquery/1.7.2/jquery',\n" +
        "    'jquery': 'jquery/jquery/1.7.2/jquery',\n" +
        "    'jquery-debug': 'jquery/jquery/1.7.2/jquery-debug',\n" +
        "    'seajs-debug': 'seajs/seajs-debug/1.1.1/seajs-debug'\n" +
        "  },\n" +
        "  crossorigin: function(uri){\n" +
        "\n" +
        "    function typeOf(type){\n" +
        "\t  return function(object){\n" +
        "\t    return Object.prototype.toString.call(object) === '[object ' + type + ']';\n" +
        "\t  }\n" +
        "\t}\n" +
        "\tvar isString = typeOf(\"String\");\n" +
        "\tvar isRegExp = typeOf(\"RegExp\");\n" +
        "\n" +
        "\tvar whitelist = [];\n" +
        "\n" +
        "  whitelist.push('https://a.alipayobjects.com/');\n" +
        "\n" +
        "\tfor (var i=0, rule, l=whitelist.length; i<l; i++){\n" +
        "\t  rule = whitelist[i];\n" +
        "\t  if (\n" +
        "\t    (isString(rule) && uri.indexOf(rule) === 0) ||\n" +
        "\t    (isRegExp(rule) && rule.test(uri))\n" +
        "\t\t) {\n" +
        "\n" +
        "\t    return \"anonymous\";\n" +
        "\t  }\n" +
        "\t}\n" +
        "  },\n" +
        "  vars: {\n" +
        "    locale: 'zh-cn'\n" +
        "  }\n" +
        "});\n" +
        "</script>\n" +
        "\n" +
        "<!-- 兼容原有的 plugin-i18n 写法 -->\n" +
        "<!-- https://github.com/seajs/seajs/blob/1.3.1/src/plugins/plugin-i18n.js -->\n" +
        "<script>\n" +
        "seajs.pluginSDK = seajs.pluginSDK || {\n" +
        "  Module: {\n" +
        "    _resolve: function() {}\n" +
        "  },\n" +
        "  config: {\n" +
        "    locale: ''\n" +
        "  }\n" +
        "};\n" +
        "// 干掉载入 plugin-i18n.js，避免 404\n" +
        "seajs.config({\n" +
        "  map: [\n" +
        "\t[/^.*\\/seajs\\/plugin-i18n\\.js$/, ''],\n" +
        "\t[/^.*\\i18n!lang\\.js$/, '']\n" +
        "  ]\n" +
        "});\n" +
        "</script>\n" +
        "\n" +
        "<!-- 路由旧 ID，解决 seajs.use('select/x.x.x/select') 的历史遗留问题 -->\n" +
        "<script>\n" +
        "(function(){\n" +
        "\n" +
        "var JQ = '/jquery/1.7.2/jquery.js';\n" +
        "seajs.cache['https://a.alipayobjects.com:443/gallery' + JQ] = seajs.cache['https://a.alipayobjects.com:443/jquery' + JQ];\n" +
        "\n" +
        "var GALLERY_MODULES = [\n" +
        "  'async','backbone','coffee','cookie','es5-safe','handlebars','iscroll',\n" +
        "  'jasmine','jasmine-jquery','jquery','jquery-color','json','keymaster',\n" +
        "  'labjs','less','marked','moment','mustache','querystring','raphael',\n" +
        "  'socketio','store','swfobject','underscore','zepto','ztree'\n" +
        "];\n" +
        "\n" +
        "var ARALE_MODULES = [\n" +
        "  'autocomplete','base','calendar','class','cookie','dialog','easing',\n" +
        "  'events','iframe-uploader','iframe-shim','messenger','overlay','popup',\n" +
        "  'position','select','switchable','tip','validator','widget'\n" +
        "];\n" +
        "\n" +
        "var util = {};\n" +
        "util.indexOf = Array.prototype.indexOf ?\n" +
        "  function(arr, item) {\n" +
        "    return arr.indexOf(item);\n" +
        "  } :\n" +
        "  function(arr, item) {\n" +
        "    for (var i = 0; i < arr.length; i++) {\n" +
        "      if (arr[i] === item) {\n" +
        "        return i;\n" +
        "      }\n" +
        "    }\n" +
        "    return -1;\n" +
        "  };\n" +
        "util.map = Array.prototype.map ?\n" +
        "  function(arr, fn) {\n" +
        "    return arr.map(fn);\n" +
        "  } :\n" +
        "  function(arr, fn) {\n" +
        "    var ret = [];\n" +
        "\tfor (var i = 0; i < arr.length; i++) {\n" +
        "        ret.push(fn(arr[i], i, arr));\n" +
        "    }\n" +
        "    return ret;\n" +
        "  };\n" +
        "\n" +
        "function contains(arr, item) {\n" +
        "  return util.indexOf(arr, item) > -1\n" +
        "}\n" +
        "\n" +
        "function map(id) {\n" +
        "  id = id.replace('#', '');\n" +
        "\n" +
        "  var parts = id.split('/');\n" +
        "  var len = parts.length;\n" +
        "  var root, name;\n" +
        "\n" +
        "  // id = root/name/x.y.z/name\n" +
        "  if (len === 4) {\n" +
        "    root = parts[0];\n" +
        "    name = parts[1];\n" +
        "\n" +
        "    // gallery 或 alipay 开头的没有问题\n" +
        "    if (root === 'alipay' || root === 'gallery') {\n" +
        "      return id;\n" +
        "    }\n" +
        "\n" +
        "    // arale 开头的\n" +
        "    if (root === 'arale') {\n" +
        "      // 处理 arale/handlebars 的情况\n" +
        "      if (contains(GALLERY_MODULES, name)) {\n" +
        "        return id.replace('arale/', 'gallery/');\n" +
        "      } else {\n" +
        "        return id;\n" +
        "      }\n" +
        "    }\n" +
        "  }\n" +
        "  // id = name/x.y.z/name\n" +
        "  else if (len === 3) {\n" +
        "    name = parts[0]\n" +
        "\n" +
        "    // 开头在 GALLERY_MODULES 或 ARALE_MODULES\n" +
        "    if (contains(GALLERY_MODULES, name)) {\n" +
        "      return 'gallery/' + id;\n" +
        "    } else if (contains(ARALE_MODULES, name)) {\n" +
        "      return 'arale/' + id;\n" +
        "    }\n" +
        "  }\n" +
        "\n" +
        "  return id;\n" +
        "}\n" +
        "\n" +
        "var _use = seajs.use;\n" +
        "\n" +
        "seajs.use = function(ids, callback) {\n" +
        "  if (typeof ids === 'string') {\n" +
        "    ids = [ids];\n" +
        "  }\n" +
        "\n" +
        "  ids = util.map(ids, function(id) {\n" +
        "    return map(id);\n" +
        "  });\n" +
        "\n" +
        "  return _use(ids, callback);\n" +
        "}\n" +
        "\n" +
        "})();\n" +
        "</script>\n" +
        "<!-- FD:106:alipay/tracker/seajs.vm:END -->\n" +
        "<!-- FD:106:alipay/tracker/tracker_time.vm:START --><!-- FD:106:alipay/tracker/tracker_time.vm:784:tracker_time.schema:全站 tracker 开关:START --><script charset=\"utf-8\" crossorigin=\"crossorigin\" src=\"https://a.alipayobjects.com/static/ar/alipay.light.base-1.8.js\"></script>\n" +
        "\n" +
        "\n" +
        "<script type=\"text/javascript\">\n" +
        "if (!window._to) {\n" +
        "  window._to = { start: new Date() };\n" +
        "}\n" +
        "</script>\n" +
        "\n" +
        "<script charset=\"utf-8\" src=\"https://as.alipayobjects.com/??g/component/tracker/2.3.2/index.js,g/component/smartracker/2.0.2/index.js\"></script>\n" +
        "<script charset=\"utf-8\" src=\"https://a.alipayobjects.com/g/utiljs/rd/1.0.2/rd.js\"></script>\n" +
        "\n" +
        "\n" +
        "\n" +
        "<script>\n" +
        "  window.Tracker && Tracker.start &&  Tracker.start();\n" +
        "</script>\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "<!-- FD:106:alipay/tracker/tracker_time.vm:784:tracker_time.schema:全站 tracker 开关:END -->\n" +
        "<!-- FD:106:alipay/tracker/tracker_time.vm:END -->    <link charset=\"utf-8\" rel=\"stylesheet\" href=\"https://a.alipayobjects.com:443/excashier/front/1.0.0/front-qrcode.css\" media=\"all\" />\n" +
        "\n" +
        "    <style>\n" +
        "    \n" +
        "    </style>\n" +
        "    <!-- CMS:外部商户匿名收银台cms/日志入口/全局日志入口开始:excashier/globalLog/log.vm -->  <style>body #onlineService{display:none}</style><script>var fixInterval = setInterval(function(){if(window.switcher){document.body.style.minWidth = '990px';clearInterval(fixInterval);}},100);window.qrPayloopInterval=5000;window.qrPayloopInterval_5=5000;window.qrPayloopInterval_10=5000;</script><!-- CMS:外部商户匿名收银台cms/日志入口/全局日志入口结束:excashier/globalLog/log.vm --></head>\n" +
        "<body>\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "<div id=\"J_qrPayOrder\">\n" +
        "\n" +
        "        <input name=\"timeoutMillseconds\" type=\"hidden\" value=\"0\"\n" +
        "           id=\"J_timeoutMillseconds\"/>\n" +
        "    <input name=\"orderDeadline\" type=\"hidden\" value=\"\"\n" +
        "           id=\"J_orderDeadline\"/>\n" +
        "    <!-- 由于嵌入式二维码跳转到超时链接会超出预留的空间，因此直接将跳转链接传空 -->\n" +
        "    <input name=\"timeoutUrl\" type=\"hidden\" value=\"\" id=\"J_timeoutUrl\"/>\n" +
        "    <input name=\"qrCode\" type=\"hidden\" value=\"https://qr.alipay.com/upx09032mrdhbqebanop50a1\" id=\"J_qrCode\"/>\n" +
        "    <input name=\"qrImgUrl\" type=\"hidden\" value=\"https://mobilecodec.alipay.com/show.htm?code=upx09032mrdhbqebanop50a1\" id=\"J_qrImgUrl\"/>\n" +
        "    <input name=\"qrUseImage\" type=\"hidden\" value=\"false\" id=\"J_qrUseImage\"/>\n" +
        "    <input name=\"qrContextId\" type=\"hidden\" value=\"20201111ccmc-55-50T4678a2394515501\" id=\"J_qrContextId\"/>\n" +
        "    <input name=\"qrRenewalURL\" type=\"hidden\" value=\"https://excashier.alipay.com:443/standard/renewQRCode.json?payOrderId=03e33cee4ff54dffb3dee61657ad743b.50\" id=\"J_qrRenewalURL\"/>\n" +
        "    <input name=\"qrPushCheckURL\" type=\"hidden\" value=\"\" id=\"J_qrPushCheckURL\"/>\n" +
        "    <input name=\"qrLoopCheckURL\" type=\"hidden\" value=\"https://excashier.alipay.com:443/standard/queryQRStatus.json?payOrderId=03e33cee4ff54dffb3dee61657ad743b.50\" id=\"J_qrLoopCheckURL\"/>\n" +
        "    <input name=\"qrPaySuccGotoURL\" type=\"hidden\" value=\"https://unitradeprod.alipay.com:443/acq/cashierReturn.htm?sign=K1iSL1Db2L3CRyMkncDDjv58WbwgS3cyIx4qkfwG%252FEpa3AzSa%252FedykrF%252FgMDNCr%252FWYr0Du4qVseG&amp;outTradeNo=POD_1605064858636484833&amp;pid=2088901300887132&amp;type=1\"\n" +
        "           id=\"J_qrPaySuccGotoURL\"/>\n" +
        "    <input name=\"resultPageStayTime\"  type=\"hidden\" value=\"5\"\tid=\"J_resultPageStayTime\" />\n" +
        "\n" +
        "    <input name=\"qrCheckMode\" type=\"hidden\" value=\"LOOP\" id=\"J_qrCheckMode\"/>\n" +
        "    <input name=\"qrExpirySeconds\" type=\"hidden\" value=\"99\" id=\"J_qrExpirySeconds\"/>\n" +
        "    <input name=\"qrLogonId\" type=\"hidden\" value=\"\" id=\"J_qrLogonId\"/>\n" +
        "    <input name=\"qrBizType\" type=\"hidden\" value=\"UNI_PC_MERCHANT\" id=\"J_qrBizType\"/>\n" +
        "    <input name=\"qrDiscountText\" type=\"hidden\" value=\"\"\n" +
        "           id=\"J_qrDiscountText\"/>\n" +
        "    <input name=\"qrDiscountDesc\" type=\"hidden\" value=\"\"\n" +
        "           id=\"J_qrDiscountDesc\"/>\n" +
        "\n" +
        "    <div class=\"ui-content\">\n" +
        "\n" +
        "        <div class=\"qrpay-content\">\n" +
        "            <div class=\"ft-center\">\n" +
        "\n" +
        "                <div data-role=\"qrPayArea\" class=\"qrcode-mini qrcode-area\" id=\"J_qrPayArea\">\n" +
        "\n" +
        "                    <div class=\"qrcode-mini-content fn-left\">\n" +
        "\n" +
        "                        <div data-role=\"qrPayCrash\" class=\"qrcode-img-area fn-hide\">\n" +
        "                            <div>\n" +
        "                                <i class=\"iconfont qrpay-crash-icon\">&#xF047;</i>\n" +
        "                            </div>\n" +
        "                            <p>二维码太忙了</p>\n" +
        "                            <p>请稍后再试</p>\n" +
        "                            <a href=\"#\" class=\"mi-button mi-button-mwhite\" data-role=\"qrPayRefreshBtn\"\n" +
        "                               seed=\"qrcodeRefreshBtn\"><span\n" +
        "                                    class=\"mi-button-text\">重试</span></a>\n" +
        "\n" +
        "                        </div>\n" +
        "\n" +
        "                        <div data-role=\"qrPayImg\" class=\"qrcode-img-area\">\n" +
        "                            <div class=\"ui-loading qrcode-loading\" data-role=\"qrPayImgLoading\">加载中</div>\n" +
        "                        </div>\n" +
        "\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "    </div>\n" +
        "\n" +
        "</div>\n" +
        "\n" +
        "<input type=\"hidden\" name=\"qrcodeWidth\" id=\"J_qrcodeWidth\" value=\"$qrCodeViewModel.qrCodeWidth\"/>\n" +
        "\n" +
        "\n" +
        " \n" +
        "<!-- uitpl:/component/tracker.vm -->\n" +
        "<!-- FD:106:alipay/tracker/tracker.vm:START --><!-- FD:106:alipay/tracker/tracker.vm:785:tracker.schema:全站自动化/性能/敏感信息打点开关:START -->\n" +
        "\n" +
        "\n" +
        "\n" +
        "<script type=\"text/javascript\">\n" +
        "window.Smartracker && Smartracker.sow && Smartracker.sow();\n" +
        "</script>\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "<script type=\"text/javascript\">\n" +
        "\n" +
        "window.agp_custom_config = {\n" +
        "  BASE_URL: '//kcart.alipay.com/p.gif',\n" +
        "  TIMING_ACTION_URL: '//kcart.alipay.com/x.gif'\n" +
        "}\n" +
        "\n" +
        "</script>\n" +
        "<script charset=\"utf-8\" src=\"https://a.alipayobjects.com:443/g/memberAsset/securityMsg/1.0.3/index.js\"></script>\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "<!-- FD:106:alipay/tracker/sai.vm:START --><script>\n" +
        "    sensScanConfig={\n" +
        "        ratio: 0.01,\n" +
        "        modules: '*',\n" +
        "        types: '*'\n" +
        "      };\n" +
        "</script>\n" +
        "\n" +
        "<script src='https://as.alipayobjects.com/g/alipay_security/monitor-sens/1.0.1/monitor-sens.min.js'></script>\n" +
        "<!-- FD:106:alipay/tracker/sai.vm:END -->\n" +
        "\n" +
        "\n" +
        "\n" +
        "<!-- FD:106:alipay/tracker/cmsbuffer.vm:START --><!-- FD:106:alipay/tracker/cmsbuffer.vm:997:cmsbuffer.schema:main-CMS全站修复:START -->\n" +
        "\t\n" +
        "\t\t\t\n" +
        "\t\t\t\n" +
        "\t\t\t\n" +
        "\t\t\t\n" +
        "\t\t\t\n" +
        "\t\t\t\n" +
        "\t\t\t\n" +
        "\t\t\t\n" +
        "\t\t\t\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "<script>\n" +
        "try {\n" +
        "  (function() {\n" +
        "  var logServer = 'https://magentmng.alipay.com/m.gif';\n" +
        "  var sample = 0.0001;\n" +
        "  var url = \"https://a.alipayobjects.com/http-watch/1.0.7/index.js\";\n" +
        "\n" +
        "  // 判断比例\n" +
        "  if (!!window.addEventListener && Array.prototype.map && Math.random() < sample) {\n" +
        "    var HEAD = document.head || document.getElementsByTagName('head')[0];\n" +
        "\n" +
        "    var spt = document.createElement('script');\n" +
        "    spt.src = url;\n" +
        "    HEAD.appendChild(spt);\n" +
        "\n" +
        "\tsetTimeout(function() {\n" +
        "\t  window.httpWatch && window.httpWatch({ sample: 1, appname: 'excashier-55-5071', logServer: logServer });\n" +
        "\t}, 1000);\n" +
        "  }\n" +
        "  })();\n" +
        "} catch(e) {}\n" +
        "</script>\n" +
        "\n" +
        "<!-- FD:106:alipay/tracker/cmsbuffer.vm:997:cmsbuffer.schema:main-CMS全站修复:END -->\n" +
        "<!-- FD:106:alipay/tracker/cmsbuffer.vm:END --><!-- FD:106:alipay/tracker/tracker.vm:785:tracker.schema:全站自动化/性能/敏感信息打点开关:END -->\n" +
        "<!-- FD:106:alipay/tracker/tracker.vm:END -->\n" +
        "<script>\n" +
        "seajs.use('excashier/login/2016.04.25/qrcodeModule',function(qrcodeModule){\n" +
        "    window.qb = new qrcodeModule({\n" +
        "        imgWH: ~~document.getElementById(\"J_qrcodeWidth\").value || \"200\",\n" +
        "        discountTipOff: true,\n" +
        "        useImage: jQuery('#J_qrUseImage').val() == 'true'\n" +
        "    });\n" +
        "\n" +
        "});\n" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "</script>\n" +
        "<div class=\"ui-poptip ui-poptip-white qrpay-discount-tip\" id=\"J_qrPayTip\">\n" +
        "    <div class=\"ui-poptip-shadow\">\n" +
        "        <div class=\"ui-poptip-container qrpay-discount-container\">\n" +
        "            <div class=\"ui-poptip-arrow ui-poptip-arrow-10\">\n" +
        "                <em></em>\n" +
        "                <span></span>\n" +
        "            </div>\n" +
        "            <div class=\"ui-poptip-content\">\n" +
        "                <p>使用扫码支付，不可与</p>\n" +
        "                <p>支付宝其他优惠同时使用。</p>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</div>\n" +
        "</body>\n" +
        "</html>\n" +
        "\n" +
        "\n";


        Document doc = Jsoup.parse(form);
        Elements elements = doc.select("input");
        String qrCode = "";
        for(Element inputTag : elements) {
            String name = inputTag.attr("name");
            if ("qrCode".equalsIgnoreCase(name)) {
                qrCode = inputTag.attr("value");
            }
        }



        System.out.println(qrCode);


    }



    }
