var dataSet = null;

$(document).ready(function() {
    // 立即执行函数，获取服务器全部数据
    (function() {
        let xmlHttpRequest;
        if (window.XMLHttpRequest) {
            xmlHttpRequest = new XMLHttpRequest();
        } else {
            xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        let url = address + "testProjectController/selectAllByPage";
        xmlHttpRequest.open("post", url, true);
        xmlHttpRequest.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
        xmlHttpRequest.onreadystatechange = function() {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                let str = xmlHttpRequest.responseText;
                let obj = eval("(" + str + ")");
                dataSet = obj.rows.map(value => {
                    let newValue = {};
                    ({
                        id: newValue.id,
                        testProjectName: newValue.testProjectName,
                        type: newValue.type,
                        createDate: newValue.createDate,
                        taskDescription: newValue.taskDescription,
                        user: { id: newValue.userid, username: newValue.username, reallyname: newValue.reallyname },
                        aut: { id: newValue.autid, autCode: newValue.autCode, autName: newValue.autName },
                        productLine: {
                            id: newValue.productLineId,
                            productLineName: newValue.productLineName
                        }
                    } = value);
                    return newValue;
                });
                initialTable();
            }
        };
        let page = 1;
        let rows = 10000;
        let order = "id";
        let data = "page=" + page + "&rows=" + rows + "&order=" + order + "&sort=asc&testProjectName=&type=&userId=&autId=&productLineId=";
        xmlHttpRequest.send(data);
    })();

    initialTable();

    function initialTable() {
        let table = $('#example').DataTable({
            "data": dataSet,
            "columns": [
            { data: "id" },
            { data: "testProjectName" },
            { data: "type" },
            { data: "productLineId" },
            { data: "productLineName" },
            { data: "taskDescription" },
            {
                targets: -1,
                data: null,
                defaultContent: "<button type='button' class='btn-tr' id='btn-viewRow' data-toggle='modal' href='#viewModal'>查看</button><button type='button' class='btn-tr' id='btn-alterRow'  data-toggle='modal' href='#alterModal'>修改</button>"
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
            },
            "aLengthMenu": [[2, 10, 25, -1], ["2", "10", "25", "所有"]],
            'fnDrawCallback': function(table) {    
                $("#example_paginate").append(`  到第 <input type='text' id='changePage' class='input-text' style='width:50px;height:27px'> 页 <a class='btn btn-default shiny' href='javascript:void(0);' id='dataTable-btn' style='text-align:center'>确认</a>`);    
                var oTable = $("#example").dataTable();    
                $('#dataTable-btn').click(function(e) {    
                    if($("#changePage").val() && $("#changePage").val() > 0) {    
                        var redirectpage = $("#changePage").val() - 1;    
                    } else {    
                        var redirectpage = 0;    
                    }    
                    oTable.fnPageChange(redirectpage);    
                });    
            } 
        });
        $(".dataTables_filter input").attr("placeholder", "请输入关键字");
        $('#example tbody').on('click', '#btn-viewRow', function() {
            $('#viewModal').modal('show');
            let data = table.row($(this).parents('tr')).data();

        });
    }


    document.querySelector("#itemcode").oninput = function() {
      if(this.value === ""){
        $("#add-feedback-itemcode").removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style", "color:#b94a48;");
      }else {
        $("#add-feedback-itemcode").removeClass("glyphicon-remove").addClass("glyphicon-ok").attr("style", "color:#468847;");
      }
      detectAddInput();
    };
    document.querySelector("#itemname").oninput = function() {
        if(this.value === ""){
            $("#add-feedback-itemname").removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style","color:#b94a48");
        }else {
            $("#add-feedback-itemname").removeClass("glyphicon-remove").addClass("glyphicon-ok").attr("style","color:#468847");
        }
        detectAddInput();
    };
    document.querySelector("#itemtype").onchange = function() {
        $("#add-feedback-itemtype").removeClass("hidden");
        detectAddInput();
    };
    // a function to detect the all input state, then change the availibity of the submit button
    function detectAddInput() {
        let spans = document.querySelectorAll("#addModal .glyphicon-remove");
        if(spans.length === 0){
            $("#btn-add").prop("disabled",false);
            $("#add-input-detecting").addClass("hidden");
        }else {
            $("#btn-add").prop("disabled",true);
            $("#add-input-detecting").removeClass("hidden");
        }
    }
    document.querySelector("#btn-add").onclick = function() {
        let itemcode = $('#itemcode').val();
        let itemname = $('#itemname').val();
        let itemtype = $('#itemtype').val();
        let itemline = $('#itemline').val();
        let itembelong = $('#itembelong').val();
        let itemdesc = $('#itemdesc').val();

    };
    $('#addModal').on('hidden.bs.modal', (e) => {
        $('#itemcode').val('').removeClass('glyphicon-ok').addClass('glyphicon-remove').attr("style", "color:#b94a48;");
        $('#itemname').val('').removeClass('glyphicon-ok').addClass('glyphicon-remove').attr("style", "color:#b94a48;");
        $('#itemtype').val('01').addClass('hidden');
        $('#itemline').val('');
        $('#itembelong').val('');
        $('#itemdesc').val('');

    });
});