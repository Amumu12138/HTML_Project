var Example = Example || {};

/**
 * @desc 音频
 * threeJs提供了一系列音频相关的API:
 * 一、音频Audio、位置音频PositionalAudio、监听者AudioListener、
 * 音频分析器AudioAnalyser、音频加载器AudioLoader
 * 二、音频、位置音频等ThreeJs类本质上是对原生Web Audio API的封装
 */
var audio = null;
Example.Audio = function () {

    //创建一个监听者
    var listener = new THREE.AudioListener();
    //创建一个非位置音频对象,用来控制播放
    audio = new THREE.Audio(listener);
    //创建一个音频加载器对象
    var audioLoader = new THREE.AudioLoader();
    //加载音频文件,返回一个音频缓冲区对象作为回调函数参数
    audioLoader.load('resources/sounds/358232_j_s_song.mp3', function (audioBuffer) {
        console.log("ThreeJS Audio audioBuffer = ", audioBuffer);
        //音频缓冲区对象关联到音频对象audio
        audio.setBuffer(audioBuffer);
        audio.setLoop(true);
        audio.setVolume(1.0);
        //播放该缓冲区的音频数据
        // audio.play();
    });
};

//播放音频按钮响应
function AudioClick() {
    console.log("Amumu audio play");
    audio.play();
}

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}