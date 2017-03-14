var dataSet = null;

$(document).ready(function() {
    // 立即执行函数，用于获取全部数据
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
        var rows = 10000;
        var order = "id";
        var data = "page=" + page + "&rows=" + rows + "&order=" + order + "&sort=asc&username=&reallyname=&role=&tel=&dept=";
        xmlHttpRequest.send(data);

    })();

    $("#alterModal").on("hidden.bs.modal", (e) => {
        $(".glyphicon").removeClass("show").addClass("hidden");
        $("#alter-password").val("")
        $("#alter-confirmpassword").val("");
        $("#alter-feedback-password").attr({ "class": "glyphicon hidden", style: "color: #b94a48" });
        $("#alter-feedback-confirmpassword").attr({ "class": "glyphicon hidden", style: "color: #b94a48" });
        $("#btn-alter").prop("disabled", true);
        $("#input-detecting").show();
        $("#input-detecting").text("输入信息不完整");
    });
    document.querySelector("#alter-username").oninput = function() {
        if (this.value === "") {
            $("#alter-feedback-username").addClass("glyphicon-remove show").removeClass("glyphicon-ok hidden").attr("style", "color:#b94a48;");
        } else {
            $("#alter-feedback-username").addClass("glyphicon-ok show").removeClass("glyphicon-remove hidden").attr("style", "color:#468847;");
        }
        detectInput();
    };
    document.querySelector("#alter-name").oninput = function() {
        if (this.value === "") {
            $("#alter-feedback-name").addClass("glyphicon-remove show").removeClass("glyphicon-ok hidden").attr("style", "color:#b94a48;");
        } else {
            $("#alter-feedback-name").addClass("glyphicon-ok show").removeClass("glyphicon-remove hidden").attr("style", "color:#468847;");
        }
        detectInput();
    };
    document.querySelector("#alter-password").oninput = function() {
        if (this.value === "") {
            $("#alter-feedback-password").addClass("glyphicon-remove show").removeClass("glyphicon-ok hidden").attr("style", "color:#b94a48;");
        } else {
            $("#alter-feedback-password").addClass("glyphicon-ok show").removeClass("glyphicon-remove hidden").attr("style", "color:#468847;");
        }
        let confirmpassword = $("#alter-confirmpassword").val();
        if (confirmpassword !== "" && confirmpassword === this.value) {
            $("#alter-feedback-confirmpassword").addClass("glyphicon-ok show").removeClass("glyphicon-remove hidden").attr("style", "color:#468847;");
        } else {
            $("#alter-feedback-confirmpassword").addClass("glyphicon-remove show").removeClass("glyphicon-ok hidden").attr("style", "color:#b94a48;");
        }
        detectInput();
    };
    document.querySelector("#alter-confirmpassword").oninput = function() {
        let password = $("#alter-password").val();
        if (this.value !== "" && this.value === password) {
            $("#alter-feedback-confirmpassword").addClass("glyphicon-ok show").removeClass("glyphicon-remove hidden").attr("style", "color:#468847;");
        } else {
            $("#alter-feedback-confirmpassword").addClass("glyphicon-remove show").removeClass("glyphicon-ok hidden").attr("style", "color:#b94a48;");
        }
        detectInput();
    };
    document.querySelector("#alter-role").onchange = function() {
        $("#alter-feedback-role").addClass("glyphicon-ok show").removeClass("hidden").attr("style", "color:#468847;");
        detectInput();
    };
    document.querySelector("#alter-state").onchange = function() {
        $("#alter-feedback-state").addClass("glyphicon-ok show").removeClass("hidden").attr("style", "color:#468847;");
        detectInput();
    };
    var row;
    $("#btn-alter").click(() => {
        let id = $("#alter-id").val();
        let username = $("#alter-username").val();
        let name = $("#alter-name").val();
        let password = $("#alter-password").val();
        let state = $("#alter-state").val();
        let role = $("#alter-role").val();
        let phonenumber = $("#alter-phonenumber").val();
        let telephone = $("#alter-telephone").val();
        let email = $("#alter-email").val();
        let department = $("#alter-department").val();
        let data = {
            id: id,
            username: username,
            password: password,
            reallyname: name,
            email: email,
            role: role,
            dept: department,
            tel: phonenumber,
            phone: telephone,
            status: state
        };
        let newData = {
            id: id,
            username: username,
            reallyname: name,
            role: role,
            dept: department,
            phone: phonenumber,
            status: state
        }
        $.ajax({
            url: address + "userController/updateByPrimaryKey",
            data: data,
            type: "post",
            dataType: "json",
            success: (data, textStatus) => {
                if (data.success === true) {
                    $("#alterModal").modal("hide");
                    alert("修改成功");
                    row.data(newData);
                } else {
                    alert("修改shibai");
                }
            }
        });
    });

    function initialTable() {
        table = $('#example').DataTable({
            "data": dataSet,
            "columns": [
                { data: "id" },
                { data: "username" },
                { data: "reallyname" },
                { data: "role" },
                { data: "dept" },
                { data: "phone" },
                { data: "status" },
                {
                    targets: -1,
                    data: null,
                    defaultContent: "<button type='button' class='btn-tr btn-viewRow' id='' data-toggle='modal'>查看</button><button type='button' class='btn-tr btn-alterRow' id=''  data-toggle='modal'>修改</button>"
                }
            ],
            "pagingType":"full_numbers",
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
            "aLengthMenu": [[2, 10, 25, -1], ["2", "10", "25", "All"]],
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
        table.column(0).visible(false);
        $(".dataTables_filter input").attr("placeholder", "请输入关键字");
        $('#example tbody').on('click', '.btn-viewRow', function() {
            $('#viewModal').modal('show');
            let id = table.row($(this).parents('tr')).data().id;
            $.ajax({
                url: address + "userController/selectByPrimaryKey",
                type: "post",
                data: "id=" + id,
                dataType: "json",
                success: (data, textStatus) => {
                    $("#view-username").val(data.obj.username);
                    $("#view-name").val(data.obj.reallyname);
                    $("#view-role").val(data.obj.role);
                    $("#view-department").val(data.obj.dept);
                    $("#view-state").val(data.obj.status);
                    $("#view-phonenumber").val(data.obj.phone);
                    $("#view-telephone").val(data.obj.tel);
                    $("#view-email").val(data.obj.email);
                }
            });
        });
        $('#example tbody').on('click', '.btn-alterRow', function() {
            $('#alterModal').modal('show');
            row = table.row($(this).parents('tr'));
            let id = row.data().id;
            $.ajax({
                url: address + "userController/selectByPrimaryKey",
                type: "post",
                data: "id=" + id,
                dataType: "json",
                success: (data, textStatus) => {
                    $("#alter-id").val(data.obj.id);
                    $("#alter-username").val(data.obj.username);
                    $("#alter-name").val(data.obj.reallyname);
                    $("#alter-role").val(data.obj.role);
                    $("#alter-department").val(data.obj.dept);
                    $("#alter-state").val(data.obj.status);
                    $("#alter-phonenumber").val(data.obj.phone);
                    $("#alter-telephone").val(data.obj.tel);
                    $("#alter-email").val(data.obj.email);
                }
            });
        });
    }

    // 随时检测输入的内容，并设置相关的提示
    function detectInput() {
        let tooltips = $("#alterModal .glyphicon-remove");
        if (tooltips.length === 0) {
            $("#btn-alter").prop("disabled", false);
            $("#input-detecting").hide();
        } else {
            $("#btn-alter").prop("disabled", true);
            $("#input-detecting").show();
        }
    }

    // addModal input detection
    document.querySelector("#username").oninput = function() {
        if (this.value === '') {
            $("#add-feedback-username").removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style", "color:#b94a48;");
        } else {
            $("#add-feedback-username").removeClass("glyphicon-remove").addClass("glyphicon-ok").attr("style", "color:#468847;");
        }
        detectAddInput();
    };
    document.querySelector('#name').oninput = function() {
        if (this.value === '') {
            $("#add-feedback-name").removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style", "color:#b94a48;");
        } else {
            $("#add-feedback-name").removeClass("glyphicon-remove").addClass("glyphicon-ok").attr("style", "color:#468847;");
        }
        detectAddInput();
    }

    document.querySelector("#password").oninput = function() {
        if (this.value === "") {
            $("#add-feedback-password").addClass("glyphicon-remove show").removeClass("glyphicon-ok hidden").attr("style", "color:#b94a48;");
        } else {
            $("#add-feedback-password").addClass("glyphicon-ok show").removeClass("glyphicon-remove hidden").attr("style", "color:#468847;");
        }
        let confirmpassword = $("#confirm").val();
        if (confirmpassword !== "" && confirmpassword === this.value) {
            $("#add-feedback-confirmpassword").addClass("glyphicon-ok show").removeClass("glyphicon-remove hidden").attr("style", "color:#468847;");
        } else {
            $("#add-feedback-confirmpassword").addClass("glyphicon-remove show").removeClass("glyphicon-ok hidden").attr("style", "color:#b94a48;");
        }
        detectAddInput();
    };
    document.querySelector("#confirm").oninput = function() {
        let password = $("#password").val();
        if (this.value !== "" && this.value === password) {
            $("#add-feedback-confirmpassword").addClass("glyphicon-ok show").removeClass("glyphicon-remove hidden").attr("style", "color:#468847;");
        } else {
            $("#add-feedback-confirmpassword").addClass("glyphicon-remove show").removeClass("glyphicon-ok hidden").attr("style", "color:#b94a48;");
        }
        detectAddInput();
    };
    document.querySelector("#role").onchange = function() {
        $("#add-feedback-role").addClass("glyphicon-ok show").removeClass("hidden").attr("style", "color:#468847;");
        detectAddInput();
    };
    document.querySelector("#state").onchange = function() {
        $("#add-feedback-status").addClass("glyphicon-ok show").removeClass("hidden").attr("style", "color:#468847;");
        detectAddInput();
    };
    // 随时检测输入的内容  for 添加
    function detectAddInput() {
        let tooltips = $("#addModal .glyphicon-remove");
        if (tooltips.length === 0) {
            $("#btn-add").prop("disabled", false);
            $("#add-input-detecting").hide();
        } else {
            $("#btn-add").prop("disabled", true);
            $("#add-input-detecting").show();
        }
    }
    document.querySelector('#btn-add').onclick = function() {
        let username = $("#username").val();
        let name = $('#name').val();
        let password = $("#password").val()
        let role = $("#role").val();
        let dept = $('#department').val();
        let tel = $('#phonenumber').val();
        let phone = $('#telephone').val();
        let email = $('#email').val();
        let status = $('#state').val();
        let data = {
            username: username,
            reallyname: name,
            password: password,
            role: role,
            dept: dept,
            tel: tel,
            phone: phone,
            email: email,
            status: status
        };
        $.ajax({
            url: address + 'userController/insert',
            type: 'post',
            dataType: 'json',
            data: data,
            success: (jsonDdata, textStatus) => {
                if (jsonDdata.success === true) {
                    alert(data.success);
                    $.ajax({
                        url: address + 'userController/selectAllByPage',
                        type: 'post',
                        dataType: 'json',
                        data: "page=1" + "&rows=10000" + "&order=" + 'id' + "&sort=asc&username=&reallyname=&role=&tel=&dept=",
                        success: (jsonDdata, textStatus) => {
                            let id = jsonDdata.total;
                            data.id = id;
                            table.row.add(data).draw();
                        }
                    });
                } else {
                    alert(jsonDdata.msg);
                }
            }
        });
    }
    $("#addModal").on("hidden.bs.modal", (e) => {
        $(".glyphicon").removeClass("glyphicon-ok").addClass("glyphicon-remove");
        $("#username").val('');
        $('#name').val('');
        $("#password").val("")
        $("#confirm").val("");
        $('#department').val('');
        $('#phonenumber').val('');
        $('#telephone').val('');
        $('#email').val('');
        $('#confirm').val('');
        $("#add-feedback-username").attr({ "class": "col-lg-1 glyphicon glyphicon-remove ", style: "color: #b94a48" });
        $("#add-feedback-name").attr({ "class": "col-lg-1 glyphicon glyphicon-remove ", style: "color: #b94a48" });
        $("#add-feedback-password").attr({ "class": "col-lg-1 glyphicon glyphicon-remove ", style: "color: #b94a48" });
        $("#add-feedback-confirmpassword").attr({ "class": "col-lg-1 glyphicon glyphicon-remove ", style: "color: #b94a48" });
        $("#add-feedback-role").attr({ "class": "col-lg-1 glyphicon hidden", style: "color: #b94a48" });
        $("#add-feedback-status").attr({ "class": "col-lg-1 glyphicon hidden ", style: "color: #b94a48" });
        $("#btn-add").prop("disabled", true);
        $("#add-input-detecting").show();
        // $("#add-input-detecting").text("输入信息不完整");
    });
});