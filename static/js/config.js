var address = "http://10.108.223.23:8080/ATFCloud/";
var address2 = 'http://10.108.223.23:8080/atfcloud1.0a/';
// var address = "/";
// var address2 = "/";
function getJson(data) {
    let o = {};
    data.split('&').forEach((item) => {
        let a = item.split('=');
        o[a[0]] = a[1];
    });
    return JSON.stringify(o);
}
$.ajax2 = function (opt) {
    if (opt.url.startsWith(address2)) {
        opt.contentType = 'application/json';
        opt.dataType = 'json';
        opt.type = 'post'
        if (typeof opt.data === 'object') {
            opt.data = JSON.stringify(opt.data);
        }
    }
    $.ajax(opt);
};

