var Vac = Vac || {};
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
        //console.log(target.getAttribute("data-sort"));
        sendData.sort = "desc";
        target.getElementsByTagName("span")[0].setAttribute("class","icon-sort-down")
        target.setAttribute("data-sort", "desc");
    }
    sendData.order = target.getAttribute("data-order");
    sendQuery(currentPage,updatePagination); 
}
//重新排序 结束
Vac.getNowFormatDate = function() {
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
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
        return currentdate;
};

/********************用于操作类名************************/
Vac.isHasClass = function(element,className){
 var elementClassName = element.className;
 var pattern = new RegExp('\\b'+className+'\\b','g');
 // String.search() 方法返回的是第一个匹配项的index，没有匹配项时返回-1
 return pattern.test(elementClassName);
};

Vac.addClass = function(element,className){
 if(!this.isHasClass(element,className)){
     element.className = element.className.trim() + " " + className;
 }
 return element
};

Vac.removeClass = function(element,className){
 if(this.isHasClass(element,className)){
     var pattern = new RegExp('\\b'+className+'\\b','g');
     element.className = element.className.replace(pattern,"");
 }
 return element
};

/**
 * 实现元素的拖动效果
 * @param { Element } triggerElement 触发拖动的元素
 * @param { Element } targetElement 将要被拖动的元素
 */
Vac.startDrag = function (triggerElement, targetElement) {
  triggerElement.style.cursor = 'move'
  triggerElement.addEventListener('mousedown', function (event) {
    var originMouseX, originMouseY, moveX, moveY
    // 保存鼠标点下时的初始值
    originMouseX = event.clientX
    originMouseY = event.clientY
    document.addEventListener('mousemove', mouseMove, false)
    document.addEventListener('mouseup', mouseUp, false)

    function mouseMove (event) {
      moveX = event.clientX - originMouseX
      moveY = event.clientY - originMouseY
      originMouseX = event.clientX
      originMouseY = event.clientY
      targetElement.style.left = +moveX + +targetElement.offsetLeft + 'px'
      targetElement.style.top = +moveY + +targetElement.offsetTop + 'px'
      // 防止选取文字
      event.preventDefault()
      triggerElement.onselectstart = function () {
        return false
      }
    } // mouseMove end

    function mouseUp (event) {
      document.removeEventListener('mousemove', mouseMove, false)
      document.removeEventListener('mouseup', mouseUp, false)
    } // mouseUp end
  }, false)
}

/**
 * 发送ajax
 * @param { Object } option 发送ajax的设置项
 */
// Vac.ajax = function({url, async = true,type = 'get', data = '', dataType = 'json', success}) {
//   if(!url) {
//     console.log('Error in Vac.ajax: no available url.')
//     return
//   }
//   if(!success) {
//     console.log('Error in Vac.ajax: no available success function.')
//     return
//   }
//   let request = null
//   if (window.XMLHttpRequest) {
//     //Firefox, Opera, IE7, and other browsers will use the native object
//     request = new XMLHttpRequest();
//   } else {
//     //IE 5 and 6 will use the ActiveX control
//     request = new ActiveXObject("Microsoft.XMLHTTP");
//   }
//   request.onreadystatechange = function () { // 状态发生变化时，函数被回调
//     if (request.readyState === 4) { // 成功完成
//         // 判断响应结果:
//         if (request.status === 200) {
//             // 成功，通过responseText拿到响应的文本:
//             success(JSON.parse(request.responseText), request.status);
//         } else {
//             console.log(request.status)
//         }
//     } else {
//         // HTTP请求还在继续...
//     }
//   }
//   // 发送请求:
//   request.open(type, url, async);
//   request.send(data);
// }

/**
 * 以不重复的方式向数组中插入数据
 * @param { Array } array 添加数据的数组
 * @param { string|number } value 要添加的数据，只支持两种类型
 * @returns { boolean } if pushed successfully, return true, otherwise return false
 */
Vac.pushNoRepeat = function(array, value){
  if (array.includes(value)) {
    return false
  } else {
    array.push(value)
    return true
  }
}

/**
 * 判断两个Element是否具有包含关系，某个Element是另一个Element的父辈或祖辈
 * @param { HTMLElement } ancestor
 * @param { HTMLElement } child
 * @returns { boolean } if the first element is an ancestor of the second element
 *           return true, otherwise return false
 */

 Vac.isAncestorOf = function(ancestor, child) {
  if(!(ancestor instanceof HTMLElement)) {
    console.error(new Error("Error: the first parameter is not a HTMLElement"))
    return false
  }
  if(!(child instanceof HTMLElement)) {
    console.error(new Error("Error: the second parameter is not a HTMLElement"))
    return false
  }
  let parentEle = child
  while(parentEle){
    if(parentEle === ancestor) {
      return true
    }
    parentEle = parentEle.parentElement
  }
  return false
 }

 /**
  * 获取元素相对于某一级祖先元素的offset
  * @param { HTMLElement } 要获取位置的子元素
  * @param { HTMLElement } 子元素获取相对位置的祖先元素
  * @returns { Object } 包含相对位置的对象
  *         offsetLeft: 两个元素左边框之间的距离
  *         offsetHeight: 两个元素上边框之间的距离
  */
  Vac.getOffsetTo = function(child, ancestor) {
    if(!this.isAncestorOf(ancestor, child)) {
      console.error(new Error('传入的元素不具有父辈与子辈关系！'))
      return 
    }
    if(window.getComputedStyle(ancestor).position == 'static') {
       console.error(new Error('请更改父辈元素的定位方式！'))
      return
    }
    if　(child === ancestor) {
      return { offsetLeft:0, offsetTop:0 }
    }
    let offsetLeft = child.offsetLeft
    let offsetTop = child.offsetTop
    let current = child.offsetParent
    while(current !== ancestor) {
      offsetTop = offsetTop + current.offsetTop 
        + parseFloat(window.getComputedStyle(current).borderTopWidth)
      offsetLeft = offsetLeft + current.offsetLeft 
        + parseFloat(window.getComputedStyle(current).borderLeftWidth)
      current = current.offsetParent
    }
    current = null
    return { offsetLeft, offsetTop }
  }

 /**
  * debounce函数
  * @param { Function } func The function to debounce.
  * @param { Number } [wait=0] The number of milliseconds to delay.
  * @returns { Function } Returns the new debounced function.
  */
  Vac.debounce = function(func, wait) {
    var timeout = null

    return function(){
      var args = arguments

      if(timeout === null) {
        func(...args)
        timeout = setTimeout(function(){
          timeout = null
        }, wait)
      } else {
        clearTimeout(timeout)
        timeout = setTimeout(function(){
          timeout = null
          func(...args)
        }, wait)
      }
    }
  }
/**
 * ajax 请求
 */
Vac.ajax = function(opt) {
  if (typeof opt.data === 'object') {
    opt.data = JSON.stringify(opt.data);
  }
  opt.contentType = opt.contentType || 'application/json';
  opt.type = opt.type || 'post';
  opt.dataType = 'json';
  $.ajax({
    url: opt.url,
    data: opt.data || '',
    type: opt.type || 'post',
    contentType: opt.contentType || 'application/json',
    dataType: opt.dataType || 'json',
    success: function(data) {
      opt.success(data);
    },
    error: function() {
      if (opt.error) {
        opt.error();
      } else {
        Vac.alert('网络错误，请稍候再试~');
      }
    }
  });
}
/**
  * throttle 函数
  * @param { Function } func The function to throttle.
  * @param { Number } [wait=0] The number of milliseconds to delay.
  * @returns { Function } Returns the new throttled function.
  */
  Vac.throttle = function(func, wait, context) {
    var timeout = null

    return function() {
      if(timeout === null) {
        func.apply(context, [...arguments])
        timeout = setTimeout(() => {
          timeout = null
        }, wait)
      }
    }
  }

/**
 * 用于表单验证的类
 */
Vac.formValidation = function() {
  // save the inputs dom
  this.inputs = []

}

Vac.formValidation.prototype.setValidation = function(inputId, iconId, tooltipId, rules) {
  var item = {}
  item.inputId = inputId
  item.iconId = iconId
  item.tooltipId = tooltipId
  item.rules = rules
  this.inputs.push(item)

  // 设置校验事件
  var _this = this
  var input = document.querySelector('#'+inputId)
  input.addEventListener('blur', function(event) {
    _this._valid(inputId, iconId, tooltipId, rules)
  })
}

Vac.formValidation.prototype._valid = function(inputId, iconId, tooltipId, rules) {
  var input = document.querySelector('#'+inputId)
  var icon = document.querySelector('#'+iconId)
  var tooltip = document.querySelector('#'+tooltipId)
  // use Approvejs to validate the value
  var results = approve.value(input.value, rules)
  if(results.approved) {
    $(icon).addClass('icon-ok correct').removeClass('hide icon-warning-sign error')
    $(tooltip).removeClass('show').addClass('hide')
    return true
  } else {
    $(icon).addClass('icon-warning-sign error show').removeClass('hide correct icon-ok ')
    $(tooltip).addClass('show').removeClass('hide')
    tooltip.innerHTML = ''
    results.each((error) => {
      tooltip.innerHTML = tooltip.innerHTML + error + '</br>'
    })
    return false
  }
}

Vac.formValidation.prototype.validAll = function() {
  return this.inputs.every((item) => {    
    return this._valid(item.inputId, item.iconId, item.tooltipId, item.rules)
  })
}