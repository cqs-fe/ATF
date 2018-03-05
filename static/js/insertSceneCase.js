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
        url_parameter: '',
    },
    ready: function() {
        this.setVal();
        getCase(this.currentPage, this.pageSize, this.order, this.sort);
        changeListNum();
        getScene();

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
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">属于</option><option value="without">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" multiple></select>')
                        $(this).parent().next().next().append('<option value="1">单用例</option><option value="2">流程用例</option><option value="3">节点用例</option>');
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select"></select>')
                        $(this).parent().next().next().append('<option value="1">单用例</option><option value="2">流程用例</option><option value="3">节点用例</option>');
                        $(this).parent().next().next().selectpicker('refresh');                    
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
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" multiple></select>');
                        $(this).parent().next().next().append('<option value="1">1级</option><option value="2">2级</option><option value="3">3级</option><option value="4">4级</option><option value="5">5级</option><option value="6">6级</option><option value="7">7级</option><option value="8">8级</option><option value="9">9级</option>');
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select"></select>');
                        $(this).parent().next().next().append('<option value="1">1级</option><option value="2">2级</option><option value="3">3级</option><option value="4">4级</option><option value="5">5级</option><option value="6">6级</option><option value="7">7级</option><option value="8">8级</option><option value="9">9级</option>');
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });
            }else if(selectedProp=='executeMethod'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="in">属于</option><option value="">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" multiple></select>');
                        $(this).parent().next().next().append('<option value="1">手工</option><option value="2">自动化</option><option value="3">配合</option>');
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select"></select>');
                        $(this).parent().next().next().append('<option value="1">手工</option><option value="2">自动化</option><option value="3">配合</option>');
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });            
            }else if(selectedProp=='submissionId'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">属于</option><option value="without">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                let target=$(event.target);
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address+"missionController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value="${item.id}">${item.missionName}</option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"missionController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value="${item.id}">${item.missionName}</option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });                 
            }else if(selectedProp=='autId'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">属于</option><option value="without">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                let target=$(event.target);
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address+"autController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value="${item.id}">${item.autName}</option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"autController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value="${item.id}">${item.autName}</option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });   
            }else if(selectedProp=='transId'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">属于</option><option value="without">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                let target=$(event.target);
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address+"",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });  
            }else if(selectedProp=='caseproperty'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">属于</option><option value="without">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" multiple></select>')
                        $(this).parent().next().next().append('<option value="">正常值</option><option value="">错误值</option><option value="">边界值</option><option value="">要素级</option><option value="">流程级</option>');
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select"></select>')
                        $(this).parent().next().next().append('<option value="">正常值</option><option value="">错误值</option><option value="">边界值</option><option value="">要素级</option><option value="">流程级</option>');
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });
            }else if(selectedProp=='casetype'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">属于</option><option value="without">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" multiple></select>');
                        $(this).parent().next().next().append('<option value="1">联机</option><option value="2">批量</option><option value="3">接口</option>');
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select"></select>');
                        $(this).parent().next().next().append('<option value="1">联机</option><option value="2">批量</option><option value="3">接口</option>');
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });
            }else if(selectedProp=='author'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">属于</option><option value="without">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                let target=$(event.target);
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address+"userController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"userController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });  
            }else if(selectedProp=='reviewer'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">属于</option><option value="without">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                let target=$(event.target);
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address+"userController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"userController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });  
            }else if(selectedProp=='executor'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">属于</option><option value="without">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                let target=$(event.target);
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address+"userController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"userController/selectAll",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });  
            }else if(selectedProp=='scriptMode'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">属于</option><option value="without">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" multiple></select>');
                        $(this).parent().next().next().append('<option value="1">模板</option><option value="2">自由编写</option>');
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select"></select>');
                        $(this).parent().next().next().append('<option value="1">模板</option><option value="2">自由编写</option>');
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });               
            }else if(selectedProp=='scriptModeFlag'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">属于</option><option value="without">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                let target=$(event.target);
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address+"",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });  
            }else if(selectedProp=='testpoint'){
                // compare select
                $(event.target).parent().next().children('select').children().remove();
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="">属于</option><option value="">不属于</option><option value="contain">包含</option><option value="without">不包含</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                let target=$(event.target);
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address+"",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');                    
                    }
                });
            }else if(selectedProp=='testdesign'){
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
                $(event.target).parent().next().children('select').append('<option value="">请选择</option><option value="=">等于</option><option value="!=">不等于</option><option value="contain">属于</option><option value="without">不属于</option>');
                $(event.target).parent().next().children('select').selectpicker('refresh');
                // value select
                let compareSelect=$(event.target).parent().next().children('select');
                let target=$(event.target);
                $(compareSelect).on('change',function(){
                    if($(this).val()=='contain'||$(this).val()=='without'){
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true" multiple></select>')
                        $.ajax({
                            url: address+"",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');
                    }else{
                        $(this).parent().next().next().remove();
                        $(this).parent().next().after('<select name="propertyValue" class="selectpicker val_select" data-live-search="true"></select>')
                        $.ajax({
                            url: address+"",
                            type: 'get',
                            success:function(data){
                                if(data.success){
                                    let submissionList=data.obj;
                                    for(let item of submissionList){
                                        target.parent().next().next().next().children('select').append(`<option value=""></option>`);
                                    }
                                    target.parent().next().next().next().children('select').selectpicker('refresh');

                                }
                            }
                        });
                        $(this).parent().next().next().selectpicker('refresh');                    
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
            this.url_parameter = 'SceneManagement.html?' + getval;
            this.sceneid = keyval[0].split('=')[1],
            this.scenename = decodeURI(keyval[1].split('=')[1]);
        },
        //添加场景案例
        insert: function() {
            this.getIds();
            var selectedInput = $('input[name="chk_list"]:checked');
            if (selectedInput.length === 0) {
                $('#selectAlertModal').modal();
            } else{
                let that=this;
                $.ajax({
                    url: address + 'testexecutioninstanceController/inserttestcasetoscene',
                    type: 'post',
                    data: {
                        'sceneid': that.sceneid,
                        'caseidList': '['+that.ids+']',
                    },
                    success: function(data) {
                        if (data.success) {
                            location.href = "SceneManagement.html?sceneid=" + that.sceneid + "&" + "scenename=" + that.scenename;
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
                console.log(list)
                for(let i=0;i<list.length;i++){
                    let listItem={};
                    listItem.propertyName=$(list[i]).find('select[name="propertyName"]').val();
                    listItem.compareType=$(list[i]).find('select[name="compareType"]').val();
                    listItem.propertyValue='';
                    listItem.propertyValues=$(list[i]).find('.val_select').val();
                    data.push(listItem);
                }
                console.log(data)
                $.ajax({
                    url:address+'TestcaseController/testcaseFilter',
                    data:{
                        filterConditionDtoList:JSON.stringify(data)
                     },
                    type:'get',
                    dataType:"json",
                    success:function(res){
                        console.log(res)
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
