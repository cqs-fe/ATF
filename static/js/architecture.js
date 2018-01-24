var app = new Vue({
    el: '#architecture',
    data: {
        archiName: '抽象架构',
        className: '控件类型',
        classId: '',
        methodId: '',
        methodName: '方法',
        propTr: '<tr><td><input type="radio" name="chk_list"/></td><td ></td><td ></td></tr>',
        paraTr: '<tr><td><input type="checkbox" name="chk_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
        archiList:[],
        methodList:[],
        methodParamList:[],
    },
    ready: function() {
        getArchiTree();
        this.getArchiList();
        $('.2').addClass('open')
        $('.2 .arrow').addClass('open')
        $('.2-ul').css({display: 'block'})
        $('.2-1').css({color: '#ff6c60'});
    },
    methods: {
        addArchi: function() {
            var architecturecode = $('#addArchForm input[name="architecturecode"]').val(),
                architecturename = $('#addArchForm input[name="architecturename"]').val(),
                inherit = $('#addArchForm select[name="inherit"]').val(),
                description = $('#addArchForm textarea[name="description"]').val();
            $.ajax({
                url: address+'abstractarchitectureController/insert',
                type: 'post',
                data: {
                    "architecturecode": architecturecode,
                    "architecturename": architecturename,
                    "inherit": inherit,
                    "description": description
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                       $('#successModal').modal();
                       getArchiTree();
                    } else {
                        $('#failModal').modal();
                    }
                    $('input[type="reset"]').trigger('click');                    
                },
                error: function() {
                    $('#failModal').modal();
                    $('input[type="reset"]').trigger('click');                    
                }
            });
        },
        delArchi: function() {
            var treeObj = $.fn.zTree.getZTreeObj("archiTree");
            var nodes = treeObj.getCheckedNodes(true);
            var ids;
            if (nodes.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                for (var i = 0; i < nodes.length; i++) {
                    ids = nodes[i].id;
                }
                $.ajax({
                    url: address+'abstractarchitectureController/delete',
                    type: 'post',
                    data: {
                        "id": ids,
                    },
                    success: function(data) {
                        console.info(data);
                        if (data.success) {
                            $('#successModal').modal();
                            getArchiTree();
                        } else {
                            $('#failModal').modal();
                        }
                        $('input[type="reset"]').trigger('click');                    
                    },
                    error: function() {
                        $('#failModal').modal();
                        $('input[type="reset"]').trigger('click');                    
                    }
                });
            }

        },
        updateArchi: function() {
            var architecturecode = $('#updateArchForm input[name="architecturecode"]').val(),
                architecturename = $('#updateArchForm input[name="architecturename"]').val(),
                inherit = $('#updateArchForm select[name="inherit"]').val(),
                description = $('#updateArchForm textarea[name="description"]').val(),
                treeObj = $.fn.zTree.getZTreeObj("archiTree"),
                nodes = treeObj.getCheckedNodes(true),
                id = nodes[0].id;
            $.ajax({
                url: address+'abstractarchitectureController/update',
                type: 'post',
                data: {
                    "id": id,
                    "architecturecode": architecturecode,
                    "architecturename": architecturename,
                    "inherit": inherit,
                    "description": description
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                        getArchiTree();
                    } else {
                        $('#failModal').modal();
                    }
                    $('input[type="reset"]').trigger('click');                    
                },
                error: function() {
                    $('#failModal').modal();
                    $('input[type="reset"]').trigger('click');                    
                }
            });
        },
        //获取增加开发架构modal中父架构list
        getArchiList(){
            $.ajax({
                url:address+"abstractarchitectureController/showarchitecture",
                success:function(data){
                    this.archiList=data.obj;
                    console.log(this.archiList)
                }
            })
        },
        //添加控件类型
        addClass: function() {
            var eclassname = $('#addClassForm input[name="eclassname"]').val(),
                cclassname = $('#addClassForm input[name="cclassname"]').val(),
                // defaultmethodname = $('#addClassForm select[name="defaultmethodname"]').val(),
                treeObj = $.fn.zTree.getZTreeObj("archiTree"),
                nodes = treeObj.getSelectedNodes(true),
                arcid = nodes[0].id;
            if(eclassname==""){
                alert('英文名称不能为空');
            }else if(cclassname==''){
                alert('中文名称不能为空');
            }else{
                $.ajax({
                    url: address+'classController/insert',
                    type: 'post',
                    data: {
                        "eclassname": eclassname,
                        "cclassname": cclassname,
                        "defaultmethodname": '',
                        "arcid": arcid,
                        "supportparameterlist": ''

                    },
                    success: function(data) {
                        if (data.success) {
                            // window.location.reload();
                            var treeObj = $.fn.zTree.getZTreeObj("archiTree");
                            var nodes = treeObj.getSelectedNodes();
                            var arcid=nodes[0].id;
                            //查询class
                            $.ajax({
                                url: address+'classController/classquery',
                                type: 'post',
                                data: {
                                    "arcid": arcid,
                                    "eclassname": '',
                                    "cclassname": '',
                                    "defaultmethodname": ''
                                },
                                success: function(data) {
                                    //控件类型
                                    var classList = data.obj;
                                    if (classList.length !== 0) {
                                        $('#classProp').children().remove();
                                        for (var i = 0; i < classList.length; i++) {
                                            var classTr = $('<tr></tr>'),
                                                classCheckTd = $("<td><input type='radio' name='class' onclick='classClick(event)'/></td>"),
                                                eclassNameTd = $('<td ></td>'),
                                                cclassNameTd = $('<td ></td>');
                                            classTr.attr('id', classList[i].id);
                                            eclassNameTd.html(classList[i].eclassname);
                                            cclassNameTd.html(classList[i].cclassname);
                                            classTr.append(classCheckTd, eclassNameTd, cclassNameTd);
                                            $('#classProp').append(classTr);
                                        }
                                    } else {
                                        $('#classProp').children().remove();
                                        $('#classProp').append(app.propTr);
                                    }

                                },
                                error: function() {
                                    $('#failModal').modal();
                                }
                            });
                        } else {
                            $('#failModal').modal();
                        }
                        $('input[type="reset"]').trigger('click');                    
                    },
                    error: function() {
                        $('#failModal').modal();
                        $('input[type="reset"]').trigger('click');                    
                    }
                });
            }
        },
        //删除控件类型
        delClass: function() {
            var selectedTr = $('input[name="class"]:checked').parent().parent(),
                id = selectedTr.attr('id');
            if (id === undefined) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: address+'classController/delete',
                    type: 'post',
                    data: {
                        "id": id,
                    },
                    success: function(data) {
                        console.info(data);
                        if (data.success) {
                            $('#successModal').modal();
                            var treeObj = $.fn.zTree.getZTreeObj("archiTree");
                            var nodes = treeObj.getSelectedNodes();
                            var arcid=nodes[0].id;
                            //查询class
                            $.ajax({
                                url: address+'classController/classquery',
                                type: 'post',
                                data: {
                                    "arcid": arcid,
                                    "eclassname": '',
                                    "cclassname": '',
                                    "defaultmethodname": ''
                                },
                                success: function(data) {
                                    //控件类型
                                    var classList = data.obj;
                                    if (classList.length !== 0) {
                                        $('#classProp').children().remove();
                                        for (var i = 0; i < classList.length; i++) {
                                            var classTr = $('<tr></tr>'),
                                                classCheckTd = $("<td><input type='radio' name='class' onclick='classClick(event)'/></td>"),
                                                eclassNameTd = $('<td ></td>'),
                                                cclassNameTd = $('<td ></td>');
                                            classTr.attr('id', classList[i].id);
                                            eclassNameTd.html(classList[i].eclassname);
                                            cclassNameTd.html(classList[i].cclassname);
                                            classTr.append(classCheckTd, eclassNameTd, cclassNameTd);
                                            $('#classProp').append(classTr);
                                        }
                                    } else {
                                        $('#classProp').children().remove();
                                        $('#classProp').append(app.propTr);
                                    }

                                },
                                error: function() {
                                    $('#failModal').modal();
                                }
                            });

                        } else {
                            $('#failModal').modal();
                        }
                    },
                    error: function() {
                        $('#failModal').modal();
                    }
                });
            }
        },
        //添加方法
        addMethod: function() {
            var methodname = $('#addMethodForm input[name="methodname"]').val(),
                methoddescription = $('#addMethodForm input[name="methoddescription"]').val(),
                objectcode = $('#addMethodForm textarea[name="objectcode"]').val(),
                isparameter = $('#addMethodForm select[name="isparameter"]').val(),
                waittime = $('#addMethodForm input[name="waittime"]').val(),
                timeout = $('#addMethodForm input[name="timeout"]').val();
            var that=this;
            $.ajax({
                url: address+'methodController/insert',
                type: 'post',
                data: {
                    "methodname": methodname,
                    "methoddescription": methoddescription,
                    "parameterlist": '',
                    "objectcode": objectcode,
                    "arcclassid": that.classId,
                    "isparameter": isparameter,
                    "waittime": waittime,
                    "timeout": timeout
                },
                success: function(data) {
                    if (data.success) {
                        $('#successModal').modal();
                        //查询当前构件类型对应的方法
                        that.classId = $('input[name="class"]:checked').parent().parent().attr('id');
                        $.ajax({
                            url: address+'methodController/methodquery',
                            type: 'post',
                            data: {
                                arcclassid: that.classId,
                                methodname: '',
                                methoddescription: ''
                            },
                            success: function(data) {
                                $('#methodProp').children().remove();
                                var methodList = data.obj;
                                that.methodList=methodList;
                                for (var i = 0; i < methodList.length; i++) {
                                    var methodTr = $('<tr></tr>'),
                                        methodCheckTd = $("<td><input type='radio' name='method' onclick='methodClick(event)'/></td>"),
                                        methodNameTd = $('<td ></td>'),
                                        methodDescriptionTd = $('<td ></td>');
                                    methodTr.attr('id', methodList[i].id);
                                    methodNameTd.html(methodList[i].methodname);
                                    methodDescriptionTd.html(methodList[i].methoddescription);
                                    methodTr.append(methodCheckTd, methodNameTd, methodDescriptionTd);
                                    $('#methodProp').append(methodTr);
                                }
                            }
                        });
                    } else {
                        $('#failModal').modal();
                    }
                    $('input[type="reset"]').trigger('click');                    
                },
                error: function() {
                    $('#failModal').modal();
                    $('input[type="reset"]').trigger('click');                    
                }
            });

        },
        //删除方法
        delMethod: function(e) {
            var selectedTr = $('input[name="method"]:checked').parent().parent(),
                id = selectedTr.attr('id');
            var that=this;
            if (id === undefined) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: address+'methodController/delete',
                    type: 'post',
                    data: {
                        "id": id,
                    },
                    success: function(data) {
                        console.info(data);
                        if (data.success) {
                            $('#successModal').modal();
                            //查询当前构件类型对应的方法
                            that.classId = $('input[name="class"]:checked').parent().parent().attr('id');
                            $.ajax({
                                url: address+'methodController/methodquery',
                                type: 'post',
                                data: {
                                    arcclassid: that.classId,
                                    methodname: '',
                                    methoddescription: ''
                                },
                                success: function(data) {
                                    $('#methodProp').children().remove();
                                    var methodList = data.obj;
                                    that.methodList=methodList;
                                    for (var i = 0; i < methodList.length; i++) {
                                        var methodTr = $('<tr></tr>'),
                                            methodCheckTd = $("<td><input type='radio' name='method' onclick='methodClick(event)'/></td>"),
                                            methodNameTd = $('<td ></td>'),
                                            methodDescriptionTd = $('<td ></td>');
                                        methodTr.attr('id', methodList[i].id);
                                        methodNameTd.html(methodList[i].methodname);
                                        methodDescriptionTd.html(methodList[i].methoddescription);
                                        methodTr.append(methodCheckTd, methodNameTd, methodDescriptionTd);
                                        $('#methodProp').append(methodTr);
                                    }
                                }
                            });
                            $('#methodForm')[0].reset();
                        } else {
                            $('#failModal').modal();
                        }
                    },
                    error: function() {
                        $('#failModal').modal();
                    }
                });
            }

        },
        //添加参数
        addPara: function(e) {
            var curTbody = $(e.target).parent().next().find('tbody');
            curTbody.append(this.paraTr);
        },
        //删除参数
        delPara: function(e) {
            var selectedTr = $(e.target).parent().next().find('input[name="chk_list"]:checked').parent().parent();
            selectedTr.remove();
        },
        //修改控件类型
        updateClass: function() {
            var eclassname = $('#classForm input[name="ename"]').val(),
                cclassname = $('#classForm input[name="cname"]').val(),
                defaultmethodname = $('#classForm select[name="dname"]').val(),
                treeObj = $.fn.zTree.getZTreeObj("archiTree"),
                nodes = treeObj.getSelectedNodes(true),
                arcid = nodes[0].id;
            $.ajax({
                url: address+'classController/update',
                type: 'post',
                data: {
                    "id": app.classId,
                    "eclassname": eclassname,
                    "cclassname": cclassname,
                    "defaultmethodname": defaultmethodname,
                    "arcid": arcid,
                    "supportparameterlist": ''
                },
                success: function(data) {
                    if (data.success) {
                        $('#successModal').modal();
                        var treeObj = $.fn.zTree.getZTreeObj("archiTree");
                        var nodes = treeObj.getSelectedNodes();
                        var arcid = nodes[0].id;
                        //查询class
                        $.ajax({
                            url: address + 'classController/classquery',
                            type: 'post',
                            data: {
                                "arcid": arcid,
                                "eclassname": '',
                                "cclassname": '',
                                "defaultmethodname": ''
                            },
                            success: function(data) {
                                //控件类型
                                var classList = data.obj;
                                if (classList.length !== 0) {
                                    $('#classProp').children().remove();
                                    for (var i = 0; i < classList.length; i++) {
                                        var classTr = $('<tr></tr>'),
                                            classCheckTd = $("<td><input type='radio' name='class' onclick='classClick(event)'/></td>"),
                                            eclassNameTd = $('<td ></td>'),
                                            cclassNameTd = $('<td ></td>');
                                        classTr.attr('id', classList[i].id);
                                        eclassNameTd.html(classList[i].eclassname);
                                        cclassNameTd.html(classList[i].cclassname);
                                        classTr.append(classCheckTd, eclassNameTd, cclassNameTd);
                                        $('#classProp').append(classTr);
                                    }
                                } else {
                                    $('#classProp').children().remove();
                                    $('#classProp').append(app.propTr);
                                }

                            },
                            error: function() {
                                $('#failModal').modal();
                            }
                        });
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        //修改方法
        updateMethod: function() {
            var methodname = $('#methodForm input[name="name"]').val(),
                methoddescription = $('#methodForm input[name="description"]').val(),
                objectcode = $('#methodForm textarea[name="objectcode"]').val(),
                isparameter = $('#methodForm select[name="isparameter"]').val(),
                waittime = $('#methodForm input[name="waittime"]').val(),
                timeout = $('#methodForm input[name="timeout"]').val();
            var paraList = '[',
                pTable = $('#pTable'),
                pRow = pTable.find('tr'),
                pCol = pRow[0].children;
            for (var j = 1; j < pRow.length; j++) {
                var r = '{';
                for (var i = 1; i < pCol.length; i++) {
                    var tds = pRow[j].children;
                    r += "\"" + pCol[i].id + "\"\:\"" + tds[i].innerHTML + "\",";
                }
                r = r.substring(0, r.length - 1);
                r += "},";
                paraList += r;
            }
            if(paraList.length>1){
               paraList = paraList.substring(0, paraList.length - 1); 
            }
            paraList += "]";
            var that=this;
            $.ajax({
                url: address+'methodController/update',
                type: 'post',
                data: {
                    "id": that.methodId,
                    "methodname": methodname,
                    "methoddescription": methoddescription,
                    "parameterlist": paraList,
                    "objectcode": objectcode,
                    "arcclassid": app.classId,
                    "isparameter": isparameter,
                    "waittime": waittime,
                    "timeout": timeout
                },
                success: function(data) {
                    if (data.success) {
                        // window.location.reload();
                        $('#successModal').modal();
                        //查询当前构件类型对应的方法
                        that.classId = $('input[name="class"]:checked').parent().parent().attr('id');
                        $.ajax({
                            url: address + 'methodController/methodquery',
                            type: 'post',
                            data: {
                                arcclassid: that.classId,
                                methodname: '',
                                methoddescription: ''
                            },
                            success: function(data) {
                                $('#methodProp').children().remove();
                                var methodList = data.obj;
                                that.methodList = methodList;
                                for (var i = 0; i < methodList.length; i++) {
                                    var methodTr = $('<tr></tr>'),
                                        methodCheckTd = $("<td><input type='radio' name='method' onclick='methodClick(event)'/></td>"),
                                        methodNameTd = $('<td ></td>'),
                                        methodDescriptionTd = $('<td ></td>');
                                    methodTr.attr('id', methodList[i].id);
                                    methodNameTd.html(methodList[i].methodname);
                                    methodDescriptionTd.html(methodList[i].methoddescription);
                                    methodTr.append(methodCheckTd, methodNameTd, methodDescriptionTd);
                                    $('#methodProp').append(methodTr);
                                }
                            }
                        });
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        }
    },

});

/*architree start*/
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
            pIdKey: 'inherit', //父id编号命名
            rootPId: 0
        },
        key: {
            name: 'architecturename'
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
        onCheck: function(event, treeId, treeNode) {
            //查询抽象架构
            $.ajax({
                url: address+'abstractarchitectureController/abstractarchitecturequery',
                type: 'post',
                data: {
                    "id": treeNode.id,
                    "architecturecode": '',
                    "architecturename": '',
                    "inherit": '',
                    "description": ''
                },
                success: function(data) {
                    $('#updateArchForm input[name="architecturecode"]').val('');
                    $('#updateArchForm input[name="architecturename"]').val('');
                    $('#updateArchForm select[name="inherit"]').val('');
                    $('#updateArchForm textarea[name="description"]').val('');
                    var archList = data.obj,
                        architecturecode = archList[0].architecturecode,
                        architecturename = archList[0].architecturename,
                        inherit = archList[0].inherit,
                        description = archList[0].description;
                    $('#updateArchForm input[name="architecturecode"]').val(architecturecode);
                    $('#updateArchForm input[name="architecturename"]').val(architecturename);
                    $('#updateArchForm select[name="inherit"]').val(inherit);
                    $('#updateArchForm textarea[name="description"]').val(description);
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        onClick: function(event, treeId, treeNode, clickFlag) {
            app.archiName = treeNode.architecturename;
            //查询class
            $.ajax({
                url: address+'classController/classquery',
                type: 'post',
                data: {
                    "arcid": treeNode.id,
                    "eclassname": '',
                    "cclassname": '',
                    "defaultmethodname": ''
                },
                success: function(data) {
                    //控件类型
                    var classList = data.obj;
                    if (classList.length !== 0) {
                        $('#classProp').children().remove();
                        for (var i = 0; i < classList.length; i++) {
                            var classTr = $('<tr></tr>'),
                                classCheckTd = $("<td><input type='radio' name='class' onclick='classClick(event)'/></td>"),
                                eclassNameTd = $('<td ></td>'),
                                cclassNameTd = $('<td ></td>');
                            classTr.attr('id', classList[i].id);
                            eclassNameTd.html(classList[i].eclassname);
                            cclassNameTd.html(classList[i].cclassname);
                            classTr.append(classCheckTd, eclassNameTd, cclassNameTd);
                            $('#classProp').append(classTr);
                        }
                    } else {
                        $('#classProp').children().remove();
                        $('#classProp').append(app.propTr);
                    }

                },
                error: function() {
                    $('#failModal').modal();
                }
            });
            //查询抽象架构
            $.ajax({
                url: address+'abstractarchitectureController/abstractarchitecturequery',
                type: 'post',
                data: {
                    "id": treeNode.id,
                    "architecturecode": '',
                    "architecturename": '',
                    "inherit": '',
                    "description": ''
                },
                success: function(data) {
                    $('#updateArchForm input[name="architecturecode"]').val('');
                    $('#updateArchForm input[name="architecturename"]').val('');
                    $('#updateArchForm select[name="inherit"]').val('');
                    $('#updateArchForm textarea[name="description"]').val('');
                    var archList = data.obj,
                        architecturecode = archList[0].architecturecode,
                        architecturename = archList[0].architecturename,
                        inherit = archList[0].inherit,
                        description = archList[0].description;
                    $('#updateArchForm input[name="architecturecode"]').val(architecturecode);
                    $('#updateArchForm input[name="architecturename"]').val(architecturename);
                    $('#updateArchForm select[name="inherit"]').val(inherit);
                    $('#updateArchForm textarea[name="description"]').val(description);
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        }
    }
};
// 页面初始化获取抽象架构
function getArchiTree() {
    $.ajax({
        url: address+'abstractarchitectureController/selectAll',
        type: 'post',
        success: function(data) {
            if (data !== null) {
                $.fn.zTree.init($("#archiTree"), setting1, data.obj);
            }
        }
    });
}
//页面初始化获取默认方法名称列表
function getDefMethod() {
    $.ajax({
        url: address+'methodController/selectAll',
        type: 'post',
        success: function(data) {
            var methodList = data.obj;
            var str = "";
            methodList.forEach(function(item) {
                str += "<option value='" + item.id + "'>" + item.methodname + "</option>";
            });
            $('select[name="dname"]').html(str);
        }
    });
}
//禁止拖动
function zTreeBeforeDrag(treeId, treeNodes) {
    return false;
}
/*architree end*/

/*gmethodTree start*/
var setting2 = {
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
            pIdKey: 'pId', //父id编号命名
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
    }
};
//禁止拖动
function zTreeBeforeDrag(treeId, treeNodes) {
    return false;
}

var zNodes = [{
    id: 1,
    pId: 0,
    name: "一级1",
}, {
    id: 2,
    pId: 0,
    name: "一级2"
}];
// 页面初始化获取全局方法
$(document).ready(function() {
    $.fn.zTree.init($("#gmethodTree"), setting2, zNodes);
});
/*gmethodTree end*/

// 勾选控件类型
function classClick(event) {
    if ($(event.target).attr("checked")) {
        $('#classSection').css('display', 'block');
        $('#methodSection').css('display', 'none');
        //查询当前构件类型对应的方法
        app.classId = $(event.target).parent().parent().attr('id');
        $.ajax({
            url: address+'methodController/methodquery',
            type: 'post',
            data: {
                arcclassid: app.classId,
                methodname: '',
                methoddescription: ''
            },
            success: function(data) {
                $('#methodProp').children().remove();
                var methodList = data.obj;
                app.methodList=methodList;
                for (var i = 0; i < methodList.length; i++) {
                    var methodTr = $('<tr></tr>'),
                        methodCheckTd = $("<td><input type='radio' name='method' onclick='methodClick(event)'/></td>"),
                        methodNameTd = $('<td ></td>'),
                        methodDescriptionTd = $('<td ></td>');
                    methodTr.attr('id', methodList[i].id);
                    methodNameTd.html(methodList[i].methodname);
                    methodDescriptionTd.html(methodList[i].methoddescription);
                    methodTr.append(methodCheckTd, methodNameTd, methodDescriptionTd);
                    $('#methodProp').append(methodTr);
                }
            }
        });
        $.ajax({
            url: address+'classController/classquery',
            type: 'post',
            data: {
                id: app.classId,
                eclassname: '',
                cclassname: '',
                defaultmethodname: '',
                arcid: ''
            },
            success: function(data) {
                var classList = data.obj;
                for (var i = 0; i < classList.length; i++) {
                    $('#classForm input[name="ename"]').val(classList[i].eclassname);
                    $('#classForm input[name="cname"]').val(classList[i].cclassname);
                    $('#classForm select[name="dname"]').val(classList[i].defaultmethodname);
                }
            }
        });
    }
}
// 勾选方法
function methodClick(event) {
    if ($(event.target).attr('checked')) {
        $('#classSection').css('display', 'none');
        $('#methodSection').css('display', 'block');

        $('#methodForm input[name="name"]').val('');
        $('#methodForm input[name="description"]').val('');
        $('#methodForm select[name="isPara"]').val('');
        app.methodParamList=[];
        $('#methodForm select[name="waittime"]').val('');
        $('#methodForm select[name="timeout"]').val('');
        $('#methodForm textarea[name="objectcode"]').val('');
        app.methodId = $(event.target).parent().parent().attr('id');
        $.ajax({
            url: address+'methodController/methodquery',
            type: 'post',
            data: {
                id: app.methodId,
                methodname: '',
                methoddescription: '',
                defaultmethodname: '',
                arcclassid: ''
            },
            success: function(data) {
                var methodList = data.obj;
                for (var i = 0; i < methodList.length; i++) {
                    $('#methodForm input[name="name"]').val(methodList[i].methodname);
                    $('#methodForm input[name="description"]').val(methodList[i].methoddescription);
                    $('#methodForm select[name="isPara"]').val(methodList[i].isparameter);
                    $('#methodForm input[name="waittime"]').val(methodList[i].waittime);
                    $('#methodForm input[name="timeout"]').val(methodList[i].timeout);
                    $('#methodForm textarea[name="objectcode"]').val(methodList[i].objectcode);
                    app.methodParamList=methodList[i].parameterlist;
                }
            }
        });
    }
}

