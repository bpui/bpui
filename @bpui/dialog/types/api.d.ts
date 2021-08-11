declare namespace bp {
  export interface DialogID {
    id: string;
  }

  export interface WidgetApi {
    /**
     * 显示/隐藏自定义模态对话框.
     * @param cfg 传递data,props,on等内容.
     */
    showCustom(
      name: string,
      cfg?: { data?: any; props?: any; on?: any; [index: string]: any }
    ): DialogID;
    hideCustom(id: DialogID): void;

    /**
     * @desc: show toast.
     */
    showToast(
      cfg?:
        | string
        | {
            content?: string;
            /** 持续时间 */
            durable?: number;
            /** 显示位置 */
            pos?: "top" | "center";
            /** 显示的图标名称 */
            icon?: string;
          }
    ): void;

    /**
     * @desc: 隐藏 alert 或 confirm
     * @param id: 如果不传递id, 则关闭所有对话框.
     */
    hideDialog(id?: DialogID): void;
    hideAlert(id?: DialogID): void;
    hideConfirm(id?: DialogID): void;

    /**
     * @desc: 显示警告框.
     * 
     * @description 可使用promise方式或confirm回调参数来获取点击确认的事件. 用户点击确认按钮后会自动关闭警告框.
     */
    showAlert(
      cfg:
        | string
        | {
          title?: string;
          content: string;
          okText?: string;
          confirm?: (id: DialogID) => void;
        }
    ): Promise<DialogID>;

    /**
     * @desc: 显示确认框.
     * 
     * @description 
     * 
     * 点击取消按钮后, 确认框自动关闭; 点击确认按钮后, 确认框不会自动关闭, 需用户手动调用 {@see `hideConfirm`() 进行关闭}
     * 
     * 1. 使用`promise`方式获取用户点击事件时, then 可捕获点击确认按钮的事件; catch 可捕获点击取消按钮的事件; promise状态只能被捕获一次, 
     * 例如, 点击确认按钮后, 再点击取消按钮, 此时catch无法捕获取消事件.
     * 
     * 2. 使用`confirm`回调参数来获取点击确认的事件, 使用`cancel`回调参数来捕获取消事件; 不受上述方式的影响, 可以多次捕获.
     * 
     * @return 按取消键后进入catch.
     */
    showConfirm(
      cfg:
        | string
        | {
            title?: string;
            content: string;
            okText?: string;
            cancelText?: string;
            confirm?: (id: DialogID) => void;
            cancel?: (id: DialogID) => void;
          }
    ): Promise<DialogID>;

    /**
     * @desc: 当前是否显示.
     *
     * (已经被show, 但是处于动画或delay状态下不可见,也返回true)
     */
    isLoadingVisible(): boolean;

    /**
     * @desc: 显示; 不改变内部的loading计数.
     *
     * 仅能由 {@link hideLoading} 隐藏
     */
    showLoading(
      cfg?:
        | string
        | {
            content?: string;
            /** 延迟指定的时间后才显示, 但延迟后如果调用了hide, 则不显示 */
            delay?: number;
          }
    ): void;

    /**
     * @desc: 隐藏; 不改变内部的loading计数.
     */
    hideLoading(): void;

    /**
     * @desc: 显示; 增加内部的loading计数1. 如果已经存在loading, 则不改变loading的内容.
     *
     * 仅能由 {@link hideLoadingDecrease} 隐藏
     */
    showLoadingIncrease(
      cfg?:
        | string
        | {
            content?: string;
            /** 延迟指定的时间后才显示, 但延迟后如果调用了hide, 则不显示 */
            delay?: number;
          }
    ): void;

    /**
     * @desc: 隐藏; 会将内部的loading计数-1; 直到0为止,才会真正隐藏loading.
     */
    hideLoadingDecrease(): void;

    /**
     * @desc: 显示在指定的dom元素上; 不改变内部的loading计数
     *
     * 仅能由 {@link hideLoadingTarget} 隐藏
     */
    showLoadingTarget(
      target: HTMLElement | any,
      cfg?:
        | string
        | {
            content?: string;
            /** 延迟指定的时间后才显示, 但延迟后如果调用了hide, 则不显示 */
            delay?: number;
          }
    ): void;

    /**
     * @desc: 隐藏指定dom元素上的loading; 不改变内部的loading计数.
     */
    hideLoadingTarget(target: HTMLElement | any): void;

    /**
     * @desc: 清理loading的计数; 设置为0.
     */
    clearLoadingCount(): void;

    /**
     * @desc: 插入并显示一个任意widget组件到body上.
     * @description
     *    提供的组件在消失时需要触发如下的事件, 否则元素不会从dom中删除.
     *      this.$emit('update:visible', false);
     * @param component
     */
    showWidget(component: any): void;
  }
}
