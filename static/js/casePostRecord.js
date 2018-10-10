var app = new Vue({
    el: '#casePostRecord',
    data: {
        importUrl:address3+'testcase/batchImportTestcase',
        isShow: false,
        iconflag: true,
        caseNodeNum: 0,
        caseNode: '</h3><div class="form-group"><label class="col-lg-2 control-label hidden">案例组成类型</label><div class="col-lg-4 hidden"><input type="text" class="form-control" name="caseCompositeType" value="3"></div><label class="col-lg-2 control-label">流程节点编号</label><div class="col-lg-4"><input type="text" class="form-control" name="subcasecode"></div><label class="col-lg-2 control-label">动作标识</label><div class="col-lg-4"><input type="text" class="form-control" name="actioncode"></div></div><div class="form-group"><label class="col-lg-2 control-label">被测系统</label><div class="col-lg-4"><select class="form-control" size="1" name="subautid" id=""></select></div><label class="col-lg-2 control-label">被测系统版本号</label><div class="col-lg-4"><input class="form-control" name="subversioncode"></div></div><div class="form-group"><label class="col-lg-2 control-label">功能码</label><div class="col-lg-4"><select class="form-control" size="1" name="subtransid"><option></option></select></div><label class="col-lg-2 control-label">所属模板</label><div class="col-lg-4"><select class="form-control" size="1" name="subscriptmodeflag"></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行方式</label><div class="col-lg-4"><select class="form-control" size="1" name="executemethod"><option>手工</option><option>自动化</option><option>配合</option></select></div><label class="col-lg-2 control-label">脚本管理方式</label><div class="col-lg-4"><select class="form-control" size="1" name="scriptmode"><option>模板</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行者</label><div class="col-lg-4"><select class="form-control" size="1" name="executor"><option v-for="user in users" value="{{user.id}}">{{user.reallyname}}</option></select></div><label class="col-lg-2 control-label">测试顺序</label><div class="col-lg-4"><input class="form-control" name="steporder"></div></div><div class="form-group"><label class="col-lg-2 control-label">案例使用状态</label><div class="col-lg-4"><select class="form-control" size="1" name="subusestatus"><option value="1">新增</option><option value="2">评审通过</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">备注</label><div class="col-lg-10"><textarea class="form-control" rows="3" name="note"></textarea></div></div>',
        caseList: [], //案例 
        tt: 0, //总条数
        pageSize: 10, //页面大小
        currentPage: 1, //当前页
        totalPage: 1, //总页数F
        listnum: 10, //页面大小
        order: 'batch_import_no',
        sort: 'desc',
        allUploadUser:'',
        isPageNumberError: false,
        checkboxModel: [],
        checked: "",
        subCaseList: [], //流程节点
        caselibid:sessionStorage.getItem('caselibId'), //案例库id
        userId:sessionStorage.getItem('userId'),
        failMSG:"操作失败啦",
    },
    ready: function() {
        this.getAllUploadUser();
        this.getCase();
        this.changeListNum();
 		 
 			  this.downloadTemplate();
       // this.getMission(); //获取案例添加表单任务编号下拉列表
        $(".myFileUpload").change(function() {
            var arrs = $(this).val().split('\\');
            var filename = arrs[arrs.length - 1];
            $(".show").val(filename);
        });

        $('.3').addClass('open')
        $('.3 .arrow').addClass('open')
        $('.3-ul').css({display: 'block'})
        $('.3-2').css({color: '#ff6c60'})
    },
    methods: {
        //获取案例
        getAllUploadUser:function(){
        	 $.ajax({
                url:   address3+'testcase/batchImport/queryAllUploadUser' , 
                type: 'post',
                data: {
                   },
                    success: function(data) {
                      
                    app.allUploadUser=data.userNames;
                     console.log("success"); 
                     
                }, error: function( ) { 
                      console.log("error"); 
                   } 
            });
        	},
        getCase:function() {
            var _this=this;
            $.ajax({ 
                url: address3+'testcase/batchImport/queryBatchImportStatus', 
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    'pageNum': _this.currentPage,
                    'pageSize': _this.pageSize,
                    'orderColumn': 'create_time',
                    'orderType':'desc',
                    'uploadUserReallyName': $('#sortuploadUserName').val(),
                    'importStatus': $('#importStatus').val(),
                    'createTimeLower': $('#createTimeLower').val().replace( '-','/' ).replace( '-','/' ) ,
                    'createTimeUpper': $('#createTimeUpper').val().replace( '-','/' ).replace( '-','/' ) ,
                    'caseLibId': _this.caselibid,
                }),
                success: function(data) {
                    app.tt = data.totalCount; 
                    app.caseList = data.rows; 
                    app.totalPage =data.totalPage;
                }, error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    data={"retCode":"tcmRet00000","retMsg":"查询成功!","retData":[{"batchImportNo":"2018010574eb0a5966074e6","caseLibId":1,"uploadUserName":"杨梁","totalNum":8,"successNum":3,"failNum":5,"errMsg":"用例部分导入失败","importStatus":"部分成功","createTime":"2018-01-05 15:02:39","finishTime":"2018-01-05 15:02:40"},{"batchImportNo":"201801056c399a7c4f644dd","caseLibId":1,"uploadUserName":"杨梁","totalNum":8,"successNum":3,"failNum":5,"errMsg":"用例部分导入失败","importStatus":"部分成功","createTime":"2018-01-05 15:05:56","finishTime":"2018-01-05 15:05:57"},{"batchImportNo":"201801040c8b38548754465","caseLibId":1,"uploadUserName":"杨梁","totalNum":8,"successNum":3,"failNum":5,"errMsg":"用例部分导入失败","importStatus":"部分成功","createTime":"2018-01-04 14:36:28","finishTime":"2018-01-04 14:36:31"},{"batchImportNo":"20171224fb6714620662425","caseLibId":1,"uploadUserName":"杨梁","totalNum":9,"successNum":3,"failNum":6,"errMsg":"用例部分导入失败","importStatus":"部分成功","createTime":"2017-12-24 17:27:13","finishTime":"2017-12-24 17:27:15"},{"batchImportNo":"20171224aadd2b79502f485","caseLibId":1,"uploadUserName":"杨梁","totalNum":9,"successNum":3,"failNum":3,"errMsg":"用例部分导入失败","importStatus":"部分成功","createTime":"2017-12-24 17:21:26","finishTime":"2017-12-24 17:21:28"},{"batchImportNo":"20171224a3b586769c17437","caseLibId":1,"uploadUserName":"杨梁","totalNum":9,"successNum":3,"failNum":3,"errMsg":"用例部分导入失败","importStatus":"部分成功","createTime":"2017-12-24 17:17:18","finishTime":"2017-12-24 17:17:20"},{"batchImportNo":"20171224182a4e2b5d684f6","caseLibId":1,"uploadUserName":"杨梁","totalNum":8,"successNum":8,"failNum":0,"errMsg":"全部用例导入成功！","importStatus":"全部成功","createTime":"2017-12-24 17:27:42","finishTime":"2017-12-24 17:27:44"}]};
                    app.caseList = data.retData;
                    app.tt = data.retData;
                    app.totalPage = Math.ceil(app.tt / app.listnum);
                    app.pageSize = app.listnum;
                   } 
            });
        },
       
         searchRecord : function() {
         	 this.getCase(currentPage, pageSize, order, sort);
         	},
       
        //改变页面大小
        changeListNum:function() {
            $('#mySelect').change(function() {
                 console.log(app.pageSize);
                 app.listnum=app.pageSize;
                app.getCase();
            });
        },
          //下载模板
        downloadTemplate:function() {
            $('#exampleDownload').click(function() {
            	 
            var val=$('input:radio[name="templateType"]:checked').val();
            
            if(val==null){
                return false;
            }
             		else if(val==0){
             	 	  let url = address3+"testcase/batchImport/file/template/simple";
			          window.location.href = url;
            		 } 
            		 else{ 
             	      let url =address3+"testcase/batchImport/file/template/standard";
			           window.location.href = url;
            		 } 
            });
        },
        
         //上传
          upload:function() {
                            var _this=this;
							$.ajax({
    						    url: address3+'testcase/batchImportTestcase',
    						    type: 'POST',
    						    cache: false,
    						    data: new FormData($('#importForm')[0]),
    						    processData: false,
    						    contentType: false, 
    						    success: function(data) {
                       		 	$('#importModal').modal('hide');
                       		 	if (data.respCode==0000) {
                                            $('#successModal').modal('show');
                                        } else {
                                            _this.failMSG=data.respMsg;
                                            $('#failModal2').modal('show');
                                        }
                        	    }, error: function(data) { 
                           		 $('#importModal').modal('hide');
                           		 	$('#failModal').modal('show');
                                    }
    						}) ;  
        },

          downloadError :function (ID) {
          	 var url = address3+"testcase/batchImport/file/errorFile/";
			       window.location.href = url+ID;
			       
         },
				 downloadFile :function (ID) {
          	 var url = address3+"testcase/batchImport/file/uploadFile/";
			         window.location.href = url+ID;
         },
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
            this.getCase();
            // ts.queryCase();
        },
       
         
        
    },

});