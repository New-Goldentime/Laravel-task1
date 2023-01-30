jQuery(function($) {
    "use strict";

    function initDataTable(userType, status) {
        let url = '?type=' + userType + '&status=' + status;

        $("#comments-table").DataTable({
            processing: true,
            serverSide: true,
            searching: false,
            language: {
                "url": g_baseURL + "/libs/datatables/ja.json"
            },
            ajax: {
                url: g_baseURL + "/admin/comments/datatable" + url,
                type: 'get',
                error: function (jqXHR, textStatus, errorThrown) {
                }
            },
            columnDefs: [
                {
                    "targets": 4,
                    "render": function ( data, type, row, meta ) {
                        return '<div class="btn-group" id="btn-change-status-' + row.id + '">\n' +
                            '<a href="#" class="btn btn-' + g_colValues[data] + ' dropdown-toggle" data-toggle="dropdown"></a>\n' +
                            '<a href="#" class="btn btn-' + g_colValues[data] + ' disabled">' + g_strValues[data] + '</a>\n' +
                            '<ul class="dropdown-menu pull-right">\n' +
                            '<li><a href="javascript:onChangeStatus(' + row.id + ', ' + '2)">承認</a></li>\n' +
                            '<li><a href="javascript:onChangeStatus(' + row.id + ', ' + '3)">保留</a></li>\n' +
                            '</ul>\n' +
                            '</div>';
                    }
                },
                {
                    "targets": 2,
                    "render": function ( data, type, row, meta ) {
                        let d = new Date(row.created_at);
                        let dateString = d.getFullYear() + '年' + d.getMonth() + '月' + d.getDay() + '日 '
                            + d.getHours() + ':' +  d.getMinutes() + 'に投稿';
                        return '<p>' + dateString + '</p>' + '<p>' + data.replace(/\n/g, '<br>') + '</p>';
                    }
                },
            ],
            columns: [
                {data: 'id', className: "text-center"},
                {data: 'company', className: "text-center"},
                {data: 'content', className: "text-center"},
                {data: 'reviewedCompany', className: "text-center"},
                {data: 'verified_status', className: "text-center"},
            ]
        });
    }

    initDataTable(1, 4);

    $("#select-user-type").on('change', function() {
        let table = $('#comments-table').DataTable();
        table.clear().destroy();

        $(".nav-items a:eq(0)").trigger("click");
    });

    function bindTabs(idx) {
        $(".nav-items a:eq(" + idx + ")").on("click", function() {
            let table = $('#comments-table').DataTable();
            let status = (idx == 0 ? 4 : idx);
            table.clear().destroy();

            currentTab = idx;

            initDataTable($("#select-user-type").val(), status);
        });
    }

    bindTabs(0);
    bindTabs(1);
    bindTabs(2);
    bindTabs(3);
});
