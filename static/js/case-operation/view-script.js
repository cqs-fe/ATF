var viewScript = Vue.extend({
	template: '#view-script-template',
	props: ['testcaseid'],
	data: function () {
		return {
      tableData: []
		}
	},
	ready: function() {
    // this.query();
    console.log('view script ready')
	},
	watch: {
    queryData: function() {console.log('watch');
      this.query();
    }
	},
	computed: {
    queryData: function() {console.log('computed')
      return this.testcaseid
    }
	},
	methods: {
    query: function() {
      if(!this.queryData) {
        return;
      }
      var _this = this;
      var data = {testcaseId: this.queryData };
      $.ajax({
        url: address + 'antlr/getTestcaseScript',
        data: data,
        type: 'post',
        dataType: 'json',
        success: function (data, statusText) {
          if (!data.success) {
            Vac.alert(data.msg || '查询失败');
            return;
          }
          _this.tableData = data.obj;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          Vac.alert(`查询出错！\n 错误信息：${textStatus}`);
        }
      });
    }
	}
});

Vue.component('view-script', viewScript);