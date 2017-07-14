var app = new Vue({
    el: '#v-autdata',
    data: {
        autdataList: [],
        tt: 0, //总条数
        pageSize: 10, //页面大小
        currentPage: 1, //当前页
        totalPage: 1, //总页数
        listnum: 10, //页面大小
        order: 'id',
        sort: 'asc',
        isPageNumberError: false,
        ids: []
    },
    ready: function() {
        autSelect();
        setval();
        changeListNum();
        $('#autSelect').change(function() {
            queryautdata();
        });
    },
    methods: {
        //获取选中的id
        getIds: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            app.ids = id_array.join(',');
            // $('input[name="ids"]').val(id_array.join(','));
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
            getautdata(ts.currentPage, ts.pageSize, 'id', 'asc');
        },
        //添加功能点
        insert: function() {
            $('#insertForm input[name="autid"]').val($('#autSelect').val()),
                $.ajax({
                    url: address+'autdataController/insertautdata',
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
        //删除功能点
        del: function() {
            this.getIds();
            console.log(app.ids)
            $.ajax({
                url: address+'autdataController/deleteautdata',
                type: 'post',
                data: {
                    'autdataid': app.ids
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
        //修改功能点
        update: function() {
            $.ajax({
                url: address+'autdataController/updateautdata',
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
            $('#updateForm input[name="autdataid"]').val(selectedId);
            $('#updateForm input[name="autdatacode"]').val(selectedInput.parent().next().html());
            $('#updateForm input[name="autdataname"]').val(selectedInput.parent().next().next().html());
            $('#updateForm textarea[name="descript"]').val(selectedInput.parent().next().next().next().next().html());
        },
        //传递当前页选中的测试系统id和功能点id到元素库页面
        toElementLib: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var autdataId = selectedInput.attr('id');
                var autId = $('#autSelect').val();
                location.href = "elementLibrary.html?autId=" + autId + "&" + "autdataId=" + autdataId;
            }
        },
        //传递当前页选中的测试系统id和功能点id到对象库页面
        toObjectRepo: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var autdataId = selectedInput.attr('id');
                var autId = $('#autSelect').val();
                location.href = "objectRepo.html?autId=" + autId + "&" + "autdataId=" + autdataId;
            }
        },

    },

});


function getautdata(page, listnum, order, sort) {

    //获取list通用方法，只需要传入多个所需参数
    $.ajax({
        url: address+'autdataController/selectAllByPage',
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
            app.autdataList = data.o.rows;
            app.tt = data.o.total;
            app.totalPage = Math.ceil(app.tt / listnum);
            app.pageSize = listnum;
        }
    });

}

//改变页面大小
function changeListNum() {
    $('#mySelect').change(function() {
        app.listnum = $(this).children('option:selected').val();
        $("#mySelect").find("option[text='" + app.listnum + "']").attr("selected", true);
        queryautdata();
    });
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
    getautdata(1, 10, app.order, app.sort);
}
//重新排序 结束

//获取测试系统
function autSelect() {
    $.ajax({
        async: false,
        url: address+"autController/selectAll",
        type: "POST",
        success: function(data) {
            var autList = data.obj;
            var str = "";
            for (var i = 0; i < autList.length; i++) {

                str += " <option value='" + autList[i].id + "' >" + autList[i].autName + "</option> ";
            }

            $('#autSelect').html(str);

        }
    });
}

//设置所属被测系统select为aut页面选中的aut
function setval() {
    var thisURL = document.URL;
    var getVal = thisURL.split('?')[1];
    var oneVal = getVal.split('=')[1];
    $("#autSelect").val(oneVal);
    $.ajax({
        url: address+'autdataController/autdataqueryByPage',
        type: 'POST',
        data: {
            'page': 1,
            'rows': 10,
            'order': 'id',
            'sort': 'asc',
            'id': '',
            'transcode': '',
            'transname': '',
            'autctgId': '',
            'descript': '',
            'maintainer': '',
            'autId': $('#autSelect').val(),
            'useStatus': '',

        },
        success: function(data) {
            app.autdataList = data.o.rows;
            app.tt = data.o.total;
            app.totalPage = Math.ceil(app.tt / app.listnum);
            app.pageSize = app.listnum;
        },
        error: function() {
            $('#failModal').modal();
        }
    });
}
//通过选择被测系统筛选查询功能点 
function queryautdata() {
    $.ajax({
        url: address+'autdataController/autdataqueryByPage',
        type: 'POST',
        data: {
            'page': app.currentPage,
            'rows': app.listnum,
            'order': app.order,
            'sort': app.sort,
            'id': '',
            'transcode': '',
            'transname': '',
            'autctgId': '',
            'descript': '',
            'maintainer': '',
            'autId': $('#autSelect').val(),
            'useStatus': '',

        },
        success: function(data) {
            app.autdataList = data.o.rows;
            app.tt = data.o.total;
            app.totalPage = Math.ceil(app.tt / app.listnum);
            app.pageSize = app.listnum;
        },
        error: function() {
            $('#failModal').modal();
        }
    });
}
