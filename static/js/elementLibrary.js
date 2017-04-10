var app = new Vue({
    el: '#elementLibrary',
    data: {

    },
    ready: function() {
        this.autSelect();
        this.transactSelect();
        $('#autSelect').change(function() {
            app.transactSelect();
        });
    },
    methods: {
        //获取测试系统
        autSelect: function() {
            $.ajax({
                async:false,
                url: "http://10.108.226.152:8080/ATFCloud/autController/selectAll",
                type: "POST",
                success: function(data) {
                    var autList = data.obj;
                    var str = "";
                    for (var i = 0; i < autList.length; i++) {

                        str += " <option value='" + autList[i].id + "' >" + autList[i].autName + "</option> ";
                    }

                    $('#autSelect').html(str);

                }
            });
        },
        //功能点
        transactSelect: function() {
            var val = $('#autSelect').val();
            $.ajax({
                async: false,
                url: 'http://10.108.226.152:8080/ATFCloud/transactController/showalltransact',
                data: { 'autlistselect': val },
                type: "POST",
                success: function(data) {
                    var transactList = data.o;
                    var str = "";
                    for (var i = 0; i < transactList.length; i++) {

                        str += " <option value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
                    }
                    $('#transactSelect').html(str);

                }

            });
        }

    },
});
