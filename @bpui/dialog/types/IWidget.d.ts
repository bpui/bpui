
/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-02-17 14:42
* Desc: 
*/

declare namespace bp {

  interface Widget {
    /**
     * @desc: 显示
     * @return promise.
     */
    show():Promise<void>;

    /**
     * @desc: 隐藏.
     * @return promise.
     */
    hide():Promise<void>;
  }
}