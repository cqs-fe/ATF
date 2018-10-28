
	__inline('./scene-management/checked.js')
var vBody = new Vue({
	el: '#v-body',
	data: {
		isSelect: false,
		tooltipFlag: true,
		tooltipType: 1,
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
		exeStrategy1Status: '1',
		exeStrategy2Start: '1',
		exeStrategy2Order: '1',
		exeStrategy2Status: '1',
		exeStrategy3Start: '1',
		exeStrategy3Order: '1',
		exeStrategy3Status: '1',
		exeStrategyErr: '1',
		checkall: false,
		// save the selected cases
		selectedCases: [],
		// save the checked flow nodes
		checkedFlowNodes: [],
		executeDateFlag: null,

		// 数据池数据
		dataPoolTitle: '',
		editPoolType: 1,
		selectedPool:[],
		selectedPoolId: null,
		poolData: {
			poolName: null,
			dataDesc: null,
			poolObjId: null,
			dataName: null,
			dataValue: null
		},
		poolDatas: [],

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
			_this.poolData.poolName = '';
			_this.poolData.poolObjId = '';
			_this.poolData.dataName = '';
			_this.poolData.dataValue = '';
			_this.poolData.dataDesc = '';
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
			Vac.ajax({
				url: address3 + 'sceneController/selectScene',
				data: { id: +_this.sceneid },
				success: function(data){
					if(data.respCode == '0000'){
						let caseGroup = {}, caseMaxLength = {};
						var caseDtosTmep = data.selectSceneDto.caseDtos
						caseDtosTmep.sort(function(a,b){return a.orderNum>b.orderNum})
						for(var i = 0; i < data.selectSceneDto.caseDtos.length; i++) {
							if(caseGroup[data.selectSceneDto.caseDtos[i].group]) {
								// 已经有 group
							} else {
								caseGroup[data.selectSceneDto.caseDtos[i].group] = [];
							}
							let group = caseGroup[data.selectSceneDto.caseDtos[i].group];
							let o = {};
							Object.defineProperty(o, "id", {value: data.selectSceneDto.caseDtos[i].id });
							Object.defineProperty(o, "caseCompositeType", {value: data.selectSceneDto.caseDtos[i].caseCompositeType });
							if (data.selectSceneDto.caseDtos[i].caseCompositeType+'' === '1') {
								let time = data.selectSceneDto.caseDtos[i].time || 'T+0';
								o[time] = [data.selectSceneDto.caseDtos[i]];
								group.push(o);
							} else {
								for (var j = 0; j < data.selectSceneDto.caseDtos[i].flowNodeDtos.length; j++) {
									let time = data.selectSceneDto.caseDtos[i].flowNodeDtos[j].time;
									if (o[time]) {
										o[time].push(data.selectSceneDto.caseDtos[i].flowNodeDtos[j]);
									} else {
										o[time] = [data.selectSceneDto.caseDtos[i].flowNodeDtos[j]];
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
						data.selectSceneDto.sceneEntity.caseGroup = caseGroup;
						_this.sceneInfo = data.selectSceneDto.sceneEntity;
						_this.exeStrategy1Status= data.selectSceneDto.sceneEntity.exe_strategy1_status || 1;
						_this.exeStrategy2Start=data.selectSceneDto.sceneEntity.exe_strategy2_start || '1';
						_this.exeStrategy2Order= data.selectSceneDto.sceneEntity.exe_strategy2_order || '1';
						_this.exeStrategy2Status= data.selectSceneDto.sceneEntity.exe_strategy2_status || '1';
						_this.exeStrategy3Start= data.selectSceneDto.sceneEntity.exe_strategy3_start || '1';
						_this.exeStrategy3Order= data.selectSceneDto.sceneEntity.exe_strategy3_order || '1';
						_this.exeStrategy3Status= data.selectSceneDto.sceneEntity.exe_strategy3_status || '1';
						_this.exeStrategyErr= data.selectSceneDto.sceneEntity.exe_strategy_err || '1';
						if(!(data.selectSceneDto.caseDtos && data.selectSceneDto.caseDtos.length)) {
							Vac.alert('未查询到相关的用例信息')
						}
						for (var i = data.selectSceneDto.caseDtos.length - 1; i >= 0; i--) {
							_this.caseIds.includes(data.selectSceneDto.caseDtos[i].id) ? 1 : (_this.caseIds.push(data.selectSceneDto.caseDtos[i].id))
							if(data.selectSceneDto.caseDtos[i].caseCompositeType == 2) {
								let arr = []
								for (var j = data.selectSceneDto.caseDtos[i].flowNodeDtos.length - 1; j >= 0; j--) {
									arr.push(data.selectSceneDto.caseDtos[i].flowNodeDtos[j].id)
								}
								_this.flowNodeIds.set(+data.selectSceneDto.caseDtos[i].id, arr)
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
			Vac.ajax({
				url: address3 + 'trigerController/queryTrigerForScene',
				data: { sceneId: _this.sceneid },
				success: function(data){
					if(data.respCode == '0000'){
						_this.triggers = data.trigerDtoList;
					} else {
						Vac.alert(data.respMsg);
					}
				},
				error: function () {
					Vac.alert('网络错误，请稍候再试~');
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
		// 时间规划
			this.tooltipType = type;
			this.tooltipFlag = false;
			// 触发器设置
			if(type === 2){
				this.getTriggers();
			}else if(type === 4){
				this.getDataPool();
			} else if (type === 3) {
				this.getExecuteStrategy();
			} else if (type == 1) {
				setTimeout(() => {
					$('#datetimepicker').datetimepicker();
				}, 500);
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
				Vac.ajax({
					url: address3 + 'trigerController/queryTriger',
					data: { id: _this.triggerInfo.selectedTrigger[0] },
					success: function(data, statusText){
						if(data.respCode == '0000'){
							// ({
							// 	id: _this.editTriggerData.triggerId,
							// 	trigerName: _this.editTriggerData.name,
							// 	trigerDesc: _this.editTriggerData.desc,
							// 	occasions: _this.editTriggerData.occasions,
							// 	exeConditionRelate: _this.editTriggerData.Conditionrelate,
							// 	conditions: _this.editTriggerData.conditions,
							// 	actions: _this.editTriggerData.actions
							// } = data.obj);
							_this.editTriggerData.triggerId = data.trigerEntity.id;
							_this.editTriggerData.name = data.trigerEntity.trigerName;
							_this.editTriggerData.desc = data.trigerEntity.trigerDesc;
							_this.editTriggerData.occasions = data.occasions;
							_this.editTriggerData.Conditionrelate = data.trigerEntity.exeConditionRelate;
							_this.editTriggerData.conditions = data.conditions;
							_this.editTriggerData.actions = data.actions;

							var tbody = $('#conditionsBody');
							var conditions = data.conditions;
							var actionWrapper = $('.trigger-action-wrapper');
							var actions = data.actions;

							var trs = $('#conditionsBody tr');
							for(var i=0; i<trs.length;i++){console.log(trs.length)
								$('.objectName',trs[i]).val(conditions[i].objectName);
								$('.matchType',trs[i]).val(conditions[i].matchType);
								$('.value',trs[i]).val(conditions[i].value);
								$('.btn-default', trs[i]).click(_this.removeTriggerCondition);
							}
							
							var divs = $('.action-item-wrapper');
							for(var i=0; i<divs.length;i++){
								$('.id', divs[i]).prop('data-actionid',actions[i].id);
								$('.actionname', divs[i]).val(actions[i].actionName);
								$('.actiontype',divs[i]).val(actions[i].actionType);
								$('.scriptcontent',divs[i]).val(actions[i].scriptContent);
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
					Vac.ajax({
						url: address3 + 'trigerController/deleteTriger',
						data: { id:  _this.triggerInfo.selectedTrigger[0] },
						success: function(data, statusText){
							if(data.respCode === '0000') {
								Vac.alert(data.respMsg);
								_this.getTriggers();
							}else {
								Vac.alert('删除失败' + data.respMsg);
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
					sceneId: _this.sceneid,
					name: _this.editTriggerData.name,
					desc: _this.editTriggerData.desc,
					occasions: '[' + _this.editTriggerData.occasions.map(v => `"${v}"`) + ']',
					conditionRelate: _this.editTriggerData.Conditionrelate
				};
				var obj = getDataInTable(1);
				data.conditions = obj.conditions;
				data.actions = obj.actions;
				
				Vac.ajax({
					url: address3 + 'trigerController/insertTriger',
					data: data,
					success: function(data, statusText){
						if(data.respCode === '0000'){
							Vac.alert(data.respMsg);
							_this.getTriggers();
							_this.triggerShow = false
						} else {
							Vac.alert(data.respMsg);
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
					id: +_this.triggerInfo.selectedTrigger[0],
					name: _this.editTriggerData.name,
					desc: _this.editTriggerData.desc,
					occasions:  JSON.stringify(_this.editTriggerData.occasions),
					conditionRelate: _this.editTriggerData.Conditionrelate,
					modifyType: 2
				};
				
				var obj = getDataInTable(2);
				data.conditions = obj.conditions;
				data.actions = obj.actions;
				
				Vac.ajax({
					url: address3 + 'trigerController/updataTriger',
					data: data,
					success: function(data, statusText){
						if(data.respCode === '0000'){
							Vac.alert(data.respMsg);
							this.triggerShow = false;
							_this.getTriggers();
							_this.triggerShow = false
						}else {
							Vac.alert(data.respMsg);
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
					obj.ObjectName = trs[i].querySelector('.objectname').value;
					obj.matchType = trs[i].querySelector('.matchtype').value;
					obj.value = trs[i].querySelector('.value').value;
					conditions.push(JSON.stringify(obj));
				}
				var divs = document.querySelectorAll('.action-item-wrapper');
				for(var i=0,len=divs.length; i < len; i++){
					var obj = {};
					obj.trigerId = _this.triggerInfo.selectedTrigger[0];
					obj.actionName = divs[i].querySelector('.actionname').value;
					obj.actionType = divs[i].querySelector('.actiontype').value;
					obj.scriptContent = divs[i].querySelector('.scriptcontent').value;
					actions.push(JSON.stringify(obj));
				}
				return {
					conditions: '[' + conditions + ']',
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
				// dataArray.push(JSON.stringify(item))
				dataArray.push(item);
			}
			Vac.ajax({
				url: address3 + 'trigerController/updateTrigerState',
				data: { stateDtos:  dataArray },
				success: function(data, statusText) {
					if(data.respCode === '0000') {
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
			const o = {
				id: _this.sceneid,
				exeStrategy1Status: _this.exeStrategy1Status,
				exeStrategy2Start: _this.exeStrategy2Start,
				exeStrategy2Order: _this.exeStrategy2Order,
				exeStrategy2Status: _this.exeStrategy2Status,
				exeStrategy3Start: _this.exeStrategy3Start,
				exeStrategy3Order: _this.exeStrategy3Order,
				exeStrategy3Status: _this.exeStrategy3Status,
				exeStrategyErr: _this.exeStrategyErr
			};
			Vac.ajax({
				url: address3 + 'sceneController/sceneStrategySetting',
				data: o,
				success: function(data){
					if (data.respCode === '0000') {
						Vac.alert(data.respMsg);
						_this.getCases();
					} else {
						Vac.alert(data.respMsg);						
					}
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
					id: _this.sceneid,
					caseIds: _this.selectedCases
				};
				Vac.ajax({
					url: address3 + 'sceneController/deleteTestcaseFromScene',
					data: data,
					success: function(data){
						if(data.respCode === '0000'){
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
			if (!this.selectedCases.length) {
				Vac.alert('');
				return;
			}
			var data = {
				sceneId: +this.sceneid,
				caseIds: this.selectedCases,
				executeTime: $('#datetimepicker').val(),
				executeDateFlag: this.executeDateFlag,
				combineGroupName: '',
				orderNum: 1,
				runTotalNumber: 2,
				modifierId: +sessionStorage.getItem('userId')
			};
			Vac.ajax({
				url: address3 + 'sceneController/sceneTestcaseSetting',
				data: data,
				success: function(data){
					if(data.respCode === '0000'){
						Vac.alert(data.respMsg);
					} else {
						Vac.alert(data.respMsg)
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
				let data = _this.poolDatas.find(item => +item.id === +_this.selectedPool[0]);console.log(_this.poolData);
				({
					poolName: _this.poolData.poolName,
					poolObjId: _this.poolData.poolObjId,
					dataName: _this.poolData.dataName,
					dataValue: _this.poolData.dataValue,
					dataDesc: _this.poolData.dataDesc,
				} = data);
			}else{
				_this.editPoolType = 1;
				_this.dataPoolTitle = '新增';
				_this.poolData.poolName = '';
				_this.poolData.poolObjId = ''
				_this.poolData.dataName = ''
				_this.poolData.dataValue = ''
				_this.poolData.dataDesc = ''
			}
			$('#editDataPool').modal('show');
		},
		// /dataPoolController/querySingleDataPool
		getDataPool: function(){
			var _this = this;
			var data = {
				pageSize: 10000,
        		currentPage: 1,
        		orderType: 'asc',
				orderColumns: 'id',
				poolName: '场景数据池',
				poolObjId: 2,
				dataName: '',
				dataValue: '',
				dataDesc: ''
			};
			Vac.ajax({
				url: address3 + 'dataPoolController/pagedBatchQueryDataPool',
				data: data,
				success: function(data){
					if(data.respCode === '0000'){
						_this.poolDatas = data.list;
					} else {
						Vac.alert(data.respMsg)
						_this.poolDatas = [];
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
				poolName: data.poolName,
				poolObjId: data.poolObjId,
				dataName: data.dataName,
				dataValue: data.dataValue,
				dataDesc: data.dataDesc
			} = _this.poolData);
			if(_this.editPoolType == 2){
				data.id = _this.selectedPool[0];
			}
			var url = _this.editPoolType === 1 ? 'dataPoolController/addSingleDataPool' : 'dataPoolController/modifySingleDataPool';
			Vac.ajax({
				url: address3 + url,
				data: data,
				success: function(data){
					if(data.respCode === '0000') {
						$('#editDataPool').modal('hide');
					}
					Vac.alert(data.respMsg)
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
				let data = _this.poolDatas.find(item => +item.id === +_this.selectedPool[0]);console.log(_this.poolData);
				({
					poolName: _this.poolData.poolName,
					poolObjId: _this.poolData.poolObjId,
					dataName: _this.poolData.dataName,
					dataValue: _this.poolData.dataValue,
					dataDesc: _this.poolData.dataDesc,
				} = data);
				Vac.ajax({
					url: address3 + 'dataPoolController/deleteSingleDataPool',
					data: {id:  _this.selectedPool[0]},
					success: function(data){
						if (data.respCode === '0000') {
							_this.getDataPool();
							_this.selectedPool.shift();
						}
						Vac.alert(data.respMsg);										
					},
					error: function(){
						Vac.alert('移除数据池数据失败！')
					}
				});
				return;
				Vac.ajax({
					url: address3 + 'dataPoolController/querySingleDataPool',
					data: data,
					success: function(data){
						if(data.list instanceof Array){
							// _this.poolData = data.obj[0];
							({
								poolName: _this.poolData.poolName,
								poolObjId: _this.poolData.poolObjId,
								dataName: _this.poolData.dataName,
								dataValue: _this.poolData.dataValue,
								dataDesc: _this.poolData.dataDesc
							} = data.obj[0]);
							_this.selectedPoolId = data.list[0].id;

							var promise = Vac.confirm('#vac-confirm', '.okConfirm', '.cancelConfirm');
							promise.then(() => {
								
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
				url: address3 + 'executeController/scenedubug',
				data: data,
				type: 'post',
				dataType: 'json',
				success: function(data, textStatux) {
		
				}
			})
		},
		saveSort: function(){
			var _this = this;
			var domNodes = $("input[name=sort]");
			var arrCaseIds = [];
			for(var i = 0;i<domNodes.length;i++){
				var caseId = $(domNodes[i]).attr("value");
				arrCaseIds.push(+caseId);
			} 	
			Vac.ajax({
				url:address3+"sceneController/sceneTestcaseSortSave",
				data:{
					sceneId: _this.sceneid,
					caseIdList:arrCaseIds
				},
				success:function(data){
					if (data.respCode === '0000'){
						Vac.alert("排序保存成功");
					}
				},
				error:function(){
					Vac.alert("排序保存失败");
				}
			})
		}
	}
});