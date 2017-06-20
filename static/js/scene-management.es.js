var vBody = new Vue({
	el: '#v-body',
	data: {
		sceneId: 5,
		isSelect: false,
		tooltipFlag: false,
		tooltipType: 4,
		triggerShow: false,

		alertShow: false,
		tooltipMessage: '',

		sceneInfo: null,
		triggers: null,
		triggerInfo: {
			selectedTrigger: [],
			editTriggerType: '编辑'
		},
		// 保存触发器编辑的字段数据
		editTriggerData:{
			sceneid: 2,
			name: "",
			desc:'',
			occasions: [],
			Conditionrelate: null,
			conditions: [1,2],
			actions: []
		},
		// 保存执行策略的数据
		exe_strategy: {
			sceneId: '3',
			exe_strategy1_status: '',
			exe_strategy2_start: '',
			exe_strategy2_order: '',
			exe_strategy2_status: '',
			exe_strategy3_start: '',
			exe_strategy3_order: '',
			exe_strategy3_status: '',
			exe_strategy_err: ''
		}
	},
	created: function(){
		// 用于初始化 滑动鼠标选取元素
		this.setSelectListener();
		// 用于页面加载时获取所有的用例
		this.getCases();
	},
	methods: {
		test: function(){
			console.log(this.triggerInfo.selectedTrigger);
		},
		getCases: function(){
			var _this = this;
			$.ajax({
				url: address + 'sceneController/selectByPrimaryKey',
				data: 'id=5',
				type: 'post',
				dataType: 'json',
				success: function(data, statusText){
					if(data.success == true){
						_this.sceneInfo = data.obj;
					}
				}
			});
		},
		getTriggers: function(){
			var _this = this;
			$.ajax({
				url: address + 'trigerController/trigerqueryinScene',
				data: 'sceneId=2',
				type: 'post',
				dataType: 'json',
				success: function(data){
					if(data.success == true){
						_this.triggers = data.obj;
					}
				}
			});
		},
		setSelect: function(event){
			var target  = event.target;
			var fileNodes = document.querySelectorAll(".case input[type='checkbox']");
			// console.log(fileNodes.length)
			var startX = event.offsetX;
			var startY = event.offsetY;
			// console.log("X:" + startX + "--Y:" + startY);
			var moveBeforeX = event.pageX;
			var moveBeforeY = event.pageY;
			var selDiv = document.createElement('div');
			selDiv.style.cssText = `position:absolute;width:0px;height:0px;
			font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;
			background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);
			opacity:0.6;display:none;`;
			selDiv.id = 'selectDiv';
			document.querySelector('.main-content').appendChild(selDiv);
			selDiv.style.left = startX + "px";
			selDiv.style.top = startY + 'px';
			var _x = null;
			var _y = null;
			var moveAfterX = null;
			var moveAfterY = null;
			event.stopPropagation();
			event.preventDefault();
			var selectedRange = [];
			target.addEventListener('mousemove', mouseMoveFunction, false);
			target.addEventListener('mouseup', (event) => {
				this.isSelect = true;
				if (selDiv){
					document.querySelector('.main-content').removeChild(selDiv);
				}
				target.removeEventListener('mousemove', mouseMoveFunction, false);
				selDiv = null;
				var caseLib = document.querySelectorAll('.case-lib');
				for(var i=0; i<caseLib.length; i++){
					var inputs = Array.from(caseLib[i].getElementsByClassName('check-case'));
					if(inputs.every(function(value){
						if(value.checked===true)
							{return true;} 
						return false;
					})){
						caseLib[i].getElementsByClassName('checkall')[0].checked = true;
					} else {
						caseLib[i].getElementsByClassName('checkall')[0].checked = false;
					}
				}
			}, false);


			function mouseMoveFunction(event){
				// 如果已经选取过，则
				// if (this.isSelect) {
				// 	var inputs = document.querySelectorAll(".case input[checked]");
				// 	for(var i = 0; i < inputs.length; i++){
				// 		inputs[i].removeAttribute("checked");
				// 	}
				// 	this.isSelect = false;
				// }
				if(selDiv.style.display == 'none'){
					selDiv.style.display = "block";
				}
				moveAfterX = event.pageX;
				moveAfterY = event.pageY;
				// 获取鼠标移动后的位置
				_x = startX - moveBeforeX + moveAfterX;
				_y = startY - moveBeforeY + moveAfterY;
				// console.log("_X:" + _x + "-- _Y:" + _y);
				selDiv.style.left = Math.min(_x, startX) + "px";
				selDiv.style.top = Math.min(_y, startY) + "px";
				// console.log("Left:" + selDiv.style.left + "-- Top:" + selDiv.style.top);
				selDiv.style.width = Math.abs(_x - startX) + "px";
				selDiv.style.height  = Math.abs(_y - startY) + "px";

				var _l = selDiv.offsetLeft, _t = selDiv.offsetTop;
				var _w = selDiv.offsetWidth, _h = selDiv.offsetHeight;
				
				for(var i=0; i < fileNodes.length; i++){
					var inputRight = fileNodes[i].offsetLeft + fileNodes[i].offsetWidth;
					var inputBottom = fileNodes[i].offsetTop + fileNodes[i].offsetHeight;
					if( inputRight > _l && inputBottom > _t && fileNodes[i].offsetLeft < _l + _w && fileNodes[i].offsetTop < _t + _h) {
						if(!selectedRange.includes(fileNodes[i])){
							selectedRange.push(fileNodes[i]);
						}
					}
				}
				for(var i=0; i<selectedRange.length; i++){
					var inputRight = selectedRange[i].offsetLeft + selectedRange[i].offsetWidth;
					var inputBottom = selectedRange[i].offsetTop + selectedRange[i].offsetHeight;
					if( inputRight > _l && inputBottom > _t && selectedRange[i].offsetLeft < _l + _w && selectedRange[i].offsetTop < _t + _h) {
						selectedRange[i].checked = true;
					} else {
						selectedRange[i].checked = false;
					}
				}
				event.stopPropagation();
				event.preventDefault();
			};
		},
		setSelectListener: function(){
			document.querySelector('.main-content').addEventListener('mousedown',this.setSelect,false);
			// 防止点击用例框时也进行选取
			var caseLibs = document.querySelectorAll('.case-lib');
			for(var i = 0; i < caseLibs.length; i++){
				caseLibs[i].addEventListener('mousedown', function(event){
					event.stopPropagation();
				}, false);
			}
			// var checkall = document.querySelectorAll('.checkall');
		},
		toggleTooltip: function(event){
			console.log('he')
			this.tooltipFlag = !this.tooltipFlag;
		},
		//打开tooltipWindow，并根据传入的参数显示相应的操作内容
		operationType: function(type){
			this.tooltipType = type;
			this.tooltipFlag = false;
			// 触发器设置
			if(type === 2){
				this.getTriggers();
			}
		},
		// 打开关闭触发器设置的弹出框
		closeTrigger: function(){
			this.triggerShow = false;
		},
		openTrigger: function(type){
			this.triggerShow = true;
			if(type === 1){
				this.triggerInfo.editTriggerType = "新增";
			}else{
				this.triggerInfo.editTriggerType = "编辑";
			}
		},
		// 全选case-lib中的case
		checkallToggle: function(event){
			var flag = event.target.checked;
			var inputs = event.target.parentNode.parentNode.getElementsByClassName('check-case');
			for(var i=0; i<inputs.length; i++){
				inputs[i].checked = flag;
			}
		},
		checkall: function(event){
			var checkboxs = document.querySelectorAll('.case-lib input');
			for(var i=0,m=checkboxs.length; i<m; i++){
				checkboxs[i].checked = event.target.checked;
			}
		},
		addTriggerCondition: function(){
			this.editTriggerData.conditions.push({});
		},
		removeTriggerCondition: function(index){
			this.editTriggerData.conditions.splice(index,1);
		},
		addTriggerAction: function(){
			this.editTriggerData.actions.push({});
		},
		removeTriggerAction: function(index){
			this.editTriggerData.actions.splice(index,1);
		},
		saveStrategy: function(){
			console.log('he');
			var _this = this;
			$.ajax({
				url: address + 'sceneController/set',
				data: _this.exe_strategy,
				dataType: 'json',
				type: 'post',
				success: function(data){
					console.log(data)
					_this.alertShow = true;
					_this.tooltipMessage = data.msg;
				}
			});
		},
		hideAlert: function(){
			this.alertShow = false;
		}
	}
});