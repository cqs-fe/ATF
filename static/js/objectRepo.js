var app = new Vue({
    el: '#objectRepo',
    data: {
        autId: '',
        transactId: '',
        objId: '',
        objName: '',
        propTr: '<tr><td><input type="checkbox" name="chk_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
    },
    ready: function() {
        this.autSelect();
        this.setval();
        $('#autSelect').change(function() {
            app.transactSelect();
        });
        this.classtypeSelect();
        getObjTree();
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
        //获取classtype
        classtypeSelect: function() {
            var val = $('#autSelect').val();
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/autController/selectClass',
                data: { 'id': val },
                type: "POST",
                success: function(data) {
                    var classtypeList = data;
                    var str = "";
                    for (var i = 0; i < classtypeList.length; i++) {
                        str += " <option>" + classtypeList[i].className + "</option> ";
                    }
                    $('#classtypeSelect').html(str);

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
        addObj: function() {
            var objName = $("#addObjName").val(),
                treeObj = $.fn.zTree.getZTreeObj("objectTree"),
                nodes = treeObj.getCheckedNodes(true),
                parentid;
            if (nodes.length === 0) {
                parentid = "0";
            } else {
                parentid = nodes[0].id;
            }
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/object_repoController/insertObject_repo',
                type: 'post',
                data: {
                    "name": objName,
                    "transid": this.transactId,
                    "classtype": '',
                    "compositeType": '',
                    "parentElementId": parentid
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        window.location.reload();
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
            var treeObj = $.fn.zTree.getZTreeObj("objectTree");
            var nodes = treeObj.getCheckedNodes(true);
            var ids;
            for (var i = 0; i < nodes.length; i++) {
                ids = nodes[i].id;
            }

            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/object_repoController/deleteObejct_repo',
                type: 'post',
                data: {
                    "id": ids,
                    "transid": this.transactId,
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        window.location.reload();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        queryObj: function() {
            $(':input', '#objForm').val(' ');
            // $('#mainProp').children().remove();
            // $('#addiProp').children().remove();
            // $('#assisProp').children().remove();
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/object_repoController/queryObject_repo',
                type: 'post',
                data: {
                    "id": app.objId,
                    "transid": app.transactId,
                },
                success: function(data) {
                    console.log(data);
                    app.objName = data.obj.name;
                    $('#objForm input[name="name"]').val(data.obj.name);
                    $('#classtypeSelect').val(data.obj.classtype);
                    //主属性
                    var mainList = data.obj[0].locatePropertyCollection.main_properties;
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
                    //附加属性
                    var addiList = data.obj[0].locatePropertyCollection.addtional_properties;
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
                    //辅助属性
                    var assiList = data.obj[0].locatePropertyCollection.assistant_properties;
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
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        updateObj: function() {
            var treeObj = $.fn.zTree.getZTreeObj("objectTree"),
                nodes = treeObj.getCheckedNodes(true),
                id = nodes[0].id,
                name = nodes[0].name,
                parentElementId = nodes[0].parentid,
                classtype = $('#classtypeSelect').val();
            //主属性
            var mainTd,
                mainName = '',
                mainVal = '';
            $('#mainProp').find('tr').each(function() {
                mainTd = $(this).children();
                mainName = mainTd.eq(1).html(); //主属性名称
                mainVal = mainTd.eq(2).html(); //主属性值
            });
            //附加属性
            var addiTd,
                addiName = '',
                addiVal = '';
            $('#addiProp').find('tr').each(function() {
                addiTd = $(this).children();
                addiName = addiTd.eq(1).html(); //附加属性名称
                addiVal = addiTd.eq(2).html(); //附加属性值
            });
            //辅助属性
            var assisTd,
                assisName = '',
                assisVal = '';
            $('#assisProp').find('tr').each(function() {
                assisTd = $(this).children();
                assisName = assisTd.eq(1).html(); //辅助属性名称
                assisVal = assisTd.eq(2).html(); //辅助属性值
            });
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/object_repoController/updateObejct_repo',
                type: 'post',
                data: {
                    "id": id,
                    "transid": this.transactId,
                    "name": name,
                    "parentElementId": parentElementId,
                    "classtype": classtype,
                    "compositeType": "",
                    "mainpropertiesname": mainName,
                    "mainpropertiesvalue": mainVal,
                    "mainpropertiesmatchMethod": '',
                    "mainpropertiesisRelative": '',
                    "mainpropertiestoolName": '',
                    "addtionalpropertiesname": addiName,
                    "addtionalpropertiesvalue": addiVal,
                    "addtionalpropertiesmatchMethod": '',
                    "addtionalpropertiesisRelative": '',
                    "addtionalpropertiestoolName": '',
                    "assistantpropertiesname": assisName,
                    "assistantpropertiesvalue": assisVal,
                    "assistantpropertiesmatchMethod": '',
                    "assistantpropertiesisRelative": '',
                    "assistantpropertiestoolName": ''
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
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
        }

    },
});

/*objtree start*/
var setting1 = {
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
            $('classtypeSelect').val('');
            app.objName = treeNode.name;
            $('#objForm input[name="name"]').val(treeNode.name);
            app.objId = treeNode.id;
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/object_repoController/queryObject_repo',
                type: 'post',
                data: {
                    "id": app.objId,
                    "transid": app.transactId,
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
                        $('#mainProp').append(app.propTr);
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
                    }else{
                         $('#assisProp').children().remove();
                        $('#assisProp').append(app.propTr);
                    }

                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        // onCheck: function(event, treeId, treeNode) {
        //     $('classtypeSelect').val('');
        //     $('#mainProp').children().remove();
        //     $('#addiProp').children().remove();
        //     $('#assisProp').children().remove();
        //     app.objName = treeNode.name;
        //     $('#objForm input[name="name"]').val(treeNode.name);
        //     app.objId = treeNode.id;
        //     $.ajax({
        //         url: 'http://10.108.226.152:8080/ATFCloud/object_repoController/queryObject_repo',
        //         type: 'post',
        //         data: {
        //             "id": app.objId,
        //             "transid": app.transactId,
        //         },
        //         success: function(data) {
        //             console.log(data);
        //             $('#classtypeSelect').val(data.obj.classtype);
        //             //主属性
        //             var mainList = data.obj[0].locatePropertyCollection.main_properties;
        //             for (var i = 0; i < mainList.length; i++) {
        //                 var mainTr = $('<tr></tr>'),
        //                     mainCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
        //                     mainNameTd = $('<td contenteditable="true"></td>'),
        //                     mainValTd = $('<td contenteditable="true"></td>');
        //                 mainNameTd.html(mainList[i].name);
        //                 mainValTd.html(mainList[i].value);
        //                 mainTr.append(mainCheckTd, mainNameTd, mainValTd);
        //                 $('#mainProp').append(mainTr);
        //             }
        //             //附加属性
        //             var addiList = data.obj[0].locatePropertyCollection.addtional_properties;
        //             for (var j = 0; j < addiList.length; j++) {
        //                 var addiTr = $('<tr></tr>'),
        //                     addiCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
        //                     addiNameTd = $('<td contenteditable="true"></td>'),
        //                     addiValTd = $('<td contenteditable="true"></td>');
        //                 addiNameTd.html(addiList[j].name);
        //                 addiValTd.html(addiList[j].value);
        //                 addiTr.append(addiCheckTd, addiNameTd, addiValTd);
        //                 $('#addiProp').append(addiTr);
        //             }
        //             //辅助属性
        //             var assiList = data.obj[0].locatePropertyCollection.assistant_properties;
        //             for (var k = 0; k < assiList.length; k++) {
        //                 var assiTr = $('<tr></tr>'),
        //                     assiCheckTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
        //                     assiNameTd = $('<td contenteditable="true"></td>'),
        //                     assiValTd = $('<td contenteditable="true"></td>');
        //                 assiNameTd.html(assiList[k].name);
        //                 assiValTd.html(assiList[k].value);
        //                 assiTr.append(assiCheckTd, assiNameTd, assiValTd);
        //                 $('#assisProp').append(assiTr);
        //             }
        //         },
        //         error: function() {
        //             $('#failModal').modal();
        //         }
        //     });
        // },

    }
};
// 页面初始化获取元素库
function getObjTree() {
    var transid = $("#transactSelect").val();
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/object_repoController/queryObject_repoAll',
        type: 'post',
        data: { "transid": transid },
        success: function(data) {
            if (data !== null) {
                $.fn.zTree.init($("#objectTree"), setting1, data.obj);
            }
        }
    });
}

//禁止拖动
function zTreeBeforeDrag(treeId, treeNodes) {
    return false;
}

/*objtree end*/
