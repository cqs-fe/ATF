var Script = function () {

        // begin first table
        $('#sample_1').dataTable({
            // "ajax":"http://10.108.226.152:8080/ATFCloud/autController/selectAll",
            // "columns":[
            //     {targets:0,data:null,defaultContent: "<input type='checkbox' class='checkboxes' value='1'/>"},
            //     { "data": "id" },
            //     { "data": "autCode" },
            //     { "data": "autName" },
            //     { "data": "version" },
            //     { "data": "autType" },
            //     { "data": "maincodeBegin" }
            // ],
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "展示条目 _MENU_",
                "oPaginate": {
                    "sPrevious": "上一页",
                    "sNext": "下一页"
                }
            },
            "aoColumnDefs": [{
                'bSortable': false,
                'aTargets': [0]
            }],
        
        });

        jQuery('#sample_1 .group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).attr("checked", true);
                } else {
                    $(this).attr("checked", false);
                }
            });
            jQuery.uniform.update(set);
        });

        jQuery('#sample_1_wrapper .dataTables_filter input').addClass("form-control"); // modify table search input
        jQuery('#sample_1_wrapper .dataTables_length select').addClass("form-control"); // modify table per page dropdown

}();