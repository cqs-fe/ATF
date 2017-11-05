var vBody = new Vue({
	el: '#v-body',
	data: {
		rowData: null,
		selectedRows: [],
		addRowData: {
			phasename: '',
			phasedesc: ''
		},
		// tooltipMessage: '',
		// alertShow: false
	},
	created: function(){
		var _this = this;
		$.ajax({
			url: address + "testphaseController/selectAll",
			type: "get",
			dataType: 'json',
			success: (data, statusText) => {
				if(data.success === true){
					this.rowData = data.obj;
				}
			}
		});
		$('.modal').on('hide.bs.modal', function () {
		  _this.addRowData.phasedesc = '';
		  _this.addRowData.phasename = '';
		});
	},
	methods: {
		addRow: function(){
			var _this = this;
			var data = this.addRowData;
			$.ajax({
				url: address + "testphaseController/insert",
				data: data,
				type: 'post',
				dataType: 'json',
				success: function(data, statusText){
					if(data.success === true){
						$('#add-modal').show('hide')
						Vac.alert('添加成功')
						$('#add-modal').modal('hide')
						_this.getData();
					}else {
						Vac.alert('添加失败' + data.msg)
					}
					
				}
			});
		},
		removeRow: function(){
			var _this = this;
			if(this.selectedRows.length === 0){
				Vac.alert('请选择要删除的项目')
				return
			}
			Vac.confirm('#vac-confirm', '.okConfirm', '.cancelConfirm').then(function(){
				$.ajax({
					url: address + "testphaseController/delete",
					data: 'id='+_this.selectedRows[0],
					type: "post",
					dataType: 'json',
					success: (data, statusText) => {
						Vac.alert(data.msg)
						_this.getData();
						_this.selectedRows.shift();
					}
				});
			}, function(){
				return;
			})
		},
		editRow: function(){
			var _this = this;
			if(this.selectedRows.length === 0){
				Vac.alert('请选择要修改的项目')
				return
			}

			$('#edit-modal').modal('show');
			var id = this.selectedRows[0];
			$.ajax({
				url: address + 'testphaseController/testphasequery',
				data: 'id='+id + '&phasename=&phasedesc=',
				type: 'post',
				dataType: 'json',
				success: function(data, statusText){
					if(data.obj.length){
						console.log(data.obj[0]);
						$('#edit-id').val(data.obj[0].id);
						$('#edit-name').val(data.obj[0].phasename);
						$('#edit-desc').val(data.obj[0].phasedesc);
					}
				}
			});
		},
		saveRow: function(){
			var _this = this;
			let data = {};
			data.id = $('#edit-id').val();
			data.phasename = $('#edit-name').val();
			data.phasedesc = $('#edit-desc').val();
			$.ajax({
				url: address + "testphaseController/update",
				data: data,
				type: "post",
				dataType: 'json',
				success: (data, statusText) => {
					if(data.success === true) {
						Vac.alert(data.msg)
						$('#edit-modal').modal('hide');
						_this.getData();
						_this.selectedRows = [];
					} else {
						Vac.alert(data.msg)
					}
					
				}
			});
		},
		getData: function(){
			$.ajax({
				url: address + "testphaseController/selectAll",
				type: "get",
				dataType: 'json',
				success: (data, statusText) => {
					if(data.success === true){
						this.rowData = data.obj;
					}
				}
			});
		},
		hideAlert: function(){
			this.alertShow = false;
		}
	}
});
