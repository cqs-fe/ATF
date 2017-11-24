var template_obj = `
<div style="min-height: 0;">
    <div class="row" v-if="breadShow">
        <div class="col-xs-12">
            <ul class="breadcrumb">
                <li><a href="aut.html"><i class="icon-home"></i> 测试系统</a></li>
                <li><a href="transact.html"> 功能点</a></li>
                <li class="active"> 对象库</li>
            </ul>
        </div>
    </div>
    <div class="row" v-if="topSelect">
        <div class="col-xs-12">
            <section class="panel panel-pad">
                <!-- select start -->
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-xs-2 control-label">所属被测系统</label>
                        <div class="col-xs-2">
                            <select class="form-control" id="autSelect">
                            </select>
                        </div>
                        <label class="col-xs-2 control-label">所属功能点</label>
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
        <div class="col-xs-4">
            <section class="panel tree-panel">
                <header class="panel-heading"  v-if="top-select">
                    对象库
                </header>
                <div id="menuContent" class="menuContent treeMenu">
                    <div class="form-group panel-pad form-horizontal">
                        <div class="col-xs-6">
                            <input type="text" name="" placeholder="请输入对象名称" value="" class="form-control empty input-sm"  id="keyword">
                        </div>
                        <a class="btn btn-info btn-sm" id="search-btn">搜索</a>
                    </div>
                    <div class="form-group form-horizontal">
                        <div class="col-xs-12">
                            <a class="btn btn-info btn-sm" data-toggle="modal" href="#addObjModal">添加对象</a>
                            <a class="btn btn-info btn-sm" @click="delObj">删除对象</a>
                        </div>
                    </div>
                    <ul id="objectTree" class="ztree tree"></ul>
                </div>
            </section>
        </div>
        <div class="col-xs-8">
            <section class="panel" id="">
                <div class="elementContent">
                     <header class="panel-heading" v-if="topSelect">
                        {{objName}}
                     </header>
                    <form class="form-horizontal panel-pad" id="objForm">
                        <div class="form-group">
                            <label class="col-xs-2 control-label">名称</label>
                            <div class="col-xs-3">
                                <input type="text" name="name" class="form-control" :value="objName">
                            </div>
                            <label for="" class="col-xs-2 control-label">类型</label>
                            <div class="col-xs-3">
                                <select class="form-control" id="classtypeSelect">
                                    <option value="">--选择控件类型--</option>
                                    <option v-for="item in classtypeList" :value="item.classId">{{item.className}}</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <section class="panel small-panel">
                        <header class="panel-heading">属性</header>
                        <div class="property">
                            主属性
                            <a class="btn btn-white btn-sm pull-right" @click="addProp($event)"><i class="icon-plus"></i></a>
                            <a class="btn btn-white btn-sm pull-right" @click="delProp($event)"><i class="icon-minus"></i></a>
                        </div>
                        <div class="property">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style="width:5%"></th>
                                        <th>属性名</th>
                                        <th>属性值</th>
                                    </tr>
                                </thead>
                                <tbody id="mainProp">
                                    <tr>
                                        <td>
                                            <input type="checkbox" name="chk_list" />
                                        </td>
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="property">
                            附加属性
                            <a class="btn btn-white btn-sm pull-right" @click="addProp($event)"><i class="icon-plus"></i></a>
                            <a class="btn btn-white btn-sm pull-right" @click="delProp($event)"><i class="icon-minus"></i></a>
                        </div>
                        <div class="property">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style="width:5%"></th>
                                        <th>属性名</th>
                                        <th>属性值</th>
                                    </tr>
                                </thead>
                                <tbody id="addiProp">
                                    <tr>
                                        <td>
                                            <input type="checkbox" name="chk_list" />
                                        </td>
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="property">
                            辅助属性
                            <a class="btn btn-white btn-sm pull-right" @click="addProp($event)"><i class="icon-plus"></i></a>
                            <a class="btn btn-white btn-sm pull-right" @click="delProp($event)"><i class="icon-minus"></i></a>
                        </div>
                        <div class="property">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style="width:5%"></th>
                                        <th>属性名</th>
                                        <th>属性值</th>
                                    </tr>
                                </thead>
                                <tbody id="assisProp">
                                    <tr>
                                        <td>
                                            <input type="checkbox" name="chk_list" />
                                        </td>
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <a class="btn btn-info" @click="updateObj">保存</a>
                </div>
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
            <!-- addObjModal start -->
            <div class="modal fade" id="addObjModal" tabindex="-1" role="dialog" aria-labelledby="insertModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">添加对象</h4>
                        </div>
                        <div class="modal-body">
                            <!-- modal-body start -->
                            <section class="panel">
                                <form id="addUIForm" class="form-horizontal" role="form">
                                    <div class="form-group">
                                        <label class="col-xs-3 control-label">名称</label>
                                        <div class="col-xs-5">
                                            <input type="text" class="form-control" name="objName" id="addObjName">
                                        </div>
                                    </div>
                                </form>
                            </section>
                            <!-- modal-body end -->
                            </div>
                            <div class="modal-footer">
                                <button data-dismiss="modal" class="btn btn-default">取消</button>
                                <button data-dismiss="modal" class="btn btn-success" @click="addObj">添加</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- addUIModal end -->
            </div>
        </div>

</div>
`;

// var app = new Vue({
// var objectRepo = Vue.component('object-repo', {
var objectRepo =  Vue.extend({
    // el: '#main-content',
    name: 'object-repo',
    template: template_obj,
    props: {
        'breadShow': {
            type: Boolean,
            default: true
        }, 
        'topSelect': {
            type: Boolean,
            default: true
        },
        componentMode: false,
        transid: {
            default: 79
        }
    },
    data: function(){ 
        var _this = this;
        return {
            autId: '',
            transactId: '',
            objId: '',
            objName: '',
            propTr: '<tr><td><input type="checkbox" name="chk_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
            classtypeList: [],
            /*objtree start*/
            setting1: {
                view: {
                    addHoverDom: false,
                    removeHoverDom: false,
                    selectedMulti: false
                },
                check: {
                    enable: false,
                    chkStyle: "checkbox",
                    chkboxType: { "Y": "s", "N": "ps" }
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: 'id', //id编号命名
                        pIdKey: 'parentid', //父id编号命名
                        rootPId: 0
                    }
                },
                edit: {
                    enable: true,
                    showRemoveBtn: false,
                    showRenameBtn: false
                },
                //回调函数
                callback: {
                    // 禁止拖拽
                    beforeDrag: _this.zTreeBeforeDrag,
                    onClick: function(event, treeId, treeNode, clickFlag) {
                        console.log('kkkk')
                        $('classtypeSelect').val('');
                        _this.objName = treeNode.name;
                        $('#objForm input[name="name"]').val(treeNode.name);
                        _this.objId = treeNode.id;
                        var transid = !_this.componentMode ? _this.transactId : _this.transid;
                        var data = {
                            transid: transid,
                            id: _this.objId
                        }
                        $.ajax({
                            url: address + 'object_repoController/queryObject_repo',
                            type: 'post',
                            data: data,
                            success: function(data) {
                                // console.log(data);
                                var classtype=data.obj[0].classtype;
                                // console.log(classtype)
                                $('#classtypeSelect').val(classtype);
                                //主属性
                                var mainList = data.obj[0].locatePropertyCollection.main_properties;
                                if (mainList.length !== 0) {
                                    $('#mainProp').children().remove();
                                    for (var i = 0; i < mainList.length; i++) {
                                        var mainTr = $('<tr></tr>'),
                                            mainCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                            mainNameTd = $('<td contenteditable="true"></td>'),
                                            mainValTd = $('<td contenteditable="true"></td>');
                                        mainNameTd.html(mainList[i].name);
                                        mainValTd.html(mainList[i].value);
                                        mainTr.append(mainCheckTd, mainNameTd, mainValTd);
                                        $('#mainProp').append(mainTr);
                                    }
                                } else {
                                    $('#mainProp').children().remove();
                                    $('#mainProp').append(_this.propTr);
                                }

                                //附加属性
                                var addiList = data.obj[0].locatePropertyCollection.addtional_properties;
                                if (addiList.length !== 0) {
                                    $('#addiProp').children().remove();
                                    for (var j = 0; j < addiList.length; j++) {
                                        var addiTr = $('<tr></tr>'),
                                            addiCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                            addiNameTd = $('<td contenteditable="true"></td>'),
                                            addiValTd = $('<td contenteditable="true"></td>');
                                        addiNameTd.html(addiList[j].name);
                                        addiValTd.html(addiList[j].value);
                                        addiTr.append(addiCheckTd, addiNameTd, addiValTd);
                                        $('#addiProp').append(addiTr);
                                    }
                                } else {
                                    $('#addiProp').children().remove();
                                    $('#addiProp').append(app.propTr);
                                }

                                //辅助属性
                                var assiList = data.obj[0].locatePropertyCollection.assistant_properties;
                                if (assiList.length !== 0) {
                                    $('#assisProp').children().remove();
                                    for (var k = 0; k < assiList.length; k++) {
                                        var assiTr = $('<tr></tr>'),
                                            assiCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                            assiNameTd = $('<td contenteditable="true"></td>'),
                                            assiValTd = $('<td contenteditable="true"></td>');
                                        assiNameTd.html(assiList[k].name);
                                        assiValTd.html(assiList[k].value);
                                        assiTr.append(assiCheckTd, assiNameTd, assiValTd);
                                        $('#assisProp').append(assiTr);
                                    }
                                } else {
                                    $('#assisProp').children().remove();
                                    $('#assisProp').append(_this.propTr);
                                }

                            },
                            error: function() {
                                $('#failModal').modal();
                            }
                        });
                    },
                    onMouseUp: function(event, treeId, treeNode){
                         // 取消树节点选中状态
                        var treeObj = $.fn.zTree.getZTreeObj("objectTree");
                        treeObj.cancelSelectedNode(treeNode);
                    }
                }
            },
        }},
    ready: function() {
        var _this = this;
        if(!this.componentMode){
            this.getAutandTrans();
            $('#autSelect').change(function() {
                _this.transactSelect();
                _this.autId = $('#autSelect').val();
                _this.transactId = $('#transactSelect').val();
                _this.updateObjTree();
            });
            $('#transactSelect').change(() => {
                _this.transactId = $('#transactSelect').val();
                _this.updateObjTree();
            });
            // 搜索节点
            
        }
        if(this.componentMode) {
            this.getObjTree();
        }
        $('#search-btn').click(() => {
            var treeObj = $.fn.zTree.getZTreeObj("objectTree");
            var keywords = $("#keyword").val();
            var nodes = treeObj.getNodesByParamFuzzy("name", keywords, null);
            if (nodes.length > 0) {
                treeObj.selectNode(nodes[0]);
            }
        });
        // 如果引入的是组件
        
    },
    methods: {
        //获取classtype
        classtypeSelect: function() {
            var _this = this
            const val = $('#autSelect').val();
            $.ajax({
                url: address + 'autController/selectClass',
                data: { 'id': val },
                type: "POST",
                success: function(data) {
                    _this.classtypeList = data;
                }
            });
        },
        //初始化获取测试系统和功能点
        getAutandTrans: function() {
            var _this = this
            $.ajax({
                url: address + "autController/selectAll",
                type: "POST",
                success: function(data) {
                    var autList = data.obj;
                    var str = "";
                    for (var i = 0; i < autList.length; i++) {
                        str += " <option value='" + autList[i].id + "' >" + autList[i].autName + "</option> ";
                    }

                    $('#autSelect').html(str);
                    _this.autId = sessionStorage.getItem("autId");
                    $("#autSelect").val(_this.autId);
                    $.ajax({
                        url: address + 'transactController/showalltransact',
                        data: { 'autlistselect': _this.autId },
                        type: "POST",
                        success: function(data) {
                            var transactList = data.o;
                            var str = "";
                            for (var i = 0; i < transactList.length; i++) {

                                str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
                            }
                            $('#transactSelect').html(str);
                            _this.transactId = sessionStorage.getItem("transactId");
                            $("#transactSelect").val(_this.transactId);
                            // 获取对象树
                            _this.getObjTree();

                        }

                    });
                    // 获取classtype
                    _this.classtypeSelect();
                }
            });
        }, 
        
        //获取测试系统
        autSelect: function() {
            $.ajax({
                async: false,
                url: address + "autController/selectAll",
                type: "POST",
                success: function(data) {
                    var autList = data.obj;
                    var str = "";
                    for (var i = 0; i < autList.length; i++) {

                        str += " <option value='" + autList[i].id + "' >" + autList[i].autName + "</option> ";
                    }

                    $('#autSelect').html(str);

                }
            });
        },
        //功能点
        transactSelect: function() {
            var val = $('#autSelect').val();
            $.ajax({
                async: false,
                url: address + 'transactController/showalltransact',
                data: { 'autlistselect': val },
                type: "POST",
                success: function(data) {
                    var transactList = data.o;
                    var str = "";
                    for (var i = 0; i < transactList.length; i++) {

                        str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
                    }
                    $('#transactSelect').html(str);
                }

            });
        },
       
        //设置所属测试系统和所属功能点为上级页面选中的值
        setval: function() {
            this.autId=sessionStorage.getItem("autId");
            this.transactId=sessionStorage.getItem("transactId");
            $("#autSelect").val(this.autId);
            $("#transactSelect").val(this.transactId);
        },
        addObj: function() {
            var _this = this;
            var objName = $("#addObjName").val(),
                treeObj = $.fn.zTree.getZTreeObj("objectTree");
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
            var parentid=0,nodes;
            if(treeObj){
                nodes = treeObj.getSelectedNodes(true);
                if (nodes.length === 0) {
                    parentid = "0";
                } else {
                    parentid = nodes[0].id;
                }
            } 
            $.ajax({
                url: address + 'object_repoController/insertObject_repo',
                type: 'post',
                data: {
                    "name": objName,
                    "transid": transid,
                    "classtype": '',
                    "compositeType": '',
                    "parentElementId": parentid
                },
                success: function(data) {
                    // console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                        _this.getObjTree();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        delObj: function() {
            var _this = this;
            var treeObj = $.fn.zTree.getZTreeObj("objectTree");
            var nodes = treeObj.getSelectedNodes(true);
            var ids;
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
            for (var i = 0; i < nodes.length; i++) {
                ids = nodes[i].id;
            }

            $.ajax({
                url: address + 'object_repoController/deleteObejct_repo',
                type: 'post',
                data: {
                    "id": ids,
                    "transid": transid,
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                        _this.getObjTree();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        updateObj: function() {
            var _this = this
            var treeObj = $.fn.zTree.getZTreeObj("objectTree"),
                nodes = treeObj.getSelectedNodes(true),
                id = nodes[0].id,
                name = $('#objForm input[name="name"]').val(),
                parentElementId = nodes[0].parentid,
                classtype = $('#classtypeSelect').val();
            //主属性
            var mainTd,
                mainName = [],
                mainVal = [];
            $('#mainProp').find('tr').each(function() {
                mainTd = $(this).children();
                mainName.push(mainTd.eq(1).html()); //主属性名称
                mainVal.push(mainTd.eq(2).html()); //主属性值
            });
            //附加属性
            var addiTd,
                addiName = [],
                addiVal = [];
            $('#addiProp').find('tr').each(function() {
                addiTd = $(this).children();
                addiName.push(addiTd.eq(1).html()); //附加属性名称
                addiVal.push(addiTd.eq(2).html()); //附加属性值
            });
            //辅助属性
            var assisTd,
                assisName = [],
                assisVal = [];
            $('#assisProp').find('tr').each(function() {
                assisTd = $(this).children();
                assisName.push(assisTd.eq(1).html()); //辅助属性名称
                assisVal.push(assisTd.eq(2).html()); //辅助属性值
            });
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
            $.ajax({
                url: address + 'object_repoController/updateObejct_repo',
                type: 'post',
                data: {
                    "id": id,
                    "transid": transid,
                    "name": name,
                    "parentElementId": parentElementId,
                    "classtype": classtype,
                    "compositeType": "",
                    "mainpropertiesname": mainName.toString(),
                    "mainpropertiesvalue": mainVal.toString(),
                    "mainpropertiesmatchMethod": '',
                    "mainpropertiesisRelative": '',
                    "mainpropertiestoolName": '',
                    "addtionalpropertiesname": addiName.toString(),
                    "addtionalpropertiesvalue": addiVal.toString(),
                    "addtionalpropertiesmatchMethod": '',
                    "addtionalpropertiesisRelative": '',
                    "addtionalpropertiestoolName": '',
                    "assistantpropertiesname": assisName.toString(),
                    "assistantpropertiesvalue": assisVal.toString(),
                    "assistantpropertiesmatchMethod": '',
                    "assistantpropertiesisRelative": '',
                    "assistantpropertiestoolName": ''
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                        _this.updateObjTree();
                        // updateProp();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        addProp: function(e) {
            var curTbody = $(e.target).parent().next().find('tbody');
            curTbody.append(this.propTr);
        },
        delProp: function(e) {
            var selectedTr = $(e.target).parent().next().find('input[name="chk_list"]:checked').parent().parent();
            selectedTr.remove();
        },
        // 页面初始化获取对象库
        getObjTree: function(){
            var _this = this
            var transid = !this.componentMode ? this.transactId : this.transid;
            $.ajax({
                url: address + 'object_repoController/queryObject_repoAll',
                type: 'post',
                data: { "transid": transid },
                success: function(data) {
                    if (data !== null) {
                        $.fn.zTree.init($("#objectTree"), _this.setting1, data.obj);
                    }
                }
            });
        },
        //刷新对象库
        updateObjTree: function(){
            var _this = this
            var transid = !this.componentMode ? this.transactId : this.transid;
            $.ajax({
                url: address + 'object_repoController/queryObject_repoAll',
                type: 'post',
                data: { "transid": transid },
                success: function(data) {
                    if (data !== null) {
                        $.fn.zTree.init($("#objectTree"), _this.setting1, data.obj);
                    }
                }
            });
        },
        //禁止拖动
       zTreeBeforeDrag : function (treeId, treeNodes) {
            return false;
        },
        //点击保存按钮后更新属性
        updateProp: function() {
            var _this = this
            var transid = !this.componentMode ? this.transactId : this.transid;
            const treeObj = $.fn.zTree.getZTreeObj("objectTree"),
                nodes = treeObj.getSelectedNodes(true),
                id = nodes[0].id,
                classtype = $('#classtypeSelect').val();
            $.ajax({
                url: address + 'object_repoController/queryObject_repo',
                type: 'post',
                data: {
                    "id": id,
                    "transid":transid
                },
                success: function(data) {
                    console.log(data);
                    $('#classtypeSelect').val(data.obj.classtype);
                    //主属性
                    var mainList = data.obj[0].locatePropertyCollection.main_properties;
                    if (mainList.length !== 0) {
                        $('#mainProp').children().remove();
                        for (var i = 0; i < mainList.length; i++) {
                            var mainTr = $('<tr></tr>'),
                                mainCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                mainNameTd = $('<td contenteditable="true"></td>'),
                                mainValTd = $('<td contenteditable="true"></td>');
                            mainNameTd.html(mainList[i].name);
                            mainValTd.html(mainList[i].value);
                            mainTr.append(mainCheckTd, mainNameTd, mainValTd);
                            $('#mainProp').append(mainTr);
                        }
                    } else {
                        $('#mainProp').children().remove();
                        $('#mainProp').append(_this.propTr);
                    }

                    //附加属性
                    var addiList = data.obj[0].locatePropertyCollection.addtional_properties;
                    if (addiList.length !== 0) {
                        $('#addiProp').children().remove();
                        for (var j = 0; j < addiList.length; j++) {
                            var addiTr = $('<tr></tr>'),
                                addiCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                addiNameTd = $('<td contenteditable="true"></td>'),
                                addiValTd = $('<td contenteditable="true"></td>');
                            addiNameTd.html(addiList[j].name);
                            addiValTd.html(addiList[j].value);
                            addiTr.append(addiCheckTd, addiNameTd, addiValTd);
                            $('#addiProp').append(addiTr);
                        }
                    } else {
                        $('#addiProp').children().remove();
                        $('#addiProp').append(_this.propTr);
                    }

                    //辅助属性
                    var assiList = data.obj[0].locatePropertyCollection.assistant_properties;
                    if (assiList.length !== 0) {
                        $('#assisProp').children().remove();
                        for (var k = 0; k < assiList.length; k++) {
                            var assiTr = $('<tr></tr>'),
                                assiCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                assiNameTd = $('<td contenteditable="true"></td>'),
                                assiValTd = $('<td contenteditable="true"></td>');
                            assiNameTd.html(assiList[k].name);
                            assiValTd.html(assiList[k].value);
                            assiTr.append(assiCheckTd, assiNameTd, assiValTd);
                            $('#assisProp').append(assiTr);
                        }
                    } else {
                        $('#assisProp').children().remove();
                        $('#assisProp').append(_this.propTr);
                    }

                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        }

    },
});
Vue.component('object-repo', objectRepo)