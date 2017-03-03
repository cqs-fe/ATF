var app = new Vue({
	el: '#v-demo',
	data: {
		isShow:false,
		caseNode:'<h3>流程节点用例</h3><div class="form-group"><label class="col-lg-2 control-label">流程节点编号</label><div class="col-lg-4"><input type="text" class="form-control"></div><label class="col-lg-2 control-label">动作标识</label><div class="col-lg-4"><input type="text" class="form-control"></div></div><div class="form-group"><label class="col-lg-2 control-label">被测系统</label><div class="col-lg-4"><select class="form-control" size="1"><option></option></select></div><label class="col-lg-2 control-label">被测系统版本号</label><div class="col-lg-4"><select class="form-control" size="1"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">功能码</label><div class="col-lg-4"><select class="form-control" size="1"><option></option></select></div><label class="col-lg-2 control-label">执行者</label><div class="col-lg-4"><select class="form-control" size="1"><option>葛晋鹏</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行方式</label><div class="col-lg-4"><select class="form-control" size="1"><option></option></select></div><label class="col-lg-2 control-label">脚本管理方式</label><div class="col-lg-4"><select class="form-control" size="1"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">所属模板</label><div class="col-lg-4"><select class="form-control" size="1"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">备注</label><div class="col-lg-10"><textarea class="form-control" rows="3"></textarea></div></div>',
		productList:[],
		selectArr:[],
		apiUrl:'http://10.108.226.152:8080/ATFCloud/autController/selectAll',
		pageData:{
			pageSize: 10,
			page: 1,
			totalPage: 1
		},
		age: 24, //筛选参数
		grade: '大三', //筛选参数
	},
	ready:function(){
		this.getCase();
	},
	methods: {
		toggle: function() {
                this.isShow = !this.isShow;
        },
    
        // getCase:function(){
        // 	var _self=this;
        // 	$.ajax({
        // 		type:'GET',
        // 		url:'http://10.108.226.152:8080/ATFCloud/autController/selectAll',
        // 		success:function(data){
        // 			_self.productList=data;
        // 		}
        // 	});
        // },
        getCase: function() {
			this.$http.get(this.apiUrl)
				.then((response) => {
					this.$set('productList', response.data.obj);
				})
				.catch(function(response) {
					console.log(response);
				});
		},
		selectAll:function(){
			var _this=this;
			console.log(event.currentTarget);
			if(!event.currentTarget.checked){
				this.selectArr=[];
			}else{//实现全选
				_this.selectArr=[];
				_this.productList.forEach(function(item,i){
					_this.selectArr.push(i);
				});
			}
		},
		changePage: function(number){
			this.pageData.page = parseInt(this.pageData.page) + number;
			getList(app.age, app.grade); //此处的筛选参数可能有变化，根据筛选情况来
		},
		addCaseNode:function(){
			var element=$("#addCaseNode").append(this.caseNode);
			this.$compile(element.get(0));
		}
	}
});

// $(function(){
// 	getList(app.age, app.grade); //传入初始筛选参数
// });

// function getList(params1, params2){
// 	//获取list通用方法，只需要传入多个所需参数
// 	$.ajax({
// 		url: 'data.json',
// 		type: 'GET',
// 		data:{
// 			page: app.pageData.page,
// 			age: params1,
// 			grade: params2
// 		},
// 		success:function(data){
// 			var data = JSON.parse(data);
// 			app.dataList = data.data.rows;
// 			app.pageData.totalPage = data.data.pageData.totalPage;
// 			app.pageData.pageSize = data.data.pageData.pageSize;
// 		}
// 	});
// }