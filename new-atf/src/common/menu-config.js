const prefix = '../../../pages/';
const menus = [{
    key: 'system-management',
    name: '系统管理',
    submenus: [{
        key: 'user-management',
        name: '用户管理',
        url: prefix + 'usermanagement.html'
    }]
}, {
    key: 'process-config',
    name: '测试过程配置',
    submenus: [{
        key: 'testphase',
        name: '测试阶段',
        url: prefix + 'testphase.html'
    }, {
        key: 'productLine',
        name: '业务线管理',
        url: prefix + 'productLine.html'
    }, {
        key: 'runner-management',
        name: '执行机管理',
        url: prefix + 'runner-management.html'
    }]
}, {
    key: 'infrastructure',
    name: '测试基础设施',
    submenus: [{
        key: 'aut-management',
        name: '被测系统管理',
        url: prefix + 'aut.html'
    }, {
        key: 'architecture',
        name: '自动化构件管理',
        url: prefix + 'architecture.html'
    }]
}, {
    key: 'project-test',
    name: '项目测试',
    submenus: [{
        key: 'testitems',
        name: '测试任务管理',
        url: prefix + 'testitems.html'
    }, {
        key: 'testProject',
        name: '测试项目管理',
        url: prefix + 'testProject.html'
    }, {
        key: 'caseManagement',
        name: '测试用例管理',
        url: prefix + 'caseManagement.html'
    }, {
        key: 'datatable',
        name: '数据资源管理',
        url: prefix + 'datatable.html'
    }, {
        key: 'scene-management',
        name: '测试场景管理',
        url: prefix + 'scene.html'
    }, {
        key: 'testroundManage',
        name: '测试轮次管理',
        url: prefix + 'testroundManage.html'
    }, {
        key: 'testplan-execute',
        name: '测试计划及执行',
        url: prefix + 'testplan-execute.html'
    }, {
        key: 'testRecord',
        name: '执行记录管理',
        url: prefix + 'testRecord.html'
    }, {
        key: 'execution',
        name: '批量执行管理',
        url: prefix + 'execution.html'
    }, {
        key: 'testplan',
        name: '测试计划管理',
        url: prefix + '../testplan.html'
    }]
}];
export default menus;
