var dataSet = null;

$(document).ready(function() {
    (function() {
        let xmlHttpRequest;
        if (window.XMLHttpRequest) {
            xmlHttpRequest = new XMLHttpRequest();
        } else {
            xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        let url = address + "autController/selectAllByPage";
        xmlHttpRequest.open("post", url, true);
        xmlHttpRequest.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
        xmlHttpRequest.onreadystatechange = function() {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                let str = xmlHttpRequest.responseText;
                let obj = eval("(" + str + ")");
                dataSet = obj.rows;
                initialTable();
            }
        };
        let page = 1;
        let rows = 10000;
        let order = "id";
        let data = "page=" + page + "&rows=" + rows + "&order=" + order + "&sort=asc";
        xmlHttpRequest.send(data);

    })();

    function initialTable() {
        let table = $('#example').DataTable({
            "data": dataSet,
            "columns": [
                { data: "id" },
                { data: "autCode" },
                { data: "autName" },
                { data: "version" },
                { data: "autType" },
                { data: "maincodeBegin" },
                { data: "maincodeEnd" },
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
            let data = table.row($(this).parents('tr')).data();

        });
    }


});