var app = new Vue({
    el: '#insertSceneCase',
    data: {
        isShow: false,
        iconflag: true,
        caseNodeNum: 0,
        caseNode: '</h3><div class="form-group"><label class="col-lg-2 control-label hidden">案例组成类型</label><div class="col-lg-4 hidden"><input type="text" class="form-control" name="caseCompositeType" value="3"></div><label class="col-lg-2 control-label">流程节点编号</label><div class="col-lg-4"><input type="text" class="form-control" name="subcasecode"></div><label class="col-lg-2 control-label">动作标识</label><div class="col-lg-4"><input type="text" class="form-control" name="actioncode"></div></div><div class="form-group"><label class="col-lg-2 control-label">被测系统</label><div class="col-lg-4"><select class="form-control" size="1" name="subautid" id=""></select></div><label class="col-lg-2 control-label">被测系统版本号</label><div class="col-lg-4"><input class="form-control" name="subversioncode"></div></div><div class="form-group"><label class="col-lg-2 control-label">功能码</label><div class="col-lg-4"><select class="form-control" size="1" name="subtransid"><option></option></select></div><label class="col-lg-2 control-label">所属模板</label><div class="col-lg-4"><select class="form-control" size="1" name="subscriptmodeflag"></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行方式</label><div class="col-lg-4"><select class="form-control" size="1" name="executemethod"><option>手工</option><option>自动化</option><option>配合</option></select></div><label class="col-lg-2 control-label">脚本管理方式</label><div class="col-lg-4"><select class="form-control" size="1" name="scriptmode"><option>模板</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行者</label><div class="col-lg-4"><select class="form-control" size="1" name="executor"><option v-for="user in users" value="{{user.id}}">{{user.reallyname}}</option></select></div><label class="col-lg-2 control-label">测试顺序</label><div class="col-lg-4"><input class="form-control" name="steporder"></div></div><div class="form-group"><label class="col-lg-2 control-label">案例使用状态</label><div class="col-lg-4"><select class="form-control" size="1" name="subusestatus"><option value="1">新增</option><option value="2">评审通过</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">备注</label><div class="col-lg-10"><textarea class="form-control" rows="3" name="note"></textarea></div></div>',
        caseList: [], //案例
        users: [], //所有用户
        priority: [], // 优先级
        executeMethod: [], // 执行方式
        caseCompositeType: [], // 案例组成类型
        useStatus: [], // 案例状态
        filterSceneId:'',//所属场景
        testpoint: '', // 测试点
        author: '', //编写者
        executor: '', //执行者
        testdesign: '', //测试意图
        autid: '', //被测系统
        transid: '', //功能码
        scriptmodeflag: '', //脚本模板
        casecode: '', //搜索时输入的案例编号
        sortparam: '', //排序参数
        tt: 0, //总条数
        pageSize: 10, //页面大小
        currentPage: 1, //当前页
        totalPage: 1, //总页数
        listnum: 10, //页面大小
        order: 'id',
        sort: 'desc',
        isPageNumberError: false,
        checkboxModel: [],
        checked: "",
        subCaseList: [], //流程节点
        ids:'',
        //场景
        sceneList:[],
        sceneid: '',
        scenename: '场景名称',
        url_parameter: ''
    },
    ready: function() {
        this.setVal();
        getCase(this.currentPage, this.pageSize, this.order, this.sort);
        changeListNum();
        getScene();
    },
    methods: {
        //获取上级页面选中的场景id和名称
        setVal:function(){
            var thisURL = document.URL,
                getval = thisURL.split('?')[1],
                keyval = getval.split('&');
            this.url_parameter = 'SceneManagement.html?' + getval;
            this.sceneid = keyval[0].split('=')[1],
            this.scenename = decodeURI(keyval[1].split('=')[1]);
        },
        //添加场景案例
        insert: function() {
            this.getIds();
            $.ajax({
                url: address + 'testexecutioninstanceController/inserttestcasetoscene',
                type: 'post',
                data: {
                    'sceneid': this.sceneid,
                    'caseidList': '['+this.ids+']',
                },
                success: function(data) {
                    if (data.success) {
                        $('#successModal').modal();
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        // //获取流程节点
        // getSubCase: function(e) {
        //     var flowId = $(e.target).parent().parent().attr('id'),
        //         flowTr = $(e.target).parent().parent();
        //     console.log(flowId);
        //     if ($(e.target).attr("class") === "icon-angle-right") {
        //         $.ajax({
        //             url: address + 'TestcaseController/testcaseactionquery',
        //             type: 'post',
        //             data: { 'testcaseid': flowId },
        //             success: function(data) {
        //                 this.subCaseList = data.obj;
        //                 console.log(this.subCaseList);
        //                 for (var i = 0; i < this.subCaseList.length; i++) {
        //                     var subTr = $("<tr class='subShow'></tr>"),
        //                         iconTd = $("<td></td>"),
        //                         checkTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
        //                         codeTd = $("<td></td>"),
        //                         autTd = $("<td></td>"),
        //                         transTd = $("<td></td>"),
        //                         compositeTd = $("<td></td>"),
        //                         useTd = $("<td></td>"),
        //                         authorTd = $("<td></td>"),
        //                         executorTd = $("<td></td>"),
        //                         executeMethodTd = $("<td></td>");
        //                     codeTd.html(this.subCaseList[i].subcasecode);
        //                     autTd.html(this.subCaseList[i].autId);
        //                     compositeTd.html(this.subCaseList[i].caseCompositeType);
        //                     useTd.html(this.subCaseList[i].useStatus);
        //                     authorTd.html(this.subCaseList[i].author);
        //                     executorTd.html(this.subCaseList[i].executor);
        //                     executeMethodTd.html(this.subCaseList[i].executeMethod);
        //                     subTr.append(iconTd, checkTd, codeTd, autTd, transTd, compositeTd, useTd, authorTd, executorTd, executeMethodTd);
        //                     flowTr.after(subTr);
        //                 }

        //             }
        //         });
        //         $(e.target).removeClass('icon-angle-right').addClass('icon-angle-down');
        //     } else {
        //         $(".subShow").css("display", "none");
        //         $(e.target).removeClass('icon-angle-down').addClass('icon-angle-right');
        //     }


        // },

        //获取选中的id
        getIds: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            app.ids = id_array.join(',');
        },

        // 排序
        sortBy: function(sortparam) {
            this.sortparam = sortparam;
        },
        //turnToPage为跳转到某页
        //传入参数pageNum为要跳转的页数
        turnToPage(pageNum) {
            var ts = this;
            pageNum = parseInt(pageNum);

            //页数不合法则退出
            if (!pageNum || pageNum > ts.totalPage || pageNum < 1) {
                console.log('页码输入有误！');
                ts.isPageNumberError = true;
                return false;
            } else {
                ts.isPageNumberError = false;
            }

            //更新当前页
            ts.currentPage = pageNum;

            //页数变化时的回调
            getCase(ts.currentPage, ts.pageSize, 'id', 'asc');
        },
        // 流程案例添加节点案例
        // addCaseNode: function() {
        //     this.caseNodeNum++;
        //     var cNode = $('<h3>流程节点案例' + this.caseNodeNum + this.caseNode);
        //     var element = $("#addCaseNode").append(cNode);
        //     this.$compile(element.get(0));
        //     getUsers();
        //     diyi(); //第一级函数
        //     dier(); //第二级函数
        //     disan(); //第三极函数
        //     $('select[name="subautid"]').change(function() {
        //         dier();
        //         disan();
        //     });
        //     $('select[name="subautid"]').parent().parent().next().find('select[name="subtransid"]').change(function() {
        //         disan();
        //     });
        // },
        //搜索案例
        searchCase: function(id) {
            $.ajax({
                url: address + 'TestcaseController/viewtestcase',
                type: 'GET',
                data: { 'id': id },
                success: function() {
                    this.$data.caseList = data.o;
                }
            });
        }
    },

});
//获取案例
function getCase(currentPage, listnum, order, sort) {
    $.ajax({
        url: address + 'TestcaseController/selectAllByPage',
        type: 'GET',
        data: {
            'page': currentPage,
            'rows': listnum,
            'order': order,
            'sort': sort
        },
        success: function(data) {
            // console.info(data);
            // console.info(data.o.rows);
            app.caseList = data.o.rows;
            app.tt = data.o.total;
            app.totalPage = Math.ceil(app.tt / listnum);
            app.pageSize = listnum;
        }
    });
}

//查询案例
function queryCase() {
    $.ajax({
        url: address + 'TestcaseController/testcasequeryByPage',
        type: 'POST',
        data: {
            'page': app.currentPage,
            'rows': app.listnum,
            'order': app.order,
            'sort': app.sort,
            'caseCompositeType': app.caseCompositeType.join(","),
            'priority': app.priority.join(","),
            'executemethod': app.executeMethod.join(","),
            'usestatus': app.useStatus.join(","),
            'casecode': app.casecode,
            'informationtype': 'testcase',
            'testpoint': app.testpoint,
            'author': app.author,
            'executor': app.executor,
            'testdesign': app.testdesign,
            'autid': app.autid,
            'transid': app.transid,
            'scriptmodeflag': app.scriptmodeflag,

        },
        success: function(data) {
            app.caseList = data.o.rows;
            app.tt = data.o.total;
            app.totalPage = Math.ceil(app.tt / app.listnum);
            app.pageSize = app.listnum;
        },
        error: function() {
            $('#failModal').modal();
        }
    });
}
//筛选案例
function filterCase(){
        var data=[{
        "propertyName": "priority",
        "compareType": "in",
        "propertyValue": "",
        "propertyValues": app.priority,
        "propertyValueList": ''
    }, {
            "propertyName": "executeMethod",
            "compareType": "in",
            "propertyValue": "",
            "propertyValues": app.executeMethod,
            "propertyValueList": ''
        },{
            "propertyName": "caseCompositeType",
            "compareType": "in",
            "propertyValue": "",
            "propertyValues": app.caseCompositeType,
            "propertyValueList": ''
        },{
            "propertyName": "useStatus",
            "compareType": "in",
            "propertyValue": "",
            "propertyValues": app.useStatus,
            "propertyValueList": ''
        },{
            "propertyName": "sceneId",
            "compareType": "in",
            "propertyValue": "",
            "propertyValues": app.filterSceneId,
            "propertyValueList": ''
        }];
}
//获取场景
function getScene(){
    $.ajax({
        url: address+'sceneController/selectAll',
        type: 'get',
        success:function(data){
            app.sceneList=data.obj;
        }
    });
}
//改变页面大小
function changeListNum() {
    $('#mySelect').change(function() {
        listnum = $(this).children('option:selected').val();
        $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
         app.currentPage=1;
        getCase(1, listnum, 'id', 'asc');
    })
}

//全选反选
$("#chk_all").click(function() {　　
    $("input[name='chk_list']").prop("checked", $(this).prop("checked"));　
});

//重新排序
function resort(target) {
    var spans = target.parentNode.getElementsByTagName("span");
    for (var span in spans) {
        if (spans[span].nodeName === "SPAN") {
            spans[span].setAttribute("class", "");
        }
    }
    if (target.getAttribute("data-sort") === "desc") {
        app.sort = "asc";
        target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-up")
        target.setAttribute("data-sort", "asc");
    } else {
        app.sort = "desc";
        target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-down")
        target.setAttribute("data-sort", "desc");
    }
    app.order = target.getAttribute("data-order");
    getCase(1, 10, app.order, app.sort);
}
//重新排序 结束
