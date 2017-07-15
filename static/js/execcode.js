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
        setval();
        changeListNum();
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
