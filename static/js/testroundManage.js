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
        isPageNumberError: false,
        checkboxModel: [],
        checked: "",
        querySceneId: '',
        //当前选中行
        selectedId: '',
        selectedSceneCode: '',
        selectedSceneName: '',
        selectedAbstractarchitecture_name: '',
        selectedScene_desc: ''
    },
    ready: function() {
        getTestRound();
        // getScene(this.currentPage, this.pageSize, this.order, this.sort);
        // changeListNum();
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
        //turnToPage为跳转到某页
        //传入参数pageNum为要跳转的页数
        // turnToPage(pageNum) {
        //     var ts = this;
        //     pageNum = parseInt(pageNum);

        //     //页数不合法则退出
        //     if (!pageNum || pageNum > ts.totalPage || pageNum < 1) {
        //         console.log('页码输入有误！');
        //         ts.isPageNumberError = true;
        //         return false;
        //     } else {
        //         ts.isPageNumberError = false;
        //     }

        //     //更新当前页
        //     ts.currentPage = pageNum;

        //     //页数变化时的回调
        //     getScene(ts.currentPage, ts.pageSize, 'id', 'asc');
        // },


        //添加测试轮次
        insert: function() {
            $.ajax({
                url: address+'testroundController/insert',
                type: 'post',
                data: $("#insertForm").serializeArray(),
                success: function(data) {
                    console.info(data);
                    if (data.success) {
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
        //删除测试轮次
        del: function() {
            this.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: address+'testroundController/delete',
                    type: 'post',
                    data: {
                        'id': app.ids
                    },
                    success: function(data) {
                        console.info(data);
                        if (data.success) {
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
        //修改测试轮次
        update: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                $.ajax({
                    url: address+'testroundController/update',
                    type: 'post',
                    data: $('#updateForm').serializeArray(),
                    success: function(data) {
                        console.info(data);
                        if (data.success) {
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
            var selectedInput = $('input[name="chk_list"]:checked');
            var selectedId = selectedInput.attr('id');
            $('#updateForm input[name="id"]').val(selectedId);
            $('#updateForm input[name="roundname"]').val(selectedInput.parent().next().html());
            $('#updateForm textarea[name="rounddesc"]').val(selectedInput.parent().next().next().html());
            $('#updateForm select[name="recordmanagementflag"]').val(selectedInput.parent().next().next().next().attr('data-value'));
            $('#updateForm input[name="timeexecutesetting"]').val(selectedInput.parent().next().next().next().next().html());
        },

    },


});

//获取场景
// function getScene(page, listnum, order, sort) {
//     //获取list通用方法，只需要传入多个所需参数
//     $.ajax({
//         url: 'http://10.108.226.152:8080/ATFCloud/sceneController/selectAllByPage',
//         type: 'GET',
//         data: {
//             'page': page,
//             'rows': listnum,
//             'order': order,
//             'sort': sort
//         },
//         success: function(data) {
//             app.sceneList = data.rows;
//             app.tt = data.total;
//             app.totalPage = Math.ceil(app.tt / listnum);
//             app.pageSize = listnum;
//         }
//     });

// }

//获取测试轮次
function getTestRound() {
    $.ajax({
        url: address+'testroundController/selectAll',
        type: 'post',
        success: function(data) {
            app.testroundList = data.obj;
        }
    });
}

//改变页面大小
// function changeListNum() {
//     $('#mySelect').change(function() {
//         listnum = $(this).children('option:selected').val();
//         $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
//         getScene(1, listnum, 'id', 'asc');
//     });
// }

//全选反选
// $("#chk_all").click(function() {　　
//     $("input[name='chk_list']").prop("checked", $(this).prop("checked"));　
// });

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
    getScene(1, 10, app.order, app.sort);
}
//重新排序 结束

//搜索场景
// function queryScene() {
//     $.ajax({
//         url: 'http://10.108.226.152:8080/ATFCloud/sceneController/selectByPrimaryKey',
//         type: 'POST',
//         data: {
//             'page': app.currentPage,
//             'rows': app.listnum,
//             'order': app.order,
//             'sort': app.sort,
//             'id': app.querySceneId
//         },
//         success: function(data) {
//             app.sceneList = data.rows;
//             console.log(app.sceneList);
//             app.tt = data.total;
//             app.totalPage = Math.ceil(app.tt / app.listnum);
//             app.pageSize = app.listnum;
//         }
//     });
// }
