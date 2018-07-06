var template_int = `
<div>
<!-- breadcrumb start -->
<div class="row" v-if="breadShow">
    <div class="col-xs-12">
        <ul class="breadcrumb">
            <li><a href="aut.html"><i class="icon-home"></i> 测试系统</a></li>
            <li><a href="transact.html">功能点</a></li>
            <li class="active">元素库</li>
        </ul>
    </div>
</div>
<div class="row">
    <div class="col-xs-12">
        <section class="panel">
            <header class="panel-heading">
                接口管理
            </header>
            <form class="form-horizontal panel-pad">
                <div class="form-group">
                    <label class="col-xs-1 control-label">接口名称</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intNameInput" >
                    </div>
                    <label class="col-xs-1 control-label">创建者</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intCreatorIdInput" >
                    </div>
                    <label class="col-xs-1 control-label">创建时间</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intCreatTimeInput" >
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-1 control-label">版本号</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intVersionInput" >
                    </div>
                    <label class="col-xs-1 control-label">维护者</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intMaintainerIdInput" >
                    </div>
                    <label class="col-xs-1 control-label">修改时间</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intModifyTimeInput" >
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-1 control-label">开发状态</label>
                    <div class="col-xs-2">
                        <select class="form-control" size="1" id="intStatusSelect" style="height:34px">
                            <option value="0">开发中</option>
                            <option value="1">开发完成</option>
                            <option value="2">已废弃</option>                            
                        </select>
                    </div>
                    <label class="col-xs-1 control-label">通信类型</label>
                    <div class="col-xs-2">
                        <select class="form-control" size="1" id="intProtocolSelect" style="height:34px">
                            <option value="0">HTTP</option>
                            <option value="1">FTP</option>
                        </select>                    
                    </div>
                    <label class="col-xs-1 control-label">请求方法</label>
                    <div class="col-xs-2">
                        <select class="form-control" size="1" id="intMethodSelect" style="height:34px">
                            <option value="0">GET</option>
                            <option value="1">POST</option>
                            <option value="2">PUT</option>
                            <option value="3">DELETE</option>
                        </select>                    
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-1 control-label">接口路径</label>
                    <div class="input-group col-xs-8">
                        <span class="input-group-addon" id="basic-addon3">https://example.com/users/</span>
                        <input type="text" class="form-control" id="intUrlPathInput" aria-describedby="basic-addon3">
                    </div>
                </div>   
                <div class="form-group">
                    <label class="col-xs-1 control-label">接口简介</label>
                    <div class="col-xs-8">
                        <textarea class="form-control" id="intDecTextArea"></textarea>
                    </div>
                </div>   
                <div class="form-group">
                    <div class="col-xs-8">
                    </div>
                    <div class="col-xs-1">
                        <button class="btn btn-info" type="button" @click="intInfoSave">
                            <span>保存</span>
                        </button>
                    </div>
                </div>
                <ul class="nav nav-tabs" id="navSwitchBar" style="padding-left:10px">
                    <li role="presentation" class="active"><a @click="navSwitch(0)">Query</a></li>
                    <li role="presentation"><a @click="navSwitch(1)">Header</a></li>
                    <li role="presentation"><a @click="navSwitch(2)">Messages</a></li>
                    <li role="presentation"><a @click="navSwitch(3)">Messages1</a></li>                    
                </ul>


                <div class="form-group switchSupPage" id="queryPage" style="display:block">
                    <div class="form-group" id="queryParaListBody">
                        <div class="form-group queryParaRow">
                            <div class="col-xs-1"></div>
                            <div class="col-xs-3">
                                <div class="input-group">
                                    <input class="form-control" type="text" name="queryParaName" placeholder="请填写参数名称">   
                                    <span class="input-group-addon">
                                        <input type="checkbox" aria-label="query参数名称">
                                        必输参数
                                    </span>                         
                                </div>
                            </div>
                            <div class="col-xs-5">
                                <input class="form-control" type="text" name="queryParaDec" placeholder="请填写备注">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-1"></div>
                        <div class="col-xs-0">
                            <button class="btn btn-info" type="button" @click="queryParaListSave">
                                <span>保存</span>
                            </button>
                        </div>
                    </div>             
                </div>
                <div class="form-group switchSupPage" id="headerPage" style="display:none">
                    <div class="form-group" id="headerParaListBody">
                        <div class="form-group headerParaRow">
                            <div class="col-xs-1"></div>
                            <div class="col-xs-2">
                                <input class="form-control" type="text" name="headerParaName" placeholder="请填写header">   
                            </div>
                            <div class="col-xs-2">
                                <input class="form-control" type="text" name="headerParaVal" placeholder="请填写value">
                            </div>
                            <div class="col-xs-4">
                                <input class="form-control" type="text" name="headerParaDec" placeholder="请填写备注">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-1"></div>
                        <div class="col-xs-0">
                            <button class="btn btn-info" type="button" @click="headerParaListSave">
                                <span>保存</span>
                            </button>
                        </div>
                    </div>  
                </div>
                <div class="form-group switchSupPage" id="messagesPage" style="display:none">
                    <label class="col-xs-1 control-label">messages</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" name="intName" >
                    </div>
                </div>
                <div class="form-group switchSupPage" id="messages1Page" style="display:none">
                    <label class="col-xs-1 control-label">messages1</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" name="intName" >
                    </div>
                </div>
            </form>
            
        </section>
    </div>
</div>
`;
var interfacesManagement = Vue.extend({

    name:'interfaces-management',
    template: template_int,
    props: {
        'breadShow': {
            type: Boolean,
            default: true
        }, 
    },
    data: function() {


    },
    ready: function() {
        $('input[name="queryParaName"]').last().change(queryParaAdd);
        $('input[name="headerParaName"]').last().change(headerParaAdd);
        
    },
    methods: {
        navSwitch: function(tag) {
            var tmp = $('#navSwitchBar').find('li');
            for (let index = 0; index < tmp.length; index++) {
                tmp[index].className = '';
            }
            tmp[tag].className = 'active';
            
            tmp = $('.switchSupPage');
            for (let index = 0; index < tmp.length; index++) {
                tmp[index].style.display='none';                
            }
            tmp[tag].style.display='block';
        },

        intInfoSave :function() {
            alert("intInfoSave-Button Clicked!");
        },

        queryParaListSave: function() {
            alert("queryParaListSave-Button Clicked!");
        },

        headerParaListSave: function() {
            alert("headerParaListSave-Button Clicked!");
        },

    } 
});

function queryParaAdd() {
    $('input[name="queryParaName"]').last().unbind('change',queryParaAdd);    
    
    var deleteButtonTr = `
                    <div class="col-xs-0">
                        <button class="btn" type="button" onclick="queryParaRowDelete(event)" style="color:red;background:transparent">
                            <i class="icon-remove"></i>
                        </button>
                    </div>`;
    $('.queryParaRow').last().append(deleteButtonTr);

    var queryParaTr = `
                <div class="form-group queryParaRow">
                    <div class="col-xs-1">
                
                    </div>
                    <div class="col-xs-3">
                        <div class="input-group">
                            <input class="form-control" type="text" name="queryParaName" placeholder="请填写参数名称">   
                            <span class="input-group-addon">
                                <input type="checkbox" aria-label="query参数名称">
                                必输参数
                            </span>                         
                        </div>
                    </div>
                    <div class="col-xs-5">
                        <input class="form-control" type="text" name="queryParaDec" placeholder="请填写备注">
                    </div>
                </div>`;
    $('#queryParaListBody').append(queryParaTr);

    $('input[name="queryParaName"]').last().change(queryParaAdd);    
}

function queryParaRowDelete(e) {
    var tmp = $(e.target).parent().parent().find('button').parent().parent();
    tmp.remove();
}

function headerParaAdd() {
    $('input[name="headerParaName"]').last().unbind('change',headerParaAdd);    
    
    var deleteButtonTr = `
                    <div class="col-xs-0">
                        <button class="btn" type="button" onclick="headerParaRowDelete(event)" style="color:red;background:transparent">
                            <i class="icon-remove"></i>
                        </button>
                    </div>`;
    $('.headerParaRow').last().append(deleteButtonTr);

    var headerParaTr = `
                <div class="form-group headerParaRow">
                    <div class="col-xs-1"></div>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" name="headerParaName" placeholder="请填写header">   
                    </div>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" name="headerParaVal" placeholder="请填写value">
                    </div>
                    <div class="col-xs-4">
                        <input class="form-control" type="text" name="headerParaDec" placeholder="请填写备注">
                    </div>
                </div>`;
    $('#headerParaListBody').append(headerParaTr);

    $('input[name="headerParaName"]').last().change(headerParaAdd);    
}

function headerParaRowDelete(e) {
    var tmp = $(e.target).parent().parent().find('button').parent().parent();
    tmp.remove();
}

Vue.component('interfaces-management', interfacesManagement)
