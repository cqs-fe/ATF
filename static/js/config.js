var address = "http://10.108.223.23:8080/ATFCloud/";
var address2 = ' http://10.108.223.23:8080/atfcloud1.0a/';
// var address = "/";
// var address = "/";
function getJson(data) {
    let o = {};
    data.split('&').forEach((item) => {
        let a = item.split('=');
        o[a[0]] = a[1];
    });
    return JSON.stringify(o);
}
