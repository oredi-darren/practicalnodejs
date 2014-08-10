/**
 * Created by darren on 8/11/14.
 */
$.ajaxSetup({
    xhrFields: { withCredentials: true },
    error: function (xhr, status, error) {
        $('.alert').removeClass('hidden');
        $('.alert').html('Status: ' + status + ', error: ' + error);
    }
});

var findTr = function (event) {
    var target = event.srcElement || event.target;
    var $target = $(target);
    var $tr = $target.parents('tr');
    return $tr;
};