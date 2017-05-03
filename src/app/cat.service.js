"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/toPromise');
var CatService = (function () {
    //private dbUri = ''; 
    function CatService(http) {
        this.http = http;
        this.jsonUrl = 'app/cats.json';
    }
    CatService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    CatService.prototype.getFriends = function (id) {
        return this.http.get(this.jsonUrl)
            .toPromise()
            .then(function (response) {
            var friends = [];
            var data = response.json() && response.json().data;
            data.forEach(function (item) {
                if (item.id !== id) {
                    friends.push(item);
                }
            });
            return friends;
        })
            .catch(this.handleError);
    };
    CatService.prototype.getAllCats = function (sort) {
        var _this = this;
        return this.http.get(this.jsonUrl)
            .toPromise()
            .then(function (response) {
            var data = response.json() && response.json().data;
            data = _this.sortData(data, sort);
            return data;
        })
            .catch(this.handleError);
    };
    CatService.prototype.getById = function (id) {
        return this.http.get(this.jsonUrl)
            .toPromise()
            .then(function (response) {
            var cat;
            var data = response.json() && response.json().data;
            data.forEach(function (item) {
                var end = true;
                if (item.id == id) {
                    cat = item;
                    end = false;
                }
                return end;
            });
            return cat;
        })
            .catch(this.handleError);
    };
    CatService.prototype.search = function (value, sort) {
        var _this = this;
        return this.http.get(this.jsonUrl)
            .toPromise()
            .then(function (response) {
            var friends = [];
            var data = response.json() && response.json().data;
            data.forEach(function (item) {
                var interests = item.interests;
                var containsInterests = false;
                if (interests.length > 0) {
                    interests.map(function (x) {
                        if (x.indexOf(value) > -1)
                            containsInterests = true;
                    });
                }
                if (item.name.indexOf(value) > -1 ||
                    item.birthDate.indexOf(value) > -1 ||
                    containsInterests) {
                    friends.push(item);
                }
            });
            friends = _this.sortData(friends, sort);
            return friends;
        })
            .catch(this.handleError);
    };
    CatService.prototype.sortData = function (array, sort) {
        return array.sort(function (x, y) {
            switch (sort.column) {
                case "IsOnline":
                    if (sort.descending)
                        return (x.isOnline === y.isOnline) ? 0 : x.isOnline ? -1 : 1;
                    else
                        return (x.isOnline === y.isOnline) ? 0 : y.isOnline ? -1 : 1;
                case "Name":
                    var nameX = x.name.toLowerCase(), nameY = y.name.toLowerCase();
                    if (sort.descending)
                        return (nameX < nameY) ? -1 : ((nameX > nameY) ? 1 : 0);
                    else
                        return (nameX > nameY) ? 0 : ((nameX < nameY) ? 1 : -1);
                case "Birthdate":
                    var birthDateX = x.birthDate != "" ? new Date(x.birthDate) : (sort.descending ? new Date(1970, 0, 1) : new Date()), birthDateY = y.birthDate != "" ? new Date(y.birthDate) : (sort.descending ? new Date(1970, 0, 1) : new Date());
                    if (sort.descending)
                        return (birthDateX < birthDateY) ? 1 : ((birthDateX > birthDateY) ? -1 : 0);
                    else
                        return (birthDateX > birthDateY) ? 1 : ((birthDateX < birthDateY) ? -1 : 0);
            }
        });
    };
    CatService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CatService);
    return CatService;
}());
exports.CatService = CatService;
//# sourceMappingURL=cat.service.js.map