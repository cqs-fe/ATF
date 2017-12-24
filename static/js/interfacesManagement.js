var template_int = `
<div>
<!-- breadcrumb start -->
<div class="row" v-if="breadShow">
    <div class="col-xs-12">
        <ul class="breadcrumb">
            <li><a href="aut.html"><i class="icon-home"></i> 测试系统</a></li>
            <li><a href="transact.html">功能点</a></li>
            <li class="active">接口管理</li>
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
                    <label class="col-xs-1 control-label">版本号</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intVersionInput" >
                    </div>
                    <label class="col-xs-1 control-label">开发状态</label>
                    <div class="col-xs-2">
                        <select class="form-control" size="1" id="intStatusSelect" style="height:34px">
                            <option value="0">开发中</option>
                            <option value="1">开发完成</option>
                            <option value="2">已废弃</option>                            
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-1 control-label">分组名称</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intGroupNameInput" >
                    </div>
                    <label class="col-xs-1 control-label">编码</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intCodeInput" >
                    </div>
                    <label class="col-xs-1 control-label">通信类型</label>
                    <div class="col-xs-2">
                        <select class="form-control" size="1" id="intProtocolSelect" style="height:34px">
                            <option value="0">HTTP</option>
                            <option value="1">FTP</option>
                        </select>                    
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-1 control-label">创建者</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intCreatorNameInput" disabled>
                    </div>
                    <label class="col-xs-1 control-label">维护者</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intMaintainerNameInput" disabled>
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

                    <label class="col-xs-1 control-label">创建时间</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intCreateTimeInput" disabled>
                    </div>
                    <label class="col-xs-1 control-label">修改时间</label>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" id="intModifyTimeInput" disabled>
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
                        <textarea class="form-control" id="intDescTextArea"></textarea>
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
                            <div class="col-xs-2">
                                <input class="form-control" type="text" name="queryParaName" placeholder="请填写参数名称">   
                            </div>
                            <div class="col-xs-2">
                                <input class="form-control" type="text" name="queryParaVal" placeholder="请填写value">
                            </div>
                            <div class="col-xs-4">
                                <input class="form-control" type="text" name="queryParaDesc" placeholder="请填写备注">
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
                                <input class="form-control" type="text" name="headerParaDesc" placeholder="请填写备注">
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
        <!-- successModal start -->
        <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">操作成功</h4>
                    </div>
                    <div class="modal-body">
                        <h4>操作成功！</h4>
                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-success" type="button">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- successModal end -->
        <!-- failModal start -->
        <div class="modal fade" id="failModal" tabindex="-1" role="dialog" aria-labelledby="failModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">操作失败</h4>
                    </div>
                    <div class="modal-body">
                        <h4>操作失败！</h4>
                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-success" type="button">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- failModal end -->
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
        getInterfacesInfo();
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

            if($('#intNameInput').val()===""){
                alert('接口名称不能为空！');
            }
            else{

                //封装queryParaList
                var queryParaList = '[',
                pRow = $('#queryParaListBody .queryParaRow');

                for (var i = 0; i < pRow.length; i++) {
                    if($('#queryParaListBody input[name="queryParaName"]')[i].value!==""){
                        var r = '{';
                        r +=  "\"name\":\"" + $('#queryParaListBody input[name="queryParaName"]')[i].value + "\","
                            + "\"desc\":\"" + $('#queryParaListBody input[name="queryParaDesc"]')[i].value + "\","
                            + "\"val\":\"" + $('#queryParaListBody input[name="queryParaVal"]')[i].value;
                            
                        r += "\"},";
                        queryParaList += r;
                    }
                }
                if(queryParaList.length>1){
                    queryParaList = queryParaList.substring(0, queryParaList.length - 1);                    
                }
                queryParaList += ']';
                console.log(queryParaList);

                //封装headerParaList
                var headerParaList = '[',
                pRow = $('#headerParaListBody .headerParaRow');

                for (var i = 0; i < pRow.length; i++) {
                    if($('#headerParaListBody input[name="headerParaName"]')[i].value!==""){
                        var r = '{';
                        r +=  "\"name\":\"" + $('#headerParaListBody input[name="headerParaName"]')[i].value + "\","
                            + "\"desc\":\"" + $('#headerParaListBody input[name="headerParaDesc"]')[i].value + "\","
                            + "\"val\":\"" + $('#headerParaListBody input[name="headerParaVal"]')[i].value;
                            
                        r += "\"},";
                        headerParaList += r;
                    }

                }
                if(headerParaList.length>1){
                    headerParaList = headerParaList.substring(0, headerParaList.length - 1);                    
                }
                headerParaList += ']';
                console.log(headerParaList);


                $.ajax({
                    url: 'http://10.108.223.23:8080/ATFCloud2.0/interfaceController/update',
                    type: 'post',
                    data: {
                        "id":1,
                        // "id": sessionStorage.getItem("transactId"),
                        "systemId": sessionStorage.getItem("autId"),
                        "name": $('#intNameInput').val(),
                        "groupName": null,
                        "protocol": $('#intProtocolSelect').val(),
                        "urlPath": $('#intUrlPathInput').val(),
                        "status": $('#intStatusSelect').val(),
                        "description": $('#intDescTextArea').val(),
                        "version": $('#intVersionInput').val(),
                        // "creatorName": $('#intCreatorNameInput').val(),
                        "createTime": $('#intCreateTimeInput').val(),
                        // "maintainerId": $('#intMaintainerNameInput').val(),
                        "method": $('#intMethodSelect').val(),
                        "query": queryParaList,
                        "header": headerParaList,
                        "creatorId": 2

                    },
                    success: function(data) {
                        $('#successModal').modal();
                        getInterfacesInfo();
            
                    },
                    error: function() {
                        $('#failModal').modal();
                    }

                });
            }

           

        },

        queryParaListSave: function() {
            alert("queryParaListSave-Button Clicked!");
        },

        headerParaListSave: function() {
            alert("headerParaListSave-Button Clicked!");
        },

    } 
});

function getInterfacesInfo() {
    $.ajax({
        // url: address + 'interfaceController/selectById',
        url: 'http://10.108.223.23:8080/ATFCloud2.0/interfaceController/selectById',
        type: 'post',
        data: {
            id: 1
            // id: sessionStorage.getItem("transactId")
        },
        success: function(data) {
            var interfaceInfo = data.interfaceInfo;
            $('#intNameInput').val(interfaceInfo.name);
            $('#intCreatorNameInput').val('接口缺少该字段');
            $('#intCreateTimeInput').val(interfaceInfo.createTime);
            $('#intVersionInput').val(interfaceInfo.version);
            $('#intMaintainerNameInput').val('接口缺少该字段');
            $('#intModifyTimeInput').val(interfaceInfo.modifyTime);
            $('#intStatusSelect').val(interfaceInfo.status).attr('selected',true);
            $('#intProtocolSelect').val(interfaceInfo.protocol).attr('selected',true);
            $('#intMethodSelect').val(interfaceInfo.method).attr('selected',true);
            $('#intUrlPathInput').val(interfaceInfo.urlPath);
            $('#intDescTextArea').val(interfaceInfo.description);
            
            //query列表封装
            var queryParaList = interfaceInfo.query;
            $('#queryParaListBody').children().remove();

            var queryParaTr = `
            <div class="form-group queryParaRow">
                <div class="col-xs-1">
            
                </div>
                <div class="col-xs-2">
                    <input class="form-control" type="text" name="queryParaName" placeholder="请填写参数名称">   
                </div>
                <div class="col-xs-2">
                    <input class="form-control" type="text" name="queryParaVal" placeholder="请填写value">
                </div>
                <div class="col-xs-4">
                    <input class="form-control" type="text" name="queryParaDesc" placeholder="请填写备注">
                </div>
            </div>`;

            var deleteButtonTr = `
            <div class="col-xs-0">
                <button class="btn" type="button" onclick="queryParaRowDelete(event)" style="color:red;background:transparent">
                    <i class="icon-remove"></i>
                </button>
            </div>`;

            if(queryParaList===null){
                $('#queryParaListBody').append(queryParaTr);                               
            }
            else{
                for (let i = 0; i < queryParaList.length; i++) {
        
                    $('#queryParaListBody').append(queryParaTr);
                    $('#queryParaListBody input[name=queryParaName]').last().val(queryParaList[i].name);                 
                    $('#queryParaListBody input[name=queryParaVal]').last().val(queryParaList[i].val);
                    $('#queryParaListBody input[name=queryParaDesc]').last().val(queryParaList[i].desc);
                    $('.queryParaRow').last().append(deleteButtonTr);                 
                }
                $('#queryParaListBody').append(queryParaTr);                               
            }
 

            $('input[name="queryParaName"]').last().change(queryParaAdd);


            //header列表封装
            var headerParaList = interfaceInfo.header;
            $('#headerParaListBody').children().remove();

            var headerParaTr = `
            <div class="form-group headerParaRow">
                <div class="col-xs-1">
            
                </div>
                <div class="col-xs-2">
                    <input class="form-control" type="text" name="headerParaName" placeholder="请填写参数名称">   
                </div>
                <div class="col-xs-2">
                    <input class="form-control" type="text" name="headerParaVal" placeholder="请填写value">
                </div>
                <div class="col-xs-4">
                    <input class="form-control" type="text" name="headerParaDesc" placeholder="请填写备注">
                </div>
            </div>`;

            var deleteButtonTr = `
            <div class="col-xs-0">
                <button class="btn" type="button" onclick="headerParaRowDelete(event)" style="color:red;background:transparent">
                    <i class="icon-remove"></i>
                </button>
            </div>`;

            if(headerParaList===null){
                $('#headerParaListBody').append(headerParaTr);                      
            }
            else{
                for (let i = 0; i < headerParaList.length; i++) {
        
                    $('#headerParaListBody').append(headerParaTr);
                    $('#headerParaListBody input[name=headerParaName]').last().val(headerParaList[i].name);                 
                    $('#headerParaListBody input[name=headerParaVal]').last().val(headerParaList[i].val);
                    $('#headerParaListBody input[name=headerParaDesc]').last().val(headerParaList[i].desc);
                    $('.headerParaRow').last().append(deleteButtonTr);                 
                }

                $('#headerParaListBody').append(headerParaTr);  
            }
    
            $('input[name="headerParaName"]').last().change(headerParaAdd);

        } 
    });
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
                    <div class="col-xs-2">
                        <input class="form-control" type="text" name="queryParaName" placeholder="请填写参数名称">      
                    </div>
                    <div class="col-xs-2">
                        <input class="form-control" type="text" name="queryParaVal" placeholder="请填写value">
                    </div>
                    <div class="col-xs-4">
                        <input class="form-control" type="text" name="queryParaDesc" placeholder="请填写备注">
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
                        <input class="form-control" type="text" name="headerParaDesc" placeholder="请填写备注">
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
