var caseData = Vue.extend({
  template: '#case-data',
  data: function () {
    var _this = this;
    return {
      conditions: [],
      checkall: false,
      dataList: [
        {
          dataName: 333,
          dataValue: 9999,
          dataPoolName: 32323,
          objectName: 32323,
          description: '这是假数据，阿卡大家福利卡京东方'
        },
        {
          dataName: 333,
          dataValue: 9999,
          dataPoolName: 32323,
          objectName: 32323,
          description: '这是假数据，阿卡大家福利卡京东方'
        },
        {
          dataName: 333,
          dataValue: 9999,
          dataPoolName: 32323,
          objectName: 32323,
          description: '这是假数据，阿卡大家福利卡京东方'
        },
      ]
    }
  },
  watch: {
    conditions: function(newVla, oldVal) {
      if(newVla.length === 4) {
        this.checkall = true
        return
      }
      this.checkall = false;
    }
  },
  ready: function() {
    $('#alter-form').validate({
      submitHandler: function(form) {
        console.log(333)
        form.submit();
      }
    });
    
  },
  methods: {
    toggleCheckAll: function() {
      if (this.checkall) {
        this.conditions = ['input-data', 'flow-data', 'scene-data', 'global-data']
      } else {
        this.conditions = []
      }
    },
    changeCondition: function() {
      if(this.conditions.length === 4) {
        this.checkall = true
        return
      }
      this.checkall = false;
    },
    alterData: function(){
      $('#alterModal').modal('show')
    }
  }
})

Vue.component('case-data', caseData)