var dataSet = null;

$(document).ready(function() {
    (function() {
        var xmlHttpRequest;
        if (window.XMLHttpRequest) {
            xmlHttpRequest = new XMLHttpRequest();
        } else {
            xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        var url = address + "userController/selectAllByPage";
        xmlHttpRequest.open("post", url, true);
        xmlHttpRequest.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
        xmlHttpRequest.onreadystatechange = function() {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                var str = xmlHttpRequest.responseText;
                var obj = eval("(" + str + ")");
                dataSet = obj.rows;
                initialTable();
            }
        };
        var page = 1;
        var rows = 10;
        var order = "id";
        var data = "page=" + page + "&rows=" + rows + "&order=" + order + "&sort=asc&username=&reallyname=&role=&tel=&dept=";
        xmlHttpRequest.send(data);

    })();

    function initialTable() {
        var table = $('#example').DataTable({
            "data": dataSet,
            "columns": [
                { data: "username" },
                { data: "reallyname" },
                { data: "role" },
                { data: "dept" },
                { data: "phone" },
                { data: "status" },
                {
                    targets: -1,
                    data: null,
                    defaultContent: "<button type='button' class='btn-tr' id='btn-viewRow' data-toggle='modal' href='#viewModal'>查看</button><button type='button' class='btn-tr' id='btn-alterRow'  data-toggle='modal' href='#alterModal'>修改</button><button type='button' class='btn-tr' id='btn-deleteRow'  data-toggle='modal' href='#deleteModal'>删除</button>"
                }
            ],
            "language": {
                "info": "显示 _START_ 到 _END_ 项，总共 _TOTAL_ 项",
                "lengthMenu": "显示 _MENU_ 条",
                "paginate": {
                    "first": "首页",
                    "last": "尾页",
                    "next": "下一页",
                    "previous": "上一页"
                },
                "search": "",
            }
        });
        $(".dataTables_filter input").attr("placeholder", "请输入关键字");
        $('#example tbody').on('click', '#btn-viewRow', function() {
            $('#viewModal').modal('show');
            var data = table.row($(this).parents('tr')).data();

        });
    }


});