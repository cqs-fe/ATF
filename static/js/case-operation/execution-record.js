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
					data: data,
					type: 'post',
					dataType: 'json',
					success: function(data, statusText) {
						if(!data.obj.length) {
							Vac.alert("未查询到记录单");
							return;
						}
						for (let item of data.obj) {
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
		}
	},
	methods: {
		changeSrcDoc: function() {
			this.srcDoc = `
			<?xml version="1.0" encoding="UTF-8"?>
			
			<html> 
				<head> 
					<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>  
					<title>身份认证-00001</title> 
				</head>  
				<body> 
					<div style="text-align:center"> 
						<h1>记录单</h1> 
					</div>  
					<div id="Guid" style="font-size:14pt;display:none">f4e71b6c-60e3-4161-acf2-fad5007a020e</div>  
					<div id="ReportVersion" style="font-size:14pt;display:none" value="1.0">null,防止简写格式</div>  
					<div> 
						<img src="http://10.108.223.23:8080/ATFCloud/timg.jpg">
						<label style="color:black;font-family:Arial;font-size: 16pt;border:1px solid green;width:100px;"> 
							<b>案例标识</b> 
						</label>  
						<div id="CaseId" style="font-size:14pt;display:none"> 
							<label>案例ID:</label>  
							<label>1</label> 
						</div>  
						<div id="CompositeType" style="font-size:14pt"> 
							<label>案例类型:</label>  
							<label>单案例</label> 
						</div>  
						<div id="UCaseCode" style="font-size:14pt"> 
							<label>案例编号:</label>  
							<label>身份认证-00001</label> 
						</div>  
						<div id="ActionCode" style="font-size:14pt"> 
							<label>动作标识:</label>  
							<label/> 
						</div>  
						<div id="FCaseCode" style="font-size:14pt"> 
							<label>父案例编号:</label>  
							<label/> 
						</div>  
						<div id="CaseFlowId" style="font-size:14pt;display:none"> 
							<label>父案例ID:</label>  
							<label/> 
						</div> 
					</div>  
					<div> 
						<label style="color:black;font-family:Arial;font-size: 16pt;border:1px solid green;width:100px;"> 
							<b>业务信息</b> 
						</label>  
						<div name="产品线名称" style="font-size:14pt"> 
							<label>产品线:</label>  
							<label/> 
						</div>  
						<div name="批次" style="font-size:14pt"> 
							<label>批次:</label>  
							<label/> 
						</div>  
						<div name="测试意图" style="font-size:14pt"> 
							<label>测试意图:</label>  
							<label><![CDATA[姓名和身份证号码一致]]></label> 
						</div>  
						<div name="测试步骤" style="font-size:14pt"> 
							<label>测试步骤:</label>  
							<label>1.模拟端输入姓名与身份证一致，提交&lt;br/&gt;2.检查认证状态&lt;br/&gt;3.检查身份证照片&lt;br/&gt;4.内管-网关鉴权订单查询</label> 
						</div>  
						<div id="Checkpoint" name="检查点" style="font-size:14pt"> 
							<label>检查点:</label>  
							<label>1</label> 
						</div>  
						<div name="预期结果" style="font-size:14pt"> 
							<label>预期结果:</label>  
							<label>1、通讯成功，返回000000，&lt;br/&gt;2、返回00--一致&lt;br/&gt;3、返回照片的字符串&lt;br/&gt;4、各字端显示正确，通道编号：KAOLAIA，交易成功，收费</label> 
						</div> 
					</div>  
					<div> 
						<label style="color:black;font-family:Arial;font-size: 16pt;border:1px solid green;width:100px;"> 
							<b>执行时间</b> 
						</label>  
						<div id="StartTime" style="font-size:14pt"> 
							<label>起始时间:</label>  
							<label/> 
						</div>  
						<div id="EndTime" style="font-size:14pt"> 
							<label>结束时间:</label>  
							<label/> 
						</div>  
						<div id="ProcessTime" style="font-size:14pt"> 
							<label>时间间隔:</label>  
							<label/> 
						</div> 
					</div>  
					<div> 
						<label style="color:black;font-family:Arial;font-size: 16pt;border:1px solid green;width:100px;"> 
							<b>执行结果</b> 
						</label>  
						<div id="ExeStatus" style="font-size:14pt"> 
							<label>结果状态:</label>  
							<label>执行失败</label> 
						</div>  
						<div id="FailureCause" style="font-size:14pt"> 
							<label>错误原因:</label>  
							<label/> 
						</div>  
						<div id="ErrorMessage" style="font-size:14pt"> 
							<label>错误信息:</label>  
							<label/> 
						</div> 
					</div>  
					<div style="color:black;font-family:Arial;font-size: 16pt;border:1px solid green;width:140px;"> 
						<b>执行过程日志</b> 
					</div>  
					<div id="ExecuteProcessLog"/>  
					<div id="ExecuteScript" style="color:black;font-family:Arial;font-size: 16pt;border:1px solid green;width:100px;display:none"> 
						<label>执行脚本:</label>  
						<label/> 
					</div>  
					<div id="ExecuteStepScript" style="color:black;font-family:Arial;font-size: 16pt;border:1px solid green;width:100px;display:none"> 
						<label>执行步骤脚本:</label>  
						<label>invoker.WebEdit("单笔代收模拟请求页面", "商户号").Set(data.get("商户号")); invoker.WebEdit("单笔代收模拟请求页面", "支付子通道编号").Set(data.get("支付子通道编号")); invoker.WebEdit("单笔代收模拟请求页面", "支付银行代码").Set(data.get("支付银行代码")); invoker.WebEdit("单笔代收模拟请求页面", "支付金额").Set(data.get("支付金额")); invoker.WebEdit("单笔代收模拟请求页面", "币种").Set(data.get("币种")); invoker.WebEdit("单笔代收模拟请求页面", "支付卡类型").Set(data.get("支付卡类型")); invoker.WebEdit("单笔代收模拟请求页面", "支付账号").Set(data.get("支付账号")); invoker.WebEdit("单笔代收模拟请求页面", "支付卡号有效期（信用卡）").Set(data.get("支付卡号有效期（信用卡）")); invoker.WebEdit("单笔代收模拟请求页面", "cvv2(信用卡)").Set(data.get("cvv2(信用卡)")); invoker.WebEdit("单笔代收模拟请求页面", "付款人姓名").Set(data.get("付款人姓名")); invoker.WebEdit("单笔代收模拟请求页面", "付款人证件类型").Set(data.get("付款人证件类型")); invoker.WebEdit("单笔代收模拟请求页面", "付款人证件号").Set(data.get("付款人证件号")); invoker.WebEdit("单笔代收模拟请求页面", "支付手机号").Set(data.get("支付手机号")); invoker.WebPage("单笔代收模拟请求页面", "").CapturePicture("提交前"); invoker.WebButton("单笔代收模拟请求页面", "测试提交").Click(); Thread.sleep(5000); invoker.WebPage("单笔代收模拟请求页面", "").CapturePicture("提交后");</label> 
					</div>  
					<div id="FlowData" style="color:black;font-family:Arial;font-size: 16pt;border:1px solid green;width:100px;display:none"> 
						<div id="data"> 
							<div id="name">商户号</div>  
							<div id="value">111</div> 
						</div>  
						<div id="data"> 
							<div id="name">通道编码</div>  
							<div id="value">222</div> 
						</div> 
					</div> 
				</body> 
			</html>			
			`
		}
	}
})

Vue.component('exec-record', execRecord)