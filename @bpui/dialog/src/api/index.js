'use strict';

/**
* Copyright (c) 2020 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2020-03-01 21:26
* Desc: 
*/

import * as apiDialog from './dialog';
import * as apiLoading from './loading';
import * as apiToast from './toast';
import * as apiCustom from './custom';


export default {
  ...apiDialog,
  ...apiLoading,
  ...apiToast,
  ...apiCustom,
}