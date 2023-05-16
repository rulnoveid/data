/* Formatting function for row details - modify as you need */
function format(d) {
    // `d` is the original data object for the row
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="/* padding-left:50px; */">' +
        '<tr>' +
        '<td>Codename:</td>' +
        '<td>' + d.codename + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Method:</td>' +
        '<td>' + d.method + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Branch:</td>' +
        '<td>' + d.branch + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Size:</td>' +
        '<td>' + d.size + '</td>' +
        '</tr>' +
		'<tr>' +
        '<td>Link:</td>' +
        '<td> <a href=" ' + d.link + ' " target="_blank">Download ' + d.method + '</a></td>' +
        '</tr>' +
        '</table>'
    );
}
 
$(document).ready(function () {
    var table = $('#example').DataTable({
        ajax: 'https://cdn.inputekno.com/data/latestv2.json',
        columns: [
            { data: 'name' },
            { data: 'version' },
            { data: 'android' },
            { data: 'date',
              render: function (data, type, row, meta) {
                  return moment.utc(data).local().format('DD/MM/YYYY');
              }
            },
            {
                className: 'dtr-control',
                orderable: false,
                target: -2,
                data: null,
                defaultContent: '',
            },
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
        ],
        order: [[4, 'asc']],
        responsive: {
            details: {
                type: 'column',
                target: -2
            }
        },
        columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: -1 }
        ]
    });
 
    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.dt-control', function () {
        var tr = $(this).closest('tr');

        var row = table.row(tr);
 
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');

        } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');

        }
    });
});