var app = new Vue({
    el: '#scene',
    data: {
        sceneList: [],
        tt: 0, //总条数
        pageSize: 10, //页面大小
        currentPage: 1, //当前页
        totalPage: 1, //总页数
        listnum: 10, //页面大小
        order: 'id',
        sort: 'asc',
        isPageNumberError: false,
        checkboxModel: [],
        checked: "",
        querySceneName: '',
        //当前选中行
        selectedId: '',
        selectedSceneCode: '',
        selectedSceneName: '',
        selectedAbstractarchitecture_name: '',
        selectedScene_desc: '',
        addshow: false, //添加场景
        isShow: false, //筛选
        iconflag: true,
        customFilterList: [
            { title: '选择1' },
            { title: '选择2' }
        ],
        caseNodeNum: 0,
        caseNode: '</h3><div class="form-group"><label class="col-lg-2 control-label hidden">案例组成类型</label><div class="col-lg-4 hidden"><input type="text" class="form-control" name="caseCompositeType" value="3"></div><label class="col-lg-2 control-label">流程节点编号</label><div class="col-lg-4"><input type="text" class="form-control" name="subcasecode"></div><label class="col-lg-2 control-label">动作标识</label><div class="col-lg-4"><input type="text" class="form-control" name="actioncode"></div></div><div class="form-group"><label class="col-lg-2 control-label">被测系统</label><div class="col-lg-4"><select class="form-control" size="1" name="subautid" id=""></select></div><label class="col-lg-2 control-label">被测系统版本号</label><div class="col-lg-4"><input class="form-control" name="subversioncode"></div></div><div class="form-group"><label class="col-lg-2 control-label">功能码</label><div class="col-lg-4"><select class="form-control" size="1" name="subtransid"><option></option></select></div><label class="col-lg-2 control-label">所属模板</label><div class="col-lg-4"><select class="form-control" size="1" name="subscriptmodeflag"></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行方式</label><div class="col-lg-4"><select class="form-control" size="1" name="executemethod"><option>手工</option><option>自动化</option><option>配合</option></select></div><label class="col-lg-2 control-label">脚本管理方式</label><div class="col-lg-4"><select class="form-control" size="1" name="scriptmode"><option>模板</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行者</label><div class="col-lg-4"><select class="form-control" size="1" name="executor"><option v-for="user in users" value="{{user.id}}">{{user.reallyname}}</option></select></div><label class="col-lg-2 control-label">测试顺序</label><div class="col-lg-4"><input class="form-control" name="steporder"></div></div><div class="form-group"><label class="col-lg-2 control-label">案例使用状态</label><div class="col-lg-4"><select class="form-control" size="1" name="subusestatus"><option value="1">新增</option><option value="2">评审通过</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">备注</label><div class="col-lg-10"><textarea class="form-control" rows="3" name="note"></textarea></div></div>',
        caseList: [], //案例
        ids: '' //当前选中的场景id
    },
    ready: function() {
        getScene(this.currentPage, this.pageSize, this.order, this.sort);
        changeListNum();

        $('.3').addClass('open')
        $('.3 .arrow').addClass('open')
        $('.3-ul').css({display: 'block'})
        $('.3-4').css({color: '#ff6c60'})
    },
    methods: {
        //获取选中的id
        getIds: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            app.ids = id_array.join(',');
            // $('input[name="id"]').val(id_array.join(','));
        },
        checkedAll: function() {
            var _this = this;
            console.log(_this.checkboxModel);
            if (this.checked) { //反选
                _this.checkboxModel = [];
            } else { //全选
                _this.checkboxModel = [];
                _this.sceneList.forEach(function(item) {
                    _this.checkboxModel.push(item.id);
                });
            }
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
            getScene(ts.currentPage, ts.pageSize, 'id', 'asc');
        },

        //添加场景
        insert: function() {
            var self=this;
            var scenename = $('#insertForm input[name="scenename"]').val();
            var description = $('#insertForm textarea[name="description"]').val();
            var caselibid=sessionStorage.getItem('caselibId');
            if(scenename==""){
                alert("场景名称不能为空");
            }else if(description==""){
                alert("场景描述不能为空");
            }else{
                $.ajax({
                    url: address3 + 'sceneController/insertScene',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        'nameMedium': scenename,
                        'descShort': description,
                        'caseLibId': caselibid,
                        'creatorId': sessionStorage.getItem('userId')
                    }),
                    success: function(data) {
                        console.log(data);
                        if (data.respCode==0000) {
                            $('#successModal').modal();
                            getScene(self.currentPage, self.pageSize, self.order, self.sort);
                        } else {
                            $('#failModal').modal();
                        }
                    },
                    error: function() {
                        $('#failModal').modal();
                    }
                });
            }
            
        },
        //删除场景
        checkDel:()=>{
            app.getIds();
            const selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else{
                $('#deleteModal').modal();
            } 
        },
        del: function() {
            this.getIds();
            var self=this;
            $.ajax({
                url: address3 + 'sceneController/deleteScene',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'id': app.ids
                }),
                success: function(data) {
                    console.info(data);
                    if (data.respCode==0000) {
                        $('#successModal').modal();
                        getScene(self.currentPage, self.pageSize, self.order, self.sort);
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        //修改场景
        checkUpdate:()=>{
            app.getSelected();
            const selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else{
                $('#updateModal').modal();
            } 
        },
        update: function() {
            var self=this;
            var id=$('#updateForm input[name="id"]').val();
            var scenename = $('#updateForm input[name="scenename"]').val();
            var description = $('#updateForm textarea[name="description"]').val();
            var caselibid=sessionStorage.getItem('caselibId');
            $.ajax({
                url: address3 + 'sceneController/updateScene',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                      "id" : id,
                      "nameMedium" : scenename,
                      "descShort" : description,
                      "modifierId" : sessionStorage.getItem('userId')
                }),
                success: function(data) {
                    console.info(data);
                    if (data.respCode==0000) {
                        $('#successModal').modal();
                         getScene(self.currentPage, self.pageSize, self.order, self.sort);
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        //获取当前选中行内容
        getSelected: function() {
            var selectedInput = $('input[name="chk_list"]:checked');
            var selectedId = selectedInput.attr('id');
            $('#updateForm input[name="id"]').val(selectedId);
            $('#updateForm input[name="scenename"]').val(selectedInput.parent().next().html());
            $('#updateForm textarea[name="description"]').val(selectedInput.parent().next().next().html());
        },
        //自定义筛选条件添加选择项
        addItem: function() {
            var n = this.customFilterList ? this.customFilterList.length + 1 : 1;
            this.customFilterList.push({ title: '选择' + n });
        },
        //删除选择项
        removeItem: function(item) {
            var index = this.customFilterList.indexOf(item);
            this.customFilterList.splice(index, 1);
        },
        //传递当前页选中的场景id到场景管理页面
        toSceneManagement: function(e) {
            var sceneid = $(e.target).parent().parent().attr('id'),
                scenename = $(e.target).parent().prev().prev().prev().prev().html();
            location.href = "scene-setting.html?sceneid=" + sceneid + "&" + "scenename=" + scenename;
        },
        //时间格式化
        formatDate(date){
            if(date){
                var date = new Date(date);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
                return Y+M+D+h+m+s;  
            }else{
                return '';
            }     
        }

    },

});

//获取场景
function getScene(page, listnum, order, sort) {
    // var caseLibId=sessionStorage.getItem('caselibId');
    $.ajax({
        url: address3 + 'sceneController/selectAllSceneByPage',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            'currentPage': page,
            'pageSize': listnum,
            "orderType":"DESC",
            "orderColumns":"modified_time",
            // "caseLibId": caseLibId
        }),
        success: function(data) {
            console.log(data)
            app.sceneList = data.sceneEntityList;
            app.tt = data.totalCount;
            app.totalPage = Math.ceil(app.tt / listnum);
            app.pageSize = listnum;
        }
    });

}

//获取案例
function getCase(currentPage, listnum, order, sort) {
    $.ajax({
        url: address3 + 'TestcaseController/selectAllByPage',
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify({
            'page': currentPage,
            'rows': listnum,
            'order': order,
            'sort': sort
        }),
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

//改变页面大小
function changeListNum() {
    $('#mySelect').change(function() {
        listnum = $(this).children('option:selected').val();
        $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
        app.currentPage=1;
        getScene(1, listnum, 'id', 'asc');
    });
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
    getScene(1, 10, app.order, app.sort);
}
//重新排序 结束

//搜索场景
function queryScene() {
    $.ajax({
        url: address3 + 'sceneController/selectAllSceneByPage',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            'currentPage': app.currentPage,
            'pageSize': app.listnum,
            'orderColumns': app.order,
            'orderType': app.sort,
            'nameMedium': app.querySceneName
        }),
        success: function(data) {
            app.sceneList = data.sceneEntityList;
            console.log(app.sceneList);
            app.tt = data.totalCount;
            app.totalPage = Math.ceil(app.tt / app.listnum);
            app.pageSize = app.listnum;
        }
    });
}
