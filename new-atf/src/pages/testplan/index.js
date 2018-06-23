/*
 * @Author: ZhuQingguang
 * @Date:   2018-06-20
 * @Last Modified by: ZhuQingguang
 * @Last Modified time: 2018-06-20
 */
import '@/static/css/base.scss';

import { components, Ajax, Vue, Alert, Confirm } from '@/common/index';
import { Select, Option } from 'element-ui';
Vue.use(Select);
Vue.use(Option);

const initialAddRowData = {
    nameMedium: '',
    descMedium: '',
    testPhaseId: '',
    testRoundId: '',
    creatorId: sessionStorage.getItem('userId') || 1,
    caseLibId: sessionStorage.getItem('caseLibId') || 1
};
new Vue({
    el: '#app',
    components: {
        ...components
    },
    data: {
        selectTestPlan: '',
        addModalShow: false,
        addPhaseModalShow: false,
        addRowData: { ...initialAddRowData },
        addPhaseRowData: {},
        addModalTitle: '新增测试计划',
        editType: 1,   // 1: add  2: update
        testPlanArray: [],
        testPhaseArray: [],
        testRoundArray: []
    },
    created() {
        this.getTestPlans();
        this.getTestPhases();
        this.getTestRound();
    },
    mounted() {

    },
    methods: {
        add(type) {
            if (!type || 'cancel' === type) {
                this.addRowData = {...initialAddRowData};
                return true;
            } else {
                const url = 1 === this.editType ? 'testPlanController/insertTestPlan' : 'testPlanController/updateTestPlan';
                const data = 1 === this.editType ? this.addRowData : {
                    id: this.selectTestPlan,
                    nameMedium: this.addRowData.nameMedium,
                    descMedium: this.addRowData.descMedium,
                    modifierId: this.addRowData.creatorId
                };
                Ajax({
                    url: address3 + url,
                    data: data,
                    success: (data) => {
                        if ('0000' === data.respCode) {
                            Alert(data.respMsg);
                            this.addModalShow = false;
                            this.getTestPlans();
                        } else {
                            Alert('出错啦~');
                        }
                    },
                    error: () => {
                        Alert('出错啦~');
                    }
                });
            }
        },
        delete() {
            Ajax({
				url: address3 + 'testPlanController/deleteTestPlan',
				data: {
                    id: this.selectTestPlan
                },
				success: (data) => {
					if ('0000' === data.respCode) {
                        this.selectTestPlan = '';
                        this.getTestPlans();
                    }
                    Alert(data.respMsg);
				},
				error: () => {
					Alert('出错啦~');
				}
			});
        },
        showAddModal() {
            this.editType = 1;
            this.addModalShow = true;
        },
        showDeleteConfirm() {
            if ('' === this.selectTestPlan) {
                Alert('请选择测试计划');
                return;
            }
            Confirm('确认删除吗？')
            .then(() => {
                this.delete();
            })
            .catch(() => {
                
            })
        },
        showUpdateModal() {
            if ('' === this.selectTestPlan) {
                Alert('请选择测试计划');
                return;
            }
            this.editType = 2;
            this.addModalTitle = '修改测试计划';
            this.addModalShow = true;
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
            Ajax({
				url: address3 + 'testPlanController/selectAllTestPlan',
				data: {},
				success: (data) => {
					if ('0000' === data.respCode) {
						this.testPlanArray = data.testPlanEntityList;
					} else {
						Alert('出错啦~');
					}
				},
				error: () => {
					Alert('出错啦~');
				}
			});
        },
        getTestPhases() {
            Ajax({
				url: address3 + 'testphaseController/selectAllTestphase',
				data: {},
				success: (data) => {
					if ('0000' === data.respCode) {
						this.testPhaseArray = data.testphaseEntityList;
					} else {
						Alert('出错啦~');
					}
				},
				error: () => {
					Alert('出错啦~');
				}
			});
        },
        getTestRound() {
            Ajax({
                url: address3 + 'testroundController/selectAllTestround',
                data: {},
                success: (data) => {
                    if ('0000' === data.respCode) {
						this.testRoundArray = data.testroundEntityList;
					} else {
						Alert('出错啦~');
					}
                }
            });
        },
        changeSelect(id) {
            if (+id === +this.selectTestPlan) {
                this.selectTestPlan = '';
            }
        },
        showAddPhseModal() {
            this.addPhaseModalShow = true;
        },
        addTestPhase(type) {
            if (!type || 'cancel' === type) {
                this.addPhaseRowData = {
                    phaseName: '', phaseDesc: ''
                };
                return true;
            } else {
                Ajax({
                    url: address3 + 'testphaseController/insertTestphase',
                    data: this.addPhaseRowData,
                    success: (data) => {
                        if ('0000' === data.respCode) {
                            Alert(data.respMsg);
                            this.addPhaseModalShow = false;
                            this.getTestPhases();
                        } else {
                            Alert('出错啦~');
                        }
                    },
                    error: () => {
                        Alert('出错啦~');
                    }
                });
            }
        }
    }
});
