var app = new Vue({
    el: '#component',
    data: {
        className: '控件类型',
        classId: '',
        methodId: '',
        methodName: '方法',
        classPropTr: '<tr><td><input type="radio" name="class"/></td><td ></td><td ></td></tr>',
        methodPropTr: '<tr><td><input type="radio" name="method"/></td><td ></td><td ></td></tr>',
        paraTr: '<tr><td><input type="checkbox" name="chk_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
        autId: '',
        autName: '被测系统名称'
    },
    ready: function() {
        this.getAutId();
        getClass();
    },
    methods: {
        //获取autid
        getAutId() {
            var thisUrl = document.URL,
                getVal = thisUrl.split('?')[1],
                autId = getVal.split('=')[1];
            this.autId = autId;
        },
        //添加控件类型
        addClass: function() {
            var classname = $('#addClassForm input[name="classname"]').val(),
                descname = $('#addClassForm input[name="descname"]').val();
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/omclassController/insertSelective',
                type: 'post',
                data: {
                    "classname": classname,
                    "descname": descname,
                    "autId": this.autId
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        // window.location.reload();
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
        //删除控件类型
        delClass: function(e) {
            var selectedTr = $(e.target).parent().next().find('input[name="class"]:checked').parent().parent(),
                classid = selectedTr.attr('id');
            if (classid === undefined) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: 'http://10.108.226.152:8080/ATFCloud/omclassController/delete',
                    type: 'post',
                    data: {
                        "classid": classid,
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
            }

        },
        //添加方法
        addMethod: function() {
            var methodname = $('#addMethodForm input[name="methodname"]').val(),
                methoddesc = $('#addMethodForm input[name="methoddesc"]').val(),
                mtype = $('#addMethodForm input[name="mtype"]').val(),
                author = $('#addMethodForm input[name="author"]').val(),
                maintainTime = $('#addMethodForm input[name="maintainTime"]').val(),
                outputvaluedesc = $('#addMethodForm input[name="outputvaluedesc"]').val(),
                inputargdesc = $('#addMethodForm input[name="inputargdesc"]').val();

            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/ommethodController/insertSelective',
                type: 'post',
                data: {
                    "forClassid": this.classId,
                    "mname": methodname,
                    "mdesc": methoddesc,
                    "mtype": mtype,
                    "argsCount": '',
                    "labelArgument": '',
                    'author': author,
                    "maintainTime": maintainTime,
                    "outputvaluedesc": outputvaluedesc,
                    "inputargdesc": inputargdesc
                },
                success: function(data) {
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
        //删除方法
        delMethod: function(e) {
            var selectedTr = $(e.target).parent().next().find('input[name="method"]:checked').parent().parent(),
                methodid = selectedTr.attr('id');
            if (methodid === undefined) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: 'http://10.108.226.152:8080/ATFCloud/ommethodController/delete',
                    type: 'post',
                    data: {
                        "methodid": methodid,
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
            var classname = $('#classForm input[name="classname"]').val(),
                descname = $('#classForm input[name="descname"]').val();
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/omclassController/update',
                type: 'post',
                data: {
                    "classid": app.classId,
                    "classname": classname,
                    'descname': descname,
                    'autId': this.autId
                },
                success: function(data) {
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
        //修改方法
        updateMethod: function() {
            var methodname = $('#methodForm input[name="name"]').val(),
                methoddescription = $('#methodForm input[name="description"]').val(),
                waittime = $('#methodForm input[name="waittime"]').val();
            tableToJson();
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/ommethodController/update',
                type: 'post',
                data: {
                    "methodid": this.methodId,
                    "forClassid": this.classId,
                    "mname": methodname,
                    "mdesc": methoddescription,
                    "parameterlist": paraList,
                    "objectcode": objectcode,
                    "arcclassid": app.classId,
                    "autId": this.autId
                },
                success: function(data) {
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
        }
    },
    //获取参数列表
    tableToJson() {
        var paraList = '[',
            pTable = $('#pTable'),
            pRow = pTable.find('tr'),
            pCol = pRow[0].find('th');
        for (var j = 1; j < pRow.length; j++) {
            var r = '{';
            for (var i = 1; i < pCol.length; i++) {
                var tds = pRow[j].find('td');
                r += "\"" + pCol[i].innerHTML + "\"\:\"" + tds[i].innerHTML + "\",";
            }
            r = r.substring(0, r.length - 1);
            r += "},";
            paraList += r;
        }
        paraList = paraList.substring(0, paraList.length - 1);
        paraList += "]";
        return paraList;
    }
});

//获取当前被测系统的控件类型
function getClass() {
    var thisUrl = document.URL,
        getVal = thisUrl.split('?')[1],
        para = getVal.split('&'),
        autId=para[0].split('=')[1];
    var autName=decodeURI(para[1].split('=')[1]);
    $('.autName').html(autName);
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/omclassController/selectClassMethodByAutId',
        type: 'post',
        data: { 'autId': autId },
        success: function(data) {
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
            url: 'http://10.108.226.152:8080/ATFCloud/ommethodController/selectByClassId',
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
        $('#methodForm select[name="mtype"]').val('');
        $('#methodForm select[name="author"]').val('');
        $('#methodForm select[name="outputvaluedesc"]').val('');
        $('#methodForm select[name="inputargdesc"]').val('');

        app.methodId = $(event.target).parent().parent().attr('id');
        $.ajax({
            url: 'http://10.108.226.152:8080/ATFCloud/ommethodController/selectByPrimaryKey',
            type: 'post',
            data: {
                methodid: app.methodId,
            },
            success: function(data) {
                var method = data.obj;
                $('#methodForm input[name="name"]').val(method.mname);
                $('#methodForm input[name="description"]').val(method.mdesc);
                $('#methodForm input[name="mtype"]').val(method.mtype);
                $('#methodForm input[name="author"]').val(method.author);
                $('#methodForm input[name="outputvaluedesc"]').val(method.outputvaluedesc);
                $('#methodForm input[name="inputargdesc"]').val(method.inputargdesc);
                var paraList = method.argumentslist;
                console.log(paraList)
                if (paraList !== '') {
                    $('#methodPara').children().remove();
                }
                for (var j = 0; j < paraList.length; j++) {
                    var paraTr = $('<tr></tr>'),
                        checkTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                        nameTd = $('<td contenteditable="true"></td>'),
                        typeTd = $('<td contenteditable="true"></td>'),
                        descTd = $('<td contenteditable="true"></td>'),
                        paraColumnTd = $('<td contenteditable="true"></td>');
                    nameTd.html(paraList[j].name);
                    typeTd.html(paraList[j].type);
                    descTd.html(paraList[j].desc);
                    paraColumnTd.html(paraList[j].parameterizeColumn);
                    paraTr.append(checkTd, nameTd, typeTd, paraColumnTd, descTd);
                    $('#methodPara').append(paraTr);
                }

            }
        });
    }
}