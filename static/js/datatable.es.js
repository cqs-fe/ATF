$(document).ready(function(){
	(function(){
		var setting = {
			callback: {
				onDblClick: zTreeOnDblClick
			},
		};
		var zTreeObj;
		var data = {
			testpoint: 6,
			executor: 6,
			caseLib_id: 6
		};
		$.ajax({
			url: address + 'autController/selectTestCaseByCondition',
			data: data,
			dataType: 'json',
			Type: 'POST',
			success:function(data, textStatus){
				if(data.success === true){
					var treeData = [];
					data.o.forEach((value) => {
						var item = {};
						item.open = true;
						item.children = [];
						value.children.forEach((value) => {
							var subData = {};
							subData.open = true;
							({
								id: subData.id,
								transname: subData.name,
								children: subData.children
							} = value);
							item.children.push(subData);
						});
						({
							id: item.id,
							autName: item.name,
						} = value);
						treeData.push(item);
					});
					zTreeObj = $.fn.zTree.init($("#tree-wrapper"), setting, treeData);
				}
			}
		});
		// handsontable init
		var tableContainer = document.getElementById("handsontable");
		var handsontable = null;
		var dataSource = null;
		var selectAllFlag = false;
		var rowSelectFlags = [];
		var string = "";
		var editableColStartIndex = 3;
		var editableColEndIndex = 5;
		var clipBoard = [];
		var clipBoardSize = {
			cols: 0,
			rows: 0
		};
		var searchResults = null;
		var currentResult = 0;
		// var undoTimes = 0;
		var contextMenuObj = {
			callback: function (key, options) {},
      		items: {
      			"row_above":{
      				name: '复制',
      				callback: copyCallback,
    				disabled:function(){return false;},
    				hidden: function(){return false;}
      			},
		        "row_below": {
		        	name: '剪切',
      				callback: cutCallback,
    				disabled:function(){return false;},
    				hidden: function(){return false;}
		        },
		        "col_left": {
		          name: '粘贴',
      				callback: pasteCallback,
    				disabled:function(){
    					return clipBoard.length === 0 ? true : false;
    				},
    				hidden: function(){return false;}
		        },
		        "col_right": {
		        	name: '清除',
      				callback: clearCallback,
    				disabled:function(){return false;},
    				hidden: function(){return false;}
		        },
		        "remove_row":{
		        	name: '搜索',
		        	callback:searchCallback,
		        	disabled: function(){return false},
		        	hidden: function(){return false}
		        },
		        "remove_col":{
		        	name: '替换',
		        	callback: replaceCallback,
		        	disabled: function(){return false;},
		        	hidden: function(){return false;}
		        } 
      		}
		};
		const columnsHeaders = [
			"<input type='checkbox' class='header-checker' "+ (selectAllFlag?"checked='checked'":"")+">","行号",
			"案例编号","测试点","测试意图","测试步骤","预期结果","检查点"
		];
		const columnsOptions = [
			{	data:"",
				renderer: function(instance, td, row, col, prop, value, cellProperties){
				td.style.textAlign = 'center';
				td.innerHTML = "<input type='checkbox' data-index='"+row+"' class='checker' "+ (rowSelectFlags[row]?"checked='checked'":"") +">";
				return td;
				},
				readOnly: true
			},
			{	data:"",
				renderer: function(instance, td, row, col, prop, value, cellProperties){
					td.innerHTML = row;
		 			return td;
				},
				readOnly: false
			},
			{	data: "casecode",readOnly: false},
			{	data: "testpoint",readOnly: false},
			{	data: "testdesign",readOnly: false},
			{	data: 'teststep',readOnly: false},
			{	data: 'expectresult',readOnly: false},
			{	data: 'testpoint',readOnly: false}
		];
		var totalColumnsHeaders = [];
		var getColumnsOptions = function(tableHead){
			var totalColumnsOptions = [];
			var dataKey = getDataKey(tableHead);
			dataKey.forEach((key) => {
				if(key){
					var option = {data: key,readOnly: false};
					totalColumnsOptions.push(option);
				}
			});
			totalColumnsOptions = columnsOptions.concat(totalColumnsOptions);
			return totalColumnsOptions;
		};
		var getTotalColHeaders = function(data){
			// console.log("const"+columnsHeaders);
			totalColumnsHeaders  = [];
			// console.log("before"+totalColumnsHeaders);
			if(data && data.length){
				data.forEach((value) => {
					if(value.length > 0){
						var header = value.join('%');
						totalColumnsHeaders.push(header);
						// console.log("every"+ totalColumnsHeaders);
					}
				});
			}
			totalColumnsHeaders = columnsHeaders.concat(totalColumnsHeaders);
		};
		var getDataKey = function(data){
			var dataKey = [];
			if(data){
				data.forEach((value) => {
					dataKey.push(value[1]);
				});
			}
			
			return dataKey;
		};
		function zTreeOnDblClick(event, treeId, treeNode){
			console.log(treeNode.getParentNode());
			if(treeNode && !treeNode.isParent){
				var autId = treeNode.getParentNode().getParentNode().id;
				var transId = treeNode.getParentNode().id;
				var scriptId = treeNode.id;
				var data = {
					testpoint: 6,
					executor: 6,
					caseLib_id: 6,
					autId:autId,
					transId:transId,
					scriptId:scriptId
				};
				$.ajax({
					url: address + "scripttemplateController/searchScripttemplateInf",
					data: data,
					type:"post",
					dataType: "json",
					success: function(data){
						// if(data.success === true){
							var dataKey = [];
							if(data.o.tableHead){
								dataKey = getDataKey(data.o.tableHead);
							}
							var destrutData = [];
							if(data.o.tableDatas){
								data.o.tableDatas.forEach((value) => {
								var data = {};
								({
									expectresult:data.expectresult,
									testpoint: data.testpoint,
									teststep: data.teststep,
									checkpoint: data.checkpoint,
									testdesign: data.testdesign,
									casecode: data.casecode
								} = value);
								dataKey.forEach((key) => {
									data[key] = value[key].v;
								});
								destrutData.push(data);
							});
							}
							// console.log(destrutData);
							dataSource = destrutData;
							rowSelectFlags.length = dataSource.length;
							getTotalColHeaders(data.o.tableHead);
							console.log(totalColumnsHeaders);
							var totalColumnsOptions = getColumnsOptions(data.o.tableHead);
							if(handsontable === null){
								handsontable = new Handsontable(tableContainer,{
									data: dataSource,
									columns: totalColumnsOptions,
								  	colHeaders: colHeadersRenderer,
								  	cells: function (row, col, prop) {
									    var cellProperties = {};
									    return cellProperties;
									},
									multiSelect: true,
									outsideClickDeselects: true,
									contextMenu: contextMenuObj,
									undo: true,
									copyPaste: true,
									allowInsertRow: false,
									allowInsertColumn: false,
									search: {
										searchResultClass: ''
									},
									afterRender: function(){
										if(searchResults && searchResults.length){
											var trs = document.querySelectorAll('#handsontable tbody tr');
											searchResults.forEach((value,index) => {
												var tds = trs[value.row].getElementsByTagName('td');
												if(index === currentResult){
													tds[value.col].style.backgroundColor="#f00";
												}else{
													tds[value.col].style.backgroundColor="#0f0";
												}
												
											})
										}
									}
								});
								// handsontable.updateSettings(contextMenuObj);
							}
							else{
								handsontable.updateSettings({
								   data: dataSource,
								   columns: totalColumnsOptions,
								   colHeaders: colHeadersRenderer
								});
								handsontable.render();
							}
						// }else{

						// }
					}
				}); //aj 
			}

		}

		Handsontable.Dom.addEvent(tableContainer, 'mousedown', function (event) {
    		if (event.target.nodeName == 'INPUT' && event.target.className == 'header-checker') {
      			selectAllFlag = !event.target.checked;
      			for(var i = 0; i < rowSelectFlags.length; i++){
      				rowSelectFlags[i] = selectAllFlag;
      			}
      			var inputs = document.querySelectorAll('#handsontable tbody tr td:first-child input');
      			var trs = document.querySelectorAll('#handsontable tbody tr');
      			if(selectAllFlag){
      				for(var tr of trs){
      					tr.className = 'selected';
      				}
      				for(var input of inputs){
      					input.checked = true;
      				}
      			}else{
      				for(var tr of trs){
      					tr.className = '';
      				}
      				for(var input of inputs){
      					input.checked = false;
      				}
      			}
      			// handsontable.render();
      			event.stopPropagation();
    		}else if(event.target.nodeName == 'INPUT' && event.target.className == 'checker'){
				var row = event.target.getAttribute('data-index');
				rowSelectFlags[row] = !event.target.checked;
				var inputs = document.querySelectorAll('#handsontable tbody tr td:first-child input');
      			var trs = document.querySelectorAll('#handsontable tbody tr');
				if(rowSelectFlags[row]){
					trs[row].className = 'selected';
				}else{
					trs[row].className = '';
				}
				// handsontable.render();
    		}else{

    		}
		});
		var searchBoxVue = new Vue({
			el: '#searchBox',
			data: {
				isShow: false,
				searOrRep: false,
				keyword: "",
				newword: '',
				searchResults:null,
				currentReult:0,
			},
			methods: {
				show: function(searOrRep){
					this.isShow = true;
					this.searOrRep = searOrRep;
				},
				hide: function(){
					this.isShow = false;
					searchResults = null;
					currentResult = 0;
					this.keyword = "";
					handsontable.search.query(this.keyword);
					handsontable.render();
				},
				showSearch: function(){this.searOrRep = false;},
				showReplace: function(){this.searOrRep = true;},
				search: function(){
					searchResults = handsontable.search.query(this.keyword);
					currentResult = 0;
					// this.renderResults();
					handsontable.render();
				},
				findNext: function(){
					currentResult += 1;
					if(currentResult >= searchResults.length){
						currentResult = 0;
					}
					this.renderResults();
					this.scrollViewportTo(searchResults);
				},
				replace: function(){
					handsontable.setDataAtCell(searchResults[currentResult].row,searchResults[currentResult].col,this.newword);
					searchResults = handsontable.search.query(this.keyword);
					handsontable.render();
					if(currentResult >= searchResults.length){
						currentResult = 0;
					}
					this.renderResults();
				},
				replaceAll: function(){
					if(searchResults && searchResults.length){
						var newData = [];
						searchResults.forEach((value) => {
							var data = [value.row,value.col,this.newword];
							newData.push(data);
						});
						handsontable.setDataAtCell(newData);
						handsontable.render();
					}
				},
				scrollViewportTo: function(result){
					if(result && result.length){
						handsontable.scrollViewportTo(result[currentResult]['row'],result[currentResult]['col']);
					}
				},
				renderResults: function(){
					if(searchResults && searchResults.length){
						var trs = document.querySelectorAll('#handsontable tbody tr');
						searchResults.forEach((value,index) => {
							var tds = trs[value.row].getElementsByTagName('td');
							if(index === currentResult){
								tds[value.col].style.backgroundColor="#f00";
							}else{
								tds[value.col].style.backgroundColor="#0f0";
							}
						})
					}
				}
			},
			computed: {
				
			}
		});
		//window resize
		window.onresize = function(){
			if(handsontable !== null){
				handsontable.render();
			}
		};
		//渲染第0列的内容
		function colHeadersRenderer(col){
			if(parseInt(col) === 0){
				return "<input type='checkbox' class='header-checker' "+ (selectAllFlag?"checked='checked'":"")+">";
			}else{
				return totalColumnsHeaders[col];
			}
		};
		//渲染第一列的内容 end
		//渲染平常列
		function renderNormalCol(instance, td, row, col, prop, value, cellProperties){
			if(row%2){
				td.style.backgroundColor = "#eeee11";
			}else{
				td.style.backgroundColor = "#ffff00";
			}
			if(rowSelectFlags[row] === true){
				td.style.backgroundColor = "#1ABDE6";
			}else{
				// td.style.backgroundColor = "#fff";
			}
			if(td.isSearchResult){
				// td.style.backgroundColor = "#fff";
				console.log("result");
			}
			td.innerHTML = value;
			return td;
		};
		//渲染平常列 end

		//复制功能函数
		function copyCallback(key,selection){
			var trueIndexArray = [];
			rowSelectFlags.forEach((flag, index) => {
				if(flag){
					trueIndexArray.push(index);
				}
			});
			// 先清空剪切板
			while(clipBoard.length > 0){
				clipBoard.pop();
			}
			//选择所有被选中的单元格
			var i = 0;
			for(i = selection.start.row;i <= selection.end.row;i++){
				let j = 0;
				for(j = selection.start.col; j <= selection.end.col;j++){
					let data = [i - selection.start.row, j - selection.start.col,handsontable.getDataAtCell(i,j)];
					clipBoard.push(data);
				}
			}
			clipBoardSize.cols = selection.end.col - selection.start.col + 1;
			clipBoardSize.rows = selection.end.row - selection.start.row + 1;
		}
		//复制功能函数 end
		//粘贴功能函数
		// the data of the clipboard : [[row,col,value],[row,col,value]]
		function pasteCallback(key, selection){
			if(clipBoard.length > 0){
				var cols = selection.end.col - selection.start.col + 1;
				var rows = selection.end.row - selection.start.row + 1;
				if(cols <= clipBoardSize.cols && rows <= clipBoardSize.rows){
					var clipBoardData = clipBoard.map((array) => {
						let arrayData = [];
						arrayData[0] = parseInt(array[0]) + parseInt(selection.start.row);
						arrayData[1] = parseInt(array[1]) + parseInt(selection.start.col);
						arrayData[2] = array[2];
						return arrayData;
					});
					setCellsData(clipBoardData);
				}else if(cols > clipBoardSize.cols && rows <= clipBoardSize.rows){
					var int = Math.floor(cols/clipBoardSize.cols);
					var i = 0;
					for(i = 0; i < int; i++){
						var clipBoardData = clipBoard.map((array) => {
							let arrayData = [];
							arrayData[0] = parseInt(array[0]) + parseInt(selection.start.row);
							arrayData[1] = parseInt(array[1]) + parseInt(selection.start.col) + i * clipBoardSize.cols;
							arrayData[2] = array[2];
							return arrayData;
						});
						setCellsData(clipBoardData);
					}
				}else if(cols <= clipBoardSize.cols && rows > clipBoardSize.rows){
					var int = Math.floor(rows/clipBoardSize.rows);
					var i = 0;
					for(i = 0; i < int; i++){
						var clipBoardData = clipBoard.map((array) => {
							let arrayData = [];
							arrayData[0] = parseInt(array[0]) + parseInt(selection.start.row) + i * clipBoardSize.rows;
							arrayData[1] = parseInt(array[1]) + parseInt(selection.start.col);
							arrayData[2] = array[2];
							return arrayData;
						});
						setCellsData(clipBoardData);
					}
				}else {
					var rowInt = Math.floor(rows / clipBoardSize.rows);
					var colInt = Math.floor(cols / clipBoardSize.cols);
					var i = 0, j = 0;
					for(i = 0; i < rowInt; i++){
						for(j = 0; j < colInt; j++){
							var clipBoardData = clipBoard.map((array) => {
								let arrayData = [];
								arrayData[0] = parseInt(array[0]) + parseInt(selection.start.row) + i * clipBoardSize.rows;
								arrayData[1] = parseInt(array[1]) + parseInt(selection.start.col) + j * clipBoardSize.cols;
								arrayData[2] = array[2];
								return arrayData;
							});
							setCellsData(clipBoardData);
						}
					}
				}
			}
		}
		//粘贴功能函数 end
		//剪切功能函数
		function cutCallback(key, selection){
			var trueIndexArray = [];
			rowSelectFlags.forEach((flag, index) => {
				if(flag){
					trueIndexArray.push(index);
				}
			});
			// 先清空剪切板
			while(clipBoard.length > 0){
				clipBoard.pop();
			}
			//选择所有被选中的单元格
			//将所有选中单元格复制到剪切板,同时清空选中单元格的内容
			var clipBoardData = [];
			var i = 0;
			for(i = selection.start.row;i <= selection.end.row;i++){
				let j = 0;
				for(j = selection.start.col; j <= selection.end.col;j++){
					let data = [i - selection.start.row, j - selection.start.col,handsontable.getDataAtCell(i,j)];
					let nullData = [i, j,""];
					clipBoard.push(data);
					clipBoardData.push(nullData)
				}
			}
			handsontable.setDataAtCell(clipBoardData);
		}
		//剪切功能函数 end
		// 清除功能函数
		function clearCallback(key,selection){
			var trueIndexArray = [];
			rowSelectFlags.forEach((flag, index) => {
				if(flag){
					trueIndexArray.push(index);
				}
			});
			//选择所有被选中的单元格
			//将所有选中单元格复制到剪切板,同时清空选中单元格的内容
			var clipBoardData = [];
			var i = 0;
			for(i = selection.start.row;i <= selection.end.row;i++){
				let j = 0;
				for(j = selection.start.col; j <= selection.end.col;j++){
					// let data = [i - selection.start.row, j - selection.start.col,handsontable.getDataAtCell(i,j)];
					let nullData = [i, j,""];
					// clipBoard.push(data);
					clipBoardData.push(nullData)
				}
			}
			handsontable.setDataAtCell(clipBoardData);
		}
		//清除功能函数 end
		// //搜索功能函数
		function searchCallback(key, selection){
			searchBoxVue.show(false);
		}
		// //搜索功能函数 end
		// //搜索功能函数
		function replaceCallback(key, selection){
			searchBoxVue.show(true);
		}
		// //搜索功能函数 end
		//beforeKeyDown
		function beforeKeyDown(event){
			// console.log(event);
			// // ctrl-c
			// if((event.ctrlKey | event.metaKey) && event.keyCode === 67){
			// 	var trueIndexArray = [];
			// 	rowSelectFlags.forEach((flag, index) => {
			// 		if(flag){
			// 			trueIndexArray.push(index);
			// 		}
			// 	});
			// 	// 先清空剪切板
			// 	while(clipBoard.length > 0){
			// 		clipBoard.pop();
			// 	}
			// 	if(trueIndexArray.length > 0){
			// 		// 如果有选中行，则进行复制选中行的操作
			// 		//将所有选中行复制到剪切板
			// 		trueIndexArray.forEach((row,index) => {
			// 			let i = 0;
			// 			for(i = editableColStartIndex; i <= editableColEndIndex; i++){
			// 				let data = [index, i - editableColStartIndex,handsontable.getDataAtCell(row,i)];
			// 				clipBoard.push(data);
			// 			}
			// 		});
			// 	}else{
			// 		// 如果没有行被选中
			// 		//选择所有被选中的单元格
			// 		var i = 0;
			// 		var selection = handsontable.getSelected();
			// 		for(i = selection[0];i <= selection[2];i++){
			// 			let j = 0;
			// 			for(j = selection[1]; j <= selection[3];j++){
			// 				let data = [i - selection[0], j - selection[1],handsontable.getDataAtCell(i,j)];
			// 				clipBoard.push(data);
			// 			}
			// 		}
			// 	}
			// 	event.stopImmediatePropagation();
			// }
			// // ctrl-v 
			// if((event.ctrlKey | event.metaKey) && event.keyCode === 86){
			// 	if(clipBoard.length > 0){
			// 		var selection = handsontable.getSelected();
			// 		var clipBoardData = clipBoard.map((array) => {
			// 			let arrayData = [];
			// 			arrayData[0] = parseInt(array[0]) + parseInt(selection[0]);
			// 			arrayData[1] = parseInt(array[1]) + parseInt(selection[1]);
			// 			arrayData[2] = array[2];
			// 			return arrayData;
			// 		});
			// 		// console.log(clipBoardData);
			// 		handsontable.setDataAtCell(clipBoardData);
			// 	}
			// 	event.stopImmediatePropagation();
			// }
			// // ctrl-x
			// if((event.ctrlKey | event.metaKey) && event.keyCode === 88){
			// 	var trueIndexArray = [];
			// 	rowSelectFlags.forEach((flag, index) => {
			// 		if(flag){
			// 			trueIndexArray.push(index);
			// 		}
			// 	});
			// 	// 先清空剪切板
			// 	while(clipBoard.length > 0){
			// 		clipBoard.pop();
			// 	}
			// 	if(trueIndexArray.length > 0){
			// 		// 如果有选中行，则进行复制选中行的操作
			// 		//将所有选中行复制到剪切板,同时清空选中单元格的内容
			// 		var clipBoardData = [];
			// 		trueIndexArray.forEach((row,index) => {
			// 			let i = 0;
			// 			for(i = editableColStartIndex; i <= editableColEndIndex; i++){
			// 				let data = [index, i - editableColStartIndex,handsontable.getDataAtCell(row,i)];
			// 				let nullData = [row, i,""];
			// 				clipBoard.push(data);
			// 				clipBoardData.push(data)
			// 				handsontable.setDataAtCell(clipBoardData);
			// 			}
			// 		});
			// 		handsontable.setDataAtCell(clipBoardData);
			// 	}else{
			// 		// 如果没有行被选中
			// 		//选择所有被选中的单元格
			// 		//将所有选中单元格复制到剪切板,同时清空选中单元格的内容
			// 		var selection = handsontable.getSelected();
			// 		var clipBoardData = [];
			// 		var i = 0;
			// 		for(i = selection[0];i <= selection[2];i++){
			// 			let j = 0;
			// 			for(j = selection[1]; j <= selection[3];j++){
			// 				let data = [i - selection[0], j - selection[1],handsontable.getDataAtCell(i,j)];
			// 				let nullData = [i, j,""];
			// 				clipBoard.push(data);
			// 				clipBoardData.push(nullData)
			// 			}
			// 		}
			// 		handsontable.setDataAtCell(clipBoardData);
			// 	}
			// 	event.stopImmediatePropagation();
			// }
		}
		//beforeKeyDown function end
		// 设置单元格数据，保证设置的数据不超过最大行，最大列
		// parameter: [[row,col,value],[row,col,value]]
		function setCellsData(arrayData){
			var maxCol = handsontable.countCols() - 1;
			var maxRow = handsontable.countRows() - 1;
			arrayData = arrayData.filter((value) => {
				if(value[0] <= maxRow && value[1] <= maxCol){
					return true;
				}else{
					return false;
				}
			});
			handsontable.setDataAtCell(arrayData);
		}
	})();
	
	
});

var dragController = {
	pointerStart: {X: 0,Y: 0},
	pointerEnd: {X: 0,Y: 0},
	searchBoxDragStart: function(event){

	},
	searchBoxDragEnd: function(event){
		// console.log(event.clientX);
		this.pointerEnd.X = event.clientX;
		this.pointerEnd.Y = event.clientY;
		document.getElementById("searchBox").style.left = this.pointerEnd.X+'px';
		document.getElementById("searchBox").style.top = this.pointerEnd.Y+'px';
	},
	searchBoxDrag: function(event){
		this.pointerEnd.X = event.clientX;
		this.pointerEnd.Y = event.clientY;
		document.getElementById("searchBox").style.left = this.pointerEnd.X+'px';
		document.getElementById("searchBox").style.top = this.pointerEnd.Y+'px';
	}
};