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
        <section class="panel panel-pad panel-bottom bar">
            <!-- select start -->
            <form class="form-horizontal">
                <div class="form-group bar ">
                    <label class="col-xs-2 control-label">被测系统</label>
                    <div class="col-xs-2">
                        <select class="form-control" id="autSelect">
                        </select>
                    </div>
                    <label class="col-xs-1 control-label">功能点</label>
                    <div class="col-xs-2">
                        <select class="form-control" id="transactSelect" v-model="transid">
                        </select>
                    </div>
                </div>
            </form>
            <!-- select end -->
        </section>
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
                <label class="col-xs-1 control-label">接口编码</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intIdInput" >
                    </div>
                    <label class="col-xs-1 control-label">接口名称</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intNameInput" >
                    </div>
                    <label class="col-xs-1 control-label">版本号</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intVersionInput" >
                    </div>
                    <label class="col-xs-1 control-label">创建时间</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intCreatTimeInput" readonly >
                    </div>
                </div>
                <div class="form-group">
                <label class="col-xs-1 control-label">创建者</label>
                <div class="col-xs-2">
                    <select class="form-control" type="text" id="intCreatorIdInput" >
                    </select>
                </div>
                    <label class="col-xs-1 control-label">维护者</label>
                    <div class="col-xs-2">
                        <select class="form-control" type="text" id="intMaintainerIdInput" >
                        </select>
                    </div>
                    <label class="col-xs-1 control-label">认证方法</label>
                    <div class="col-xs-2">
                        <select class="form-control" size="1" id="authType" style="height:34px">
                            <option value="0">HTTP Basic</option>
                            <option value="1">HTTP Digest</option>
                            <option value="2">WSSE(WS-Security)</option>
                            <option value="3">API KEY</option>
                            <option value="4">OAUTH2</option>
                        </select>                    
                    </div>
                    <label class="col-xs-1 control-label">修改时间</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intModifyTimeInput" readonly>
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
                            <option value="1">HTTP</option>
                            <option value="2">FTP</option>
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
                        <textarea class="form-control" id="intDecTextArea" ></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-1 control-label">报文编码</label>
                    <div class="col-xs-2">
                        <select class="form-control" type="text" id="bodyDecode" >
                        <option value="0">？</option>
                        <option value="1">？？</option>
                        <option value="2">？？？</option>
                        </select>
                    </div>
                    <div class="col-xs-1">
                    <button class="btn btn-info" type="button" @click="queryParaListSave">
                        <span>编码</span>
                    </button>
                    </div>
                    <label class="col-xs-1 control-label">报文解码</label>
                    <div class="col-xs-2">
                        <select class="form-control" type="text" id="bodyDecode" >
                        <option value="0">？</option>
                        <option value="1">？？</option>
                        <option value="2">？？？</option>
                        </select>
                    </div>
                    <div class="col-xs-1">
                    <button class="btn btn-info" type="button" @click="queryParaListSave">
                        <span>解码</span>
                    </button>
                    </div>
                </div> 
                <ul class="nav nav-tabs" id="navSwitchBar" style="padding-left:10px">
                    <li role="presentation" class="active"><a @click="navSwitch(0)">Query</a></li>
                    <li role="presentation"><a @click="navSwitch(1)">Header</a></li>
                    <li role="presentation"><a @click="navSwitch(2)">Body</a></li>                 
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
                    <div class="form-group" style="display:none">
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
                    <div class="form-group" style="display:none">
                        <div class="col-xs-1"></div>
                        <div class="col-xs-0">
                            <button class="btn btn-info" type="button" @click="headerParaListSave">
                                <span>保存</span>
                            </button>
                        </div>
                    </div>  
                </div>
                <div class="form-group switchSupPage" id="messagesPage" style="display:none">
                    <div class="row">
                        <div class="col-xs-1"></div>
                        <label class="col-xs-1 control-label">报文格式</label>
                        <div class="col-xs-2">
                            <select class="form-control" type="text" id="bodyFormat" >
                            <option value="1">JSON</option>
                            <option value="2">XML</option>
                            <option value="3">JavaScript</option>
                            </select>
                        </div>
                        <div class="col-xs-5">
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-1"></div>
                        <label class="col-xs-1 control-label">报文内容</label>
                        <div class="col-xs-5">
                        <textarea class="form-control" id="bodyContent" style="height:532;" ></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-group switchSupPage" id="messages1Page" style="display:none">
                    <label class="col-xs-1 control-label">messages1</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" name="intName" >
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
            </form>
            
        </section>
    </div>
</div>
<!-- failModal start -->
<div class="modal fade" id="failModal" tabindex="-1" role="dialog" aria-labelledby="failModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">操作失败</h4>
            </div>
            <div class="modal-body">
                <h4>{{failMSG}}</h4>
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-success" type="button">确定</button>
            </div>
        </div>
    </div>
</div>
<!-- failModal end -->
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
        var _this = this;
        return {
            autId: '',
            transid: '',
            failMSG:'操作出问题了呢！',
        }
    },
    ready: function() {
        var _this = this;
        _this.getAutandTrans();
        _this.getUser();
        $('#autSelect').change(function() {
            _this.transactSelect();
            _this.autId = $('#autSelect').val(); 
            _this.transid = $('#transactSelect').val();
           
        });
        $('#transactSelect').change(function() {
            _this.transid = $('#transactSelect').val();
            _this.getInterfaces();
        });
        $('input[name="queryParaName"]').last().change(queryParaAdd);
        $('input[name="headerParaName"]').last().change(headerParaAdd);
    },
    methods: {
        getAutandTrans: function() {
            var _this = this;
            $.ajax({
                url: address3 + "aut/queryListAut",
                type: "POST",
                contentType:'application/json',
                success: function(data) {
                    if (data.respCode !== '0000') {
                        Vac.alert('查询测试系统失败');
                        return;
                    }
                    var autList = data.autRespDTOList;
                    var str = "";
                    for (var i = 0; i < autList.length; i++) {
                        str += " <option value='" + autList[i].id + "' >" + autList[i].nameMedium + "</option> ";
                    }
                    $('#autSelect').html(str);
                    _this.autId = sessionStorage.getItem("autId");
                    $("#autSelect").val(_this.autId);
                    $.ajax({
                        url: address3 + 'transactController/queryTransactsByAutId',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({'id': _this.autId}),
                        success: function(data) {
                            if (data.respCode !== '0000') {
                                Vac.alert('查询测试系统失败');
                                return;
                            }
                            var transactList = data.transactRespDTOs;
                            var str = "";
                            for (var i = 0; i < transactList.length; i++) {
                                if(transactList[i].transType!=null&&transactList[i].transType==2)
                                str += " <option value='" + transactList[i].id + "'>" + transactList[i].nameMedium + "</option> ";
                            }
                            _this.interfacesExist(str);
                            $('#transactSelect').html(str);
                            _this.transid = sessionStorage.getItem("transactId");
                            $("#transactSelect").val(_this.transid);
                            _this.getInterfaces();
                        }
 
                    });
                }
            });
        },
        transactSelect: function() {
            var val = $('#autSelect').val();
            var _this = this;
            Vac.ajax({
                async: true,
                url: address3 + 'transactController/queryTransactsByAutId',
                data: JSON.stringify({'id': val}),
                type: "POST",
                success: function(data) {
                    if (data.respCode === '0000') {
                        var transactList = data.transactRespDTOs;
                        var str = "";
                        for (var i = 0; i < transactList.length; i++) {
                            if(transactList[i].transType!=null&&transactList[i].transType==2)
                            str += " <option value='" + transactList[i].id + "'>" + transactList[i].nameMedium + "</option> ";
                        }
                        _this.interfacesExist(str);
                        $('#transactSelect').html(str);
                        _this.transid = $('#transactSelect').val();
                    } else {
                        Vac.alert(respMsg);
                    }
                }
            });
        },
        getInterfaces: function() {
            var _this = this;
            var val = this.transid;
            Vac.ajax({
                async: true,
                url: address3 + 'interface/querySingleInterface',
                data: JSON.stringify({'id': val}),
                type: "POST",
                success: function(data) {
                    if (data.respCode === '0000') {
                        $("#intNameInput").val(data.name);
                        $("#intIdInput").val(data.interfaceCode);
                        $("#intVersionInput").val(data.version);
                        $("#intProtocolSelect").val(data.protocol);
                        $("#intUrlPathInput").val(data.urlPath);
                        $("#intDecTextArea").val(data.description);
                        $("#intCreatorIdInput").val(data.creatorId);
                        $("#intCreatTimeInput").val(getDate(data.createTime));
                        $("#intModifyTimeInput").val(getDate(data.modifyTime));
                        $("#intStatusSelect").val(data.status);
                        $("#intMethodSelect").val(data.method);
                        $("#bodyContent").val(data.bodyContent);
                        $("#bodyFormat").val(data.bodyFormat);

                        status
                    } else {
                        alert(data.respMsg+"ss");
                    }
                }
            });
        },
        getUser: function(){
            $.ajax({
                url: address3+"userController/selectAllUsername",
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    
                }),
                success:function(data){
                    if(data.respCode=='0000'){
                        let userList=data.list;
                        for(let item of userList){
                            $('#intCreatorIdInput').append(`<option value="${item.id}">${item.username}</option>`);
                            $('#intMaintainerIdInput').append(`<option value="${item.id}">${item.username}</option>`);
                        }
                    }
                }
            });
        },
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
            var _this = this;
            var val = this.transid;
             // $('#queryParaListBody').find('.queryParaRow').each(function() {
            //     var queryParaName=$(this).find("input[name=queryParaName]").val(),
            //     queryParaDec=$(this).find("input[name=queryParaDec]").val(),
            //     checkboxVal=$(this).find("input[type=checkbox]").val(),
            //     singerQuery={};
            //     if(queryParaName!=""){
            //         singerQuery.name=queryParaName;
            //         singerQuery.desc=queryParaDec;
            //         singerQuery.val=checkboxVal;
            //         query.push(singerQuery);
            //     }
            // });
            // var header=[];
            // $('#headerParaListBody').find('.headerParaRow').each(function() {
            //     var headerParaName=$(this).find("input[name=headerParaName]").val(),
            //     headerParaVal=$(this).find("input[name=headerParaVal]").val(),
            //     headerParaDec=$(this).find("input[name=headerParaDec]").val(),
            //     singerHeader={};
            //     if(headerParaName!=""){
            //         singerHeader.name=headerParaName;
            //         singerHeader.val=headerParaVal;
            //         singerHeader.desc=headerParaDec;
            //         header.push(singerHeader);
            //     }
            // });
            var header='[';
            $('#headerParaListBody').find('.headerParaRow').each(function() {
                var headerParaName=$(this).find("input[name=headerParaName]").val(),
                headerParaVal=$(this).find("input[name=headerParaVal]").val(),
                headerParaDec=$(this).find("input[name=headerParaDec]").val(),
                singerHeader={};
                if(headerParaName!=""){
                    header +='{"name":"'+headerParaName+'"desc":"'+headerParaDec+'"val":"'+headerParaVal+'"},';
                }
            });
            var query='[';
            $('#queryParaListBody').find('.queryParaRow').each(function() {
                var queryParaName=$(this).find("input[name=queryParaName]").val(),
                queryParaDec=$(this).find("input[name=queryParaDec]").val(),
                checkboxVal=$(this).find("input[type=checkbox]").val(),
                singerQuery={};
                if(queryParaName!=""){
                   query +='{"name":"'+queryParaName+'"desc":"'+queryParaDec+'"val":"'+queryParaVal+'"},';
                }
            });
            query =query.slice(0,query.length-1)
            query +=']';
            Vac.ajax({
                async: true,
                url: address3 + 'interface/modifySingleInterface',
                data: JSON.stringify({
                    "id": $("#transactSelect").val(),
                    "name": $("#intNameInput").val(),
                    "interfaceCode": $("#intIdInput").val(),
                    "systemId": $("#autSelect").val(),
                    "groupName": null,
                    "protocol":  $("#intProtocolSelect").val(),
                    "urlPath": $("#intUrlPathInput").val(),
                    "status":  $("#intStatusSelect").val(),
                    "description": $("#intDecTextArea").val(),
                    "version": $("#intVersionInput").val(),
                    "creatorId": 3,
                    "maintainerId": 3,
                    "createTime": $("#intCreatTimeInput").val(),
                    "modifyTime": $("#intmodifyTimeInput").val(),
                    "method":$("#intMethodSelect").val(),
                    "authType": null,
                    "authContent": null,
                    "query": query,
                    "header": header,
                    "bodyFormat": 1,
                    "rawFormat": 2,
                    "bodyContent": $("#bodyContent").val(),
                    "bodyParseContent": null,
                    "dataDictList": null,
                    "preRequestScript":null,
                }),
                type: "POST",
                success: function(data) {
                    if (data.respCode === '0000') {
                        $('#successModal').modal();
                        _this.getInterfaces();
                    } else {
                        alert(data.respMsg+"ss");
                    }
                }
            });
        },

        queryParaListSave: function() {
            var query=[],
            singerQuery={};
            $('#queryParaListBody').find('.queryParaRow').each(function() {
                 var queryParaName=$(this).find("input[name=queryParaName]").val(),
                 queryParaDec=$(this).find("input[name=queryParaDec]").val(),
                 checkboxVal=$(this).find("input[type=checkbox]").val();
                 if(queryParaName!=""){
                    singerQuery.name=queryParaName;
                    singerQuery.desc=queryParaDec;
                    singerQuery.val=checkboxVal;
                    query.push(singerQuery);
                }
            });
            console.log(query);
        },

        headerParaListSave: function() {
            var header=[],
            singerHeader={};
            $('#headerParaListBody').find('.headerParaRow').each(function() {
                var headerParaName=$(this).find("input[name=headerParaName]").val(),
                headerParaVal=$(this).find("input[name=headerParaVal]").val(),
                headerParaDec=$(this).find("input[name=headerParaDec]").val();
                if(headerParaName!=""){
                    singerHeader.name=headerParaName;
                    singerHeader.val=headerParaVal;
                    singerHeader.desc=headerParaDec;
                    header.push(singerHeader);
                }
            });
            console.log(header);
        },
        interfacesExist: function( str ) {
            if(str==""){
                this.failMSG="该测试系统中不存在接口类型的功能点";
                $('#failModal').modal();
            }
        },
    } 
});
function getDate(time) {
    var date = new Date(time);
    return date.toLocaleDateString() + ' ' + date.toTimeString().slice(0, 8);
}
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
