import {Component} from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {Locale, LocaleService, LocalizationService, TranslatePipe} from 'angular2localization/angular2localization';
import {StaticComponent} from "./components/static.component";
//import {ConsonantComponent} from "./components/consonant.component";
import {IPAConsonantComponent} from "./components/ipaconsonant.component";

declare var System: any;

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        LocaleService,
        LocalizationService
    ],
    pipes: [TranslatePipe]
})
@RouteConfig([
    {
        path: '/index',
        name: 'Index',
        component: StaticComponent,
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
        component: IPAConsonantComponent
    },
    //new AsyncRoute({
    //    path: "/sub",
    //    name: "Sub",
    //    loader: () => System.import("app/components/mvc.component").then(c => c["MvcComponent"])
    //}),
    //new AsyncRoute({
    //    path: "/numbers",
    //    name: "Numbers",
    //    loader: () => System.import("app/components/api.component").then(c => c["ApiComponent"])
    //})
])
export class AppComponent extends Locale {

    constructor(public locale: LocaleService, public localization: LocalizationService) {
        super(locale, localization);

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
}