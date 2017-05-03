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
var router_1 = require('@angular/router');
var cat_service_1 = require('./cat.service');
require('rxjs/add/operator/switchMap');
var FriendsListComponent = (function () {
    function FriendsListComponent(router, catService, route) {
        this.router = router;
        this.catService = catService;
        this.route = route;
    }
    FriendsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.catService.getFriends(+params['id']); })
            .subscribe(function (friends) { return _this.friends = friends; });
    };
    FriendsListComponent.prototype.showUser = function (cat) {
        this.selectedCat = cat;
    };
    FriendsListComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/cat', this.selectedCat.id]);
    };
    FriendsListComponent.prototype.goToTable = function () {
        this.router.navigate(['/table']);
    };
    FriendsListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'friends-list',
            templateUrl: './friends-list.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, cat_service_1.CatService, router_1.ActivatedRoute])
    ], FriendsListComponent);
    return FriendsListComponent;
}());
exports.FriendsListComponent = FriendsListComponent;
//# sourceMappingURL=friends-list.component.js.map