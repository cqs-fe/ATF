var checkFunction = {
	setBackground () {
		let caseCbs = $('input.check-case')
		this.$nextTick(function () {
        	$.each(caseCbs, function(index, ele) {
				if(ele.checked) {
					$(ele).parents('.case').css({"border-color": "rgb(69, 185, 177)"})
					$(ele).parents('.case').css({"background-color": "rgb(69, 185, 177)"})
					$('p', $(ele).parents('.case')).css({"color": "#fff"})
				}else {
					$(ele).parents('.case').css({"border-color": "#ddd5d5"})
					$(ele).parents('.case').css({"background-color": "#fff"})
					$('p', $(ele).parents('.case')).css({"color": "#797979"})
				}
			})
      	})
	},
	// 点击checkbox
	checkChanged (event) {
		var parent = event.target.parentNode.parentNode.parentNode
		var checkallId = +parent.parentNode.querySelector('.checkall').value
		var inputs = Array.from(parent.querySelectorAll('.check-case'))
		if(inputs.every((value) => {
			return value.checked === true 
		})) {
			this.selectedCases.push(checkallId)
		} else {
			let set = new Set(this.selectedCases)
			set.delete(checkallId)
			this.selectedCases = [...set]
		}
		this.setBackground()
	},
	checkallToggle (event){
		var flag = event.target.checked;
		var inputs = event.target.parentNode.parentNode.parentNode.getElementsByClassName('check-case');
		let inputValue = []
		if(flag) {
			for(var input of inputs) {
				(!this.checkedFlowNodes.includes(+input.value))
				? (this.checkedFlowNodes.push(+input.value))
				: 1 
			}
			 // = [...this.checkedFlowNodes, ...inputValue]
		} else {
			for (var input of inputs) {
				let set = new Set(this.checkedFlowNodes)
				let value = +input.value
				if(set.has(value)) {
					set.delete(value)
				}
				this.checkedFlowNodes = [...set]
			}
		}
		this.setBackground()
	},
	checkallBox (event){
		// console.log(this.checkall)
		if(this.checkall === true) {
			this.caseIds.forEach((value) => {
				this.selectedCases.includes(value) ? 1 : (this.selectedCases.push(value))
				this.flowNodeIds.has(+value)
					? (
						this.checkedFlowNodes = [...this.checkedFlowNodes,...this.flowNodeIds.get(+value)]
					)
					: 1
			})
		} else {
			this.selectedCases = []
			this.checkedFlowNodes = [];
		}
		this.setBackground()
	},
	checkAllInScene (event) {
		var flag = event.target.checked
		var inputs = Array.from(event.target.parentNode.parentNode.querySelectorAll('input[type=checkbox]'))
		for(let input of inputs) {
			input.checked = flag
			flag === true 
				? Vac.pushNoRepeat(this.selectedSceneCases, input.value) 
				: this.selectedSceneCases.indexOf(input.value) >= 0 
					? this.selectedSceneCases.splice(this.selectedSceneCases.indexOf(input.value), 1)
					: 1
		}
		this.setBackground()
	},
	checkAllFlowNodes (event) {
		var _this = this
		let flag = event.target.checked
		let caseLibDiv = event.target.parentNode.parentNode.parentNode;
		let caseListDiv = caseLibDiv.parentNode.parentNode
		var inputs = Array.from(caseLibDiv.querySelectorAll('.check-case'))
		if( flag === true ) {
			// get all the flownodes in this flowcase
			for(let input of inputs) {
				Vac.pushNoRepeat(this.selectedSceneCases, input.value)
			}
			// get all the check-flownodes and if all the check-flownodes' value is in the selectedSceneCases,
			// then set the checkall-inscene true
			let checkFlowNodesInputs = Array.from(caseListDiv.querySelectorAll('.check-flownodes'))
			if(checkFlowNodesInputs.every((input) => { return this.selectedSceneCases.includes(input.value)})) {
				caseListDiv.querySelector('.checkall-inscene').checked = true
				_this.checkallSceneIds.push(+caseListDiv.querySelector('.checkall-inscene').value)
			}
			
		} else {
			for (let input of inputs) {
				this.selectedSceneCases.includes(input.value)
					? this.selectedSceneCases.splice(this.selectedSceneCases.indexOf(input.value), 1)
					: 1
			}
			let value = caseListDiv.querySelector('.checkall-inscene').value
			caseListDiv.querySelector('.checkall-inscene').checked = false
			let set = new Set(_this.checkallSceneIds)
			set.has(+value) ? set.delete(+value) : 1
			_this.checkallSceneIds = [...set]
		}

		caseLibDiv = null
		inputs = null
		caseListDiv = null
		this.setBackground()
	},
	checkFlowNode (event) {
		var _this = this
		let flag = event.target.checked
		let caseDiv = event.target.parentNode.parentNode
		let caseListDiv = caseDiv.parentNode.parentNode
		let caseId = caseDiv.parentNode.querySelector('.check-flownodes').value
		if(flag) {
			let inputs = [...caseDiv.querySelectorAll('.check-case')]
			if(inputs.every((input) => {return this.selectedSceneCases.includes(input.value)})) {
				Vac.pushNoRepeat(this.selectedSceneCases, caseId)
				let caseInputs = [...caseListDiv.querySelectorAll('.check-flownodes')]
				if(caseInputs.every((input) => {return this.selectedSceneCases.includes(input.value)})) {
					caseListDiv.querySelector('.checkall-inscene').checked = true
					_this.checkallSceneIds.push(+caseListDiv.querySelector('.checkall-inscene').value)
				} else {
					caseListDiv.querySelector('.checkall-inscene').checked = false
					let value = caseListDiv.querySelector('.checkall-inscene').value
					let set = new Set(_this.checkallSceneIds)
					set.has(+value) ? set.delete(+value) : 1
					_this.checkallSceneIds = [...set]
				}
			} else {
				if(this.selectedSceneCases.includes(caseId)){
					this.selectedSceneCases.splice(this.selectedSceneCases.indexOf(caseId), 1)
				}
				caseListDiv.querySelector('.checkall-inscene').checked = false
				let value = caseListDiv.querySelector('.checkall-inscene').value
				let set = new Set(_this.checkallSceneIds)
				set.has(+value) ? set.delete(+value) : 1
				_this.checkallSceneIds = [...set]
			}
			inputs = null
		} else {
			if(this.selectedSceneCases.includes(caseId)){
				this.selectedSceneCases.splice(this.selectedSceneCases.indexOf(caseId), 1)
			}
			caseListDiv.querySelector('.checkall-inscene').checked = false
			let value = caseListDiv.querySelector('.checkall-inscene').value
			let set = new Set(_this.checkallSceneIds)
			set.has(+value) ? set.delete(+value) : 1
			_this.checkallSceneIds = [...set]
		}
		caseListDiv = null
		caseDiv = null
		// console.log(_this.checkallSceneIds)
		this.setBackground()
	},
	setSelect (event){
		var _this = this;
		var target  = event.target;
		if(target.classList.contains('handle1') || target.classList.contains('handle')) {
			return
		}
		let container = document.querySelector('.main-content2')
		var fileNodes = document.querySelectorAll(".case .check-case");
		var startX = event.offsetX + Vac.getOffsetTo(event.target, container).offsetLeft
		var startY = event.offsetY + Vac.getOffsetTo(event.target, container).offsetTop;
		var moveBeforeX = event.pageX;
		var moveBeforeY = event.pageY;
		var selDiv = document.createElement('div');
		selDiv.style.cssText = 
		`position:absolute;width:0px;height:0px;
		font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;
		background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);
		opacity:0.6;display:none;`;
		selDiv.id = 'selectDiv';
		container.appendChild(selDiv);
		selDiv.style.left = startX + "px";
		selDiv.style.top = startY + 'px';
		var _x = null;
		var _y = null;
		var moveAfterX = null;
		var moveAfterY = null;
		event.stopPropagation();
		event.preventDefault();
		var selectedRange = [];
		var moveFunction = mouseMoveFunction;
		container.addEventListener('mousemove', moveFunction, false);
		container.addEventListener('mouseup', (event) => {
			// this.isSelect = true;
			if (selDiv){
				container.removeChild(selDiv);
			}
			container.removeEventListener('mousemove', moveFunction, false);
			selDiv = null;
			
			for(let sceneid of _this.sceneIds) {
				if(_this.sceneCaseMap.get(sceneid).every( (value) => { 
					return _this.selectedSceneCases.includes(value)
				})) {
					Vac.pushNoRepeat(_this.checkallSceneIds, sceneid)
				} else {
					if(_this.checkallSceneIds.includes(sceneid)) {
						let set = new Set(_this.checkallSceneIds)
						set.delete(sceneid)
						_this.checkallSceneIds = [...set]
					}
				}
			}
			for (let caseId of _this.sceneCaseIds) {
				if(_this.flowNodesMap.get(caseId).every((value) => {
					return _this.selectedSceneCases.includes(value)
				})) {
					Vac.pushNoRepeat(_this.selectedSceneCases, caseId)
				} else {
					if(_this.selectedSceneCases.includes(caseId)) {
						let set = new Set(_this.selectedSceneCases)
						set.delete(caseId)
						_this.selectedSceneCases = [...set]
					}
				}
			}
		}, false);
		

		function mouseMoveFunction(event){
			if(selDiv.style.display == 'none'){
				selDiv.style.display = "block";
			}
			moveAfterX = event.pageX;
			moveAfterY = event.pageY;
			// 获取鼠标移动后的位置
			_x = startX - moveBeforeX + moveAfterX;
			_y = startY - moveBeforeY + moveAfterY;

			selDiv.style.left = Math.min(_x, startX) + "px";
			selDiv.style.top = Math.min(_y, startY) + "px";
			selDiv.style.width = Math.abs(_x - startX) + "px";
			selDiv.style.height  = Math.abs(_y - startY) + "px";

			var _l = selDiv.offsetLeft, _t = selDiv.offsetTop;
			var _r = selDiv.offsetWidth + _l, _b = selDiv.offsetHeight + _t;
			
			for(var i=0; i < fileNodes.length; i++){
				var inputLeft = Vac.getOffsetTo(fileNodes[i], container).offsetLeft;
				var inputTop = Vac.getOffsetTo(fileNodes[i], container).offsetTop;
				var inputRight = inputLeft + fileNodes[i].offsetWidth;
				var inputBottom = inputTop + fileNodes[i].offsetHeight;
				if (inputBottom < _b && inputTop > _t && inputLeft > _l && inputRight < _r) {
					// selectedRange.push(fileNodes[i]);
					Vac.pushNoRepeat(selectedRange, fileNodes[i]);
				}
			}
			for(var i=0; i<selectedRange.length; i++){
				var inputLeft = Vac.getOffsetTo(selectedRange[i], container).offsetLeft;
				var inputTop = Vac.getOffsetTo(selectedRange[i], container).offsetTop;
				var inputRight =  inputLeft + selectedRange[i].offsetWidth;
				var inputBottom = inputTop + selectedRange[i].offsetHeight;
				let value = selectedRange[i].value
				if( inputRight > _l && inputBottom > _t && inputLeft < _r && inputTop < _b) {
					if ($(selectedRange[i]).hasClass('single-case-incaselib')) {
						Vac.pushNoRepeat(_this.selectedCases, +value)
					} else if($(selectedRange[i]).hasClass('flow-node-incaselib')){
						Vac.pushNoRepeat(_this.checkedFlowNodes, +value)
					} else {
						Vac.pushNoRepeat(_this.selectedSceneCases, value)
					}
				} else {
					if ($(selectedRange[i]).hasClass('single-case-incaselib')) {
						let set = new Set(_this.selectedCases)
						set.delete(+value)
						_this.selectedCases = [...set]
					} else if($(selectedRange[i]).hasClass('flow-node-incaselib')){
						let set = new Set(_this.checkedFlowNodes)
						set.delete(+value)
						_this.checkedFlowNodes = [...set]
					} else {
						let set = new Set(_this.selectedSceneCases)
						set.delete(value)
						_this.selectedSceneCases = [...set]
					}
				}
				_this.setBackground()
			}
			event.stopPropagation();
			event.preventDefault();
		}
	},
	setSelectListener (){
		// document.querySelector('.main-content2').addEventListener('mousedown',Vac.throttle(this.setSelect, 1000, this),false);
		document.querySelector('.main-content2').addEventListener('mousedown',this.setSelect, false);
		// 防止点击用例框时也进行选取
		
		// var caseLibs = Array.from(document.querySelectorAll('.case-lib'))
		// console.log(caseLibs)
		// for(let caseLib of caseLibs) {
		// 	console.log(caseLib)
		// 	caseLib.addEventListener('mousedown', function(event){
		// 		console.log(event.target)
				
		// 	})
		// }
	}
}