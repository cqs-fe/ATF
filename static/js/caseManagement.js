var app = new Vue({
    el: '#v-demo',
    data: {
        isShow: false,
        caseNodeNum: 0,
        caseNode: '</h3><div class="form-group"><label class="col-lg-2 control-label hidden">用例组成类型</label><div class="col-lg-4 hidden"><input type="text" class="form-control" name="caseCompositeType" value="3"></div><label class="col-lg-2 control-label">流程节点编号</label><div class="col-lg-4"><input type="text" class="form-control" name="subcasecode"></div><label class="col-lg-2 control-label">动作标识</label><div class="col-lg-4"><input type="text" class="form-control" name="actioncode"></div></div><div class="form-group"><label class="col-lg-2 control-label">被测系统</label><div class="col-lg-4"><select class="form-control" size="1" name="subautid" id=""></select></div><label class="col-lg-2 control-label">被测系统版本号</label><div class="col-lg-4"><input class="form-control" name="subversioncode"></div></div><div class="form-group"><label class="col-lg-2 control-label">功能码</label><div class="col-lg-4"><select class="form-control" size="1" name="subtransid"><option></option></select></div><label class="col-lg-2 control-label">所属模板</label><div class="col-lg-4"><select class="form-control" size="1" name="subscriptmodeflag"></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行方式</label><div class="col-lg-4"><select class="form-control" size="1" name="executemethod"><option>手工</option><option>自动化</option><option>配合</option></select></div><label class="col-lg-2 control-label">脚本管理方式</label><div class="col-lg-4"><select class="form-control" size="1" name="scriptmode"><option>模板</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行者</label><div class="col-lg-4"><select class="form-control" size="1" name="executor"><option v-for="user in users" value="{{user.id}}">{{user.username}}</option></select></div><label class="col-lg-2 control-label">测试顺序</label><div class="col-lg-4"><input class="form-control" name="steporder"></div></div><div class="form-group"><label class="col-lg-2 control-label">用例使用状态</label><div class="col-lg-4"><select class="form-control" size="1" name="subusestatus"><option value="1">新增</option><option value="2">评审通过</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">备注</label><div class="col-lg-10"><textarea class="form-control" rows="3" name="note"></textarea></div></div>',
        productList: [], //案例
        users: [], //所有用户
        priority: [], // 优先级
        executeMethod: [], // 执行方式
        caseCompositeType: '', // 用例组成类型
        useStatus: [], // 用例状态
        testpoint: '', // 测试点
        author: '', //编写者
        executor: '', //执行者
        testdesign: '', //测试意图
        autid: '', //被测系统
        transid: '', //功能码
        scriptmodeflag: '', //脚本模板
        casecode: '', //搜索时输入的案例编号
        sortparam: '', //排序参数
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
    },
    ready: function() {
        getCase(1, 10, 'id', 'asc');
        changeListNum();
        getUsers();
    },
    methods: {

        //添加单用例
        insert: function() {
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/import111',
                type: 'post',
                data: $("#insertSingleForm").serializeArray(),
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
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },

        //获取选中的id
        getIds: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            //app.ids = id_array.join(',');
            $('input[name="ids"]').val(id_array.join(','));
        },

        //分配执行者
        executor: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
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
                },
                error: function() {
                    $('#failModal').modal();
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
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        //设置功能点及模板脚本
        transid: function() {
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
                },
                error: function() {
                    $('#failModal').modal();
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
            this.caseNodeNum++;
            var cNode = $('<h3>流程节点用例' + this.caseNodeNum + this.caseNode);
            var element = $("#addCaseNode").append(cNode);
            this.$compile(element.get(0));
            getUsers();
            diyi(); //第一级函数
            dier(); //第二级函数
            disan(); //第三极函数
            $('select[name="subautid"]').change(function() {
                dier();
                disan();
            });
            $('select[name="subautid"]').parent().parent().next().find('select[name="subtransid"]').change(function() {
                disan();
            });
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
//获取用户
function getUsers() {
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/userController/selectAll',
        type: 'GET',
        success: function(data) {
            // console.info(data);
            // console.info(data.o.rows);
            app.users = data.obj;
        }
    });
}
//筛选查询用例
function queryCase() {
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/TestcaseController/testcasequeryByPage',
        type: 'POST',
        data: {
            'page': app.currentPage,
            'rows': app.listnum,
            'order': app.order,
            'sort': app.sort,
            'caseCompositeType': app.caseCompositeType,
            'priority': app.priority.join(","),
            'executemethod': app.executeMethod.join(","),
            'usestatus': app.useStatus.join(","),
            'casecode': app.casecode,
            'informationtype': 'testcase',
            'testpoint': app.testpoint,
            'author': app.author,
            'executor': app.executor,
            'testdesign': app.testdesign,
            'autid': app.autid,
            'transid': app.transid,
            'scriptmodeflag': app.scriptmodeflag,

        },
        success: function(data) {
            app.productList = data.o.rows;
            app.tt = data.o.total;
            app.totalPage = Math.ceil(app.tt / app.listnum);
            app.pageSize = app.listnum;
        },
        error: function() {
            $('#failModal').modal();
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
    $('select[name="autid"]').change(function() {
        erji();
        sanji();
    })
    $('select[name="autid"]').parent().parent().next().find('select[name="transid"]').change(function() {

        sanji();
    })
});

//一级 测试系统
function yiji() {
    $.ajax({
        async: false,
        url: "http://10.108.226.152:8080/ATFCloud/autController/selectAll",
        type: "POST",
        success: function(data) {
            var autList = data.obj;
            var str = "";
            for (var i = 0; i < autList.length; i++) {

                str += " <option value='" + autList[i].id + "' >" + autList[i].autName + "</option> ";
            }

            $('select[name="autid"]').html(str);

        }
    });
}

//二级 功能点
function erji() {
    var val = $('select[name="autid"]').val();
    $.ajax({
        async: false,
        url: 'http://10.108.226.152:8080/ATFCloud/transactController/showalltransact',
        data: { 'autlistselect': val },
        type: "POST",
        success: function(data) {
            var transactList = data.o;
            var str = "";
            for (var i = 0; i < transactList.length; i++) {

                str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
            }
            $('select[name="autid"]').parent().parent().next().find('select[name="transid"]').html(str);

        }

    });
}

//三级 模板脚本
function sanji() {

    var val = $('select[name="autid"]').parent().parent().next().find('select[name="transid"]').val();

    $.ajax({
        url: "http://10.108.226.152:8080/ATFCloud/scripttemplateController/showallscripttemplate",
        data: { "transactid": val },
        type: "POST",
        success: function(data) {

            var lie = data.o;
            var str = "";
            for (var i = 0; i < lie.length; i++) {

                str += " <option value='" + lie[i].id + "'>" + lie[i].name + "</option> ";
            }
            $('select[name="autid"]').parent().parent().next().find('select[name="scriptmodeflag"]').html(str);


        }

    });
}

//3级联动 设置功能点及模板脚本
$(document).ready(function(e) {

    first(); //第一级函数
    second(); //第二级函数
    third(); //第三极函数
    $("#1ji").change(function() {
        second();
        third();
    })
    $("#2ji").change(function() {
        third();
    })
});

//一级 测试系统
function first() {
    $.ajax({
        async: false,
        url: "http://10.108.226.152:8080/ATFCloud/autController/selectAll",
        type: "POST",
        success: function(data) {
            var autList = data.obj;
            var str = "";
            for (var i = 0; i < autList.length; i++) {

                str += " <option value='" + autList[i].id + "' >" + autList[i].autName + "</option> ";
            }

            $("#1ji").html(str);


        }
    });
}


//二级 功能点
function second() {
    var val = $("#1ji").val();
    $.ajax({
        async: false,
        url: 'http://10.108.226.152:8080/ATFCloud/transactController/showalltransact',
        data: { 'autlistselect': val },
        type: "POST",
        success: function(data) {
            var transactList = data.o;
            var str = "";
            for (var i = 0; i < transactList.length; i++) {

                str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
            }
            $("#2ji").html(str);

        }

    });
}

//三级 模板脚本
function third() {

    var val = $("#2ji").val();

    $.ajax({
        url: "http://10.108.226.152:8080/ATFCloud/scripttemplateController/showallscripttemplate",
        data: { "transactid": val },
        type: "POST",
        success: function(data) {

            var lie = data.o;
            var str = "";
            for (var i = 0; i < lie.length; i++) {

                str += " <option value='" + lie[i].id + "'>" + lie[i].name + "</option> ";
            }
            $("#3ji").html(str);


        }

    });


}

//子流程节点部分
//一级 测试系统
function diyi() {
    $.ajax({
        async: false,
        url: "http://10.108.226.152:8080/ATFCloud/autController/selectAll",
        type: "POST",
        success: function(data) {
            var autList = data.obj;
            var str = "";
            for (var i = 0; i < autList.length; i++) {

                str += " <option value='" + autList[i].id + "' >" + autList[i].autName + "</option> ";
            }

            $('select[name="subautid"]').html(str);

        }
    });
}

//二级 功能点
function dier() {
    var val = $('select[name="subautid"]').val();
    $.ajax({
        async: false,
        url: 'http://10.108.226.152:8080/ATFCloud/transactController/showalltransact',
        data: { 'autlistselect': val },
        type: "POST",
        success: function(data) {
            var transactList = data.o;
            var str = "";
            for (var i = 0; i < transactList.length; i++) {

                str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
            }
            $('select[name="subautid"]').parent().parent().next().find('select[name="subtransid"]').html(str);

        }

    });
}

//三级 模板脚本
function disan() {

    var val = $('select[name="subautid"]').parent().parent().next().find('select[name="subtransid"]').val();

    $.ajax({
        url: "http://10.108.226.152:8080/ATFCloud/scripttemplateController/showallscripttemplate",
        data: { "transactid": val },
        type: "POST",
        success: function(data) {

            var lie = data.o;
            var str = "";
            for (var i = 0; i < lie.length; i++) {

                str += " <option value='" + lie[i].id + "'>" + lie[i].name + "</option> ";
            }
            $('select[name="subautid"]').parent().parent().next().find('select[name="subscriptmodeflag"]').html(str);

        }

    });

}

//设置功能点及模板脚本
function transid() {
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
        },
        error: function() {
            $('#failModal').modal();
        }
    });
}
//分配执行者
function executor() {
    var id_array = new Array();
    $('input[name="chk_list"]:checked').each(function() {
        id_array.push($(this).attr('id'));
    });
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
        },
        error: function() {
            $('#failModal').modal();
        }
    });
}
