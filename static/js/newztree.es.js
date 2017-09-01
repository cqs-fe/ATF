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
            script_id: '',
            ids: '',
            // 新增模板绑定数据
            newTemplate: {
                name: '',
                description: ''
            }
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
                $.ajax({
                    // async: false,
                    url: address + "autController/selectAll",
                    type: "POST",
                    success: function(data) {
                        var autList = data.obj;
                        var str = "";
                        for (var i = 0; i < autList.length; i++) {

                            str += " <option value='" + autList[i].id + "' >" + autList[i].autName + "</option> ";
                        }

                        $('#autSelect').html(str);
                        mainVue.autId = sessionStorage.getItem("autId");
                        $("#autSelect").val(mainVue.autId);
                        $.ajax({
                            url: address + 'transactController/showalltransact',
                            data: { 'autlistselect': mainVue.autId },
                            type: "POST",
                            success: function(data) {
                                var transactList = data.o;
                                var str = "";
                                for (var i = 0; i < transactList.length; i++) {

                                    str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
                                }
                                $('#transactSelect').html(str);
                                mainVue.transId = sessionStorage.getItem("transactId");
                                $("#transactSelect").val(mainVue.transId);
                                mainVue.getScriptTemplate();
                            }

                        });
                    }
                });
            },
            //获取测试系统
            autSelect: function() {
                $.ajax({
                    async: false,
                    url: address + "autController/selectAll",
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
                // var val = sessionStorage.getItem('autId');
                // console.log(this.autId);
                $.ajax({
                    async: false,
                    url: address + 'transactController/showalltransact',
                    data: { 'autlistselect': val },
                    type: "POST",
                    success: function(data) {
                        // console.log(data.o)
                        var transactList = data.o;
                        var str = "";
                        for (var i = 0; i < transactList.length; i++) {

                            str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
                        }
                        $('#transactSelect').html(str);
                    }

                });
                this.transId = $('#transactSelect').val();
            },
            //设置所属测试系统和所属功能点为上级页面选中的值
            setval: function() {
                this.autId = sessionStorage.getItem("autId");
                this.transId = sessionStorage.getItem("transactId");
                $("#autSelect").val(this.autId);
                $("#transactSelect").val(this.transId);
            },
            //获取选中的id
            getIds: function() {
                var id_array = new Array();
                $('input[name="chk_list"]:checked').each(function() {
                    id_array.push($(this).attr('id'));
                });
                this.ids = id_array.join(',');
                // $('input[name="id"]').val(id_array.join(','));
            },
            getScriptTemplate: function() {
                var _this = this;
                $.ajax({
                    url: address + 'scripttemplateController/showallscripttemplate',
                    data: { 'transactid': _this.transId },
                    type: "POST",
                    success: function(data) {
                        _this.templateList = data.o;
                    }
                });
            },
            change: function() {
                var _this = this;
                var length = this.checkedTemplate.length;
                if (length > 0) {
                    // this.checkedTemplate.splice(0, 1)
                    var templateId = this.checkedTemplate[length - 1];
                    // return 
                    this.script_id = _this.templateList[templateId].id;
                    console.log(this.script_id);
                    var data = {
                        aut_id: _this.autId,
                        script_id: _this.templateList[templateId].id
                    };
                    $.ajax({
                        url: address + 'scripttemplateController/showScripttemplateTable',
                        data: data,
                        type: 'post',
                        dataType: 'json',
                        success: function(data) {
                            if (data.success === true) {
                                console.log(data.o.data)
                                // {id:Symbol(), functions: [], operation: {element:'', ui: '',parameters:[{Name:'', Value: ''}]}}
                                for (var operationRow of data.o.data) {
                                    let row = {
                                        id: null,
                                        functions: [],
                                        operation: {
                                            element: '',
                                            ui: ''
                                        },
                                        parameters: []
                                    }
                                    row.id = Symbol()
                                    row.functions.push({ mname: operationRow.function })
                                    row.operation.element = operationRow.operator[0]
                                    row.operation.ui = operationRow.operator[1]
                                    for (let para of operationRow.arguments) {
                                        row.parameters.push({
                                            Name: para.value,
                                            Value: ''
                                        })
                                    }
                                    // 插入到operationRows中
                                    editDataVue.operationRows.push(row)
                                    // editDataVue.operationRows = [row]
                                }
                            }
                        }
                    });
                }
            },
            saveTemplate: function() {
                var _this = this;
                _this.newTemplate.transId = _this.transId
                $.ajax({
                    url: address + 'scripttemplateController/insert',
                    data: _this.newTemplate,
                    type: 'post',
                    dataType: 'json',
                    success: function(data) {
                        Vac.alert('添加成功！')
                        $('#addtemplateModal').modal('hide')
                        _this.getScriptTemplate();
                    },
                    error: function() {
                        Vac.alert('添加失败！')
                    }
                })
            },
            deleteTemplate: function() {
                var _this = this;
                _this.getIds();
                if (!_this.checkedTemplate.length) {
                    Vac.alert('请选择要删除的模板！')
                    return
                }
                $.ajax({
                    url: address + 'scripttemplateController/delete',
                    data: { 'id': _this.ids },
                    type: 'post',
                    dataType: 'json',
                    success: function(data) {
                        if (data) {
                            Vac.alert('删除成功！')
                            // _this.checkedTemplate.pop()
                            _this.getScriptTemplate();
                        }
                    },
                    error: function() {
                        Vac.alert('删除失败！')
                    }
                })
            }
        }
    })

    var editDataVue = new Vue({
        el: '#table2',
        data: {
            // 保存table中每一行的数据 [{id:Symbol(), functions: [], operation: {element:'', ui: '',parameters:[]}}],
            operationRows: [],
            // parameterVue: null,
            // ztree的设置项
            zTreeSettings: {
                uiAndElement: {
                    callback: {},
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: 'id',
                            pIdKey: 'parentid',
                            rootPId: 0
                        }
                    }
                },
                functions: {
                    callback: {},
                    data: {
                        key: {
                            name: "methodname",
                        },
                        simpleData: {
                            enable: true,
                            idKey: 'arcclassid',
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
                        simpleData: {
                            enable: true,
                            idKey: 'id',
                            pIdKey: 'parentid',
                            rootPId: 0
                        }
                    },
                    check: {
                        enable: true,
                        chkStyle: "checkbox",
                        chkboxType: { "Y": "ps", "N": "ps" }
                    }
                },
                functions: {
                    callback: {},
                    data: {
                        key: {
                            name: "methodname",
                        },
                        simpleData: {
                            enable: true,
                            idKey: 'arcclassid',
                            pIdKey: 'parentid',
                            rootPId: 0
                        }
                    },
                    check: {
                        enable: true,
                        chkStyle: "checkbox",
                        chkboxType: { "Y": "ps", "N": "ps" }
                    }
                }
            },
            uiOrFunctions: {
                changed: false, // 模态框出现后是否点击过，如果点击过，在模态框点击保存时才会进行更改
                type: 'ui', // 保存最后点击的是UI还是函数集，据此来确定不同的后续执行行为
                ui: '', // 保存点击的ui
                element: '', // 保存点击的元素
                function: '', // 保存点击的函数集中的项
                target: null, // 保存点击编辑的target，据此可以获得parent tr
                index: 0 // 保存每一行的index
            }
        },
        ready: function() {
            var _this = this;
            this.zTreeSettings.uiAndElement.callback.onClick = this.zTreeOnClick;
            this.zTreeSettings.functions.callback.onClick = this.zTreeOnClick;
            // 设置table可以拖拽行
            $(function() {
                $("#sortable").sortable({
                    stop: (event, ui) => {
                        if (+(ui.item[0].rowIndex - 1) === +ui.item[0].getAttribute('data-index')) {
                            return
                        }
                        // 拖拽停止后，改变绑定的数组中元素的顺序
                        var target = ui.item[0].rowIndex - 1
                        console.log(target)
                        var start = ui.item[0].getAttribute('data-index');
                        // console.log(`target: ${target} -- start: ${start}--end: ${end}`)
                        if (target < 0) {
                            _this.operationRows.unshift(_this.operationRows.splice(start, 1)[0])
                        } else {
                            _this.operationRows.splice(target, 0, _this.operationRows.splice(start, 1)[0])
                        }
                    }
                });
                $("#sortable").disableSelection();
            });
            $('#edit-parameter-modal').on('hidden.bs.modal', function() {

            })
        },
        methods: {
            addRow: function() {
                let s = { id: Symbol(), operation: { element: '', ui: '' }, functions: [], parameters: [] }
                this.operationRows.push(s)
            },
            deleteRow: function(index) {
                this.operationRows.splice(index, 1)
            },
            // remove the row who is checked when 
            removeRow: function(event) {
                var parent = $(event.target).closest('.operation-wrapper')
                var trs = parent.find("tbody input[type='checkbox']:checked").closest('tr')

                for (var tr of trs) {
                    this.operationRows.splice(tr.getAttribute('data-index'), 1)
                }
            },
            moveUp: function(event) {
                console.log('moveUp')
                var _this = this;
                var operationRows = this.operationRows;
                var trs = $(event.target).closest('.operation-wrapper').find(`input[type='checkbox']:checked`).closest('tr');
                $.each(trs, (index, row) => {
                    var originIndex = row.getAttribute('data-index')
                    originIndex >= 1 &&
                        operationRows.splice(originIndex - 1, 0, operationRows.splice(originIndex, 1)[0])
                })
            },
            moveDown: function(event) {
                console.log(JSON.parse(`[{"Name":"输入值1","Type":"","Desc":"","ParameterizeColumn":"{element}"},{"Name":"输入值2","Type":"","Desc":"","ParameterizeColumn":"{element}"}]`))
                var _this = this;
                var operationRows = this.operationRows
                var trs = $(event.target).closest('.operation-wrapper').find(`input[type='checkbox']:checked`).closest('tr')
                for (var i = trs.length - 1; i >= 0; i--) {
                    var originIndex = trs[i].getAttribute('data-index')
                    operationRows.splice(+originIndex + 1, 0, operationRows.splice(+originIndex, 1)[0])
                }
            },
            //保存 
            tableSave: function() {
                //UI("denglu").webedit("username").set(1,"123");
                var sendDataArray = [];
                var trs = Array.from(document.querySelectorAll('#sortable tr.before-operation-row '))
                for (var tr of trs) {
                    // 
                    var UI = tr.querySelector('.operation-element').value
                    var webedit = tr.querySelector('.operation-ui').value
                    var method = tr.querySelector('.functions-select').value
                    // 获取参数列表
                    var paramTrs = Array.from(tr.querySelectorAll('.parameters .param-value'))
                    var paramValues = []
                    for (var paramTr of paramTrs) {
                        paramValues.push(`"${paramTr.innerHTML}"`)
                    }
                    var parameterString = paramValues.toString()
                    var string = `UI("${UI}").webedit("${webedit}").${method}(${paramValues})`
                    sendDataArray.push(string)
                }
                var sendData = sendDataArray.join(';')
                console.log(sendData)
                // Vac.alert('这是生成的脚本代码:\n' + sendData)
                // UI(""登录页面"").webedit("webedit").set("3");UI(""登录页面"").webedit("webedit").set("444");UI("welcome to the system").webedit("webedit").set("333")
                $.ajax({
                    url: address + 'scripttemplateController/scripttemplateSave',
                    type: 'post',
                    data: {
                        'script_id': mainVue.script_id,
                        'content': sendData
                    },
                    success: function(data) {
                        if (data.success) {
                            $('#success').modal();
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
                $.ajax({
                    url: '../../mock/script.json',
                    type: 'post',
                    data: {
                        'autId': mainVue.autId,
                        'script_id': mainVue.script_id
                    },
                    success: function(data) {
                        console.log(data);
                        if (data.success) {
                            var param_tds = [...$('.param-value')]; //$('.param-value')取到的是类数组，不能使用forEach方法，所以使用es6的rest方法将其转换为数组
                            param_tds.forEach(function(item, index) {
                                item.innerHTML = data.o[index];
                            })
                        } else {
                            $('#fail').modal();
                        }
                    },
                    error: function() {
                        $('#fail').modal();
                    }
                })
            },
            // 显示UI和元素 、函数集
            showUiAndElement: function(event, type) {
                var _this = this;
                this.uiOrFunctions.target = event.target;
                this.uiOrFunctions.changed = false;
                // 请求Ui和Elment
                $.ajax({
                    url: address + 'elementlibraryController/showUIandElement',
                    data: 'transid=' + mainVue.transId,
                    type: 'post',
                    dataType: 'json',
                    success: (data, statusText) => {
                        if (data && data.success === true && (data.obj instanceof Array)) {
                            $.fn.zTree.init($('#ui-element-ul'), _this.zTreeSettings.uiAndElement, data.obj);
                        }
                    }
                })
                // 请求函数集
                var autId = $("#autSelect").val();
                console.log(autId)
                $.ajax({
                    url: address + 'autController/selectFunctionSet',
                    data: { 'id': mainVue.autId },
                    type: 'post',
                    dataType: 'json',
                    success: (data, statusText) => {
                        if (data.arcmethod) {
                            $.fn.zTree.init($('#functions-ul'), _this.zTreeSettings.functions, data.arcmethod);
                        }
                    }
                })

                $('#ui-ele-modal').modal('show')
            },
            showUIModal: function() {
                var _this = this;
                $.ajax({
                    url: address + 'elementlibraryController/showUIandElement',
                    data: 'transid=' + mainVue.transId,
                    type: 'post',
                    dataType: 'json',
                    success: (data, statusText) => {
                        if (data && data.success === true && (data.obj instanceof Array)) {
                            $.fn.zTree.init($('#ui-element-ul2'), _this.zTreeSettings2.uiAndElement, data.obj);
                        }
                    }
                })
                // 请求函数集
                $.ajax({
                    url: address + 'autController/selectFunctionSet',
                    data: { 'id': mainVue.autId },
                    type: 'post',
                    dataType: 'json',
                    success: (data, statusText) => {
                        if (data.arcmethod) {
                            $.fn.zTree.init($('#functions-ul2'), _this.zTreeSettings2.functions, data.arcmethod);
                        }
                    }
                })

                $('#ui-ele-modal2').modal('show')
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
                    this.uiOrFunctions.ui = treeNode.name
                    this.uiOrFunctions.element = parent.name;
                } else {
                    this.uiOrFunctions.type = 'function'
                    // 获取节点的全部内容
                    this.uiOrFunctions.function = treeNode;
                    // console.log(treeNode)
                }
                this.uiOrFunctions.changed = true; // 已经在模态框中点击了树节点
            },
            // 编辑参数方法，出现模态框，进行函数的编辑
            editParameter: function(event, type) {
                var _this = this
                // 保存当前点击行，行索引值以及当前需要操作的table所绑定的数组
                _this.uiOrFunctions.target = event.target
                var parentRow = $(event.target).parents('tr')
                _this.uiOrFunctions.index = parentRow.attr('data-index');

                parameterVue.parameters = _this.operationRows[_this.uiOrFunctions.index].parameters;
                $('#edit-parameter-modal').modal('show')
            },
        }
    })
    var parameterVue = new Vue({
        el: '#edit-parameter-modal',
        data: {
            parameters: null
        },
        ready: function() {
            // console.log(editDataVue.uiOrFunctions.index)
            // console.log(editDataVue.operationRows[editDataVue.uiOrFunctions.index].parameters)
            // this.parameters = editDataVue.operationRows[editDataVue.uiOrFunctions.index].parameters;
        },
        methods: {
            okParameter: function(event) {
                var inputs = $('#edit-parameter-modal input')

                var parentRow = $(editDataVue.uiOrFunctions.target).parents('tr')
                var operationRows = editDataVue.operationRows
                var index = editDataVue.uiOrFunctions.index
                for (var i = 0; i < operationRows[index].parameters.length; i++) {
                    operationRows[index].parameters[i].Value = inputs[i].value
                }
                modalVue.updateRow(operationRows, index)
                // console.log(operationRows)
                $('#edit-parameter-modal').modal('hide')
            }
        }
    })

    var modalVue = new Vue({
        el: '#ui-ele-modal',
        data: {},
        methods: {
            // 在模态框中点击了保存按钮
            editRow: function() {
                var _this = this;
                if (!editDataVue.uiOrFunctions.changed) {
                    return; // 没有点击树结构，则返回
                }
                // 保存当前点击行，行索引值以及当前需要操作的table所绑定的数组
                var parentRow = $(editDataVue.uiOrFunctions.target).parents('tr')
                var index = parentRow.attr('data-index');
                console.log(index)
                var operationRows = editDataVue.operationRows;

                if (editDataVue.uiOrFunctions.type === 'ui') {
                    // 点击了ui 与 元素后, 更新operation
                    operationRows[index].operation = {
                        ui: editDataVue.uiOrFunctions.ui,
                        element: editDataVue.uiOrFunctions.element
                    };

                    // 使用splice方法，通过改变数组项的id更新绑定的数组，
                    _this.updateRow(operationRows, index);

                    // 发送ajax请求函数的数据
                    var data = {
                        id: mainVue.autId, // autid
                        classname: editDataVue.uiOrFunctions.ui, // classname
                    }

                    var getFunctions = new Promise((resolve, reject) => {
                        $.ajax({
                            url: address + 'autController/selectMethod',
                            data: data,
                            type: 'post',
                            dataType: 'json',
                            success: function(data, statusText) {
                                var ommethod = data.ommethod;
                                operationRows[index].functions = ommethod;
                                _this.updateRow(operationRows, index)
                                resolve();
                            }
                        })
                    })
                    getFunctions.then(() => {
                        // 获取函数项的值
                        // var mname = $('.functions-select', parentRow).val()
                        var mname = operationRows[index].functions[0].mname
                        var data = {
                            autid: mainVue.autId,
                            className: editDataVue.uiOrFunctions.ui,
                            methodName: mname
                        }
                        return new Promise((resolve, reject) => {
                            $.ajax({
                                url: address + 'autController/selectParameterlist',
                                data: data,
                                type: 'post',
                                dataType: 'json',
                                success: function(data, statusText) {
                                    operationRows[index].parameters = JSON.parse(`${data}`)
                                    _this.updateRow(operationRows, index)
                                    resolve()
                                }
                            })
                        })
                    }).then(() => {
                        console.log('success')
                    })
                } else {
                    // $('.functions-select', parentRow).html(`<option value="${editDataVue.uiOrFunctions.function}">${editDataVue.uiOrFunctions.function}</option>`)
                    operationRows[index].functions.push(editDataVue.uiOrFunctions.function)
                    console.log()
                    operationRows[index].parameters = JSON.parse(operationRows[index].functions[0].arguments)
                    _this.updateRow(operationRows, index)
                }
                $('#ui-ele-modal').modal('hide')
            },
            updateRow: function(rows, index) {
                // 使用splice方法，通过改变数组项的id更新绑定的数组，
                var cache = rows[index]
                cache.id = Symbol()
                rows.splice(index, 1, cache)
            }
        }
    })
    var modalVue2 = new Vue({
        el: '#ui-ele-modal2',
        data: {},
        methods: {
            // 在模态框中点击了保存按钮
            editRowMultiple: function() {
                console.log(uiNodes)
                var uiTree = $.fn.zTree.getZTreeObj("ui-element-ul2");
                var functionTree = $.fn.zTree.getZTreeObj("functions-ul2");
                var uiNodes = uiTree.getCheckedNodes(true);

                var functionNodes = functionTree.getCheckedNodes(true)
                console.log(functionNodes)

                for (var node of uiNodes) {
                    if (node.isParent) {
                        continue;
                    }
                    let newRow = {}; // {id:Symbol(), functions: [], operation: {element:'', ui: '',parameters:[]}}
                    newRow.id = Symbol()
                    newRow.operation = {
                        element: node.getParentNode().name,
                        ui: node.name
                    }
                    newRow.functions = []
                    $.ajax({
                        url: address + 'autController/selectMethod',
                        data: { id: mainVue.autId, classname: newRow.operation.ui },
                        type: 'post',
                        dataType: 'json',
                        success: function(data, statusText) {
                            for (var method of data.ommethod) {
                                newRow.functions.push(method)
                            }
                            // data.ommethod[0] && (newRow.functions.push(data.ommethod[0]))
                            // 把第一个function的参数取出来，放入
                            data.ommethod[0] && (newRow.parameters = JSON.parse(data.ommethod[0].arguments))
                            editDataVue.operationRows.push(newRow)
                        }
                    })
                }
                for (var node of functionNodes) {
                    console.log(node)
                    let newRow = {}
                    newRow.id = Symbol()
                    newRow.operation = {
                            element: '',
                            ui: ''
                        },
                        newRow.functions = []
                    newRow.functions.push(node)
                    newRow.parameters = JSON.parse(node.parameterlist)
                    editDataVue.operationRows.push(newRow)
                }
                $('#ui-ele-modal2').modal('hide')
            },
            updateRow: function(rows, index) {
                // 使用splice方法，通过改变数组项的id更新绑定的数组，
                // var cache = rows[index]
                // cache.id = Symbol()
                // rows.splice(index, 1, cache)
            }
        }
    })
})