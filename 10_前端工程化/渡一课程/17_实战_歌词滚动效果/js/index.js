/**
 * 解析歌词字符串,返回{time: '', words: ''}对象格式数组
 */
function parseLrc() {
    const musicArr = music.split('\n').map(item => item.trim()).filter(Boolean)
    console.log(musicArr, 'musicArr');

    return musicArr.map(item => {
        const result = item.match(/\[([^\]]*)\]/)
        return {
            time: parseTime(result?.['1'] ?? ''),
            words: item.split(']')[1]
        }
    })
}

/**
 * 解析时间字符串,返回具体时间
 * @param {string} timeStr 时间字符串
 */
function parseTime(timeStr) {
    if (!timeStr) {
        return 0
    }

    const parts = timeStr.split(':')
    return parts[0] * 60 + parts[1] * 1
}

const lrc = parseLrc()
console.log(lrc, 'lrc');

const doms = {
    audio: document.querySelector('audio'),
    lrcList: document.querySelector('.lrc-list'),
    container: document.querySelector('.container')
}
/**
 * 计算出在当前播放器播放到第几秒的情况下
 * lrc数组中应该高亮显示的歌词下标
 */
function findIndex() {
    let curTime = doms.audio.currentTime;
    const index = lrc.findIndex(item => item.time > curTime)

    return index > -1 ? index - 1 : lrc.length - 1;
}

// 界面逻辑
/**
 * 创建歌词列表元素
 */
function creatrLrcElements() {
    // 文档片段
    const frag = document.createDocumentFragment();
    for (let i = 0; i < lrc.length; i++) {
        const li = document.createElement('li')
        li.textContent = lrc[i].words;
        frag.append(li)
    }

    doms.lrcList.append(frag);
}

creatrLrcElements()

// 获取container容器高度
const containerHeight = doms.container.clientHeight;
// 获取li元素高度
const liHeight = doms.lrcList.children[0].clientHeight;
// 获取底部li元素偏移最大高度
const maxOffset = doms.lrcList.clientHeight - containerHeight;
/**
 * 设置ul元素偏移量
 */
function setOffset() {
    const index = findIndex();
    let offset = liHeight * index + liHeight / 2 - containerHeight / 2;
    // 考虑顶部和底部边界
    if (offset < 0) {
        offset = 0
    }

    if (offset > maxOffset) {
        offset = maxOffset;
    }

    doms.lrcList.style.transform = `translateY(-${offset}px)`
    // 去掉之前的active样式
    const li = doms.lrcList.querySelector('.active')
    if (li) {
        li.classList.remove('active')
    }
    // 给当前需要高亮li元素添加active样式
    if (doms.lrcList.children[index]) {
        doms.lrcList.children[index].classList.add('active')
    }
}

// 注册audio事件监听
doms.audio.addEventListener('timeupdate', function () {
    console.log('timeupdate called');
    setOffset()
})