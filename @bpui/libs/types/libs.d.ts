/// <reference path="./router.d.ts" />
/// <reference path="./dom.d.ts" />
/// <reference path="./device.d.ts" />
/// <reference path="./timer.d.ts" />
/// <reference path="./icons.d.ts" />
/// <reference path="./gesture.d.ts" />

declare namespace bp {

  namespace bpLibs {
    /**
     * @desc: Vue option.
     */
    function VuePlugin():any;
    const VueObject: { bpIcon: any }
    
    /**
     * @desc: 注册app.
     * @param routes: 此app所需的routes结构.
     *      path='*' 的路由为404路由.
     * @param basePath: 所有路径基于的目录
     */
    function registerApp(routes: Array< {path:string,component:any,[key:string]:any} >, basePath?:string): void;

    /**
     * @desc: router工具.
     */
    const router: bp.Router;
    /**
     * @desc: dom工具.
     */
    const dom: bp.Dom;
    /**
     * @desc: 设置工具.
     */
    const device: bp.Device;
    /**
     * @desc: 图标工具.
     */
    const icons: bp.Icons;
    /**
     * @desc: 计时器工具.
     */
    const Timer: {new():bp.Timer};

    /**
     * @desc: 手势工具.
     */
    const Gesture: {new(dom:HTMLElement|SVGElement):bp.Gesture};
  }
}
