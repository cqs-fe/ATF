var app = new Vue({
    el: '#v-aut',
    data: {
        autList: [],
        checked:[],
        checkboxModel:[],
        apiUrl: 'http://10.108.226.152:8080/ATFCloud/autController/selectAll',
        pageData: {
            pageSize: 10,
            page: 1,
            totalPage: 1
        },
        listnum:10
    },
    ready: function() {

    	// var listnum = $("#autListNum").val();
    	getList(1,10,'id','asc');
        // this.getAut();
        // this.selectAllByPage();
		changeListNum();
    },
    methods: {
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
        getAut: function() {
            this.$http.get(this.apiUrl)
                .then((response) => {
                    this.$set('autList', response.data.obj);
                })
                .catch(function(response) {
                    console.log(response);
                });
        },
    	checkedAll:function(){
    		var _this=this;
    		console.log(_this.checkboxModel);
    		if(this.checked){//反选
    			_this.checkboxModel=[];
    		}else{//全选
    			_this.checkboxModel=[];
    			_this.autList.forEach(function(item){
    				_this.checkboxModel.push(item.id);
    			});
    		}
    	},
        changePage: function(number) {
        	listnum = $("#mySelect").children('option:selected').val();
            this.pageData.page = parseInt(this.pageData.page) + number;
            getList(this.pageData.page,listnum,'id','asc'); //此处的筛选参数可能有变化，根据筛选情况来
        },
        

        insert: function insert() {
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/autController/insert',
                type: 'post',
                data: $("#insertForm").serializeArray(),
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        alert("添加成功！");
                    } else {
                        alert("添加失败！");
                    }
                }
            });
        },
     //    selectAllByPage: function selectAllByPage(){
     //    	var _self=this;
     //    	$.ajax({
     //            url: 'http://10.108.226.152:8080/ATFCloud/autController/selectAllByPage',
     //            type: 'post',
     //            data:{'page':1,'rows':10,'order':'id','sort':'asc'},
     //            success: function(data) {
     //                console.info(data);
					// $.each(function(i,data){
					// 	$("#tableForm").append("<tr><td>"+data.obj[i].id+"</td><td>"+data.obj[i].autCode+"</td><td>"+data.obj[i].autName+"</td><td>"+data.obj[i].version+"</td><td>"+data.obj[i].autType+"</td><td>"+data.obj[i].maincodeBegin+"</td><td>"+data.obj[i].maincodeEnd+"</td></tr>");
					// })
     //            }
     //        });
     //    }

    },
    watch:{//深度watcher
    	'checkboxModel':{
    		handler:function(val,oldVal){
    			if(this.checkboxModel.length === this.autList.length){
    				this.checked=true;
    			}else{
    				this.checked=false;
    			}
    		},
    		deep:true
    	}
    }
});

// $(function(){
// 	getList(app.age, app.grade); //传入初始筛选参数
// });

function getList(page,listnum,order,sort){

	//获取list通用方法，只需要传入多个所需参数
	$.ajax({
		url: 'http://10.108.226.152:8080/ATFCloud/autController/selectAllByPage',
		type: 'GET',
		data:{
            'page':page,
			'rows':listnum,
			'order':order,
			'sort':sort
		},
		success:function(data){
			console.info(data);
			console.info(data.rows);
			// var data = JSON.parse(data);
			app.autList = data.rows;
			var tt = data.total;

			app.pageData.totalPage = Math.ceil(tt/listnum);
			app.pageData.pageSize = listnum;
		}
	});
	// 	$.ajax({
	// 	url: 'data.json',
	// 	type: 'GET',
	// 	data:{
	// 		page: app.pageData.page,
	// 		age: params1,
	// 		grade: params2
	// 	},
	// 	success:function(data){
	// 		var data = JSON.parse(data);
	// 		app.dataList = data.data.rows;
	// 		app.pageData.totalPage = data.data.pageData.totalPage;
	// 		app.pageData.pageSize = data.data.pageData.pageSize;
	// 	}
	// });
}
function changeListNum(){
        	$('#mySelect').change(function(){
			listnum = $(this).children('option:selected').val();
			$("#mySelect").find("option[text='"+listnum+"']").attr("selected",true);
			getList(1,listnum,'id','asc');
})}