var showRows = null;
var dataSet = null;
var totalRows = null;
var currentPage = 1;
var maxPage = 7;//可以显示的最多页码
var minShowPage = 1;  //  当前显示的最小的页码
var maxShowPage = 7;   //显示的最大的页码
var totalPage = 0;
var lis = new Array();

var sendData = {
    order:"id",
    sort:"asc",
    username: "",
    reallyname:"",
    role: "",
    dept:"",
    tel: "",
    roleCn: ""
};
const ROLE = {1: "测试主管", 2: "测试经理", 3: "测试组长", 4: "自动化技术人员", 5: "功能测试人员"};
const STATUS = {0: '正常', 1: '异常'};
$(document).ready(function() {
      // 获取服务器数据
    (function(){
        $("#showRows").val("5");
        showRows = $("#showRows").val();
        var i = 0;
        for(i = 0;i < maxPage; i++){
            lis[i] = document.createElement("li");
            var a = document.createElement("a");
            a.setAttribute("onclick","sendQuery(this.innerHTML,updatePagination);");
            var aText = document.createTextNode(i+1);
            a.appendChild(aText);
            lis[i].appendChild(a);
            var pagination = document.getElementById("pagination");
            var nextPage = document.getElementById("nextPage").parentNode;
            pagination.insertBefore(lis[i],nextPage);
        }
        sendQuery(1,updatePagination);
    })();

    $('.0').addClass('open');
    $('.0 .arrow').addClass('open');
    $('.0-ul').css({display: 'block'});
    $('.0-0').css({color: '#ff6c60'});
        // 页面跳转相关按钮事件点击初始化
    (function(){
        document.getElementById("firstPage").onclick = function(){
            sendQuery(1,updatePagination); 
        };
         document.getElementById("lastPage").onclick = function(){
            sendQuery(totalPage,updatePagination); 
        };
        document.getElementById("previousPage").onclick = function(){
            if(currentPage <= 1){return;}
            sendQuery(currentPage - 1,updatePagination); 
        };
        document.getElementById("nextPage").onclick = function(){
            if(currentPage >= totalPage){return;}
            sendQuery(currentPage + 1,updatePagination); 
        };
        document.getElementById("btn-gotoPage").onclick = function(){
            var page = document.getElementById("gotoPage").value;
            if(parseInt(page) > totalPage || parseInt(page)<1 || page == ""){
                Vac.alert("不在页码范围");
                return;
            }
            sendQuery(page,updatePagination); 
        };
        // document.getElementById("btn-freshTable").onclick = function(){
        //     sendQuery(1,updatePagination); 
        // };
        document.getElementById("showRows").onchange = function(event){
            showRows = event.target.value;
            sendQuery(1,updatePagination); 
        }
    })();
    // 页面跳转相关按钮事件点击初始化 结束

    // 点击修改按钮
    document.querySelector('#btn-alter').onclick = function(){
        var data = {};
        data.id = $('#alter-id').val();
        data.username = $('#alter-username').val();
        data.reallyname = $('#alter-name').val();
        data.password = $('#alter-password').val();
        data.email = $('#alter-email').val();
        data.role = $('#alter-role').val();
        data.dept = $('#alter-department').val();
        data.tel = $('#alter-phonenumber').val();
        data.status = $('#alter-state').val();
        data.phone = $('#alter-telephone').val();
        data.roleCn = ROLE[data.role];
        if (!data.username) {
            Vac.alert('请输入用户名');return;
        }
        if (!data.reallyname) {
            Vac.alert('请输入姓名');return;
        }
        if (!data.password) {
            Vac.alert('请输入密码');return;
        }
        if (!data.role) {
            Vac.alert('请输入用户角色');return;
        }
        if (!data.status) {
            Vac.alert('请选择用户状态');return;
        }
        Vac.ajax({
            url: address3 + 'userController/updateByPrimaryKey',
            data: data,
            success: function(data){
                if(data.respCode === '0000'){
                    Vac.alert('修改成功！')
                    $('#alterModal').modal('hide');
                     sendQuery(1,updatePagination); 
                }else {
                    Vac.alert('修改失败，' + data.msg);
                }
            }
        });

    };

    // 点击搜索按钮
    $("#btn-search").click(search);
    // 修改按钮隐藏事件
    $("#alterModal").on("hidden.bs.modal", (e) => {
        $(".glyphicon").removeClass("show").addClass("hidden");
        $("#alter-password").val("")
        $("#alter-confirmpassword").val("");
        $("#alter-feedback-password").attr({ "class": "col-sm-1 glyphicon hidden", style: "color: #b94a48" });
        $("#alter-feedback-confirmpassword").attr({ "class": "col-sm-1 glyphicon hidden", style: "color: #b94a48" });
        $("#btn-alter").prop("disabled", true);
        $("#input-detecting").show();
        $("#input-detecting").text("输入信息不完整");
    });
    //检测输入内容
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
        let repassword = $("#confirm").val();
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
            status: status,
            roleCn: ROLE[role]
        };
        if (!data.username) {
            Vac.alert('请输入用户名');return;
        }
        if (!data.reallyname) {
            Vac.alert('请输入姓名');return;
        }
        if (!data.password) {
            Vac.alert('请输入密码');return;
        }
        if (password !== repassword) {
            Vac.alert('两次密码不一致');return;
        }
        if (!data.role) {
            Vac.alert('请输入用户角色');return;
        }
        if (!data.status) {
            Vac.alert('请选择用户状态');return;
        }
        Vac.ajax({
            url: address3 + 'userController/insert',
            data: data,
            success: (jsonDdata) => {
                if (jsonDdata.respCode === '0000') {
                    Vac.alert('添加成功!');
                    $('#addModal').modal('hide');
                     sendQuery(1,updatePagination); 
                } else {
                    Vac.alert('添加失败, ' + jsonDdata.msg)
                }
            }
        });
    }
    //添加的隐藏
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
        $("#add-feedback-username").attr({ "class": "col-sm-1 glyphicon glyphicon-remove ", style: "color: #b94a48" });
        $("#add-feedback-name").attr({ "class": "col-sm-1 glyphicon glyphicon-remove ", style: "color: #b94a48" });
        $("#add-feedback-password").attr({ "class": "col-sm-1 glyphicon glyphicon-remove ", style: "color: #b94a48" });
        $("#add-feedback-confirmpassword").attr({ "class": "col-sm-1 glyphicon glyphicon-remove ", style: "color: #b94a48" });
        $("#add-feedback-role").attr({ "class": "col-sm-1 glyphicon hidden", style: "color: #b94a48" });
        $("#add-feedback-status").attr({ "class": "col-sm-1 glyphicon hidden ", style: "color: #b94a48" });
        $("#btn-add").prop("disabled", true);
        $("#add-input-detecting").show();
        // $("#add-input-detecting").text("输入信息不完整");
    });

});
// 更新页码
function updatePagination(totalRows, page){
    totalPage = Math.ceil(totalRows / showRows);
    currentPage = totalPage == 0 ? 0 : page;
    var currentMaxPage = totalPage <= maxPage ? totalPage : maxPage;
    var i = 0;
    for(i = 0; i < maxPage; i++){
        //控制只有7个按钮显示
        if(i < currentMaxPage){
            lis[i].style.display = "inline";
        }else{
            lis[i].style.display = "none";
        }
        // lis[i].getElementsByTagName("a")[0].innerHTML = currentPage - currentMaxPage + 1 + i;
        //改变页码显示
        if(currentPage < minShowPage){
            lis[i].getElementsByTagName("a")[0].innerHTML = currentPage + i;
        }else if(currentPage > maxShowPage){
            lis[i].getElementsByTagName("a")[0].innerHTML = currentPage - currentMaxPage + 1 + i;
        }else{
        }
        
        if(lis[i].getElementsByTagName("a")[0].innerHTML == currentPage){
            lis[i].setAttribute("class","active");
        }else{
            lis[i].setAttribute("class","");
        }
    }
    if(currentPage < minShowPage){
        minShowPage = currentPage;
        maxShowPage = currentPage + currentMaxPage - 1;
    }else if(currentPage > maxShowPage){
        maxShowPage = currentPage;
        minShowPage = currentPage - currentMaxPage + 1;
    }else{
    }
    paginationControl(totalPage,currentPage);
}
//发送查询的ajax
function sendQuery(sendPage,func){
    var page = parseInt(sendPage);
    var rows = showRows;
    var data = getSendData(page, rows);
    Vac.ajax({
        url: address3 + "userController/pagedBatchQueryUser",
        data: data,
        success: function(data){
            if (data.respCode === '0000') {
                dataSet = data.list;
                totalRows = data.totalCount;
                createTable(dataSet);
                func(totalRows, page);
            } else {
                Vac.alert('查询失败');
            }
            
        }
    });
}
//获取发送数据
function getSendData(page, rows, key, value){
    const a = {
        pageSize: rows,
        currentPage: page,
        "orderType":sendData.sort,
        "orderColumns":sendData.order,
        "username":"",
        "reallyname":"",
        "role":"",
        "tel":"",
        "dept":""
    };
    if (key) {
        a[key] = value;
    }
    return a;
}
//控制首页尾页等的可用性
function paginationControl(totalPage, currentPage){
    document.getElementById("currentPageId").innerHTML = currentPage;
    document.getElementById("totalPages").innerHTML = totalPage;
    document.getElementById("totalRows").innerHTML = totalRows;
    document.getElementById("gotoPage").setAttribute("max",totalPage);
    if(currentPage >= totalPage){
        $("#nextPage").parent("li").addClass("disabled");
        $("#lastPage").parent("li").addClass("disabled");
    }else{
        $("#nextPage").parent("li").removeClass("disabled");
        $("#lastPage").parent("li").removeClass("disabled");
    }
    if(currentPage <= 1){
        $("#previousPage").parent("li").addClass("disabled");
        $("#firstPage").parent("li").addClass("disabled");
    }else{
        $("#previousPage").parent("li").removeClass("disabled");
        $("#firstPage").parent("li").removeClass("disabled");
    }
}
//生成表格
function createTable(dataArray){
    var tbody = $("#example tbody");
    tbody.empty();
    dataArray.forEach(function(value){
        var tr = $('<tr></tr>');
        var tdId =  $(`<td class="td-id"></td>`).text(value.id);
        var tdUsername = $(`<td class="td-username"></td>`).text(value.username);
        var tdReallyname = $(`<td class="td-reallyname"></td>`).text(value.reallyname);
        var tdrole = $(`<td class="td-role"></td>`).text(ROLE[value.role]);
        var tdDept = $(`<td class="td-dept"></td>`).text(value.dept || '');
        var tdTel = $(`<td class="td-tel"></td>`).text(value.tel || '');
        var tdState = $(`<td class="td-state"></td>`).text(STATUS[value.status]);
        var tdOperation = $(`<td class="td-operation" style="padding-bottom: 7px;padding-top: 7px;"><a class="btn btn-xs btn-view btn-success" onclick="showViewModal(this);" data-toggle="modal" href=''>详情</a>    <a class="btn btn-xs btn-alter btn-primary" onclick="showAlterModal(this);" data-toggle="modal" href=''>修改</a></td>`);
        tr.append(tdId, tdUsername, tdReallyname, tdrole, tdDept, tdTel, tdState,tdOperation);
        tbody.append(tr);
    });
}
// 显示修改模态显示修改模态框
function showAlterModal(target){
    initialForm(target);
    function initialForm(target){
        $("#alterModal").modal("show");
        var id = target.parentNode.parentNode.getElementsByClassName("td-id")[0].innerHTML;
        Vac.ajax({
            url: address3 + "userController/selectByPrimaryKey",
            data: {id},
            success: (data) => {
                $("#alter-id").val(data.id);
                $("#alter-username").val(data.username);
                $("#alter-name").val(data.reallyname);
                $("#alter-role").val(data.role);
                $("#alter-department").val(data.dept);
                $("#alter-state").val(data.status);
                $("#alter-phonenumber").val(data.phone);
                $("#alter-telephone").val(data.tel);
                $("#alter-email").val(data.email);
            }
        });
    }
}
// 显示添加模态框
function showAddModal(){
    loginDetect().then(
        function(response){
            if(response.success === true){
                initialForm(target);
            }else{
                $("#vac-nologin-alert").modal('show');
                return;
            }
        },
        function(){
            $("#vac-nologin-alert").modal('show');
            return;
        });
    function initialForm(target){
        $("#addModal").modal("show");
        
    }
}
function showViewModal(target){
     $("#viewModal").modal("show");
     // $('#vac-alert').modal("show");
    var id = target.parentNode.parentNode.getElementsByClassName("td-id")[0].innerHTML;
    Vac.ajax({
        url: address3 + "userController/selectByPrimaryKey",
        data: {id},
        success: (data) => {
            $("#view-username").val(data.username);
            $("#view-name").val(data.reallyname);
            $("#view-role").val(data.role);
            $("#view-department").val(data.dept);
            $("#view-state").val(data.status);
            $("#view-phonenumber").val(data.phone);
            $("#view-telephone").val(data.tel);
            $("#view-email").val(data.email);
        }
    });
}


// 点击搜索按钮
function search(){
    var key = $("#search-type").val();      //select value
    var searchkey = $("#searchKey").val();  //input value
    for(var data in sendData){
        sendData[data] = "";
    }
    sendData["sort"] = "asc";
    sendData["order"] = "id";
    var page = 1; // 页码
    var rows = showRows;  //每页的大小
    var data =getSendData(page,rows);
    if(key == "role") data["roleCn"] = searchkey;//角色搜索
    else data[key] = searchkey; //其他搜索

    Vac.ajax({
        url: address3 + "userController/pagedBatchQueryUser",
        data: data,
        success: function(data){
            if (data.respCode === '0000') {
                dataSet = data.list;
                totalRows = data.totalCount;
                createTable(dataSet);
                updatePagination(data.totalCount,1);
                // func(totalRows, page);
            } else {
                Vac.alert('搜索结果不存在');
                let tbody = $("#example tbody");
                tbody.empty();
                for(var i = 0;i<maxPage;i++) lis[i].style.display = "none";
                $("#nextPage").parent("li").addClass("disabled");
                $("#lastPage").parent("li").addClass("disabled");
                totalPage = 0;
            }
        }
    });
}
// 点击搜索按钮结束
// var addModalVue
var addModalVue = new Vue({
    el: '#addModal',
    data: {
        username: '',
        reallyname: '',
        password: '',
        repassword: '',
        role: '',
        dept: '',
        tel: '',
        phone: '',
        email: '',
        status: '',
        iconHide: true,
        toolHide: true,
        // 
        formValidation: null
    },
    ready: function() {
        this.formValidation = new Vac.formValidation()
        this.formValidation.setValidation('username', 'add-icon-username', 'add-tip-username', { required: {message: '用户名不能为空'} })
    },
    methods: {
        addUser: function() {
            // console.log(this.formValidation.validAll())
        }
    }
})
$("#addModal").on("hidden.bs.modal",function(e){
    addModalVue.username = ''
    addModalVue.reallyname = ''
    addModalVue.password = ''
    addModalVue.repassword = ''
    addModalVue.role = ''
    addModalVue.status = ''
    addModalVue.dept = ''
    addModalVue.phone = ''
    addModalVue.email = ''
    addModalVue.tel = ''
    $('.valid').addClass('hide').removeClass('show')
})