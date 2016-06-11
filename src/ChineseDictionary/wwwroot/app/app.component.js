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
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var angular2localization_1 = require('angular2localization/angular2localization');
var static_component_1 = require("./components/static.component");
//import {ConsonantComponent} from "./components/consonant.component";
var ipaconsonant_component_1 = require("./components/ipaconsonant.component");
var AppComponent = (function (_super) {
    __extends(AppComponent, _super);
    function AppComponent(locale, localization) {
        _super.call(this, locale, localization);
        this.locale = locale;
        this.localization = localization;
        // Adds a new language (ISO 639 two-letter or three-letter code).
        this.locale.addLanguage("zh");
        // Add a new language here.
        // Required: default language, country (ISO 3166 two-letter, uppercase code) and expiry (No days). If the expiry is omitted, the cookie becomes a session cookie.
        this.locale.definePreferredLocale("zh", 'CN', 30);
        // Optional: default currency (ISO 4217 three-letter code).
        this.locale.definePreferredCurrency("CNY");
        this.localization.translationProvider("./resources/locale.");
        this.localization.updateTranslation(); // Need to update the translation.
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                angular2localization_1.LocaleService,
                angular2localization_1.LocalizationService
            ],
            pipes: [angular2localization_1.TranslatePipe]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/index',
                name: 'Index',
                component: static_component_1.StaticComponent,
                useAsDefault: true
            },
            //{
            //    path: '/consonant',
            //    name: 'Consonant',
            //    component: ConsonantComponent
            //},
            {
                path: '/ipaconsonant',
                name: 'IPAConsonant',
                component: ipaconsonant_component_1.IPAConsonantComponent
            },
        ]), 
        __metadata('design:paramtypes', [angular2localization_1.LocaleService, angular2localization_1.LocalizationService])
    ], AppComponent);
    return AppComponent;
}(angular2localization_1.Locale));
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map