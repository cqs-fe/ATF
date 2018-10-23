var app = new Vue({
    el: '#component',
    data: function() {
        var _this = this;
        return {
        className: '控件类型',
        classId: '',
        methodId: '',
        methodName: '方法',
        classList: [],
        methodList: [],
        failMSG: '操作失败啦！',
        classPropTr: '<tr><td><input type="radio" name="class"/></td><td ></td><td ></td></tr>',
        methodPropTr: '<tr><td><input type="radio" name="method"/></td><td ></td><td ></td></tr>',
        supRecParaTr: '<tr><td><input type="checkbox" name="supRec_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',        
        runtimeArgsParaTr: '<tr><td><input type="checkbox" name="runtimeArgs_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',        
        selfRecParaTr: '<tr><td><input type="checkbox" name="selfRec_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',        
        assistRecParaTr: '<tr><td><input type="checkbox" name="assistRec_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',        
        methodParaTr: '<tr><td><input type="checkbox" name="chk_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
        autId: '',
        autName: '被测系统名称',
        paraList: [],//参数列表
        supRecList: [],
        runtimeArgsList: [],
        selfRecList: [],
        assistRecList: [],
        }
    },
    ready: function() {
        this.getAutId();
        getClass();
        $('.2').addClass('open')
        $('.2 .arrow').addClass('open')
        $('.2-ul').css({display: 'block'})
        $('.2-0').css({color: '#ff6c60'})
    },
    methods: {
        //获取autid
        getAutId() {
            // var thisUrl = document.URL,
            //     getVal = thisUrl.split('?')[1],
            //     autId = getVal.split('&')[0].split('=')[1];
            this.autId = sessionStorage.getItem("autId");
        },
        //添加控件类型
        addClass: function() {
            var _this = this,
                name = $('#addClassForm input[name="name"]').val(),
                chsName = $('#addClassForm input[name="chsName"]').val(),
                descShort = $('#addClassForm input[name="descShort"]').val();
            var that=this;
            $.ajax({
                url: address3 + '/omClass/addSingleAutOmClass',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "name": name,
                    "chsName": chsName,
                    "descShort": descShort,
                    "autId": that.autId
                }),
                success: function(data) {
                    console.info(data);
                    if (data.respCode==0000) {
                        $('#successModal').modal();
                        getClass();
                    } else {
                        _this.failMSG=data.respMsg;
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
            var selectedTr = $('input[name="class"]:checked').parent().parent(),
                classid = selectedTr.attr('id');
            if (classid === undefined) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: address3 + '/omClass/deleteSingleAutOmClass',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "id": classid,
                    }),
                    success: function(data) {
                        console.info(data);
                        if (data.respCode==0000) {
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
        // 获取当前控件对应的方法
        getMethod() {
            var classId = $('input[name="class"]:checked').parent().parent().attr('id');
            var that=this;
            // console.log(that.classId)
            $.ajax({
                url: address3 + '/omMethod/queryAutDirectOmMethods',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: that.classId,
                }),
                success: function(data) {
                    $('#methodProp').children().remove();
                    var methodList = data.omMethodRespDTOList;
                    app.methodList = methodList;
                    for (var i = 0; i < methodList.length; i++) {
                        var methodTr = $('<tr></tr>'),
                            methodCheckTd = $(`<td><input type='radio' name='method' onclick='methodClick(event,${i})'/></td>`),
                            flagTd = $('<td ></td>'),
                            methodNameTd = $('<td ></td>'),
                            methodDescriptionTd = $('<td ></td>');
                        methodTr.attr('id', methodList[i].id);
                        if(methodList[i].overrideFlag==0){
                                flagTd.html('普通继承');    
                            }else if(methodList[i].overrideFlag==1){
                                flagTd.html('自身方法');
                            }else{
                                flagTd.html('');
                            }
                        methodNameTd.html(methodList[i].name);
                        methodDescriptionTd.html(methodList[i].descShort);
                        methodTr.append(methodCheckTd, flagTd, methodNameTd, methodDescriptionTd);
                        $('#methodProp').append(methodTr);

                        var tmpOption = $('<option>').text(methodList[i].mname).val(i);
                        $('#defaultMethodSelect').append(tmpOption);
                    }
                }
            });
        },
        //添加方法
        addMethod: function() {
            var name = $('#addMethodForm input[name="name"]').val(),
                descShort = $('#addMethodForm input[name="descShort"]').val(),
                mtype = $('#addMethodForm input[name="mtype"]').val();
                // author = $('#addMethodForm input[name="author"]').val(),
                // maintainTime = $('#addMethodForm input[name="maintainTime"]').val(),
                // outputvaluedesc = $('#addMethodForm input[name="outputvaluedesc"]').val(),
                // inputargdesc = $('#addMethodForm input[name="inputargdesc"]').val();
            var that=this;
            $.ajax({
                url: address3 + '/omMethod/addSingleAutOmMethod',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "autId": 1,
                    "classId": that.classId,
                    "name": name,
                    "descShort": descShort,
                    "mtype": 1,
                    // "overrideFlag": '',
                    // "isparameter": '',
                    // "arguments": '',
                    // "argsCount": '',
                    // "labelArgument": '',
                    // "inputArgsDesc": '',
                    // "outputArgsDesc": '',
                    // "waittime": '',
                    // "timeout": '',
                    // "creatorId": '',
                    // "visibilityFlag": '',
                    // "targetCodeContent": ''
                }),
                success: function(data) {
                    if (data.respCode==0000) {
                          $('#successModal').modal();
                             //查询当前构件类型对应的方法
                            that.getMethod();
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
            var selectedTr = $('input[name="method"]:checked').parent().parent(),
                methodid = selectedTr.attr('id');
            var that=this;
            if (methodid === undefined) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: address3 + '/omMethod/deleteSingleAutOmMethod ',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "id": methodid,
                    }),
                    success: function(data) {
                        console.info(data);
                        if (data.respCode==0000) {
                            $('#successModal').modal();
                            that.getMethod();
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
        //添加控件supRec参数
        addSupRecPara: function(e) {
            var curTbody = $('#supRecTbody');
            curTbody.append(this.supRecParaTr);
        },
        //删除控件supRec参数
        delSupRecPara: function(e) {
            var selectedTr = $('#supRecTbody').find('input[name="supRec_list"]:checked').parent().parent();
            selectedTr.remove();
        },
        
        //添加控件runtimeArgs参数
        addRuntimeArgsPara: function(e) {
            var curTbody = $('#runtimeArgsTbody');
            curTbody.append(this.runtimeArgsParaTr);
        },
        //删除控件runtimeArgs参数
        delRuntimeArgsPara: function(e) {
            var selectedTr = $('#runtimeArgsTbody').find('input[name="runtimeArgs_list"]:checked').parent().parent();
            selectedTr.remove();
        },

        //添加控件selfRec参数
        addSelfRecPara: function(e) {
            var curTbody = $('#selfRecTbody');
            curTbody.append(this.selfRecParaTr);
        },
        //删除控件selfRec参数
        delSelfRecPara: function(e) {
            var selectedTr = $('#selfRecTbody').find('input[name="selfRec_list"]:checked').parent().parent();
            selectedTr.remove();
        },

        //添加控件assistRec参数
        addAssistRecPara: function(e) {
            var curTbody = $('#assistRecTbody');
            curTbody.append(this.assistRecParaTr);
        },
        //删除控件assistRec参数
        delAssistRecPara: function(e) {
            var selectedTr = $('#assistRecTbody').find('input[name="assistRec_list"]:checked').parent().parent();
            selectedTr.remove();
        },

        //添加方法参数
        addMethodPara: function(e) {
            var curTbody = $(e.target).parent().next().find('tbody');
            curTbody.append(this.methodParaTr);
        },
        //删除方法参数
        delMethodPara: function(e) {
            var selectedTr = $(e.target).parent().next().find('input[name="chk_list"]:checked').parent().parent();
            selectedTr.remove();
        },
        //修改控件类型
        updateClass: function() {
            var name = $('#classForm input[name="name"]').val(),
                chsName = $('#classForm input[name="chsName"]').val(),
                descShort = $('#classForm input[name="descShort"]').val(),
                overideFlag = $('#overideFlag').val(),
                defaultMethod = $('#defaultMethodSelect').val(),
                visibilityFlag = $('#visibilityFlag').val();

            // picfile = $('#');

            //supRecParaList
            var supRecParaList = '[',
                pTable = $('#supportedRecognitionTable'),
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
                supRecParaList += r;
            }
            if (supRecParaList.length > 1) {
                supRecParaList = supRecParaList.substring(0, supRecParaList.length - 1);
            }
            supRecParaList += ']';

            //runtimeArgsParaList
            var runtimeArgsParaList = '[',
                pTable = $('#runtimeArgsTable'),
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
                runtimeArgsParaList += r;
            }
            if (runtimeArgsParaList.length > 1) {
                runtimeArgsParaList = runtimeArgsParaList.substring(0, runtimeArgsParaList.length - 1);
            }
            runtimeArgsParaList += ']';

            //selfRecParaList
            var selfRecParaList = '[',
                pTable = $('#selfRecTable'),
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
                selfRecParaList += r;
            }
            if (selfRecParaList.length > 1) {
                selfRecParaList = selfRecParaList.substring(0, selfRecParaList.length - 1);
            }
            selfRecParaList += ']';

            //assistRecParaList
            var assistRecParaList = '[',
                pTable = $('#assistRecTable'),
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
                assistRecParaList += r;
            }
            if (assistRecParaList.length > 1) {
                assistRecParaList = assistRecParaList.substring(0, assistRecParaList.length - 1);
            }
            assistRecParaList += ']';

            var that = this;
            $.ajax({
                url: address3 + '/omClass/modifySingleAutOmClass',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "id": that.classId,
                    "name": name,
                    "chsName": chsName,
                    "autId": that.autId,
                    "descShort": descShort,
                    "defaultMethod": defaultMethod,
                    "supportedRecognitionPros": supRecParaList,
                    "runtimeArgs": runtimeArgsParaList,
                    "selfRecognitionPros": selfRecParaList,
                    "assistRecognitionPros": assistRecParaList,
                    "overideFlag": overideFlag,
                    "creatorId": '',
                    "modifierId": '',
                    "visibilityFlag": visibilityFlag
                }),
                success: function(data) {
                    if (data.respCode == 0000) {
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
        },

        //修改方法
        updateMethod: function() {
            var methodname = $('#methodForm input[name="name"]').val(),
                methoddescription = $('#methodForm input[name="description"]').val(),
                overrideFlag=$('#methodForm select[name="overrideFlag"]').val(),
                visibilityFlag=$('#methodForm select[name="visibilityFlag"]').val(),
                labelArgument=$('#methodForm input[name="labelArgument"]').val(),
                waittime = $('#methodForm input[name="waittime"]').val(),
                timeout = $('#methodForm input[name="timeout"]').val(),
                targetCodeContent = $('#methodForm textarea[name="targetCodeContent"]').val();
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
            console.log(paraList)
            var that=this;
            $.ajax({
                url: address3 + '/omMethod/modifySingleAutOmMethod',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "id": that.methodId,
                    "classId": that.classId,
                    "autId": that.autId,
                    "name": methodname,
                    "descShort": methoddescription,
                    "mtype": '1',
                    "overrideFlag":overrideFlag,
                    "visibilityFlag": visibilityFlag,
                    "argsCount": '',
                    "labelArgument": labelArgument,
                    "author": '',
                    "waittime": waittime,
                    "timeout": timeout,
                    "outputArgsDesc":'',
                    "inputArgsDesc":'',
                    "targetCodeContent": targetCodeContent,
                    "arguments": paraList,
                }),
                success: function(data) {
                    if (data.respCode==0000) {
                        $('#successModal').modal();
                        that.getMethod();
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
        url: address3 + '/aut/queryAutVisibleOmClasses',
        type: 'post',
        data: JSON.stringify({ 'id': autId }),
        contentType: 'application/json',
        success: function(data) {
            // console.log(data)
            $('#classProp').children().remove();
            var classList = data.omClassRespDTOList;
            app.classList=classList;
            // console.log(classList)
            if(classList){
                for (var i = 0; i < classList.length; i++) {
                    var classTr = $('<tr></tr>'),
                        classCheckTd = $(`<td><input type='radio' name='class' onclick='classClick(event,${i})'/></td>`),
                        overideFlagTd = $('<td ></td>'),
                        classNameTd = $('<td ></td>'),
                        classDescriptionTd = $('<td ></td>');
                    classTr.attr('id', classList[i].id);
                    overideFlagTd.attr('id', classList[i].overideFlag);
                    if(classList[i].overideFlag==1){
                        overideFlagTd.html('自身控件');
                    }else if(classList[i].overideFlag==2){
                        overideFlagTd.html('继承自父类');
                    }else if(classList[i].overideFlag==3){
                        overideFlagTd.html('重载继承');
                    }else if(classList[i].overideFlag==4){
                        overideFlagTd.html('禁用');
                    }else if(classList[i].overideFlag==5){
                        overideFlagTd.html('重定义');
                    }else{
                        overideFlagTd.html('');
                    }
                    classNameTd.html(classList[i].name);
                    classDescriptionTd.html(classList[i].descShort);
                    classTr.append(classCheckTd, overideFlagTd ,classNameTd, classDescriptionTd);
                    $('#classProp').append(classTr);
                }
            }
        },
        error: function() {
            $('#failModal').modal();
        }
    });
}
// 点击控件类型
function classClick(event, i) {
    if ($(event.target).attr("checked")) {
        $('#classSection').css('display', 'block');
        $('#methodSection').css('display', 'none');

        //查询当前构件类型对应的方法
        app.classId = $(event.target).parent().parent().attr('id');
        let overideFlag=$(event.target).parent().next().attr('id');
        $.ajax({
            url: address3 + '/aut/queryAutVisibleOmMethods',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                id: app.classId,
                autId: app.autId,
                overrideFlag: overideFlag
            }),
            success: function(data) {
                if ($('#methodProp').children()) {
                    $('#methodProp').children().remove();
                }
                // console.log(data)
                var methodList = data.omMethodRespDTOList;
                app.methodList = methodList;
                // console.log(app.methodList);
                for (let i = 0; i < methodList.length; i++) {
                    var methodTr = $('<tr></tr>'),
                        methodCheckTd = $(`<td><input type='radio' name='method' onclick='methodClick(event,${i})'/></td>`),
                        flagTd = $('<td ></td>'),
                        methodNameTd = $('<td ></td>'),
                        methodDescriptionTd = $('<td ></td>');
                    methodTr.attr('id', methodList[i].id);
                    if (methodList[i].overrideFlag == 1) {
                        flagTd.html('自身方法');
                    } else if (methodList[i].overrideFlag == 2) {
                        flagTd.html('继承自父类');
                    } else if (methodList[i].overrideFlag == 3) {
                        flagTd.html('重载继承');
                    } else if (methodList[i].overrideFlag == 4) {
                        flagTd.html('禁用');
                    } else {
                        flagTd.html('');
                    }
                    methodNameTd.html(methodList[i].name);
                    methodDescriptionTd.html(methodList[i].descShort);
                    methodTr.append(methodCheckTd, flagTd, methodNameTd, methodDescriptionTd);
                    $('#methodProp').append(methodTr);

                    // var tmpOption = $('<option>').text(methodList[i].mname).val(i);
                    // $('#defaultMethodSelect').append(tmpOption);
                }


                //classForm内容封装
                $('#classForm input[name="name"]').val('');
                $('#classForm input[name="chsName"]').val('');
                $('#classForm input[name="descShort"]').val('');
                $('#overideFlag').val('');
                $('#defaultMethod').val('');
                $('#visibilityFlag').val('');
                // $('#classForm input[name="creator"]').val('');
                // $('#classForm input[name="createTime"]').val('');
                // $('#classForm input[name="modifier"]').val('');
                // $('#classForm input[name="modifiedTime"]').val('');
                var curClass = app.classList[i];
                // console.log(curClass)
                $('#classForm input[name="chsName"]').val(curClass.chsName);
                $('#classForm input[name="name"]').val(curClass.name);
                $('#classForm input[name="descShort"]').val(curClass.descShort);
                // $('#classForm input[name="creator"]').val(curClass.creatorId);
                // $('#classForm input[name="createTime"]').val(curClass.createTime);
                // $('#classForm input[name="modifier"]').val(curClass.modifierId);
                // $('#classForm input[name="modifiedTime"]').val(curClass.modifiedTime);
                // $('#previewImg').attr("src", curClass.picSample);
                $('#overideFlag').val(curClass.overideFlag);
                $('#defaultMethod').val(curClass.defaultMethod);
                $('#visibilityFlag').val(curClass.visibilityFlag);

                supRecList = JSON.parse(curClass.supportedRecognitionPros);
                if ($('#supRecTbody').children()) {
                    $('#supRecTbody').children().remove();
                }
                if (supRecList) {
                    for (let i = 0; i < supRecList.length; i++) {
                        var paraTr = $('<tr></tr>'),
                            paraCheckTd = $('<td><input type="checkbox" name="supRec_list"/></td>'),
                            paraNameTd = $('<td contenteditable="true"></td>'),
                            paraDescriptionTd = $('<td contenteditable="true"></td>');
                        paraNameTd.html(supRecList[i].name);
                        paraDescriptionTd.html(supRecList[i].value);
                        paraTr.append(paraCheckTd, paraNameTd, paraDescriptionTd);
                        $('#supRecTbody').append(paraTr);
                    }
                }


                runtimeArgsList = JSON.parse(curClass.runtimeArgs);
                if ($('#runtimeArgsTbody').children()) {
                    $('#runtimeArgsTbody').children().remove();
                }
                if (runtimeArgsList) {
                    for (let i = 0; i < runtimeArgsList.length; i++) {
                        var paraTr = $('<tr></tr>'),
                            paraCheckTd = $('<td><input type="checkbox" name="runtimeArgs_list"/></td>'),
                            paraNameTd = $('<td contenteditable="true"></td>'),
                            paraDescriptionTd = $('<td contenteditable="true"></td>');
                        paraNameTd.html(runtimeArgsList[i].name);
                        paraDescriptionTd.html(runtimeArgsList[i].value);
                        paraTr.append(paraCheckTd, paraNameTd, paraDescriptionTd);
                        $('#runtimeArgsTbody').append(paraTr);
                    }
                }


                selfRecList = JSON.parse(curClass.selfRecognitionPros);
                $('#selfRecTbody').children().remove();
                if (selfRecList) {
                    for (let i = 0; i < selfRecList.length; i++) {
                        var paraTr = $('<tr></tr>'),
                            paraCheckTd = $('<td><input type="checkbox" name="selfRec_list"/></td>'),
                            paraNameTd = $('<td contenteditable="true"></td>'),
                            paraDescriptionTd = $('<td contenteditable="true"></td>');
                        paraNameTd.html(selfRecList[i].name);
                        paraDescriptionTd.html(selfRecList[i].value);
                        paraTr.append(paraCheckTd, paraNameTd, paraDescriptionTd);
                        $('#selfRecTbody').append(paraTr);
                    }
                }

                assistRecList = JSON.parse(curClass.assistRecognitionPros);
                if ($('#assistRecTbody').children()) {
                    $('#assistRecTbody').children().remove();
                }
                if (assistRecList) {
                    for (let i = 0; i < assistRecList.length; i++) {
                        var paraTr = $('<tr></tr>'),
                            paraCheckTd = $('<td><input type="checkbox" name="assistRec_list"/></td>'),
                            paraNameTd = $('<td contenteditable="true"></td>'),
                            paraDescriptionTd = $('<td contenteditable="true"></td>');
                        paraNameTd.html(assistRecList[i].name);
                        paraDescriptionTd.html(assistRecList[i].value);
                        paraTr.append(paraCheckTd, paraNameTd, paraDescriptionTd);
                        $('#assistRecTbody').append(paraTr);
                    }
                }

            }
        });
        var overrideFlag=$(event.target).parent().next().html();
        // console.log(overrideFlag)
        if(overrideFlag=='继承自父类'){//不能修改/刪除  不能添加方法
            $('#classForm input').attr('disabled','disabled');
            $('#classForm select').attr('disabled','disabled');
            $('.c-right-table tr td').attr('contenteditable', false);
            $('#addMethodBtn').attr('disabled','disabled');
            $('#delMethodBtn').attr('disabled','disabled');
        }else if(overrideFlag=='禁用'){//可以修改/刪除   不能添加方法
            $('#classForm input').attr('disabled',false);
            $('#classForm select').attr('disabled',false);
            $('.c-right-table tr td').attr('contenteditable', true);
            $('#addMethodBtn').attr('disabled','disabled');
            $('#delMethodBtn').attr('disabled','disabled');
        }else{//可以修改/刪除， 可以添加方法
            $('#classForm input').attr('disabled',false);
            $('#classForm select').attr('disabled',false);
            $('.c-right-table tr td').attr('contenteditable', true);
            $('#addMethodBtn').attr('disabled',false);
            $('#delMethodBtn').attr('disabled',false);
        }
    }
}
// 勾选方法
function methodClick(event,i) {
    if ($(event.target).attr('checked')) {
        $('#classSection').css('display', 'none');
        $('#methodSection').css('display', 'block');

        $('#methodForm input[name="name"]').val('');
        $('#methodForm input[name="description"]').val('');
        $('#methodForm select[name="overrideFlag"]').val('');
        $('#methodForm select[name="visibilityFlag"]').val('');
        $('#methodForm input[name="labelArgument"]').val('');
        $('#methodForm input[name="waittime"]').val('');
        $('#methodForm input[name="timeout"]').val('');
        $('#methodForm textarea[name="targetCodeContent"]').val('');
        app.paraList=[];
        // $('#methodPara').children().remove();
        app.methodId = $(event.target).parent().parent().attr('id');
        var curMethod = app.methodList[i];
        // console.log(curMethod);
        $('#methodForm input[name="name"]').val(curMethod.name);
        $('#methodForm input[name="description"]').val(curMethod.descShort);
        $('#methodForm select[name="overrideFlag"]').val(curMethod.overrideFlag);
        $('#methodForm select[name="visibilityFlag"]').val(curMethod.visibilityFlag);
        $('#methodForm input[name="labelArgument"]').val(curMethod.labelArgument);
        $('#methodForm input[name="waittime"]').val(curMethod.waittime);
        $('#methodForm input[name="timeout"]').val(curMethod.timeout);
        $('#methodForm textarea[name="targetCodeContent"]').val(curMethod.targetCodeContent);
        app.paraList = JSON.parse(curMethod.arguments);
        // console.log(app.paraList)
        var overrideFlag=$(event.target).parent().next().html();
        // console.log(overrideFlag)
        if(overrideFlag=='继承自父类'){//不能修改/刪除
            $('#methodForm input').attr('disabled','disabled');
            $('#methodForm select').attr('disabled','disabled');
            $('#methodForm textarea').attr('disabled','disabled');
            $('#delMethodBtn').attr('disabled','disabled');
            $('.m-right-table tr td').attr('contenteditable', false);
        }else{
            $('#methodForm input').attr('disabled',false);
            $('#methodForm select').attr('disabled',false);
            $('#methodForm textarea').attr('disabled',false);
            $('#delMethodBtn').attr('disabled',false);
            $('.m-right-table tr td').attr('contenteditable', true);
        }

    }
}

//预览上传图片
function imgPreview(fileDom){
    //判断是否支持FileReader
    if (window.FileReader) {
        var reader = new FileReader();
    } else {
        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
    }

    //获取文件
    var file = fileDom.files[0];
    // picfile = file;
    var imageType = /^image\//;
    //是否是图片
    if (!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
    }
    //读取完成
    reader.onload = function(e) {
        //获取图片dom
        var img = document.getElementById("previewImg");
        //图片路径设置为读取的图片
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}