var app = new Vue({
    el: '#component',
    data: {
        className: '控件类型',
        classId: '',
        methodId: '',
        methodName: '方法',
        classPropTr: '<tr><td><input type="radio" name="class"/></td><td ></td><td ></td></tr>',
        methodPropTr: '<tr><td><input type="radio" name="method"/></td><td ></td><td ></td></tr>',
        methodParaTr: '<tr><td><input type="checkbox" name="methodPara_check"/></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
        autId: '',
        autName: '被测系统名称',
        paraList: [],//参数列表
    },
    ready: function() {
        this.getAutId();
        getClass();
        $('.2').addClass('open');
        $('.2 .arrow').addClass('open');
        $('.2-ul').css({display: 'block'});
        $('.2-0').css({color: '#ff6c60'});
    },
    methods: {
        //获取autid
        getAutId() {
            this.autId = sessionStorage.getItem("autId");
        },
        //添加控件类
        addClass: function() {
            var classname = $('#addClassForm input[name="classname"]').val(),
                descname = $('#addClassForm input[name="descname"]').val();
            if(classname==''){
                alert('名称不能为空');
            }else if(descname==''){
                alert('描述不能为空');
            }else{
                $.ajax({
                    url: address + 'omclassController/insertSelective',
                    type: 'post',
                    data: {
                        "classname": classname,
                        "descname": descname,
                        "autId": this.autId
                    },
                    success: function(data) {
                        console.info(data);
                        if (data.success) {
                            $('#successModal').modal();
                            getClass();
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
        //删除控件类型
        delClass: function(e) {
            var selectedTr = $(e.target).parent().next().find('input[name="class"]:checked').parent().parent(),
                classid = selectedTr.attr('id');
            if (classid === undefined) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: address + 'omclassController/delete',
                    type: 'post',
                    data: {
                        "classid": classid,
                    },
                    success: function(data) {
                        console.info(data);
                        if (data.success) {
                            $('#successModal').modal();
                            getClass();
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
                methoddesc = $('#addMethodForm input[name="methoddesc"]').val();
            let that=this;
            if(methodname==''){
                alert('名称不能为空');
            }else if(methoddesc==''){
                alert('描述不能为空');
            }else{
                $.ajax({
                    url: address + 'ommethodController/insertSelective',
                    type: 'post',
                    data: {
                        "forClassid": that.classId,
                        "mname": methodname,
                        "mdesc": methoddesc,
                        "mtype": '',
                        "argsCount": '',
                        "labelArgument": '',
                        'author': '',
                        "maintainTime": '',
                        "outputvaluedesc": '',
                        "inputargdesc": ''
                    },
                    success: function(data) {
                        if (data.success) {
                             $('#successModal').modal();
                             //查询当前构件类型对应的方法
                            that.classId = $('input[name="class"]:checked').parent().parent().attr('id');
                            $.ajax({
                                url: address + 'ommethodController/selectByClassId',
                                type: 'post',
                                data: {
                                    forClassid: that.classId,
                                },
                                success: function(data) {
                                    $('#methodProp').children().remove();
                                    var methodList = data.obj;
                                    for (var i = 0; i < methodList.length; i++) {
                                        var methodTr = $('<tr></tr>'),
                                            methodCheckTd = $("<td><input type='radio' name='method' onclick='methodClick(event)'/></td>"),
                                            methodNameTd = $('<td ></td>'),
                                            methodDescriptionTd = $('<td ></td>');
                                        methodTr.attr('id', methodList[i].methodid);
                                        methodNameTd.html(methodList[i].mname);
                                        methodDescriptionTd.html(methodList[i].mdesc);
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
        //删除方法
        delMethod: function() {
            var selectedTr = $('input[name="method"]:checked').parent().parent(),
                methodid = selectedTr.attr('id');
            let that=this;
            if (methodid === undefined) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: address + 'ommethodController/delete',
                    type: 'post',
                    data: {
                        "methodid": methodid,
                    },
                    success: function(data) {
                        if (data.success) {
                            $('#successModal').modal();
                             //查询当前构件类型对应的方法
                            that.classId = $('input[name="class"]:checked').parent().parent().attr('id');
                            $.ajax({
                                url: address + 'ommethodController/selectByClassId',
                                type: 'post',
                                data: {
                                    forClassid: that.classId,
                                },
                                success: function(data) {
                                    $('#methodProp').children().remove();
                                    var methodList = data.obj;
                                    for (var i = 0; i < methodList.length; i++) {
                                        var methodTr = $('<tr></tr>'),
                                            methodCheckTd = $("<td><input type='radio' name='method' onclick='methodClick(event)'/></td>"),
                                            methodNameTd = $('<td ></td>'),
                                            methodDescriptionTd = $('<td ></td>');
                                        methodTr.attr('id', methodList[i].methodid);
                                        methodNameTd.html(methodList[i].mname);
                                        methodDescriptionTd.html(methodList[i].mdesc);
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
        //添加参数
        addPara: function() {
            $('#methodPara').append(this.methodParaTr);
        },
        //删除参数
        delPara: function() {
            var selectedTr = $('input[name="methodPara_check"]:checked').parent().parent();
            selectedTr.remove();
        },
        //修改控件类型
        updateClass: function() {
            var classname = $('#classForm input[name="classname"]').val(),
                descname = $('#classForm input[name="descname"]').val();
            $.ajax({
                url: address + 'omclassController/update',
                type: 'post',
                data: {
                    "classid": app.classId,
                    "classname": classname,
                    'descname': descname,
                    'autId': this.autId
                },
                success: function(data) {
                    if (data.success) {
                        $('#successModal').modal();
                        $('#classForm input[name="classname"]').val('');
                        $('#classForm input[name="descname"]').val('');
                        getClass();
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
                labelArgument = $('#methodForm input[name="labelArgument"]').val(), 
                // maintainTime = $('#methodForm input[name="maintainTime"]').val(),
                executecode=$('#methodForm textarea[name="executecode"]').val();
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
            paraList += ']';
            $.ajax({
                url: address + 'ommethodController/update',
                type: 'post',
                data: {
                    "methodid": this.methodId,
                    "forClassid": this.classId,
                    "mname": methodname,
                    "mdesc": methoddescription,
                    "mtype": '1',
                    "argsCount": '',
                    "labelArgument": labelArgument,
                    "author": '',
                    "maintaintime": '',
                    "outputvaluedesc":'',
                    "autId":  this.autId,
                    "inputargdesc":'',
                    "executecode": executecode,
                    "arguments": paraList,
                    "classMapflag":''
                },
                success: function(data) {
                    if (data.success) {
                        $('#successModal').modal();
                        $('#methodProp input[name="method"]').parent().next().text(methodname);
                        $('#methodProp input[name="method"]').parent().next().next().text(methoddescription);
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },

    },

});

//获取当前被测系统的控件类型
function getClass() {
    var autName=sessionStorage.getItem("autName");
    var autId=sessionStorage.getItem("autId");
    $('.autName').html(autName);
    $.ajax({
        url: address + 'omclassController/selectByAutId',
        type: 'post',
        data: { 'autId': autId },
        success: function(data) {
            // console.log(data)
            $('#classProp').children().remove();
            var classList = data;
            for (var i = 0; i < classList.length; i++) {
                var classTr = $('<tr></tr>'),
                    classCheckTd = $("<td><input type='radio' name='class' onclick='classClick(event)'/></td>"),
                    classNameTd = $('<td ></td>'),
                    classDescriptionTd = $('<td ></td>');
                classTr.attr('id', classList[i].classid);
                classNameTd.html(classList[i].classname);
                classDescriptionTd.html(classList[i].descname);
                classTr.append(classCheckTd, classNameTd, classDescriptionTd);
                $('#classProp').append(classTr);
            }
        },
        error: function() {
            $('#failModal').modal();
        }
    });
}
// 勾选控件类型
function classClick(event) {
    if ($(event.target).attr("checked")) {
        $('#classSection').css('display', 'block');
        $('#methodSection').css('display', 'none');
        $('#classForm input[name="classname"]').val('');
        $('#classForm input[name="descname"]').val('');
        var curName = $(event.target).parent().next().html();
        var curDesc = $(event.target).parent().next().next().html();
        $('#classForm input[name="classname"]').val(curName);
        $('#classForm input[name="descname"]').val(curDesc);
        //查询当前构件类型对应的方法
        app.classId = $(event.target).parent().parent().attr('id');
        $.ajax({
            url: address + 'ommethodController/selectByClassId',
            type: 'post',
            data: {
                forClassid: app.classId,
            },
            success: function(data) {
                $('#methodProp').children().remove();
                var methodList = data.obj;
                for (var i = 0; i < methodList.length; i++) {
                    var methodTr = $('<tr></tr>'),
                        methodCheckTd = $("<td><input type='radio' name='method' onclick='methodClick(event)'/></td>"),
                        methodNameTd = $('<td ></td>'),
                        methodDescriptionTd = $('<td ></td>');
                    methodTr.attr('id', methodList[i].methodid);
                    methodNameTd.html(methodList[i].mname);
                    methodDescriptionTd.html(methodList[i].mdesc);
                    methodTr.append(methodCheckTd, methodNameTd, methodDescriptionTd);
                    $('#methodProp').append(methodTr);
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
        $('#methodForm input[name="labelArgument"]').val('');
        // $('#methodForm input[name="maintainTime"]').val('');
        $('#methodForm textarea[name="executecode"]').val('');
        app.paraList=[];

        app.methodId = $(event.target).parent().parent().attr('id');
        $.ajax({
            url: address + 'ommethodController/selectByPrimaryKey',
            type: 'post',
            data: {
                methodid: app.methodId,
            },
            success: function(data) {
                $('#methodPara').children().remove();
                var method = data.obj;
                $('#methodForm input[name="name"]').val(method.mname);
                $('#methodForm input[name="description"]').val(method.mdesc);
                $('#methodForm input[name="labelArgument"]').val(method.labelArgument);
                // $('#methodForm input[name="maintainTime"]').val(method.maintainTime);
                $('#methodForm textarea[name="executecode"]').val(method.executecode);
                app.paraList = method.argumentslist;
            }
        });
    }
}