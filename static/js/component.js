var app = new Vue({
    el: '#component',
    data: {
        className: '控件类型',
        classId: '',
        methodId: '',
        methodName: '方法',
        classPropTr: '<tr><td><input type="radio" name="class"/></td><td ></td><td ></td></tr>',
        methodPropTr: '<tr><td><input type="radio" name="method"/></td><td ></td><td ></td></tr>',
        supRecParaTr: '<tr><td><input type="checkbox" name="supRec_list"/></td><td contenteditable="true"></td></tr>',        
        runtimeArgsParaTr: '<tr><td><input type="checkbox" name="runtimeArgs_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',        
        selfRecParaTr: '<tr><td><input type="checkbox" name="selfRec_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',        
        assistRecParaTr: '<tr><td><input type="checkbox" name="assistRec_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',        
        
        methodParaTr: '<tr><td><input type="checkbox" name="methodPara_check"/></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
        autId: '',
        autName: '被测系统名称',
        paraList: [],//参数列表
        supRecList: [],
        runtimeArgsList: [],
        selfRecList: [],
        assistRecList: [],
    },
    ready: function() {
        this.getAutId();
        getClass();
    },
    methods: {
        //获取autid
        getAutId() {
            this.autId = sessionStorage.getItem("autId");
        },
        //添加控件类型
        addClass: function() {
            var classname = $('#addClassForm input[name="classname"]').val(),
                descname = $('#addClassForm input[name="descname"]').val();
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

            $.ajax({
                url: address + 'ommethodController/insertSelective',
                type: 'post',
                data: {
                    "forClassid": this.classId,
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
                    url: address + 'ommethodController/delete',
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
        addMethodPara: function() {
            var curTbody = $("#methodPara");
            curTbody.append(this.methodParaTr);
        },
        //删除方法参数
        delMethodPara: function() {
            var selectedTr = $('#methodPara').find('input[name="methodPara_check"]:checked').parent().parent();
            selectedTr.remove();
        },
        //修改控件类型
        updateClass:function(){

            var className = $('#classForm input[name="classname"]').val(),
                descName = $('#classForm input[name="descname"]').val(),
           
                heritTagSelect = $('#heritTagSelect').val(), //接口尚未加入这个变量    
                // defaultMethodSel = $('#defaultMethodSelect'),
                // defaultMethod = defaultMethodSel.option[defaultMethodSel.selectedIndex].text(),
                defaultMethod = $("#defaultMethodSelect").find("option:selected").text(),
                visibilitySelect = $('#visibilitySelect').val(); //接口尚未加入这个变量

                picfile = $('#');

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
            if(supRecParaList.length>1){
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
            if(runtimeArgsParaList.length>1){
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
            if(selfRecParaList.length>1){
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
            if(assistRecParaList.length>1){
               assistRecParaList = assistRecParaList.substring(0, assistRecParaList.length - 1); 
            }
            assistRecParaList += ']';

            $.ajax({
                url: 'http://10.108.223.23:8080/ATFCloud2.0/omclassController/updateSelective',
                type: 'post',
                data: {
                    "id": app.classId,
                    "classname": className,
                    "descname": descName,
                    "autId": this.autId,
                    "descShort": null,
                    "defaultMethod": defaultMethod,
                    "supportedRecognitionPros":supRecParaList,
                    "runtimeArgs": runtimeArgsParaList,
                    "selfRecognitionPros": selfRecParaList,
                    "assistRecognitionPros": assistRecParaList,
                    "ordernum": null,
                    "modifierId": null,
                    "picfile": null,
                }

            });
        },

        //修改方法
        updateMethod: function() {
            var methodname = $('#methodForm input[name="name"]').val(),
                methoddescription = $('#methodForm input[name="description"]').val(),
                maintainTime = $('#methodForm input[name="maintainTime"]').val(),
                executecode = $('#methodForm textarea[name="executecode"]').val();
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
                    "labelArgument": '',
                    "author": '',
                    "maintaintime": maintainTime,
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
                    classHeritImgTd = $('<td ></td>'),
                    classNameTd = $('<td ></td>'),
                    classDescriptionTd = $('<td ></td>');
                classTr.attr('id', classList[i].classid);
                classHeritImgTd.html('<img src="http://58pic.ooopic.com/58pic/11/72/82/37I58PICgk5.jpg" width="20" height="20">');
                classNameTd.html(classList[i].classname);
                classDescriptionTd.html(classList[i].descname);
                classTr.append(classCheckTd, classHeritImgTd ,classNameTd, classDescriptionTd);
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
                $('#defaultMethodSelect').children().remove();
                var methodList = data.obj;
                for (var i = 0; i < methodList.length; i++) {
                    var methodTr = $('<tr></tr>'),
                        methodCheckTd = $("<td><input type='radio' name='method' onclick='methodClick(event)'/></td>"),
                        methodFlagTd = $('<td ></td>'),
                        methodNameTd = $('<td ></td>'),
                        methodDescriptionTd = $('<td ></td>');
                    methodTr.attr('id', methodList[i].id);
                    methodFlagTd.html(methodList[i].deleteFlag);
                    methodNameTd.html(methodList[i].name);
                    methodDescriptionTd.html(methodList[i].descShort);
                    methodTr.append(methodCheckTd, methodFlagTd, methodNameTd, methodDescriptionTd);
                    $('#methodProp').append(methodTr);
                          
                    var tmpOption = $('<option>').text(methodList[i].name).val(i);
                    $('#defaultMethodSelect').append(tmpOption);
                }


                //classForm内容封装
                $('#classForm input[name="classname"]').val('');
                $('#classForm input[name="descname"]').val('');
                $('#classForm input[name="creator"]').val('');
                $('#classForm input[name="createTime"]').val('');
                $('#classForm input[name="modifier"]').val('');
                $('#classForm input[name="modifiedTime"]').val('');
        
                $.ajax({
                    // url: 'http://10.108.223.23:8080/ATFCloud2.0/omclassController/selectByPrimaryKey',   //ATF2.0
                    url: '/api/postcomponent',
                    type: 'post',
                    data: {
                        forClassid: app.classId,
                    },
                    success: function(data) {
                        $('#classForm input[name="classname"]').val(data.name);
                        $('#classForm input[name="descname"]').val(data.descShort);
                        $('#classForm input[name="creator"]').val(data.creatorId);
                        $('#classForm input[name="createTime"]').val(data.createTime);
                        $('#classForm input[name="modifier"]').val(data.modifierId);
                        $('#classForm input[name="modifiedTime"]').val(data.modifiedTime);
        
                        $('#previewImg').attr("src",data.picSample);

                        $('#heritTagSelect').val(data.overideFlag).attr('selected',true);
                        $('#defaultMethodSelect').val(data.defaultMethod).attr('selected',true);                        
                        $('#visibilitySelect').val(data.visibilityFlag).attr('selected',true);

                        supRecList = data.supportedRecognitionPros;
                        $('#supRecTbody').children().remove();
                        for (var i = 0; i < supRecList.length; i++) {                            
                                var paraTr = $('<tr></tr>'),
                                paraCheckTd = $('<td><input type="checkbox" name="supRec_list"/></td>'),
                                paraNameTd = $('<td contenteditable="true"></td>');
                            paraNameTd.html(supRecList[i].name);
                            paraTr.append(paraCheckTd, paraNameTd);
                            $('#supRecTbody').append(paraTr);
                        }

                        runtimeArgsList = data.runtimeArgs;
                        $('#runtimeArgsTbody').children().remove();
                        for (var i = 0; i < supRecList.length; i++) {                            
                                var paraTr = $('<tr></tr>'),
                                paraCheckTd = $('<td><input type="checkbox" name="runtimeArgs_list"/></td>'),
                                paraNameTd = $('<td contenteditable="true"></td>'),
                                paraDescriptionTd = $('<td contenteditable="true"></td>');
                            paraNameTd.html(supRecList[i].name);
                            paraDescriptionTd.html(supRecList[i].value);
                            paraTr.append(paraCheckTd, paraNameTd, paraDescriptionTd);
                            $('#runtimeArgsTbody').append(paraTr);
                        } 

                        selfRecList = data.selfRecognitionPros;
                        $('#selfRecTbody').children().remove();
                        for (var i = 0; i < supRecList.length; i++) {                            
                                var paraTr = $('<tr></tr>'),
                                paraCheckTd = $('<td><input type="checkbox" name="selfRec_list"/></td>'),
                                paraNameTd = $('<td contenteditable="true"></td>'),
                                paraDescriptionTd = $('<td contenteditable="true"></td>');
                            paraNameTd.html(supRecList[i].name);
                            paraDescriptionTd.html(supRecList[i].value);
                            paraTr.append(paraCheckTd, paraNameTd, paraDescriptionTd);
                            $('#selfRecTbody').append(paraTr);
                        } 
                        
                        assistRecList = data.assistRecognitionPros;
                        $('#assistRecTbody').children().remove();
                        for (var i = 0; i < supRecList.length; i++) {                            
                                var paraTr = $('<tr></tr>'),
                                paraCheckTd = $('<td><input type="checkbox" name="assistRec_list"/></td>'),
                                paraNameTd = $('<td contenteditable="true"></td>'),
                                paraDescriptionTd = $('<td contenteditable="true"></td>');
                            paraNameTd.html(supRecList[i].name);
                            paraDescriptionTd.html(supRecList[i].value);
                            paraTr.append(paraCheckTd, paraNameTd, paraDescriptionTd);
                            $('#assistRecTbody').append(paraTr);
                        } 
                    }
                })
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
        $('#methodForm input[name="creator"]').val('');
        $('#methodForm input[name="createTime"]').val('');
        $('#methodForm input[name="modifier"]').val('');
        $('#methodForm input[name="modifiedTime"]').val('');
        $('#heritTagSelect').val('');
        $('#visibilitySelect').val('');
        $('#methodForm input[name="waittime"]').val('');
        $('#methodForm input[name="timeout"]').val('');
        $('#methodForm textarea[name="executecode"]').val('');
        app.paraList=[];

        app.methodId = $(event.target).parent().parent().attr('id');
        $.ajax({
            url: address + 'ommethodController/selectByPrimaryKey',
            type: 'post',
            data: {
                id: app.methodId,
            },
            success: function(data) {
                var method = data.ommethod;
                $('#methodForm input[name="name"]').val(method.name);
                $('#methodForm input[name="description"]').val(method.descShort);
                $('#methodForm input[name="creator"]').val(method.creatorId);
                $('#methodForm input[name="createTime"]').val(method.createTime);
                $('#methodForm input[name="modifier"]').val(method.modifierId);
                $('#methodForm input[name="modifiedTime"]').val(method.modifiedTime);
                $('#heritTagSelect').val(method.deleteFlag);
                $('#visibilitySelect').val(method.visibilityFlag);
                $('#methodForm input[name="waittime"]').val(method.waittime);
                $('#methodForm input[name="timeout"]').val(method.timeout);
                $('#methodForm textarea[name="executecode"]').val(method.targetcodecontent);
                app.paraList = method.arguments;
                console.log(app.paraList);
            }
        });
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