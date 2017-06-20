var vBody = new Vue({
	el: '#v-body',
	data: {
		alertShow: false,
		testphases: [],
		testphaseValue: null,
		testrounds: [],
		testroundValue: null,
		executeRound: '',
		executeRange: null,
		testcases: [],
		testscenes:[],
		allscenes: null,
		selectedScene: []
	},
	created: function(){
		var _this = this;
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
		var data = {
			caselibId: 2,
			testPhase: 'w',
			testRound: '',
			roundFlag: '',
			scopeFlag: 1
		};
		$.ajax({
			url: address + 'testexecutioninstanceController/textexecutioninstancequery',
			data: data,
			type: 'post',
			dataType: 'json',
			success: function(data, statusText){
				_this.testcases = data.testCaseList;
				_this.testscenes = data.testSceneList;
			}
		});
	},
	methods: {
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
			console.log(this.selectedScene)
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
		}
	}
});