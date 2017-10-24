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
			0: __uri('../static/images/waiting.png'),
			1: __uri('../static/images/running.gif'),
			2: __uri('../static/images/success.png'),
			3: __uri('../static/images/failed.png')
		},

		// save the string : 展开 and 收起
		expandString: '展开',
		unexpandString: '收起'
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
					}
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
						}
					}
				}
			});
		})
		let getCaseId = new Promise((resolve, reject) => {
			// get caselib id
			$.ajax({
				url: address+'testProjectController/selectAll',
				type: 'GET',
				data: null,
				success: function(data) {
					_this.caselibIds = data.obj;
					if(_this.caselibIds[0]) {
						_this.caselibId = _this.caselibIds[0].caselibId
						resolve()
					}
				}
			});
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
				} else 
				// if(this.flowNodeIds.get(key).every((value) => {
				// 	return !this.checkedFlowNodes.includes(+value)
				// }))
				{
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
			var data = {
				executionround: this.executionround,
				recordflag: this.recordflag,
				exeScope: this.exeScope,
				selectState: this.selectState,
				caselibId: this.caselibId,
				testPhase: this.testphaseValue,
				testRound: this.testroundValue
			}
			console.log(data)
			$.ajax({
				url: address + 'executeController/t1',
				data: data,
				type: 'post',
				dataType: 'json',
				success: function(data, statusText) {
					if (data.success === true) {
						Vac.alert('执行成功！')
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
		addScene: function(){
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
			console.log(data)
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
						// _this.alertShow = true;
						// _this.tooltipMessage = '添加成功';
					}else {
						Vac.alert("添加失败")
					}
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
				// url: '/api/getcaseandscene',
				type: 'post',
				data: data,
				dataType: 'json',
				success: function(data, statusText){
					_this.testCaseList = data.testCaseList;
					_this.testSceneList = data.testSceneList;

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
					Vue.nextTick(() => {
						_this.setDraggable()
					})
				}
			});
		},
		hideCaseList: function(event){
			var _this = this
			var el = $('.case-list', $(event.target).parent())[0]
			var curHeight = el.offsetHeight;
			el.style.height = curHeight + 'px';
			// var autoHeight = el.offsetHeight
			// console.log(autoHeight)
			if(event.target.innerHTML == _this.unexpandString){  // unexpandString 收起
				// window.requestAnimationFrame(function() {
					el.style.height = '0px'
				// })
				event.target.innerHTML = _this.expandString
			} else {		
				el.style.height = 'auto';
				var curHeight = el.offsetHeight; 	// 展开
				el.style.height = '0px';
				window.requestAnimationFrame(function() {
					el.style.height = curHeight+ 'px'
				})
				event.target.innerHTML = _this.unexpandString
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