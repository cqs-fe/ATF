var app = new Vue({
    el: '#v-aut',
    data: {
        autList: [],
        apiUrl: 'http://10.108.226.152:8080/ATFCloud/autController/selectAll',
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
        queryAutCode: '',
        //当前选中行
        selectedId: '',
        selectedAutCode: '',
        selectedAutName: '',
        selectedAbstractarchitecture_name: '',
        selectedAut_desc: ''
    },
    ready: function() {
        getAut(this.currentPage, this.pageSize, this.order, this.sort);
        changeListNum();
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


        //添加单案例
        insert: function() {
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/autController/insert',
                type: 'post',
                data: $("#insertForm").serializeArray(),
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
        //删除测试系统
        del: function() {
            this.getIds();
            console.log(app.ids)
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/autController/delete',
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
        //修改测试系统
        update: function() {
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/autController/update',
                type: 'post',
                data: $("#updateForm").serializeArray(),
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

        //传递当前页选中测试系统id到功能点页面
        toTransact: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var selectedId = selectedInput.attr('id');
                location.href = "transact.html?selectedId=" + selectedId;
            }
        },
        //传递当前页选中测试系统id到自动化构件维护页面
        toComponent: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var selectedId = selectedInput.attr('id');
                location.href = "component.html?selectedId=" + selectedId;
            }
        },

    },


});

//获取系统
function getAut(page, listnum, order, sort) {

    //获取list通用方法，只需要传入多个所需参数
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/autController/selectAllByPage',
        type: 'GET',
        data: {
            'page': page,
            'rows': listnum,
            'order': order,
            'sort': sort
        },
        success: function(data) {
            console.info(data);
            console.info(data.rows);
            // var data = JSON.parse(data);
            app.autList = data.rows;
            app.tt = data.total;
            app.totalPage = Math.ceil(app.tt / listnum);
            app.pageSize = listnum;
        }
    });

}

//改变页面大小
function changeListNum() {
    $('#mySelect').change(function() {
        listnum = $(this).children('option:selected').val();
        $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
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
    getAut(1, 10, app.order, app.sort);
}
//重新排序 结束

//搜索系统
function queryAut() {
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/autController/selectByPageAndCode',
        type: 'POST',
        data: {
            'page': app.currentPage,
            'rows': app.listnum,
            'order': app.order,
            'sort': app.sort,
            'code': app.queryAutCode
        },
        success: function(data) {
            app.autList = data.rows;
            console.log(app.autList)
            app.tt = data.total;
            app.totalPage = Math.ceil(app.tt / app.listnum);
            app.pageSize = app.listnum;
        }
    });
}
