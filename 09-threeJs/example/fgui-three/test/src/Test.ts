import * as THREE from "three";
import { Threescene } from ".";
import * as fgui from "../../build/FairyGUI";

export class TestScene {
    private static _instance: TestScene = null;
    public static get Instance(): TestScene {
        if (this._instance == null) {
            this._instance = new TestScene();
        }
        return this._instance;
    }

    private scene: THREE.Scene
    private renderer: THREE.WebGLRenderer;

    private _mainMenu: fgui.GComponent;
    private _btnBack: fgui.GComponent;

    constructor() {
        console.log("Amumu TestScene constructor");
        this.init();
    }

    private init() {
        console.log("Amumu TestScene init");
        // this.renderer = new THREE.WebGLRenderer();//{ antialias: true }
        // this.renderer.setClearColor(0X222222);
        // this.renderer.sortObjects = false;
        // this.renderer.setPixelRatio(window.devicePixelRatio);
        // this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.renderer.localClippingEnabled = true;
        // document.body.appendChild(this.renderer.domElement);
        // window.addEventListener('resize', () => {
        //     this.renderer.setSize(window.innerWidth, window.innerHeight);
        // }, false);

        // this.scene = new THREE.Scene();

        // fgui.Stage.init(this.renderer);
        // fgui.Stage.scene = this.scene;

        // fgui.UIContentScaler.scaleWithScreenSize(1136, 640, fgui.ScreenMatchMode.MatchWidthOrHeight);

        // let listener: THREE.AudioListener = new THREE.AudioListener();
        // fgui.Stage.camera.add(listener);
        // fgui.Stage.audioListener = listener;

        fgui.UIPackage.loadPackage("assets/UI/Package1").then(this.start.bind(this));

        // this.animate();
    }

    private start() {
        this._mainMenu = fgui.UIPackage.createObject("Package1", "Test").asCom;
        this._mainMenu.makeFullScreen();
        fgui.GRoot.inst.addChild(this._mainMenu);

        this._btnBack = this._mainMenu.getChild("btnBack").asCom;
        this._btnBack.onClick(this.onClickBack, this);
    }

    private render() {
        fgui.Stage.update();
        this.renderer.render(this.scene, fgui.Stage.camera);
    }

    private animate = () => {
        requestAnimationFrame(this.animate);
        this.render();
    }

    private onClickBack() {
        TestScene.Instance.hide();
        Threescene.Instance.show();
    }

    public show() {
        this._mainMenu && (this._mainMenu.visible = true);
    }

    public hide() {
        this._mainMenu && (this._mainMenu.visible = false);
    }
}