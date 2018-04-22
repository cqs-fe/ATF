
  __inline('./scene-management/checked.js')
var vBody = new Vue({
	el: '#v-body',
	data: {
		isSelect: false,
		tooltipFlag: true,
		tooltipType: 4,
		triggerShow: false,
		saveTriggerType: 1,

		alertShow: false,
		tooltipMessage: '',

		sceneInfo: null,
		caseMaxLength: {},
		caseIds: [],
		flowNodeIds: new Map(),

		triggers: null,
		triggerInfo: {
			selectedTrigger: [],
			editTriggerType: '编辑'
		},
		// 保存触发器编辑的字段数据
		editTriggerData:{
			triggerId: null,
			name: "",
			desc:'',
			occasions: [],
			Conditionrelate: null,
			conditions: [],
			actions: [],
			modifyType: null
		},
		// 保存执行策略的数据
		exe_strategy: {
			// sceneId: '3',
			exe_strategy1_status: '1',
			exe_strategy2_start: '1',
			exe_strategy2_order: '1',
			exe_strategy2_status: '1',
			exe_strategy3_start: '1',
			exe_strategy3_order: '1',
			exe_strategy3_status: '1',
			exe_strategy_err: '1'
		},
		exe_strategy1_status: '1',
			exe_strategy2_start: '1',
			exe_strategy2_order: '1',
			exe_strategy2_status: '1',
			exe_strategy3_start: '1',
			exe_strategy3_order: '1',
			exe_strategy3_status: '1',
			exe_strategy_err: '1',
		checkall: false,
		// save the selected cases
		selectedCases: [],
		// save the checked flow nodes
		checkedFlowNodes: [],
		// 执行时间设置的相关参数
		executeTime: null,
		executeDateFlag: null,

		// 数据池数据
		dataPoolTitle: '',
		editPoolType: 1,
		selectedPool:[],
		selectedPoolId: null,
		poolData: {
			poolname: null,
			datadesc: null,
			poolobjid: null,
			dataname: null,
			datavalue: null
		},
		poolDatas: null,

		//场景id和名称
		url: '',
		sceneid: '',
		scenename: '场景名称',
		exeImgs: {
			0: __uri('../static/images/waiting.png'),
			1: __uri('../static/images/running.gif'),
			2: __uri('../static/images/success.png'),
			3: __uri('../static/images/failed.png')
		},
		// 调试轮次
		debugRound: null,
		exeScope: null,
		isDebugInfoShow: false
	},
	computed: {
		panelHeight: function(){
			return { height: (this.tooltipFlag	? 0 : 200 ) + 'px' };
		}
	},
	ready:function(){
		this.setVal();
		var _this = this;
		// 用于初始化 滑动鼠标选取元素
		this.setSelectListener();
		// 用于页面加载时获取所有的用例
		this.getCases();
		// 数据池模态框消失
		$('#editDataPool').on('hidden.bs.modal', function(e){
			_this.poolData.poolname = '';
			_this.poolData.poolobjid = '';
			_this.poolData.dataname = '';
			_this.poolData.datavalue = '';
			_this.poolData.datadesc = '';
			// _this.selectedPool = [];
		});
		// Vac.startDrag(document.querySelector('#editTrigger-header'), document.querySelector('#editTrigger'))
		$('#sortable').sortable({
			handle: '.handle'
		})
		$( "#sortable" ).disableSelection();

		$('.3').addClass('open')
		$('.3 .arrow').addClass('open')
		$('.3-ul').css({display: 'block'})
		$('.3-4').css({color: '#ff6c60'})
	},
	watch: {
		"selectedCases": function(value, oldVal) {
			this.checkall = (value.length === this.caseIds.length)
			this.setBackground()
		},
		"checkedFlowNodes": function(value, oldVal) {
			
			for(let key of this.flowNodeIds.keys()) {
				if(this.flowNodeIds.get(key).every((value) => {
					return this.checkedFlowNodes.includes(value)
				}))
				{
					this.pushNoRepeat(this.selectedCases, +key)
				} else
				{
					let set = new Set(this.selectedCases)
					set.delete(+key)
					this.selectedCases = [...set]
				}
			}
			this.setBackground();
		}
	},
	methods: {
		setBackground: checkFunction.setBackground,
		//获取上级页面选中的场景id和名称
		setVal:function(){
			var thisURL = document.URL;
            var getval = thisURL.split('?')[1];
            if (!getval) {
            	var promise = Vac.confirm('#vac-confirm', '.okConfirm', '.cancelConfirm', "请从场景管理页面进入！");
            	promise.then(() => {
            		location.href = "scene.html"
            	}, () => {
            		location.href = "scene.html"
            	})
            	
            }
            var keyval = getval.split('&');
            this.url = document.URL;
            
            this.sceneid = keyval[0].split('=')[1],
            this.scenename = decodeURI(keyval[1].split('=')[1]);
		},
		toInsertSceneCase: function(){
			location.href = "insertSceneCase.html?sceneid=" + this.sceneid + "&" + "scenename=" + this.scenename;
		},
		getCases: function(){
			var _this = this;
			$.ajax({
				url: address + 'sceneController/selectByPrimaryKey',
				// url: '/api/getcaseinscene',
				data: 'id='+_this.sceneid,
				type: 'post',
				dataType: 'json',
				success: function(data, statusText){
					if(data.success == true){
						// _this.sceneInfo = data.obj;
						let caseGroup = {}, caseMaxLength = {};
						for(var i = 0; i < data.obj.caseDtos.length; i++) {
							if(caseGroup[data.obj.caseDtos[i].group]) {
								// 已经有 group
							} else {
								caseGroup[data.obj.caseDtos[i].group] = [];
							}
							let group = caseGroup[data.obj.caseDtos[i].group];
								let o = {};
								Object.defineProperty(o, "id", {value: data.obj.caseDtos[i].id });
								Object.defineProperty(o, "caseCompositeType", {value: data.obj.caseDtos[i].caseCompositeType });
								if (data.obj.caseDtos[i].caseCompositeType+'' === '1') {
									let time = data.obj.caseDtos[i].time;
									o[time] = [data.obj.caseDtos[i]];
									group.push(o);
								} else {
									for (var j = 0; j < data.obj.caseDtos[i].flowNodeDtos.length; j++) {
										let time = data.obj.caseDtos[i].flowNodeDtos[j].time;
										if (o[time]) {
											o[time].push(data.obj.caseDtos[i].flowNodeDtos[j]);
										} else {
											o[time] = [data.obj.caseDtos[i].flowNodeDtos[j]];
										}
									}
									group.push(o);
								}
						}
						
						for (var group in caseGroup) {
							for (var i = 0; i < caseGroup[group].length; i++) {
								for (var time in  caseGroup[group][i]){
									caseMaxLength[time] = caseMaxLength[time] === undefined ? 0 : Math.max(caseGroup[group][i][time].length, caseMaxLength[time]);
								}
							}
						}
						_this.caseMaxLength = caseMaxLength;
						data.obj.caseGroup = caseGroup;
						_this.sceneInfo = data.obj;
						// var o = {
							_this.exeStrategy1Status= data.obj.exe_strategy1_status || 1;
							_this.exeStrategy2Start=data.obj.exe_strategy2_start || '1';
							_this.exeStrategy2Order= data.obj.exe_strategy2_order || '1';
							_this.exeStrategy2Status= data.obj.exe_strategy2_status || '1';
							_this.exeStrategy3Start= data.obj.exe_strategy3_start || '1';
							_this.exeStrategy3Order= data.obj.exe_strategy3_order || '1';
							_this.exeStrategy3Status= data.obj.exe_strategy3_status || '1';
							_this.exeStrategyErr= data.obj.exe_strategy_err || '1';
						// };
						// ({
						// 	exeStrategy1Status: _this.exe_strategy.exe_strategy1_status || '1';
						// 	exeStrategy2Start:_this.exe_strategy.exe_strategy2_start || '1',
						// 	exeStrategy2Order: _this.exe_strategy.exe_strategy2_order || '1',
						// 	exeStrategy2Status: _this.exe_strategy.exe_strategy2_status || '1',
						// 	exeStrategy3Start: _this.exe_strategy.exe_strategy3_start || '1',
						// 	exeStrategy3Order: _this.exe_strategy.exe_strategy3_order || '1',
						// 	exeStrategy3Status: _this.exe_strategy.exe_strategy3_status || '1',
						// 	exeStrategyErr: _this.exe_strategy.exe_strategy_err || '1'
						// } = data.obj);
						// _this.exe_strategy = o;
						console.log(_this.exe_strategy)
						if(!(data.obj.caseDtos && data.obj.caseDtos.length)) {
							Vac.alert('未查询到相关的用例信息')
						}
						for (var i = data.obj.caseDtos.length - 1; i >= 0; i--) {
							_this.caseIds.includes(data.obj.caseDtos[i].id) ? 1 : (_this.caseIds.push(data.obj.caseDtos[i].id))
							if(data.obj.caseDtos[i].caseCompositeType == 2) {
								let arr = []
								for (var j = data.obj.caseDtos[i].flowNodeDtos.length - 1; j >= 0; j--) {
									arr.push(data.obj.caseDtos[i].flowNodeDtos[j].id)
								}
								_this.flowNodeIds.set(+data.obj.caseDtos[i].id, arr)
							}
						}
						Vue.nextTick(() => {
							$('#sortable').width($('#sortable').width()+20)
						})
					}
				}
			});
		},
		getTriggers: function(){
			var _this = this;
			$.ajax({
				url: address + 'trigerController/trigerqueryinScene',
				data: 'sceneId='+_this.sceneid,
				type: 'post',
				dataType: 'json',
				success: function(data){
					if(data.success == true){
						_this.triggers = data.obj;
					}
				}
			});
		},
		setSelect: checkFunction.setSelect,
		pushNoRepeat: checkFunction.pushNoRepeat,
		setSelectListener: checkFunction.setSelectListener,
		changeCase: function(id, type) {
			let arr = type === 1 ? this.selectedCases : this.checkedFlowNodes;
			let index = arr.findIndex((value) => { return value === id })
			index !== -1 ? arr.splice(index, 1) : arr.push(id)
		},
		// 点击checkbox
		checkChanged: checkFunction.checkChanged,
		// 全选case-lib中的case
		checkallToggle: checkFunction.checkallToggle,
		checkallBox: checkFunction.checkallBox,
		toggleTooltip: function(event){
			this.tooltipFlag = !this.tooltipFlag;
		},
		//打开tooltipWindow，并根据传入的参数显示相应的操作内容
		operationType: function(type){
			this.tooltipType = type;
			this.tooltipFlag = false;
			// 触发器设置
			if(type === 2){
				this.getTriggers();
			}else if(type === 4){
				this.getDataPool();
			} else if (type === 3) {
				this.getExecuteStrategy();
			}
		},
		// 获取执行策略
		getExecuteStrategy: function(){

		},
		// 打开关闭触发器设置的弹出框
		closeTrigger: function(){
			this.triggerShow = false;
			this.editTriggerData.name = '';
			this.editTriggerData.desc = '';
			this.editTriggerData.occasions = [];
			this.editTriggerData.Conditionrelate = null;
			$('#conditionsBody').empty();
			$('.action-item-wrapper').remove();
		},
		// 打开编辑触发器的弹框
		openTrigger: function(type){
			var _this = this;
			this.saveTriggerType = type;
			if(type === 1){
				this.triggerInfo.editTriggerType = "新增";
				this.triggerShow = true;
			}else{
				if(this.triggerInfo.selectedTrigger.length == 0){
					Vac.alert('请选择要编辑的触发器！')
					return;
				}
				this.triggerInfo.editTriggerType = "编辑";
				// 获取触发器内容
				$.ajax({
					url: address + 'trigerController/trigerquery',
					data: 'trigerId=' + _this.triggerInfo.selectedTrigger[0],
					type: 'post',
					dataType: 'json',
					success: function(data, statusText){
						if(data.success == true){
							({
								id: _this.editTriggerData.triggerId,
								trigerName: _this.editTriggerData.name,
								trigerDesc: _this.editTriggerData.desc,
								occasions: _this.editTriggerData.occasions,
								exeConditionRelate: _this.editTriggerData.Conditionrelate,
								conditions: _this.editTriggerData.conditions,
								actions: _this.editTriggerData.actions
							} = data.obj);

							var tbody = $('#conditionsBody');
							var conditions = data.obj.conditions;
							var actionWrapper = $('.trigger-action-wrapper');
							var actions = data.obj.actions;

							// if(conditions && conditions.length){
							// 	var length = conditions.length;
							// 	for(var i=0;i<length;i++){
							// 		var tr = $(`<tr><td><select class="objectname"><option value="1" selected>用例编号</option>
       //                              <option value="2">测试系统名称</option>
       //                              <option value="3">功能点名称</option>
       //                              </select> </td><td><select class="matchtype"><option value="1">
							// 			等于</option><option value="2">大于</option></select></td><td><input type="text" name="" style="width:100%;height: 100%;border: none;" class="value">
       //                      			</td><td><button class="btn btn-default">删除</button>
       //                      			</td></tr>`);
							// 		tbody.append(tr);
							// 	}
							// }
							var trs = $('#conditionsBody tr');
							for(var i=0; i<trs.length;i++){
								
								$('.objectName',trs[i]).val(conditions[i].objectName);
								$('.matchType',trs[i]).val(conditions[i].matchType);
								$('.value',trs[i]).val(conditions[i].value);
								$('.btn-default', trs[i]).click(_this.removeTriggerCondition);
							}
							
							// if(actions && actions.length){
							// 	var length = actions.length;
							// 	for(var i=0; i<length; i++){
							// 		var div = $(`<div class="action-item-wrapper">
					  //                   <button class="btn-removeaction"><span class="icon-remove"></span></button>
					  //                   <span class="id"></span><div class="item-row"> <label>选择操作</label><select class="actionname">
					  //                           <option value="1">发送邮件</option><option value="2">打开网页</option></select></div><div class="item-row"><label>脚本类型</label>
					  //                       <select class="actiontype"> <option value="2">groovy</option><option value="1">2</option>
					  //                       </select></div> <div class="item-row"><label>脚本内容</label><textarea rows="5" class="scriptcontent"></textarea>
					  //                   </div>
					  //               </div>`);
							// 		actionWrapper.append(div);
							// 	}
							// }
							var divs = $('.action-item-wrapper');
							for(var i=0; i<divs.length;i++){
								$('.id', divs[i]).prop('data-actionid',actions[i].id);
								$('.actionname', divs[i]).val(actions[i].actionname);
								$('.actiontype',divs[i]).val(actions[i].actiontype);
								$('.scriptcontent',divs[i]).val(actions[i].scriptcontent);
								$('.btn-removeaction', divs[i]).click(_this.removeTriggerAction);
							}
						}
					}
				});
				this.triggerShow = true;
			}
		},

		deleteTrigger: function() {
			var _this = this;
			if(this.triggerInfo.selectedTrigger.length > 0){
				var promise = Vac.confirm('#vac-confirm', '.okConfirm', '.cancelConfirm');
				
				promise.then(() => {
					$.ajax({
						url: address + 'trigerController/delete',
						data: 'id='+ _this.triggerInfo.selectedTrigger[0],
						type: 'post',
						dataType: 'json',
						success: function(data, statusText){
							if(data.success === true) {
								Vac.alert(data.msg);
								_this.getTriggers();
							}else {
								Vac.alert('删除失败' + data.msg);
							}
						}
					});
				}, () => {
					
				});
			}else {
				Vac.alert('请选择要删除的触发器！');
			}
		},
		addTriggerCondition: function(){

			var _this = this;
			var tr = $(`<tr><td><select class="objectname"><option value="1">用例编号</option>
                                    <option value="2">测试系统名称</option>
                                    <option value="3">功能点名称</option></select> </td><td><select class="matchtype"><option value="1">
										等于</option></select></td><td><input type="text" name="" style="width:100%;height: 100%;border: none;" class="value">
                            			</td><td><button class="btn btn-default">删除</button>
                            			</td></tr>`);
			$('.btn-default', tr).click(_this.removeTriggerCondition);
			$('#conditionsBody').append(tr);
			tr = null;
		},
		removeTriggerCondition: function(event){
			// event.target.click(null);
			var deleteTr = event.target.parentNode.parentNode;
			
			deleteTr.parentNode.removeChild(deleteTr);
			deleteTr = null;
		},
		addTriggerAction: function(){
			var _this =  this;
			var div = $(`
					<div class="action-item-wrapper"><button class="btn-removeaction"><span style="z-index:-1;" class="icon-remove"></span></button>
					<div class="item-row"><label>选择操作</label><select class="actionname">
					<option value="1">执行脚本</option><option value="2">groovy类型</option></select></div><div class="item-row"><label>脚本类型</label>
					<select class="actiontype"> <option value="2">groovy</option><option value="1">2</option>
					</select></div><div class="item-row"><label>脚本内容</label><textarea rows="5" class="scriptcontent" cols=""></textarea>
					</div></div>
				`);
			$('.btn-removeaction span', div).click(_this.removeTriggerAction);
			$('.trigger-action-wrapper').append(div);
			div = null;
		},
		removeTriggerAction: function(event){
			var deleteDiv = event.target.parentNode.parentNode;
			deleteDiv.parentNode.removeChild(deleteDiv);
		},
		saveTrigger: function(){
			var _this = this;
			switch(this.saveTriggerType){
				case 1: save1();
						break;
				case 2: save2();
						break;
				case 3: save3();
						break;
			}
			// 新增保存
			function save1(){
				var data = {
					sceneid: _this.sceneid,
					name: _this.editTriggerData.name,
					desc: _this.editTriggerData.desc,
					occasions: _this.editTriggerData.occasions,
					Conditionrelate: _this.editTriggerData.Conditionrelate
				};
				var obj = getDataInTable(1);
				data.conditions = obj.conditions;
				data.actions = obj.actions;
				
				$.ajax({
					url: address + 'trigerController/insert',
					data: data,
					type: 'post',
					dataType: 'json',
					success: function(data, statusText){
						if(data.success){
							Vac.alert(data.msg);
							this.triggerShow = false;
							_this.getTriggers();
							_this.triggerShow = false
						} else {
							Vac.alert(data.msg);
						}
					}
				});

			}
			// 简单修改保存
			function save3(){
				
			}

			// 修改保存
			function save2(){
				
				var data = {
					triggerId: _this.triggerInfo.selectedTrigger[0],
					name: _this.editTriggerData.name,
					desc: _this.editTriggerData.desc,
					occasions: '[' + _this.editTriggerData.occasions+']',
					Condition_relate: _this.editTriggerData.Conditionrelate,
					modifyType: 2
				};
				
				var obj = getDataInTable(2);
				data.conditions = obj.conditions;
				data.actions = obj.actions;
				
				$.ajax({
					url: address + 'trigerController/update',
					data: data,
					type: 'post',
					dataType: 'json',
					success: function(data, statusText){
						if(data.success){
							Vac.alert(data.msg);
							this.triggerShow = false;
							_this.getTriggers();
							_this.triggerShow = false
						}else {
							Vac.alert(data.msg);
						}
					}
				});
			}

			// 获取table中的字段
			function getDataInTable(type){
				var conditions = [];
				var actions = [];
				var trs = document.querySelectorAll('#conditionsBody tr');
				for(var i=0,len=trs.length; i<len; i++){
					var obj = {};
					obj.objectName = trs[i].querySelector('.objectname').value;
					obj.matchType = trs[i].querySelector('.matchtype').value;
					obj.value = trs[i].querySelector('.value').value;
					conditions.push(JSON.stringify(obj));
				}
				var divs = document.querySelectorAll('.action-item-wrapper');
				for(var i=0,len=divs.length; i<len; i++){
					var obj = {};
					if(type == 2){
						if((_this.editTriggerData.actions[i].id !== undefined))
						{
							obj.id = divs[i].querySelector('.id').innerHTML;
						}
						obj.trigerid = _this.triggerInfo.selectedTrigger[0];
					}
					obj.actionname = divs[i].querySelector('.actionname').value;
					obj.actiontype = divs[i].querySelector('.actiontype').value;
					obj.scriptcontent = divs[i].querySelector('.scriptcontent').value;
					actions.push(JSON.stringify(obj));
				}
				return {
					conditions: '[' + conditions.toString() + ']',
					actions: '[' + actions + ']'
				};
			}
		},
		saveTriggerState: function() {
			var _this = this;
			var trs = document.querySelectorAll('#triggers tr')
			var dataArray = [];
			for(var i=0;i<trs.length;i++){
				var item = {};
				item.id = trs[i].querySelector('input').value;
				
				item.state = trs[i].querySelector('select').value;
				dataArray.push(JSON.stringify(item))
			}
			$.ajax({
				url: address + 'trigerController/updatestate',
				data: 'states='+ '['+dataArray.toString()+']',
				type: 'post',
				dataType: 'json',
				success: function(data, statusText) {
					if(data.success === true) {
						Vac.alert('保存成功！')
						_this.getTriggers()
					} else {
						Vac.alert('保存失败')
					}
				}
			})
		},
		// 点击触发器的checkbox调用方法控制只能选择一个
		changeSelectedTrigger: function(){
			if(this.triggerInfo.selectedTrigger.length > 1) {
				this.triggerInfo.selectedTrigger.shift()
			}
		},
		saveStrategy: function(){
			
			var _this = this;
			_this.exe_strategy.sceneId = _this.sceneid;
			$.ajax({
				url: address + 'sceneController/set',
				data: _this.exe_strategy,
				dataType: 'json',
				type: 'post',
				success: function(data){
					Vac.alert(data.msg);
					_this.getCases();
				},
				error: function(){
					Vac.alert('设置失败！')
				}
			});
		},
		hideAlert: function(){
			this.alertShow = false;
		},
		removeCases: function(){
			var _this = this;
			if (!this.selectedCases.length) {
				Vac.alert('请选择要移除的用例！');
				return;}
			Vac.confirm('', '', '', '确认要移除所选用例吗？').then(() => {
				var data = {
					sceneid: _this.sceneid,
					caseidList: '[' + _this.selectedCases.toString() + ']'
				};
				$.ajax({
					url: address + 'testexecutioninstanceController/deletetestcaseinscene',
					data: data,
					type: 'post',
					dataType: 'json',
					success: function(data, statusText){
						if(data.success === true){
							Vac.alert("删除成功！");
							_this.selectedCases = [];
							_this.getCases()
						}else {
							Vac.alert('删除失败！');
						}
					},
					error: function(){
						Vac.alert('移除失败，请重新尝试！')
					}
				});
			});
			

		},
		// 执行时间规划
		getExecuteTime: function(){

		},
		saveExecuteTime: function(){
			var data = {
				sceneid: this.sceneid,
				caseIds: '[' + this.selectedCases + ']',
				executeTime: this.executeTime,
				executeDateFlag: this.executeDateFlag,
				combineGroupName: '',
				orderNumber: 1,
				runTotalNumber: 2
			};
			$.ajax({
				url: address + 'testexecutioninstanceController/settextexecutioninstance',
				data: data,
				type: 'post',
				dataType: 'json',
				success: function(data, statusText){
					if(data.success === true){
						Vac.alert('保存成功！' + data.msg);
					} else {
						Vac.alert('保存失败！')
					}
				},
				error: function(){
					Vac.alert('保存失败！')
				}
			});
		},

		openPool: function(type){
			var _this = this;
			if(type == 2){
				if(_this.selectedPool.length == 0){return;}
				_this.editPoolType = 2;
				_this.dataPoolTitle = '设置';
				var data = {
					poolname: '场景数据池',
					poolobjid: '2',
					dataname: _this.selectedPool[0]
				};
				$.ajax({
					url: address + 'dataPoolController/selectByCondition',
					data: data,
					type: 'post',
					dataType: 'json',
					success: function(data, statusText){
						if(data.obj instanceof Array){
							// _this.poolData = data.obj[0];
							({
								poolname: _this.poolData.poolname,
								poolobjid: _this.poolData.poolobjid,
								dataname: _this.poolData.dataname,
								datavalue: _this.poolData.datavalue,
								datadesc: _this.poolData.datadesc
							} = data.obj[0]);
							_this.selectedPoolId = data.obj[0].id;
						}
					},
					error: function(){
						Vac.alert('获取场景数据池失败！')
					}
				});
			}else{
				_this.editPoolType = 1;
				_this.dataPoolTitle = '新增';
				_this.poolData.poolname = '';
				_this.poolData.poolobjid = ''
				_this.poolData.dataname = ''
				_this.poolData.datavalue = ''
				_this.poolData.datadesc = ''
			}
			$('#editDataPool').modal('show');
		},
		getDataPool: function(){
			var _this = this;
			var data = {
				poolname: '场景数据池',
				poolobjid: '2',
				dataname: '',
			};
			$.ajax({
				url: address + 'dataPoolController/selectByCondition',
				type: 'post',
				dataType: 'json',
				data: data,
				success: function(data, statusText){
					if(data.obj instanceof Array){
						_this.poolDatas = data.obj;
					}
				},
				error: function(){
					Vac.alert('获取场景数据池失败！')
				}
			});
		},
		saveDataPool: function(){
			var _this = this;
			var data = {};
			({
				poolname: data.poolname,
				poolobjid: data.poolobjid,
				dataname: data.dataname,
				datavalue:data.datavalue,
				datadesc: data.datadesc
			} = _this.poolData);
			if(_this.editPoolType == 2){
				data.id = _this.selectedPoolId;
			}
			var url = _this.editPoolType === 1 ? 'dataPoolController/insert' : 'dataPoolController/update';
			$.ajax({
				url: address + url,
				data: data,
				type: 'post',
				dataType: 'json',
				success: function(data, statusText){
					if(data.success === true) {
						$('#editDataPool').modal('hide');
					}
					Vac.alert(data.msg)
					_this.getDataPool();
				},
				error: function(){
					Vac.alert('保存失败，请重新尝试！')
				}
			});
		},
		removeDatapool: function(){
			var _this = this;
			if(_this.selectedPool.length > 0){
				var data = {
					poolname: '场景数据池',
					poolobjid: '2',
					dataname: _this.selectedPool[0]
				};
				$.ajax({
					url: address + 'dataPoolController/selectByCondition',
					data: data,
					type: 'post',
					dataType: 'json',
					success: function(data, statusText){
						if(data.obj instanceof Array){
							// _this.poolData = data.obj[0];
							({
								poolname: _this.poolData.poolname,
								poolobjid: _this.poolData.poolobjid,
								dataname: _this.poolData.dataname,
								datavalue: _this.poolData.datavalue,
								datadesc: _this.poolData.datadesc
							} = data.obj[0]);
							_this.selectedPoolId = data.obj[0].id;

							var promise = Vac.confirm('#vac-confirm', '.okConfirm', '.cancelConfirm');
							promise.then(() => {
								$.ajax({
									url: address + 'dataPoolController/delete',
									data: 'id='+ _this.selectedPoolId,
									type: 'post',
									dataType: 'json',
									success: function(data, statusText){
										Vac.alert(data.msg);
										_this.getDataPool();
										_this.selectedPool.shift();
									},
									error: function(){
										Vac.alert('移除数据池数据失败！')
									}
								});
							}, () => {
								
							});
						}
					}
				});

			}else {
				Vac.alert('请选择要删除的数据！');
			}
		},
		debug: function() {
			if(this.exeScope == '' || this.debugRound == '') {
				Vac.alert('请输入调试轮次与执行范围！')
				return
			}
			// 若选择部分执行，则需要选中实例
			if(this.exeScope == 2 && this.selectedCases.length == 0 && this.checkedFlowNodes.length == 0) {
				Vac.alert('请选择要执行的部分实例！')
				return
			}
			this.isDebugInfoShow = true;
			// 删除选中的案例中节点案例,并生成要发送的数据
			let sendData = []
			let flowCases = [...this.flowNodeIds.keys()]
			
			let set = new Set(this.selectedCases)
			for(let caseId of set) {
				if(flowCases.includes(caseId)) {
					set.delete(caseId)
				} else {
					let obj = {
						id: caseId,
						idtype: 1
					}
					sendData.push(obj)
				}
			}
			// 把选中的节点id也放到sendData中
			for(let flowId of this.checkedFlowNodes) {
				let obj = {
					id: flowId,
					idtype: 2
				}
				sendData.push(obj)
			}
			var _this = this
			
			var data = {
				debuground: _this.debugRound,
				sceneId: _this.sceneid,
				exeScope: _this.exeScope, 
				selectState: +_this.exeScope === 1 ? "" : JSON.stringify(sendData)
			}
		
			$.ajax({
				url: address + 'executeController/scenedubug',
				data: data,
				type: 'post',
				dataType: 'json',
				success: function(data, textStatux) {
		
				}
			})
		}
	}
});