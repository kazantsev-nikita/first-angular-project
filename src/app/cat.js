"use strict";
var Cat = (function () {
    function Cat(username, password, id, name, isOnline, birthDate, photoUrl, interests) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.name = name;
        this.isOnline = isOnline;
        this.birthDate = birthDate;
        this.photoUrl = photoUrl;
        this.interests = interests;
    }
    return Cat;
}());
exports.Cat = Cat;
//# sourceMappingURL=cat.js.map