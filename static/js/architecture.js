var app = new Vue({
    el: '#architecture',
    data: {
        archiName: '抽象架构',
        className: '控件类型',
        classId: '',
        methodId: '',
        methodName: '方法',
        classPropTr: '<tr><td><input type="radio" name="class"/></td><td ></td><td ></td></tr>',
        methodPropTr: '<tr><td><input type="radio" name="method"/></td><td ></td><td ></td></tr>',
        supRecParaTr: '<tr><td><input type="checkbox" name="supRec_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',        
        runtimeArgsParaTr: '<tr><td><input type="checkbox" name="runtimeArgs_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',        
        selfRecParaTr: '<tr><td><input type="checkbox" name="selfRec_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',        
        assistRecParaTr: '<tr><td><input type="checkbox" name="assistRec_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',                
        methodParaTr: '<tr><td><input type="checkbox" name="chk_list"/></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>',
        archiList:[],
        classList: [],
        methodList:[],
        paraList: [],//参数列表
        supRecList: [],
        runtimeArgsList: [],
        selfRecList: [],
        assistRecList: [],
    },
    ready: function() {
        getArchiTree();
        // this.getArchiList();
        $('.2').addClass('open')
        $('.2 .arrow').addClass('open')
        $('.2-ul').css({display: 'block'})
        $('.2-1').css({color: '#ff6c60'});
    },
    methods: {
        addArchi: function() {
            var code = $('#addArchForm input[name="code"]').val(),
                name = $('#addArchForm input[name="name"]').val(),
                parentArcId = $('#addArchForm select[name="parentArcId"]').val(),
                creatorId = sessionStorage.getItem('userId'),
                descShort = $('#addArchForm textarea[name="descShort"]').val();
            $.ajax({
                url: address3+'abstractArchitecture/addAbstractArchitecture',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "code": code,
                    "name": name,
                    "parentArcId": parentArcId,
                    "descShort": descShort,
                    "creatorId": creatorId
                }),
                success: function(data) {
                    console.info(data);
                    if (data.respCode=="0000") {
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
        // delArchi: function() {
        //     var treeObj = $.fn.zTree.getZTreeObj("archiTree");
        //     var nodes = treeObj.getCheckedNodes(true);
        //     var ids;
        //     if (nodes.length === 0) {
        //         $('#selectAlertModal').modal();
        //     } else {
        //         for (var i = 0; i < nodes.length; i++) {
        //             ids = nodes[i].id;
        //         }
        //         $.ajax({
        //             url: address+'',
        //             type: 'post',
        //             contentType: 'application/json',
        //             data: JSON.stringify({
        //                 "id": ids,
        //             }),
        //             success: function(data) {
        //                 console.info(data);
        //                if (data.respCode=="0000") {
        //                     $('#successModal').modal();
        //                     getArchiTree();
        //                 } else {
        //                     $('#failModal').modal();
        //                 }
        //                 $('input[type="reset"]').trigger('click');                    
        //             },
        //             error: function() {
        //                 $('#failModal').modal();
        //                 $('input[type="reset"]').trigger('click');                    
        //             }
        //         });
        //     }
        // },
        beforeUpdateArchi(){
            $('#updateArchModal').modal();
            var treeObj = $.fn.zTree.getZTreeObj("archiTree"),
                nodes = treeObj.getSelectedNodes(true),
                id = nodes[0].id;
            for(let item of this.archiList){
                if(item.id==id){
                    $('#updateArchForm input[name="code"]').val(item.code);
                    $('#updateArchForm input[name="name"]').val(item.name);
                    $('#updateArchForm select[name="parentArcId"]').val(item.parentArcId);
                    $('#updateArchForm textarea[name="descShort"]').val(item.descShort);
                }
            } 
        },
        updateArchi: function() {
            var code = $('#updateArchForm input[name="code"]').val(),
                name = $('#updateArchForm input[name="name"]').val(),
                parentArcId = $('#updateArchForm select[name="parentArcId"]').val(),
                descShort = $('#updateArchForm textarea[name="descShort"]').val(),
                modifierId=sessionStorage.getItem('userId'),
                treeObj = $.fn.zTree.getZTreeObj("archiTree"),
                nodes = treeObj.getSelectedNodes(true),
                id = nodes[0].id;
            $.ajax({
                url: address3+'abstractArchitecture/modifyAbstractArchitecture',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "id": id,
                    "code": code,
                    "name": name,
                    "parentArcId": parentArcId,
                    "descShort": descShort,
                    "modifierId": modifierId
                }),
                success: function(data) {
                    console.info(data);
                    if (data.respCode=="0000") {
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
                url:address3+"abstractArchitecture/queryArchitectureList",
                contentType: 'application/json',
                success:function(data){
                    this.archiList=data.obj;
                    console.log(this.archiList)
                }
            })
        },
        // 查询当前抽象架构下的控件类型
        getClass() {
            var treeObj = $.fn.zTree.getZTreeObj("archiTree");
            var nodes = treeObj.getSelectedNodes();
            var arcId = nodes[0].id;
            var that=this;
            //查询class
            $.ajax({
                url: address3 + 'arcClass/queryArcVisibleOmClasses',
                type: 'post',
                contentType: "application/json",
                data: JSON.stringify({
                    "id": arcId
                }),
                success: function(data) {
                    //控件类型
                    var classList = data.arcClassRespDTOList;
                    that.classList = classList;
                    if (classList.length !== 0) {
                        $('#classProp').children().remove();
                        for (var i = 0; i < classList.length; i++) {
                            var classTr = $('<tr></tr>'),
                                classCheckTd = $(`<td><input type='radio' name='class' onclick='classClick(event,${i})'/></td>`),
                                overideFlagTd = $('<td ></td>'),
                                eclassNameTd = $('<td ></td>'),
                                cclassNameTd = $('<td ></td>');
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
                            eclassNameTd.html(classList[i].name);
                            cclassNameTd.html(classList[i].chsName);
                            classTr.append(classCheckTd, overideFlagTd, eclassNameTd, cclassNameTd);
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
        },
        //添加控件类型
        addClass: function() {
            var name = $('#addClassForm input[name="name"]').val(),
                chsName = $('#addClassForm input[name="chsName"]').val(),
                // defaultmethodname = $('#addClassForm select[name="defaultmethodname"]').val(),
                treeObj = $.fn.zTree.getZTreeObj("archiTree"),
                nodes = treeObj.getSelectedNodes(true),
                arcId = nodes[0].id;
            var that=this;
            if(name==""){
                alert('英文名称不能为空');
            }else if(chsName==''){
                alert('中文名称不能为空');
            }else{
                $.ajax({
                    url: address3+'arcClass/addSingleArcOmClass',
                    type: 'post',
                    contentType: "application/json",
                    data: JSON.stringify({
                        "name": name,
                        "chsName": chsName,
                        "descShort": '',
                        "defaultMethod": '',
                        "arcId": arcId,
                        "supportedRecognitionPros": '',
                        "runtimeArgs": '',
                        "selfRecognitionPros": '',
                        "assistRecognitionPros": '',
                        "overideFlag": '',
                        "visibilityFlag": ''
                    }),
                    success: function(data) {
                        if (data.respCode=="0000") {
                            $('#successModal').modal();
                            that.getClass();
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
            var  that=this;
            if (id === undefined) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: address3+'arcClass/deleteSingleArcOmClass',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "id": id,
                    }),
                    success: function(data) {
                        console.info(data);
                       if (data.respCode==0000) {
                            $('#successModal').modal();
                           that.getClass();
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
        // 查询当前控件类型下的方法
        getMethod() {
            var classId = $('input[name="class"]:checked').parent().parent().attr('id');
            // console.log(classId)
            var that=this;
            $.ajax({
                url: address3 + 'arcClass/queryArcVisibleOmMethods',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: classId,
                }),
                success: function(data) {
                    $('#methodProp').children().remove();
                    console.log(data)
                    var methodList = data.arcMethodRespDTOList;
                    that.methodList = methodList;
                    if (methodList) {
                        for (var i = 0; i < methodList.length; i++) {
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
                        }
                    }

                }
            });
        },
        //添加方法
        addMethod: function() {
            var name = $('#addMethodForm input[name="methodname"]').val(),
                descShort = $('#addMethodForm input[name="methoddescription"]').val(),
                objectcode = $('#addMethodForm textarea[name="objectcode"]').val(),
                isparameter = $('#addMethodForm select[name="isparameter"]').val(),
                waittime = $('#addMethodForm input[name="waittime"]').val(),
                timeout = $('#addMethodForm input[name="timeout"]').val(),
                treeObj = $.fn.zTree.getZTreeObj("archiTree"),
                nodes = treeObj.getSelectedNodes(true),
                arcId = nodes[0].id;
            var that=this;
            // var re=/^[0-9]+.?[0-9]*/;
            if(isNaN(waittime)||isNaN(timeout)){
                alert('时间输入错误，请重新输入！')
            }else{
                $.ajax({
                    url: address3+'arcMethod/addSingleArcOmMethod',
                    type: 'post',
                    contentType: "application/json",
                    data: JSON.stringify({
                        "arcId": arcId,
                        "mtype": 1,
                        "name": name,
                        "descShort": descShort,
                        "overrideFlag": '',
                        "classId": that.classId,
                        "isparameter": isparameter,
                        "waittime": waittime,
                        "timeout": timeout,
                        "targetCodeContent": objectcode,
                        'creatorId': sessionStorage.getItem('userId')
                    }),
                    success: function(data) {
                         if (data.respCode==0000) {
                              $('#successModal').modal();
                              //查询当前构件类型对应的方法
                              that.getMethod();
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
        //删除方法
        delMethod: function(e) {
            var selectedTr = $('input[name="method"]:checked').parent().parent(),
                id = selectedTr.attr('id');
            var that=this;
            if (id === undefined) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: address3+'arcMethod/deleteSingleArcOmMethod',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "id": id,
                    }),
                    success: function(data) {
                        console.info(data);
                       if (data.respCode==0000) {
                            $('#successModal').modal();
                            // selectedTr.remove();
                            that.getMethod();
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
                treeObj = $.fn.zTree.getZTreeObj("archiTree"),
                nodes = treeObj.getSelectedNodes(true),
                arcId = nodes[0].id;
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
                url: address3 + 'arcClass/modifySingleArcOmClass',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "arcId": arcId,
                    "id": that.classId,
                    "name": name,
                    "chsName": chsName,
                    "descShort": descShort,
                    "defaultMethod": defaultMethod,
                    "supportedRecognitionPros": supRecParaList,
                    "runtimeArgs": runtimeArgsParaList,
                    "selfRecognitionPros": selfRecParaList,
                    "assistRecognitionPros": assistRecParaList,
                    "overideFlag": overideFlag,
                    "modifierId": sessionStorage.getItem('userId'),
                    "visibilityFlag": visibilityFlag
                }),
                success: function(data) {
                    if (data.respCode == 0000) {
                        $('#successModal').modal();
                        that.getClass();
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
                targetCodeContent = $('#methodForm textarea[name="targetCodeContent"]').val(),
                treeObj = $.fn.zTree.getZTreeObj("archiTree"),
                nodes = treeObj.getSelectedNodes(true),
                arcId = nodes[0].id;
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
                url: address3 + 'arcMethod/modifySingleArcOmMethod',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "id": that.methodId,
                    "classId": that.classId,
                    "arcId": arcId,
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
                    "modifierId": sessionStorage.getItem('userId'),
                }),
                success: function(data) {
                    if (data.respCode==0000) {
                        $('#successModal').modal();
                        // $('#methodProp input[name="method"]:checked').parent().next().text(overrideFlag);
                        // $('#methodProp input[name="method"]:checked').parent().next().next().text(methodname);
                        // $('#methodProp input[name="method"]:checked').parent().next().next().next().text(methoddescription);
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

/*architree start*/
var setting1 = {
    view: {
        addHoverDom: false,
        removeHoverDom: false,
        selectedMulti: false
    },
    check: {
        enable: false,
        chkStyle: "radio",
        chkboxType: { "Y": "s", "N": "ps" }
    },
    data: {
        simpleData: {
            enable: true,
            idKey: 'id', //id编号命名
            pIdKey: 'parentArcId', //父id编号命名
            rootPId: 0
        },
        key: {
            name: 'name'
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
            // $.ajax({
            //     url: address+'/abstractarchitectureController/abstractarchitecturequery',
            //     type: 'post',
            //     data: {
            //         "id": treeNode.id,
            //         "architecturecode": '',
            //         "architecturename": '',
            //         "inherit": '',
            //         "description": ''
            //     },
            //     success: function(data) {
            //         $('#updateArchForm input[name="architecturecode"]').val('');
            //         $('#updateArchForm input[name="architecturename"]').val('');
            //         $('#updateArchForm select[name="inherit"]').val('');
            //         $('#updateArchForm textarea[name="description"]').val('');
            //         var archList = data.obj,
            //             architecturecode = archList[0].architecturecode,
            //             architecturename = archList[0].architecturename,
            //             inherit = archList[0].inherit,
            //             description = archList[0].description;
            //         $('#updateArchForm input[name="architecturecode"]').val(architecturecode);
            //         $('#updateArchForm input[name="architecturename"]').val(architecturename);
            //         $('#updateArchForm select[name="inherit"]').val(inherit);
            //         $('#updateArchForm textarea[name="description"]').val(description);
            //     },
            //     error: function() {
            //         $('#failModal').modal();
            //     }
            // });
        },
        onClick: function(event, treeId, treeNode, clickFlag) {
            app.archiName = treeNode.name;
            // 清空method
            $('#methodProp').children().remove();
            $('#methodForm input[name="name"]').val('');
            $('#methodForm input[name="description"]').val('');
            $('#methodForm select[name="overrideFlag"]').val('');
            $('#methodForm select[name="visibilityFlag"]').val('');
            $('#methodForm input[name="labelArgument"]').val('');
            $('#methodForm input[name="waittime"]').val('');
            $('#methodForm input[name="timeout"]').val('');
            $('#methodForm textarea[name="targetCodeContent"]').val('');
            app.paraList=[];
            //查询class
            $.ajax({
                url: address3+'arcClass/queryArcVisibleOmClasses',
                type: 'post',
                contentType: "application/json",
                data: JSON.stringify({
                    "id": treeNode.id
                }),
                success: function(data) {
                    //控件类型
                    var classList = data.arcClassRespDTOList;
                    app.classList=classList;
                    // console.log(classList)
                    if (classList.length !== 0) {
                        $('#classProp').children().remove();
                        for (var i = 0; i < classList.length; i++) {
                            var classTr = $('<tr></tr>'),
                                classCheckTd = $(`<td><input type='radio' name='class' onclick='classClick(event,${i})'/></td>`),
                                overideFlagTd = $('<td ></td>'),
                                eclassNameTd = $('<td ></td>'),
                                cclassNameTd = $('<td ></td>');
                            classTr.attr('id', classList[i].id);
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
                            eclassNameTd.html(classList[i].name);
                            cclassNameTd.html(classList[i].chsName);
                            classTr.append(classCheckTd,overideFlagTd, eclassNameTd, cclassNameTd);
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
            // $.ajax({
            //     url: address+'/abstractarchitectureController/abstractarchitecturequery',
            //     type: 'post',
            //     data: {
            //         "id": treeNode.id,
            //         "architecturecode": '',
            //         "architecturename": '',
            //         "inherit": '',
            //         "description": ''
            //     },
            //     success: function(data) {
            //         $('#updateArchForm input[name="architecturecode"]').val('');
            //         $('#updateArchForm input[name="architecturename"]').val('');
            //         $('#updateArchForm select[name="inherit"]').val('');
            //         $('#updateArchForm textarea[name="description"]').val('');
            //         var archList = data.obj,
            //             architecturecode = archList[0].architecturecode,
            //             architecturename = archList[0].architecturename,
            //             inherit = archList[0].inherit,
            //             description = archList[0].description;
            //         $('#updateArchForm input[name="architecturecode"]').val(architecturecode);
            //         $('#updateArchForm input[name="architecturename"]').val(architecturename);
            //         $('#updateArchForm select[name="inherit"]').val(inherit);
            //         $('#updateArchForm textarea[name="description"]').val(description);
            //     },
            //     error: function() {
            //         $('#failModal').modal();
            //     }
            // });
        }
    }
};
// 页面初始化获取抽象架构
function getArchiTree() {
    $.ajax({
        url: address3+'abstractArchitecture/queryArchitectureList',
        type: 'post',
        contentType: 'application/json',
        success: function(data) {
            if (data !== null) {
                $.fn.zTree.init($("#archiTree"), setting1, data.architectureRespDTOList);
                app.archiList=data.architectureRespDTOList;
                // console.log(app.archiList)
            }
        }
    });
}
//页面初始化获取默认方法名称列表
function getDefMethod() {
    $.ajax({
        url: address3+'methodController/selectAll',
        type: 'post',
        contentType: 'application/json',
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
        enable: false,
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
function classClick(event, i) {
    if ($(event.target).attr("checked")) {
        $('#classSection').css('display', 'block');
        $('#methodSection').css('display', 'none');
        //查询当前构件类型对应的方法
        app.classId = $(event.target).parent().parent().attr('id');
        let overideFlag=$(event.target).parent().next().attr('id');
        $.ajax({
            url: address3 + 'arcClass/queryArcVisibleOmMethods',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                id: app.classId,
            }),
            success: function(data) {
                $('#methodProp').children().remove();
                var methodList = data.arcMethodRespDTOList;
                app.methodList = methodList;
                // console.log(app.methodList)
                if (methodList) {
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
                    }
                }
            }
        });
        //classForm清空
        $('#classForm input[name="name"]').val('');
        $('#classForm input[name="chsName"]').val('');
        $('#classForm input[name="descShort"]').val('');
        $('#overideFlag').val('');
        $('#defaultMethod').val('');
        $('#visibilityFlag').val('');

        var curClass = app.classList[i];
        console.log(curClass);
        $('#classForm input[name="chsName"]').val(curClass.chsName);
        $('#classForm input[name="name"]').val(curClass.name);
        $('#classForm input[name="descShort"]').val(curClass.descShort);
        $('#overideFlag').val(curClass.overideFlag);
        $('#defaultMethod').val(curClass.defaultMethod);
        $('#visibilityFlag').val(curClass.visibilityFlag);

        supRecList = JSON.parse(curClass.supportedRecognitionPros);
        $('#supRecTbody').children().remove();
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
        $('#runtimeArgsTbody').children().remove();
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
        $('#assistRecTbody').children().remove();
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
        console.log(curMethod);
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

