__inline('./testexecution/check.js')
var vBody = new Vue({
	el: '#v-body',
	data: {
		// tooltipMessage:'',
		runners:[],
		runner:"",
		caselibIds: [],			
		caselibId: 3,			// caselibId 
		executionround: '1',		// 执行轮次 
		recordflag: 2,			// 记录单
		exeScope: null,			// 执行范围
		selectState: '',		// 选择状态
		userId:sessionStorage.getItem('userId'),

		// save the value obtained from back end and will set to the selects' options
		testPlans: [], 
		testrounds: [],
		// save the values which is selected by users and will be send to the back end
		testPlanId: null,
		// the cases and scenes obtained from back end
		testCaseList: [],
		testSceneList:[],
		// save the value of input in the scene list
		checkallSceneIds: [],
		sceneIds: [],	// save all sceneids		[2,3,4]
		sceneCaseMap: new Map(),	// save the cases and flownodes in scene { sceneId: [caseid, flownodeid...]}
		sceneCaseIds: [],			// only save the caseids in the form of 'sceneid-caseid' in scene ["29-27"]
		flowNodesMap: new Map(), 	// save the nodes in flowCase { caseId: [flownode, flownode...]}


		// get all the scenes when user click addScene
		allscenes: null,

		/***************** save data in scene list ************************/
		// selected Scene which is checked
		selectedScenes: [],
		selectedSceneCases: [],
		// selectedFlowNodes: [],

		/***************** save data in case list ************************/
		checkall: false,
		// save the selected cases in caselist
		selectedCases: [],
		// save the checked flow nodes in caselist
		checkedFlowNodes: [],
		// save the all case ids in caselist
		caseIds: [],
		// save the all flowNode ids in caselist
		flowNodeIds: new Map(),

		// Scenes in add-scene modal
		selectedScene: [],	// 3, 1, 2, [1,2], [3],[{"sceneId":1,"testcaseList":[1,2]}]
		exeImgs: {
			0: '/assets/images/waiting.png',
			1: '/assets/images/success.png',
			2: '/assets/images/error.png',
			3: '/assets/images/warn.png',
			4: '/assets/images/running.gif'
		},
		// 批量执行相关
		hasStartExecute: false,
		batchExecuteNo: null,
		executeResult : 'fail',
		queryResultFun: null,
		queryInterval: 1000,
		reQueryInterval: 2,
		queryNums: 0,

		// save the string : 展开 and 收起
		expandString: '展开',
		unexpandString: '收起',
		
	},
	created: function(){
		var _this = this;
		_this.caselibId = sessionStorage.getItem('caselibId');
		var getPlans = new Promise((resolve, reject) => {
			Vac.ajax({
				url: address3 + 'testPlanController/queryTestPlan',
				data: { 
					caseLibId: _this.caselibId,
					"nameMedium": "",
					"descMedium": "",
				},
				success: function(data){
					if (data.respCode === '0000') {
						if (data.testPlanEntityList && data.testPlanEntityList.length) {
							_this.testPlanId = data.testPlanEntityList[0].id;
							_this.testPlans = data.testPlanEntityList;
							resolve();
						} else {
							reject('请添加测试计划！');
						}
						return;
					}
					reject();
				}
			});
		});
		getPlans.then(() => {
			_this.getCases();
		}).catch(err => { Vac.alert(err); });
		// init the modal 
		$('#add-modal').on('hidden.bs.modal', function (e) {
			var scenes = _this.selectedScene;
			for(var i=0,len=scenes.length; i<len; i++){
				scenes.shift();
			}
		})
		// let result = Vac.isAncestor(document.querySelector('html'), document.querySelector('body'))
		// console.log(result)
	},
	ready: function(){
		// console.log("ready")
		this.setSelectListener();
		this.queryRunners();
		Vue.nextTick(() => {
			this.setDraggable()
		})
		$('.3').addClass('open')
		$('.3 .arrow').addClass('open')
		$('.3-ul').css({display: 'block'})
		$('.3-6').css({color: '#ff6c60'})
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
					Vac.pushNoRepeat(this.selectedCases, +key)
				} else {
					let set = new Set(this.selectedCases)
					set.delete(+key)
					this.selectedCases = [...set]
				}
			}
			this.setBackground()
		},
	},
	methods: {
		queryRunners: function(){
			 var _this=this;
			$.ajax({
				url: address3 + 'executeController/queryRunners ',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({
					"serviceName":"web.ui"
				}),
				success: function(data) {
					if (data.respCode=="0000") {
						_this.runners=data.runners;
						if(data.runners.length==0)
							Vac.alert('查询不到执行机');
						else
							_this.runner=data.runners[0].identifiableName;
					} else {
						Vac.alert(data.respMsg);
						}
				},
				error: function() {
					Vac.alert('网络错误！请点击重新查询！');
				}
			});
		},
		hideAlert: function(){
			this.alertShow = false;
		},
		executeAll: function(){
			var _this = this;
			if(!this.userId ) {
				Vac.alert('请填写用户id');return;
			}
			if(!this.recordflag) {
				Vac.alert('请填写recordflag');return;
			}
			if (!this.exeScope) {
				Vac.alert('请填写执行范围');return;
			}
			if (!this.testPlanId) {
				Vac.alert('请选择测试计划');return;
			}
			if(this.runner=="")
			{
				Vac.alert('请选择执行机');return;
			}
			Vac.ajax({
				url: address2 + 'executeController/t1',
				type: 'post',
				contentType: 'application/json',
				data: JSON.stringify({
					"userId": this.userId,
					"recordflag": this.recordFlag,
					"exeScope": this.exeScope, 
					"selectState": this.selectState,
					"testPlanId": this.testPlanId,
					"identifiableRunnerName":this.runner
				}),
				success: function(data) {
					if (data.respCode === '0000') {
						_this.startQueryResult(data.respMsg);
					} else {
						Vac.alert(respMsg);
						_this.setResultIcon();
					}
				},
				error: function(){
					Vac.alert('网络错误，执行失败！');
					_this.setResultIcon();
				}
			})
		},
		startQueryResult: function(batchExecuteNo) {
			var me = this;
			this.batchExecuteNo = batchExecuteNo;
			this.hasStartExecute = true;
			this.queryResultFun = setTimeout(queryAction, this.queryInterval);

			function queryAction(){
				$.ajax({
					url: address + 'testrecordController/selectByBatchExecuteNo',
					type: 'post',
					data: { batchExecuteNo }, 
					success: function(data) {
						if (data.success) {
							me.setResultIcon(data.obj);
							if (data.finished) {
								// 执行完毕
								me.hasStartExecute = false;
								me.batchExecuteNo = null;
								me.queryResultFun = null;
								Vac.alert('执行完毕！');
							} else {
								// 未执行完毕
								me.queryResultFun = setTimeout(queryAction, me.queryInterval);
							}
						} else {
							Vac.alert('查询出错！请点击重新查询！');
							// me.queryResultFun = setTimeout(queryAction, me.reQueryInterval);
						}
					},
					error: function() {
						Vac.alert('网络错误！请点击重新查询！');
						// Vac.alert('查询执行结果失败，将在'+ me.reQueryInterval + '毫秒后继续查询');
						// me.queryResultFun = setTimeout(queryAction, me.reQueryInterval);
					}
				});
			}
		},
		reQuery: function() {
			this.batchExecuteNo && this.startQueryResult(this.batchExecuteNo);
		},
		setResultIcon: function(data) {
			if(!data) {
				[...document.querySelectorAll('img[id^="img-"]')].forEach((item) => {
					item.src = this.exeImgs['2'];
				});
				return;
			}
			for (let d of data) {
				if (d.sourcechannel === 'PE4') {
					if (d.flownodeid) {
						document.querySelector(`#img-${d.flownodeid}`).src = this.exeImgs[d.resultstatus];
					} else {
						document.querySelector(`#img-${d.caseid}`).src = this.exeImgs[d.resultstatus];
					}
				} else {
					if(d.flownodeid) {
						document.querySelector(`#img-${d.sceneId}-${d.caseid}-${d.flownodeid}`).src = this.exeImgs[d.resultstatus];
					} else {
						document.querySelector(`#img-${d.sceneId}-${d.caseid}`).src = this.exeImgs[d.resultstatus];
					}
					
				}
			}
		},
		addScene: function() {
			var _this = this;
			
			Vac.ajax({
				url: address3 + 'sceneController/selectAllScene',
				data: { caseLibId: this.caselibId },
				success: function(data){
					if(data.respCode == '0000'){
						_this.allscenes = data.scenequeryDtoList;
						$('#add-modal').modal('show');
					}
				}
			});
			$('#add-modal').modal("show");
		},
		removeSceneAndCase: function() {
			var _this = this;
			if (!this.selectedScenes.length) {
				Vac.alert('请选择要删除的场景!');
				return;
			}
			// let sceneList = this.selectedScenes.length === 0 ? '' : JSON.stringify(this.selectedScenes);
			// let testcaseList = this.selectedCases.length === 0 ? '' : JSON.stringify(this.selectedCases);
			// let sceneCaseList = new Array();
			// let o = {};
			// for (let sceneCase of this.selectedSceneCases) {
			// 	let arr = sceneCase.split('-');
			// 	if (arr.length !== 2) {continue;}
			// 	o[arr[0]] ? o[arr[0]].push(+arr[1]) : o[arr[0]] = [+arr[1]];
			// }
			// for (let key of Object.keys(o)) {
			// 	sceneCaseList.push({
			// 		sceneId: +key, 
			// 		testcaseList: o[key].length === 0 ? '' : o[key]
			// 	})
			// }
			// sceneCaseList = sceneCaseList.length === 0 ? '' : JSON.stringify(sceneCaseList);
			// // 
			// if (!sceneCaseList.length && !sceneList.length && !testcaseList.length) {
			// 	Vac.alert('请至少选择一项进行删除');
			// 	return;
			// }
			Vac.confirm('', '', '', '确认要移除场景和用例吗？').then(() => {
				let data = {
					testPlanId: this.testPlanId,
					sceneList: this.selectedScenes,
					testcaseList: this.selectedCases
				}
				Vac.ajax({
					url: address3 + 'caseExecuteInstance/deleteCaseExecuteInstance',
					data: data,
					success: function(data){
						if(data.respCode === '0000'){
							$('#add-modal').modal('hide');
							_this.selectedScenes = [];
							Vac.alert('移除成功')
							_this.getCases();
						}else {
							Vac.alert("移除失败")
						}
					}
				});
			}, () => {
				
			});
		},
		sendSceneData: function(){
			var _this = this;
			var data = {
				testPlanId: +this.testPlanId,
				testcaseList: [],				// 暂时为空   [1,2]
				sceneList: this.selectedScene,     // [3]
				creatorId: +sessionStorage.getItem('userId')
			};
			// send data and display the modal 
			Vac.ajax({
				url: address3 + 'caseExecuteInstance/insertCaseExecuteInstance',
				data: data,
				success: function(data){
					$('#add-modal').modal('hide');
					if(data.respCode === '0000'){
						Vac.alert('添加成功')
						_this.getCases()
						// _this.alertShow = true;
						// _this.tooltipMessage = '添加成功';
					}else {
						Vac.alert(data.respMsg)
					}
				},
				error: function() {
					$('#add-modal').modal('hide');
					Vac.alert("添加失败");
				}
			});
		},
		selectAll: function(event){
			if(event.target.checked){
				this.allscenes.forEach((scene) => {
					if(!this.selectedScene.includes(scene.sceneId))
						{this.selectedScene.push(scene.sceneId);}
				});
			}else{
				this.allscenes.forEach((scene) => {
					this.selectedScene.pop();
				});
			}
		},
		setDraggable: function () {	
				$('#sortable_caselist').sortable({
					handle: '.handle'
				})
				$( "#sortable_caselist" ).disableSelection();

				$('#sortable_sceneslist').sortable({
					handle: '.handle2'
				})
				$( "#sortable_caselist" ).disableSelection();

				$('.sortable_scene_caselist').sortable({
					handle: '.handle1'
				})
				$( '.sortable_scene_caselist' ).disableSelection();


				


				$('#testround-main').disableSelection();
		},
		getCases() {
			var data = {
				caselibId: this.caselibId,
				testPlanId: this.testPlanId,
				roundFlag: 2,
				scopeFlag: 1
			};
			if(!this.testPlanId) {
				Vac.alert("请选择测试计划");
				return;
			}
			var _this = this;
			Vac.ajax({
				url: address3 + 'caseExecuteInstance/queryCaseExecuteInstance',
				data: data,
				success: function(data){
					_this.testCaseList = data.executeInstanceResult.testCaseList;
					_this.testSceneList = data.executeInstanceResult.testSceneList;
					Vue.nextTick(() => {
						_this.setDraggable()
					})
					/*if(!(data.testCaseList && data.testCaseList.length)) {
						// Vac.alert('未查询到相关的用例信息！')
						return;
					}*/
					if(!(_this.testSceneList && _this.testSceneList.length)) {
						// Vac.alert('未查询到相关的场景信息！')
						return;
					}
					_this.caseIds.length = 0
					_this.flowNodeIds.clear();
					if(_this.testCaseList != null){
					_this.testCaseList.forEach((value) => {
						Vac.pushNoRepeat(_this.caseIds, value.caseId)
						if(value.caseCompositeType == 2) {
							let arr = []
							for (let flowNode of value.flowNodes) {
								arr.push(+flowNode.flowNodeId)
							}
							_this.flowNodeIds.set(+value.caseId, arr)
						}
					})
				}

					_this.sceneIds.length = []
					_this.sceneCaseMap.clear()
					_this.flowNodesMap.clear()
					_this.testSceneList.sort(_this.compare("orderNum"));	//更新排序后的场景列表
					if (_this.testSceneList) {
						for (var j = 0; j<_this.testSceneList.length;j++) {
							
							var scene = _this.testSceneList[j]
							// sceneIds save the id of scene  [4,5,6]
							_this.sceneIds.push(scene.sceneId)
							var caselist = []
							for(var i = 0;i<scene.testCaseList.length;i++){
								var c = scene.testCaseList[i]
								// caselist save the caseid in the form of  'sceneId-caseId' ['3-45','3-56']
								caselist.push(scene.sceneId + '-' + c.caseId);

								if(c.caseCompositeType == 2) {
									_this.sceneCaseIds.push(scene.sceneId + '-' + c.caseId)
									let flowNodes = []
									for (let flowNode of c.flowNodes) {
										// caselist also save the flowNodeId in flowCase in the form of 
										//  'sceneId-caseId-flowNodeId' ['3-45-34','3-56-55']
										caselist.push(scene.sceneId+'-'+c.caseId+'-'+flowNode.flowNodeId)
										flowNodes.push(scene.sceneId+'-'+c.caseId+'-'+flowNode.flowNodeId)
									}
									// flowNodesMap save the map of caseId between flowNodes in the following form
									// {
									//  	'sceneId-caseId':  [ sceneId-caseId-flowNodeId,  sceneId-caseId-flowNodeId ]
									// }
									_this.flowNodesMap.set(scene.sceneId+'-'+c.caseId, flowNodes)
								}
							}
							// sceneCaseMap save the map of sceneId between flowNodeId and caseId in the following form
							// {
							//  	'sceneId':  [ sceneId-caseId, sceneId-caseId-flowNodeId ]
							// }
							_this.sceneCaseMap.set(scene.sceneId, caselist)
							
						}
					}
				}
			});
		},
		compare: function(property){		//排序所需要的函数
			return function(obj1,obj2){		//比较两个对象相应的元素，按照升序排序
				var value1 = obj1[property];
				var value2 = obj2[property];
				return value1-value2;
			}
		},
		hideCaseList: function(event){
			var _this = this
			var el = $('.case-list', $(event.currentTarget).parent())[0]
			var curHeight = el.offsetHeight;
			el.style.height = curHeight + 'px';
			if($(event.currentTarget).find('span').html() == _this.unexpandString){  // unexpandString 收起
				$(event.currentTarget).find('i').removeClass('icon-caret-down').addClass('icon-caret-right');
				el.style.height = '0px'
				$(event.currentTarget).find('span').html(_this.expandString)
			} else {
				$(event.currentTarget).find('i').removeClass('icon-caret-right').addClass('icon-caret-down');
				el.style.height = 'auto';
				var curHeight = el.offsetHeight; 	// 展开
				el.style.height = '0px';
				window.requestAnimationFrame(function() {
					el.style.height = curHeight+ 'px'
				})
				$(event.currentTarget).find('span').html(_this.unexpandString)
			}
			event.stopPropagation()
		},
		changeCase: function(id, type){
			let arr ;
			switch(type) {
				case 1: arr = this.selectedCases;
					break;
				case 2: arr = this.checkedFlowNodes;
					break;
				case 3: arr = this.selectedSceneCases;
					break;
			}
			console.log(id)
			let index = arr.findIndex((value) => { return value === id })
			index !== -1 ? arr.splice(index, 1) : arr.push(id)
			// 如果选中的是flowNode
			// console.log('sceneCaseIds' + this.sceneCaseIds)
			// console.log('flowNodesMap'+ this.flowNodesMap)
			// console.log('sceneCaseMap'+ this.sceneCaseMap.keys())
			let idArr = (id+'').split('-');
			if(idArr.length === 3){
				let sceneCaseId = idArr.slice(0, 2).join('-')
				let caseList = this.flowNodesMap.get(sceneCaseId)
				if(caseList.every((value) => {
					return this.selectedSceneCases.includes(value)
				}))
				{
					Vac.pushNoRepeat(this.selectedSceneCases, sceneCaseId)
				} else {
					let set = new Set(this.selectedSceneCases)
					set.delete(sceneCaseId)
					this.selectedSceneCases = [...set]
				}
			}
			if(type === 3) {
				let sceneId = idArr[0];
				let caseIds = this.sceneCaseMap.get(+sceneId);
				if (caseIds.every((value) => {
					return this.selectedSceneCases.includes(value)
				}))
				{
					this.checkallSceneIds.push(+sceneId)
				} else {
					let set = new Set(this.checkallSceneIds)
					set.delete(+sceneId)
					this.checkallSceneIds = [...set]
				}
			}
			this.setBackground(this.selectedSceneCases)
		},
		saveSort:function(sceneId){
			var domNodes = $("input[value^=sort-"+sceneId+"]");
			var arrSortId=[];
			for(var i = 0;i<domNodes.length;i++){
				arrSortId.push(+$(domNodes[i]).attr('name'));
			}
			Vac.ajax({
				url:address3 +"sceneController/sceneTestcaseSortSave",
				data:{"sceneId":sceneId,"caseIdList":arrSortId},
				success:function(data){
					if(data.respCode === '0000'){
						Vac.alert('排序保存成功')
					}else
					Vac.alert('排序保存失败')
				}
			})
		},

		saveScenesSort:function(){					//保存场景排序
			var domNodes = $("input.checkscene");	//使用jQuery找到包含场景信息的元素
			var keyIdList=[];
			for(var i = 0;i<domNodes.length;i++){
				keyIdList.push(+$(domNodes[i]).attr('name'));	//将属性值为name的变量中的值取出来，为id值
			}

			Vac.ajax({
				url:address3 +"sceneController/sceneSortSave",
				data:{"keyIdList":keyIdList},
				success:function(data){
					if(data.respCode === '0000'){
						Vac.alert('场景排序保存成功')
					}else
					Vac.alert('场景排序保存失败')
				}
			})
		},

		viewCase: function (sceneId, caseid, sourcechannel, testPhase, testRound, recorderStatus) {
			var o = {
				sceneId, caseid,
				testPhase: testPhase || this.testphaseValue,
				testRound: testRound || this.testroundValue,
				// executeround: this.executionround,
				sourcechannel: sourcechannel,
				recorderStatus: recorderStatus || '2'
			}
			var args = encodeURIComponent(JSON.stringify(o));
			window.open('case-operation.html?activeName=exec-record&viewcaseargs='+args, 'case_record');
		},
		setBackground: checkFunction.setBackground,
		checkChanged: checkFunction.checkChanged,
		checkallToggle: checkFunction.checkallToggle,
		checkallBox: checkFunction.checkallBox,

		checkAllInScene: checkFunction.checkAllInScene,
		checkAllFlowNodes: checkFunction.checkAllFlowNodes,
		checkFlowNode: checkFunction.checkFlowNode,
		setSelect: checkFunction.setSelect,
		setSelectListener: checkFunction.setSelectListener
	}
});