__inline('./testexecution/check.js')
var vBody = new Vue({
	el: '#v-body',
	data: {
		// tooltipMessage:'',
		caselibIds: [],			
		caselibId: 3,			// caselibId 
		executionround: '',		// 执行轮次 
		recordflag: 2,			// 记录单
		exeScope: null,			// 执行范围
		selectState: '',		// 选择状态

		// save the value obtained from back end and will set to the selects' options
		testphases: [], 
		testrounds: [],
		// save the values which is selected by users and will be send to the back end
		testphaseValue: null,
		testroundValue: null,

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
			2: '/assets/images/failed.png',
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
		// get testphases
		let getPhasePro = new Promise((resolve, reject) => {
			$.ajax({
				url: address + 'testphaseController/selectAll',
				data: '',
				type: 'GET',
				dataType: 'json',
				success: function(data, statusTest){
					if(data.success == true){
						_this.testphases = data.obj;
						if(_this.testphases[0]) {
							_this.testphaseValue = _this.testphases[0].phasename
							resolve()
						}
					} else {
						Vac.alert('查询用例失败！');
					}
				},
				error: function() {
					Vac.alert('查询用例出错！');
				}
			});
		})
		let getRoundPro = new Promise((resolve, reject) => {
			$.ajax({
				url: address + 'testroundController/selectAll',
				data: '',
				type: 'get',
				dataType: 'json',
				success: function(data, statusText){
					if(data.success == true){
						_this.testrounds = data.obj;
						if(_this.testrounds[0]) {
							_this.testroundValue = _this.testrounds[0].id
							resolve()
						} else {
							Vac.alert('查询用例失败！');
						}
					}
				},
				error: function() {
					Vac.alert('查询用例出错！');
				}
			});
		})
		let getCaseId = new Promise((resolve, reject) => {
			_this.caselibId = sessionStorage.getItem('caselibid');
			resolve();
		})
		
		Promise.all([getPhasePro, getRoundPro, getCaseId])
			.then(() => {
				_this.getCases()
			})
			.catch(() => { console.log("测试计划及测试轮次数据不全") })
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
		this.setDraggable();

		$('.3').addClass('open')
		$('.3 .arrow').addClass('open')
		$('.3-ul').css({display: 'block'})
		$('.3-6').css({color: '#ff6c60'})
	},
	// updated: function(){
	// 	console.log("updated")
	// 	this.setSelectListener()
	// },
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
		hideAlert: function(){
			this.alertShow = false;
		},
		executeAll: function(){
			// 20180117154254295845
			// 20180117153441839537
			var _this = this;
			var data = {
				executionround: this.executionround,
				recordflag: this.recordflag,
				exeScope: this.exeScope,
				selectState: this.selectState,
				caselibId: this.caselibId,
				testPhase: this.testphaseValue,
				testRound: this.testroundValue
			}
			$.ajax({
				url: address + 'executeController/t1',
				data: data,
				type: 'post',
				dataType: 'json',
				success: function(data, statusText) {
					if (data.success === true) {
						_this.startQueryResult(data.msg);
					}else {
						Vac.alert('执行失败！')
					}
				},
				error: function(){
					Vac.alert('执行失败！')
				}
			})
			// 2,2,3,q,2,1,''
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
			
			$.ajax({
				url: address + 'sceneController/selectBycaseLibId',
				data: 'caseLibId='+this.caselibId,
				dataType: 'json',
				type: 'post',
				success: function(data, statusText){
					if(data.success == true){
						_this.allscenes = data.obj;
						$('#add-modal').modal('show');
					}
				}
			});
			$('#add-modal').modal("show");
		},
		removeSceneAndCase: function() {
			var _this = this;
			Vac.confirm('', '', '', '确认要移除场景和用例吗？').then(() => {
				let sceneList = this.selectedScenes.length === 0 ? '' : JSON.stringify(this.selectedScenes);
				let testcaseList = this.selectedCases.length === 0 ? '' : JSON.stringify(this.selectedCases);
				let sceneCaseList = new Array();
				let o = {};
				for (let sceneCase of this.selectedSceneCases) {
					let arr = sceneCase.split('-');
					if (arr.length !== 2) {continue;}
					o[arr[0]] ? o[arr[0]].push(+arr[1]) : o[arr[0]] = [+arr[1]];
				}
				for (let key of Object.keys(o)) {
					sceneCaseList.push({
						sceneId: +key, 
						testcaseList: o[key].length === 0 ? '' : o[key]
					})
				}
				sceneCaseList = JSON.stringify(sceneCaseList);
				let data = {
					removeFlag: 1,
					caselibId: this.caselibId,
					testPhase: this.testphaseValue,
					testRound: this.testroundValue,
					sceneList,
					testcaseList,
					sceneCaseList
				}
				$.ajax({
					url: address + 'testexecutioninstanceController/delete',
					data: data,
					type: 'post',
					dataType: 'json',
					success: function(data, statusText){
						if(data.success){
							$('#add-modal').modal('hide');
							Vac.alert('移除成功')
							_this.getCases()
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
				caselibId: this.caselibId,
				testPhase: this.testphaseValue,
				testRound: this.testroundValue,
				testcaseList: '',				// 暂时为空   [1,2]
				sceneList: '[' + this.selectedScene.toString() + ']',     // [3]
				scenecaseList: ''			//  暂时为空 [{"sceneId":1,"testcaseList":[1,2]}]
			};
			// send data and display the modal 
			$.ajax({
				url: address + 'testexecutioninstanceController/insert',
				// url: 'api/testexecution.json',
				data: data,
				type: 'post',
				dataType: 'json',
				success: function(data, statusText){
					if(data.success){
						$('#add-modal').modal('hide');
						Vac.alert('添加成功')
						_this.getCases()
						// _this.alertShow = true;
						// _this.tooltipMessage = '添加成功';
					}else {
						Vac.alert("添加失败")
					}
				},
				error: function() {
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
	
			$('.sortable_scene_caselist').sortable({
				handle: '.handle1'
			})
			$( '.sortable_scene_caselist' ).disableSelection();
			$('#testround-main').disableSelection();
		},
		getCases: function(){
			var data = {
				caselibId: this.caselibId,
				testPhase: this.testphaseValue,
				testRound: this.testroundValue,
				roundFlag: 2,
				scopeFlag: 1
			};
			var _this = this;
			$.ajax({
				url: address + 'testexecutioninstanceController/textexecutioninstancequery',
				type: 'post',
				data: data,
				dataType: 'json',
				success: function(data, statusText){
					_this.testCaseList = data.testCaseList;
					_this.testSceneList = data.testSceneList;

					if(!(data.testCaseList && data.testCaseList.length)) {
						// Vac.alert('未查询到相关的用例信息！')
					}
					if(!(data.testSceneList && data.testSceneList.length)) {
						// Vac.alert('未查询到相关的场景信息！')
					}
					_this.caseIds.length = 0
					_this.flowNodeIds.clear()
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

					_this.sceneIds.length = []
					_this.sceneCaseMap.clear()
					_this.flowNodesMap.clear()
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
					Vue.nextTick(() => {
						_this.setDraggable()
					})
				}
			});
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
		viewCase: function (sceneId, caseid, sourcechannel) {
			var o = {
				sceneId, caseid,
				testPhase: this.testphaseValue,
				testRound: this.testroundValue,
				executeround: this.executionround,
				sourcechannel: sourcechannel
				// recorderStatus: '2'
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