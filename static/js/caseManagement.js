var app = new Vue({
    el: '#v-demo',
    data: {
        isShow: false,
        caseNode: '<h3>流程节点用例</h3><div class="form-group"><label class="col-lg-2 control-label">流程节点编号</label><div class="col-lg-4"><input type="text" class="form-control" name="subcasecode"></div><label class="col-lg-2 control-label">动作标识</label><div class="col-lg-4"><input type="text" class="form-control" name="actioncode"></div></div><div class="form-group"><label class="col-lg-2 control-label">被测系统</label><div class="col-lg-4"><select class="form-control" size="1" name="subautid"><option></option></select></div><label class="col-lg-2 control-label">被测系统版本号</label><div class="col-lg-4"><select class="form-control" size="1" name="subversioncode"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">功能码</label><div class="col-lg-4"><select class="form-control" size="1" name="subtransid"><option></option></select></div><label class="col-lg-2 control-label">执行者</label><div class="col-lg-4"><select class="form-control" size="1" name="executor"><option>葛晋鹏</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行方式</label><div class="col-lg-4"><select class="form-control" size="1" name="executemethod"><option></option></select></div><label class="col-lg-2 control-label">脚本管理方式</label><div class="col-lg-4"><select class="form-control" size="1" name="scriptmode"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">所属模板</label><div class="col-lg-4"><select class="form-control" size="1" name="subscriptmodeflag"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">备注</label><div class="col-lg-10"><textarea class="form-control" rows="3" name="note"></textarea></div></div>',
        productList: [],
        priority: [],
        executeMethod: [],
        casetype: [],
        useStatus: [],
        sortparam: '',
        //apiUrl: '../mock/caseManagement.json',
        pageSize: 10, //页面大小
        currentPage: 1, //当前页
        totalPage: 10, //总页数
        listnum: 10, //页面大小
        isPageNumberError: false,
        checkboxModel: [],
        checked: "",
        ids: ""
    },
    ready: function() {
        getCase(1, 10, 'id', 'asc');
        changeListNum();
    },

    methods: {
        //添加用例
        insert: function() {
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/import11',
                type: 'post',
                data: $("#insertSingleForm").serializeArray(),
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
        //导入excel
        importExcel: function() {
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/importexcel',
                type: 'post',
                data: $("#importExcel").serializeArray(),
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        alert("导入成功！");
                    } else {
                        alert("导入失败！");
                    }
                }
            });
        },
        //导出excel
        exportExcel: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            app.ids = id_array.join(',');
            //console.log(app.ids);
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/exportexcel',
                type: 'post',
                data:$("#exportExcel").serializeArray(),
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        alert("导出成功！");
                    } else {
                        alert("导出失败！");
                    }
                }
            });
        },

        //分配执行者
        executor: function() {
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/excutor',
                type: 'post',
                data: $("#executorForm").serializeArray(),
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        alert("分配成功！");
                    } else {
                        alert("分配失败！");
                    }
                }
            });
        },
        //更改执行方式
        executeMethod: function() {
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/execute_mothord',
                type: 'post',
                data: $("#executeMethodForm").serializeArray(),
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        alert("更改成功！");
                    } else {
                        alert("更改失败！");
                    }
                }
            });
        },
        //设置功能点
        transid: function() {
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/trans_id',
                type: 'post',
                data: $("#transidForm").serializeArray(),
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        alert("设置成功！");
                    } else {
                        alert("设置失败！");
                    }
                }
            });
        },
        // 筛选按钮显示隐藏
        toggle: function() {
            this.isShow = !this.isShow;
        },

        // 排序
        sortBy: function(sortparam) {
            this.sortparam = sortparam;
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
            getCase(ts.currentPage, ts.pageSize, 'id', 'asc');
        },
        // 流程用例添加节点用例
        addCaseNode: function() {
            var element = $("#addCaseNode").append(this.caseNode);
            this.$compile(element.get(0));
        },

    },

});
//获取案例
function getCase(currentPage, listnum, order, sort) {
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/selectAllByPage',
        type: 'GET',
        data: {
            'page': currentPage,
            'rows': listnum,
            'order': order,
            'sort': sort
        },
        success: function(data) {
            console.info(data);
            console.info(data.o.rows);
            app.productList = data.o.rows;
            var tt = data.o.total;
            app.totalPage = Math.ceil(tt / listnum);
            app.pageSize = listnum;
        }
    });
}
//改变页面大小
function changeListNum() {
    $('#mySelect').change(function() {
        listnum = $(this).children('option:selected').val();
        $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
        getCase(1, listnum, 'id', 'asc');
    })
}
//全选反选
$("#chk_all").click(function() {　　
    $("input[name='chk_list']").prop("checked", $(this).prop("checked"));　
});

