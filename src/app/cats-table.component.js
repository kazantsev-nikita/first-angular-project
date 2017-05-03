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
var sort_1 = require('./sort');
require('rxjs/add/operator/switchMap');
var CatsTableComponent = (function () {
    function CatsTableComponent(router, catService, route) {
        this.router = router;
        this.catService = catService;
        this.route = route;
        this.sort = new sort_1.Sort("IsOnline", true);
        this.model = {};
    }
    CatsTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.catService.getAllCats(this.sort).then(function (cats) { return _this.cats = cats; });
    };
    CatsTableComponent.prototype.showUser = function (cat) {
        this.selectedCat = cat;
    };
    CatsTableComponent.prototype.search = function () {
        var _this = this;
        if (this.model.value !== undefined && this.model.value.trim() !== "")
            this.catService.search(this.model.value, this.sort).then(function (cats) { return _this.cats = cats; });
        else
            this.catService.getAllCats(this.sort).then(function (cats) { return _this.cats = cats; });
    };
    CatsTableComponent.prototype.changeSorting = function (columnName) {
        var sort = this.sort;
        if (sort.column == columnName) {
            sort.descending = !sort.descending;
        }
        else {
            sort.column = columnName;
            sort.descending = false;
        }
        this.search();
    };
    CatsTableComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/cat', this.selectedCat.id]);
    };
    CatsTableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './cats-table.component.html',
            styleUrls: ['cats-table.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, cat_service_1.CatService, router_1.ActivatedRoute])
    ], CatsTableComponent);
    return CatsTableComponent;
}());
exports.CatsTableComponent = CatsTableComponent;
//# sourceMappingURL=cats-table.component.js.map