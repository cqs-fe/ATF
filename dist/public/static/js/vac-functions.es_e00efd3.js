"use strict";

//检测用户登录状态，添加 更改操作需要有登陆权限
function loginDetect() {
    return new Promise(function (resolve, reject) {
        var sessionId = window.sessionStorage.getItem("sessionId");
        if (sessionId !== null && sessionId !== "") {
            var client = null;
            if (window.XMLHttpRequest) {
                client = new XMLHttpRequest();
            } else {
                client = new ActiveXObject("Microsoft.XMLHTTP");
            }
            var url = address + "userController/getUser";
            client.open("POST", url, true);
            client.onreadystatechange = function () {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText));
                }
            };
            client.setRequestHeader("CONTENT-TYPE", "application/x-www-form-urlencoded");
            client.responseType = "json";
            client.setRequestHeader("Accept", "application/json");
            // console.log(sessionId);
            var data = "sessionId=" + sessionId;
            client.send(data);
        } else {
            reject();
        }
    });
}
//检测用户登录状态，添加 更改操作需要有登陆权限 结束

//重新排序
function resort(target) {
    var spans = target.parentNode.getElementsByTagName("span");
    for (var span in spans) {
        if (spans[span].nodeName === "SPAN") {
            spans[span].setAttribute("class", "");
        }
    }
    if (target.getAttribute("data-sort") === "desc") {
        console.log(target.getAttribute("data-sort"));
        sendData.sort = "asc";
        target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-up");
        target.setAttribute("data-sort", "asc");
    } else {
        //console.log(target.getAttribute("data-sort"));
        sendData.sort = "desc";
        target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-down");
        target.setAttribute("data-sort", "desc");
    }
    sendData.order = target.getAttribute("data-order");
    sendQuery(currentPage, updatePagination);
}
//重新排序 结束

// *******************************************
//  * FunctionName: selectElements(nodeList, className)
//  * FunctinoDescription: 用于选取元素
//  * @param: isSelect: Boolean ---> 用于改变
//            nodeList: NodeList  ---> 需要被选取的元素集合
//            className:String ---> 被选中后元素应用的样式的类名
//  * return: null
//  *******************************************
//  function selectElements(isSelect, nodeList, className){
//     document.addEventListener('mousedown', function(event){
//         var seleList = [];

//     });
//  }