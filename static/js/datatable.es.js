$(document).ready(function(){
	(function(){
		var editDataVue = new Vue({
			el: '#editData',
			data: {
				dataType:4,
				isShow: true,
				insertTitle:null,
				insertType: null,
				isInsertDivShow:true,
				selection: null
			},
			created: function(){},
			methods: {
				hide: function(){this.isShow = false;insertDivVue.isShow = false;},
				show: function(selection){
					this.selection = selection;
					this.isShow = true;
				},
				insert: function(type, title){
					insertDivVue.show(type,title);
				},
				saveEditData: function(){
					var inputValue = document.getElementById("input"+this.dataType).value;
					console.log(inputValue);
					handsontable.setDataAtCell(this.selection.start.row,this.selection.start.col,inputValue);
					handsontable.render();
				}
			},
		});
		var insertDivVue = new Vue({
			el: '#insertDiv',
			data: {
				isShow: true,
				type: null,
				insertTitle:null,
				trData: [],
				finalString: "",
			},
			created: function(){

			},
			methods: {
				show: function(type,title){
					this.isShow = true;
					this.insertTitle = title;
					this.type = type;
				},
				hide: function(){
					this.isShow = false;
					this.trData = [];
				},
				addRow: function(){
					console.log("add");
					this.trData.push({});
				},
				removeRow: function(index){
					console.log(index);
					this.trData.splice(index,1);
				},
				saveData: function(){
					this.finalString = '';
					this.finalString += document.querySelector("#select-name").value+":";
					if(this.type === 2){
						var names = document.querySelectorAll(".td-param-name");
						var values = document.querySelectorAll(".td-param-value");
						this.trData.forEach((rowData,index) => {
							rowData.name = names[index].innerHTML.trim();
							rowData.value = values[index].innerHTML.trim();
							this.finalString += rowData.name +"=" + rowData.value+"&";
						});
						this.finalString = this.finalString.slice(0,this.finalString.length-1);
					}else{
						this.finalString = this.finalString + document.getElementById("dataName").value;
					}
					
					console.log(this.finalString);
					var input = document.getElementById("input4");
					var pos = this.getCursortPosition(input);
					var s = input.value;
					input.value = s.substring(0, pos)+this.finalString+s.substring(pos);
				},
				getCursortPosition: function(ctrl){
					var CaretPos = 0;	// IE Support
					if (document.selection) {
					ctrl.focus ();
						var Sel = document.selection.createRange ();
						Sel.moveStart ('character', -ctrl.value.length);
						CaretPos = Sel.text.length;
					}
					// Firefox support
					else if (ctrl.selectionStart || ctrl.selectionStart == '0')
						CaretPos = ctrl.selectionStart;
					return (CaretPos);
				}
			}
		});
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
		var sub = new Vue({
            el: '#submenu',
            data: {
                flag: true,
                selectItems: [],
                // checkedItems: [{value: 1,name: '登陆'},{value: 2,name: '注册'}],
                checkedItems: [],
                checkedArray:[]
            },
            created: function(){
                var _this = this;
                $.ajax({
                    url: "/api/selectTypes",
                    data: null,
                    type: 'post',
                    dataType: 'json',
                    success: function(data, textStatus){
                        _this.selectItems = data.data;
                        console.log(_this.selectItems);
                    }
                });
            },
            methods: {
                toggle: function(){
                    this.flag = !this.flag;
                },
                changeSelect: function(event){
                    var _this = this;
                    // console.log('hello');
                    if(event.target.value == 1){
                        $.ajax({
                            url: address + "TestcaseController/selectTestPointByCondition",
                            data: "executor=6&caseLib_id=6",
                            type: 'post',
                            dataType: "json",
                            success: function(data,textStatus){
                                // checkedItems = 
                                data.o.forEach(function(value,index){
                                    var arrayItem = {};
                                    ({testpoint:arrayItem.value} = value);
                                    arrayItem.name = arrayItem.value;
                                    _this.checkedItems.push(arrayItem);
                                });
                            }
                        });
                    }
                },
                changeChecked: function(event){
                    var _this = this;
                    $.ajax({
                        url: address + "autController/selectTestCaseByCondition",
                        type: "post",
                        dataType: "json",
                        data: "testpoints=["+_this.checkedArray+"]&executor=6&caseLib_id=6",
                        success: function(data, textStatus){
                            var treeData = [];
                            data.o.forEach((value) => {
                                var item = {};  //解构第一层
                               item.open = true;
                               item.children = [];
                               value.children.forEach((value) => {
                                   var subData = {};  //解构第二层
                                   subData.children = [];
                                   subData.open = true;
                                   ({
                                       transactid: subData.id,
                                       name: subData.name,
                                   } = value);
                                   value.children.forEach((value => {
                                        var ssubData = {};
                                        ({
                                            scriptid: ssubData.id,
                                            name: ssubData.name
                                        } = value);
                                        subData.children.push(ssubData);
                                   }));
                                   item.children.push(subData);
                               });
                               ({
                                   autid: item.id,
                                   name: item.name,
                               } = value);
                               treeData.push(item);
                            });
                            zTreeObj = $.fn.zTree.init($("#tree-wrapper"), setting, treeData);
                        }
                    });
                }
            }
        });

		// handsontable init
		var tableContainer = document.getElementById("handsontable");
		var handsontable = null;
		var dataSource = null;
		var changedData = [];
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
		        },
		        "make_read_only":{
		        	name: '编辑数据',
		        	callback: editCellData,
		        	disabled: function(){},
		        	hidden: function(){
		        		// [startRow, startCol, endRow, endCol]
		        		var selection = handsontable.getSelected();
		        		if(selection[1] >= 8 && selection[0] == selection[2] && selection[1] == selection[3]){
		        			return false;
		        		}
		        		return true;
		        	}
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
				readOnly: true
			},
			{	data: "casecode",readOnly: false},
			{	data: "testpoint",readOnly: false},
			{	data: "testdesign",readOnly: false},
			{	data: 'teststep',readOnly: false},
			{	data: 'expectresult',readOnly: false},
			{	data: 'checkpoint',readOnly: false}
		];
		var totalColumnsHeaders = [];
		var getColumnsOptions = function(tableHead){
			//tableHead = [ ["[待删除]","商品"], ["[待删除]","t1"] ]
			var totalColumnsOptions = [];
			var dataKey = getDataKey(tableHead);
			console.log("getColumnsOptions中dataKey:" + dataKey);
			// dataKey = ["商品","t1"]
			dataKey.forEach((key) => {
				if(key){
					var option = {
						data: key,
						// renderer: function(instance, td, row, col, prop, value, cellProperties){
						// 	if(col >= 8)
						// 	{ 
						// 		// td.style.backgroundColor = '#fff';
						// 		//Vac.addClass(td,'dbclick');
						// 	}
						// 	return td;
						// },
						readOnly: false
					};
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
		// 得到数据的表头
		var getDataKey = function(data){
			console.log("getDataKey中的head:"+data);
			//data = [ ["[待删除]","商品"], ["[待删除]","t1"] ]
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
						var dataKey = [];
						if(data.o.tableHead){
							// [ ["[待删除]","商品"], ["[待删除]","t1"] ]
							dataKey = getDataKey(data.o.tableHead);
							console.log("dataKey:"+dataKey);
						}
						var destrutData = [];
						if(data.o.tableDatas){
							data.o.tableDatas.forEach((value) => {
							var data = {};
							({
								id: data.testcaseId,
								expectresult:data.expectresult,
								testpoint: data.testpoint,
								teststep: data.teststep,
								checkpoint: data.checkpoint,
								testdesign: data.testdesign,
								casecode: data.casecode
							} = value);
							dataKey.forEach((key) => {
								data[key] = value[key];
							});
							console.log(data)
							destrutData.push(data);
						});
						}
						// console.log(destrutData);
						dataSource = destrutData;
						console.log(dataSource)
						rowSelectFlags.length = dataSource.length;
						getTotalColHeaders(data.o.tableHead);
						console.log(totalColumnsHeaders);
						var totalColumnsOptions = getColumnsOptions(data.o.tableHead);
						if(handsontable === null){
							handsontable = new Handsontable(tableContainer,{
								data: dataSource,
								hiddenColumns: {
							      columns: [2,3],
							      indicators: false
							    },
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
									document.querySelectorAll("table th")[0].style.display = "none";
								},
								afterChange: function(changes,source){
									if(changes){
										changes.forEach((value) => {
											var data = {};
											// data.testcaseId = handsontable.getDataAtRowProp(value[0], 'casecode');
											data.testcaseId = dataSource[value[0]].testcaseId;
											data.tbHead = value[1];
											data.value = value[3];
											var changedIndex;
											changedData.forEach((value,index) => {
												if(value.testcaseId == data.testcaseId && value.tbHead == data.tbHead){
													changedIndex = index;
												}
											});
											if(changedIndex !== undefined){
												changedData.splice(changedIndex,1,data);
											}else{
												changedData.push(data);
											}
										});
										console.log(changedData.toString());
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
					this.search();
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
		//保存按钮
		document.getElementById('saveAll').onclick = function(){
			var data = { data: changedData };
			console.log(encodeURIComponent(JSON.stringify(data)));
			$.ajax({
				url: address + 'scripttemplateController/scripttemplateInf',
				data: "jsonStr="+encodeURIComponent(JSON.stringify(data),'utf-8'),
				dataType: 'json',
				type: 'post',
				success: function(data,textStatus){
					if(data.success === true){
						alert("hello");
					}
				}
			});
		};
		//双击单元格，跳出编辑数据框
		document.querySelectorAll('.dbclick').onDblClick = function(){
			console.log('niah');
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
		//编辑单元格数据
		function editCellData(key,selection){
			var header = handsontable.getColHeader(selection.start.col);
			var testcaseId = dataSource[selection.start.row].testcaseId;
			$.ajax({
				url: address + '',
				type: 'post',
				data: null,
				dataType: 'json',
				success: function(data,textStatus){
					
				}
			});
			editDataVue.show(selection);
		}
		// 编辑单元格数据
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
	searchBoxDragEnd: function(event,id){
		// console.log(event.clientX);
		this.pointerEnd.X = event.clientX;
		this.pointerEnd.Y = event.clientY;
		document.getElementById(id).style.left = this.pointerEnd.X+'px';
		document.getElementById(id).style.top = this.pointerEnd.Y + document.getElementById(id).offsetHeight/2 + 'px';
	},
	searchBoxDrag: function(event,id){
		this.pointerEnd.X = event.clientX;
		this.pointerEnd.Y = event.clientY;
		document.getElementById(id).style.left = this.pointerEnd.X+'px';
		document.getElementById(id).style.top = this.pointerEnd.Y+ document.getElementById(id).offsetHeight/2+'px';
	}
};