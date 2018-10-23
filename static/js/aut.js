var app = new Vue({
    el: '#v-aut',
    data: {
        autList: [],
        tt: 0, //总条数
        pageSize: 10, //页面大小
        currentPage: 1, //当前页
        totalPage: 1, //总页数
        listnum: 10, //页面大小
        order: 'id',
        sort: 'asc',
        isPageNumberError: false,
        checkboxModel: [],
        checked: "",
        queryAutCode: '',
        abstrList:[],//开发架构
        //当前选中行
        selectedId: '',
        selectedAutCode: '',
        selectedAutName: '',
        selectedAbstractarchitecture_name: '',
        selectedAut_desc: ''
    },
    ready: function() {
        getAut(this.currentPage, this.pageSize, this.order, this.sort);
        getAbstr();
        changeListNum();
        $('.2').addClass('open');
        $('.2 .arrow').addClass('open');
        $('.2-ul').css({display: 'block'});
        $('.2-0').css({color: '#ff6c60'});
    },
    methods: {
        //获取选中的id
        getIds: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            //app.ids = id_array.join(',');
            $('input[name="id"]').val(id_array.join(','));
        },
        checkedAll: function() {
            var _this = this;
            console.log(_this.checkboxModel);
            if (this.checked) { //反选
                _this.checkboxModel = [];
            } else { //全选
                _this.checkboxModel = [];
                _this.autList.forEach(function(item) {
                    _this.checkboxModel.push(item.id);
                });
            }
        },
        //turnToPage为跳转到某页
        //传入参数pageNum为要跳转的页数
        turnToPage(pageNum) {
            var ts = this;
            pageNum = parseInt(pageNum);

            //页数不合法则退出
            if (!pageNum || pageNum > ts.totalPage || pageNum < 1) {
                console.log('页码输入有误！');
                ts.isPageNumberError = true;
                return false;
            } else {
                ts.isPageNumberError = false;
            }

            //更新当前页
            ts.currentPage = pageNum;

            //页数变化时的回调
            getAut(ts.currentPage, ts.pageSize, 'id', 'asc');
        },


        //添加
        insert: function() {
            var self=this;
            var code=$('#insertForm input[name="code"]').val(),
                nameMedium=$('#insertForm input[name="nameMedium"]').val(),
                inheriteArcId=$('#insertForm select[name="inheriteArcId"]').val(),
                descShort=$('#insertForm textarea[name="descShort"]').val();
            $.ajax({
                url: address3+'aut/addSingleAut',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'code': code,
                    'nameMedium': nameMedium,
                    'inheriteArcId': inheriteArcId,
                    'descShort': descShort
                }),
                success: function(data) {
                    console.info(data);
                    if (data.respCode==0000) {
                        $('#successModal').modal();
                        getAut(self.currentPage, self.pageSize, self.order, self.sort);
                    } else {
                        // alert(data.respMsg)
                        alert(data.respMsg)
                    }
                },
                error: function() {
                    // alert(data.respMsg)
                    alert(data.respMsg)
                }
            });
        },

        checkDel:()=>{
            app.getIds();
            const selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else{
                $('#deleteModal').modal();
            } 
        },
        //删除测试系统
        del: function() {
            var self=this;
            this.getIds();
            console.log(app.ids)
            $.ajax({
                url: address3+'autController/delete',
                type: 'post',
                data: {
                    'ids': app.ids
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                        getAut(self.currentPage, self.pageSize, self.order, self.sort);
                    } else {
                        // alert(data.respMsg)
                        alert(data.respMsg)
                    }
                },
                error: function() {
                    // alert(data.respMsg)
                    alert(data.respMsg)
                }
            });
        },

        checkUpdate:()=>{
            app.getSelected();
            const selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else{
                $('#updateModal').modal();
            } 
        },
        //修改测试系统
        update: function() {
            var self=this;
            var id=$('#updateForm input[name="id"]').val(),
                code=$('#updateForm input[name="code"]').val(),
                nameMedium=$('#updateForm input[name="nameMedium"]').val(),
                inheriteArcId=$('#updateForm select[name="inheriteArcId"]').val(),
                descShort=$('#updateForm textarea[name="descShort"]').val();
            $.ajax({
                url: address3+'aut/modifySingleAut',
                type: 'post',
                contentType:'application/json',
                data: JSON.stringify({
                    'id': id,
                    'code': code,
                    'nameMedium': nameMedium,
                    'inheriteArcId': inheriteArcId,
                    'descShort': descShort
                }),
                success: function(data) {
                   if (data.respCode==0000) {
                        $('#successModal').modal();
                        getAut(self.currentPage, self.pageSize, self.order, self.sort);
                    } else {
                        alert(data.respMsg)
                    }
                },
                error: function() {
                    alert(data.respMsg)
                }
            });
        },
        //获取当前选中行内容
        getSelected: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            var selectedId = selectedInput.attr('id');
            $('input[name="id"]').val(selectedId);
            $('#updateForm input[name="code"]').val(selectedInput.parent().next().children().html());
            $('#updateForm input[name="nameMedium"]').val(selectedInput.parent().next().next().html());
            $('#updateForm select[name="inheriteArcId"]').val(selectedInput.parent().next().next().next().data('id'));
            $('#updateForm textarea[name="descShort"]').val(selectedInput.parent().next().next().next().next().html());
        },

        //传递当前页选中测试系统id到功能点页面
        toTransact: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var selectedId = selectedInput.attr('id');
                var selectedName=selectedInput.parent().next().next().html();
                sessionStorage.setItem("autId", selectedId);
                sessionStorage.setItem("autName", selectedName); 
                location.href = "transact.html";
            }
        },
                //传递当前页选中测试系统id到功能点页面
        linkToTransact: function(selectedId,selectedName) {
            sessionStorage.setItem("autId", selectedId);
            sessionStorage.setItem("autName", selectedName); 
            location.href = "transact.html";
        },
        //传递当前页选中测试系统id到自动化构件维护页面
        toComponent: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var selectedId = selectedInput.attr('id');
                var selectedName=selectedInput.parent().next().next().html();
                sessionStorage.setItem("autId", selectedId);
                sessionStorage.setItem("autName", selectedName); 
                location.href = "component.html";
            }
        },
        //传递当前页选中测试系统id和名称到配置系统数据页面
        toAutdata: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var selectedId = selectedInput.attr('id');
                var selectedName=selectedInput.parent().next().next().html();
                sessionStorage.setItem("autId", selectedId);
                sessionStorage.setItem("autName", selectedName); 
                location.href = "autdata.html";
            }
        },
        //传递当前页选中测试系统id和名称到执行代码管理页面
        toExeccode: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var selectedId = selectedInput.attr('id');
                var selectedName=selectedInput.parent().next().next().html();
                sessionStorage.setItem("autId", selectedId);
                sessionStorage.setItem("autName", selectedName); 
                location.href = "execcode.html";
            }
        },
        //时间格式化
        formatDate(date){
            if(date){
                var date = new Date(date);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
                return Y+M+D+h+m+s;  
            }else{
                return '';
            }     
        }
    },


});

//获取系统
function getAut(page, listnum, order, sort) {

    //获取list通用方法，只需要传入多个所需参数
    $.ajax({
        url: address3+'aut/pagedBatchQueryAut',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            'currentPage': page,
            'pageSize': listnum,
            'orderColumns': "modified_time",
            "orderType":"DESC",
        }),
        success: function(data) {
            // console.info(data);
            // var data = JSON.parse(data);
            app.autList = data.autRespDTOList;
            app.tt = data.totalCount;
            app.totalPage = data.totalPage;
            app.pageSize = listnum;
        }
    });

}

//改变页面大小
function changeListNum() {
    $('#mySelect').change(function() {
        listnum = $(this).children('option:selected').val();
        $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
        app.currentPage=1;
        getAut(1, listnum, 'id', 'asc');
    })
}

//全选反选
$("#chk_all").click(function() {　　
    $("input[name='chk_list']").prop("checked", $(this).prop("checked"));　
});

//重新排序
function resort(target) {
    var spans = target.parentNode.getElementsByTagName("span");
    for (var span in spans) {
        if (spans[span].nodeName === "SPAN") {
            spans[span].setAttribute("class", "");
        }
    }
    if (target.getAttribute("data-sort") === "desc") {
        app.sort = "asc";
        target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-up")
        target.setAttribute("data-sort", "asc");
    } else {
        app.sort = "desc";
        target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-down")
        target.setAttribute("data-sort", "desc");
    }
    app.order = target.getAttribute("data-order");
    getAut(1, app.pageSize, app.order, app.sort);
}
//重新排序 结束

//搜索系统
function queryAut() {
    $.ajax({
        url: address3+'aut/pagedBatchQueryAut',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            'currentPage': app.currentPage,
            'pageSize': app.pageSize,
            'orderColumns': 'id',
            'orderType': 'asc',
            'code': app.queryAutCode
        }),
        success: function(data) {
            app.autList = data.autRespDTOList;
            app.tt = data.totalCount;
            app.totalPage = data.totalPage;
            app.pageSize = app.listnum;
        }
    });
}

//获取addModal 开发架构select下拉列表
function getAbstr(){
    $.ajax({
        url: address3+'abstractArchitecture/queryArchitectureList',
        type:'post',
        success:function(data){
            // console.log(data)
            app.abstrList=data.architectureRespDTOList;
        }
    });
}