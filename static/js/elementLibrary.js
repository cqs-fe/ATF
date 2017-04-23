var app = new Vue({
    el: '#elementLibrary',
    data: {
        autId: '',
        transactId: '',
        UIName: 'UI1',
        eleName: '元素1',
        propTr: '<tr><td><input type="checkbox" name="chk_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
        UILinked: '',
        eleParent: '',
        eleLinked: '',
        linkedTr: '<tr><td><input type="checkbox" name="chk_list"/></td><td contenteditable="true"></td></tr>',
    },
    ready: function() {
        this.autSelect();
        this.setval();
        $('#autSelect').change(function() {
            app.transactSelect();
        });
        getElementTree();
    },
    methods: {
        //获取测试系统
        autSelect: function() {
            $.ajax({
                async: false,
                url: "http://10.108.226.152:8080/ATFCloud/autController/selectAll",
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
                url: 'http://10.108.226.152:8080/ATFCloud/transactController/showalltransact',
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
            var thisURL = document.URL,
                getval = thisURL.split('?')[1],
                keyval = getval.split('&');
            this.autId = keyval[0].split('=')[1],
                this.transactId = keyval[1].split('=')[1];
            $("#autSelect").val(this.autId);
            $("#transactSelect").val(this.transactId);
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/transactController/transactqueryByPage',
                type: 'GET',
                async: false,
                data: {
                    'page': 1,
                    'rows': 10,
                    'order': 'id',
                    'sort': 'asc',
                    'id': this.transactId,
                    'transcode': '',
                    'transname': '',
                    'autctgId': '',
                    'descript': '',
                    'maintainer': '',
                    'autId': '',
                    'useStatus': ''
                },
                success: function(data) {
                    var transactList = data.o.rows;
                    // console.log(transactList)
                    var str = "";
                    for (var i = 0; i < transactList.length; i++) {

                        str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
                    }
                    $('#transactSelect').html(str);

                }
            });
        },
        addUI: function() {
            var UIName = $("#addUIName").val(),
                relateIdentifyObjectId = $("#addRelateIdentifyObjectId").val(),
                relateParentIdentifyObjectId = $("#addRelateParentIdentifyObjectId").val();
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/elementlibraryController/insertUI',
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
                        window.location.reload();
                        $('#successModal').modal();
                    } else {
                        window.location.reload();
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    window.location.reload();
                    $('#failModal').modal();
                }
            });
        },
        delUI: function() {
            var treeObj = $.fn.zTree.getZTreeObj("elementtree");
            var nodes = treeObj.getCheckedNodes(true);
            var delUIName = nodes[0].name;
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/elementlibraryController/deleteUI',
                type: 'post',
                data: {
                    "deleteUI": delUIName,
                    "transid": this.transactId,
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        window.location.reload();
                        $('#successModal').modal();
                    } else {
                        window.location.reload();
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    window.location.reload();
                    $('#failModal').modal();
                }
            });
        },
        addElement: function() {
            var ElementName = $("#addElementName").val(),
                ClassType = $("#addEleClassType").val(),
                relateIdentifyObjectId = $("#addEleRelateIdentifyObjectId").val(),
                relateParentIdentifyObjectId = $("#addEleRelateParentIdentifyObjectId").val(),
                treeObj = $.fn.zTree.getZTreeObj("elementtree"),
                nodes = treeObj.getCheckedNodes(true),
                selectedUIName = nodes[0].name;
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/elementlibraryController/insertElement',
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
                        window.location.reload();
                        $('#successModal').modal();
                    } else {
                        window.location.reload();
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    window.location.reload();
                    $('#failModal').modal();
                }
            });
        },
        delElement: function() {
            var treeObj = $.fn.zTree.getZTreeObj("elementtree");
            var nodes = treeObj.getCheckedNodes(true);
            var delElementName;
            for (var i = 1; i < nodes.length; i++) {
                delElementName = nodes[i].name;
            }
            var delUIName = nodes[0].name;
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/elementlibraryController/deleteUI',
                type: 'post',
                data: {
                    "deleteElements": delElementName,
                    "UIName": delUIName,
                    "transid": this.transactId,
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        window.location.reload();
                        $('#successModal').modal();
                    } else {
                        window.location.reload();
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    window.location.reload();
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
        addLinked: function(e) {
            var curTbody = $(e.target).parent().next().find('tbody');
            curTbody.append(this.linkedTr);
        },
        delLinked: function(e) {
            var selectedTr = $(e.target).parent().next().find('input[name="chk_list"]:checked').parent().parent();
            selectedTr.remove();
        }

    },
});

/*elementtree start*/
var setting1 = {
    view: {
        addHoverDom: false,
        removeHoverDom: false,
        selectedMulti: false
    },
    check: {
        enable: true,
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
    // 获取json数据
    // async: {
    //     enable: true,
    //     url: 'http://10.108.226.152:8080/ATFCloud/elementlibraryController/showUIandElement',
    //     autoParam: ['id',"name"], // 异步加载时自动提交的父节点属性的参数
    //     otherParam: { "transid": "1" }, //ajax请求时提交的参数
    //     dataFilter: filter,
    //     type: 'post'
    // },
    //回调函数
    callback: {
        onClick: function(event, treeId, treeNode, clickFlag) {
            if (treeNode.parentid == '0') {
                $(':input', '#UIForm').val('');
                app.UIName = treeNode.name;
                $('#UI').css('display', 'block');
                $('#ele').css('display', 'none');
            } else {
                $(':input', '#eleFrom').val('');
                app.eleName = treeNode.name;
                $('#UI').css('display', 'none');
                $('#ele').css('display', 'block');
            }
        },
        //捕获异步加载出现错误的回调函数和成功的回调函数
        onAsyncSuccess: function(event, treeId, treeNode, msg) {

        },
        beforeRemove: beforeRemove,
        beforeRename: beforeRename
    }
};
// 页面初始化获取
function getElementTree() {
    var transid = $("#transactSelect").val();
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/elementlibraryController/showUIandElement',
        type: 'post',
        data: { "transid": transid },
        success: function(data) {
            if (data !== null) {
                $.fn.zTree.init($("#elementtree"), setting1, data.obj);
            }
        }
    });
}

function filter(treeId, parentNode, childNodes) {
    if (!childNodes) return null;
    for (var i = 0, l = childNodes.length; i < l; i++) {
        childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
    }
    return childNodes;
}

$(document).ready(function() {
    // getElementTree();
    // $.fn.zTree.init($("#elementtree"), setting1);
    $.fn.zTree.init($("#UILinkedTree"), setting2);
    $.fn.zTree.init($("#eleParentTree"), setting3);
    $.fn.zTree.init($("#eleLinkedTree"), setting4);

});

var newCount = 1;

function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='add node' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    var btn = $("#addBtn_" + treeNode.tId);
    if (btn) btn.bind("click", function() {
        var zTree = $.fn.zTree.getZTreeObj("elementtree");
        if (confirm("确认为 " + treeNode.name + " 添加子节点吗？")) {
            // zTree.addNodes(treeNode, { id: (100 + newCount), pId: treeNode.id, name: "new node" + (newCount++) });
            var treeInfo = treeNode.id;
            $.ajax({
                url: "Ajax.aspx?_Pid=" + treeInfo + "&action=Insert",
                type: "POST",
                async: false,
                success: function(res) {
                    if (res = "success") {
                        $('#successModal').modal();
                        window.location.reload();
                    } else {
                        $('#failModal').modal();
                        window.location.reload();
                    }
                }
            });
        }
    });
}

function removeHoverDom(treeId, treeNode) {
    $("#addBtn_" + treeNode.tId).unbind().remove();
}
//删除节点回调函数
function beforeRemove(treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("elementtree");
    zTree.selectNode(treeNode);
    if (confirm("确认删除 节点 -- " + treeNode.name + " 吗？")) {
        var treeInfo = treeNode.id;
        $.ajax({
            url: "Ajax.aspx?_tid=" + treeInfo + "&action=Remove",
            type: "POST",
            async: false,
            success: function(res) {
                if (res = "success") {
                    $('#successModal').modal();
                    window.location.reload();
                } else {
                    $('#failModal').modal();
                    window.location.reload();
                }
            }
        });
    } else {
        window.location.reload();
    }
}

//修改节点名称回调函数
function beforeRename(treeId, treeNode, newName, isCancel) {
    if (newName.length == 0) {
        setTimeout(function() {
            var zTree = $.fn.zTree.getZTreeObj("elementtree");
            zTree.cancelEditName();
            alert("节点名称不能为空.");
        }, 0);
        return false;
    }
    var treeInfo = treeNode.id;
    $.ajax({
        url: "Ajax.aspx?_tid=" + treeInfo + "&_newname=" + newName + "&action=ReName",
        type: "POST",
        async: false,
        success: function(res) {
            if (res = "success") {
                $('#successModal').modal();
                window.location.reload();
            } else {
                $('#failModal').modal();
                window.location.reload();
            }
        }
    });
}


/*elementtree end*/

/*UILinked objecttree start*/
var setting2 = {
    view: {
        selectedMulti: false
    },
    check: {
        enable: false
    },
    data: {
        simpleData: {
            enable: true,
            idKey: 'id', //id编号命名
            pIdKey: 'pId', //父id编号命名
            rootPId: 0
        }
    },
    edit: {
        enable: false,
    },
    // 获取json数据
    async: {
        enable: true,
        url: '../mock/zNodes-object.json',
        autoParam: ['id'], // 异步加载时自动提交的父节点属性的参数
        otherParam: { "otherParam": "zTreeAsyncTest" }, //ajax请求时提交的参数
        dataFilter: filter,
        type: 'post'
    },
    //回调函数
    callback: {
        onClick: function(event, treeId, treeNode, clickFlag) {
            app.UILinked = treeNode.name;
        },
        //捕获异步加载出现错误的回调函数和成功的回调函数
        onAsyncSuccess: function(event, treeId, treeNode, msg) {

        },
    }
};
/*UILinked objecttree end*/

/*eleParent objecttree start*/
var setting3 = {
    view: {
        selectedMulti: false
    },
    check: {
        enable: false
    },
    data: {
        simpleData: {
            enable: true,
            idKey: 'id', //id编号命名
            pIdKey: 'pId', //父id编号命名
            rootPId: 0
        }
    },
    edit: {
        enable: false,
    },
    // 获取json数据
    async: {
        enable: true,
        url: '../mock/zNodes-object.json',
        autoParam: ['id'], // 异步加载时自动提交的父节点属性的参数
        otherParam: { "otherParam": "zTreeAsyncTest" }, //ajax请求时提交的参数
        dataFilter: filter,
        type: 'post'
    },
    //回调函数
    callback: {
        onClick: function(event, treeId, treeNode, clickFlag) {
            app.eleParent = treeNode.name;
        },
        //捕获异步加载出现错误的回调函数和成功的回调函数
        onAsyncSuccess: function(event, treeId, treeNode, msg) {

        },
    }
};
/*eleParent objecttree end*/

/*eleLinked objecttree start*/
var setting4 = {
    view: {
        selectedMulti: false
    },
    check: {
        enable: false
    },
    data: {
        simpleData: {
            enable: true,
            idKey: 'id', //id编号命名
            pIdKey: 'pId', //父id编号命名
            rootPId: 0
        }
    },
    edit: {
        enable: false,
    },
    // 获取json数据
    async: {
        enable: true,
        url: '../mock/zNodes-object.json',
        autoParam: ['id'], // 异步加载时自动提交的父节点属性的参数
        otherParam: { "otherParam": "zTreeAsyncTest" }, //ajax请求时提交的参数
        dataFilter: filter,
        type: 'post'
    },
    //回调函数
    callback: {
        onClick: function(event, treeId, treeNode, clickFlag) {
            app.eleLinked = treeNode.name;
        },
        //捕获异步加载出现错误的回调函数和成功的回调函数
        onAsyncSuccess: function(event, treeId, treeNode, msg) {

        },
    }
};
/*eleLinked objecttree end*/
