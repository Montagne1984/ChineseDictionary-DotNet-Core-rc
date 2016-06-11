"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var object_component_1 = require("./object.component");
var primeng_1 = require("primeng/primeng");
var ipaconsonant_1 = require("../domain/ipaconsonant");
var angular2localization_1 = require('angular2localization/angular2localization');
var IPAConsonantComponent = (function (_super) {
    __extends(IPAConsonantComponent, _super);
    function IPAConsonantComponent(locale, localization) {
        _super.call(this, locale, localization);
        this.locale = locale;
        this.localization = localization;
        this.item = new ipaconsonant_1.IPAConsonant();
    }
    IPAConsonantComponent = __decorate([
        core_1.Component({
            selector: "ipaconsonant",
            templateUrl: "app/components/ipaconsonant.html",
            directives: [primeng_1.Button, primeng_1.Dialog, primeng_1.DataTable, primeng_1.Column, primeng_1.Header, primeng_1.Footer, primeng_1.InputText],
            //providers: [IPAConsonantService]
            providers: [
                angular2localization_1.LocaleService,
                angular2localization_1.LocalizationService
            ],
            pipes: [angular2localization_1.TranslatePipe]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2localization_1.LocaleService, angular2localization_1.LocalizationService])
    ], IPAConsonantComponent);
    return IPAConsonantComponent;
}(object_component_1.ObjectComponent));
exports.IPAConsonantComponent = IPAConsonantComponent;
var IPAConsonantService = (function () {
    function IPAConsonantService() {
    }
    IPAConsonantService.prototype.get = function () {
        return [];
    };
    return IPAConsonantService;
}());
exports.IPAConsonantService = IPAConsonantService;
//# sourceMappingURL=ipaconsonant.component.js.map