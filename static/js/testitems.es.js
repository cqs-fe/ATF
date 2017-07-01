var showRows = null;
var dataSet = null;
var totalRows = null;
var currentPage = 1;
var maxPage = 7;//可以显示的最多页码
var minShowPage = 1;  //  当前显示的最小的页码
var maxShowPage = 7;   //显示的最大的页码
var totalPage = 0;

var itemId;

var sendData = {
    order:"id",
    sort:"asc",
    testProjectName:"",
    type:"",
    userId:"",
    autId:"",
    productLineId:""
};

$(document).ready(function(){
    //页面的初始化操作
    // 立即执行函数，获取服务器全部数据
    (function() {
        $("#showRows").val("2");
        showRows =  $("#showRows").val();
        let xmlHttpRequest = null;
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
                totalRows = obj.total;
                dataSet = destructe(obj.rows);
                initialTable();
            }
        };
        let page = 1;
        let rows = showRows;
        let data = getSendData(page,rows);
        xmlHttpRequest.send(data);
    })();// 立即执行函数，获取服务器全部数据结束

    // 添加模态框显示时的初始化
    (function(){
        $("a[id='addModalBtn']").click(function(){

            loginDetect().then(
                function(response){
                    if(response.success === true){
                        initialForm(response.obj.id, response.obj.username);
                    }else{
                        $("#vac-nologin-alert").modal('show');
                        return;
                    }
                },
                function(){
                    $("#vac-nologin-alert").modal('show');
                    return;
                });

            // initial Form
            function initialForm(userid, username){
                $('#addModal').modal('show');
                $('#createUser').val(userid);
            };// initial Form end

        });
    })(); //添加模态框显示时的初始化 结束

    // addModal模态框隐藏后重置
    $('#addModal').on('hidden.bs.modal', function(e){
        $('#itemname').val("");
        $('#itemLine').empty();
        $('#createUser').empty();
        $('#itemAut').empty();
        $('#itemdesc').val("");
        $('#add-feedback-itemname').removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style","color:#b94a48");
        $('#btn-add').attr("disabled", true);
        $('#add-input-detecting').show();
    }); // addModal模态框隐藏后重置 结束
    $("#alterModal").on("hidden.bs.modal", function(e){
        $('#alter-itemname').val("");
        $("#alter-createUser").empty();
        $('#alter-itemline').empty();
        $('#alter-itembelong').empty();
        $('#alter-itemdesc').text("");
        $("#alter-input-detecting").addClass("hide");
        $("#btn-alter").attr("disabled", false);
        $('#alter-feedback-itemname').attr("class","col-lg-1 glyphicon glyphicon-ok hide").attr("style","color:#468847");
    });

    // 检测输入状态
    (function(){
        var itemname = $("#itemname");
        var itemnamefeedback = $("#add-feedback-itemname");
        itemname.change(function(){
            var content = itemname.val();
            var alertDiv =  $("#add-input-detecting");
            if(content !== ""){
               $('#add-feedback-itemname').removeClass("glyphicon-remove").addClass("glyphicon-ok").attr("style","color:#468847");
               $('#add-input-detecting').hide();
               $('#btn-add').attr("disabled", false);
            }else{
                $('#add-feedback-itemname').removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style","color:#b94a48");
                $('#add-input-detecting').show();
                $('#btn-add').attr("disabled", true);
            }
        });
    })();
    // 检测输入状态结束

    //添加按钮，发送ajax
    (function(){
        $("#btn-add").click(function(){
            var data = $("#addForm").serialize()+"&createDate="+Vac.getNowFormatDate();
            $.ajax({
                url: address + "testProjectController/insert",
                type: "post",
                dataType: "json",
                data: data,
                success: function(data, textStatus){
                    if(data.success === true){
                        $("#successModal").modal("show");
                        $("#addModal").modal("hide");
                    }else{
                        $("#failModal").modal("show");
                    }
                }

            });
        });
    })();
    //添加按钮，发送ajax 结束

    //更改按钮，发送ajax
    (function(){
        $("#btn-alter").click(function(){
            var data = $("#alterForm").serialize()+"&id="+itemId+"&createDate=";
            $.ajax({
                url: address + "testProjectController/update",
                type: "post",
                dataType: "json",
                data: data,
                success: function(data, textStatus){
                    if(data.success === true){
                        $("#successModal").modal("show");
                        $("#alterModal").modal("hide");
                    }else{
                        $("#failModal").modal("show");
                    }
                }

            });
        });
    })();
    //更改按钮，发送ajax end

    // 检测alterModal输入状态
    (function(){
        var itemname = $("#alter-itemname");
        var itemnamefeedback = $("#alter-feedback-itemname");
        itemname.change(function(){
            var content = itemname.val();
            var alertDiv =  $("#alter-input-detecting");
            if(content !== ""){
               $('#alter-feedback-itemname').removeClass("glyphicon-remove hide").addClass("glyphicon-ok").attr("style","color:#468847");
               $('#alter-input-detecting').addClass("hide");
               $('#btn-alter').attr("disabled", false);
           }else{
            $('#alter-feedback-itemname').removeClass("glyphicon-ok hide").addClass("glyphicon-remove").attr("style","color:#b94a48");
            $('#alter-input-detecting').removeClass("hide");
            $('#btn-alter').attr("disabled", true);
        }
    });
    })();// 检测输入状态结束

    //
    $("#nextPage").click(nextPage);
    $("#previousPage").click(previousPage);
    $("#firstPage").click(firstPage);
    $("#lastPage").click(lastPage);
    $("#btn-gotoPage").click(gotoPage);
    document.getElementById("showRows").onchange = changeShowRows;
    $("#btn-search").click(search);
})

//初始化table
function initialTable() {

    createTable(dataSet);
    // 初始化分页组件
    totalPage = Math.ceil(totalRows / showRows); // 全部页码的数量
    $("#gotoPage").attr("max",totalPage);
    $('#currentPageId').text(currentPage);
    $('#totalPages').text(totalPage);
    for(let i = 1; i <= (totalPage <= maxPage ? totalPage : maxPage); i++){
        let a = $(`<a class="pageIndex" onclick="updateTableAndPagination(this.innerHTML)"></a>`).text(i);
        let li = $(`<li></li>`).append(a);
        if(i === currentPage){
            li.attr('class', "active");
        }
        $('#nextPage').parent('li').before(li);
    }
}
//初始化table 结束

// Show alter modal
function showAlterModal(button){
    loginDetect().then(
        function(response){
            if(response.success === true){
                initialForm(response.obj.id, response.obj.username);
            }else{
                $("#vac-nologin-alert").modal('show');
                return;
            }
        },
        function(){
            $("#vac-nologin-alert").modal('show');
            return;
        });
    //console.log(this);
    var tr = button.parentNode.parentNode;
    itemId = tr.getElementsByClassName("td-itemId")[0].innerHTML;
    var itemName = tr.getElementsByClassName("td-name")[0].innerHTML;
    var itemType = tr.getElementsByClassName("td-type")[0].innerHTML;
    // var autName = tr.getElementsByClassName("td-autName")[0].innerHTML;
    var description = tr.getElementsByClassName("td-description")[0].innerHTML;
        // initial Form
    function initialForm(userid, username){
        $('#alterModal').modal('show');
         var tr = button.parentNode.parentNode;
        var itemId = tr.getElementsByClassName("td-itemId")[0].innerHTML;
        var itemName = tr.getElementsByClassName("td-name")[0].innerHTML;
        var itemType = tr.getElementsByClassName("td-type")[0].innerHTML;
        var user = tr.getElementsByClassName('td-user')[0].innerHTML;
        var projectCode = tr.getElementsByClassName('td-projectCode')[0].innerHTML;
        var date = tr.getElementsByClassName('td-createDate')[0].innerHTML;
        var description = tr.getElementsByClassName("td-description")[0].innerHTML;

        $('#alter-itemcode').val(itemId);
        $('#alter-itemname').val(itemName);
        $('#alter-itemtype').val(itemType);
        $('#alter-createDate').val(date);
        $('#alter-createUser').val(user);
        $('#alter-projectCode').val(projectCode);
        $('#alter-itemdesc').text(description);

    };// initial Form end
}
// Show alter modal end
// Show view modal
function showViewModal(button){
    $("#viewModal").modal("show");
    var tr = button.parentNode.parentNode;
    var itemId = tr.getElementsByClassName("td-itemId")[0].innerHTML;
    var itemName = tr.getElementsByClassName("td-name")[0].innerHTML;
    var itemType = tr.getElementsByClassName("td-type")[0].innerHTML;
    var user = tr.getElementsByClassName('td-user')[0].innerHTML;
    var projectCode = tr.getElementsByClassName('td-projectCode')[0].innerHTML;
    var date = tr.getElementsByClassName('td-createDate')[0].innerHTML;
    var description = tr.getElementsByClassName("td-description")[0].innerHTML;

    $('#view-itemcode').val(itemId);
    $('#view-itemname').val(itemName);
    $('#view-itemtype').val(itemType);
    $('#view-createDate').val(date);
    $('#view-createUser').val(user);
    $('#view-projectCode').val(projectCode);
    $('#view-itemdesc').text(description);
}
// Show view modal end

//更新table 以及页码
function updateTableAndPagination(destinatePage){
    var page = destinatePage; // 页码
    var rows = showRows;  //每页的大小
    var data =getSendData(page,rows);
    $.ajax({
        url: address + "testProjectController/selectAllByPage",
        type: "post",
        data: data,
        dataType: 'json',
        success: function(data, statusText){
            if(data.total >= 0){
                dataSet = destructe(data.rows);
                createTable(dataSet);
                var lis = document.getElementById("pagination").getElementsByTagName("li");
                var i = 0;
                for (i = 0; i < lis.length; i++){
                    if(lis[i].getAttribute("class") === "active"){
                        lis[i].setAttribute("class", "");
                    }
                    if(lis[i].firstChild.innerHTML == destinatePage)
                    {lis[i].setAttribute("class","active");}
                }

                currentPage = destinatePage;
                totalPage = Math.ceil(data.total / showRows);
                $("#gotoPage").attr("max",totalPage);
                $('#currentPageId').text(currentPage);
                $('#totalPages').text(totalPage);
                paginationControl(totalPage, currentPage);
            }
        }
    });

}
//更新table 以及页码 结束

//点击下一页
function nextPage(){
    if(parseInt(currentPage) >= parseInt(totalPage)){
        return;
    }
    var page = parseInt(currentPage) + 1; // 页码
    var rows = showRows;  //每页的大小
    var data =getSendData(page,rows);
    $.ajax({
        url: address + "testProjectController/selectAllByPage",
        type: "post",
        data: data,
        dataType: 'json',
        success: function(data, statusText){
            if(data.total >= 0){
                var dataSet = null;
                dataSet = destructe(data.rows);
                createTable(dataSet);
                currentPage = parseInt(page);
                var pagination = document.getElementById("pagination");
                var lis = pagination.getElementsByTagName("li");
                if(currentPage > maxShowPage){
                    pagination.removeChild(lis[2]);
                    var newli = document.createElement("li");
                    var newa = document.createElement("a");
                    newa.setAttribute("onclick","updateTableAndPagination(this.innerHTML)");
                    var textNode = document.createTextNode(currentPage);
                    newa.append(textNode);
                    newli.appendChild(newa);
                    pagination.insertBefore(newli, document.getElementById("nextPage").parentNode);
                    minShowPage += 1;
                    maxShowPage += 1;
                }
                lis = pagination.getElementsByTagName("li");
                var i = 0;
                for (i = 0; i < lis.length; i++){
                    if(lis[i].getAttribute("class") === "active"){
                        lis[i].setAttribute("class", "");
                    }
                    if(lis[i].firstChild.innerHTML == page)
                    {lis[i].setAttribute("class","active");}
                }

                totalPage = Math.ceil(data.total / showRows);
                $("#gotoPage").attr("max",totalPage);
                $('#currentPageId').text(currentPage);
                $('#totalPages').text(totalPage);
                paginationControl(totalPage, currentPage);
            }
        }
    });
}
//点击下一页 结束

// 点击上一页
function previousPage(){
    if(parseInt(currentPage) <= 1){
        return;
    }
    var page = parseInt(currentPage) - 1; // 页码
    var rows = showRows;  //每页的大小
    var data = getSendData(page, rows);
    $.ajax({
        url: address + "testProjectController/selectAllByPage",
        type: "post",
        data: data,
        dataType: 'json',
        success: function(data, statusText){
            if(data.total >= 0){
                var dataSet = null;
                dataSet = destructe(data.rows);
                createTable(dataSet);

                currentPage = parseInt(page);
                var pagination = document.getElementById("pagination");
                var lis = pagination.getElementsByTagName("li");
                if(currentPage < minShowPage){
                    var newli = document.createElement("li");
                    var newa = document.createElement("a");
                    newa.setAttribute("onclick","updateTableAndPagination(this.innerHTML)");
                    var textNode = document.createTextNode(currentPage);
                    newa.append(textNode);
                    newli.appendChild(newa);
                    pagination.insertBefore(newli, lis[2]);
                    pagination.removeChild(document.getElementById("nextPage").parentNode.previousSibling);
                    minShowPage -= 1;
                    maxShowPage -= 1;
                }
                lis = pagination.getElementsByTagName("li");
                var i = 0;
                for (i = 0; i < lis.length; i++){
                    if(lis[i].getAttribute("class") === "active"){
                        lis[i].setAttribute("class", "");
                    }
                    if(lis[i].firstChild.innerHTML == page)
                    {lis[i].setAttribute("class","active");}
                }

                totalPage = Math.ceil(data.total / showRows);
                $("#gotoPage").attr("max",totalPage);
                $('#currentPageId').text(currentPage);
                $('#totalPages').text(totalPage);
                paginationControl(totalPage, currentPage);
            }
        }
    });
}
//点击上一页 结束

//点击首页
function firstPage(){
    var page = 1; // 页码
    var rows = showRows;  //每页的大小
    var data = getSendData(page, rows);
    $.ajax({
        url: address + "testProjectController/selectAllByPage",
        type: "post",
        data: data,
        dataType: 'json',
        success: function(data, statusText){
            if(data.total >= 0){
                dataSet = destructe(data.rows);
                createTable(dataSet);

                currentPage = parseInt(page);
                var pagination = document.getElementById("pagination");
                var lis = pagination.getElementsByTagName("li");
                var i = 0;
                for (i = 2; i < lis.length - 2; i++){
                    lis[i].firstChild.innerHTML = i-1;
                    if(lis[i].getAttribute("class") === "active"){
                        lis[i].setAttribute("class", "");
                    }
                    if(lis[i].firstChild.innerHTML == currentPage)
                    {lis[i].setAttribute("class","active");}
                }

                maxShowPage = 7;
                minShowPage = 1;
                totalPage = Math.ceil(data.total / showRows);
                $("#gotoPage").attr("max",totalPage);
                $('#currentPageId').text(currentPage);
                $('#totalPages').text(totalPage);
                paginationControl(totalPage, currentPage);
            }
        }
    });
}
//点击首页结束

// 点击尾页
function lastPage(){
    var page = totalPage; // 页码
    var rows = showRows;  //每页的大小
    var data = getSendData(page,rows);
    $.ajax({
        url: address + "testProjectController/selectAllByPage",
        type: "post",
        data: data,
        dataType: 'json',
        success: function(data, statusText){
            if(data.total >= 0){
                dataSet = destructe(data.rows);
                createTable(dataSet);
                currentPage = parseInt(page);
                var pagination = document.getElementById("pagination");
                var lis = pagination.getElementsByTagName("li");
                var i = 0;
                var currentMaxPage = totalPage <= maxPage ? totalPage : maxPage;
                for (i = 2; i < lis.length - 2; i++){
                    lis[i].firstChild.innerHTML = totalPage + i - currentMaxPage - 1;
                    if(lis[i].getAttribute("class") === "active"){
                        lis[i].setAttribute("class", "");
                    }
                    if(lis[i].firstChild.innerHTML == currentPage)
                    {lis[i].setAttribute("class","active");}
                }

                maxShowPage = totalPage;
                minShowPage = totalPage - maxPage + 1;
                totalPage = Math.ceil(data.total / showRows);
                $("#gotoPage").attr("max",totalPage);
                $('#currentPageId').text(currentPage);
                $('#totalPages').text(totalPage);
                paginationControl(totalPage, currentPage);
            }
        }
    });
}
// 点击尾页结束

// gotoPage
function gotoPage(){
    var destinatePage = parseInt($("#gotoPage").val());
    var page = destinatePage; // 页码
    var rows = showRows;  //每页的大小
    var data = getSendData(page,rows);
    $.ajax({
        url: address + "testProjectController/selectAllByPage",
        type: "post",
        data: data,
        dataType: 'json',
        success: function(data, statusText){
            if(data.total >= 0){
                dataSet = destructe(data.rows);
                createTable(dataSet);
                currentPage = parseInt(page);
                if(minShowPage <= currentPage && maxShowPage >= currentPage){
                    var lis = document.getElementById("pagination").getElementsByTagName("li");
                    var i = 0;
                    for(i = 2; i < lis.length - 2; i++){
                        if(lis[i].getAttribute("class") === "active"){
                            lis[i].setAttribute("class", "");
                        }
                        if(lis[i].firstChild.innerHTML == currentPage)
                        {lis[i].setAttribute("class","active");}
                    }
                }else if(currentPage < minShowPage){
                    var pagination = document.getElementById("pagination");
                    var lis = pagination.getElementsByTagName("li");
                    var i = 0;
                    for (i = 2; i < lis.length - 2; i++){
                        lis[i].firstChild.innerHTML = currentPage + i - 2;
                        if(lis[i].getAttribute("class") === "active"){
                            lis[i].setAttribute("class", "");
                        }
                        if(lis[i].firstChild.innerHTML == currentPage)
                        {lis[i].setAttribute("class","active");}
                    }
                    maxShowPage = currentPage + maxPage - 1;
                    minShowPage = currentPage;
                }else{
                    var pagination = document.getElementById("pagination");
                    var lis = pagination.getElementsByTagName("li");
                    var i = 0;
                    for (i = 2; i < lis.length - 2; i++){
                        lis[i].firstChild.innerHTML = currentPage - (maxPage+1) + i;
                        if(lis[i].getAttribute("class") === "active"){
                            lis[i].setAttribute("class", "");
                        }
                        if(lis[i].firstChild.innerHTML == currentPage)
                        {lis[i].setAttribute("class","active");}
                    }
                    maxShowPage = currentPage;
                    minShowPage = currentPage - maxPage + 1;
                }
                totalPage = Math.ceil(data.total / showRows);
                $("#gotoPage").attr("max",totalPage);
                $('#currentPageId').text(currentPage);
                $('#totalPages').text(totalPage);
                paginationControl(totalPage, currentPage);
            }
        }
    });

}
// gotoPage End
//控制首页尾页等的可用性
function paginationControl(totalPage, currentPage){
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

// 改变每一页显示的行数
function changeShowRows(event){
    // var index = event.target.selectedIndex;  //get the selectedIndex
    //showRows = event.target.value;
    var page = 1; // 页码
    var rows = event.target.value;  //每页的大小
    var data = getSendData(page, rows);
    $.ajax({
        url: address + "testProjectController/selectAllByPage",
        type: "post",
        data: data,
        dataType: 'json',
        success: function(data, statusText){
            if(data.total >= 0){
                showRows = rows;
                dataSet = destructe(data.rows);
                createTable(dataSet);
                currentPage = 1;
                // 初始化分页组件
                var pagination = document.getElementById("pagination");
                var lis = pagination.getElementsByTagName("li");
                var currentMaxPage = totalPage <= maxPage ? totalPage : maxPage;
                var i = 0;
                for(i = 0; i < currentMaxPage;i++){
                     //console.log(document.getElementById("previousPage").parentNode.nextSibling.nodeName);
                    if(document.getElementById("previousPage").parentNode.nextSibling.nodeName != "LI"){
                        i--;
                    }
                    pagination.removeChild(document.getElementById("previousPage").parentNode.nextSibling);
                }
                totalPage = Math.ceil(data.total / showRows); // 全部页码的数量
                minShowPage = 1;
                maxShowPage = totalPage <= maxPage ? totalPage : maxPage;
                $("#gotoPage").attr("max",totalPage);
                $('#currentPageId').text(currentPage);
                $('#totalPages').text(totalPage);
                for( i = 1; i <= (totalPage <= maxPage ? totalPage : maxPage); i++){
                    let a = $(`<a class="pageIndex" onclick="updateTableAndPagination(this.innerHTML)"></a>`).text(i);
                    let li = $(`<li></li>`).append(a);
                    if(i === currentPage){
                        li.attr('class', "active");
                    }
                    $('#nextPage').parent('li').before(li);
                }
                paginationControl(totalPage, currentPage);
            }
        }
    });

}
// 改变每一页显示的行数 结束

function createTable(dataSet){
    var tbody = $("#example tbody");
    tbody.empty();
    dataSet.forEach(value => {
    let tr = $('<tr></tr>');
    let tdId = $(`<td class="td-itemId"></td>`).text(value.id);
    let tdName = $(`<td class="td-name"></td>`).text(value.testProjectName);
    let tdType = $(`<td class="td-type"></td>`).text(value.type);
    let tdUser = $(`<td class="td-user"></td>`).text(value.user);
    let tdCreateDate = $(`<td class="td-createDate"></td>`).text(value.createDate);
    let tdDescription = $(`<td class="td-description"></td>`).text(value.taskDescription);
    let tdProjectCode = $(`<td class="td-projectCode"></td>`).text(value.testProjectCode);
    let tdOperation = $(`<td class="td-operation"><a data-toggle="modal" class="btn btn-view btn-white" onclick="showViewModal(this);" href=''>查看</a><a class="btn btn-alter btn-white" onclick="showAlterModal(this);" data-toggle="modal" href=''>修改</a></td>`);
    tr.append(tdId, tdName, tdType, tdUser, tdProjectCode, tdCreateDate, tdDescription,tdOperation);
    tbody.append(tr);
    });
}

function destructe(data){
    var newData = null;
    newData = data.map(function(value){
        var newValue = {};
        ({
            id: newValue.id,
            testProjectCode:  newValue.testProjectCode,
            testProjectName: newValue.testProjectName,
            type: newValue.type,
            createDate: newValue.createDate,
            taskDescription: newValue.taskDescription,
            creatorId:newValue.user,
        } = value);
        return newValue;
    });
    console.log(newData)
    return newData;
}
//控制首页尾页等的可用性 结束

// 点击搜索按钮
function search(){
    var key = $("#search-type").val();           //select value
    var searchkey = $("#searchKey").val();  //input value
    for(var data in sendData){
        sendData[data] = "";
    }
    sendData[key] = searchkey;
    sendData["sort"] = "asc";
    sendData["order"] = "id";

    var page = 1; // 页码
    var rows = showRows;  //每页的大小
    var data =getSendData(page,rows);
    $.ajax({
        url: address + "testProjectController/selectAllByPage",
        type: "post",
        data: data,
        dataType: 'json',
        success: function(data, statusText){
            if(data.total >= 0){
                dataSet = destructe(data.rows);
                console.log(dataSet);
                createTable(dataSet);

                var pagination = document.getElementById("pagination");
                var currentMaxPage = totalPage <= maxPage ? totalPage : maxPage;
                var i = 0;
                for(i = 0; i < currentMaxPage; i++){
                    if(document.getElementById("previousPage").parentNode.nextSibling.nodeName != "LI"){
                        i--;
                    }
                    pagination.removeChild(document.getElementById("previousPage").parentNode.nextSibling);
                }
                currentPage = 1;
                totalPage = Math.ceil(data.total / showRows);
                $("#gotoPage").attr("max",totalPage);
                $('#currentPageId').text(currentPage);
                $('#totalPages').text(totalPage);

                for(i = 1; i <= (totalPage <= maxPage ? totalPage : maxPage); i++){
                    let a = $(`<a class="pageIndex" onclick="updateTableAndPagination(this.innerHTML)"></a>`).text(i);
                    let li = $(`<li></li>`).append(a);
                    if(i === currentPage){
                        li.attr('class', "active");
                    }
                    $('#nextPage').parent('li').before(li);
                }
                paginationControl(totalPage, currentPage);
            }
        }
    });

}
// 点击搜索按钮结束

//重新排序
function resort(target){
    var spans = target.parentNode.getElementsByTagName("span");
    for(var span in spans){
        if(spans[span].nodeName === "SPAN"){
            spans[span].setAttribute("class","");
        }
    }
    if(target.getAttribute("data-sort") === "desc"){
         console.log(target.getAttribute("data-sort"));
        sendData.sort = "asc";
        target.getElementsByTagName("span")[0].setAttribute("class","icon-sort-up")
        target.setAttribute("data-sort", "asc");
    }else{
        console.log(target.getAttribute("data-sort"));
        sendData.sort = "desc";
        target.getElementsByTagName("span")[0].setAttribute("class","icon-sort-down")
        target.setAttribute("data-sort", "desc");
    }
    sendData.order = target.getAttribute("data-order");
    updateTableAndPagination(currentPage);
}
//重新排序 结束
//检测用户登录状态，添加 更改操作需要有登陆权限
function loginDetect(){
    return new Promise(function(resolve, reject){
        var sessionId = window.sessionStorage.getItem("sessionId");
        if(sessionId !== null && sessionId !== ""){
            var client = null;
            if(window.XMLHttpRequest){
                client = new XMLHttpRequest();
            }else{
                client = new ActiveXObject("Microsoft.XMLHTTP");
            }
            var url = address + "userController/getUser";
            client.open("POST", url, true);
            client.onreadystatechange = function(){
                if(this.readyState !== 4){
                    return;
                }
                if(this.status === 200){
                    resolve(this.response);
                }else{
                    reject(new Error(this.statusText));
                }
            };
            client.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
            client.responseType = "json";
            client.setRequestHeader("Accept", "application/json");
            // console.log(sessionId);
            var data = "sessionId=" + sessionId;
            client.send(data);

        }else{
            reject();
        }
    });
}
//检测用户登录状态，添加 更改操作需要有登陆权限 结束
//得到发送的data
function getSendData(page, rows){
    return "page="+page+"&rows="+rows+"&order="+sendData.order+"&sort="+sendData.sort+"&testProjectName="+sendData.testProjectName+"&type="+sendData.type+"&userId="+sendData.userId+"&autId="+sendData.autId+"&productLineId="+sendData.productLineId;
}
//得到发送的data
