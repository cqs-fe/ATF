"use strict";

var Vac = Vac || {};
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
Vac.getNowFormatDate = function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
};

/********************用于操作类名************************/
Vac.isHasClass = function (element, className) {
    var elementClassName = element.className;
    var pattern = new RegExp('\\b' + className + '\\b', 'g');
    // String.search() 方法返回的是第一个匹配项的index，没有匹配项时返回-1
    return pattern.test(elementClassName);
};

Vac.addClass = function (element, className) {
    if (!this.isHasClass(element, className)) {
        element.className = element.className.trim() + " " + className;
    }
};

Vac.removeClass = function (element, className) {
    if (this.isHasClass(element, className)) {
        var pattern = new RegExp('\\b' + className + '\\b', 'g');
        element.className = element.className.replace(pattern, "");
    }
};