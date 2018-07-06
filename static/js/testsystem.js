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
};
$(document).ready(function(){
    //执行页面的初始化
    // 获取服务器数据
    (function(){
        $("#showRows").val("3");
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
            if(parseInt(page) > totalPage){return;}
            sendQuery(page,updatePagination); 
        };
        document.getElementById("btn-freshTable").onclick = function(){
            sendQuery(1,updatePagination); 
        };
        document.getElementById("showRows").onchange = function(event){
            showRows = event.target.value;
            sendQuery(1,updatePagination); 
        }
    })();
    // 页面跳转相关按钮事件点击初始化 结束

    //模态框相关初始化
    (function(){
        document.getElementById("addModalBtn").onclick = showAddModal;
        $("#addModal").on("hidden.bs.modal", function(e){
            $("#autCode").val("");
            $("#autName").val("");
            $("#version").val("");
            $("#autType").val("");
            $("#add-feedback-autCode").removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style","color:#b94a48");
            $("#add-feedback-autName").removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style","color:#b94a48");
            $("#add-feedback-version").removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style","color:#b94a48");
            $("#add-feedback-autType").removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style","color:#b94a48");
            $("#add-input-detecting").attr("hidden", false);
            $("#btn-add").attr("disabled", true);
        });
        $("#btn-add").click(function(){
            var data = $("#addForm").serialize()+"&maincodeBegin=&maincodeEnd=";
            $.ajax({
                url: address + "autController/insert",
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
        $("#alterModal").on("hidden.bs.modal", function(e){
            $("#alter-autCode").val("");
            $("#alter-autName").val("");
            $("#alter-version").val("");
            $("#alter-autType").val("");
            $("#alter-feedback-autCode").attr("class","col-lg-1 glyphicon hide").attr("style","color:#b94a48");
            $("#alter-feedback-autName").attr("class","col-lg-1 glyphicon hide").attr("style","color:#b94a48");
            $("#alter-feedback-version").attr("class","col-lg-1 glyphicon hide").attr("style","color:#b94a48");
            $("#alter-feedback-autType").attr("class","col-lg-1 glyphicon hide").attr("style","color:#b94a48");
            $("#alter-input-detecting").attr("hidden", true);
            $("#btn-alter").attr("disabled", false);
        });
        $("#btn-alter").click(function(){
            var data = $("#alterForm").serialize()+"&maincodeBegin=&maincodeEnd=";
            $.ajax({
                url: address + "autController/update",
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
    //模态框相关初始化 结束
});

function updatePagination(totalRows, page){
    totalPage = Math.ceil(totalRows / showRows);
    currentPage = totalPage == 0 ? 0 : page;
    var currentMaxPage = totalPage <= maxPage ? totalPage : maxPage;
    var i = 0;
    for(i = 0; i < maxPage; i++){
        if(i < currentMaxPage){
            lis[i].style.display = "inline";
        }else{
            lis[i].style.display = "none";
        }
        // lis[i].getElementsByTagName("a")[0].innerHTML = currentPage - currentMaxPage + 1 + i;
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
    $.ajax({
        url: address + "autController/selectAllByPage",
        type: "post",
        data: data,
        dataType: "json",
        success: function(data, statusText){
            dataSet = data.rows;
            var totalRows = data.total;
            createTable(dataSet);
            func(totalRows, page);
        }
    });
}
//获取发送数据
function getSendData(page, rows){
    return "page="+page+"&rows="+rows+"&order="+sendData.order+"&sort="+sendData.sort;
}
//控制首页尾页等的可用性
function paginationControl(totalPage, currentPage){
    document.getElementById("currentPageId").innerHTML = currentPage;
    document.getElementById("totalPages").innerHTML = totalPage;
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
        var tdAutCode = $(`<td class="td-autCode"></td>`).text(value.autCode);
        var tdAutName = $(`<td class="td-autName"></td>`).text(value.autName);
        var tdVersion = $(`<td class="td-version"></td>`).text(value.version);
        var tdAutType = $(`<td class="td-autType"></td>`).text(value.autType);
        var tdOperation = $(`<td class="td-operation"><a class="btn btn-alter btn-white" onclick="showAlterModal(this);" data-toggle="modal" href=''>修改</a></td>`);
        tr.append(tdId, tdAutCode, tdAutName, tdVersion, tdAutType, tdOperation);
        tbody.append(tr);
    });
}
function showAddModal(){
    loginDetect().then(
        function(response){
            if(response.success === true){
                initialForm();
            }else{
                $("#vac-nologin-alert").modal('show');
                return;
            }
        },
        function(){
            $("#vac-nologin-alert").modal('show');
            return;
        });
    function initialForm(){
        $("#addModal").modal("show");
    }
}
function showAlterModal(target){
    loginDetect().then(
        function(response){
            if(response.success === true){
                initialForm();
            }else{
                $("#vac-nologin-alert").modal('show');
                return;
            }
        },
        function(){
            $("#vac-nologin-alert").modal('show');
            return;
        });
    function initialForm(){
        $("#alterModal").modal("show");
        $("#alter-autCode").val(target.parentNode.parentNode.getElementsByClassName("td-id")[0].innerHTML);
        $("#alter-autName").val(target.parentNode.parentNode.getElementsByClassName("td-autCode")[0].innerHTML);
        $("#alter-version").val(target.parentNode.parentNode.getElementsByClassName("td-version")[0].innerHTML);
        $("#alter-autType").val(target.parentNode.parentNode.getElementsByClassName("td-autType")[0].innerHTML);
    }
}

function detectInput(target){
    var modalId = target.getAttribute("data-modal-id");
    var value = target.value;
    var span = target.parentNode.parentNode.getElementsByTagName("span")[0];
    if(value === ""){
        span.setAttribute("class","col-lg-1 glyphicon glyphicon-remove");
        span.style.color = "#b94a48";
    }else{
        span.setAttribute("class","col-lg-1 glyphicon glyphicon-ok");
        span.style.color = "#468847";
    }
    formDetect(modalId);
}
//随时检测表单输入的内容是否完整，并设置相关的提示
function formDetect(modalId){
    var modal = document.getElementById(modalId);
    var tooltips = modal.getElementsByClassName("glyphicon-remove");
    
    if (tooltips.length == 0) {
        modal.getElementsByClassName("btn-submit")[0].removeAttribute("disabled");
        modal.getElementsByClassName("input-detecting")[0].setAttribute("hidden","");
    } else {
        modal.getElementsByClassName("btn-submit")[0].setAttribute("disabled","");
        modal.getElementsByClassName("input-detecting")[0].removeAttribute("hidden");
    }
}