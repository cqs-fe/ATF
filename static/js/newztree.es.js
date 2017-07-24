$(document).ready(function(){
	var editDataVue = new Vue({
		el:'#table2',
		data: {
			// 保存table中每一行的数据 [{id:Symbol(), functions: [], operation: {element:'', ui: '',parameters:[]}}],
			operationRows: [{id:Symbol(), functions: [], operation: {element:'', ui: '',parameters:[]}}],		
			parameterVue: null,
			// ztree的设置项
			zTreeSettings: {
				uiAndElement: {
					callback: {
					},
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
					callback: {
					},
					data: {
				        key:{
				            name:"mname",
				        },
				        simpleData: {
				            enable: true,
				            idKey: 'classid', 
				            pIdKey: 'parentid', 
				            rootPId: 0
				        }
				    }
				}
			},
			uiOrFunctions: {
				changed: false,  	// 模态框出现后是否点击过，如果点击过，在模态框点击保存时才会进行更改
				type: 'ui',			// 保存最后点击的是UI还是函数集，据此来确定不同的后续执行行为
				ui: '',				// 保存点击的ui
				element: '',		// 保存点击的元素
				function: '',		// 保存点击的函数集中的项
				target: null,		// 保存点击编辑的target，据此可以获得parent tr
			},
		},
		ready: function() {
				var _this = this;
				this.zTreeSettings.uiAndElement.callback.onClick = this.zTreeOnClick;
				this.zTreeSettings.functions.callback.onClick = this.zTreeOnClick;
				// 设置table可以拖拽行
				$( function() {
		            $( "#sortable" ).sortable({
		                stop: (event, ui) => {
		                	if(+(ui.item[0].rowIndex - 1) === +ui.item[0].getAttribute('data-index')){
		                		return
		                	}
		                	// 拖拽停止后，改变绑定的数组中元素的顺序
		                	var target = ui.item[0].rowIndex - 1
		                	console.log(target)
		                	var start = ui.item[0].getAttribute('data-index');
		                	// console.log(`target: ${target} -- start: ${start}--end: ${end}`)
		                	if(target < 0) {
		                		_this.operationRows.unshift(_this.operationRows.splice(start, 1)[0])
		                	} else {
		                		_this.operationRows.splice(target, 0, _this.operationRows.splice(start, 1)[0])
		                	}
		                }
		            });
		            $( "#sortable" ).disableSelection();
		        } );
		},
		methods: {
			addRow: function() {
				let s = {id: Symbol(), operation: {element:'', ui:''}, functions:[], parameters: []}
				this.operationRows.push(s)
			},
			deleteRow: function(index) {
				this.operationRows.splice(index, 1)
			},
			// remove the row who is checked when 
			removeRow: function(event) {
				var parent = $(event.target).closest('.operation-wrapper')
				var trs = parent.find("tbody input[type='checkbox']:checked").closest('tr')

				for(var tr of trs) {
					this.operationRows.splice(tr.getAttribute('data-index'), 1)
				}
			},
			moveUp: function(event) {
				console.log('moveUp')
				var _this = this;
				var operationRows = this.operationRows
				var trs = $(event.target).closest('.operation-wrapper').find(`input[type='checkbox']:checked`).closest('tr')
				$.each(trs, (index, row) => {
					var originIndex = row.getAttribute('data-index')
					originIndex >= 1 &&
					operationRows.splice(originIndex - 1, 0, operationRows.splice(originIndex,1)[0])
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
			// 显示UI和元素 、函数集
			showUiAndElement: function(event, type) {
				var _this = this;
				this.uiOrFunctions.target = event.target;
				this.uiOrFunctions.changed = false;
				// 请求Ui和Elment
				$.ajax({
					url: address + 'elementlibraryController/showUIandElement',
					data: 'transid=1',
					type: 'post',
					dataType: 'json',
					success: (data, statusText) => {
						if(data && data.success === true && (data.obj instanceof Array)) {
							$.fn.zTree.init($('#ui-element-ul'),_this.zTreeSettings.uiAndElement, data.obj);
						}
					}
				})
				// 请求函数集
				$.ajax({
					url: address + 'autController/selectFunctionSet',
					data: 'id=2',
					type: 'post',
					dataType: 'json',
					success: (data, statusText) => {
						if(data.ommethod) {
							$.fn.zTree.init($('#functions-ul'),_this.zTreeSettings.functions, data.ommethod);
						}	
					}
				})

				$('#ui-ele-modal').modal('show')
			},
			// 确定ztree的点击事件
			zTreeOnClick: function(event, treeId, treeNode) {
				if(treeNode.isParent){
					return					// 如果点击了父节点，则返回
				}
				// 判断树结构是ui还是函数集
				if(treeId === 'ui-element-ul') {
					var parent = treeNode.getParentNode()
					if (!parent) {
						return			// 没有父元素，则返回
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
				this.uiOrFunctions.changed = true;			// 已经在模态框中点击了树节点
			},
			// 编辑参数方法，出现模态框，进行函数的编辑
			editParameter: function(event, type) {
				var _this = this
				// 保存当前点击行，行索引值以及当前需要操作的table所绑定的数组
				var parentRow = $(event.target).parents('tr')
				var index = parentRow.attr('data-index');
				var operationRows = _this.operationRows;

				_this.parameterVue = new Vue({
					el: '#edit-parameter-modal',
					data: {
						parameters: null
					},
					methods: {
						okParameter: function(event) {
							var inputs = $('#edit-parameter-modal input')
							console.log(inputs)
							for(var i=0;i<operationRows[index].parameters.length;i++) {
								operationRows[index].parameters[i].Value = inputs[i].value
							}
							modalVue.updateRow(operationRows, index)
							console.log(operationRows)
							$('#edit-parameter-modal').modal('hide')
						}
					}
				})
				_this.parameterVue.parameters = operationRows[index].parameters;
				$('#edit-parameter-modal').modal('show')
			},
		}
	})
	var modalVue = new Vue({
		el: '#ui-ele-modal',
		data: {},
		methods: {
			// 在模态框中点击了保存按钮
			editRow: function () {
				var _this = this;
				if(!editDataVue.uiOrFunctions.changed) {
					return;		// 没有点击树结构，则返回
				}
				// 保存当前点击行，行索引值以及当前需要操作的table所绑定的数组
				var parentRow = $(editDataVue.uiOrFunctions.target).parents('tr')
				var index = parentRow.attr('data-index');
				var operationRows =  editDataVue.operationRows;

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
						id: 8,		// autid
						classname: editDataVue.uiOrFunctions.ui,		// classname
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
							autid: 8,	
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
})