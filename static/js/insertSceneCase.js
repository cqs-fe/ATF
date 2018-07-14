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
        missionList: [], //测试任务
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
        url_parameter: '',
    },
    ready: function() {
        this.setVal();
        this.getCase(this.currentPage, this.pageSize, this.order, this.sort);
        this.changeListNum();
        getScene();
        this.getUsers();
        this.getMission(); //获取案例添加表单任务编号下拉列表
        $('.3').addClass('open')
        $('.3 .arrow').addClass('open')
        $('.3-ul').css({display: 'block'})
        $('.3-4').css({color: '#ff6c60'})
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
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="in">属于</option><option value="!in">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='!in'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="cctVal" class="selectpicker val_select" multiple></select>');
                        $('#cctVal').append('<option value="1">单用例</option><option value="2">流程用例</option>');
                        $('#cctVal').selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="cctVal" class="selectpicker val_select"></select>')
                        $('#cctVal').append('<option value="1">单用例</option><option value="2">流程用例</option>');
                        $('#cctVal').selectpicker('refresh');                    
                    }
                });
            }else if(selectedProp=='casecode'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="C">包含</option><option value="!C">不包含</option>');
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
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='!in'){
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
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='!in'){
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
            }else if(selectedProp=='missionId'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='!in'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="missVal" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address3+"missionController/selectMission",
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                "caseLibId": sessionStorage.getItem('caselibId')
                            }),
                            success:function(data){
                                if(data.respCode==0000){
                                    let submissionList=data.missionEntityList;
                                    for(let item of submissionList){
                                        $('#missVal').append(`<option value="${item.id}">${item.nameMedium}</option>`);
                                    }
                                    $('#missVal').selectpicker('refresh');
                                }
                            }
                        });
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="missVal" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address3+"missionController/selectMission",
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                "caseLibId": sessionStorage.getItem('caselibId')
                            }),
                            success:function(data){
                                if(data.respCode==0000){
                                    let submissionList=data.missionEntityList;
                                    for(let item of submissionList){
                                        $('#missVal').append(`<option value="${item.id}">${item.nameMedium}</option>`);
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
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='!in'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="autVal" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address3+"/aut/queryListAut",
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
                            url: address3+"/aut/queryListAut",
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
            //     $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
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
            else if(selectedProp=='caseProperty'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='!in'){
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
            }else if(selectedProp=='caseType'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='!in'){
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
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='!in'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="authorVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
                        $.ajax({
                            url: address3+"userController/selectAllUsername",
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                
                            }),
                            success:function(data){
                                if(data.respCode=='0000'){
                                    let userList=data.list;
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
                            url: address3+"userController/selectAllUsername",
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({}),
                            success:function(data){
                                if(data.respCode=='0000'){
                                    let userList=data.list;
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
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                let target=$(event.target);
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='!in'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="reviewerVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
                        $.ajax({
                            url: address3+"userController/selectAllUsername",
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({}),
                            success:function(data){
                                if(data.respCode=='0000'){
                                    let userList=data.list;
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
                            url: address3+"userController/selectAllUsername",
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({}),
                            success:function(data){
                                if(data.respCode=='0000'){
                                    let userList=data.list;
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
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='!in'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="executorVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
                        $.ajax({
                            url: address3+"userController/selectAllUsername",
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({}),
                            success:function(data){
                                if(data.respCode=='0000'){
                                    let userList=data.list;
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
                            url: address3+"userController/selectAllUsername",
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({}),
                            success:function(data){
                                if(data.respCode=='0000'){
                                    let userList=data.list;
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
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='!in'){
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
            //     $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
            //     $(event.target).parent().next().children('select').selectpicker('refresh');
            //     // value select
            //     let compareSelect=$(event.target).parent().next().children('select');
            //     $(compareSelect).on('change',function(){
            //         if($(this).val()=='in'||$(this).val()=='!in'){
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
            //     $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option><option value="C">包含</option><option value="!C">不包含</option>');
            //     $(event.target).parent().next().children('select').selectpicker('refresh');
            //     // value select
            //     let compareSelect=$(event.target).parent().next().children('select');
            //     $(compareSelect).on('change',function(){
            //         if($(this).val()=='in'||$(this).val()=='!in'){
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
            else if(selectedProp=='testDesign'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="C">包含</option><option value="!C">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value input
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                });   
            }else if(selectedProp=='preRequisites'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="C">包含</option><option value="!C">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value input
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                });   
            }else if(selectedProp=='dataRequest'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="C">包含</option><option value="!C">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value input
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                });
            }else if(selectedProp=='testStep'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="C">包含</option><option value="!C">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value input
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                });   
            }else if(selectedProp=='expectResult'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="C">包含</option><option value="!C">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value input
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<input type="text" class="form-control val_select">');
                        $(this).parent().next().next().selectpicker('refresh');  
                });
            }else if(selectedProp=='checkPoint'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="C">包含</option><option value="!C">不包含</option>');
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
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="!in">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='in'||$(this).val()=='!in'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="sceneVal" class="selectpicker val_select" data-live-search="true" multiple></select>');
                        $.ajax({
                            url: address3+"sceneController/selectAllScene",
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                "caseLibId" : sessionStorage.getItem('caselibId')
                            }),
                            success:function(data){
                                if(data.respCode=='0000'){
                                    let sceneList=data.scenequeryDtoList;
                                    for(let item of sceneList){
                                        $('#sceneVal').append(`<option value="${item.id}">${item.sceneName}</option>`);
                                    }
                                    $('#sceneVal').selectpicker('refresh');
                                }
                            }
                        });
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" id="sceneVal" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address3+"sceneController/selectAllScene",
                            type: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                "caseLibId" : sessionStorage.getItem('caselibId')
                            }),
                            success:function(data){
                                if(data.respCode=='0000'){
                                    let sceneList=data.scenequeryDtoList;
                                    for(let item of sceneList){
                                        $('#sceneVal').append(`<option value="${item.id}">${item.sceneName}</option>`);
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
        //获取上级页面选中的场景id和名称
        setVal:function(){
            var thisURL = document.URL,
                getval = thisURL.split('?')[1],
                keyval = getval.split('&');
            this.url_parameter = 'scene-setting.html?' + getval;
            this.sceneid = keyval[0].split('=')[1],
            this.scenename = decodeURI(keyval[1].split('=')[1]);
        },
        //获取案例
        getCase:function(currentPage, listnum, order, sort) {
            let caseLibId=sessionStorage.getItem('caselibId');
            $.ajax({
                url: address3 + 'testcase/pagedBatchQueryTestCase',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'caseLibId': caseLibId,
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
        // 执行方式数据处理
        convertExecMe(em){
            switch(em){
                case 1:
                    return '手工';
                    break;
                case 2:
                    return '自动化';
                    break;
                case 3:
                    return '配合';
                    break;
                default:
                    return '';
            }
        },
        // 优先级数据处理
        convertPri(em){
            switch(em){
                case 1:
                    return '1级';
                    break;
                case 2:
                    return '2级';
                    break;
                case 3:
                    return '3级';
                    break;
                case 4:
                    return '4级';
                    break;
                case 5:
                    return '5级';
                    break;
                case 6:
                    return '6级';
                    break;
                case 7:
                    return '7级';
                    break;
                case 8:
                    return '8级';
                    break;
                case 9:
                    return '9级';
                    break;
                default:
                    return '';
            }
        },
        // 用例类型数据处理
        convertCaseType(em){
            switch(em){
                case 1:
                    return '联机';
                    break;
                case 2:
                    return '批量';
                    break;
                case 3:
                    return '接口';
                    break;
                default:
                    return '';
            }
        },
        // 用例性质数据处理
        convertCasePro(em){
            switch(em){
                case 1:
                    return '正常值';
                    break;
                case 2:
                    return '错误值';
                    break;
                case 3:
                    return '边界值';
                    break;
                case 4:
                    return '要素级';
                    break;
                case 5:
                    return '流程级';
                    break;
                default:
                    return '';
            }
        },
        //获取流程节点
        getSubCase: function(e) {
            var flowId = $(e.target).parent().parent().attr('id'),
                flowTr = $(e.target).parent().parent();
            // console.log(flowId);
            var that=this;
            if ($(e.target).attr("class") === "icon-angle-right") {
                $.ajax({
                    url: address3 + 'testcase/queryTestcaseActionList',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({ 'id': flowId }),
                    success: function(data) {
                        that.subCaseList = data.testcaseActionViewList;
                        // console.log(that.subCaseList);
                        for (var i = 0; i < that.subCaseList.length; i++) {
                            var subTr = $("<tr class='subShow'></tr>"),
                                iconTd = $("<td></td>"),
                                checkTd = $("<td><input type='checkbox' name='chk_list'/></td>"),
                                codeTd = $("<td></td>"),
                                autTd = $("<td></td>"),
                                transTd = $("<td></td>"),
                                compositeTd = $("<td></td>"),
                                useTd = $("<td></td>"),
                                scriptTd=$("<td></td>"),
                                authorTd = $("<td></td>"),
                                executorTd = $("<td></td>"),
                                reviewerTd = $("<td></td>"),
                                executeMethodTd = $("<td></td>"),
                                misssionTd = $("<td></td>"),
                                priorityTd = $("<td></td>"),
                                caseTypeTd = $("<td></td>"),
                                casePropertyTd = $("<td></td>"),
                                testPointTd = $("<td></td>");
                            codeTd.html(that.subCaseList[i].actioncode);
                            autTd.html(that.subCaseList[i].autName);
                            transTd.html(that.subCaseList[i].transName);
                            compositeTd.html('流程节点');
                            useTd.html(that.subCaseList[i].useStatus);
                            scriptTd.html(that.subCaseList[i].scriptTemplateName);
                            authorTd.html(that.subCaseList[i].authorName);
                            executorTd.html(that.subCaseList[i].executorName);
                            reviewerTd.html(that.subCaseList[i].reviewerName);
                            executeMethodTd.html(that.subCaseList[i].executeMethod);
                            misssionTd.html(that.subCaseList[i].missionName);
                            priorityTd.html(that.subCaseList[i].priority);
                            caseTypeTd.html(that.subCaseList[i].caseType);
                            casePropertyTd.html(that.subCaseList[i].caseProperty);
                            testPointTd.html(that.subCaseList[i].testpoint);
                            subTr.append(iconTd, checkTd, codeTd, autTd, transTd, compositeTd, useTd, scriptTd, authorTd, executorTd, reviewerTd, executeMethodTd, misssionTd, priorityTd, caseTypeTd, casePropertyTd, testPointTd);
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
        //改变页面大小
        changeListNum:function() {
            $('#mySelect').change(function() {
                listnum = $(this).children('option:selected').val();
                $("#mySelect").find("option[text='" + listnum + "']").attr("selected", true);
                app.currentPage = 1;
                app.getCase(1, listnum, 'id', 'asc');
            });
        },
        //获取用户
        getUsers:function() {
            $.ajax({
                url: address3+"userController/selectAllUsername",
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({}),
                success: function(data) {
                    app.users = data.list;
                }
            });
        },
        //获取添加案例任务编号下拉列表
        getMission: function(){
            $.ajax({
                url: address3+"missionController/selectMission",
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    "caseLibId": sessionStorage.getItem('caselibId')
                }),
                success:function(data){
                    // console.log(data)
                    app.missionList=data.missionEntityList;
                }
            });
        },
        //添加场景案例
        insert: function() {
            // this.getIds();
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else{
                let that=this;
                $.ajax({
                    url: address3 + 'sceneController/insertTestcaseToScene',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "id" : that.sceneid,
                        "creatorId" : sessionStorage.getItem("userId"),
                        // "caseIds" :'['+that.ids+']'
                        "caseIds" :id_array
                    }),
                    success: function(data) {
                        if (data.respCode=='0000') {
                            location.href = "scene-setting.html?sceneid=" + that.sceneid + "&" + "scenename=" + that.scenename;
                            $('#successModal').modal();
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
        
        //获取选中的id
        getIds: function() {
            var id_array = new Array();
            $('input[name="chk_list"]:checked').each(function() {
                id_array.push($(this).attr('id'));
            });
            app.ids = id_array.join(',');
        },
        showDetail(event){
                document.getElementsByTagName('fieldset')[0].setAttribute('disabled', true);
                $('#detailModal').modal('show');
                var id=$(event.target).parent().prev().prev().children().attr('id');
                $.ajax({
                    url: address3+'testcase/getSingleTestCaseInfo',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "id": id
                    }),
                    success: function(res){
                        // console.log(res)
                        var caseData=res.testcaseViewRespDTO;
                        $('#detailForm input[name="casecode"]').val(caseData.casecode);
                        $('#detailForm select[name="missionId"]').val(caseData.missionId);
                        $('#detailForm select[name="autid"]').val(caseData.autId);
                        $('#detailForm input[name="versioncode"]').val(caseData.version);
                        $('#detailForm select[name="transid"]').val(caseData.transId);
                        $('#detailForm select[name="scriptmodeflag"]').val(caseData.scriptModeFlag);
                        $('#detailForm input[name="testpoint"]').val(caseData.testPoint);
                        $('#detailForm textarea[name="testDesign"]').val(caseData.testDesign);
                        $('#detailForm textarea[name="preRequisites"]').val(caseData.preRequisites);
                        $('#detailForm textarea[name="dataRequest"]').val(caseData.dataRequest);
                        $('#detailForm textarea[name="testStep"]').val(caseData.testStep);
                        $('#detailForm textarea[name="expectResult"]').val(caseData.expectResult);
                        $('#detailForm textarea[name="checkPoint"]').val(caseData.checkPoint);
                        $('#detailForm select[name="caseProperty"]').val(caseData.caseProperty);
                        $('#detailForm select[name="caseType"]').val(caseData.caseType);
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
        // 添加筛选
        addFilter(){
            // this.filterList.push('c');
            let liStr=`<li>
                                                    <label>筛选项目</label>
                                                    <select name="propertyName" class="selectpicker prop_select" data-live-search="true">
                                                        <option value="">请选择</option>
                                                        <option value="caseCompositeType">用例组成类型</option>
                                                        <option value="casecode">用例编号</option>
                                                        <option value="missionId">测试任务</option>
                                                        <option value="autId">被测系统</option>
                                                        <option value="testDesign">测试意图</option>
                                                        <option value="preRequisites">前置条件</option>
                                                        <option value="dataRequest">数据需求</option>
                                                        <option value="testStep">测试步骤</option>
                                                        <option value="expectResult">预期结果</option>
                                                        <option value="checkPoint">附加检查点</option>
                                                        <option value="caseProperty">用例性质</option>
                                                        <option value="caseType">测试用例类型</option>
                                                        <option value="priority">优先级</option>
                                                        <option value="author">作者</option>
                                                        <option value="reviewer">评审者</option>
                                                        <option value="executor">执行者</option>
                                                        <option value="executeMethod">执行方式</option>
                                                        <option value="scriptMode">脚本管理方式</option>
                                                        <option value="scriptModeFlag">所属模板</option>
                                                    </select>                
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
                            listItem.propertyValueList=[];
                            let propertyValueList=$(list[i]).find('input.val_select').val();
                            listItem.propertyValueList.push(propertyValueList);
                        }else{
                            let propertyValueList=$(list[i]).find('select.val_select').val();
                            if(Object.prototype.toString.call(propertyValueList)=='[object Array]'){
                                listItem.propertyValueList=propertyValueList;
                            }else{
                                listItem.propertyValueList=propertyValueList.toString().split(' ');
                            }
                        }
                        data.push(listItem);
                }
                // console.log(data)
                var filterType=$('input[name="filterType"]').val();
                $.ajax({
                    url:address3 + 'testcase/pagedQueryTestCaseByCondition',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        'filterType': parseInt(filterType),
                        'conditionList': data,
                        'currentPage': 1,
                        'pageSize': 10,
                        'orderType': 'asc',
                        'orderColumn': 'id'
                     }),
                    type:'post',
                    success:function(res){
                        // console.log(res)
                        that.caseList = res.testcaseViewRespDTOList;
                        that.tt = res.testcaseViewRespDTOList.length;
                        that.totalPage = Math.ceil(that.tt / that.listnum);
                        that.pageSize = that.listnum;
                    }

                });
        }
    },
});


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

//获取场景
function getScene(){
    $.ajax({
        url: address3+'sceneController/selectAllScene',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            "caseLibId" : sessionStorage.getItem('caselibId')
        }),
        success:function(data){
            app.sceneList=data.scenequeryDtoList;
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
        url: address3+"aut/queryListAut",
        type: "POST",
        contentType: 'application/json',
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
        url: address3 + 'transactController/pagedBatchQueryTransact',
        data: JSON.stringify({ 
            autId: val,
            currentPage: 1,
            orderColumns: 'id',
            orderType: 'asc',
            pageSize: 100000
        }),
        type: "POST",
        contentType: 'application/json',
        success: function(data) {
            var transactList = data.list;
            var str = "";
            for (var i = 0; i < transactList.length; i++) {

                str += " <option value='" + transactList[i].id + "'>" + transactList[i].nameMedium + "</option> ";
            }
            $('select[name="autid"]').parent().parent().next().find('select[name="transid"]').html(str);

        }

    });
}

//三级 模板脚本
function sanji() {

    var val = $('select[name="autid"]').parent().parent().next().find('select[name="transid"]').val();

    $.ajax({
        url: address3 + "scripttemplateController/queryTemplateByTransId",
        data: JSON.stringify({ "id": val }),
        type: "POST",
        contentType: 'application/json',
        success: function(data) {
            var lie = data.scriptTemplateList;
            var str = "";
            for (var i = 0; i < lie.length; i++) {

                str += " <option value='" + lie[i].id + "'>" + lie[i].name + "</option> ";
            }
            $('select[name="autid"]').parent().parent().next().find('select[name="scriptmodeflag"]').html(str);


        }

    });
}