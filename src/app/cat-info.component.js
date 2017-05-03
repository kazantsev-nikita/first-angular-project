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
var common_1 = require('@angular/common');
var cat_service_1 = require('./cat.service');
require('rxjs/add/operator/switchMap');
var CatInfoComponent = (function () {
    function CatInfoComponent(catService, route, location) {
        this.catService = catService;
        this.route = route;
        this.location = location;
    }
    CatInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.catService.getById(params['id']); })
            .subscribe(function (cat) { return _this.cat = cat; });
    };
    CatInfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cat-info',
            templateUrl: './cat-info.component.html'
        }), 
        __metadata('design:paramtypes', [cat_service_1.CatService, router_1.ActivatedRoute, common_1.Location])
    ], CatInfoComponent);
    return CatInfoComponent;
}());
exports.CatInfoComponent = CatInfoComponent;
//# sourceMappingURL=cat-info.component.js.map