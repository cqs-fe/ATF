var app = new Vue({
	el: '#v-demo',
	data: {
		isShow:false,
		productList:[],
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
    
        // search:function(){
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
					this.$set('productList', response.data.obj)
				})
				.catch(function(response) {
					console.log(response)
				});
		},
		changePage: function(number){
			this.pageData.page = parseInt(this.pageData.page) + number;
			getList(app.age, app.grade); //此处的筛选参数可能有变化，根据筛选情况来
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