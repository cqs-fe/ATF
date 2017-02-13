var Alert = function(){
    this.sure = function(){};
    this.cancel = function(){};
    this.sureBtnText = "确认";
    this.cancelBtnText = "取消";

    this.title = "";
    this.content = "不知道提示啥";
    this.type = "alert";
}
Alert.prototype = {
    init: function(data){
        var className = $(".alert-out").attr("class");
        var _this = this;
        this.sure = data.sure || function(){_this.hide()};
        this.cancel = data.cancel || function(){_this.hide()};
        this.sureBtnText = data.sureBtnText || this.sureBtnText;
        this.cancelBtnText = data.cancelBtnText || this.cancelBtnText;

        this.title = data.title || this.title;
        this.content = data.content || this.title;
        this.type = data.type || this.type;

        if(className==null||className==""&&className.indexOf(this.type)==-1){
            var alertStr = "";
            var headStr = "";
            if(this.title){
                headStr = '<div class="alert-head color-red">'+this.title+'</div>';
            }
            if(this.type == "alert"){
                alertStr = '<div class="alert-out alert">'
                            +'<div class="alert-body">'
                                +headStr
                                +'<div class="alert-message">'
                                    +'<p class="alert-word">'+this.content+'</p>'
                                +'</div>'
                               +'<div class="alert-foot"><span class="alert-sure sure color-red link">'+this.sureBtnText+'</span></div>'
                            +'</div>'
                            +'<div class="alert-mask"></div>'
                        +'</div>';
            }else if(this.type == "confirm"){
                alertStr = '<div class="alert-out confirm">'
                            +'<div class="alert-body">'
                                +headStr
                                +'<div class="alert-message">'
                                    +'<p class="alert-word">'+this.content+'</p>'
                                +'</div>'
                               +'<div class="alert-foot flex"><span class="sure flex-item color-red link">'+this.sureBtnText+'</span><span class="cancel flex-item color-96 link">'+this.cancelBtnText+'</span></div>'
                            +'</div>'
                            +'<div class="alert-mask"></div>'
                        +'</div>';
            }
            $("body").append(alertStr);
        }else{
            $(".alert-out .alert-word").html(this.content);
            $(".alert-out .sure").html(this.sureBtnText);
            $(".alert-out .cancel").html(this.cancelBtnText);
        }
        this.bindEvent();
        setTimeout(function(){
            _this.show();
        },0);
    },
    bindEvent:function(){
        $(".alert-out").on("click", ".sure" , this.sure);
        $(".alert-out").on("click", ".cancel" , this.cancel);
    },
    show:function(){
        $(".alert-out").show();
        $(".alert-out").addClass('alert-show');
    },
    hide:function(){
        $(".alert-out").addClass('alert-hide').find('.alert-body').transitionEnd(function(e){
            $(".alert-out").remove();
        });
        this.sure = function(){};
        this.cancel = function(){};
        this.sureBtnText = "确认";
        this.cancelBtnText = "取消";

        this.title = "";
        this.content = "不知道提示啥";
        this.type = "alert";
    },
}

var dialog = new Alert();

module.exports = {
    show: function(data) {
        return dialog.init(data);
    },
    hide: function(){
        return dialog.hide();
    }
}