var template_AutTranstScript = `
<div class="form-group">
    <label class="col-lg-2 control-label hidden">id列表</label>
    <div class="col-lg-4 hidden">
        <input type="text" name="ids" class="form-control">
    </div>
    <label class="col-lg-3 control-label">被测系统</label>
    <div class="col-lg-3">
        <select class="form-control" id="1ji" name="autid">
        </select>
    </div>
</div>
<div class="form-group">
    <label class="col-lg-2 control-label">功能点</label>
    <div class="col-lg-3">
        <select class="form-control" name="transid" id="2ji">
        </select>
    </div>
</div>
<div class="form-group">
    <label class="col-lg-3 control-label">模板脚本</label>
    <div class="col-lg-3">
        <select class="form-control" name="scriptmodeflag" id="3ji">
        </select>
    </div>
</div>
`;
var template_AutTranstScript = Vue.extend({
    template: template_AutTranstScript,
    data : function() {
      return {
        
      }
    }

})