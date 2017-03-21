var app = new Vue({
    el: '#v-demo',
    data: {
        isShow: false,
        caseNode: '<h3>流程节点用例</h3><div class="form-group"><label class="col-lg-2 control-label">流程节点编号</label><div class="col-lg-4"><input type="text" class="form-control" name="subcasecode"></div><label class="col-lg-2 control-label">动作标识</label><div class="col-lg-4"><input type="text" class="form-control" name="actioncode"></div></div><div class="form-group"><label class="col-lg-2 control-label">被测系统</label><div class="col-lg-4"><select class="form-control" size="1" name="subautid"><option></option></select></div><label class="col-lg-2 control-label">被测系统版本号</label><div class="col-lg-4"><select class="form-control" size="1" name="subversioncode"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">功能码</label><div class="col-lg-4"><select class="form-control" size="1" name="subtransid"><option></option></select></div><label class="col-lg-2 control-label">执行者</label><div class="col-lg-4"><select class="form-control" size="1" name="executor"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行方式</label><div class="col-lg-4"><select class="form-control" size="1" name="executemethod"><option>手工</option><option>自动化</option><option>配合</option></select></div><label class="col-lg-2 control-label">脚本管理方式</label><div class="col-lg-4"><select class="form-control" size="1" name="scriptmode"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">所属模板</label><div class="col-lg-4"><select class="form-control" size="1" name="subscriptmodeflag"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">备注</label><div class="col-lg-10"><textarea class="form-control" rows="3" name="note"></textarea></div></div>',
        productList: [], //案例
        autList: [], //测试系统
        selectedAut: '', //当前选中的测试系统
        userList: [], //用户
        priority: [],
        executeMethod: [],
        casetype: [],
        useStatus: [],
        sortparam: '',
        //apiUrl: '../mock/caseManagement.json',
        tt: "", //总条数
        pageSize: 10, //页面大小
        currentPage: 1, //当前页
        totalPage: 10, //总页数
        listnum: 10, //页面大小
        isPageNumberError: false,
        checkboxModel: [],
        checked: "",
        //ids: ""
    },
    ready: function() {
        getCase(1, 10, 'id', 'asc');
        changeListNum();
        getAut();
        getUser();
    },
    computed: {
        //功能点
        transactList: function() {
            var transactList = [],
                selectedAut = this.$data.selectedAut;
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/transactController/showalltransact',
                type: 'get',
                data: { 'autlistselect': selectedAut },
                success: function(data) {
                    transactList = data.o;
                    console.log(transactList);
                }
            });
        }
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
                        $('#successModal').modal();
                    } else {
                        $('#failModal').modal();
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
                        $('#successModal').modal();
                    } else {
                        $('#failModal').modal();
                    }
                }
            });
        },
        //导出excel
        // exportExcel: function() {
        //     var id_array = new Array();
        //     $('input[name="chk_list"]:checked').each(function() {
        //         id_array.push($(this).attr('id'));
        //     });
        //     app.ids = id_array.join(',');
        //     //console.log(app.ids);
        //     $.ajax({
        //         url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/exportexcel',
        //         type: 'post',
        //         data: {"ids":app.ids,"fanwei":"part"},                  //$("#exportExcel").serializeArray(),
        //         success: function(data) {
        //             console.log(data)
        //             if (data.success) {
        //                 document.location.href="10.108.226.152:8080/ATFCloud/pages?page=testcase"+data;
        //                 //alert("导出成功！");
        //             } else {
        //                 alert("导出失败！");
        //             }
        //         }
        //     });
        // },

        //分配执行者
        executor: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            //app.ids = id_array.join(',');
            $('input[name="ids"]').val(id_array.join(','));
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/excutor',
                type: 'post',
                data: $("#executorForm").serializeArray(),
                success: function(data) {
                    console.info(data.msg);
                    if (data.msg == "完成") {
                        $('#successModal').modal();
                    } else {
                        $('#failModal').modal();
                    }
                }
            });
        },
        //更改执行方式
        execute_method: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            $('input[name="ids"]').val(id_array.join(','));
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/execute_mothord',
                type: 'post',
                data: $("#executeMethodForm").serializeArray(),
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                    } else {
                        $('#failModal').modal();
                    }
                }
            });
        },
        //设置功能点
        transid: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            $('input[name="ids"]').val(id_array.join(','));
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/trans_id',
                type: 'post',
                data: $("#transidForm").serializeArray(),
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                    } else {
                        $('#failModal').modal();
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
        //搜索案例
        searchCase: function(id) {
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/viewtestcase',
                type: 'GET',
                data: { 'id': id },
                success: function() {
                    this.$data.productList = data.o;
                }
            });
        }
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
            // console.info(data);
            // console.info(data.o.rows);
            app.productList = data.o.rows;
            app.tt = data.o.total;
            app.totalPage = Math.ceil(app.tt / listnum);
            app.pageSize = listnum;
        }
    });
}
//获取测试系统
function getAut() {
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/autController/selectAll',
        type: 'GET',
        //data: {},
        success: function(data) {
            // console.info(data);
            // console.info(data.obj);
            app.autList = data.obj;
        }
    });
}
//获取用户
function getUser() {
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/userController/selectAll',
        type: 'GET',
        //data: {},
        success: function(data) {
            // console.info(data);
            //console.info(data.obj);
            app.userList = data.obj;
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


//三级联动
$(document).ready(function(e) {

    yiji(); //第一级函数
    erji(); //第二级函数
    sanji(); //第三极函数
    $("#yiji").change(function() {
        erji(); 
    })
    $("#erji").change(function() {
        sanji();
    })
});

function yiji() {
    $.ajax({
        async: false,
        url: "yiji.php",
        dataType: "TEXT",
        success: function(r) {
            var lie = r.split("|");
            var str = "";
            for (var i = 0; i < lie.length; i++) {

                str += " <option value='" + lie[i] + "' >" + lie[i] + "</option> ";
            }

            $("#yiji").html(str);

        }
    });
}
//二级
function erji() {
    var val = $("#yiji").val();
    $.ajax({
        async: false,
        url: "erji.php",
        dataType: "TEXT",
        data: { e: val },
        type: "POST",
        success: function(r) {
            var lie = r.split("|");
            var str = "";
            for (var i = 0; i < lie.length; i++) {

                str += " <option value='" + lie[i] + "'>" + lie[i] + "</option> ";
            }
            $("#erji").html(str);

        }

    });
}


//三级
function sanji() {

    var val = $("#erji").val();
    if (val !== "") //有些特别行政区没有下一区县，例如香港
    {
        $.ajax({
            url: "sanji.php",
            dataType: "TEXT",
            data: { e: val },
            type: "POST",
            success: function(r) {

                var lie = r.split("|");
                var str = "";
                for (var i = 0; i < lie.length; i++) {

                    str += " <option value='" + lie[i] + "'>" + lie[i] + "</option> ";
                }
                $("#sanji").html(str);

            }

        });
    } else {
        $("#sanji").empty();
    }
}
