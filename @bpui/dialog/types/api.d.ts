declare namespace bp {

  type DialogID = any;

  export interface WidgetApi {

    /**
     * 显示/隐藏自定义模态对话框.
     */
    showCustom(name: string): DialogID;
    hideCustom(id: DialogID): void;

    /**
    * @desc: show toast.
    */
    showToast(cfg?:string|{
      content?: string,
      /** 持续时间 */
      durable?: number,
      /** 显示位置 */
      pos?: 'top'|'center',
      /** 显示的图标名称 */
      icon?: string,
    }):void; 

    /**
    * @desc: 隐藏 alert 或 confirm
    * @param id: 如果不传递id, 则关闭所有对话框.
    */
    hideDialog(id?:DialogID):void;
    hideAlert(id?:DialogID):void;
    hideConfirm(id?:DialogID):void;

    /**
    * @desc: 显示警告框.
    */
    showAlert(cfg:string|{
      title?: string,
      content: string,
      okText?: string,
      confirm?: (id:DialogID)=>void,
    }): DialogID;

    /**
    * @desc: 显示确认框.
    */
    showConfirm(cfg:string|{
      title?: string,
      content: string,
      okText?: string,
      cancelText?: string,
      confirm?: (id:DialogID)=>void,
      cancel?: (id:DialogID)=>void,
    }): DialogID;

    /**
     * 当前是否显示.
     */
    isLoadingVisible():boolean;

    /**
    * @desc: 隐藏
    */
    hideLoading():void;

    /**
    * @desc: 显示.
    */
    showLoading(cfg?:string|{
        content?: string,
        /** 延迟指定的时间后才显示, 但延迟后如果调用了hide, 则不显示 */
        delay?: number
    }):void; 

    /**
     * @desc: 插入并显示一个任意widget组件到body上.
     * @description
     *    提供的组件在消失时需要触发如下的事件, 否则元素不会从dom中删除.
     *      this.$emit('update:visible', false);
     * @param component 
     */
    showWidget(
      component: any
    ):void;
  }
}