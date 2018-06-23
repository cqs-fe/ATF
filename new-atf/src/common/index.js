/*
 * 引入公共组件，统一暴露给页面
 * @Author: ZhuQingguang
 * @Date:   2018-06-20
 * @Last Modified by:  ZhuQingguang
 */

 window.address3 = 'http://10.108.223.23:8080/atfcloud2.0a/';
 // 所有页面都需要的库
import Vue from 'vue';
import * as uiv from 'uiv';
Vue.use(uiv);
export { Vue, uiv };

export function Alert(msg = '操作成功', title = '操作提示') {
    Vue.prototype.$alert({
        title,
        content: msg
    });
}
export function Confirm(msg, title = '操作提示') {
    return Vue.prototype.$confirm({
        title,
        content: msg,
        okText: '确认',
        cancelText: '取消'
    });
}
 // 公共组件
import HeaderGuide from './header-guide';
import AsideGuide from './aside-guide';
import CopyRight from './copy-right';
import Pagination from './pagination';
export const components =  {
    HeaderGuide,
    AsideGuide,
    CopyRight,
    Pagination
};

// ajax 请求
export const Ajax = function (opt) {
    if (typeof opt.data === 'object') {
        opt.data = JSON.stringify(opt.data);
    }
    opt.contentType = opt.contentType || 'application/json';
    opt.type = opt.type || 'post';
    opt.dataType = 'json';
    $.ajax({
        url: opt.url,
        data: opt.data || '',
        type: opt.type || 'post',
        contentType: opt.contentType || 'application/json',
        dataType: opt.dataType || 'json',
        success: function (data) {
            opt.success(data);
        },
        error: function () {
            if (opt.error) {
                opt.error();
            } else {
                Alert('网络错误，请稍候再试~');
            }
        }
    });
}
