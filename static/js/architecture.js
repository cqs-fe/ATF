var baseUrl='http://10.108.223.23:8080/atfcloud1.0a';
// var baseUrl='http://10.210.81.107:8080/atfcloud';
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
                url: baseUrl+'/abstractArchitecture/addAbstractArchitecture',
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
        //             url: baseUrl+'',
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
        updateArchi: function() {
            var code = $('#updateArchForm input[name="code"]').val(),
                architecturename = $('#updateArchForm input[name="name"]').val(),
                parentArcId = $('#updateArchForm select[name="parentArcId"]').val(),
                descShort = $('#updateArchForm textarea[name="descShort"]').val(),
                modifierId=sessionStorage.getItem('userId'),
                treeObj = $.fn.zTree.getZTreeObj("archiTree"),
                nodes = treeObj.getCheckedNodes(true),
                id = nodes[0].id;
            $.ajax({
                url: baseUrl+'/abstractArchitecture/modifyAbstractArchitecture',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "id": id,
                    "architecturecode": architecturecode,
                    "architecturename": architecturename,
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
                url:baseUrl+"/abstractArchitecture/queryArchitectureList",
                contentType: 'application/json',
                success:function(data){
                    this.archiList=data.obj;
                    console.log(this.archiList)
                }
            })
        },
        //添加控件类型
        addClass: function() {
            var name = $('#addClassForm input[name="name"]').val(),
                chsName = $('#addClassForm input[name="chsName"]').val(),
                // defaultmethodname = $('#addClassForm select[name="defaultmethodname"]').val(),
                treeObj = $.fn.zTree.getZTreeObj("archiTree"),
                nodes = treeObj.getSelectedNodes(true),
                arcId = nodes[0].id;
            if(name==""){
                alert('英文名称不能为空');
            }else if(chsName==''){
                alert('中文名称不能为空');
            }else{
                $.ajax({
                    url: baseUrl+'/arcClass/addSingleArcOmClass',
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
                            // window.location.reload();
                            var treeObj = $.fn.zTree.getZTreeObj("archiTree");
                            var nodes = treeObj.getSelectedNodes();
                            var arcId=nodes[0].id;
                            //查询class
                            $.ajax({
                                url: baseUrl+'/arcClass/queryArcDirectOmClasses',
                                type: 'post',
                                contentType: "application/json",
                                data: JSON.stringify({
                                    "id": arcId
                                }),
                                 success: function(data) {
                                    //控件类型
                                    var classList = data.arcClassRespDTOList;
                                    if (classList.length !== 0) {
                                        $('#classProp').children().remove();
                                        for (var i = 0; i < classList.length; i++) {
                                            var classTr = $('<tr></tr>'),
                                                classCheckTd = $(`<td><input type='radio' name='class' onclick='classClick(event,${i})'/></td>`),
                                                eclassNameTd = $('<td ></td>'),
                                                cclassNameTd = $('<td ></td>');
                                            classTr.attr('id', classList[i].id);
                                            eclassNameTd.html(classList[i].name);
                                            cclassNameTd.html(classList[i].chsName);
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
                    url: baseUrl+'/arcClass/deleteSingleArcOmClass',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "id": id,
                    }),
                    success: function(data) {
                        console.info(data);
                       if (data.respCode==0000) {
                            $('#successModal').modal();
                            var treeObj = $.fn.zTree.getZTreeObj("archiTree");
                            var nodes = treeObj.getSelectedNodes();
                            var arcId=nodes[0].id;
                            //查询class
                            $.ajax({
                                url: baseUrl+'/arcClass/queryArcDirectOmClasses',
                                type: 'post',
                                contentType: "application/json",
                                data: JSON.stringify({
                                    "id": arcId
                                }),
                                 success: function(data) {
                                    //控件类型
                                    var classList = data.arcClassRespDTOList;
                                    if (classList.length !== 0) {
                                        $('#classProp').children().remove();
                                        for (var i = 0; i < classList.length; i++) {
                                            var classTr = $('<tr></tr>'),
                                                classCheckTd = $(`<td><input type='radio' name='class' onclick='classClick(event,${i})'/></td>`),
                                                eclassNameTd = $('<td ></td>'),
                                                cclassNameTd = $('<td ></td>');
                                            classTr.attr('id', classList[i].id);
                                            eclassNameTd.html(classList[i].name);
                                            cclassNameTd.html(classList[i].chsName);
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
            $.ajax({
                url: baseUrl+'/arcMethod/addSingleArcOmMethod',
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
                            that.classId = $('input[name="class"]:checked').parent().parent().attr('id');
                            console.log(that.classId)
                            $.ajax({
                                url: address + '/omMethod/queryAutDirectOmMethods',
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    id: that.classId,
                                }),
                                success: function(data) {
                                    $('#methodProp').children().remove();
                                    var methodList = data.omMethodRespDTOList;
                                    for (var i = 0; i < methodList.length; i++) {
                                        var methodTr = $('<tr></tr>'),
                                            methodCheckTd = $("<td><input type='radio' name='method' onclick='methodClick(event,i)'/></td>"),
                                            flagTd=$('<td ></td>'),
                                            methodNameTd = $('<td ></td>'),
                                            methodDescriptionTd = $('<td ></td>');
                                        methodTr.attr('id', methodList[i].id);
                                        flagTd.html(methodList[i].overrideFlag);
                                        methodNameTd.html(methodList[i].name);
                                        methodDescriptionTd.html(methodList[i].descShort);
                                        methodTr.append(methodCheckTd, flagTd,methodNameTd, methodDescriptionTd);
                                        $('#methodProp').append(methodTr);
                                              
                                        var tmpOption = $('<option>').text(methodList[i].mname).val(i);
                                        $('#defaultMethodSelect').append(tmpOption);
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
                    url: baseUrl+'/arcMethod/deleteSingleArcOmMethod',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "id": id,
                    }),
                    success: function(data) {
                        console.info(data);
                        if (data.success) {
                            $('#successModal').modal();
                            //查询当前构件类型对应的方法
                            that.classId = $('input[name="class"]:checked').parent().parent().attr('id');
                            $.ajax({
                                url: baseUrl+'methodController/methodquery',
                                type: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    arcclassid: that.classId,
                                    methodname: '',
                                    methoddescription: ''
                                }),
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
            var name = $('#classForm input[name="ename"]').val(),
                chsName = $('#classForm input[name="cname"]').val(),
                defaultMethod = $('#classForm select[name="dname"]').val(),
                treeObj = $.fn.zTree.getZTreeObj("archiTree"),
                nodes = treeObj.getSelectedNodes(true),
                arcId = nodes[0].id;
            $.ajax({
                url: baseUrl+'/arcClass/modifySingleArcOmClass',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "id": app.classId,
                    "name": name,
                    "chsName": chsName,
                    "defaultMethod": defaultMethod,
                    "arcId": arcId,
                    "supportedRecognitionPros": '',
                    "runtimeArgs": '',
                    "selfRecognitionPros": '',
                    "assistRecognitionPros": '',
                    "overideFlag": '',
                    "visibilityFlag": '',
                    "modifierId": sessionStorage.getItem('userId')
                }),
                success: function(data) {
                    if (data.success) {
                        $('#successModal').modal();
                        var treeObj = $.fn.zTree.getZTreeObj("archiTree");
                        var nodes = treeObj.getSelectedNodes();
                        var arcId = nodes[0].id;
                        //查询class
                        $.ajax({
                            url: baseUrl + '/arcClass/queryArcDirectOmClasses',
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                "arcId": arcId,
                            }),
                            success: function(data) {
                                //控件类型
                                var classList = data.obj;
                                if (classList.length !== 0) {
                                    $('#classProp').children().remove();
                                    for (var i = 0; i < classList.length; i++) {
                                        var classTr = $('<tr></tr>'),
                                            classCheckTd = $(`<td><input type='radio' name='class' onclick='classClick(event,${i})'/></td>`),
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
                url: baseUrl+'methodController/update',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "id": that.methodId,
                    "methodname": methodname,
                    "methoddescription": methoddescription,
                    "parameterlist": paraList,
                    "objectcode": objectcode,
                    "arcclassid": app.classId,
                    "isparameter": isparameter,
                    "waittime": waittime,
                    "timeout": timeout
                }),
                success: function(data) {
                    if (data.success) {
                        // window.location.reload();
                        $('#successModal').modal();
                        //查询当前构件类型对应的方法
                        that.classId = $('input[name="class"]:checked').parent().parent().attr('id');
                        $.ajax({
                            url: baseUrl + 'methodController/methodquery',
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                arcclassid: that.classId,
                                methodname: '',
                                methoddescription: ''
                            }),
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
            //     url: baseUrl+'/abstractarchitectureController/abstractarchitecturequery',
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
            //查询class
            $.ajax({
                url: baseUrl+'/arcClass/queryArcDirectOmClasses',
                type: 'post',
                contentType: "application/json",
                data: JSON.stringify({
                    "id": treeNode.id
                }),
                success: function(data) {
                    //控件类型
                    var classList = data.arcClassRespDTOList;
                    app.classList=classList;
                    console.log(classList)
                    if (classList.length !== 0) {
                        $('#classProp').children().remove();
                        for (var i = 0; i < classList.length; i++) {
                            var classTr = $('<tr></tr>'),
                                classCheckTd = $(`<td><input type='radio' name='class' onclick='classClick(event,${i})'/></td>`),
                                eclassNameTd = $('<td ></td>'),
                                cclassNameTd = $('<td ></td>');
                            classTr.attr('id', classList[i].id);
                            eclassNameTd.html(classList[i].name);
                            cclassNameTd.html(classList[i].chsName);
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
            // $.ajax({
            //     url: baseUrl+'/abstractarchitectureController/abstractarchitecturequery',
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
        url: baseUrl+'/abstractArchitecture/queryArchitectureList',
        type: 'post',
        contentType: 'application/json',
        success: function(data) {
            if (data !== null) {
                $.fn.zTree.init($("#archiTree"), setting1, data.architectureRespDTOList);
                app.archiList=data.architectureRespDTOList;
            }
        }
    });
}
//页面初始化获取默认方法名称列表
function getDefMethod() {
    $.ajax({
        url: baseUrl+'methodController/selectAll',
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
        $.ajax({
            url: address + '/arcMethod/queryArcDirectOmMethods',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                id: app.classId,
            }),
            success: function(data) {
                $('#methodProp').children().remove();
                $('#defaultMethodSelect').children().remove();
                var methodList = data.omMethodRespDTOList;
                app.methodList = methodList;
                // console.log(app.methodList)
                for (let i = 0; i < methodList.length; i++) {
                    var methodTr = $('<tr></tr>'),
                        methodCheckTd = $(`<td><input type='radio' name='method' onclick='methodClick(event,${i})'/></td>`),
                        flagTd = $('<td ></td>'),
                        methodNameTd = $('<td ></td>'),
                        methodDescriptionTd = $('<td ></td>');
                    methodTr.attr('id', methodList[i].id);
                    flagTd.html(methodList[i].overrideFlag);
                    methodNameTd.html(methodList[i].name);
                    methodDescriptionTd.html(methodList[i].descShort);
                    methodTr.append(methodCheckTd, flagTd, methodNameTd, methodDescriptionTd);
                    $('#methodProp').append(methodTr);

                }


                //classForm内容封装
                $('#classForm input[name="name"]').val('');
                $('#classForm input[name="chsName"]').val('');
                $('#classForm input[name="descShort"]').val('');
                $('#overideFlag').val('');
                $('#defaultMethod').val('');
                $('#visibilityFlag').val('');

                var curClass = app.classList[i];
                // console.log(curClass)
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
            url: baseUrl+'methodController/methodquery',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                id: app.methodId,
                methodname: '',
                methoddescription: '',
                defaultmethodname: '',
                arcclassid: ''
            }),
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

