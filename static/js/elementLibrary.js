var app = new Vue({
    el: '#elementLibrary',
    data: {
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

    },
    ready: function() {
        this.getAutandTrans();
        $('#autSelect').change(function() {
            app.transactSelect();
            app.autId = $('#autSelect').val();
            app.transactId = $('#transactSelect').val();
            getElementTree();
            app.classtypeSelect();
        });
        $('#transactSelect').change(function() {
            app.transactId = $('#transactSelect').val();
            getElementTree();
        });
    },
    methods: {
        //初始化获取测试系统和功能点
        getAutandTrans: function() {
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
                    app.autId = sessionStorage.getItem("autId");
                    $("#autSelect").val(app.autId);
                    $.ajax({
                        url: address + 'transactController/showalltransact',
                        data: { 'autlistselect': app.autId },
                        type: "POST",
                        success: function(data) {
                            var transactList = data.o;
                            var str = "";
                            for (var i = 0; i < transactList.length; i++) {

                                str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
                            }
                            $('#transactSelect').html(str);
                            app.transactId = sessionStorage.getItem("transactId");
                            $("#transactSelect").val(app.transactId);
                            // 获取ui和element
                            $.ajax({
                                url: address + 'elementlibraryController/showUIandElement',
                                type: 'post',
                                data: { "transid": app.transactId },
                                success: function(data) {
                                    if (data !== null) {
                                        $.fn.zTree.init($("#elementtree"), setting1, data.obj);
                                    }
                                }
                            });
                            // 获取classtype
                            $.ajax({
                                url: address + 'autController/selectClass',
                                data: { 'id': app.autId },
                                type: "POST",
                                success: function(data) {
                                    app.classtypeList = data;
                                }

                            });
                            getUILinkedObjectTree();
                            getEleParentObjectTree();
                            getEleLinkedObjectTree();
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
            $.ajax({
                url: address + 'autController/selectClass',
                data: { 'id': app.autId },
                type: "POST",
                success: function(data) {
                    app.classtypeList = data;
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
            var UIName = $("#addUIName").val(),
                relateIdentifyObjectId = $("#addRelateIdentifyObjectId").val(),
                relateParentIdentifyObjectId = $("#addRelateParentIdentifyObjectId").val();
            $.ajax({
                url: address + 'elementlibraryController/insertUI',
                type: 'post',
                data: {
                    "UIName": UIName,
                    "transid": this.transactId,
                    "relateIdentifyObjectId": relateIdentifyObjectId,
                    "relateParentIdentifyObjectId": relateParentIdentifyObjectId
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                        getElementTree();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        delUI: function() {
            var treeObj = $.fn.zTree.getZTreeObj("elementtree");
            var nodes = treeObj.getSelectedNodes();
            var delUIName = nodes[0].name;
            $.ajax({
                url: address + 'elementlibraryController/deleteUI',
                type: 'post',
                data: {
                    "deleteUI": delUIName,
                    "transid": this.transactId,
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                        getElementTree();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
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
                    "transid": this.transactId,
                    "RUIName": RUIName,
                    "relateIdentifyObjectId": relateIdentifyObjectId,
                    "relateParentIdentifyObjectId": relateParentIdentifyObjectId
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                        getElementTree();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        addElement: function() {
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
                    "transid": this.transactId,
                    "UIName": selectedUIName,
                    "ElementName": ElementName,
                    "ClassType": ClassType,
                    "relateIdentifyObjectId": relateIdentifyObjectId,
                    "relateParentIdentifyObjectId": relateParentIdentifyObjectId
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                        getElementTree();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        delElement: function() {
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
                    "transid": this.transactId,
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                        getElementTree();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        updateElement: function() {
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
                    "transid": this.transactId,
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
                        $('#successModal').modal();
                        getElementTree();
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
        }

    },
});

/*elementtree start*/
var setting1 = {
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
        beforeDrag: zTreeBeforeDrag,
        //点击时的回调函数
        onClick: function(event, treeId, treeNode, clickFlag) {
            // console.log(treeNode);
            if (treeNode.parentid == '0') { //选择的是UI
                $(':input', '#UIForm').val('');
                getUILinkedObjectTree();
                app.UIName = treeNode.name;
                $('#UIForm input[name="UIName"]').val(treeNode.name);
                $('#UI').css('display', 'block');
                $('#ele').css('display', 'none');
                $.ajax({
                    url: address + 'elementlibraryController/queryUI',
                    type: 'post',
                    data: {
                        "transid": app.transactId,
                        "UIName": app.UIName
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
                getEleParentObjectTree();
                getEleLinkedObjectTree();
                var treeObj = $.fn.zTree.getZTreeObj("elementtree");
                var nodes = treeObj.getSelectedNodes();
                app.eleName = treeNode.name;
                var parentNode = nodes[0].getParentNode();
                app.UIName = parentNode.name;
                $('#UI').css('display', 'none');
                $('#ele').css('display', 'block');
                $.ajax({
                    url: address + 'elementlibraryController/queryElement',
                    type: 'post',
                    data: {
                        "transid": app.transactId,
                        "UIName": app.UIName,
                        "ElementName": app.eleName
                    },
                    success: function(data) {
                        console.log(data)
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
                        app.mainList = data.obj.identifyElement.locatePropertyCollection.main_properties;
                        app.mainListLength = app.mainList.length;

                        //附加属性
                        app.addiList = data.obj.identifyElement.locatePropertyCollection.addtional_properties;
                        app.addiListLength = app.addiList.length;

                        //辅助属性
                        app.assiList = data.obj.identifyElement.locatePropertyCollection.assistant_properties;
                        app.assiListLength = app.assiList.length;

                        //关联元素
                        app.relateElementList = data.obj.relateElementList;
                        if(app.relateElementList){
                             app.relateElementListLength = app.relateElementList.length;     
                        }
                       
                        //关联元素属性

                    }
                });
            }
        },

    }
};
// 页面初始化获取元素库
function getElementTree() {
    var transid = $("#transactSelect").val();
    $.ajax({
        url: address + 'elementlibraryController/showUIandElement',
        type: 'post',
        data: { "transid": transid },
        success: function(data) {
            if (data !== null) {
                $.fn.zTree.init($("#elementtree"), setting1, data.obj);
            }
        }
    });
}

//禁止拖动
function zTreeBeforeDrag(treeId, treeNodes) {
    return false;
}


$("#search-btn").click(searchNodes);
//用按钮查询节点  
function searchNodes() {
    var treeObj = $.fn.zTree.getZTreeObj("elementtree");
    var keywords = $("#keyword").val();
    var nodes = treeObj.getNodesByParamFuzzy("name", keywords, null);
    if (nodes.length > 0) {
        treeObj.selectNode(nodes[0]);
    }
}


/*elementtree end*/

/*UILinked objecttree start*/
var setting2 = {
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
        beforeDrag: zTreeBeforeDrag,
        onClick: function(event, treeId, treeNode, clickFlag) {
            app.UILinked = treeNode.name;
        },

    }
};
// 页面初始化获取对象库
function getUILinkedObjectTree() {
    var transid = $("#transactSelect").val();
    $.ajax({
        url: address + 'object_repoController/queryObject_repoAll',
        type: 'post',
        data: { "transid": transid },
        success: function(data) {
            if (data !== null) {
                $.fn.zTree.init($("#UILinkedTree"), setting2, data.obj);
            }
        }
    });
}
//禁止拖动
function zTreeBeforeDrag(treeId, treeNodes) {
    return false;
}
//UI关联对象库中对象
function setUILinked() {
    var treeObj = $.fn.zTree.getZTreeObj("UILinkedTree"),
        nodes = treeObj.getSelectedNodes(),
        obj = nodes[0].name;
    $('#UILinkedInput').val(obj);

}
//解除关联
function removeUILinked() {
    var treeObj = $.fn.zTree.getZTreeObj("UILinkedTree");
    treeObj.checkAllNodes(false);
    $('#UILinkedInput').val('');
    $('#successModal').modal();
}
/*UILinked objecttree end*/

/*eleParent objecttree start*/
var setting3 = {
    view: {
        addHoverDom: false,
        removeHoverDom: false,
        selectedMulti: false
    },
    check: {
        enable: true,
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
        beforeDrag: zTreeBeforeDrag,
        onClick: function(event, treeId, treeNode, clickFlag) {
            app.eleParent = treeNode.name;
        },
    }
};
// 页面初始化获取对象库
function getEleParentObjectTree() {
    var transid = $("#transactSelect").val();
    $.ajax({
        url: address + 'object_repoController/queryObject_repoAll',
        type: 'post',
        data: { "transid": transid },
        success: function(data) {
            if (data !== null) {
                $.fn.zTree.init($("#eleParentTree"), setting2, data.obj);
            }
        }
    });
}
//禁止拖动
function zTreeBeforeDrag(treeId, treeNodes) {
    return false;
}
//设置对象库中父对象
function setEleParent() {
    var treeObj = $.fn.zTree.getZTreeObj("eleParentTree"),
        nodes = treeObj.getSelectedNodes(),
        obj = nodes[0].name;
    $('#eleParentInput').val(obj);

}
/*eleParent objecttree end*/

/*eleLinked objecttree start*/
var setting4 = {
    view: {
        addHoverDom: false,
        removeHoverDom: false,
        selectedMulti: false
    },
    check: {
        enable: true,
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
        beforeDrag: zTreeBeforeDrag,
        onClick: function(event, treeId, treeNode, clickFlag) {
            app.eleLinked = treeNode.name;
        },

    }
};
// 页面初始化获取对象库
function getEleLinkedObjectTree() {
    var transid = $("#transactSelect").val();
    $.ajax({
        url: address + 'object_repoController/queryObject_repoAll',
        type: 'post',
        data: { "transid": transid },
        success: function(data) {
            if (data !== null) {
                $.fn.zTree.init($("#eleLinkedTree"), setting2, data.obj);
            }
        }
    });
}
//禁止拖动
function zTreeBeforeDrag(treeId, treeNodes) {
    return false;
}
//设置对象库中关联对象
function setEleLinked() {
    var treeObj = $.fn.zTree.getZTreeObj("eleLinkedTree"),
        nodes = treeObj.getSelectedNodes(),
        obj = nodes[0].name;
    $('#eleLinkedInput').val(obj);

}
/*eleLinked objecttree end*/

//勾选关联元素名称
function relateNameClick(event) {
    if ($(event.target).attr('checked')) {

    }
}