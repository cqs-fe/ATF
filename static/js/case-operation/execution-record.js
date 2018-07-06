/*设置recorderStatus的值：recorderStatus＝１，则查询各执行轮次中未激活的记录单；recorderStatus＝２，
则查询各执行轮次中激活的记录单；recorderStatus＝９则查询各执行轮次中的所有记录单（不包括删除的）。
（２）设置executeRound，设置完后则查询指定执行轮次的记录单。recorderStatus与executeRound不能同时设置。
sourchChannel有个特殊用法，若输入“PE4/PE6”则查询sourchChannel=PE4或PE6的所有记录单。
*/
var execRecord = Vue.extend({
	template: '#execution-record',
	props: ['recorddata'],
	data: function () {
		return {
			address: address.slice(0, -10), // address: 10.108.223.23:8080/ATFCloud
			srcDoc: '',
			srcs: []
		}
	},
	ready: function() {
		
	},
	watch: {
		queryData: function(newVal, oldVal) {
			var me = this;
			if (newVal) {
				var data = JSON.parse(decodeURIComponent(newVal));
				$.ajax({
					url: address + 'testrecordController/selectRecordWithTestcaseId',
					data: {
						sceneId: o.sceneId,
            recorderStatus: o.recorderStatus,
					},
					type: 'post',
					dataType: 'json',
					success: function(data, statusText) {
						if(!data.length) {
							Vac.alert("未查询到记录单");
							return;
						}
						for (let item of data) {
							if (item.resourcepath) {
								me.srcs.push(item.resourcepath)
							}
						}
						me.srcs = [...new Set(me.srcs)];
						console.log(me.srcs)
						// me.srcs = data.obj.map((item) => item.resourcepath);
					},
					error: function() {
						Vac.alert("查询失败");
					}
				});
			}
		}
	},
	computed: {
		queryData: function() {
			return this.recorddata;
		},
		item: function () {
			console.log(JSON.parse(decodeURIComponent(this.recorddata))['item']);
			return JSON.parse(decodeURIComponent(this.recorddata))['item'];
		}
	},
	methods: {
		changeSrcDoc: function() {
			this.srcDoc = `
		
			`
		}
	}
})

Vue.component('exec-record', execRecord)