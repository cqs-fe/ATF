//截取url参数
$.getUrlParam = function (name) {//获取url参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//检测动画是否完成
$.fn.transitionEnd = function(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'],
        i, dom = this;

    function fireCallBack(e) {
        /*jshint validthis:true */
        if (e.target !== this) return;
        callback.call(this, e);
        for (i = 0; i < events.length; i++) {
            dom.off(events[i], fireCallBack);
        }
    }
    if (callback) {
        for (i = 0; i < events.length; i++) {
            
            dom.on(events[i], fireCallBack);
        }
    }
    return this;
};

//引入loading
if($("#loadingToast").attr("class")!=null||$("#loadingToast").attr("class")!=""){
    var loadingStr = '<div id="loadingToast" class="dz_loading_toast" style="display: none;">'
        +'<div class="dz_mask_transparent"></div>'
        +'<div class="dz_toast_loading small">'
            +'<div class="dz_loading">'
                +'<div class="dz_loading_leaf dz_loading_leaf_0"></div><div class="dz_loading_leaf dz_loading_leaf_1"></div><div class="dz_loading_leaf dz_loading_leaf_2"></div><div class="dz_loading_leaf dz_loading_leaf_3"></div><div class="dz_loading_leaf dz_loading_leaf_4"></div><div class="dz_loading_leaf dz_loading_leaf_5"></div><div class="dz_loading_leaf dz_loading_leaf_6"></div><div class="dz_loading_leaf dz_loading_leaf_7"></div><div class="dz_loading_leaf dz_loading_leaf_8"></div><div class="dz_loading_leaf dz_loading_leaf_9"></div><div class="dz_loading_leaf dz_loading_leaf_10"></div><div class="dz_loading_leaf dz_loading_leaf_11"></div>'
            +'</div>'
        +'</div>'
    +'</div>';
    $("body").append(loadingStr);
}