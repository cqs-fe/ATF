$(document).ready(function(e) {

    beice(); //第一级函数
    gnd();
    st();
    templateTable();
    $('select[name="autid"]').change(function() {
        gnd();
        st();
        templateTable();
    })
    $('select[name="transid"]').change(function() {
        st();
        templateTable();
    })
    $('input[class="classname"]').change(function() {
        cs();
    })
});

//被测系统接口
function beice() {
    $.ajax({
        async: false,
        url: "http://10.108.226.152:8080/ATFCloud/autController/selectAll",
        type: "POST",
        success: function(data) {
            var autList = data.obj;
            var str = "";
            for (var i = 0; i < autList.length; i++) {

                str += " <option value='" + autList[i].id + "' >" + autList[i].autName + "</option> ";
            }

            $('select[name="autid"]').html(str);

        }
    });
}

//所属功能点接口
function gnd() {
    var val = $('select[name="autid"]').val();
    $.ajax({
        async: false,
        url: 'http://10.108.226.152:8080/ATFCloud/transactController/showalltransact',
        data: {'autlistselect': val},
        type: "GET",
        success: function (data) {
            var transactList = data.o;
            var str = "";
            for (var i = 0; i < transactList.length; i++) {

                str += " <option id='transOption' value='" + transactList[i].id + "'>" + transactList[i].transname + "</option> ";
            }
            $('select[name="transid"]').html(str);

        }

    });
}

//新增模板接口
function xzmb(){
    var val1=$('option[id="transOption"]').val();
    var val2=$('input[id="scriptName"]').val();
    var val3=$('input[name="description"]').val();
    $.ajax({
        //type: "POST",
        //data:$('#templateAdd').serialize(),
        data:{
            'transId':val1,
            'name':val2,
            'description':val3
        },
        url: 'http://10.108.226.152:8080/ATFCloud/scripttemplateController/insert',
        async: false,
        error: function (request) {
                $('#fail').modal();
        },
        success: function (data) {
            $('table[id="top_table"] td').each(function fun() {
                txt = $(this).text();
                if (val2 == txt) {
                    $('#fail').modal();
                    return false;
                }
            });
                if(txt != val2){
                    var str = "";
                    //接收后台返回的结果
                    //alert("Connection success");
                    $('#success').modal();
                    str = "<tr class='choose'>" + "<td>" + "<input class='index' type='radio' name='radio' onclick='templateTable();' id='checkAll'>" + "</td>" + "<td>" + val2 + "</td>" + "<td>" + val3 + "</td>" + "</tr> ";
                    $('table[id="top_table"]>tbody').append(str);
                }

                if (val2 == "" || val2 == null) {
                    $('#fail').modal();
                }
                if(val3 == "" || val3 == null) {
                    $('#fail').modal();
                }

            }
        })
}

//删除模板接口
function scmb(){
    var val = $(':radio:checked').val();
    $.ajax({
        type: "POST",
        url: 'http://10.108.226.152:8080/ATFCloud/scripttemplateController/delete',
        async:false,
        data:{'id':val},
        error: function () {
            $('#fail').modal();
        },
        success: function () {
            //接收后台返回的结果
            $('#success').modal();
            $('input:radio:checked').parent().parent().remove();
            //var radio = $('table[id="top_table"]>tbody>tr').find(':radio:checked');
            //    // 如果选择框被选中则删除该行;
            //    $('table[id="top_table"]>tbody>tr').remove();
        }
    });
}

//操作项
$("#confirm").click(function(){
    if($("#p_functionWord").hide()){
        $("#p_functionWord").show().css({"position":"relative","left":"-300px","top": "30px;"});
        $("#elementWord").css({"position":"relative","left":"30px","top": "40px;"});
    }
    if($("#elementWord").hide()){
        $("#elementWord").show().css({"position":"relative","left":"30px","top": "40px;"});
        $("#p_functionWord").css({"width":"60px","position":"absolute","left":"50px","top": "-180px;"});
    }
});
//方法接口
function method() {
    var val1 = $('select[name="autid"]').val();
    var val2= $('td input.uiSel',tr).val();
    $.ajax({
        async: false,
        url: 'http://10.108.226.152:8080/ATFCloud/autController/selectMethod',
        data: {'id': val1,
                'classname':val2
        },
        type: "POST",
        success: function (data) {
            var methodList = data.ommethod;
            var str = "";
            for (var i = 0; i < methodList.length; i++) {

                str += " <option value='" + methodList[i].mname + "'>" + methodList[i].mname + "</option> ";
            }
            $('select[name="method"]',tr).html(str);
            cs();

        }

    });
}

//参数接口
function cs(){
    var val1 = $('select[name="autid"]').val();
    var val2= $('td input.uiSel').val();
    var val3=$('select[name="method"]').val();
    var val4=$('input[id="csnew"]').val();
    console.log(val1+","+val2+","+val3);
    $.ajax({
        async: false,
        url: 'http://10.108.226.152:8080/ATFCloud/autController/selectParameterlist',
        data: {'autid': val1,
            'className':val2,
            'methodName':val3
        },
        type: "POST",
        success: function (data) {
            //console.log('data:'+data);
            var jsonparse = JSON.parse(data);
            var str="";
            var b="";
            console.log("jsonparse:"+jsonparse);
            for(var i in jsonparse) {
                str += "<tr>" + "<td>" + jsonparse[i]["Name"]+"<div class='blank'></div>"+"<i class='glyphicon glyphicon-hand-right'  id='para' data-toggle='modal' href='#parameterList'>"+"</i>"+"</td>"+ "</tr>";
                $('table[id="paraList"]',tr).html(str);
                b += "<label class='xinzeng'>" + jsonparse[i]["Name"] + "</label>" + "<input name=''id='csnew'>" + "<br>";
                $("#ParaMeterL").html(b);
            }
            //for (var key in jsonparse[i]) {
            //
            //    b += "<label class='xinzeng'>" + key + "</label>" + "<input value='" + jsonparse[i][key] + "'>" + "<br>";
            //    $("#ParaMeterL").html(b);
            //}
                //b += "<label class='xinzeng'>" + key + "</label>" + "<input value='" + jsonparse[i][key] + "'>" + "<br>";
                //$(".showInfornamt").html(b);
            //    //var v=jsonparse[1];
            //    var b = "";
            //    for (var key in jsonparse) {

                    //b += "<label class='xinzeng'>" + key + "</label>" + "<input value='" + jsonparse[i][key] + "'>" + "<br>";
                    //$(".showInfornamt").html(b);
            //}
            //i=0;i<jsonparse.length;i++
            //var a="";
            //for(var i=0;i<jsonparse.length;i++){
            //    for (var key in jsonparse[1]){
            //        console.log(jsonparse[key]);
            //    }
            //    console.log(jsonparse[1]);
            //    console.log(jsonparse[i]["Name"]);
            //    console.log(jsonparse[i]["Type"]);
            //    console.log(jsonparse[i]);
            //    a = jsonparse[i]["Name"];
            //    console.log(JSON.stringify(jsonparse[i]));
            //}
            //$('input[id="Name"]').val(a);
            //console.log(JSON.parse(data));

        }

    });
}

$("#paraConfirm").click(function(){
    var val4=$('input[id="csnew"]').val();
    $(".blank").html(val4);
});
//根据功能点查询模板接口
function st() {
    var val = $('select[name="transid"]').val();
    $.ajax({
        async: false,
        url: 'http://10.108.226.152:8080/ATFCloud/scripttemplateController/showallscripttemplate',
        data: {'transactid': val},
        type: "POST",
        success: function (data) {
            var templateList = data.o;
            var str = "";
            for (var i = 0; i < templateList.length; i++) {
                str += " <tr class='choose'>"+"<td>" +"<input class='index' type='radio' value='" + templateList[i].id + "'name='radio' onclick='templateTable();' d='checkAll'>"+"</td>"+"<td>"+templateList[i].name+"</td>" +"<td>"+ templateList[i].description+"</td>"+"</tr> ";
            }
            $('table[id="top_table"]>tbody').html(str);

        }

    });
}


//查询模板脚本表格接口
function templateTable() {
    var val1 = $('select[name="autid"]').val();
    var val2 = $(':radio:checked').val();
    $.ajax({
        async: false,
        url: 'http://10.108.226.152:8080/ATFCloud/scripttemplateController/showScripttemplateTable',
        data: {'aut_id': val1,
               'script_id': val2},
        type: "POST",
        success: function (data) {
            var tableList = data.data;
            var str = "";
            var b="";
            for (var i = 0; i < tableList.length; i++) {
                var ii=i+1;
                //for (var j in tableList[i].arguments){
                    str += "<tr class='choose'>" + "<td class='number'>" + "<input class='checkboxes' type='checkbox' name='radio' id='checkAll'>" + "</td>" + "<td>" + ii + "</td>" + "<td>" + "<label class='alignRight'>UI:</label>" + "<input class='uiSel' name='classname' type='text' value='" + tableList[i].operator[1] +"'>" + "<br>" + "<label class='alignRight'>元素:</label>" + "<input class='elementSel' name='classname' type='text'value='" + tableList[i].operator[2] + "'>" +"<br>"+ "<i id='h'  class='glyphicon glyphicon-search icon' data-toggle='modal' href='#addModal' onclick='ee(event);'></i>"+"</td>" + "<td>" + "<select  style='width:200px;' name='method'><option>"+tableList[i].function+"</option></select>"+ "</td>" + "<td>"+"<table id='paraList'>"+"<tr>"+ "<td>" + " Name:" + tableList[i].arguments[0].value +"<i class='glyphicon glyphicon-hand-right' id='para' data-toggle='modal' href='#parameterList' onclick='yy();'>"+"</i>"+"</td>"+"</tr>"+"</table>" + "</td>" +"<td>"+"<i id='5' class='glyphicon glyphicon-plus icon' onclick='addRowByID(this.id)'>"+"</i>"+"</td>"+"</tr>";
                    var argumentsarr =  tableList[i].arguments;
                //for (var j = 0;j<3;j++) {
                //    console.log(j);
                //    b += "<label class='xinzeng'>" + argumentsarr[j].name + "</label>" + "<input value='" + argumentsarr[j].value + "'>" + "<br>";
                //}
                //$("#ParaMeterL").html(b);

                //for(var j in tableList[i].operator) {
                //    str += " <tr class='choose'>" + "<td>" + "<input class='index' type='checkbox' name='radio' id='checkAll'>" + "</td>" + "<td>" + i + "</td>" + "<td>" +tableList[2].operator[j] + "</td>" + "<td>" + tableList[i].function + "</td>" + "<td>" + tableList[i].arguments + "</td>" + "</tr> ";
                //}
            //}

            }

            $('table[id="sort"]>tbody').html(str);

        }

    });
}

function yy() {
    var val1 = $('select[name="autid"]').val();
    var val2 = $(':radio:checked').val();
    $.ajax({
        async: false,
        url: 'http://10.108.226.152:8080/ATFCloud/scripttemplateController/showScripttemplateTable',
        data: {
            'aut_id': val1,
            'script_id': val2
        },
        type: "POST",
        success: function (data) {
            var tableList = data.data;
            var tableListrr = tableList.arguments;
            for (var j in tableList[i].arguments){
                console.log(tableListrr);
            }
            console.log(tableListrr);

        }

    });
}

//页面表格保存的接口
    function tableSave(){
        var a = $(':radio:checked').val();
        var b=$('input[id="uiSel"]').val();
        var c=$('input[id="elementSel"]').val();
        var d=$('select[name="method"]').val();
        var e=$('input[id="showName"]').val();
        var f=$('input[id="showType"]').val();
        var g=$('input[id="showDesc"]').val();
        $.ajax({
            async: false,
            url: 'http://10.108.226.152:8080/ATFCloud/scripttemplateController/scripttemplateTableSave',
            data: {'id': a,
                "content":[
                    ["UI(\"b\").WebElement(\"c\")",d,[e,f,g]]
                ]
            },
            type: "POST",
            error: function (data) {
                $('#fail').modal();
            },
            success: function (data) {
                $('#success').modal();
            }

        });
    }

//点击保存按钮，参数模态框的值显示到页面中
    function csShow(){
        var val1=  $('input[id="Name"]').val();
        var val2= $('input[id="Type"]').val();
        var val3= $('input[id="Desc"]').val();
        var val4= $('input[id="ParameterizeColumn"]').val();
        $('input[id="showName"]').val(val1);
        $('input[id="showType"]').val(val2);
        $('input[id="showDesc"]').val(val3);
        $('input[id="showParameterizeColumn"]').val(val4);
    }

//event.target问题
    function ee(event){
        tr=$(event.target).parent().parent();
    }

function addRowByID(currentRowID){
    //遍历每一行，找到指定id的行的位置i,然后在该行后添加新行
    $.each( $('tr'), function(i, tr){
        if($(this).attr('id')==currentRowID){
            //获取当前行
            var currentRow=$('tr:eq('+i+')');
            //要添加的行的id
            var addRowID=parseInt(currentRowID)+1;
            str = "<tr id ='"+addRowID+"'><td class='number'><input type='checkbox' class='checkboxes' value='1' /></td><td class='index'>"+addRowID+ "</td>"+
            "<td> <label class='alignRight'>"+"UI:"+"</label><input class='uiSel' name='classname' type='text' readonly value=''/> <br> <label class='alignRight'>"+"元素:"+"</label><input class='elementSel' name='classname' type='text' readonly value='' /><i id='h'  class='glyphicon glyphicon-search icon' data-toggle='modal' href='#addModal'onclick='ee(event);'></i></td>"+
            "<td> <select  style='width:200px;' aria-controls='sample_1' name='method' class='glyphicon glyphicon-chevron-down'> </td>"+
            "<td> <div class='showInfornamt'> <table id='paraList'></table> </div> <i  id='href' class='glyphicon glyphicon-search icon'></i> </td>>"+
            "<td><i id='1' class='glyphicon glyphicon-plus icon' onclick='addRowByID(this.id)'></i></td>" +
            "</tr>";
            //当前行之后插入一行
            currentRow.after(str);
        }
    });
}
//添加一行end

//查询表格添加一行
function AddRowByID(currentRowID){
    //遍历每一行，找到指定id的行的位置i,然后在该行后添加新行
    $.each( $('div[id="table"] table[id="sort"] tbody tr'), function(i, tr){
        if($(this).attr('id')==currentRowID){
            //获取当前行
            var currentRow=  $('div[id="table"] table[id="sort"] tbody tr:eq('+i+')');
            //要添加的行的id
            var addRowID=parseInt(currentRowID)+1;
            str = "<tr id ='"+addRowID+"'><td class='number'><input type='checkbox' class='checkboxes' value='1' /></td><td class='index'>"+addRowID+ "</td>"+
                "<td> <label class='alignRight'>"+"UI:"+"</label><input class='uiSel' name='classname' type='text' readonly value=''/> <br> <label class='alignRight'>"+"元素:"+"</label><input class='elementSel' name='classname' type='text' readonly value='' /><i id='h'  class='glyphicon glyphicon-search icon' data-toggle='modal' href='#addModal' onclick='ee(event);'></i></td>"+
                "<td> <select size='1' aria-controls='sample_1' name='method' class='glyphicon glyphicon-chevron-down' ></select> </td>"+
                "<td><div class='showInfornamt'><label class=alignRight'>"+"Name:"+"</label><input id='showName' type='text'/> <br><label class='alignRight'>"+"Type:"+"</label><input id='showType' type='text' /> <br> <label class='alignRight'>"+"Desc:"+"</label><input id='showDesc' type='text' /> <br> </div> <i id='href' class='glyphicon glyphicon-search icon' data-toggle='modal' onclick='cs();' href='#parameterModal'></i> </td>>"+
                "<td><i id='1' class='glyphicon glyphicon-plus icon' onclick='AddRowByID(this.id)'></i></td>" +
                "</tr>";
            //当前行之后插入一行
            currentRow.after(str);
        }
    });
}

//上移下移begin
$('#up').click(function ()
{
    var insert = $('table tr :checkbox:checked').closest('tr');
    var tr = insert.prev('tr');
    tr.before(insert);
});
$('#down').click(function ()
{
    var insert = $('table tr :checkbox:checked').closest('tr');
    var tr = insert.next('tr');
    tr.after(insert);
});
//上移下移end

//拖拽begin
var fixHelperModified = function (e, tr) {
        var $originals = tr.children();
        var $helper = tr.clone();
        $helper.children().each(function (index) {
            $(this).width($originals.eq(index).width())
        });
        return $helper;
    },
    updateIndex = function (e, ui) {
        $('td.index', ui.item.parent()).each(function (i) {
            $(this).html(i + 1);

        });
    };
$("#sort tbody").sortable({
    helper: fixHelperModified,
    stop: updateIndex
}).disableSelection();
//拖拽end

//新增模板begin
$("#template_add").click(function () {
    //var _len = $("#top_table tr").length+1;
    //$("#top_table").append("<tr class='choose' align='center'>"
    //    + "<td class='number' class='index'><input type='radio' id='checkAll'</td>"
    //    + "<td class='number'>脚本" + _len + "</td>"
    //    + "<td>简单描述</td>"
    //    + "</tr>");
});
//新增模板end

//删除模板begin
            $("#template_remove").click(function() {
                $("input[id='checkAll']:checked").each(function() { // 遍历选中的checkbox
                    n = $(this).parents("tr").index()+1;  // 获取checkbox所在行的顺序
                    $("table#top_table").find("tr:eq("+n+")").remove();
                });
            });
//删除模板end

//下方表格删除begin
$("#script_remove").click(function() {
    $("input[class='checkboxes']:checked").each(function() { // 遍历选中的checkbox
        n = $(this).parents("tr").index()+1;  // 获取checkbox所在行的顺序
        $("table#sort").find("tr:eq("+n+")").remove();
    });
});
//下方表格删除end

//变色
$("#top_table").delegate("tr","click",function(){
    $(this).addClass("selected").siblings().removeClass("selected").end().find(":radio").attr("checked",true);
});



    //参数begin
   /* $('#temp').popover(
        {
            trigger: 'click', //触发方式
            template: '', //你自定义的模板
            title: "标题",//设置 弹出框 的标题
            html: true, // 为true的话，data-content里就能放html代码了
            content: "",//这里可以直接写字符串，也可以 是一个函数，该函数返回一个字符串；
        }
    );
    $(function () {
        $('[data-toggle="popover"]').each(function () {
            var element = $(this);
            var id = element.attr('id');
            var txt = element.html();
            element.popover({
                trigger: 'manual',
                placement: 'bottom', //top, bottom, left or right
                title: txt,
                html: 'true',
                content: ContentMethod(txt),

            }).on("mouseenter", function () {
                var _this = this;
                $(this).popover("show");
                $(this).siblings(".popover").on("mouseleave", function () {
                    $(_this).popover('hide');
                });
            }).on("mouseleave", function () {
                var _this = this;
                setTimeout(function () {
                    if (!$(".popover:hover").length) {
                        $(_this).popover("hide")
                    }
                }, 100);
            });
        });
    });
    function ContentMethod(txt) {
        return '<table class="table table-bordered"><tr><th>序号</th><th>名称</th><th>值</th></tr>' +
            '<tr><td>1</td><td><input type="text" style="width: 70px;"> </td><td><input type="text" style="width: 70px;"></td></tr>' +
            '<tr><td>2</td><td><input type="text" style="width: 70px;"></td><td><input type="text" style="width: 70px;"></td></tr>' +
            '</table>' +
            '<input style="float:right;" type="submit" value="确定">';
    }*/

//参数end



