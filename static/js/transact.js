var app = new Vue({
    el: '#v-transact',
    data: {
        transactList: [],
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
            queryTransact();
        });
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
            queryTransact();
        },
        //添加功能点
        insert: function() {
            $('#insertForm input[name="autid"]').val($('#autSelect').val());
            var self=this;
            $.ajax({
                url: address + 'transactController/inserttransact',
                type: 'post',
                data: $("#insertForm").serializeArray(),
                success: function(data) {
                    if (data.success) {
                        $('#successModal').modal();
                        queryTransact();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
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
        //删除功能点
        del: function() {
            this.getIds();
            var self=this;
            $.ajax({
                url: address + 'transactController/deletetransact',
                type: 'post',
                data: {
                    'transactid': app.ids
                },
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                        // getTransact(self.currentPage, self.pageSize, 'id', 'asc');
                        queryTransact();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },

        checkUpdate:()=>{
            app.getSelected();
            const selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else{
                if (selectedInput.next().next().next().text()==='接口'){
                    location.href="interfacesManagement.html";
                }
                else{
                    $('#updateModal').modal();                    
                }
            } 
        },
        //修改功能点
        update: function() {
            var self=this;
            $.ajax({
                url: address + 'transactController/updatetransact',
                type: 'post',
                data: $("#updateForm").serializeArray(),
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        $('#successModal').modal();
                        // getTransact(self.currentPage, self.pageSize, 'id', 'asc');
                        queryTransact();
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
            $('#updateForm input[name="transactid"]').val(selectedId);
            $('#updateForm input[name="transactcode"]').val(selectedInput.parent().next().html());
            $('#updateForm input[name="transactname"]').val(selectedInput.parent().next().next().html());
            $('#updateForm textarea[name="descript"]').val(selectedInput.parent().next().next().next().next().html());
        },
        //传递当前页选中的测试系统id和功能点id到元素库页面
        toElementLib: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var transactId = selectedInput.attr('id');
                var autId = $('#autSelect').val();
                sessionStorage.setItem("transactId",transactId);
                sessionStorage.setItem("autId",autId);
                location.href = "elementLibrary.html";
            }
        },
        //传递当前页选中的测试系统id和功能点id到对象库页面
        toObjectRepo: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var transactId = selectedInput.attr('id');
                var autId = $('#autSelect').val();
                sessionStorage.setItem("transactId",transactId);
                sessionStorage.setItem("autId",autId);
                location.href = "objectRepo.html";
            }
        },
        //传递当前页选中的测试系统id和功能点id到基础脚本
        toScript: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var transactId = selectedInput.attr('id');
                var autId = $('#autSelect').val();
                sessionStorage.setItem("transactId",transactId);
                sessionStorage.setItem("autId",autId);
                location.href = "script.html";
            }
        },

    },

});


function getTransact(page, listnum, order, sort) {

    //获取list通用方法，只需要传入多个所需参数
    $.ajax({
        url: address + 'transactController/selectAllByPage',
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
            app.transactList = data.o.rows;
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
        app.currentPage=1;
        queryTransact();
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
    getTransact(1, 10, app.order, app.sort);
}
//重新排序 结束

//获取测试系统
function autSelect() {
    $.ajax({
        async: false,
        url: address + "autController/selectAll",
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
    // var thisURL = document.URL;
    // var getVal = thisURL.split('?')[1];
    // var oneVal = getVal.split('=')[1];
    var autId=sessionStorage.getItem("autId");
    $("#autSelect").val(autId);
    $.ajax({
        url: address + 'transactController/transactqueryByPage',
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
            app.transactList = data.o.rows;
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
function queryTransact() {
    $.ajax({
        url: address + 'transactController/transactqueryByPage',
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
            app.transactList = data.o.rows;
            app.tt = data.o.total;
            app.totalPage = Math.ceil(app.tt / app.listnum);
            // app.pageSize = app.listnum;
        },
        error: function() {
            $('#failModal').modal();
        }
    });
}