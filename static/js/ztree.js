/**
 * Created by aitongwen on 2017/4/18.
 */
//元素库
$(document).ready(function() {
    getElementTree();
    getObjTree();
    getElementTree_Multi();
    getObjTree_Multi();
    $('select[name="transid"]').change(function() {
        getElementTree();
        getObjTree();
        getElementTree_Multi();
        getObjTree_Multi();
    })
})

function beforeClick(treeId, treeNode) {
    var check = (treeNode || treeNode.isParent);
    return check;
}

function onClick(e, treeId, treeNode,event) {
    var zTree = $.fn.zTree.getZTreeObj("element"),
        nodes = zTree.getSelectedNodes(),
        v = "";
    if (nodes.length > 0) {
        var node = nodes[0].getParentNode().name;
    }
    nodes.sort(function compare(a, b) {
        return a.id - b.id;
    });
    for (var i = 0, l = nodes.length; i < l; i++) {
        var s = nodes[i].name;
        var u = node;
        v = s + ">" + u;
    }
    if (v.length > 0)v.substring(0, v.length - 1);
    var elementObj = $("td input.uiSel",tr);//tr是范围
    elementObj.attr("value", s);
    var uiObj = $("td input.elementSel",tr);
    uiObj.attr("value", u);
    method();
    $("#p_functionWord").hide();
    $("#elementWord").css({"position": "absolute", "left": "130px", "top": "0px"});
    var n = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        n += nodes[i].id + ",";
    }
    if (n.length > 0)n = n.substring(0, n.length - 1);
    elementObj.attr("nameid", n);
}

function beforeclick(treeId, treeNode) {
    var check = (treeNode && !treeNode.isParent);
    if (!check) alert("请不要选择类别...");
    return check;
}

function onclick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("p_function"),
        nodes = zTree.getSelectedNodes(),
        v = "";
    nodes.sort(function compare(a, b) { return a.id - b.id; });
    for (var i = 0, l = nodes.length; i < l; i++) {
        v += nodes[i].classname + ",";
    }
    if (v.length > 0) v = v.substring(0, v.length - 1);
    var elementObj = $("td input.uiSel",tr);
    var st= " <option value='" +v+ "'>" +v+ "</option> ";
    elementObj.attr("value", v);
    $('select[name="method"]',tr).html(st);
    var uiObj = $("td input.elementSel",tr);
    uiObj.attr("value", "none");
    $("#elementWord").hide();
    $("#p_functionWord").css({"position":"absolute","left":"-150px","top":"180px"});
    var n = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        n += nodes[i].id + ",";
    }
    if (n.length > 0) n = n.substring(0, n.length - 1);
    elementObj.attr("nameid", n);
}

function ZtreebeforeClick(treeId, treeNode) {
    var check = (treeNode && !treeNode.isParent);
    if (!check) alert("请不要选择类别...");
    return check;
}

function ZtreeonClick(e, treeId, treeNode) {
    console.log("a");
    var zTree = $.fn.zTree.getZTreeObj("elementMulti"),
        nodes = zTree.getSelectedNodes(),
        html = "";
    nodes.sort(function compare(a, b) { return a.id - b.id; });
    if (nodes.length > 0) {
        var node = nodes[0].getParentNode().name;
    }
    for (var i = 0; i < nodes.length; i++) {
        html += "<tr id =''><td class='number'><input type='checkbox' class='checkboxes' value='1' /></td><td class='index'></td>" +
            "<td><label class='alignRight'>"+"UI:"+"</label><input id='uiSel' name='classname' type='text' readonly value='"+node+"'/><br><label class='alignRight'>"+"元素："+"</label><input id='elementSel' name='classname' type='text' readonly value='"+ nodes[i].name +"'/><i id='h'  class='glyphicon glyphicon-search icon' data-toggle='modal' href=''#addModal'></i></td>" +
            "<td> <select  style='width:200px;' name='method' class='glyphicon glyphicon-chevron-down' ></select> </td>" +
            "<td id='parameter'><div class='showInfornamt'><table id='paraList'></table> </div><i  id='href' class='glyphicon glyphicon-search icon'  onclick='cs();'></i> </td>"+
            "<td><i id='1' class='glyphicon glyphicon-plus icon' onclick='addRowByID(this.id)'></i></td></tr>";
        $('table[id="sort"]>tbody').append(html);
    }
    method();
}

function Ztreebeforeclick(treeId, treeNode) {
    var check = (treeNode && !treeNode.isParent);
    if (!check) alert("请不要选择类别...");
    return check;
}

function Ztreeonclick(e, treeId, treeNode) {
    console.log("a");
    var zTree = $.fn.zTree.getZTreeObj("p_functionMulti"),
        nodes = zTree.getSelectedNodes(),
        html = "";
    for (var i = 0; i < nodes.length; i++) {
        html += "<tr id =''><td class='number'><input type='checkbox' class='checkboxes' value='1' /></td><td class='index'></td>" +
            "<td><label class='alignRight'>"+"UI:"+"</label><input id='uiSel' name='classname' type='text' readonly value='"+ nodes[i].classname+"' /><br><label class='alignRight'>"+"元素："+"</label><input id='elementSel' name='classname' type='text' readonly value='none'/><i id='h'  class='glyphicon glyphicon-search icon' data-toggle='modal' href=''#addModal'></i></td>" +
            "<td> <select style='width:200px;' name='method' class='glyphicon glyphicon-chevron-down'><option>"+nodes[i].classname+"</option></select></td>" +
            "<td id='parameter'><div class='showInfornamt'><table id='paraList'></table> </div><i  id='href' class='glyphicon glyphicon-search icon'  onclick='cs();'></i> </td>"+
            "<td><i id='1' class='glyphicon glyphicon-plus icon' onclick='addRowByID(this.id)'></i></td></tr>";
        $('table[id="sort"]>tbody').append(html);
    }
}


//    if (nodes.length > 0) v = v.substring(0, v.length - 1);
//    var nameObj = $("#nameSel");
//    nameObj.attr("value", v);
    //var n = "";
    //for (var i = 0, l = nodes.length; i < l; i++) {
    //    n += nodes[i].id + ",";
    //}
    //if (n.length > 0) n = n.substring(0, n.length - 1);
    //nameObj.attr("nameid", n);

//function getPathText(node){//关键代码，通过treeNode遍历父亲节点，根节点再次调用getParentNode得到null终止循环
//    var s=node.name;
//    while(node=node.getParentNode())s=node.name+'/'+s;
//    return s;
//}

var setting = {
    check: {
        enable: true,
        chkStyle: "radio",
        radioType: "all"
    },
    callback:{
        beforeClick: beforeClick,
        onClick: onClick
        //onCheck:function(event,treeid,treeNode){
        //    $("#confirm").click(function(){
        //        var a=getPathText(treeNode);
        //        $("#3").html(a);
        //    })
        //}
        },
    data: {
        simpleData: {
            enable: true,
            idKey: 'id', //id编号命名
            pIdKey: 'parentid', //父id编号命名
            rootPId: 0
        }
    }
};


// 页面初始化获取
function getElementTree() {
    var transid = $("#transactSelect").val();
    console.info($.fn.zTree);
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/elementlibraryController/showUIandElement',
        //url: 'http://10.108.226.152:8080/userController/selectAllUser',
        type: 'POST',
        //crossdomain:true,
        dataType:'JSON',
        data: {"transid": transid },
        success: function(data) {
            if (data !== null) {
                $.fn.zTree.init($("#element"), setting, data.obj);
            }
        }
    });
}


var setting1 = {
    //async:{
    //    enable:false,
    //    dataFilter:null,
    //},
    check: {
        enable: true,
        chkStyle: "radio",
        radioType: "all"
    },
    callback:{
        beforeClick:  beforeclick,
        onClick: onclick
        },
    data: {
        key:{
            name:"classname"
        },
        simpleData: {
            enable: true,
            idKey: 'classid'  //classid编号命名
        }
    }
};

// 页面初始化获取
function getObjTree() {
    console.log("a");
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/omclassController/selectAll',
        type: 'POST',
        //crossdomain:true,
        dataType:'JSON',
        success: function(data) {
            if (data !== null) {
                $.fn.zTree.init($("#p_function"), setting1, data.obj);
            }
        }
    });
}

var setting2 = {
    check: {
        enable: true,
        chkStyle: "checkbox"

    },
    callback:{
        beforeClick: ZtreebeforeClick,
        onClick:  ZtreeonClick
    },
    data: {
        simpleData: {
            enable: true,
            idKey: 'id', //id编号命名
            pIdKey: 'parentid', //父id编号命名
            rootPId: 0
        }
    }
};

// 页面初始化获取
function getElementTree_Multi() {
    var transid = $("#transactSelect").val();
    console.info($.fn.zTree);
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/elementlibraryController/showUIandElement',
        //url: 'http://10.108.226.152:8080/userController/selectAllUser',
        type: 'POST',
        //crossdomain:true,
        dataType:'JSON',
        data: {"transid": transid },

        success: function(data) {
            if (data !== null) {
                console.info(data);
                $.fn.zTree.init($("#elementMulti"), setting2, data.obj);
            }
        }
    });
}

var setting3 = {
    check: {
        enable: true,
        chkStyle: "checkbox"

    },
    callback:{
        beforeClick: Ztreebeforeclick,
        onClick: Ztreeonclick
        //onCheck:function(event,treeid,treeNode){
        //    $("#confirm").click(function(){
        //        var a=getPathText(treeNode);
        //        $("#3").html(a);
        //    })
        //}
    },
    data: {
        key:{
            name:"classname",
        },
        simpleData: {
            enable: true,
            idKey: 'id', //id编号命名
            pIdKey: 'parentid', //父id编号命名
            rootPId: 0
        }
    }
};

// 页面初始化获取
function getObjTree_Multi() {
    console.info($.fn.zTree);
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/omclassController/selectAll',
        type: 'POST',
        dataType:'JSON',
        success: function(data) {
            if (data !== null) {
                $.fn.zTree.init($("#p_functionMulti"), setting3, data.obj);
            }
        }
    });
}