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
                url:address+'toolController/query',
                type:'post',
                data:{
                    'autid':this.autId
                },
                success:function(data){
                    console.log(data);
                    if(data){
                        app.execodeId=data.obj.id;
                        $('textarea[name="maincodeBegin"]').val(data.obj.maincodeBegin);
                        $('textarea[name="maincodeEnd"]').val(data.obj.maincodeEnd);
                    }
                }

            });
        },
        update (){
            const maincodeBegin=$('textarea[name="maincodeBegin"]').val();
            const maincodeEnd=$('textarea[name="maincodeEnd"]').val();
            $.ajax({
                url:address+'toolController/update',
                type:'post',
                data:{
                    'id':app.execodeId,
                    'toolname': 'groovy',
                    'autId':this.autId,
                    'maincodeBegin':maincodeBegin,
                    'maincodeEnd':maincodeEnd
                },
                success:function(data){
                    if(data.success){
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