var app = new Vue({
    el: '#v-testProject',
    data: {
        testProjectList: [],
        checked: [],
        checkboxModel: [],
        apiUrl: 'http://10.108.226.152:8080/ATFCloud/testProjectController/selectAll',
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
        checkedAll: function() {
            var _this = this;
            console.log(_this.checkboxModel);
            if (this.checked) { //反选
                _this.checkboxModel = [];
            } else { //全选
                _this.checkboxModel = [];
                _this.testProjectList.forEach(function(item) {
                    _this.checkboxModel.push(item.id);
                });
            }
        },
        changePage: function(number) {
            listnum = $("#mySelect").children('option:selected').val();
            this.pageData.page = parseInt(this.pageData.page) + number;
            getList(this.pageData.page, listnum, 'id', 'asc'); //此处的筛选参数可能有变化，根据筛选情况来
        },

        insert: function insert() {
            $.ajax({
                url: 'http://10.108.226.152:8080/ATFCloud/testProjectController/selectAll',
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
    watch: { //深度watcher
        'checkboxModel': {
            handler: function(val, oldVal) {
                if (this.checkboxModel.length === this.testProjectList.length) {
                    this.checked = true;
                } else {
                    this.checked = false;
                }
            },
            deep: true
        }
    }
});

function getList(page, listnum, order, sort) {

    //获取list通用方法，只需要传入多个所需参数
    $.ajax({
        url: 'http://10.108.226.152:8080/ATFCloud/testProjectController/selectAll',
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
            app.testProjectList = data.obj;
            var tt = data.total;

            app.pageData.totalPage = Math.ceil(tt / listnum);
            app.pageData.pageSize = listnum;
        }
    });
}

function changeListNum() {
    $('#mySelect').change(function() {
        listnum = $(this).children('option:selected').val();
        $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
        getList(1, listnum, 'id', 'asc');
    });
}

