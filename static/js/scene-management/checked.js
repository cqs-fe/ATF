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
	setSelect (event){
		var _this = this;
		var target  = event.target;
		if(target.classList.contains('handle')) {
			return
		}
		// if (!target.classList.contains('main-content')) { return false; }
		let container = document.querySelector('.main-content')
		var fileNodes = document.querySelectorAll(".case .check-case");
		var startX = event.offsetX + Vac.getOffsetTo(event.target, container).offsetLeft;
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
		// 函数节流
		// var moveFunction = Vac.throttle(mouseMoveFunction, 30, _this)
		var moveFunction = mouseMoveFunction;
		container.addEventListener('mousemove', moveFunction, false);
		container.addEventListener('mouseup', (event) => {
			// this.isSelect = true;
			if (selDiv){
				document.querySelector('.main-content').removeChild(selDiv);
			}
			container.removeEventListener('mousemove', moveFunction, false);
			selDiv = null;
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
				if( inputBottom < _b && inputTop > _t && inputLeft > _l && inputRight < _r) {
					selectedRange.push(fileNodes[i]);
				}
			}

			for(var i=0; i<selectedRange.length; i++){
				var inputLeft = Vac.getOffsetTo(selectedRange[i], container).offsetLeft;
				var inputTop = Vac.getOffsetTo(selectedRange[i], container).offsetTop;
				var inputRight =  inputLeft + selectedRange[i].offsetWidth;
				var inputBottom = inputTop + selectedRange[i].offsetHeight;
				let value = selectedRange[i].value;
				if( inputBottom < _b && inputTop > _t && inputLeft > _l && inputRight < _r) {
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
				_this.setBackground();
			}
			event.stopPropagation();
			event.preventDefault();
		};
	},
	setSelectListener (){
		// document.querySelector('.main-content').addEventListener('mousedown',this.setSelect,false);
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
		var inputs = event.target.parentNode.parentNode.parentNode.getElementsByClassName('check-case');
		let inputValue = []
		if(flag) {
			for(var input of inputs) {
				(!this.checkedFlowNodes.includes(+input.value))
				? (this.checkedFlowNodes.push(+input.value))
				: 1 
			}
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