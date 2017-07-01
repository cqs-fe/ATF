var vBody = new Vue({
	el: '#v-body',
	data: {
		alertShow: false,
		tooltipMessage:'',
		caselibId: 2,
		// save the value obtained from back end and will set to the selects' options
		testphases: [], 
		testrounds: [],
		// save the values which is selected by users and will be send to the back end
		testphaseValue: null,
		testroundValue: null,

		executeRound: '',
		executeRange: null,
		// the cases and scenes obtained from back end
		testCaseList: [],
		testSceneList:[],
		// get all the scenes when user click addScene
		allscenes: null,
		// selected Scenes which will be send to back end
		selectedScene: [],

	},
	created: function(){
		var _this = this;
		// get testphases
		$.ajax({
			url: address + 'testphaseController/selectAll',
			data: '',
			type: 'GET',
			dataType: 'json',
			success: function(data, statusTest){
				if(data.success == true){
					_this.testphases = data.obj;
				}
			}
		});
		// get testrounds
		$.ajax({
			url: address + 'testroundController/selectAll',
			data: '',
			type: 'get',
			dataType: 'json',
			success: function(data, statusText){
				if(data.success == true){
					_this.testrounds = data.obj;
				}
				console.log(_this.testrounds)
			}
		});
		// get all case and scenes
		// this.getCases();

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
			console.log(this.executeRange)
		},
		addScene: function(){
			var _this = this;
			
			$.ajax({
				url: address + 'sceneController/selectBycaseLibId',
				data: 'caseLibId=2',
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
				testcaseList: '',
				sceneList: '[' + this.selectedScene.toString() + ']',
				scenecaseList: ''
			};
			// send data and display the modal 
			$.ajax({
				url: address + 'testexecutioninstanceController/insert',
				data: data,
				type: 'post',
				dataType: 'json',
				success: function(data, statusText){
					if(data.success){
						$('#add-modal').modal('hide');
						_this.alertShow = true;
						_this.tooltipMessage = '添加成功';
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
				testRound: '2',
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