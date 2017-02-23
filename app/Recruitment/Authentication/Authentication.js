"use strict";
var Authentication = (function () {
    function Authentication(id, email, password, authLevel) {
        this.ID = id;
        this.Email = email;
        this.Password = password;
        this.AuthLevel = authLevel;
    }
    return Authentication;
}());
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map