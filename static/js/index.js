var Alert = require('../modules/alert.js'); //引入了弹窗插件

// Alert.show({
// 	content: 'change'
// })

var app = new Vue({
	el: '#v-demo',
	data: {
		message: {
			header: '我是头部',
			body: '这是demo页面body1',
			footer: '我是尾部'
		}
	},
	methods: {
		alertShow: function(){
			Alert.show({
				title: '系统提示',//非必须
				content: '我是弹窗alert'
			});
		},
		alertConfirm: function(){
			Alert.show({
				title: '系统提示',//非必须
				type: 'confirm',
				content: '确定要提交吗?',
				sureBtnText: "提交",
				sure: function(){
					Alert.hide();
					$("#loadingToast").show();
					setTimeout(function(){
						$("#loadingToast").hide();
						Alert.show({
							content: '提交成功',
							sureBtnText: '关闭'
						});
					},600);
				}
			});
		}
	}
});
