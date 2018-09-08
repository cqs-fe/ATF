var vBody = new Vue({
	el: '#v-body',
	data: {
		rowData: null,
		selectedRows: [],
		addRowData: {
			name: '',
			descShort: ''
		},
		// tooltipMessage: '',
		// alertShow: false
	},
	ready: function(){
		var _this = this;
		this.getData();
		$('.modal').on('hide.bs.modal', function () {
		  _this.addRowData.descShort = '';
		  _this.addRowData.name = '';
		});
		$('.1').addClass('open')
    $('.1 .arrow').addClass('open')
    $('.1-ul').css({display: 'block'})
    $('.1-0').css({color: '#ff6c60'})
	},
	methods: {
		addRow: function(){
			var _this = this;
			var data = this.addRowData;
			Vac.ajax({
				url: address3 + "testphaseController/insertTestphase",
				data: data,
				success: function(data){
					if(data.respCode === '0000'){
						$('#add-modal').modal('hide')
						Vac.alert(data.respMsg)
						_this.getData();
					}else {
						Vac.alert(data.respMsg)
					}
					
				},
				error: function() {
					Vac.alert("出错了，请稍候再试~")
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
				Vac.ajax({
					url: address3 + "testphaseController/deleteTestphase",
					data: {id: +_this.selectedRows[0]},
					success: (data) => {
						if (data.respCode === '0000') {
							_this.getData();
							_this.selectedRows.shift();
						}
						Vac.alert(data.respMsg)
					},
					error: function() {
						Vac.alert("出错了，请稍候再试~")						
					}
				});
			}, function(){
				return;
			})
		},
		editRow: function(){
			if(this.selectedRows.length === 0){
				Vac.alert('请选择要修改的项目');
				return
			}
			$('#edit-modal').modal('show');
			$('#edit-id').val(this.selectedRows[0]);
			const data = this.rowData.find((v) => {
				return v.id === +this.selectedRows[0];
			});
			$('#edit-name').val(data.name);
			$('#edit-desc').val(data.descShort);			
		},
		saveRow: function(){
			var _this = this;
			let data = {};
			data.id = $('#edit-id').val();
			data.name = $('#edit-name').val();
			data.descShort = $('#edit-desc').val();
			Vac.ajax({
				url: address3 + "testphaseController/updateTestphase",
				data: data,
				success: (data,) => {
					if(data.respCode === '0000') {
						$('#edit-modal').modal('hide');
						_this.getData();
						_this.selectedRows = [];
					}
					Vac.alert(data.respMsg)
				},
				error: function() {
					Vac.alert("出错了，请稍候再试~")						
				}
			});
		},
		getData: function(){
			Vac.ajax({
				url: address3 + "testphaseController/selectAllTestphase",
				data: '{}',
				success: (data) => {
					if(data.respCode === '0000'){
						this.rowData = data.testphaseEntityList;
					}
				}
			});
		},
		hideAlert: function(){
			this.alertShow = false;
		}
	}
});
