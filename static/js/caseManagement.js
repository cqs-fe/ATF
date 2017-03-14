var app = new Vue({
    el: '#v-demo',
    data: {
        isShow: false,
        caseNode: '<h3>流程节点用例</h3><div class="form-group"><label class="col-lg-2 control-label">流程节点编号</label><div class="col-lg-4"><input type="text" class="form-control"></div><label class="col-lg-2 control-label">动作标识</label><div class="col-lg-4"><input type="text" class="form-control"></div></div><div class="form-group"><label class="col-lg-2 control-label">被测系统</label><div class="col-lg-4"><select class="form-control" size="1"><option></option></select></div><label class="col-lg-2 control-label">被测系统版本号</label><div class="col-lg-4"><select class="form-control" size="1"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">功能码</label><div class="col-lg-4"><select class="form-control" size="1"><option></option></select></div><label class="col-lg-2 control-label">执行者</label><div class="col-lg-4"><select class="form-control" size="1"><option>葛晋鹏</option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">执行方式</label><div class="col-lg-4"><select class="form-control" size="1"><option></option></select></div><label class="col-lg-2 control-label">脚本管理方式</label><div class="col-lg-4"><select class="form-control" size="1"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">所属模板</label><div class="col-lg-4"><select class="form-control" size="1"><option></option></select></div></div><div class="form-group"><label class="col-lg-2 control-label">备注</label><div class="col-lg-10"><textarea class="form-control" rows="3"></textarea></div></div>',
        productList: [],
        priority: [],
        executeMethod: [],
        casetype: [],
        useStatus: [],
        sortparam: '',
        selected: "A",
        options: [],
        apiUrl: '../mock/caseManagement.json',
        pageSize: null,
        totalPage: 10,
        currentPage: 1,
        isPageNumberError: false,
        ischeckdate: [], //获取选项框数据
        checkAll: false, //全选
    },
    ready: function() {
        this.getCase();
    },
    watch: {
        'ischeckdate': function() {
            console.log(this.ischeckdate.toString());
            if (this.productList.length === this.ischeckdate.length) {
                this.checkAll = true;
            } else {
                this.checkAll = false;
            }
        },
        checkAll(yes) {
            this.checkAll = yes;
        }
    },
    methods: {
        toggle: function() {
            this.isShow = !this.isShow;
        },

        // getCase: function(currentPage, pageSize) {
        //     $.ajax({
        //         url: '../mock/caseManagement.json',
        //         type: 'GET',
        //         data: {
        //             'page': currentPage,
        //             'pageSize': pageSize
        //         },
        //         success: function(data) {
        //             console.info(data);
        //             console.info(data.o);
        //             app.productList = data.o;
        //             app.totalPage = Math.ceil(data.total / pageSize);
        //             app.pageSize = data.pageSize;
        //         }
        //     });
        // },
        getCase: function() {
            this.$http.get(this.apiUrl)
                .then((response) => {
                    this.$set('productList', response.data.o);
                })
                .catch(function(response) {
                    console.log(response);
                });
            totalPage = Math.ceil(productList.length / pageSize);
        },
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
            ts.changeCallback(pageNum);
        },
        addCaseNode: function() {
            var element = $("#addCaseNode").append(this.caseNode);
            this.$compile(element.get(0));
        },
        checkedAll: function() {
            let ischeckdate = [];
            if (!this.checkAll) {
                this.productList.forEach((item) => {
                    ischeckdate.push(item.id);
                });
            }
            this.ischeckdate = ischeckdate;
            console.log("aa-----" + this.ischeckdate.toString());
        }
    }
});
