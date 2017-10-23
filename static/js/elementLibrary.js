var template_ele = `
<div>
    <!-- breadcrumb start -->
    <div class="row" v-if="breadShow">
        <div class="col-lg-12">
            <ul class="breadcrumb">
                <li><a href="aut.html"><i class="icon-home"></i> 测试系统</a></li>
                <li><a href="transact.html">功能点</a></li>
                <li class="active">元素库</li>
            </ul>
        </div>
    </div>
    <!-- breadcrumb end -->
    <div class="row"  v-if="topSelect">
        <div class="col-lg-12">
            <section class="panel panel-pad">
                <!-- select start -->
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-lg-2 control-label">所属被测系统</label>
                        <div class="col-lg-2">
                            <select class="form-control" id="autSelect">
                            </select>
                        </div>
                        <label class="col-lg-2 control-label">所属功能点</label>
                        <div class="col-lg-2">
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
        <div class="col-lg-4">
            <section class="panel tree-panel">
                <header class="panel-heading"  v-if="top-select">
                    元素库
                </header>
                <div id="menuContent" class="menuContent treeMenu">
                    <div class="form-group panel-pad form-horizontal">
                        <div class="col-lg-6">
                            <input type="text" name="" id="keyword" value="" class="form-control empty input-sm">
                        </div>
                        <a class="btn btn-info btn-sm" id="search-btn" @click="searchNodes()">搜索</a>
                    </div>
                    <div class="form-group form-horizontal">
                        <div class="col-lg-12">
                            <a class="btn btn-info btn-sm" data-toggle="modal" href="#addUIModal">添加UI</a>
                            <a class="btn btn-info btn-sm" @click="delUI">删除UI</a>
                            <a class="btn btn-info btn-sm" data-toggle="modal" href="#addElementModal">添加元素</a>
                            <a class="btn btn-info btn-sm" @click="delElement">删除元素</a>
                        </div>
                    </div>
                    <ul id="elementtree" class="ztree tree"></ul>
                </div>
            </section>
        </div>
        <div class="col-lg-8">
            <section class="panel" id="UI">
                
                <div class="elementContent">
                    <header class="panel-heading">
                    {{UIName}}
                </header>
                    <form class="form-horizontal panel-pad" id="UIForm">
                        <div class="form-group">
                            <label class="col-lg-2 control-label">UI名称：</label>
                            <div class="col-lg-3">
                                <input type="text" name="UIName" class="form-control" :value="UIName" id="RUIName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">关联对象库中对象：</label>
                            <div class="col-lg-3">
                                <input type="text" id="UILinkedInput" class="form-control" :value="UILinked" disabled>
                            </div>
                            <div class="col-lg-2">
                                <a class="btn btn-info" data-toggle="modal" href="#UILinkedModal">关联对象</a>
                            </div>
                            <div class="col-lg-2">
                                <a class="btn btn-info" @click="removeUILinked()">解除关联</a>
                            </div>
                            <div class="col-lg-2">
                                <a class="btn btn-info" @click="updateUI">保存</a>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <section class="panel" id="ele" style="display: none;">
                <header class="panel-heading">
                    {{eleName}}
                </header>
                <div class="elementContent">
                    <form class="form-horizontal panel-pad" id="eleForm">
                        <div class="form-group">
                            <label class="col-lg-3 control-label">元素名称</label>
                            <div class="col-lg-3">
                                <input type="text" name="" class="form-control" :value="eleName" id="rEleName">
                            </div>
                            <label for="" class="col-lg-2 control-label">类型</label>
                            <div class="col-lg-3">
                                <select class="form-control" id="classtypeSelect">
                                    <option value="">--选择控件类型--</option>
                                    <option v-for="item in classtypeList" :value="item.classId">{{item.className}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">对象库中父对象</label>
                            <div class="col-lg-3">
                                <input type="text" name="" id="eleParentInput" class="form-control" :value="eleParent" disabled>
                            </div>
                            <div class="col-lg-2">
                                <a class="btn btn-info" data-toggle="modal" href="#eleParentModal">设置父对象</a>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">对象库中关联对象</label>
                            <div class="col-lg-3">
                                <input type="text" name="" id="eleLinkedInput" class="form-control" :value="eleLinked" disabled>
                            </div>
                            <div class="col-lg-2">
                                <a class="btn btn-info" data-toggle="modal" href="#eleLinkedModal">设置关联对象</a>
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
                                <tbody id="mainTbody">
                                    <tr v-for="item in mainList">
                                        <td>
                                            <input type="checkbox" name="chk_list" />
                                        </td>
                                        <td contenteditable="true">{{item.name}}</td>
                                        <td contenteditable="true">{{item.value}}</td>
                                    </tr>
                                    <tr v-show="mainListLength==0" class="text-center">
                                        <td colspan="3">暂无数据</td>
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
                                <tbody id="addiTbody">
                                    <tr v-for="item in addiList">
                                        <td>
                                            <input type="checkbox" name="chk_list" />
                                        </td>
                                        <td contenteditable="true">{{item.name}}</td>
                                        <td contenteditable="true">{{item.value}}</td>
                                    </tr>
                                    <tr v-show="addiListLength==0" class="text-center">
                                        <td colspan="3">暂无数据</td>
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
                                <tbody id="assiTbody">
                                    <tr v-for="item in assiList">
                                        <td>
                                            <input type="checkbox" name="chk_list" />
                                        </td>
                                        <td contenteditable="true">{{item.name}}</td>
                                        <td contenteditable="true">{{item.value}}</td>
                                    </tr>
                                    <tr v-show="assiListLength==0" class="text-center">
                                        <td colspan="3">暂无数据</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section class="panel elelink-panel">
                        <header class="panel-heading">关联元素</header>
                        <div class="linked">
                            <div class="linked-left">
                                <div class="property">
                                    关联元素
                                    <a class="btn btn-white btn-sm pull-right" @click="addLinked($event)"><i class="icon-plus"></i></a>
                                    <a class="btn btn-white btn-sm pull-right" @click="delLinked($event)"><i class="icon-minus"></i></a>
                                </div>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style="width:5%"></th>
                                            <th>关联元素</th>
                                        </tr>
                                    </thead>
                                    <tbody id="relateNameTbody">
                                        <tr v-for="(index,item) in relateElementList">
                                            <td>
                                                <input type="radio" name="chk_list" @click="showLinkProp(index)"/>
                                            </td>
                                            <td contenteditable="true">{{item.name}}</td>
                                        </tr>
                                        <tr v-show="relateElementListLength==0" class="text-center">
                                            <td colspan="3">暂无数据</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="linked-right">
                                <div class="property">
                                    属性
                                    <a class="btn btn-white btn-sm pull-right" @click="addProp($event)"><i class="icon-plus"></i></a>
                                    <a class="btn btn-white btn-sm pull-right" @click="delProp($event)"><i class="icon-minus"></i></a>
                                </div>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style="width:5%"></th>
                                            <th>属性名</th>
                                            <th>属性值</th>
                                        </tr>
                                    </thead>
                                    <tbody id="relatePropTbody">
                                        <tr v-for="item in relatePropList">
                                            <td>
                                                <input type="checkbox" name="chk_list" />
                                            </td>
                                            <td contenteditable="true">{{item.name}}</td>
                                            <td contenteditable="true">{{item.value}}</td>
                                        </tr>
                                        <tr v-show="relatePropListLength==0" class="text-center">
                                            <td colspan="3">暂无数据</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                    <a class="btn btn-info" @click="updateElement">保存</a>
                </div>
            </section>
            <!-- successModal start -->
            <div class="modal fade" id="successModalEle" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
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
            <!-- failModalEle start -->
            <div class="modal fade" id="failModalEle" tabindex="-1" role="dialog" aria-labelledby="failModalEleLabel" aria-hidden="true">
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
            <!-- failModalEle end -->
            <!-- addUIModal start -->
            <div class="modal fade" id="addUIModal" tabindex="-1" role="dialog" aria-labelledby="insertModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">添加UI</h4>
                        </div>
                        <div class="modal-body">
                            <!-- modal-body start -->
                            <section class="panel">
                                <form id="addUIForm" class="form-horizontal" role="form">
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">UI名称</label>
                                        <div class="col-lg-5">
                                            <input type="text" class="form-control" name="UIName" id="addUIName">
                                        </div>
                                    </div>
                                    <div class="form-group hidden">
                                        <label class="col-lg-3 control-label">relateIdentifyObjectId</label>
                                        <div class="col-lg-5">
                                            <input type="text" class="form-control" name="relateIdentifyObjectId" id="addRelateIdentifyObjectId">
                                        </div>
                                    </div>
                                    <div class="form-group hidden">
                                        <label class="col-lg-3 control-label"> relateParentIdentifyObjectId</label>
                                        <div class="col-lg-5">
                                            <input type="text" class="form-control" name="relateParentIdentifyObjectId" id="addRelateParentIdentifyObjectId">
                                        </div>
                                    </div>
                                </form>
                            </section>
                            <!-- modal-body end -->
                        </div>
                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default">取消</button>
                            <button class="btn btn-success" @click="addUI">添加</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- addUIModal end -->
            <!-- addElementModal start -->
            <div class="modal fade" id="addElementModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">添加元素</h4>
                        </div>
                        <div class="modal-body">
                            <!-- modal-body start -->
                            <section class="panel">
                                <form id="addElementForm" class="form-horizontal" role="form">
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">元素名称</label>
                                        <div class="col-lg-5">
                                            <input type="text" class="form-control" name="ElementName" id="addElementName">
                                        </div>
                                    </div>
                                    <div class="form-group hidden">
                                        <label class="col-lg-3 control-label">ClassType</label>
                                        <div class="col-lg-5">
                                            <input type="text" class="form-control" name="ClassType" id="addEleClassType">
                                        </div>
                                    </div>
                                    <div class="form-group hidden">
                                        <label class="col-lg-3 control-label"> relateIdentifyObjectId</label>
                                        <div class="col-lg-5">
                                            <input type="text" class="form-control" name=" relateIdentifyObjectId" id="addEleRelateIdentifyObjectId">
                                        </div>
                                    </div>
                                    <div class="form-group hidden">
                                        <label class="col-lg-3 control-label"> relateParentIdentifyObjectId</label>
                                        <div class="col-lg-5">
                                            <input type="text" class="form-control" name="  relateParentIdentifyObjectId" id="addEleRelateParentIdentifyObjectId">
                                        </div>
                                    </div>
                                </form>
                            </section>
                            <!-- modal-body end -->
                        </div>
                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                            <button data-dismiss="modal" class="btn btn-success" type="button" @click="addElement">添加</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- addElementModal end -->
        </div>
    </div>
    <!-- <link rel="import" href="./common/copy-right.html?__inline"> -->
    <div class="modal fade" id="UILinkedModal" tabindex="-1" role="dialog" aria-labelledby="objectModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">对象库</h4>
                </div>
                <div class="modal-body">
                    <div id="menuContent" class="menuContent treeMenu">
                        <ul id="UILinkedTree" class="ztree tree"></ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button data-dismiss="modal" class="btn btn-default">取消</button>
                    <button data-dismiss="modal" class="btn btn-success" ＠click="setUILinked()">确认</button>
                </div>
            </div>
        </div>
    </div>
    <!--UILinked objectmodal end -->
    <!--eleParent objectmodal start -->
    <div class="modal fade" id="eleParentModal" tabindex="-1" role="dialog" aria-labelledby="objectModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">对象库</h4>
                </div>
                <div class="modal-body">
                    <div id="menuContent" class="menuContent treeMenu">
                        <ul id="eleParentTree" class="ztree tree"></ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button data-dismiss="modal" class="btn btn-default">取消</button>
                    <button data-dismiss="modal" class="btn btn-success" @click="setEleParent()">确认</button>
                </div>
            </div>
        </div>
    </div>
    <!--eleParent objectmodal end -->
    <!--eleLinked objectmodal start -->
    <div class="modal fade" id="eleLinkedModal" tabindex="-1" role="dialog" aria-labelledby="objectModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">对象库</h4>
                </div>
                <div class="modal-body">
                    <div id="menuContent" class="menuContent treeMenu">
                        <ul id="eleLinkedTree" class="ztree tree"></ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button data-dismiss="modal" class="btn btn-default">取消</button>
                    <button data-dismiss="modal" class="btn btn-success" @click="setEleLinked()">确认</button>
                </div>
            </div>
        </div>
    </div>
    <!--eleLinked objectmodal end -->

</div>
`;

// var elementLibrary = new Vue({
// var elementLibrary = Vue.component('element-library',{
var elementLibrary = Vue.extend({
    // el: '#main-content',
    name:'element-library',
    template: template_ele,
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
    data: function() {
        var _this = this;
        return {
        autId: '',
        transactId: '',
        UIName: '',
        eleName: '',
        propTr: '<tr><td><input type="checkbox" name="chk_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
        UILinked: '',
        eleParent: '',
        eleLinked: '',
        linkedTr: '<tr><td><input type="radio" name="chk_list"/></td><td contenteditable="true"></td></tr>',
        linkedPropTr: '<tr><td><input type="checkbox" name="chk_list" @click="showLinkProp(index)"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
        classtypeList: [], //控件类型下拉列表
        mainList: [], //主属性
        mainListLength: 0,
        addiList: [], //附加属性
        addiListLength: 0,
        assiList: [], //辅助属性
        assiListLength: 0,
        relateElementList: [], //关联元素
        relateElementListLength: 0,
        relatePropList: [], //关联元素属性
        relatePropListLength: 0,
        /*elementtree start*/
        setting1: {
            view: {
                addHoverDom: false,
                removeHoverDom: false,
                selectedMulti: true
            },
            check: {
                enable: false,
                chkStyle: "checkbox",
                chkboxType: { "Y": "ps", "N": "ps" }
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
                //点击时的回调函数
                onClick: function(event, treeId, treeNode, clickFlag) {
                    var transid = !_this.componentMode ? _this.transactId : _this.transid;
                    if (treeNode.parentid == '0') { //选择的是UI
                        $(':input', '#UIForm').val('');
                        _this.getUILinkedObjectTree();
                        _this.UIName = treeNode.name;
                        $('#UIForm input[name="UIName"]').val(treeNode.name);
                        $('#UI').css('display', 'block');
                        $('#ele').css('display', 'none');
                        $.ajax({
                            url: address + 'elementlibraryController/queryUI',
                            type: 'post',
                            data: {
                                "transid": transid,
                                "UIName": _this.UIName
                            },
                            success: function(data) {
                                var relateObjectId = data.obj.relateIdentifyObjectId;
                                var treeObj = $.fn.zTree.getZTreeObj("UILinkedTree");
                                if (relateObjectId !== null && relateObjectId !== undefined && relateObjectId !== '') {
                                    treeObj.selectNode(treeObj.getNodeByParam("id", relateObjectId, null));
                                    var nodes = treeObj.getSelectedNodes();
                                    var obj = nodes[0].name;
                                    $('#UILinkedInput').val(obj);
                                }
                            }
                        });
                    } else { //选择的是元素
                        $('#classtypeSelect').val('');
                        $('#eleParentInput').val('');
                        $('#eleLinkedInput').val('');
                        _this.getEleParentObjectTree();
                        _this.getEleLinkedObjectTree();
                        var treeObj = $.fn.zTree.getZTreeObj("elementtree");
                        var nodes = treeObj.getSelectedNodes();
                        _this.eleName = treeNode.name;
                        var parentNode = nodes[0].getParentNode();
                        _this.UIName = parentNode.name;
                        $('#UI').css('display', 'none');
                        $('#ele').css('display', 'block');
                        var transid = !_this.componentMode ? _this.transactId : _this.transid;
                        $.ajax({
                            url: address + 'elementlibraryController/queryElement',
                            type: 'post',
                            data: {
                                "transid": transid,
                                "UIName": _this.UIName,
                                "ElementName": _this.eleName
                            },
                            success: function(data) {
                                var classtype = data.obj.identifyElement.classtype;
                                $('#classtypeSelect').val(classtype);
                                var relateParentObjectId = data.obj.identifyElement.parentElementId;
                                var relateObjectId = data.obj.relateIdentifyObjectId;
                                if (relateParentObjectId !== null && relateParentObjectId !== undefined && relateParentObjectId !== '') {
                                    //父对象
                                    var elePtree = $.fn.zTree.getZTreeObj("eleParentTree");
                                    elePtree.selectNode(elePtree.getNodeByParam("id", relateParentObjectId, null));
                                    var pNodes = elePtree.getSelectedNodes(),
                                        pObj = pNodes[0].name;
                                    $('#eleParentInput').val(pObj);
                                }
                                if (relateObjectId !== null && relateObjectId !== undefined && relateObjectId !== '') {
                                    //关联对象
                                    var eleLtree = $.fn.zTree.getZTreeObj("eleLinkedTree");
                                    eleLtree.selectNode(eleLtree.getNodeByParam("id", relateObjectId, null));
                                    var lNodes = eleLtree.getSelectedNodes(),
                                        lObj = lNodes[0].name;
                                    $('#eleLinkedInput').val(lObj);
                                }

                                //主属性
                                _this.mainList = data.obj.identifyElement.locatePropertyCollection.main_properties;
                                _this.mainListLength = _this.mainList.length;

                                //附加属性
                                _this.addiList = data.obj.identifyElement.locatePropertyCollection.addtional_properties;
                                _this.addiListLength = _this.addiList.length;

                                //辅助属性
                                _this.assiList = data.obj.identifyElement.locatePropertyCollection.assistant_properties;
                                _this.assiListLength = _this.assiList.length;

                                //关联元素
                                _this.relateElementList = data.obj.relateElementList;
                                if(_this.relateElementList){
                                    _this.relateElementListLength = _this.relateElementList.length;     
                                }
                            
                                //关联元素属性

                            }
                        });
                    }
                },

            }
        },
        /*UILinked objecttree start*/
        setting2: {
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
                    _this.UILinked = treeNode.name;
                },

            }
        },

    }},
    ready: function() {
        if (!this.componentMode) {
            this.getAutandTrans();
            var _this = this
            $('#autSelect').change(function() {
                _this.transactSelect();
                _this.autId = $('#autSelect').val();
                _this.transactId = $('#transactSelect').val();
                _this.getElementTree();
                _this.classtypeSelect();
            });
            $('#transactSelect').change(function() {
                _this.transactId = $('#transactSelect').val();
                _this.getElementTree();
            });
        } else {
            this.getElementTree();
            this.getUILinkedObjectTree();
            this.getEleParentObjectTree();
            this.getEleLinkedObjectTree();
        }
        // $("#search-btn").click(this.searchNodes);
    },
    methods: {
        //初始化获取测试系统和功能点
        getAutandTrans: function() {
            var _this = this;
            $.ajax({
                // async: false,
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
                            // 获取ui和element
                            $.ajax({
                                url: address + 'elementlibraryController/showUIandElement',
                                type: 'post',
                                data: { "transid": _this.transactId },
                                success: function(data) {
                                    if (data !== null) {
                                        $.fn.zTree.init($("#elementtree"), _this.setting1, data.obj);
                                    }
                                }
                            });
                            // 获取classtype
                            $.ajax({
                                url: address + 'autController/selectClass',
                                data: { 'id': _this.autId },
                                type: "POST",
                                success: function(data) {
                                    _this.classtypeList = data;
                                }

                            });
                            _this.getUILinkedObjectTree();
                            _this.getEleParentObjectTree();
                            _this.getEleLinkedObjectTree();
                        }

                    });
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
        //获取classtype
        classtypeSelect: function() {
            // var val = $('#autSelect').val();
            var _this = this;
            $.ajax({
                url: address + 'autController/selectClass',
                data: { 'id': _this.autId },
                type: "POST",
                success: function(data) {
                    _this.classtypeList = data;
                }

            });
        },
        //设置所属测试系统和所属功能点为上级页面选中的值
        setval: function() {
            this.autId = sessionStorage.getItem("autId");
            this.transactId = sessionStorage.getItem("transactId");
            $("#autSelect").val(this.autId);
            $("#transactSelect").val(this.transactId);
        },
        addUI: function() {
            var _this = this;
            var transid = !this.componentMode ? this.transactId : this.transid;
            var UIName = $("#addUIName").val(),
                relateIdentifyObjectId = $("#addRelateIdentifyObjectId").val(),
                relateParentIdentifyObjectId = $("#addRelateParentIdentifyObjectId").val();
            $.ajax({
                url: address + 'elementlibraryController/insertUI',
                type: 'post',
                data: {
                    "UIName": UIName,
                    "transid": transid,
                    "relateIdentifyObjectId": relateIdentifyObjectId,
                    "relateParentIdentifyObjectId": relateParentIdentifyObjectId
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModalEle').modal('show');
                        _this.getElementTree();
                    } else {
                        $('#failModalEle').modal('show');
                    }
                },
                error: function() {
                    $('#failModalEle').modal('show');
                }
            });
        },
        delUI: function() {
            var _this = this;
            var treeObj = $.fn.zTree.getZTreeObj("elementtree");
            var nodes = treeObj.getSelectedNodes();
            var delUIName = nodes[0].name;
            $.ajax({
                url: address + 'elementlibraryController/deleteUI',
                type: 'post',
                data: {
                    "deleteUI": delUIName,
                    "transid": _this.transactId,
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModalEle').modal();
                        _this.getElementTree();
                    } else {
                        $('#failModalEle').modal();
                    }
                },
                error: function() {
                    $('#failModalEle').modal();
                }
            });
        },
        updateUI: function() {
            var treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getSelectedNodes(),
                UIName = nodes[0].name,
                RUIName = $('#RUIName').val(),
                LtreeObj = $.fn.zTree.getZTreeObj("UILinkedTree");
            var Lnodes,
                relateIdentifyObjectId,
                relateParentIdentifyObjectId;
            if (LtreeObj) {
                Lnodes = LtreeObj.getSelectedNodes();
                if (Lnodes.length !== 0) {
                    relateIdentifyObjectId = Lnodes[0].id;
                    relateParentIdentifyObjectId = Lnodes[0].parentid;
                } else {
                    relateIdentifyObjectId = '';
                    relateParentIdentifyObjectId = '';
                }

            } else {
                relateIdentifyObjectId = '';
                relateParentIdentifyObjectId = '';
            }
            $.ajax({
                url: address + 'elementlibraryController/updateUI',
                type: 'post',
                data: {
                    "UIName": UIName,
                    "transid": _this.transactId,
                    "RUIName": RUIName,
                    "relateIdentifyObjectId": relateIdentifyObjectId,
                    "relateParentIdentifyObjectId": relateParentIdentifyObjectId
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModalEle').modal();
                        _this.getElementTree();
                    } else {
                        $('#failModalEle').modal();
                    }
                },
                error: function() {
                    $('#failModalEle').modal();
                }
            });
        },
        addElement: function() {
            var _this = this;
            var transid = !this.componentMode ?  _this.transactId : _this.transid;
            var ElementName = $("#addElementName").val(),
                ClassType = $("#classtypeSelect").val(),
                relateIdentifyObjectId = $("#addEleRelateIdentifyObjectId").val(),
                relateParentIdentifyObjectId = $("#addEleRelateParentIdentifyObjectId").val(),
                treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getSelectedNodes(),
                selectedUIName = nodes[0].name;
            $.ajax({
                url: address + 'elementlibraryController/insertElement',
                type: 'post',
                data: {
                    "transid": transid,
                    "UIName": selectedUIName,
                    "ElementName": ElementName,
                    "ClassType": ClassType,
                    "relateIdentifyObjectId": relateIdentifyObjectId,
                    "relateParentIdentifyObjectId": relateParentIdentifyObjectId
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModalEle').modal();
                        _this.getElementTree();
                    } else {
                        $('#failModalEle').modal();
                    }
                },
                error: function() {
                    $('#failModalEle').modal();
                }
            });
        },
        delElement: function() {
            var _this = this;
            var treeObj = $.fn.zTree.getZTreeObj("elementtree");
            var nodes = treeObj.getSelectedNodes();
            var delElementName = nodes[0].name;
            var delUIName = nodes[0].getParentNode().name;
            $.ajax({
                url: address + 'elementlibraryController/deleteElement',
                type: 'post',
                data: {
                    "deleteElements": delElementName,
                    "UIName": delUIName,
                    "transid": _this.transactId,
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModalEle').modal();
                        _this.getElementTree();
                    } else {
                        $('#failModalEle').modal();
                    }
                },
                error: function() {
                    $('#failModalEle').modal();
                }
            });
        },
        updateElement: function() {
            var _this = this;
            var transid = !this.componentMode ? this.transactId : this.transid;
            var treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getSelectedNodes(),
                UIName = nodes[0].getParentNode().name,
                eleName = nodes[0].name,
                rEleName = $('#rEleName').val(),
                LtreeObj = $.fn.zTree.getZTreeObj("eleLinkedTree");
            var Lnodes, relateIdentifyObjectId;
            if (LtreeObj) {
                Lnodes = LtreeObj.getSelectedNodes();
                if (Lnodes.length !== 0) {
                    relateIdentifyObjectId = Lnodes[0].id;
                } else {
                    relateIdentifyObjectId = '';
                }
            } else {
                relateIdentifyObjectId = '';
            }
            var PtreeObj = $.fn.zTree.getZTreeObj("eleParentTree");
            var Pnodes, relateParentIdentifyObjectId;
            if (PtreeObj) {
                Pnodes = PtreeObj.getSelectedNodes();
                if (Pnodes.length !== 0) {
                    relateParentIdentifyObjectId = Pnodes[0].id;
                } else {
                    relateParentIdentifyObjectId = '';
                }

            } else {
                relateParentIdentifyObjectId = '';
            }
            // 控件类型
            var ClassType = $('#classtypeSelect').val();
            //主属性
            var mainTd,
                mainName = [],
                mainVal = [];
            $('#mainTbody').find('tr').each(function() {
                mainTd = $(this).children();
                mainName.push(mainTd.eq(1).html()); //主属性名称
                mainVal.push(mainTd.eq(2).html()); //主属性值
            });
            //附加属性
            var addiTd,
                addiName = [],
                addiVal = [];
            $('#addiTbody').find('tr').each(function() {
                addiTd = $(this).children();
                addiName.push(addiTd.eq(1).html()); //附加属性名称
                addiVal.push(addiTd.eq(2).html()); //附加属性值
            });
            //辅助属性
            var assisTd,
                assisName = [],
                assisVal = [];
            $('#assiTbody').find('tr').each(function() {
                assisTd = $(this).children();
                assisName.push(assisTd.eq(1).html()); //辅助属性名称
                assisVal.push(assisTd.eq(2).html()); //辅助属性值
            });
            //关联元素
            var relateNameTd,
                relateName = [];
            $('#relateNameTbody').find('tr').each(function() {
                relateNameTd = $(this).children();
                relateName.push(relateNameTd.eq(1).html());
            });
            //关联元素属性
            var relatePropNameTd,
                relatePropName = [],
                relatePropVal = [];
            $('#relatePropTbody').find('tr').each(function() {
                relatePropNameTd = $(this).children();
                relatePropName.push(relatePropNameTd.eq(1).html());
                relatePropVal.push(relatePropNameTd.eq(2).html());
            });
            $.ajax({
                url: address + 'elementlibraryController/updateElement',
                type: 'post',
                data: {
                    "UIName": UIName,
                    "transid": transid,
                    "ElementNmae": eleName,
                    "RElementName": rEleName,
                    "relateIdentifyObjectId": relateIdentifyObjectId,
                    "relateParentIdentifyObjectId": relateParentIdentifyObjectId,
                    "ClassType": ClassType,
                    //主属性
                    "mainpropertiesname": mainName.toString(),
                    "mainpropertiesvalue": mainVal.toString(),
                    "mainpropertiesmatchMethod": '',
                    "mainpropertiesisRelative": '',
                    "mainpropertiestoolName": '',
                    //附加属性
                    "addtionalpropertiesname": addiName.toString(),
                    "addtionalpropertiesvalue": addiVal.toString(),
                    "addtionalpropertiesmatchMethod": '',
                    "addtionalpropertiesisRelative": '',
                    "addtionalpropertiestoolName": '',
                    //辅助属性
                    "assistantpropertiesname": assisName.toString(),
                    "assistantpropertiesvalue": assisVal.toString(),
                    "assistantpropertiesmatchMethod": '',
                    "assistantpropertiesisRelative": '',
                    "assistantpropertiestoolName": '',
                    //关联元素
                    "relateElementname": relateName.toString(),
                    //关联元素属性
                    "relemainpropertiesname": relatePropName.toString(),
                    "relemainpropertiesvalue": relatePropVal.toString(),
                },
                success: function(data) {
                    console.log(data);
                    if (data.success) {
                        $('#successModalEle').modal();
                        _this.getElementTree();
                    } else {
                        $('#failModalEle').modal();
                    }
                },
                error: function() {
                    $('#failModalEle').modal();
                }
            });
        },
        addProp: function(e) {
            var curTbody = $(e.target).parent().next().find('tbody');
            curTbody.children().filter('.text-center').remove();
            curTbody.append(this.propTr);
        },
        delProp: function(e) {
            var selectedTr = $(e.target).parent().next().find('input[name="chk_list"]:checked').parent().parent();
            selectedTr.remove();
        },
        addLinked: function(e) {
            var curTbody = $(e.target).parent().next().find('tbody');
            curTbody.children().filter('.text-center').remove();
            curTbody.append(this.linkedTr);
        },
        delLinked: function(e) {
            var selectedTr = $(e.target).parent().next().find('input[name="chk_list"]:checked').parent().parent();
            selectedTr.remove();
        },
        //获取关联元素属性
        showLinkProp: function(index) {
            this.relatePropList = this.relateElementList[index].locatePropertyCollection.main_properties;
            this.relatePropListLength = this.relatePropList.length;
        },
        // 页面初始化获取元素库
        getElementTree: function() {
            var _this = this;
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
            $.ajax({
                url: address + 'elementlibraryController/showUIandElement',
                type: 'post',
                data: { "transid": transid },
                success: function(data) {
                    if (data !== null) {
                        $.fn.zTree.init($("#elementtree"), _this.setting1, data.obj);
                    }
                }
            });
        },
        //禁止拖动
        zTreeBeforeDrag: function(treeId, treeNodes) {
            return false;
        },
        //用按钮查询节点  
        searchNodes: function() {
            console.log(0)
            var treeObj = $.fn.zTree.getZTreeObj("elementtree");
            var keywords = $("#keyword").val();
            var nodes = treeObj.getNodesByParamFuzzy("name", keywords, null);
            if (nodes.length > 0) {
                treeObj.selectNode(nodes[0]);
            }
        },
        /*elementtree end*/
        // 页面初始化获取对象库
         getUILinkedObjectTree: function() {
             var _this = this;
             console.log(this)
            // var transid = $("#transactSelect").val();
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
            $.ajax({
                url: address + 'object_repoController/queryObject_repoAll',
                type: 'post',
                data: { "transid": transid },
                success: function(data) {console.log(this);
                    if (data !== null) {
                        $.fn.zTree.init($("#UILinkedTree"), _this.setting2, data.obj);
                    }
                }
            });
        },
        //UI关联对象库中对象
         setUILinked: function() {
            var treeObj = $.fn.zTree.getZTreeObj("UILinkedTree"),
                nodes = treeObj.getSelectedNodes(),
                obj = nodes[0].name;
            $('#UILinkedInput').val(obj);
        },
        //解除关联
         removeUILinked: function() {
            var treeObj = $.fn.zTree.getZTreeObj("UILinkedTree");
            treeObj.checkAllNodes(false);
            $('#UILinkedInput').val('');
            $('#successModalEle').modal();
        },
        /*UILinked objecttree end*/
        // 页面初始化获取对象库
         getEleParentObjectTree:function() {
            var _this = this;
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
            $.ajax({
                url: address + 'object_repoController/queryObject_repoAll',
                type: 'post',
                data: { "transid": transid },
                success: function(data) {
                    if (data !== null) {
                        $.fn.zTree.init($("#eleParentTree"), _this.setting2, data.obj);
                    }
                }
            });
        },
        //设置对象库中父对象
         setEleParent: function() {
            console.log(222)
            var treeObj = $.fn.zTree.getZTreeObj("eleParentTree"),
                nodes = treeObj.getSelectedNodes(),
                obj = nodes[0].name;
            $('#eleParentInput').val(obj);
        },
        /*eleParent objecttree end*/
        // 页面初始化获取对象库
         getEleLinkedObjectTree: function() {
            var _this = this;
            var transid = !this.componentMode ? $("#transactSelect").val() : this.transid;
            $.ajax({
                url: address + 'object_repoController/queryObject_repoAll',
                type: 'post',
                data: { "transid": transid },
                success: function(data) {
                    if (data !== null) {
                        $.fn.zTree.init($("#eleLinkedTree"), _this.setting2, data.obj);
                    }
                }
            });
        },
        //设置对象库中关联对象
         setEleLinked: function() {
            var treeObj = $.fn.zTree.getZTreeObj("eleLinkedTree"),
                nodes = treeObj.getSelectedNodes(),
                obj = nodes[0].name;
            $('#eleLinkedInput').val(obj);
        },
        /*eleLinked objecttree end*/

        //勾选关联元素名称
        relateNameClick:function(event) {
            if ($(event.target).attr('checked')) {
            }
        }
    },
});
Vue.component('element-library', elementLibrary)
