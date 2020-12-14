import { features } from "process";
import * as THREE from "three";
import * as fgui from "../../build/FairyGUI";
import * as Test from "../src/Test";

export class Threescene {
    private static _instance: Threescene = null;
    public static get Instance(): Threescene {
        if (this._instance == null) {
            this._instance = new Threescene();
        }
        return this._instance;
    }

    private scene: THREE.Scene
    private renderer: THREE.WebGLRenderer;

    private _mainMenu: fgui.GComponent;
    private _btnTest: fgui.GComponent;

    constructor() {
        this.init();
        console.log("Amumu Threescene constructor");
    }

    private init() {
        this.renderer = new THREE.WebGLRenderer();//{ antialias: true }
        this.renderer.setClearColor(0X222222);
        this.renderer.sortObjects = false;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.localClippingEnabled = true;
        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);

        this.scene = new THREE.Scene();

        fgui.Stage.init(this.renderer);
        fgui.Stage.scene = this.scene;

        fgui.UIContentScaler.scaleWithScreenSize(1136, 640, fgui.ScreenMatchMode.MatchWidthOrHeight);

        // let listener: THREE.AudioListener = new THREE.AudioListener();
        // fgui.Stage.camera.add(listener);
        // fgui.Stage.audioListener = listener;

        fgui.UIPackage.loadPackage("assets/UI/Package1").then(this.start.bind(this));

        this.initGame();
        this.animate();
    }

    private start() {
        this._mainMenu = fgui.UIPackage.createObject("Package1", "Main").asCom;
        this._mainMenu.makeFullScreen();
        fgui.GRoot.inst.addChild(this._mainMenu);

        this._btnTest = this._mainMenu.getChild("btnTest").asCom;
        //注册按钮监听事件
        this._btnTest.onClick(this.onClickTest, this);
    }

    /**
     * @desc 初始化游戏
     */
    private initGame() {
        var geometry = new THREE.BoxGeometry(10, 10, 10); //创建一个立方体几何对象Geometry
        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff
        }); //材质对象Material
        var box = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        this.scene.add(box); //网格模型添加到场景中

        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
        this.scene.add(point); //点光源添加到场景中

        //创建相机对象
        var width = window.innerWidth; //窗口宽度
        var height = window.innerHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
        fgui.Stage.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        fgui.Stage.camera.position.set(200, 300, 200); //设置相机位置
        fgui.Stage.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
    }

    private render() {
        fgui.Stage.update();
        this.renderer.render(this.scene, fgui.Stage.camera);
    }

    private animate = () => {
        requestAnimationFrame(this.animate);
        this.render();
    }

    /**
     * @desc 点击按钮响应
     * @param evet 
     */
    private onClickTest() {
        console.log("Amumu Threescene onClickTest");
        // fgui.GRoot.inst.removeChild(this._mainMenu);
        this.hide();
        Test.TestScene.Instance.show();
    }

    public show() {
        this._mainMenu && (this._mainMenu.visible = true);
    }

    public hide() {
        this._mainMenu && (this._mainMenu.visible = false);
    }
}

Threescene.Instance.show();