var debugFunction = {
	debug () {
		if(this.exeScope == '' || this.debugRound == '') {
			Vac.alert('请输入调试轮次与执行范围！')
			return
		}
		// 若选择部分执行，则需要选中实例
		if(this.exeScope == 2 && this.selectedCases.length == 0 && this.checkedFlowNodes.length == 0) {
			Vac.alert('请选择要执行的部分实例！')
			return
		}
		// 删除选中的案例中节点案例,并生成要发送的数据
		let sendData = []
		let flowCases = [...this.flowNodeIds.keys()]
		console.log(flowCases)
		let set = new Set(this.selectedCases)
		for(let caseId of set) {
			if(flowCases.includes(caseId)) {
				set.delete(caseId)
			} else {
				let obj = {
					id: caseId,
					idtype: 1
				}
				sendData.push(obj)
			}
		}
		// 把选中的节点id也放到sendData中
		for(let flowId of this.checkedFlowNodes) {
			let obj = {
				id: flowId,
				idtype: 2
			}
			sendData.push(obj)
		}
		var _this = this
		console.log(typeof _this.exeScope)
		var data = {
			debuground: _this.debugRound,
			sceneId: _this.sceneid,
			exeScope: _this.exeScope, 
			selectState: +_this.exeScope === 1 ? "" : JSON.stringify(sendData)
		}

		$.ajax({
			url: address + 'executeController/scenedubug2',
			data: data,
			type: 'post',
			dataType: 'json',
			success: function(data, textStatux) {

			}
		})
	}
}