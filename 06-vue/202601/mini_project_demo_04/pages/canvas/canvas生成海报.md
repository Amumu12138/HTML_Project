### 1、引入相关依赖
```
<!-- package.json -->
"dependencies": {
    "wxa-plugin-canvas": "^1.1.12",
}
```

### 2、引入poster海报文件
```
<!--  canvas.js -->
import Poster from 'wxa-plugin-canvas/poster/poster'
```

### 3、生成图片信息
```
 wx.getImageInfo({
    src: pic,
    success: (res) => {
      const height = 490 * res.height / res.width
      this.drawSharePicDone(height, qrcode)
    },
    fail: (e) => {
      console.error(e)
    }
})
```

### 4、绘制分享海报
```
<!-- canvas.js -->
 drawSharePicDone(picHeight, qrcode) {
    const _baseHeight = 74 + (picHeight + 120)
    this.setData({
      posterConfig: {
        width: 750,
        height: picHeight + 660,
        backgroundColor: '#fff',
        debug: false,
        blocks: [{
          x: 76,
          y: 74,
          width: 604,
          height: picHeight + 120,
          borderWidth: 2,
          borderColor: '#c2aa85',
          borderRadius: 8
        }],
        images: [{
          x: 133,
          y: 133,
          url: 'https://file.itndedu.com/mall/goods-01.png', // 商品图片
          width: 490,
          height: picHeight
        },
        {
          x: 76,
          y: _baseHeight + 199,
          url: qrcode, // 二维码
          width: 222,
          height: 222
        }
        ],
        texts: [{
          x: 375,
          y: _baseHeight + 80,
          width: 650,
          lineNum: 2,
          text: '123',
          textAlign: 'center',
          fontSize: 40,
          color: '#333'
        },
        {
          x: 375,
          y: _baseHeight + 180,
          text: '￥111',
          textAlign: 'center',
          fontSize: 50,
          color: '#e64340'
        },
        {
          x: 352,
          y: _baseHeight + 320,
          text: '长按识别小程序码',
          fontSize: 28,
          color: '#999'
        }
        ],
      }
    }, () => {
      Poster.create(this.data.posterConfig, this);
    });
  }

<!--canvas.wxml -->
<poster 
id="poster" 
config="{{posterConfig}}" 
bind:success="onPosterSuccess" bind:fail="onPosterFail">
</poster>

```