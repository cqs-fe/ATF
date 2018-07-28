var app = new Vue({
    el: '#v-execcode',
    data: {
        autId:'',
        autName:'',
        execodeId:''
    },
    ready: function() {
        this.setval();
        this.getCode();
    },
    methods: {
        setval (){
            // var thisURL = document.URL;
            // var params = thisURL.split('?')[1];
            // this.autId = params.split('&')[0].split('=')[1];
            // this.autName = decodeURI(params.split('&')[1].split('=')[1]);
            this.autId=sessionStorage.getItem("autId");
            this.autName=sessionStorage.getItem("autName");
        },
        getCode (){
            $.ajax({
                url:address3+'tool/querySingleTool',
                type:'post',contentType: 'application/json',
                data: JSON.stringify({
                    'id':this.autId
                }),
                success:function(data){
                    console.log(data);
                    if(data.respCode=="0000"){
                        app.execodeId=data.id;
                        $('textarea[name="maincodeBegin"]').val(data.maincodeBegin);
                        $('textarea[name="maincodeEnd"]').val(data.maincodeEnd);
                    }
                }
            });
        },
        update (){
            const maincodeBegin=$('textarea[name="maincodeBegin"]').val();
            const maincodeEnd=$('textarea[name="maincodeEnd"]').val();
            $.ajax({
                url:address3+'tool/updateToolInfo',
                 type:'post',contentType: 'application/json',
                data: JSON.stringify({
                    'id':app.execodeId,
                    'toolname': 'groovy',
                    'autId':this.autId,
                    'maincodeBegin':maincodeBegin,
                    'maincodeEnd':maincodeEnd
                }),
                success:function(data){
                    if(data.respCode==0000){
                        $('#successModal').modal();
                    }else{
                        $('#failModal').modal();
                    }
                },
                error:function(){
                    $('#failModal').modal();
                }
            });
        }
    },

});