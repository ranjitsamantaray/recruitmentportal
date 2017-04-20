"use strict";
var http_1 = require('@angular/http');
exports.contentHeaders = new http_1.Headers();
exports.contentHeaders.append('Accept', 'application/json');
exports.contentHeaders.append('Content-Type', 'application/json');
if (JSON.parse(localStorage.getItem('id_token')).token) {
    var token = JSON.parse(localStorage.getItem('id_token')).token;
    exports.contentHeaders.append('acc-token', "" + token);
}
//# sourceMappingURL=header.js.map