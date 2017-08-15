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
		// get all the scenes when user click addScene
		allscenes: null,
		// selected Scene which is checked
		selectedScenes: [],
		selectedCases: [],
		selectedSceneCases: [],
		// Scenes in add-scene modal
		selectedScene: [],					// 3, 1, 2, [1,2], [3],[{"sceneId":1,"testcaseList":[1,2]}]
		exeImgs: {
			waiting: '../static/images/waiting.png',
			running: '../static/images/running.png',
			success: '../static/images/success.png',
			failed: '../static/images/failed.png'
		}
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
					console.log(_this.testrounds)
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
					}
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
				}
			});
		}
	}
});