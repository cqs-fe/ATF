var app = new Vue({
    el: '#testRecord',
    data: {
        recordList: [], //测试记录
        testPhaseList:[],//测试阶段下拉列表
        testRoundList:[],//测试轮次下拉列表
        recorderstate:'2',//记录单状态
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
        queryRecordId: '',
        //当前选中行
        selectedId: '',
        selectedRecordCode: '',
        selectedRecordName: '',
        selectedAbstractarchitecture_name: '',
        selectedRecord_desc: '',
        searchKey:'', //搜索条件
        searchVal: '',
    },
    ready: function() {
        let id = document.location.search.slice(1).split('=')[1];console.log(id); 
        getRecord(id, this.currentPage, this.pageSize, this.order, this.sort);

        // changeListNum();

        $('.3').addClass('open')
		$('.3 .arrow').addClass('open')
		$('.3-ul').css({display: 'block'})
		$('.3-8').css({color: '#ff6c60'})
    },
    methods: {
        //获取选中的id
        getIds: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            app.ids = id_array.join(',');
            // $('input[name="id"]').val(id_array.join(','));
        },
        checkedAll: function() {
            var _this = this;
            console.log(_this.checkboxModel);
            if (this.checked) { //反选
                _this.checkboxModel = [];
            } else { //全选
                _this.checkboxModel = [];
                _this.RecordList.forEach(function(item) {
                    _this.checkboxModel.push(item.id);
                });
            }
        },
        // turnToPage为跳转到某页
        // 传入参数pageNum为要跳转的页数
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
            getRecord(ts.currentPage, ts.pageSize, 'id', 'asc');
        },
        viewCase: function (sceneId, caseid, sourcechannel) {
			var o = {
				sceneId, caseid,
				testPhase: this.testphaseValue,
				testRound: this.testroundValue,
				// executeround: this.executionround,
				sourcechannel: sourcechannel,
				recorderStatus: '2'
			}
			var args = encodeURIComponent(JSON.stringify(o));
			window.open('case-operation.html?activeName=exec-record&viewcaseargs='+args, 'case_record');
		},
        //合并
        merge: function(){
            $.ajax({
                url: address+'testrecordController/merge',
                type:'post',
                data: $('#mergeForm').serializeArray(),
                success:function(data){
                    if (data.success) {
                        $('#successModal').modal();
                    } else {
                        $('#failModal').modal();
                    }
                }
            });
        },
        //删除
        del: function() {
            this.getIds();
            console.log(app.ids);
            $.ajax({
                url: address+'testrecordController/batchDelete',
                type: 'post',
                data: {
                    'ids': app.ids
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },

        //获取当前选中行内容
        getSelected: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            var selectedId = selectedInput.attr('id');
            $('input[name="id"]').val(selectedId);
            $('#updateForm input[name="autCode"]').val(selectedInput.parent().next().html());
            $('#updateForm input[name="autName"]').val(selectedInput.parent().next().next().html());
            $('#updateForm input[name="abstractarchitecture_name"]').val(selectedInput.parent().next().next().next().html());
            $('#updateForm textarea[name="aut_desc"]').val(selectedInput.parent().next().next().next().next().html());
        },

    },


});

//获取测试记录
function getRecord(id) {
    //获取list通用方法，只需要传入多个所需参数
    $.ajax({
        url: address2 + 'testRecord/selectByRunId',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            runId: id
        }),
        success: function(data) {console.log(data);
            if (data.respCode === '0000') {
                app.recordList = data.list;
                // app.tt = data.batchRunCtrlEntities[0] ?  data.batchRunCtrlEntities[0].page.totalCount : 0;
                // app.totalPage = data.batchRunCtrlEntities[0] ?  data.batchRunCtrlEntities[0].page.totalPage : 0;
                // app.pageSize = data.batchRunCtrlEntities[0] ?  data.batchRunCtrlEntities[0].page.pageSize : 0;
            } else {
                app.recordList = [];
                // app.tt = 0;
                // app.totalPage = 0;
                // app.pageSize = 5;
            }
        }
    });

}
//获取测试阶段
function getTestPhase(){
    $.ajax({
        url: address+'testphaseController/selectAll',
        type: 'get',
        success:function(data){
            app.testPhaseList=data.obj;
        }
    });
}
//获取测试轮次
function getTestRound(){
    $.ajax({
        url: address+'testroundController/selectAll',
        type: 'get',
        success: function(data){
            app.testRoundList=data.obj;
        }
    });
}
//获取场景
function getScene(){
    $.ajax({
        url: address+'sceneController/selectAll',
        type: 'get',
        success:function(data){
            app.sceneList=data.obj;
        }
    });
}
//改变页面大小
function changeListNum() {
    $('#mySelect').change(function() {
        listnum = $(this).children('option:selected').val();
        $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
         app.currentPage=1;
        getRecord(1, listnum, 'id', 'asc');
    });
}

//全选反选
$("#chk_all").click(function() {　　
    $("input[name='chk_list']").prop("checked", $(this).prop("checked"));　
});

//重新排序
// function resort(target) {
//     var spans = target.parentNode.getElementsByTagName("span");
//     for (var span in spans) {
//         if (spans[span].nodeName === "SPAN") {
//             spans[span].setAttribute("class", "");
//         }
//     }
//     if (target.getAttribute("data-sort") === "desc") {
//         app.sort = "asc";
//         target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-up")
//         target.setAttribute("data-sort", "asc");
//     } else {
//         app.sort = "desc";
//         target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-down")
//         target.setAttribute("data-sort", "desc");
//     }
//     app.order = target.getAttribute("data-order");
//     getRecord(1, 10, app.order, app.sort);
// }
//重新排序 结束

//搜索测试记录
function queryRecord() {
    $.ajax({
        url: address+'testrecordController/selectByPage',
        type: 'POST',
        data: {
            'page': app.currentPage,
            'rows': app.listnum,
            'order': app.order,
            'sort': app.sort,
            'testPhase': app.testphase,
            'testRound':app.testround,
            'recorderstate':app.recorderstate
        },
        success: function(data) {
            app.recordList = data.rows;
            app.tt = data.total;
            app.totalPage = Math.ceil(app.tt / app.listnum);
            // app.pageSize = app.listnum;
        }
    });
}
