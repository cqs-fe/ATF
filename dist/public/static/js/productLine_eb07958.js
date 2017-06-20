var app = new Vue({
    el: '#v-productLine',
    data: {
        productLineList: [],
        apiUrl: 'http://10.108.226.152:8080/ATFCloud/productLineController/selectAll',
        pageData: {
            pageSize: 10,
            page: 1,
            totalPage: 1
        },
        listnum: 10
    },
    ready: function() {

        getList(1, 10, 'id', 'asc');
        changeListNum();
    },
    methods: {

        changePage: function(number) {
            listnum = $("#mySelect").children('option:selected').val();
            this.pageData.page = parseInt(this.pageData.page) + number;
            getList(this.pageData.page, listnum, 'id', 'asc'); //此处的筛选参数可能有变化，根据筛选情况来
        },


        insert: function() {
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/productLineController/selectAll',
                type: 'post',
                data: $("#insertForm").serializeArray(),
                success: function(data) {
                    console.info(data);
                    if (data.success) {
                        alert("添加成功！");
                    } else {
                        alert("添加失败！");
                    }
                }
            });
        }

    },

        getList: function(page, listnum, order, sort) {

                //获取list通用方法，只需要传入多个所需参数
                $.ajax({
                    url: 'http://10.108.226.152:8080/ATFCloud/productLineController/selectAll',
                    type: 'GET',
                    data: {
                        'page': page,
                        'rows': listnum,
                        'order': order,
                        'sort': sort
                    },
                    success: function(data) {
                        console.info(data);
                        console.info(data.obj);
                        // var data = JSON.parse(data);
                        app.productLineList = data.obj;
                        var tt = data.total;

                        app.pageData.totalPage = Math.ceil(tt / listnum);
                        app.pageData.pageSize = listnum;
                    }
                });
         },

    changeListNum：function() {
        $('#mySelect').change(function() {
            listnum = $(this).children('option:selected').val();
            $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
            getList(1, listnum, 'id', 'asc');
        });
    }
         
});





