var vBody = new Vue({
	el: '#v-body',
	data: {
		isSelect: false,
		tooltipFlag: false,
		tooltipType: 4,
	},
	created: function(){
		// 用于初始化 滑动鼠标选取元素
		this.setSelectListener();
		

	},
	methods: {
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
			target.addEventListener('mousemove', mouseMoveFunction, false);
			target.addEventListener('mouseup', (event) => {
				this.isSelect = true;
				if (selDiv){
					document.querySelector('.main-content').removeChild(selDiv);
				}
				target.removeEventListener('mousemove', mouseMoveFunction, false);
				selDiv = null;
			}, false);


			function mouseMoveFunction(event){
				// 如果已经选取过，则
				if (this.isSelect) {
					var inputs = document.querySelectorAll(".case input[checked]");
					for(var i = 0; i < inputs.length; i++){
						inputs[i].removeAttribute("checked");
					}
					this.isSelect = false;
				}
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

				for (var i = 0 ; i < fileNodes.length; i++) {
					var inputRight = fileNodes[i].offsetLeft + fileNodes[i].offsetWidth;
					var inputBottom = fileNodes[i].offsetTop + fileNodes[i].offsetHeight;

					if( inputRight > _l && inputBottom > _t && fileNodes[i].offsetLeft < _l + _w && fileNodes[i].offsetTop < _t + _h) {
						fileNodes[i].setAttribute("checked","true");
					}else{
						fileNodes[i].removeAttribute("checked");
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
		},
		toggleTooltip: function(event){
			console.log('he')
			this.tooltipFlag = !this.tooltipFlag;
		}
	}
});