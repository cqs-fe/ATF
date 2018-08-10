/*
 * @Author: ZhuQingguang
 * @Date:   2018-06-20
 * @Last Modified by: ZhuQingguang
 * @Last Modified time: 2018-06-20
 */
/*import { components, Ajax, Vue, Alert, Confirm } from '@/common/index';
import { Select, Option } from 'element-ui';
Vue.use(Select);
Vue.use(Option);*/


const initialAddRowData = {
    nameMedium: '',
    descMedium: '',
    testPhaseId: '',
    testRoundId: ''
};
const initialAddRoundRowData = {
    roundName: '',
    roundDesc: '',
    recordmanagementflag: 1,
    timeexecutesetting: ''
};
var app = new Vue({
    el: '#app',
    data: {
        selectTestPlan: '',
        addModalShow: false,
        addRoundModalShow: false,
        addRowData: { ...initialAddRowData },
        addRoundRowData: { ...initialAddRoundRowData },
        addModalTitle: '新增测试计划',
        editType: 1,   // 1: add  2: update
        testPlanArray: [],
        testPhaseArray: [],
        testRoundArray: [],
        orderType:'asc',
        orderColumns:"id",
        page: {
            totalCount: 1,
            currentPage: 1,
            totalPage: 1,
            pageSize:5
        }
    },
    created() {
    },
    ready: function ready() {
        initialAddRowData.creatorId = sessionStorage.getItem('userId');
        initialAddRowData.caseLibId = sessionStorage.getItem('caselibId');
        this.addRowData = {...initialAddRowData};
        this.getTestPlans();
        this.getTestPhases();
        this.getTestRound();
        $('.3').addClass('open');
        $('.3 .arrow').addClass('open');
        $('.3-ul').css({display: 'block'});
        $('.3-9').css({color: '#ff6c60'});
    },
    methods: {
        turnToPage(currentPageParam){
            if(currentPageParam>0 && currentPageParam<=this.page.totalPage){
                this.page.currentPage = currentPageParam;
                this.getTestPlans();
            } 
            else Vac.alert("不在页码范围");
        },
        add() {
                const url = 1 === this.editType ? 'testPlanController/insertTestPlan' : 'testPlanController/updateTestPlan';
                const data = 1 === this.editType ? this.addRowData : {
                    id: this.selectTestPlan,
                    nameMedium: this.addRowData.nameMedium,
                    descMedium: this.addRowData.descMedium,
                    modifierId: this.addRowData.creatorId
                };
                Vac.ajax({
                    url: address3 + url,
                    data: data,
                    success: (data) => {
                        $('#addTestPlan').modal('hide');
                        if ('0000' === data.respCode) {
                            Vac.alert(data.respMsg);
                            this.addModalShow = false;
                            this.addRowData = {...initialAddRowData};
                            this.getTestPlans();
                        } else {
                            Vac.alert('出错啦~');
                        }
                    },
                    error: () => {
                        Vac.alert('出错啦~');
                    }
                });
        },
        delete() {
            Vac.ajax({
				url: address3 + 'testPlanController/deleteTestPlan',
				data: {
                    id: this.selectTestPlan
                },
				success: (data) => {
					if ('0000' === data.respCode) {
                        this.selectTestPlan = '';
                        this.getTestPlans();
                    }
                    Vac.alert(data.respMsg);
				},
				error: () => {
					Vac.alert('出错啦~');
				}
			});
        },
        showAddModal() {
            this.addRowData = {...initialAddRowData};
            this.editType = 1;
            $('#addTestPlan').on('show.bs.modal',function(event){
                var modal = $(this);
                modal.find('.modal-title').text("新增测试计划");
            })
            $("#addTestPlan").modal("show");
        },
        showDeleteConfirm() {
            if ('' === this.selectTestPlan) {
                Vac.alert('请选择测试计划');
                return;
            }
            var pro = Vac.confirm('', '', '', '确认要删除吗？');
                pro.then(() => {
                    this.delete();
                }, () => {});
        },
        showUpdateModal() {
            if ('' === this.selectTestPlan) {
                Vac.alert('请选择测试计划');
                return;
            }
            this.editType = 2;
            $('#addTestPlan').on('show.bs.modal',function(event){
                var modal = $(this);
                modal.find('.modal-title').text("修改测试计划");
            })
            $('#addTestPlan').modal('show');

            ({  
                nameMedium: this.addRowData.nameMedium,
                descMedium: this.addRowData.descMedium,
                testPhaseId: this.addRowData.testPhaseId,
                testRoundId: this.addRowData.testRoundId,
                // caseLibId: this.addRowData.caseLibId,
                // creatorId: this.addRowData.creatorId
            } = this.testPlanArray.find((item) => {
                return +this.selectTestPlan === +item.id;
            }));
        },
        getTestPlans() {
            Vac.ajax({
				url: address3 + 'testPlanController/pagedBatchQueryTestPlan',
				data: {
                    "pageSize":this.page.pageSize,
                    "currentPage":this.page.currentPage,
                    "orderType":this.orderType,
                    "orderColumns":this.orderColumns,
                    "nameMedium": "",
                    "descMedium": "",
                    "caseLibId": +initialAddRowData.caseLibId               
                },
				success: (data) => {
					if ('0000' === data.respCode) {
                        this.testPlanArray = data.testPlanEntityList;
                                this.page.totalCount=data.totalCount;
                                this.page.totalPage=data.totalPage;
					} else {
						Vac.alert('出错啦~');
					}
				},
				error: () => {
					Vac.alert('出错啦~');
				}
			});
        },
        getTestPhases() {
            Vac.ajax({
				url: address3 + 'testphaseController/selectAllTestphase',
				data: {},
				success: (data) => {
					if ('0000' === data.respCode) {
						this.testPhaseArray = data.testphaseEntityList;
					} else {
						Vac.alert('出错啦~');
					}
				},
				error: () => {
					Vac.alert('出错啦~');
				}
			});
        },
        getTestRound() {
            Vac.ajax({
                url: address3 + 'testroundController/selectAllTestround',
                data: {},
                success: (data) => {
                    if ('0000' === data.respCode) {
						this.testRoundArray = data.testroundEntityList;
					} else {
						Vac.alert('出错啦~');
					}
                }
            });
        },
        changeSelect(id) {
            if (+id === +this.selectTestPlan) {
                this.selectTestPlan = '';
            }
        },
        addTestRound() {
                Vac.ajax({
                    url: address3 + 'testroundController/insertTestround',
                    data: this.addRoundRowData,
                    success: (data) => {
                        if ('0000' === data.respCode) {
                            //Vac.alert("操作成功");
                            this.addRoundModalShow = false;
                            this.getTestRound();
                                $('#addTestRoundId').modal('hide');
                        } else {
                            Vac.alert(data.respMsg);
                        }
                    },
                    error: () => {
                        Vac.alert('网络错误，请稍候再试');
                    }
                });
        }
    }
});

function resort(target) {
    if (target.getAttribute("data-sort") === "desc") {
        app.orderType = "asc";
        target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-up")
        target.setAttribute("data-sort", "asc");
    } else {
        app.orderType = "desc";
        target.getElementsByTagName("span")[0].setAttribute("class", "icon-sort-down")
        target.setAttribute("data-sort", "desc");
    }
    app.orderColumns = target.getAttribute("data-order");
    app.getTestPlans();
}