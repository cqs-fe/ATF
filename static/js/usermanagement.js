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
        var rows = 10000;
        var order = "id";
        var data = "page=" + page + "&rows=" + rows + "&order=" + order + "&sort=asc&username=&reallyname=&role=&tel=&dept=";
        xmlHttpRequest.send(data);

    })();

    $("#alterModal").on("hidden.bs.modal", (e) => {
        $(".glyphicon").removeClass("show").addClass("hidden");
        $("#alter-password").val("")
        $("#alter-confirmpassword").val("");
        $("#alter-feedback-password").attr({ "class": "glyphicon glyphicon-remove", style: "color: #b94a48" });
        $("#alter-feedback-confirmpassword").attr({ "class": "glyphicon glyphicon-remove", style: "color: #b94a48" });
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
        $.ajax({
            url: address + "userController/updateByPrimaryKey",
            data: data,
            type: "post",
            dataType: "json",
            success: (data, textStatus) => {
                if (data.success === true) {
                    alert("修改成功");
                    table.ajax.reload(null, false);
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
                    defaultContent: "<button type='button' class='btn-tr' id='btn-viewRow' data-toggle='modal'>查看</button><button type='button' class='btn-tr' id='btn-alterRow'  data-toggle='modal'>修改</button><button type='button' class='btn-tr' id='btn-deleteRow'  data-toggle='modal'>删除</button>"
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
        table.column(0).visible(false);
        $(".dataTables_filter input").attr("placeholder", "请输入关键字");
        $('#example tbody').on('click', '#btn-viewRow', function() {
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
        $('#example tbody').on('click', '#btn-alterRow', function() {
            $('#alterModal').modal('show');
            let id = table.row($(this).parents('tr')).data().id;
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
        }
    }
});