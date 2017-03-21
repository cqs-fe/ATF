// var dataSet = null;

// $(document).ready(function() {
//     // 立即执行函数，获取服务器全部数据
//     (function() {
//         let xmlHttpRequest;
//         if (window.XMLHttpRequest) {
//             xmlHttpRequest = new XMLHttpRequest();
//         } else {
//             xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         let url = address + "testProjectController/selectAllByPage";
//         xmlHttpRequest.open("post", url, true);
//         xmlHttpRequest.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
//         xmlHttpRequest.onreadystatechange = function() {
//             if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
//                 let str = xmlHttpRequest.responseText;
//                 let obj = eval("(" + str + ")");
//                 dataSet = obj.rows.map(value => {
//                     let newValue = {};
//                     ({
//                         id: newValue.id,
//                         testProjectName: newValue.testProjectName,
//                         type: newValue.type,
//                         createDate: newValue.createDate,
//                         taskDescription: newValue.taskDescription,
//                         user: { id: newValue.userid, username: newValue.username, reallyname: newValue.reallyname },
//                         aut: { id: newValue.autid, autCode: newValue.autCode, autName: newValue.autName },
//                         productLine: {
//                             id: newValue.productLineId,
//                             productLineName: newValue.productLineName
//                         }
//                     } = value);
//                     return newValue;
//                 });
//                 initialTable();
//             }
//         };
//         let page = 1;
//         let rows = 10000;
//         let order = "id";
//         let data = "page=" + page + "&rows=" + rows + "&order=" + order + "&sort=asc&testProjectName=&type=&userId=&autId=&productLineId=";
//         xmlHttpRequest.send(data);
//     })();

//     initialTable();

//     function initialTable() {
//         let table = $('#example').DataTable({
//             "data": dataSet,
//             "columns": [
//             { data: "id" },
//             { data: "testProjectName" },
//             { data: "type" },
//             { data: "productLineId" },
//             { data: "productLineName" },
//             { data: "taskDescription" },
//             {
//                 targets: -1,
//                 data: null,
//                 defaultContent: "<button type='button' class='btn-tr' id='btn-viewRow' data-toggle='modal' href='#viewModal'>查看</button><button type='button' class='btn-tr' id='btn-alterRow'  data-toggle='modal' href='#alterModal'>修改</button>"
//             }
//             ],
//             "language": {
//                 "info": "显示 _START_ 到 _END_ 项，总共 _TOTAL_ 项",
//                 "lengthMenu": "显示 _MENU_ 条",
//                 "paginate": {
//                     "first": "首页",
//                     "last": "尾页",
//                     "next": "下一页",
//                     "previous": "上一页"
//                 },
//                 "search": "",
//             },
//             "aLengthMenu": [[2, 10, 25, -1], ["2", "10", "25", "所有"]],
//             'fnDrawCallback': function(table) {    
//                 $("#example_paginate").append(`  到第 <input type='text' id='changePage' class='input-text' style='width:50px;height:27px'> 页 <a class='btn btn-default shiny' href='javascript:void(0);' id='dataTable-btn' style='text-align:center'>确认</a>`);    
//                 var oTable = $("#example").dataTable();    
//                 $('#dataTable-btn').click(function(e) {    
//                     if($("#changePage").val() && $("#changePage").val() > 0) {    
//                         var redirectpage = $("#changePage").val() - 1;    
//                     } else {    
//                         var redirectpage = 0;    
//                     }    
//                     oTable.fnPageChange(redirectpage);    
//                 });    
//             } 
//         });
//         $(".dataTables_filter input").attr("placeholder", "请输入关键字");
//         $('#example tbody').on('click', '#btn-viewRow', function() {
//             $('#viewModal').modal('show');
//             let data = table.row($(this).parents('tr')).data();

//         });
//     }


//     document.querySelector("#itemcode").oninput = function() {
//       if(this.value === ""){
//         $("#add-feedback-itemcode").removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style", "color:#b94a48;");
//       }else {
//         $("#add-feedback-itemcode").removeClass("glyphicon-remove").addClass("glyphicon-ok").attr("style", "color:#468847;");
//       }
//       detectAddInput();
//     };
//     document.querySelector("#itemname").oninput = function() {
//         if(this.value === ""){
//             $("#add-feedback-itemname").removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style","color:#b94a48");
//         }else {
//             $("#add-feedback-itemname").removeClass("glyphicon-remove").addClass("glyphicon-ok").attr("style","color:#468847");
//         }
//         detectAddInput();
//     };
//     document.querySelector("#itemtype").onchange = function() {
//         $("#add-feedback-itemtype").removeClass("hidden");
//         detectAddInput();
//     };
//     // a function to detect the all input state, then change the availibity of the submit button
//     function detectAddInput() {
//         let spans = document.querySelectorAll("#addModal .glyphicon-remove");
//         if(spans.length === 0){
//             $("#btn-add").prop("disabled",false);
//             $("#add-input-detecting").addClass("hidden");
//         }else {
//             $("#btn-add").prop("disabled",true);
//             $("#add-input-detecting").removeClass("hidden");
//         }
//     }
//     document.querySelector("#btn-add").onclick = function() {
//         let itemcode = $('#itemcode').val();
//         let itemname = $('#itemname').val();
//         let itemtype = $('#itemtype').val();
//         let itemline = $('#itemline').val();
//         let itembelong = $('#itembelong').val();
//         let itemdesc = $('#itemdesc').val();

//     };
//     $('#addModal').on('hidden.bs.modal', (e) => {
//         $('#itemcode').val('').removeClass('glyphicon-ok').addClass('glyphicon-remove').attr("style", "color:#b94a48;");
//         $('#itemname').val('').removeClass('glyphicon-ok').addClass('glyphicon-remove').attr("style", "color:#b94a48;");
//         $('#itemtype').val('01').addClass('hidden');
//         $('#itemline').val('');
//         $('#itembelong').val('');
//         $('#itemdesc').val('');

//     });
// });
var showRows = null;
var dataSet = null;
var totalRows = null;
$(document).ready(() => {
    //页面的初始化操作
    // 立即执行函数，获取服务器全部数据
    (function() {
        $("#pageRows").val("2");
        showRows =  $("#pageRows").val();
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
        let rows = showRows;
        let order = "id";
        let data = "page=" + page + "&rows=" + rows + "&order=" + order + "&sort=asc&testProjectName=&type=&userId=&autId=&productLineId=";
        xmlHttpRequest.send(data);
    })();// 立即执行函数，获取服务器全部数据结束

    // 模态框显示时的初始化
    (function(){
        $("a[href='#addModal']").click(function(){
            var getLine = new Promise(function(resolve, reject){
                var client = null;
                if (window.XMLHttpRequest) {
                    client = new XMLHttpRequest();
                } else {
                    client = new ActiveXObject("Microsoft.XMLHTTP");
                }
                var url = address + "productLineController/selectAll";
                client.open("POST", url, true);
                client.onreadystatechange = handler;
                client.responseType = "json";
                client.setRequestHeader("Accept", "application/json");
                client.send();

                function handler() {
                    if(this.readyState !== 4){
                        return;
                    }
                    if(this.status === 200){
                        resolve(this.response);
                    }else{
                        reject(new Error(this.statusText));
                    }
                };
            });  // getLine end

            var getAut = new Promise(function(resolve, reject){
                var client = null;
                if(window.XMLHttpRequest){
                    client = new XMLHttpRequest();
                }else{
                    client = new ActiveXObject("Microsoft.XMLHTTP");
                }
                var url = address + "autController/selectAll";
                client.open("POST", url, true);
                client.onreadystatechange = handler;
                client.responseType = "json";
                client.setRequestHeader("Accept", "application/json");
                client.send();

                function handler(){
                    if(this.readyState !== 4){
                        return;
                    }
                    if(this.status === 200){
                        resolve(this.response);
                    }else{
                        reject(new Error(this.statusText));
                    }
                };
            });  // getAut end

            var promise = Promise.all([getLine, getAut]);
            promise.then(function([lineResponse, autResponse]){
                var itemLine = $("#itemLine");
                var productLines = lineResponse.obj;
                productLines.forEach(function(value){
                    var option = $("<option></option>").text(value.productLineName).attr("value",value.id);
                    itemLine.append(option);
                });

                var itemAut = $("#itemAut");
                var auts = autResponse.obj;
                auts.forEach(function(value){
                    var option = $("<option></option>").text(value.autName).attr("value", value.id);
                    itemAut.append(option);
                });
            }).catch(function(reason){
                console.log(reason);
            });
        });
    })(); //模态框显示时的初始化 结束

    // addModal模态框隐藏后重置
    $('#addModal').on('hidden.bs.modal', function(e){
        $('#itemname').val("");
        $('#itemLine').empty();
        $('#itemAut').empty();
        $('#itemdesc').val("");
        $('#add-feedback-itemname').removeClass("glyphicon-ok").addClass("glyphicon-remove").attr("style","color:#b94a48");
        $('#btn-add').attr("disabled", true);
        $('#add-input-detecting').show();
    }); // addModal模态框隐藏后重置 结束
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
    })();// 检测输入状态结束
    //添加按钮，发送ajax

})

function initialTable() {
    let tbody = $("#example tbody");
    dataSet.forEach(value => {
        let tr = $('<tr></tr>');
        let tdId = $(`<td class="td-itemId"></td>`).text(value.id);
        let tdName = $(`<td class="td-name"></td>`).text(value.testProjectName);
        let tdType = $(`<td class="td-type"></td>`).text(value.type);
        let tdLineName = $(`<td class="td-lineName"></td>`).text(value.productLineName);
        let tdAutName = $(`<td class="td-autName"></td>`).text(value.autid);
        let tdDescription = $(`<td class="td-description"></td>`).text(value.taskDescription);
        let tdOperation = $(`<td class="td-operation"><button class="btn btn-view" href='javascript:void(0)'>查看</button><button class="btn btn-alter" href='javascript:void(0)'>修改</button></td>`);
        tr.append(tdId, tdName, tdType, tdLineName, tdAutName, tdDescription,tdOperation);
        tbody.append(tr);
    });
    // 初始化分页组件
    let pageNumber = Math.ceil(totalRows / showRows);
    //let ul = $('.pagination');
    if(pageNumber <= 2){
        for(let i = 1; i <= pageNumber; i++){
            let a = $(`<a class="pageIndex"></a>`).text(i);
            let li = $(`<li></li>`).append(a);
            $('#nextPage').parent('li').before(li);
        }
    }
}

function updatePagination(){

}