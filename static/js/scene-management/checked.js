var checkFunction = {
	setBackground () {
		let caseCbs = $('input.check-case')
		this.$nextTick(function () {
        	$.each(caseCbs, function(index, ele) {
				if(ele.checked) {
					$(ele).parents('.case').css({"border-color": "#ff6c60"})
				}else {
					$(ele).parents('.case').css({"border-color": "#ddd5d5"})
				}
			})
      	})
	},
	setSelect (event){
		var _this = this;
		var target  = event.target;
		if(!target.classList.contains('main-content')) {
			return
		}
		var fileNodes = document.querySelectorAll(".case input.check-case");
		var startX = event.offsetX;
		var startY = event.offsetY;
		var moveBeforeX = event.pageX;
		var moveBeforeY = event.pageY;
		var selDiv = document.createElement('div');
		selDiv.style.cssText = 
		`position:absolute;width:0px;height:0px;
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
			// var caseLib = document.querySelectorAll('.case-lib');
			// for(var i=0; i<caseLib.length; i++){
			// 	var inputs = Array.from(caseLib[i].getElementsByClassName('check-case'));
			// 	if(inputs.every(function(value){
			// 		if(value.checked===true)
			// 			{return true;} 
			// 		return false;
			// 	})){
			// 		caseLib[i].getElementsByClassName('checkall')[0].checked = true;
			// 	} else {
			// 		caseLib[i].getElementsByClassName('checkall')[0].checked = false;
			// 	}
			// }
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
				let value = selectedRange[i].value
				if( inputRight > _l && inputBottom > _t && selectedRange[i].offsetLeft < _l + _w && selectedRange[i].offsetTop < _t + _h) {
					if ($(selectedRange[i]).hasClass('single-case')) {
						_this.pushNoRepeat(_this.selectedCases, +value)
					} else {
						_this.pushNoRepeat(_this.checkedFlowNodes, +value)
					}
				} else {
					if ($(selectedRange[i]).hasClass('single-case')) {
						let set = new Set(_this.selectedCases)
						set.delete(+value)
						_this.selectedCases = [...set]
					} else {
						let set = new Set(_this.checkedFlowNodes)
						set.delete(+value)
						_this.checkedFlowNodes = [...set]
					}
				}
			}
			event.stopPropagation();
			event.preventDefault();
		};
	},
	pushNoRepeat (array, value) {
		array.includes(value)
			? 1
			: array.push(value)
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
		// console.log(flag)
		var inputs = event.target.parentNode.parentNode.getElementsByClassName('check-case');
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
}