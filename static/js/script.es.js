// editDataVue 保存一个selectedScript属性，用于设置是否显示下方的表格
// 关于是否保存过：
// mainVue 保存一个变量，
$(document).ready(function() {
    var mainVue = new Vue({
        el: '#main',
        data: {
            autId: '',
            autIds: [],
            transId: '',
            transIds: [],
            
            templateList: [],
            checkedTemplate: [],
            lastCheckedTemplate: null,
            showScripttemplateTableArgs:null,
            script_id: '',
            // ids: '',
            // 新增模板绑定数据
            newTemplate: {
                name: '',
                description: ''
            },
            scriptIsChanged: false,
            scriptLength: 0
        },
        ready: function() {
            var _this = this;
            _this.getAutandTrans();
            $('#addtemplateModal').on('hidden.bs.modal', function(e) {
                _this.newTemplate = {
                    name: '',
                    description: ''
                }
            })
        },
        computed: {},
        methods: {
            //初始化获取测试系统和功能点
            getAutandTrans: function() {
                Vac.ajax({
                    // async: false,
                    url: address3 + "/aut/queryListAut",
                    type: "POST",
                    data: '',
                    success: function(data) {
                        if (data.respCode !== '0000') {
                            Vac.alert('查询测试系统失败');
                            return;
                        }
                        var autList = data.autRespDTOList;
                        var str = "";
                        for (var i = 0; i < autList.length; i++) {

                            str += " <option value='" + autList[i].id + "' >" + autList[i].nameMedium + "</option> ";
                        }

                        $('#autSelect').html(str);
                        mainVue.autId = sessionStorage.getItem("autId");
                        $("#autSelect").val(mainVue.autId);
                        Vac.ajax({
                            url: address3 + 'transactController/queryTransactsByAutId',
                            data: { 'id': mainVue.autId },
                            success: function(data) {
                                if (data.respCode !== '0000') {
                                    Vac.alert('查询测试系统失败');
                                    return;
                                }
                                var transactList = data.transactRespDTOs;
                                var str = "";
                                for (var i = 0; i < transactList.length; i++) {
                                    str += " <option value='" + transactList[i].id + "'>" + transactList[i].nameMedium + "</option> ";
                                }
                                $('#transactSelect').html(str);
                                mainVue.transId = sessionStorage.getItem("transactId");
                                $("#transactSelect").val(mainVue.transId);
                                mainVue.getScriptTemplate();
                            }
                        });
                    },
                    error: function () {
                        Vac.alert('网络错误，请稍候重试~');
                    }
                });
            },
            //获取测试系统
            autSelect: function() {
                Vac.ajax({
                    async: true,
                    url: address3 + "/aut/queryListAut",
                    success: function(data) {
                        if (data.respCode !== '0000') {
                            Vac.alert('查询测试系统失败');
                            return;
                        }
                        var autList = data.list;
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
                var _this = this;
                // var val = sessionStorage.getItem('autId');
                // console.log(this.autId);
                Vac.ajax({
                    async: true,
                    url: address3 + 'transactController/queryTransactsByAutId',
                    data: { 'id': val },
                    type: "POST",
                    success: function(data) {
                        if (data.respCode === '0000') {
                            var transactList = data.transactRespDTOs;
                            var str = "";
                            for (var i = 0; i < transactList.length; i++) {

                                str += " <option value='" + transactList[i].id + "'>" + transactList[i].nameMedium + "</option> ";
                            }
                            $('#transactSelect').html(str);
                            _this.transId = $('#transactSelect').val();
                            _this.getScriptTemplate()
                        } else {
                            Vac.alert(respMsg);
                        }
                        
                    }
                });
                
            },
            //  值
            setval: function() {
                this.autId = sessionStorage.getItem("autId");
                this.transId = sessionStorage.getItem("transactId");
                $("#autSelect").val(this.autId);
                $("#transactSelect").val(this.transId);
            },
            getScriptTemplate: function() {
                var _this = this;
                if(_this.scriptIsChanged) {
                    var promise = Vac.confirm('#vac-confirm', '.okConfirm', '.cancelConfirm', "编辑后的基础脚本未保存，是否保存？");
                    promise.then(() => {
                        editDataVue.tableSave();
                        getTemplate();
                        _this.scriptIsChanged = false
                    }, () => {
                        getTemplate();
                        _this.scriptIsChanged = false
                    })
                } else {
                    getTemplate();
                }
                function getTemplate() {
                    Vac.ajax({
                        url: address3 + 'scripttemplateController/queryTemplateByTransId',
                        data: { 'id': _this.transId },
                        success: function(data) {
                            _this.templateList = data.o;
                            if (data.respCode == '0000') {
                                _this.templateList = data.scriptTemplateList;
                                if (_this.templateList.length) {
                                    _this.checkedTemplate = [0];
                                    _this.showScripttemplateTable({
                                        "aut_id": $('#autSelect').val(), 
                                        "script_id": _this.templateList[0].id
                                    });
                                    editDataVue.selectedScript = 1;
                                } else {
                                    _this.checkedTemplate = [];
                                    editDataVue.selectedScript = 0;
                                }
                            } else {
                                Vac.alert(data.respMsg);
                            }
                        }
                    });
                }
            },
            change: function(event) {
                var value = +event.target.value;
                var array = this.checkedTemplate.slice(0);
                var _this = this;
                var index = $(event.target).val();
                if(event.target.checked) {
                    if(this.scriptIsChanged) {
                        var promise = Vac.confirm('#vac-confirm', '.okConfirm', '.cancelConfirm', "编辑后的基础脚本未保存，是否保存？");
                        promise.then(() => {
                            editDataVue.tableSave();
                            // this.checkedTemplate = this.checkedTemplate.slice(0, -1)
                            // event.preventDefault()
                            // return
                            _this.scriptIsChanged = false
                            _this.checkedTemplate = [+value]
                            process(value)
                            event.preventDefault()
                        }, () => {
                            _this.scriptIsChanged = false
                            _this.checkedTemplate = [+value]
                            process(value)
                            event.preventDefault()
                        })
                    } else {
                        this.checkedTemplate = [value]
                        process(value)
                    }
                } else {
                    // event.preventDefault()
                    if(this.scriptIsChanged) {
                        var promise = Vac.confirm('#vac-confirm', '.okConfirm', '.cancelConfirm', "编辑后的基础脚本未保存，是否保存？");
                        promise.then(() => {
                            editDataVue.tableSave();
                            // this.checkedTemplate = this.checkedTemplate.slice(0)
                            // this.checkedTemplate = [+value]
                            // return
                            _this.scriptIsChanged = false
                            _this.checkedTemplate = []
                            editDataVue.selectedScript = 0;
                            event.target.checked = false;
                        }, () => {
                            _this.scriptIsChanged = false
                            _this.checkedTemplate = []
                            editDataVue.selectedScript = 0;
                            event.target.checked = false;
                        })
                    } else {
                        _this.checkedTemplate = []
                        editDataVue.selectedScript = 0
                        // $(`input[value='${index}']`).prop('checked', false);
                    }
                }
                // 查询模板脚本
                function process(value) {
                    var length = _this.checkedTemplate.length;
                    // if(length > 1) {
                    //     _this.checkedTemplate.shift()
                    // }
                    editDataVue.selectedScript = 1;
                    if (length > 0) {
                        var templateId = +value;
                        _this.script_id = _this.templateList[templateId].id;
                        var data = {
                            aut_id: _this.autId,
                            script_id: _this.templateList[templateId].id
                        };
                        _this.showScripttemplateTableArgs = {
                            aut_id: _this.autId,
                            script_id: _this.templateList[templateId].id
                        }
                        editDataVue.operationRows = [];
                        Vac.ajax({
                            url: address3 + 'scripttemplateController/showScripttemplateTable',
                            data: data,
                            success: function(data) {
                                // _this.scriptIsChanged = false
                                editDataVue.operationRows = []
                                if (data.success === true) {
                                    // {id:Symbol(), functions: [], operation: {element:'', ui: '',parameters:[{Name:'', Value: ''}]}}
                                    _this.scriptLength = data.o.data.length
                                   
                                    for (var operationRow of data.o.data) {
                                        let row = {
                                            id: null,
                                            functions: [],
                                            operation: {
                                                element: '',
                                                ui: '',
                                                classType: ''
                                            },
                                            parameters: []
                                        }
                                        row.id = Symbol()
                                        row.functions.push({ name: operationRow.function, parameterlist: "" })
                                        row.operation.element = operationRow.operator[2]
                                        row.operation.ui = operationRow.operator[0]
                                        row.operation.classType = operationRow.operator[1]
                                        for (let para of operationRow.arguments) {
                                            row.parameters.push({
                                                Name: para.name,
                                                Value: para.value
                                            })
                                        }
                                        // 插入到operationRows中
                                        editDataVue.operationRows.push(row)
                                        // editDataVue.operationRows = [row]
                                    }
                                } else {
                                    Vac.alert(data.msg)
                                }
                            }
                        });
                    }
                }
            },
            showScripttemplateTable: function(args) {
                var _this = this;
                Vac.ajax({
                    url: address3 + 'scripttemplateController/showScripttemplateTable',
                    data: args,
                    success: function(data) {
                        // _this.scriptIsChanged = false
                        editDataVue.operationRows = []
                        if (data.success === true) {
                            // {id:Symbol(), functions: [], operation: {element:'', ui: '',parameters:[{Name:'', Value: ''}]}}
                            _this.scriptLength = data.o.data.length
                           
                            for (var operationRow of data.o.data) {
                                let row = {
                                    id: null,
                                    functions: [],
                                    operation: {
                                        element: '',
                                        ui: '',
                                        classType: ''
                                    },
                                    parameters: []
                                }
                                row.id = Symbol()
                                row.functions.push({ name: operationRow.function })
                                row.operation.element = operationRow.operator[2]
                                row.operation.ui = operationRow.operator[0]
                                row.operation.classType = operationRow.operator[1]
                                for (let para of operationRow.arguments) {
                                    row.parameters.push({
                                        Name: para.name,
                                        Value: para.value
                                    })
                                }
                                // 插入到operationRows中
                                editDataVue.operationRows.push(row)
                                // editDataVue.operationRows = [row]
                            }
                        } else {
                            Vac.alert(data.msg)
                        }
                    }
                });
            },
            saveTemplate: function() {
                var _this = this;
                _this.newTemplate.transId = _this.transId
                Vac.ajax({
                    url: address3 + 'scripttemplateController/insert',
                    data: _this.newTemplate,
                    success: function(data) {
                        if (data.respCode === '0000') {
                        Vac.alert('添加成功！')
                        $('#addtemplateModal').modal('hide')
                        _this.getScriptTemplate();
                        } else {
                            Vac.alert('添加失败！');
                        }
                    },
                    error: function() {
                        Vac.alert('添加失败！');
                    }
                })
            },
            deleteTemplate: function() {
                var _this = this;
                if (!_this.checkedTemplate.length) {
                    Vac.alert('请选择要删除的模板！')
                    return
                }
                var templateId = this.checkedTemplate[0];
                _this.script_id = _this.templateList[templateId].id;
                Vac.ajax({
                    url: address3 + 'scripttemplateController/delete',
                    data: { 'id': _this.script_id },
                    success: function(data) {
                        if (data.respCode === '0000') {
                            Vac.alert('删除成功！')
                            _this.getScriptTemplate();
                        }
                    },
                    error: function() {
                        Vac.alert('删除失败！')
                    }
                })
            },
            // 跳转到元素库页面配置上级页面选中的功能点的元素库
            toElementLib: function() {
                location.href = "elementLibrary.html";
            },
            // 跳转到对象库页面配置上级页面选中的功能点的对象库
            toObjectRepo: function() {
                location.href = "objectRepo.html";
            },
        }
    })

    var editDataVue = new Vue({
        el: '#table2',
        data: {
            // 保存table中每一行的数据 [{id:Symbol(), functions: {{name: '',  parameterlist: ''}], operation: {element:'', ui: '',parameters:[]}}],
            operationRows: [],//[{id:Symbol(), functions: [], operation: {element:'1', ui: '2', parameters: [{Name: 'name1', Value: ''}]}}],
            // parameterVue: null,
            // ztree的设置项
            zTreeSettings: {
                uiAndElement: {
                    callback: {},
                    data: {
                        key: {
                            children: 'children',
                            isParent: 'isParent',
                            name: 'name',
                            rootPId: 0
                        }
                    }
                },
                functions: {
                    callback: {},
                    data: {
                        key: {
                            name: "name",
                        },
                        simpleData: {
                            enable: true,
                            idKey: 'id',
                            pIdKey: 'parentid',
                            rootPId: 0
                        }
                    }
                }
            },
            zTreeSettings2: {
                uiAndElement: {
                    callback: {},
                    data: {
                        key: {
                            children: 'children',
                            isParent: 'isParent',
                            name: 'name',
                            rootPId: 0
                        }
                    },
                    check: {
                        enable: true,
                        hkStyle: "checkbox",
                        chkboxType: { "Y": "ps", "N": "ps" }
                    }
                },
                functions: {
                    callback: {},
                    data: {
                        key: {
                            name: "name",
                        },
                        simpleData: {
                            enable: true,
                            idKey: 'id',
                            pIdKey: 'parentid',
                            rootPId: 0
                        }
                    },
                    check: {
                        enable: true,
                        hkStyle: "checkbox",
                        chkboxType: { "Y": "ps", "N": "ps" }
                    }
                }
            },
            uiOrFunctions: {
                changed: false, // 模态框出现后是否点击过，如果点击过，在模态框点击保存时才会进行更改
                type: 'ui', // 保存最后点击的是UI还是函数集，据此来确定不同的后续执行行为
                ui: '', // 保存点击的ui
                classType: '', // 保存元素类型
                element: '', // 保存点击的元素
                function: '', // 保存点击的函数集中的项
                target: null, // 保存点击编辑的target，据此可以获得parent tr
                index: 0 // 保存每一行的index
            },
            selectedScript: 0
        },
        ready: function() {
            var _this = this;
            this.zTreeSettings.uiAndElement.callback.onClick = this.zTreeOnClick;
            this.zTreeSettings.functions.callback.onClick = this.zTreeOnClick;
            // 设置table可以拖拽行
            this.setDrag();
            $('.2').addClass('open')
            $('.2 .arrow').addClass('open')
            $('.2-ul').css({display: 'block'})
            $('.2-0').css({color: '#ff6c60'})
        },
        watch: {
            operationRows: function() {
                this.setDrag();
            }
        },
        methods: {
            setChanged: function(){
                mainVue.scriptIsChanged = true
            },
            addRow: function() {
                let s = { id: Symbol(), operation: { element: '', ui: '', classType: '' }, functions: [], parameters: [] }
                this.operationRows.push(s)
                this.setChanged()
            },
            insertRow: function(index) {
               this.setChanged()
               this.operationRows.splice(+index+1, 0, { id: Symbol(), operation: { element: '', ui: '', classType: '' }, functions: [], parameters: [] })
            },
            deleteRow: function(index) {
                var pro = Vac.confirm('', '', '', '确认要删除吗？');
                pro.then(() => {
                    this.setChanged()
                    this.operationRows.splice(index, 1)
                }, () => {});
                
            },
            // remove the row who is checked when 
            removeRow: function(event) {

                var parent = $(event.target).closest('.operation-wrapper')
                var trs = parent.find("tbody input[type='checkbox']:checked").closest('tr');
                if (!trs.length) return;
                Vac.confirm('', '', '', '确认要删除选中项吗？').then(() => {
                    var arr = [];
                    for (var tr of trs) {
                        arr.push(+tr.getAttribute('data-index'));
                    }
                    this.operationRows = this.operationRows.filter((item, index) => {
                        return !arr.includes(index);
                    });
                    mainVue.scriptIsChanged = true;
                })
                
            },
            moveUp: function(event) {
                this.setChanged()
                var _this = this;
                var operationRows = this.operationRows;
                var trs = $(event.target).closest('.operation-wrapper').find(`input[type='checkbox']:checked`).closest('tr');
                $.each(trs, (index, row) => {
                    var originIndex = row.getAttribute('data-index')
                    originIndex >= 1 &&
                        operationRows.splice(originIndex - 1, 0, operationRows.splice(originIndex, 1)[0])
                })
                mainVue.scriptIsChanged = true
            },
            moveDown: function(event) {
                console.log(JSON.parse(`[{"Name":"输入值1","Type":"","Desc":"","ParameterizeColumn":"{element}"},{"Name":"输入值2","Type":"","Desc":"","ParameterizeColumn":"{element}"}]`))
                var _this = this;
                var operationRows = this.operationRows;
                var trs = $(event.target).closest('.operation-wrapper').find(`input[type='checkbox']:checked`).closest('tr')
                for (var i = trs.length - 1; i >= 0; i--) {
                    var originIndex = trs[i].getAttribute('data-index')
                    operationRows.splice(+originIndex + 1, 0, operationRows.splice(+originIndex, 1)[0])
                }
                this.setChanged()
            },
            setDrag() {
                setTimeout (function() {
                    $("#sortable").sortable({
                        stop: (event, ui) => {
                            if (+(ui.item[0].rowIndex - 1) === +ui.item[0].getAttribute('data-index')) {
                                return
                            }
                            // 拖拽停止后，改变绑定的数组中元素的顺序
                            var _this = this;
                            var target = ui.item[0].rowIndex - 1;
                            var start = ui.item[0].getAttribute('data-index');
                            // console.log(`target: ${target} -- start: ${start}--end: ${end}`)
                            if (target < 0) {
                                _this.operationRows.unshift(_this.operationRows.splice(start, 1)[0])
                            } else {
                                _this.operationRows.splice(target, 0, _this.operationRows.splice(start, 1)[0])
                            }
                            _this.setChanged()
                        }
                    });
                    // $("#sortable").disableSelection();
                }, 1000);
            },
            // 更改方法时改变参数
            changeFunction: function(target, index) {
                var me = this;
                var selectedIndex = target.selectedIndex;
                var option = target.options[selectedIndex];
                var selectedFunction = option.value;
                var parameters = option.getAttribute('data-parameters');
                parameters = JSON.parse(parameters);
                var newRow = this.operationRows[index];
                newRow.selectedFunc = selectedFunction;
                newRow.parameters = [];
                for(let param of parameters) {
                    newRow.parameters.push({Name: param.name, Value: '' })
                }
                // console.log(this.operationRows)
            },
            // 遍历表格，保存脚本内容
            generateScriptString: function(arr){
                var sendDataArray = [];
                var trs = Array.from(document.querySelectorAll('#sortable tr.before-operation-row '))
                for (var tr of trs) {
                    var UI = tr.querySelector('.operation-ui').innerHTML.replace(/^\"+|\"+$/g, "\"");
                    var element = tr.querySelector('.operation-element').innerHTML.replace(/^\"+|\"+$/g, "\"");
                    var classType = tr.querySelector('.operation-element').getAttribute('data-classtype');
                    var method = tr.querySelector('.functions-select').value;
                    if (!UI && !method) {
                        continue
                    }
                    // 获取参数列表
                    var paramTrs = Array.from(tr.querySelectorAll('.parameters .param-row'))
                    var paramValues = []
                    var type = 1; // record the type  --  1: normal  2: canshuhua biaozhu
                    for (var paramRow of paramTrs) {
                        var paramName = paramRow.querySelector('.param-name');
                        if (paramName.innerHTML.includes('参数化标注')) {
                            type = 2;
                        }
                        var paramTr = paramRow.querySelector('.param-value');
                        if(paramTr.innerHTML.startsWith('Data.TableColumn')) {
                            paramValues.push(`${paramTr.innerHTML}`); 
                        } else {
                            // paramValues.push(`"${paramTr.innerHTML}"`);
                            paramValues.push(`""`);
                        }
                    }
                    if(paramValues.length === 0) {
                        paramValues = ["\"\""]
                    }
                    var parameterString = paramValues.toString();
                    var string;
                    if (type === 1) {
                        if (UI == '' && classType == '' && element == '') {
                            string = `${method}(${parameterString});\n`;
                            // string = `${method}();\n`;
                        } else {
                            string = `UI("${UI}").${classType}("${element}").${method}(${parameterString});\n`;
                            // string = `UI("${UI}").${classType}("${element}").${method}();\n`;
                        }
                    } else {
                        if (UI == '' && classType == '' && element == '') {
                            string = `${method}();#${parameterString}\n`;
                        } else {
                            string = `UI("${UI}").${classType}("${element}").${method}();#${parameterString}\n`;
                            // string = `UI("${UI}").${classType}("${element}").${method}();#${parameterString}\n`;
                        }
                    }
                    sendDataArray.push(string);
                }
                return sendDataArray.join('');
            },
            //保存 
            tableSave: function() {
                //UI("denglu").webedit("username").set(1,"123");
                var sendData = this.generateScriptString();
                // Vac.alert('这是生成的脚本代码:\n' + sendData)
                // UI(""登录页面"").webedit("webedit").set("3");UI(""登录页面"").webedit("webedit").set("444");UI("welcome to the system").webedit("webedit").set("333")
                // return
                Vac.ajax({
                    url: address3 + 'scripttemplateController/saveScriptTemplate',
                    data: {
                        'scriptId': mainVue.script_id || mainVue.templateList[0].id,
                        'content': sendData
                    },
                    success: function(data) {
                        if (data.respCode === '0000') {
                            $('#success').modal();
                            mainVue.scriptIsChanged = false
                        } else {
                            $('#fail').modal();
                        }
                    },
                    error: function() {
                        $('#fail').modal();
                    }
                })
            },
            //参数化
            para: function() {
               var sendData = this.generateScriptString();
               Vac.ajax({
                    url: address3 + 'scripttemplateController/showscripttemplateTableSave',
                    data: {
                        'autId': mainVue.autId,
                        'script_id': mainVue.script_id|| mainVue.templateList[0].id,
                        'content': sendData
                    },
                    success: function(data) {
                        if (data.success == true) {
                            Vac.alert(data.msg);
                           mainVue.showScripttemplateTable({
                            "aut_id": mainVue.autId, 
                            "script_id": mainVue.script_id|| mainVue.templateList[0].id
                        });
                            return;
                        }
                    },
                    error: function() {
                        Vac.alert('参数化失败，请求未成功');
                    }
                })
            },
            // 显示UI和元素 、函数集
            showUiAndElement: function(event, type) {
                this.uiOrFunctions.target = event.target;
                this.uiOrFunctions.changed = false;
                // 请求Ui和Elment
                this.getUIAndFunctions(1)
                $('#ui-ele-modal').modal('show')
            },
            showUIModal: function() {
                this.getUIAndFunctions(2)
                $('#ui-ele-modal2').modal('show')
            },
            getUIAndFunctions: function(type){
                var str = +type === 1 ? '' : 2
                var setting = +type === 1 ? this.zTreeSettings : this.zTreeSettings2
                Vac.ajax({
                    url: address3 + 'elementRepository/queryAllElementsForATransact',
                    data: { transactId: mainVue.transId },
                    success: (data) => {
                        if ( data.respCode === '0000') {
                            let treeDate = data.uis.map((ui) => {
                                let parent = {
                                    isParent: true,
                                    name: ui.uiName,
                                    id: ui.uiId
                                };
                                parent.children = ui.elements ? ui.elements.map((element) => {
                                    return {
                                        classType: element.classType,
                                        name: element.elementName,
                                        id: element.elementId,
                                        isParent: false,
                                        children: null
                                    }
                                }) : null;
                                return parent;
                            });
                            var tree = $.fn.zTree.init($('#ui-element-ul'+str), setting.uiAndElement, treeDate);
                            tree.expandAll(true);
                            // var da = [{"id":1,"parentid":0,"name":"ui-chai"},{"id":2,"parentid":1,"name":"ele-chai", "classType": 'webedit'}]
                            // $.fn.zTree.init($('#ui-element-ul'+str), setting.uiAndElement, da);
                        }
                    }
                });
                // 请求函数集
                ajax2({
                    url: address3 + 'aut/selectFunctionSet',
                    contentType: 'application/json',
                    data: JSON.stringify({ 'id': mainVue.autId }),
                    type: 'post',
                    dataType: 'json',
                    success: (data) => {
                        if (data.respCode === '0000') {
                            $.fn.zTree.init($('#functions-ul'+str), setting.functions, data.omMethodRespDTOList);
                        }
                    }
                })
            },
            // 确定ztree的点击事件
            zTreeOnClick: function(event, treeId, treeNode) {
                if (treeNode.isParent) {
                    return // 如果点击了父节点，则返回
                }
                // 判断树结构是ui还是函数集
                if (treeId === 'ui-element-ul') {
                    var parent = treeNode.getParentNode()
                    if (!parent) {
                        return // 没有父元素，则返回
                    }
                    this.uiOrFunctions.type = 'ui'
                    this.uiOrFunctions.element = treeNode.name
                    this.uiOrFunctions.ui = parent.name;
                    this.uiOrFunctions.classType = treeNode.classType
                } else {
                    this.uiOrFunctions.type = 'function'
                    // 获取节点的全部内容
                    var o = {};
                    o.name = treeNode.name;
                    o.parameterlist = treeNode.arguments;
                    this.uiOrFunctions.function = o;
                }
                this.uiOrFunctions.changed = true; // 已经在模态框中点击了树节点
            },
            // 编辑参数方法，出现模态框，进行函数的编辑
            editParameter: function(event, type) {
                var _this = this
                // 保存当前点击行，行索引值以及当前需要操作的table所绑定的数组
                var target = event.target
                target.style.visibility = 'hidden'
                var parent = $(target).parent()[0]
                $('.param-table', parent).css({'display': 'table'})
                $('.param-show', parent).css({'display': 'none'})
                var paramV = $('.param-value', parent)[0]
                paramV && paramV.focus()
                var range = document.createRange()
                var sel = window.getSelection()
                paramV && range.setStart(paramV.childNodes[0], paramV.innerHTML.length)
                range.collapse(true)
                sel.removeAllRanges()
                sel.addRange(range)
            },
            cancelEditParam: function(event) {
                var table = $(event.target).parents('.param-table')
                $('.edit-param', table.parents('tr')).css({'visibility': 'visible'})
                table.css({display: 'none'})
                $('.param-show', table.parents('tr')).css({'display': 'block'})
            },
            saveParam: function(event) {
                var target = $(event.target)
                var tbody = target.parents('.param-table')
                var trs = [...$('.param-row', tbody)]
                var parentRow = target.parents('table').parents('tr')
                var valueShows = $('.param-value-show', parentRow)
                this.operationRows[parentRow.attr('data-index')].parameters.length = 0
                trs.forEach((row, index) => {
                    var data = {}
                    data.Name = row.querySelector('.param-name').innerHTML
                    data.Value = row.querySelector('.param-value').innerHTML
                    valueShows[index].innerHTML = data.Value
                    this.operationRows[parentRow.attr('data-index')].parameters.push(data)
                })
                this.cancelEditParam(event)
                // 已经修改过
                mainVue.scriptIsChanged = true
            },
            updateRow: function(rows, index) {
                // 使用splice方法，通过改变数组项的id更新绑定的数组，
                var cache = rows[index]
                cache.id = Symbol()
                rows.splice(index, 1, cache)
            }
        }
    })

    var modalVue = new Vue({
        el: '#ui-ele-modal',
        data: {},
        methods: {
            // 在模态框中点击了保存按钮
            editRow: function() {
                // 已经修改过
                mainVue.scriptIsChanged = true
                var _this = this;
                if (!editDataVue.uiOrFunctions.changed) {
                    return; // 没有点击树结构，则返回
                }
                // 保存当前点击行，行索引值以及当前需要操作的table所绑定的数组
                var parentRow = $(editDataVue.uiOrFunctions.target).parents('tr')
                var index = parentRow.attr('data-index');
                var operationRows = editDataVue.operationRows;

                if (editDataVue.uiOrFunctions.type === 'ui') {
                    // 点击了ui 与 元素后, 更新operation
                    operationRows[index].operation = {
                        ui: editDataVue.uiOrFunctions.ui,
                        element: editDataVue.uiOrFunctions.element,
                        classType: editDataVue.uiOrFunctions.classType
                    };
                    operationRows[index].functions = []
                    operationRows[index].parameters = []
                    operationRows[index].selectedFunc = '';

                    // 使用splice方法，通过改变数组项的id更新绑定的数组，
                    _this.updateRow(operationRows, index);

                    // 发送ajax请求函数的数据
                    var data = {
                        id: mainVue.autId, // autid
                        classname: editDataVue.uiOrFunctions.classType, // classname
                    }
                    if (!data.classname) {
                        Vac.alert('请在元素库界面设置方法的类型');
                        return;
                    }
                    var getFunctions = new Promise((resolve, reject) => {
                        Vac.ajax({
                            url: address3 + 'aut/selectMethod',
                            data: data,
                            success: function(data) {
                                if (data.respCode === '0000' && data.omMethodRespDTOList) {
                                    var { functions, parameterlist } = _this.setFunctionAndParameter(data.omMethodRespDTOList);
                                    operationRows[index].parameters = parameterlist;
                                    operationRows[index].functions = functions;
                                    operationRows[index].selectedFunc = functions.length ? functions[0].name : '';
                                    _this.updateRow(operationRows, index);
                                    resolve();
                                } else {
                                    Vac.alert('查询数据出错！');
                                    reject();
                                }
                            }
                        })
                    });
                } else {
                    operationRows[index].functions = [editDataVue.uiOrFunctions.function]
                    // parameters: [{"name":"11","valueclass":"11","parameterizedcolumn":"","defaultvalue":"","description":""}]
                    var parametersArray = JSON.parse(operationRows[index].functions[0].parameterlist)

                    operationRows[index].parameters = []
                    for(let param of parametersArray) {
                        operationRows[index].parameters.push({
                            Name: param.name,
                            Value: ''
                        })
                    }
                    _this.updateRow(operationRows, index)
                    
                }
                $('#ui-ele-modal').modal('hide')
                // editDataVue.uiOrFunctions.changed = false;
            },
            updateRow: function(rows, index) {
                // 使用splice方法，通过改变数组项的id更新绑定的数组，
                var cache = rows[index]
                cache.id = Symbol()
                rows.splice(index, 1, cache)
            },
            setFunctionAndParameter: function (data) {
                // set functino for ui and element 
                var operationRows = editDataVue.operationRows;
                var _this = this;
                var functions = [];
                var  parameterlist = [];
                try {
                    for (let m of data) {
                        let o = {};
                        o.name = m.name;
                        o.parameterlist = m.arguments || "[]";
                        functions.push(o);
                    }
                    console.log(data);
                    if (functions.length) {
                        let paras = JSON.parse(`${functions[0].parameterlist}`);
                        for (let para of paras) {
                            parameterlist.push({ Name: para.name, Value: "" });
                        }
                    }
                    return { functions, parameterlist };
                } catch (e) {
                    console.error(e);
                    // return { functions: [], parameterlist: [] };;
                }
            }
        }
    })
    var modalVue2 = new Vue({
        el: '#ui-ele-modal2',
        data: {},
        methods: {
            // 在模态框中点击了保存按钮
            editRowMultiple: function() {
                // 已经修改过
                mainVue.scriptIsChanged = true
                var uiTree = $.fn.zTree.getZTreeObj("ui-element-ul2");
                var functionTree = $.fn.zTree.getZTreeObj("functions-ul2");
                var uiNodes = uiTree ? uiTree.getCheckedNodes(true) : [];

                var functionNodes = functionTree ? functionTree.getCheckedNodes(true) : []
                for (var node of uiNodes) {
                    if (node.isParent) {
                        continue;
                    }
                    let newRow = {}; // {id:Symbol(), functions: [], operation: {element:'', ui: ''},parameters:[{Name: '', Value: ''}]}}
                    newRow.id = Symbol()
                    newRow.operation = {
                        ui: node.getParentNode().name,
                        element: node.name,
                        classType: node.classType
                    }
                    newRow.functions = []
                    ajax2({
                        url: address3 + 'aut/selectMethod',
                        data: JSON.stringify({ id: mainVue.autId, classname: newRow.operation.classType }),
                        contentType: 'application/json',
                        type: 'post',
                        dataType: 'json',
                        success: function(data, statusText) {
                            if (data.respCode === '0000' && data.omMethodRespDTOList) {
                                var { functions, parameterlist } = modalVue.setFunctionAndParameter(data.omMethodRespDTOList);
                                newRow.functions = functions;
                                newRow.selectedFunc = functions.length ? functions[0].name : '';
                                newRow.parameters = parameterlist;
                                editDataVue.operationRows.push(newRow);
                            } else {
                                Vac.alert('查询方法出错！');
                            }
                        }
                    })
                }
                if (functionNodes && functionNodes.length) {
                    for (var node of functionNodes) {
                        let newRow = {}
                        newRow.id = Symbol()
                        newRow.operation = {
                            element: '',
                            ui: '',
                            classType: ''
                        }
                        newRow.functions = []
                        newRow.functions.push({ name: node.name, parameterlist: node.arguments })

                        newRow.parameters = []
                        try{
                            var parameters = JSON.parse(node.arguments)
                            for(let param of parameters) {
                                newRow.parameters.push({Name: param.name, Value: '' })
                            }
                        } catch(e) {
                            newRow.parameters = []
                        }
                        
                        editDataVue.operationRows.push(newRow)
                    }
                }
                $('#ui-ele-modal2').modal('hide')
            },
            updateRow: function(rows, index) {
            }
        }
    })
})