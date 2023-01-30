jQuery(function($) {
    "use strict";

    $("#owner-data-table").DataTable({
        processing: true,
        serverSide: true,
        searching: false,
        language: {
            "url": g_baseURL + "/libs/datatables/ja.json"
        },
        ajax: {
            url: g_baseURL + "/admin/owner/datatable",
            type: 'get',
            error: function (jqXHR, textStatus, errorThrown) {
            }
        },
        columnDefs: [
            {
                "targets": 3,
                "render": function ( data, type, row, meta ) {
                    return '<a href="' + g_baseURL + '/admin/owner/' + row.id + '">' + data + '</a>';
                }
            },
            {
                "targets": 5,
                "render": function ( data, type, row, meta ) {
                    return data + (row.email_verified_at ? '<i class="fas fa-lg fa-fw m-r-10 fa-check"></i>' : ' ');
                }
            },
            {
                "targets": 6,
                "orderable": true,
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
                "targets": 7,
                "render": function ( data, type, row, meta ) {
                    return '<span class="badge badge-' + g_colValues[data] + '">' + g_strValues[data] +'</span>'
                }
            },
        ],
        columns: [
            {data: 'id', className: "text-center"},
            {data: 'company', className: "text-center"},
            {data: 'name', className: "text-center"},
            {data: 'nick_name', className: "text-center"},
            {data: 'phone', className: "text-center"},
            {data: 'email', className: "text-center"},
            {data: 'user_status', className: "text-center"},
            {data: 'verified_status', className: "text-center"},
        ]
    });
});
