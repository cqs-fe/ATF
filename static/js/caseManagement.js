var address2='http://10.108.223.23:8080/atfcloud2.0a';
var app = new Vue({
    el: '#caseManagement',
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
        missionList: [], //测试任务
        testpoint: '', // 测试点
        currentUserId: sessionStorage.getItem('userId'),//当前登录用户id
        author: false, //编写者
        executor: false, //执行者
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
        sort: 'asc',
        isPageNumberError: false,
        checkboxModel: [],
        checked: "",
        subCaseList: [], //流程节点
        caselibid: '', //案例库id
    },
    ready: function() {
        this.getCase(this.currentPage, this.pageSize, this.order, this.sort);
        this.changeListNum();
        this.getUsers();
        this.getMission(); //获取案例添加表单任务编号下拉列表
        $(".myFileUpload").change(function() {
            var arrs = $(this).val().split('\\');
            var filename = arrs[arrs.length - 1];
            $(".show").val(filename);
        });

        $('.3').addClass('open');
        $('.3 .arrow').addClass('open');
        $('.3-ul').css({display: 'block'});
        $('.3-2').css({color: '#ff6c60'});
        // 删除筛选条件
        $('.filterList').delegate('button.btn-danger','click',function(){
            $(event.target).closest('li').remove();
        });
        // 筛选案例select option
        // let that=this;
        $('.filterList').delegate('select[name="propertyName"]', 'change', function() {
            let selectedProp=$(event.target).val();
            if(selectedProp=='caseCompositeType'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='notin'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="cctVal" class="selectpicker val_select" multiple></select>');
                        $('#cctVal').append('<option value="1">单用例</option><option value="2">流程用例</option><option value="3">节点用例</option>');
                        $('#cctVal').selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="cctVal" class="selectpicker val_select"></select>')
                        $('#cctVal').append('<option value="1">单用例</option><option value="2">流程用例</option><option value="3">节点用例</option>');
                        $('#cctVal').selectpicker('refresh');                    
                    }
                });
            }else if(selectedProp=='casecode'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">包含</option><option value="without">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value input
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                });
            }else if(selectedProp=='priority'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='notin'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="priorityVal" class="selectpicker val_select" multiple></select>');
                        $('#priorityVal').append('<option value="1">1级</option><option value="2">2级</option><option value="3">3级</option><option value="4">4级</option><option value="5">5级</option><option value="6">6级</option><option value="7">7级</option><option value="8">8级</option><option value="9">9级</option>');
                        $('#priorityVal').selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="priorityVal" class="selectpicker val_select"></select>');
                        $('#priorityVal').append('<option value="1">1级</option><option value="2">2级</option><option value="3">3级</option><option value="4">4级</option><option value="5">5级</option><option value="6">6级</option><option value="7">7级</option><option value="8">8级</option><option value="9">9级</option>');
                        $('#priorityVal').selectpicker('refresh');                    
                    }
                });
            }else if(selectedProp=='executeMethod'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='notin'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="propertyVal" class="selectpicker val_select" multiple></select>');
                        $('#propertyVal').append('<option value="1">手工</option><option value="2">自动化</option><option value="3">配合</option>');
                        $('#propertyVal').selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="propertyVal" class="selectpicker val_select"></select>');
                        $('#propertyVal').append('<option value="1">手工</option><option value="2">自动化</option><option value="3">配合</option>');
                        $('#propertyVal').selectpicker('refresh');                    
                    }
                });            
            }else if(selectedProp=='submissionId'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='notin'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="missVal" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address+"missionController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        $('#missVal').append(`<option value="${item.id}">${item.missionName}</option>`);
                                    }
                                    $('#missVal').selectpicker('refresh');
                                }
                            }
                        });
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="missVal" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"missionController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        $('#missVal').append(`<option value="${item.id}">${item.missionName}</option>`);
                                    }
                                    $('#missVal').selectpicker('refresh');
                                }
                            }
                        });                  
                    }
                });                 
            }else if(selectedProp=='autId'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='notin'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="autVal" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address2+"/aut/queryListAut",
                            type: 'get',
                            success:function(data){
                                // console.log(data)
                                if(data.respCode=='0000'){
                                    let autList=data.autRespDTOList;
                                    for(let item of autList){
                                        $('#autVal').append(`<option value="${item.id}">${item.nameMedium}</option>`);
                                    }
                                    $('#autVal').selectpicker('refresh');
                                }
                            }
                        });
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="autVal" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address2+"/aut/queryListAut",
                            type: 'get',
                            success:function(data){
                                // console.log(data)
                                if(data.respCode=='0000'){
                                    let autList=data.autRespDTOList;
                                    for(let item of autList){
                                        $('#autVal').append(`<option value="${item.id}">${item.nameMedium}</option>`);
                                    }
                                    $('#autVal').selectpicker('refresh');
                                }
                            }
                        });                  
                    }
                });   
            }
            // else if(selectedProp=='transId'){
            //     // compare select
            //     $(event.target).parent().next().children('select').children().remove();
            //     $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
            //     $(event.target).parent().next().children('select').selectpicker('refresh');
            //     // value select
            //     let compareSelect=$(event.target).parent().next().children('select');
            //     let target=$(event.target);
            //     $(compareSelect).on('change',function(){
            //         if($(this).val()=='contain'||$(this).val()=='without'){
            //             $(this).parent().next().next().remove();
            //             $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple></select>')
            //             $.ajax({
            //                 url: address+"",
            //                 type: 'get',
            //                 success:function(data){
            //                     if(data.success){
            //                         let submissionList=data.obj;
            //                         for(let item of submissionList){
            //                             target.parent().next().next().next().children('select').append(`<option value=""></option>`);
            //                         }
            //                         target.parent().next().next().next().children('select').selectpicker('refresh');

            //                     }
            //                 }
            //             });
            //             $(this).parent().next().next().selectpicker('refresh');
            //         }else{
            //             $(this).parent().next().next().remove();
            //             $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true"></select>')
            //             $.ajax({
            //                 url: address+"",
            //                 type: 'get',
            //                 success:function(data){
            //                     if(data.success){
            //                         let submissionList=data.obj;
            //                         for(let item of submissionList){
            //                             target.parent().next().next().next().children('select').append(`<option value=""></option>`);
            //                         }
            //                         target.parent().next().next().next().children('select').selectpicker('refresh');

            //                     }
            //                 }
            //             });
            //             $(this).parent().next().next().selectpicker('refresh');                    
            //         }
            //     });  
            // }
            else if(selectedProp=='caseproperty'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='notin'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="cpVal" class="selectpicker val_select" multiple></select>')
                        $(this).parent().next().next().append('<option value="">正常值</option><option value="">错误值</option><option value="">边界值</option><option value="">要素级</option><option value="">流程级</option>');
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="cpVal" class="selectpicker val_select"></select>')
                        $('#cpVal').append('<option value="">正常值</option><option value="">错误值</option><option value="">边界值</option><option value="">要素级</option><option value="">流程级</option>');
                        $('#cpVal').selectpicker('refresh');                    
                    }
                });
            }else if(selectedProp=='casetype'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='notin'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="ctVal" class="selectpicker val_select" multiple></select>');
                        $('#ctVal').append('<option value="1">联机</option><option value="2">批量</option><option value="3">接口</option>');
                        $('#ctVal').selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="ctVal" class="selectpicker val_select"></select>');
                        $('#ctVal').append('<option value="1">联机</option><option value="2">批量</option><option value="3">接口</option>');
                        $('#ctVal').selectpicker('refresh');                    
                    }
                });
            }else if(selectedProp=='author'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='notin'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="authorVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
                        $.ajax({
                            url: address+"userController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let userList=data.obj;
                                    for(let item of userList){
                                        $('#authorVal').append(`<option value="${item.id}">${item.username}</option>`);
                                    }
                                    $('#authorVal').selectpicker('refresh');
                                }
                            }
                        });
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="authorVal" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"userController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let userList=data.obj;
                                    for(let item of userList){
                                        $('#authorVal').append(`<option value="${item.id}">${item.username}</option>`);
                                    }
                                    $('#authorVal').selectpicker('refresh');
                                }
                            }
                        });                  
                    }
                });  
            }else if(selectedProp=='reviewer'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                let target=$(event.target);
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='notin'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="reviewerVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
                        $.ajax({
                            url: address+"userController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let userList=data.obj;
                                    for(let item of userList){
                                        $('#reviewerVal').append(`<option value="${item.id}">${item.username}</option>`);
                                    }
                                    $('#reviewerVal').selectpicker('refresh');
                                }
                            }
                        });
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="reviewerVal" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"userController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let userList=data.obj;
                                    for(let item of userList){
                                        $('#reviewerVal').append(`<option value="${item.id}">${item.username}</option>`);
                                    }
                                    $('#reviewerVal').selectpicker('refresh');
                                }
                            }
                        });                  
                    }
                });   
            }else if(selectedProp=='executor'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='notin'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="executorVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
                        $.ajax({
                            url: address+"userController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let userList=data.obj;
                                    for(let item of userList){
                                        $('#executorVal').append(`<option value="${item.id}">${item.username}</option>`);
                                    }
                                    $('#executorVal').selectpicker('refresh');
                                }
                            }
                        });
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="executorVal" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"userController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let userList=data.obj;
                                    for(let item of userList){
                                        $('#executorVal').append(`<option value="${item.id}">${item.username}</option>`);
                                    }
                                    $('#executorVal').selectpicker('refresh');
                                }
                            }
                        });                  
                    }
                });  
            }else if(selectedProp=='scriptMode'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='notin'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="scriptModeVal" class="selectpicker val_select" multiple></select>');
                        $('#scriptModeVal').append('<option value="1">模板</option><option value="2">自由编写</option>');
                        $('#scriptModeVal').selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="scriptModeVal" class="selectpicker val_select"></select>');
                        $('#scriptModeVal').append('<option value="1">模板</option><option value="2">自由编写</option>');
                        $('#scriptModeVal').selectpicker('refresh');                    
                    }
                });               
            }
            // else if(selectedProp=='scriptModeFlag'){
            //     // compare select
            //     $(event.target).parent().next().children('select').children().remove();
            //     $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
            //     $(event.target).parent().next().children('select').selectpicker('refresh');
            //     // value select
            //     let compareSelect=$(event.target).parent().next().children('select');
            //     $(compareSelect).on('change',function(){
            //         if($(this).val()=='in'||$(this).val()=='notin'){
            //             $(this).parent().next().next().remove();
            //             $(this).parent().next().after('<select name="propertyValue" id="smfVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
            //             $.ajax({
            //                 url: address+"",
            //                 type: 'get',
            //                 success:function(data){
            //                     if(data.success){
            //                         let submissionList=data.obj;
            //                         for(let item of submissionList){
            //                             $('#smfVal').append(`<option value="${item.id}">${item.missionName}</option>`);
            //                         }
            //                         $('#smfVal').selectpicker('refresh');
            //                     }
            //                 }
            //             });
            //         }else{
            //             $(this).parent().next().next().remove();
            //             $(this).parent().next().after('<select name="propertyValue" id="smfVal" class="selectpicker val_select" data-live-search="true"></select>')
            //             $.ajax({
            //                 url: address+"",
            //                 type: 'get',
            //                 success:function(data){
            //                     if(data.success){
            //                         let submissionList=data.obj;
            //                         for(let item of submissionList){
            //                             $('#smfVal').append(`<option value="${item.id}">${item.missionName}</option>`);
            //                         }
            //                         $('#smfVal').selectpicker('refresh');
            //                     }
            //                 }
            //             });                  
            //         }
            //     });  
            // }
            // else if(selectedProp=='testpoint'){
            //     // compare select
            //     $(event.target).parent().next().children('select').children().remove();
            //     $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option><option value="contain">包含</option><option value="without">不包含</option>');
            //     $(event.target).parent().next().children('select').selectpicker('refresh');
            //     // value select
            //     let compareSelect=$(event.target).parent().next().children('select');
            //     $(compareSelect).on('change',function(){
            //         if($(this).val()=='in'||$(this).val()=='notin'){
            //             $(this).parent().next().next().remove();
            //             $(this).parent().next().after('<select name="propertyValue" id="executorVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
            //             $.ajax({
            //                 url: address+"",
            //                 type: 'get',
            //                 success:function(data){
            //                     if(data.success){
            //                         let submissionList=data.obj;
            //                         for(let item of submissionList){
            //                             $('#executorVal').append(`<option value="${item.id}">${item.missionName}</option>`);
            //                         }
            //                         $('#executorVal').selectpicker('refresh');
            //                     }
            //                 }
            //             });
            //         }else{
            //             $(this).parent().next().next().remove();
            //             $(this).parent().next().after('<select name="propertyValue" id="executorVal" class="selectpicker val_select" data-live-search="true"></select>')
            //             $.ajax({
            //                 url: address+"",
            //                 type: 'get',
            //                 success:function(data){
            //                     if(data.success){
            //                         let submissionList=data.obj;
            //                         for(let item of submissionList){
            //                             $('#executorVal').append(`<option value="${item.id}">${item.missionName}</option>`);
            //                         }
            //                         $('#executorVal').selectpicker('refresh');
            //                     }
            //                 }
            //             });                  
            //         }
            //     });
            // }
            else if(selectedProp=='testdesign'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="contain">包含</option><option value="without">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value input
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                });   
            }else if(selectedProp=='prerequisites'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="contain">包含</option><option value="without">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value input
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                });   
            }else if(selectedProp=='datarequest'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="contain">包含</option><option value="without">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value input
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                });
            }else if(selectedProp=='teststep'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="contain">包含</option><option value="without">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value input
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                });   
            }else if(selectedProp=='expectresult'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="contain">包含</option><option value="without">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value input
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                });
            }else if(selectedProp=='checkpoint'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="contain">包含</option><option value="without">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value input
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                });
            }else if(selectedProp=='sceneId'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="notin">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='notin'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="sceneVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
                        $.ajax({
                            url: address+"sceneController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let sceneList=data.obj;
                                    for(let item of sceneList){
                                        $('#sceneVal').append(`<option value="${item.id}">${item.scenename}</option>`);
                                    }
                                    $('#sceneVal').selectpicker('refresh');
                                }
                            }
                        });
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="sceneVal" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"sceneController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let sceneList=data.obj;
                                    for(let item of sceneList){
                                        $('#sceneVal').append(`<option value="${item.id}">${item.scenename}</option>`);
                                    }
                                    $('#sceneVal').selectpicker('refresh');
                                }
                            }
                        });                  
                    }
                });
            }
        });
    },
    methods: {
        //获取案例
        getCase:function(currentPage, listnum, order, sort) {
            $.ajax({
                url: address2 + '/testcase/pagedBatchQueryTestCase',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'currentPage': currentPage,
                    'pageSize': listnum,
                    'orderColumns': order,
                    'orderType': sort
                }),
                success: function(data) {
                    // console.info(data);
                    app.caseList = data.testcaseViewRespDTOList;
                    app.tt = data.totalCount;
                    app.totalPage = Math.ceil(app.tt / listnum);
                    app.pageSize = listnum;
                }
            });
        },
        //获取用户
        getUsers:function() {
            $.ajax({
                url: address2 + 'userController/selectAll',
                type: 'GET',
                success: function(data) {
                    app.users = data.obj;
                }
            });
        },
        //添加单案例
        insert: function() {
            var self = this;
            var casecompositetype = $('#insertSingleForm input[name="casecompositetype"]').val(),
                caselibId=sessionStorage.getItem('caselibid'),
                casecode = $('#insertSingleForm input[name="casecode"]').val(),
                submissionid = $('#insertSingleForm select[name="submissionid"]').val(),
                autid = $('#insertSingleForm select[name="autid"]').val(),
                versioncode = $('#insertSingleForm input[name="versioncode"]').val(),
                transid = $('#insertSingleForm select[name="transid"]').val(),
                scriptmodeflag = $('#insertSingleForm select[name="scriptmodeflag"]').val(),
                testpoint = $('#insertSingleForm input[name="testpoint"]').val(),
                testdesign = $('#insertSingleForm textarea[name="testdesign"]').val(),
                prerequisites = $('#insertSingleForm textarea[name="prerequisites"]').val(),
                datarequest = $('#insertSingleForm textarea[name="datarequest"]').val(),
                teststep = $('#insertSingleForm textarea[name="teststep"]').val(),
                expectresult = $('#insertSingleForm textarea[name="expectresult"]').val(),
                checkpoint = $('#insertSingleForm textarea[name="checkpoint"]').val(),
                caseproperty = $('#insertSingleForm select[name="caseproperty"]').val(),
                casetype = $('#insertSingleForm select[name="casetype"]').val(),
                priority = $('#insertSingleForm select[name="priority"]').val(),
                author = $('#insertSingleForm select[name="author"]').val(),
                reviewer = $('#insertSingleForm select[name="reviewer"]').val(),
                executor = $('#insertSingleForm select[name="executor"]').val(),
                executemethod = $('#insertSingleForm select[name="executemethod"]').val(),
                scriptmode = $('#insertSingleForm select[name="scriptmode"]').val(),
                usestatus = $('#insertSingleForm select[name="usestatus"]').val(),
                note = $('#insertSingleForm textarea[name="note"]').val();
            $.ajax({
                url: address + 'TestcaseController/import111',
                type: 'post',
                data: {
                    'casecompositetype': casecompositetype,
                    'caselibId': caselibId,
                    'casecode': casecode,
                    'submissionid': submissionid,
                    'autid': autid,
                    'versioncode': versioncode,
                    'transid': transid,
                    'scriptmodeflag': scriptmodeflag,
                    'testpoint': testpoint,
                    'testdesign': testdesign,
                    'prerequisites': prerequisites,
                    'datarequest': datarequest,
                    'teststep': teststep,
                    'expectresult': expectresult,
                    'checkpoint': checkpoint,
                    'caseproperty': caseproperty,
                    'casetype': casetype,
                    'priority': priority,
                    'author': author,
                    'reviewer': reviewer,
                    'executor': executor,
                    'executemethod': executemethod,
                    'scriptmode': scriptmode,
                    'usestatus': usestatus,
                    'note': note,

                    'subcasecode': '',
                    'actioncode': '',
                    'steporder': '',
                    'subautid': '',
                    'subversioncode': '',
                    'subtransid': '',
                    'subscriptmodeflag': '',
                    'subusestatus': '',
                    'subexecutemethod': '',
                    'subexecutor': '',
                    'subscriptmode': '',
                    'subnote': ''
                },
                success: function(data) {
                    // console.log(data);
                    if (data.success) {
                        $('#successModal').modal();
                        self.getCase(self.currentPage, self.pageSize, self.order, self.sort);
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        //改变页面大小
        changeListNum:function() {
            $('#mySelect').change(function() {
                listnum = $(this).children('option:selected').val();
                $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
                app.currentPage = 1;
                app.getCase(1, listnum, 'id', 'asc');
            });
        },

        //获取caseLibid
        getCaseLibId: function() {
            var caselibid = sessionStorage.getItem('caselibid');
            // console.log(caselibid);
            $('#caselibid').val(caselibid);
            this.caselibid = caselibid;
        },
        //导入
        import: function() {
            var self = this;
            var formData = new FormData($('#importForm')[0]);
            $.ajax({
                url: address + 'TestcaseController/importexcel',
                type: 'post',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    if (data.success) {
                        $('#successModal').modal();
                        this.getCase(self.currentPage, self.pageSize, self.order, self.sort);
                    } else {
                        $('#failModal').modal();
                    }
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        //获取流程节点
        getSubCase: function(e) {
            var flowId = $(e.target).parent().parent().attr('id'),
                flowTr = $(e.target).parent().parent();
            // console.log(flowId);
            if ($(e.target).attr("class") === "icon-angle-right") {
                $.ajax({
                    url: address + 'TestcaseController/testcaseactionquery',
                    type: 'post',
                    data: { 'testcaseid': flowId },
                    success: function(data) {
                        this.subCaseList = data.obj;
                        // console.log(this.subCaseList);
                        for (var i = 0; i < this.subCaseList.length; i++) {
                            var subTr = $("<tr class='subShow'></tr>"),
                                iconTd = $("<td></td>"),
                                checkTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                codeTd = $("<td></td>"),
                                autTd = $("<td></td>"),
                                transTd = $("<td></td>"),
                                compositeTd = $("<td></td>"),
                                useTd = $("<td></td>"),
                                authorTd = $("<td></td>"),
                                executorTd = $("<td></td>"),
                                executeMethodTd = $("<td></td>");
                            codeTd.html(this.subCaseList[i].subcasecode);
                            autTd.html(this.subCaseList[i].autId);
                            compositeTd.html(this.subCaseList[i].caseCompositeType);
                            useTd.html(this.subCaseList[i].useStatus);
                            authorTd.html(this.subCaseList[i].author);
                            executorTd.html(this.subCaseList[i].executor);
                            executeMethodTd.html(this.subCaseList[i].executeMethod);
                            subTr.append(iconTd, checkTd, codeTd, autTd, transTd, compositeTd, useTd, authorTd, executorTd, executeMethodTd);
                            flowTr.after(subTr);
                        }

                    }
                });
                $(e.target).removeClass('icon-angle-right').addClass('icon-angle-down');
            } else {
                $(".subShow").css("display", "none");
                $(e.target).removeClass('icon-angle-down').addClass('icon-angle-right');
            }
        },

        //获取选中的id
        getIds: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            //app.ids = id_array.join(',');
            $('input[name="ids"]').val(id_array.join(','));
        },

        checkExport: () => {
            app.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                $('#exportModal').modal();
            }
        },

        checkExe: () => {
            app.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                $('#assignModal').modal();
            }
        },
        //分配执行者
        executor: function() {
            var self = this;
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var id_array = new Array();
                $('input[name="chk_list"]:checked').each(function() {
                    id_array.push($(this).attr('id'));
                });
                $('input[name="ids"]').val(id_array.join(','));
                $.ajax({
                    url: address + 'TestcaseController/excutor',
                    type: 'post',
                    data: $("#executorForm").serializeArray(),
                    success: function(data) {
                        // console.info(data);
                        if (data.msg == "完成") {
                            $('#successModal').modal();
                            self.getCase(self.currentPage, self.pageSize, self.order, self.sort);
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

        checkExeM: () => {
            app.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                $('#runModeModal').modal();
            }
        },
        //更改执行方式
        execute_method: function() {
            var self = this;
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                var id_array = new Array();
                $('input[name="chk_list"]:checked').each(function() {
                    id_array.push($(this).attr('id'));
                });
                $('input[name="ids"]').val(id_array.join(','));
                $.ajax({
                    url: address + 'TestcaseController/execute_mothord',
                    type: 'post',
                    data: $("#executeMethodForm").serializeArray(),
                    success: function(data) {
                        // console.info(data);
                        if (data.success) {
                            $('#successModal').modal();
                            self.getCase(self.currentPage, self.pageSize, self.order, self.sort);
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

        checkTransid: () => {
            app.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else {
                $('#transid').modal();
            }
        },
        showDetail(event){
                document.getElementsByTagName('fieldset')[0].setAttribute('disabled', true);
                $('#detailModal').modal();
                var id=$(event.target).parent().prev().children().attr('id');
                $.ajax({
                    url: address2+'/testcase/getSingleTestCaseInfo',
                    type: 'post',
                    data: {
                        "id": id
                    },
                    success: function(res){
                        // console.log(res)
                        var caseData=res.testcaseViewRespDTO;
                        $('#detailForm input[name="casecode"]').val(caseData.casecode);
                        $('#detailForm select[name="submissionid"]').val(caseData.missionId);
                        $('#detailForm select[name="autid"]').val(caseData.autId);
                        $('#detailForm input[name="versioncode"]').val(caseData.version);
                        $('#detailForm select[name="transid"]').val(caseData.transId);
                        $('#detailForm select[name="scriptmodeflag"]').val(caseData.scriptModeFlag);
                        $('#detailForm input[name="testpoint"]').val(caseData.testPoint);
                        $('#detailForm textarea[name="testdesign"]').val(caseData.testDesign);
                        $('#detailForm textarea[name="prerequisites"]').val(caseData.preRequisites);
                        $('#detailForm textarea[name="datarequest"]').val(caseData.dataRequest);
                        $('#detailForm textarea[name="teststep"]').val(caseData.testStep);
                        $('#detailForm textarea[name="expectresult"]').val(caseData.expectResult);
                        $('#detailForm textarea[name="checkpoint"]').val(caseData.checkPoint);
                        $('#detailForm select[name="caseproperty"]').val(caseData.caseProperty);
                        $('#detailForm select[name="casetype"]').val(caseData.caseType);
                        $('#detailForm select[name="priority"]').val(caseData.priority);
                        $('#detailForm select[name="author"]').val(caseData.authorId);
                        $('#detailForm select[name="reviewer"]').val(caseData.reviewerId);
                        $('#detailForm select[name="executor"]').val(caseData.executorId);
                        $('#detailForm select[name="executemethod"]').val(caseData.executeMethod);
                        $('#detailForm select[name="scriptmode"]').val(caseData.scriptMode);
                        $('#detailForm select[name="usestatus"]').val(caseData.useStatus);
                        $('#detailForm textarea[name="note"]').val(caseData.note);
                    }
                });
        },
        edit(){
            document.getElementsByTagName('fieldset')[0].removeAttribute('disabled');
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
            this.getCase(ts.currentPage, ts.pageSize, 'id', 'asc');
            // ts.queryCase();
        },
        // 流程案例添加节点案例
        addCaseNode: function() {
            this.caseNodeNum++;
            var cNode = $('<h3>流程节点案例' + this.caseNodeNum + this.caseNode);
            var element = $("#addCaseNode").append(cNode);
            this.$compile(element.get(0));
            getUsers();
            diyi(); //第一级函数
            dier(); //第二级函数
            disan(); //第三极函数
            $('select[name="subautid"]').change(function() {
                dier();
                disan();
            });
            $('select[name="subautid"]').parent().parent().next().find('select[name="subtransid"]').change(function() {
                disan();
            });
        },
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
        },
        //筛选查询案例
        queryCase:function() {

            $.ajax({
                url: address + 'TestcaseController/testcasequeryByPage',
                type: 'POST',
                data: {
                    'page': app.currentPage,
                    'rows': app.listnum,
                    'order': app.order,
                    'sort': app.sort,
                    'caselibid': app.caselibid,
                    'caseCompositeType': app.caseCompositeType.join(","),
                    'priority': app.priority.join(","),
                    'executemethod': app.executeMethod.join(","),
                    'usestatus': app.useStatus.join(","),
                    'casecode': app.casecode,
                    'informationtype': 'testcase',
                    'testpoint': app.testpoint,
                    'author': app.author?app.currentUserId:'',
                    'executor': app.executor?app.currentUserId:'',
                    'testdesign': app.testdesign,
                    'autid': app.autid,
                    'transid': app.transid,
                    'scriptmodeflag': app.scriptmodeflag,

                },
                success: function(data) {
                    app.caseList = data.o.rows;
                    app.tt = data.o.total;
                    app.totalPage = Math.ceil(app.tt / app.listnum);
                    app.listnum = app.pageSize;
                    app.currentPage = 1;
                },
                error: function() {
                    $('#failModal').modal();
                }
            });
        },
        //获取添加案例任务编号下拉列表
        getMission: function(){
            $.ajax({
                url: address+"missionController/selectAll",
                type: 'GET',
                success:function(data){
                    // console.log(data)
                    app.missionList=data.obj;
                }
            });
        },

        // 添加筛选
        addFilter(){
            // this.filterList.push('c');
            let liStr=`<li>
                                                    <label>筛选项目</label>
                                                    <select name="propertyName" class="selectpicker prop_select" data-live-search="true">
                                                        <option value="">请选择</option>
                                                        <option value="caseCompositeType">用例组成类型</option>
                                                        <option value="casecode">用例编号</option>
                                                        <option value="submissionId">测试任务</option>
                                                        <option value="autId">被测系统</option>
                                                        <option value="transId">功能点</option>
                                                        <option value="testpoint">测试点</option>
                                                        <option value="testdesign">测试意图</option>
                                                        <option value="prerequisites">前置条件</option>
                                                        <option value="datarequest">数据需求</option>
                                                        <option value="teststep">测试步骤</option>
                                                        <option value="expectresult">预期结果</option>
                                                        <option value="checkpoint">附加检查点</option>
                                                        <option value="caseproperty">用例性质</option>
                                                        <option value="casetype">测试用例类型</option>
                                                        <option value="priority">优先级</option>
                                                        <option value="author">作者</option>
                                                        <option value="reviewer">评审者</option>
                                                        <option value="executor">执行者</option>
                                                        <option value="executeMethod">执行方式</option>
                                                        <option value="scriptMode">脚本管理方式</option>
                                                        <option value="scriptModeFlag">所属模板</option>
                                                        <option value="sceneId">所属场景</option>                                                        </select>                
                                                    <select name="compareType" class="selectpicker compare_select">
                                                        <option value="">请选择</option>
                                                    </select> 
                                                    <label>值</label>
                                                    <select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple>
                                                    </select>
                                                    <button class="btn btn-xs btn-danger" @click="removeFilter($index,$event)"><i class="glyphicon glyphicon-remove"></i></button> 
                                                </li>`;
            $('.filterList').append(liStr);
            Vue.nextTick(function(){
                $('.selectpicker').selectpicker('refresh')
            });
        },
        //筛选案例
        filterCase(){
                let data=[];
                let list=$(".filterList>li");
                let that=this;
                // console.log(list)
                for(let i=0;i<list.length;i++){
                    let listItem={};
                    listItem.propertyName=$(list[i]).find('select[name="propertyName"]').val();
                    listItem.compareType=$(list[i]).find('select[name="compareType"]').val();
                    let valType=$(list[i]).find('.val_select')[0].tagName;
                    if(valType==='INPUT'){
                        listItem.propertyValues=$(list[i]).find('input.val_select').val();
                    }else{
                        listItem.propertyValues=$(list[i]).find('select.val_select').val();
                    }
                    data.push(listItem);
                }
                // console.log(data)
                $.ajax({
                    url:address+'TestcaseController/testcaseFilter',
                    data:{
                        'filterConditionDtoList':JSON.stringify(data),
                        'page': 1,
                        'rows': 10
                     },
                    type:'post',
                    dataType:"json",
                    success:function(res){
                        // console.log(res)
                        that.caseList = res.obj;
                        that.tt = res.obj.length;
                        that.totalPage = Math.ceil(that.tt / that.listnum);
                        that.pageSize = that.listnum;
                    }

                });
        }
    },

});

//全选反选
$("#chk_all").click(function() {　　
    $("input[name='chk_list']").prop("checked", $(this).prop("checked"));　
});


//三级联动
$(document).ready(function(e) {

    yiji(); //第一级函数
    erji(); //第二级函数
    sanji(); //第三极函数
    $('select[name="autid"]').change(function() {
        //var target = $(this);
        erji();
        sanji();
    })
    $('select[name="autid"]').parent().parent().next().find('select[name="transid"]').change(function() {

        sanji();
    })
});

//一级 测试系统
function yiji() {
    $.ajax({
        async: false,
        url: address2+"/aut/queryListAut",
        type: "POST",
        success: function(data) {
            // console.log(data)
            var autList = data.autRespDTOList;
            var str = "";
            for (var i = 0; i < autList.length; i++) {

                str += " <option value='" + autList[i].id + "' >" + autList[i].nameMedium + "</option> ";
            }

            $('select[name="autid"]').html(str);

        }
    });
}

//二级 功能点
function erji() {
    var val = $('select[name="autid"]').val();
    $.ajax({
        async: false,
        url: address + 'transactController/showalltransact',
        data: { 'autlistselect': val },
        type: "POST",
        success: function(data) {
            var transactList = data.o;
            var str = "";
            for (var i = 0; i < transactList.length; i++) {

                str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
            }
            $('select[name="autid"]').parent().parent().next().find('select[name="transid"]').html(str);

        }

    });
}

//三级 模板脚本
function sanji() {

    var val = $('select[name="autid"]').parent().parent().next().find('select[name="transid"]').val();

    $.ajax({
        url: address + "scripttemplateController/showallscripttemplate",
        data: { "transactid": val },
        type: "POST",
        success: function(data) {

            var lie = data.o;
            var str = "";
            for (var i = 0; i < lie.length; i++) {

                str += " <option value='" + lie[i].id + "'>" + lie[i].name + "</option> ";
            }
            $('select[name="autid"]').parent().parent().next().find('select[name="scriptmodeflag"]').html(str);


        }

    });
}

//3级联动 设置功能点及模板脚本
$(document).ready(function(e) {

    first(); //第一级函数
    second(); //第二级函数
    third(); //第三极函数
    $("#1ji").change(function() {
        second();
        third();
    })
    $("#2ji").change(function() {
        third();
    })
});

//一级 测试系统
function first() {
    $.ajax({
        async: false,
        url:address2+"/aut/queryListAut",
        type: "POST",
        success: function(data) {
            var autList = data.autRespDTOList;
            var str = "";
            for (var i = 0; i < autList.length; i++) {

                str += " <option value='" + autList[i].id + "' >" + autList[i].nameMedium + "</option> ";
            }

            $("#1ji").html(str);


        }
    });
}


//二级 功能点
function second() {
    var val = $("#1ji").val();
    $.ajax({
        async: false,
        url: address + 'transactController/showalltransact',
        data: { 'autlistselect': val },
        type: "POST",
        success: function(data) {
            var transactList = data.o;
            var str = "";
            for (var i = 0; i < transactList.length; i++) {

                str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
            }
            $("#2ji").html(str);

        }

    });
}

//三级 模板脚本
function third() {

    var val = $("#2ji").val();

    $.ajax({
        url: address + "scripttemplateController/showallscripttemplate",
        data: { "transactid": val },
        type: "POST",
        success: function(data) {

            var lie = data.o;
            var str = "";
            for (var i = 0; i < lie.length; i++) {

                str += " <option value='" + lie[i].id + "'>" + lie[i].name + "</option> ";
            }
            $("#3ji").html(str);


        }

    });
}

//子流程节点部分
//一级 测试系统
function diyi() {
    $.ajax({
        async: false,
        url: address2+"/aut/queryListAut",
        type: "POST",
        success: function(data) {
            var autList = data.autRespDTOList;
            var str = "";
            for (var i = 0; i < autList.length; i++) {

                str += " <option value='" + autList[i].id + "' >" + autList[i].nameMedium + "</option> ";
            }

            $('select[name="subautid"]').html(str);

        }
    });
}

//二级 功能点
function dier() {
    var val = $('select[name="subautid"]').val();
    $.ajax({
        async: false,
        url: address + 'transactController/showalltransact',
        data: { 'autlistselect': val },
        type: "POST",
        success: function(data) {
            var transactList = data.o;
            var str = "";
            for (var i = 0; i < transactList.length; i++) {

                str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
            }
            $('select[name="subautid"]').parent().parent().next().find('select[name="subtransid"]').html(str);

        }

    });
}

//三级 模板脚本
function disan() {

    var val = $('select[name="subautid"]').parent().parent().next().find('select[name="subtransid"]').val();

    $.ajax({
        url: address + "scripttemplateController/showallscripttemplate",
        data: { "transactid": val },
        type: "POST",
        success: function(data) {

            var lie = data.o;
            var str = "";
            for (var i = 0; i < lie.length; i++) {

                str += " <option value='" + lie[i].id + "'>" + lie[i].name + "</option> ";
            }
            $('select[name="subautid"]').parent().parent().next().find('select[name="subscriptmodeflag"]').html(str);

        }

    });

}

//设置功能点及模板脚本
function transid() {
    $.ajax({
        url: address + 'TestcaseController/trans_id',
        type: 'post',
        // data: $("#transidForm").serializeArray(),
        data:{
            'ids':$("#transidForm input[name='ids']").val(),
            'autid':$("#transidForm select[name='autid']").val(),
            'transid':$("#transidForm select[name='transid']").val(),
            'scriptmodeflag':$("#transidForm select[name='scriptmodeflag']").val(),
        },
        success: function(data) {
            // console.info(data);
            if (data.success) {
                $('#successModal').modal();
                app.getCase(app.currentPage, app.pageSize, app.order, app.sort);
            } else {
                $('#failModal').modal();
            }
        },
        error: function() {
            $('#failModal').modal();
        }
    });
}
//分配执行者
function executor() {
    var id_array = new Array();
    $('input[name="chk_list"]:checked').each(function() {
        id_array.push($(this).attr('id'));
    });
    $('input[name="ids"]').val(id_array.join(','));
    $.ajax({
        url: address + 'TestcaseController/excutor',
        type: 'post',
        data: $("#executorForm").serializeArray(),
        success: function(data) {
            // console.info(data.msg);
            if (data.msg == "完成") {
                $('#successModal').modal();
                app.getCase(app.currentPage, app.pageSize, app.order, app.sort);
            } else {
                $('#failModal').modal();
            }
        },
        error: function() {
            $('#failModal').modal();
        }
    });
}

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
    app.getCase(1, 10, app.order, app.sort);
}
//重新排序 结束
