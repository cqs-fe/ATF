var app = new Vue({
    el: '#testroundManage',
    data: {
        testroundList: [],
        tt: "", //总条数
        pageSize: 10, //页面大小
        currentPage: 1, //当前页
        totalPage: 10, //总页数
        listnum: 10, //页面大小
        order: 'id',
        sort: 'asc',
        checkboxModel: [],
        checked: "",
    },
    ready: function() {
        getTestRound();
        $('.3').addClass('open')
        $('.3 .arrow').addClass('open')
        $('.3-ul').css({display: 'block'})
        $('.3-5').css({color: '#ff6c60'})
    },
    methods: {
        //获取选中的id
        getIds: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            app.ids = id_array.join(',');
            $('input[name="id"]').val(id_array.join(','));
        },
        checkedAll: function() {
            var _this = this;
            console.log(_this.checkboxModel);
            if (this.checked) { //反选
                _this.checkboxModel = [];
            } else { //全选
                _this.checkboxModel = [];
                _this.sceneList.forEach(function(item) {
                    _this.checkboxModel.push(item.id);
                });
            }
        },

        //添加测试轮次
        insert: function() {
            $.ajax({
                url: address3+'testroundController/insertTestround',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    roundName: $('#insertForm input[name="roundname"]').val(),
                    roundDesc: $('#insertForm textarea[name="rounddesc"]').val(),
                    recordmanagementflag: $('#insertForm select[name="recordmanagementflag"]').val(),
                    timeexecutesetting: $('#insertForm input[name="timeexecutesetting"]').val() 
                }),
                success: function(data) {
                    // console.info(data);
                    if (data.respCode==0000) {
                        getTestRound();
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
        checkDel(){
            this.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else{
                $('#deleteModal').modal();
            }
        },
        //删除测试轮次
        del: function() {
            $.ajax({
                url: address3 + 'testroundController/deleteTestround',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'id': app.ids
                }),
                success: function(data) {
                    // console.info(data);
                    if (data.respCode==0000) {
                        getTestRound();
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
        //修改测试轮次
        update: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            var id = selectedInput.attr('id');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: address3+'testroundController/updateTestround',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        id: id,
                        roundName: $('#updateForm input[name="roundname"]').val(),
                        roundDesc: $('#updateForm textarea[name="rounddesc"]').val(),
                        recordmanagementflag: $('#updateForm select[name="recordmanagementflag"]').val(),
                        timeexecutesetting: $('#updateForm input[name="timeexecutesetting"]').val() 
                    }),
                    success: function(data) {
                        // console.info(data);
                        if (data.respCode==0000) {
                            getTestRound();
                            $('#successModal').modal();
                        } else {
                            $('#failModal').modal();
                        }
                    },
                    error: function() {
                        $('#failModal').modal();
                    }
                });
            }
        },
        //获取当前选中行内容
        getSelected: function() {
            this.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else{
                var selectedId = selectedInput.attr('id');
                $('#updateForm input[name="id"]').val(selectedId);
                $('#updateForm input[name="roundname"]').val(selectedInput.parent().next().html());
                $('#updateForm textarea[name="rounddesc"]').val(selectedInput.parent().next().next().html());
                $('#updateForm select[name="recordmanagementflag"]').val(selectedInput.parent().next().next().next().attr('data-value'));
                $('#updateForm input[name="timeexecutesetting"]').val(selectedInput.parent().next().next().next().next().html());
                $('#updateModal').modal();
            }
        },

    },
});

//获取测试轮次
function getTestRound() {
    $.ajax({ 
        url: address3+'testroundController/selectAllTestround',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({

        }),
        success: function(data) {
            app.testroundList = data.testroundEntityList;
        }
    });
}
