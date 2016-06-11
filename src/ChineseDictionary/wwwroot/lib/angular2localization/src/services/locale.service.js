/**
 * ANGULAR 2 LOCALIZATION
 * An Angular 2 library to translate messages, dates and numbers.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular2localization
 */
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
/**
 * LocaleService class.
 * Defines language, default locale & currency.
 *
 * Instantiate this class only once in the route component in order to access the data of location from anywhere in the application:
 *
 * FIRST SCENARIO - Dates & numbers.
 *
 * import {LocaleService} from 'angular2localization/angular2localization';
 *
 * @Component({
 *     selector: 'app-component',
 *     ...
 *     providers: [LocaleService] // Inherited by all descendants.
 * })
 *
 * export class AppComponent {
 *
 *     constructor(public locale: LocaleService) {
 *
 *         // Required: default language (ISO 639 two-letter or three-letter code) and country (ISO 3166 two-letter, uppercase code).
 *         this.locale.definePreferredLocale('en', 'US');
 *
 *         // Optional: default currency (ISO 4217 three-letter code).
 *         this.locale.definePreferredCurrency('USD');
 *
 *      }
 *
 * }
 *
 * SECOND SCENARIO - Messages.
 *
 * import {LocaleService, LocalizationService} from 'angular2localization/angular2localization';
 *
 * @Component({
 *     selector: 'app-component',
 *     ...
 *     providers: [LocaleService, LocalizationService] // Inherited by all descendants.
 * })
 *
 * export class AppComponent {
 *
 *     constructor(public locale: LocaleService, public localization: LocalizationService) {
 *
 *         // Adds a new language (ISO 639 two-letter or three-letter code).
 *         this.locale.addLanguage('en');
 *         // Add a new language here.
 *
 *         // Required: default language and expiry (No days). If the expiry is omitted, the cookie becomes a session cookie.
 *         this.locale.definePreferredLanguage('en', 30);
 *
 *     }
 *
 * }
 *
 * THIRD SCENARIO - Messages, dates & numbers.
 *
 * import {LocaleService, LocalizationService} from 'angular2localization/angular2localization';
 *
 * @Component({
 *     selector: 'app-component',
 *     ...
 *     providers: [LocaleService, LocalizationService] // Inherited by all descendants.
 * })
 *
 * export class AppComponent {
 *
 *     constructor(public locale: LocaleService, public localization: LocalizationService) {
 *
 *         // Adds a new language (ISO 639 two-letter or three-letter code).
 *         this.locale.addLanguage('en');
 *         // Add a new language here.
 *
 *         // Required: default language, country (ISO 3166 two-letter, uppercase code) and expiry (No days). If the expiry is omitted, the cookie becomes a session cookie.
 *         this.locale.definePreferredLocale('en', 'US', 30);
 *
 *         // Optional: default currency (ISO 4217 three-letter code).
 *         this.locale.definePreferredCurrency('USD');
 *
 *     }
 *
 * }
 *
 * Changing language.
 *
 * To change language at runtime, call the following method:
 *
 * this.locale.setCurrentLanguage(language);
 *
 * where 'language' is the two-letter or three-letter code of the new language (ISO 639).
 *
 *
 * Changing locale.
 *
 * To change locale at runtime, call the following method:
 *
 * this.locale.setCurrentLocale(language, country);
 *
 * where 'language' is the two-letter or three-letter code of the new language (ISO 639)
 * and 'country' is the two-letter, uppercase code of the new country (ISO 3166).
 *
 *
 * Changing currency.
 *
 * To change currency at runtime, call the following method:
 *
 * this.locale.setCurrentCurrency(currency);
 *
 * where 'currency' is the three-letter code of the new currency (ISO 4217).
 *
 * @author Roberto Simonetti
 */
var LocaleService = (function () {
    function LocaleService() {
        /**
         * Output for event current language code changed.
         */
        this.languageCodeChanged = new core_1.EventEmitter();
        /**
         * Output for event current country code changed.
         */
        this.countryCodeChanged = new core_1.EventEmitter();
        /**
         * Output for event current currency code changed.
         */
        this.currencyCodeChanged = new core_1.EventEmitter();
        /**
         * Output for event script code changed.
         */
        this.scriptCodeChanged = new core_1.EventEmitter();
        /**
         * Output for event numbering system changed.
         */
        this.numberingSystemChanged = new core_1.EventEmitter();
        /**
         * Output for event calendar changed.
         */
        this.calendarChanged = new core_1.EventEmitter();
        /**
         * The available language codes.
         */
        this.languageCodes = [];
        /**
         * Enable/disable cookie.
         */
        this.enableCookie = false;
        this.languageCode = "";
        this.countryCode = "";
        this.currencyCode = "";
        this.defaultLocale = "";
        this.scriptCode = "";
        this.numberingSystem = "";
        this.calendar = "";
        // Counts the reference to the service.
        LocaleService.referenceCounter++;
        // Enables the cookies for the first instance of the service (see issue #11).
        if (LocaleService.referenceCounter == 1) {
            this.enableCookie = true;
        }
    }
    /**
     * Adds a new language.
     *
     * @param language The two-letter or three-letter code of the new language
     */
    LocaleService.prototype.addLanguage = function (language) {
        this.languageCodes.push(language);
    };
    /**
     * Defines the preferred language.
     * Selects the current language of the browser if it has been added, else the default language.
     *
     * @param defaultLanguage The two-letter or three-letter code of the default language
     * @param expiry Number of days on the expiry. If omitted, the cookie becomes a session cookie
     */
    LocaleService.prototype.definePreferredLanguage = function (defaultLanguage, expiry) {
        this.expiry = expiry;
        // Parses the cookie "locale" to extract the codes.
        this.parseCookie("locale");
        if (this.languageCode == "") {
            // Gets the current language of the browser or the default language.
            var browserLanguage = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage;
            var index = browserLanguage.indexOf('-');
            if (index != -1) {
                browserLanguage = browserLanguage.substring(0, index); // Gets the language code.
            }
            if (this.languageCodes.length > 0 && this.languageCodes.indexOf(browserLanguage) != -1) {
                this.languageCode = browserLanguage;
            }
            else {
                this.languageCode = defaultLanguage;
            }
        }
        // Sets the default locale.
        this.setDefaultLocale();
    };
    /**
     * Defines preferred languange and country, regardless of the browser language.
     *
     * @param defaultLanguage The two-letter or three-letter code of the default language
     * @param defaultCountry The two-letter, uppercase code of the default country
     * @param expiry Number of days on the expiry. If omitted, the cookie becomes a session cookie
     * @param script The optional four-letter script code
     * @param numberingSystem The optional numbering system to be used
     * @param calendar The optional calendar to be used
     */
    LocaleService.prototype.definePreferredLocale = function (defaultLanguage, defaultCountry, expiry, script, numberingSystem, calendar) {
        if (script === void 0) { script = ""; }
        if (numberingSystem === void 0) { numberingSystem = ""; }
        if (calendar === void 0) { calendar = ""; }
        this.expiry = expiry;
        // Parses the cookie "locale" to extract the codes & the extension.
        this.parseCookie("locale");
        if (this.languageCode == "" || this.countryCode == "") {
            this.languageCode = defaultLanguage;
            this.countryCode = defaultCountry;
            this.scriptCode = script;
            this.numberingSystem = numberingSystem;
            this.calendar = calendar;
        }
        // Sets the default locale.
        this.setDefaultLocale();
    };
    /**
     * Defines the preferred currency.
     *
     * @param defaultCurrency The three-letter code of the default currency
     */
    LocaleService.prototype.definePreferredCurrency = function (defaultCurrency) {
        // Parses the cookie "currency" to extract the code.
        this.parseCookie("currency");
        if (this.currencyCode == "") {
            this.currencyCode = defaultCurrency;
        }
        // Sets the cookie "currency".
        if (this.enableCookie == true && this.languageCodes.length > 0) {
            this.setCookie("currency", this.currencyCode, this.expiry);
        }
    };
    /**
     * Gets the current language.
     *
     * @return The two-letter or three-letter code of the current language
     */
    LocaleService.prototype.getCurrentLanguage = function () {
        return this.languageCode;
    };
    /**
     * Gets the current country.
     *
     * @return The two-letter, uppercase code of the current country
     */
    LocaleService.prototype.getCurrentCountry = function () {
        return this.countryCode;
    };
    /**
     * Gets the current currency.
     *
     * @return The three-letter code of the current currency
     */
    LocaleService.prototype.getCurrentCurrency = function () {
        return this.currencyCode;
    };
    /**
     * Gets the script.
     *
     * @return The four-letter code of the script
     */
    LocaleService.prototype.getScript = function () {
        return this.scriptCode;
    };
    /**
     * Gets the numbering system.
     *
     * @return The numbering system
     */
    LocaleService.prototype.getNumberingSystem = function () {
        return this.numberingSystem;
    };
    /**
     * Gets the calendar.
     *
     * @return The calendar
     */
    LocaleService.prototype.getCalendar = function () {
        return this.calendar;
    };
    /**
     * Sets the current language.
     *
     * @param language The two-letter or three-letter code of the new language
     */
    LocaleService.prototype.setCurrentLanguage = function (language) {
        // Checks if the language has changed.
        if (this.languageCode != language) {
            // Assigns the value & sends an event.
            this.languageCode = language;
            this.languageCodeChanged.emit(language);
            // Sets the default locale.
            this.setDefaultLocale();
        }
    };
    /**
     * Sets the current locale.
     *
     * @param language The two-letter or three-letter code of the new language
     * @param country The two-letter, uppercase code of the new country
     * @param script The optional four-letter script code
     * @param numberingSystem The optional numbering system to be used
     * @param calendar The optional calendar to be used
     */
    LocaleService.prototype.setCurrentLocale = function (language, country, script, numberingSystem, calendar) {
        if (script === void 0) { script = ""; }
        if (numberingSystem === void 0) { numberingSystem = ""; }
        if (calendar === void 0) { calendar = ""; }
        // Checks if language, country, script or extension have changed.
        if (this.languageCode != language || this.countryCode != country || this.scriptCode != script || this.numberingSystem != numberingSystem || this.calendar != calendar) {
            // Assigns the values & sends the events.
            if (this.languageCode != language) {
                this.languageCode = language;
                this.languageCodeChanged.emit(language);
            }
            if (this.countryCode != country) {
                this.countryCode = country;
                this.countryCodeChanged.emit(country);
            }
            if (this.scriptCode != script) {
                this.scriptCode = script;
                this.scriptCodeChanged.emit(script);
            }
            if (this.numberingSystem != numberingSystem) {
                this.numberingSystem = numberingSystem;
                this.numberingSystemChanged.emit(numberingSystem);
            }
            if (this.calendar != calendar) {
                this.calendar = calendar;
                this.calendarChanged.emit(calendar);
            }
            // Sets the default locale.
            this.setDefaultLocale();
        }
    };
    /**
     * Sets the current currency.
     *
     * @param currency The three-letter code of the new currency
     */
    LocaleService.prototype.setCurrentCurrency = function (currency) {
        // Checks if the currency has changed.
        if (this.currencyCode != currency) {
            // Assigns the value & sends an event.
            this.currencyCode = currency;
            this.currencyCodeChanged.emit(currency);
            // Sets the cookie "currency".
            if (this.enableCookie == true && this.languageCodes.length > 0) {
                this.setCookie("currency", this.currencyCode, this.expiry);
            }
        }
    };
    /**
     * Gets the default locale.
     *
     * @return The default locale
     */
    LocaleService.prototype.getDefaultLocale = function () {
        return this.defaultLocale;
    };
    /**
     * Builds the default locale.
     */
    LocaleService.prototype.setDefaultLocale = function () {
        this.defaultLocale = this.languageCode;
        this.defaultLocale += this.scriptCode != "" ? "-" + this.scriptCode : "";
        this.defaultLocale += this.countryCode != "" ? "-" + this.countryCode : "";
        // Adds the 'u' (Unicode) extension.
        this.defaultLocale += this.numberingSystem != "" || this.calendar != "" ? "-u" : "";
        // Adds numbering system.
        this.defaultLocale += this.numberingSystem != "" ? "-nu-" + this.numberingSystem : "";
        // Adds calendar.
        this.defaultLocale += this.calendar != "" ? "-ca-" + this.calendar : "";
        // Sets the cookie "locale".
        if (this.enableCookie == true && this.languageCodes.length > 0) {
            this.setCookie("locale", this.defaultLocale, this.expiry);
        }
    };
    /**
     * Parses the cookie to extract the codes & the extension.
     *
     * @param name The name of the cookie
     */
    LocaleService.prototype.parseCookie = function (name) {
        // Tries to get the cookie.
        var cookie = this.getCookie(name);
        // Looks for the 'u' (Unicode) extension.
        var index = cookie.search('-u');
        if (index != -1) {
            var extensions = cookie.substring(index + 1).split('-');
            switch (extensions.length) {
                case 3:
                    if (extensions[1] == "nu")
                        this.numberingSystem = extensions[2];
                    else if (extensions[1] == "ca")
                        this.calendar = extensions[2];
                    break;
                case 5:
                    this.numberingSystem = extensions[2];
                    this.calendar = extensions[4];
                    break;
            }
            // Extracts the codes.
            cookie = cookie.substring(0, index);
        }
        // Splits the cookie to each hyphen.
        var codes = cookie.split('-');
        switch (codes.length) {
            case 1:
                if (name == "locale")
                    this.languageCode = codes[0];
                else if (name == "currency")
                    this.currencyCode = codes[0];
                break;
            case 2:
                this.languageCode = codes[0];
                this.countryCode = codes[1];
                break;
            case 3:
                this.languageCode = codes[0];
                this.scriptCode = codes[1];
                this.countryCode = codes[2];
                break;
        }
    };
    /**
     * Sets the cookie.
     *
     * @param name The name of the cookie
     * @param value The value of the cookie
     * @param days Number of days on the expiry
     */
    LocaleService.prototype.setCookie = function (name, value, days) {
        if (days != null) {
            // Adds the expiry date (in UTC time).
            var expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + expirationDate.toUTCString();
        }
        else {
            // By default, the cookie is deleted when the browser is closed.
            var expires = "";
        }
        // Creates the cookie.
        document.cookie = name + "=" + value + expires + "; path=/";
    };
    /**
     * Gets the cookie.
     *
     * @param name The name of the cookie
     * @return The value of the cookie
     */
    LocaleService.prototype.getCookie = function (name) {
        // The text to search for.
        name += "=";
        // Splits document.cookie on semicolons into an array.
        var ca = document.cookie.split(';');
        // Loops through the ca array, and reads out each value.
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            // If the cookie is found, returns the value of the cookie.
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        // If the cookie is not found, returns an empty string.
        return "";
    };
    /**
     * Reference counter for the service.
     */
    LocaleService.referenceCounter = 0;
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LocaleService.prototype, "languageCodeChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LocaleService.prototype, "countryCodeChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LocaleService.prototype, "currencyCodeChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LocaleService.prototype, "scriptCodeChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LocaleService.prototype, "numberingSystemChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LocaleService.prototype, "calendarChanged", void 0);
    LocaleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocaleService);
    return LocaleService;
}());
exports.LocaleService = LocaleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2NhbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7O0FBRUgscUJBQStDLGVBQWUsQ0FBQyxDQUFBO0FBRS9EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErR0c7QUFDVztJQXVGVjtRQXJGQTs7V0FFRztRQUNPLHdCQUFtQixHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO1FBRTNEOztXQUVHO1FBQ08sdUJBQWtCLEdBQUcsSUFBSSxtQkFBWSxFQUFVLENBQUM7UUFFMUQ7O1dBRUc7UUFDTyx3QkFBbUIsR0FBRyxJQUFJLG1CQUFZLEVBQVUsQ0FBQztRQUUzRDs7V0FFRztRQUNPLHNCQUFpQixHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO1FBRXpEOztXQUVHO1FBQ08sMkJBQXNCLEdBQUcsSUFBSSxtQkFBWSxFQUFVLENBQUM7UUFFOUQ7O1dBRUc7UUFDTyxvQkFBZSxHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO1FBc0J2RDs7V0FFRztRQUNLLGtCQUFhLEdBQWtCLEVBQUUsQ0FBQztRQTJCMUM7O1dBRUc7UUFDSSxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUlqQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVuQix1Q0FBdUM7UUFDdkMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFakMsNkVBQTZFO1FBQzdFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRTdCLENBQUM7SUFFTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG1DQUFXLEdBQVgsVUFBWSxRQUFnQjtRQUV4QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV0QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsK0NBQXVCLEdBQXZCLFVBQXdCLGVBQXVCLEVBQUUsTUFBZTtRQUU1RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFMUIsb0VBQW9FO1lBQ3BFLElBQUksZUFBZSxHQUFXLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLFlBQVksSUFBSSxTQUFTLENBQUMsZUFBZSxJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUM7WUFFcEksSUFBSSxLQUFLLEdBQVcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVkLGVBQWUsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjtZQUVyRixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFckYsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUM7WUFFeEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVKLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDO1lBRXhDLENBQUM7UUFFTCxDQUFDO1FBRUQsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBRTVCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCw2Q0FBcUIsR0FBckIsVUFBc0IsZUFBdUIsRUFBRSxjQUFzQixFQUFFLE1BQWUsRUFBRSxNQUFtQixFQUFFLGVBQTRCLEVBQUUsUUFBcUI7UUFBeEUsc0JBQW1CLEdBQW5CLFdBQW1CO1FBQUUsK0JBQTRCLEdBQTVCLG9CQUE0QjtRQUFFLHdCQUFxQixHQUFyQixhQUFxQjtRQUU1SixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixtRUFBbUU7UUFDbkUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFcEQsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUM7WUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFN0IsQ0FBQztRQUVELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUU1QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILCtDQUF1QixHQUF2QixVQUF3QixlQUF1QjtRQUUzQyxvREFBb0Q7UUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUM7UUFFeEMsQ0FBQztRQUVELDhCQUE4QjtRQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdELElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRS9ELENBQUM7SUFFTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDBDQUFrQixHQUFsQjtRQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBRTdCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gseUNBQWlCLEdBQWpCO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFFNUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwwQ0FBa0IsR0FBbEI7UUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUU3QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGlDQUFTLEdBQVQ7UUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUUzQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDBDQUFrQixHQUFsQjtRQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBRWhDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsbUNBQVcsR0FBWDtRQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBRXpCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsMENBQWtCLEdBQWxCLFVBQW1CLFFBQWdCO1FBRS9CLHNDQUFzQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFaEMsc0NBQXNDO1lBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO1lBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFeEMsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRTVCLENBQUM7SUFFTCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCx3Q0FBZ0IsR0FBaEIsVUFBaUIsUUFBZ0IsRUFBRSxPQUFlLEVBQUUsTUFBbUIsRUFBRSxlQUE0QixFQUFFLFFBQXFCO1FBQXhFLHNCQUFtQixHQUFuQixXQUFtQjtRQUFFLCtCQUE0QixHQUE1QixvQkFBNEI7UUFBRSx3QkFBcUIsR0FBckIsYUFBcUI7UUFFeEgsaUVBQWlFO1FBQ2pFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksZUFBZSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUVwSyx5Q0FBeUM7WUFDekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO2dCQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFBQyxDQUFDO1lBQzdHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztnQkFBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQUMsQ0FBQztZQUN2RyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7Z0JBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUFDLENBQUM7WUFDakcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO2dCQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFBQyxDQUFDO1lBQzNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUFDLENBQUM7WUFFakcsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRTVCLENBQUM7SUFFTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDBDQUFrQixHQUFsQixVQUFtQixRQUFnQjtRQUUvQixzQ0FBc0M7UUFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBRWhDLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztZQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXhDLDhCQUE4QjtZQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU3RCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUvRCxDQUFDO1FBRUwsQ0FBQztJQUVMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsd0NBQWdCLEdBQWhCO1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFFOUIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssd0NBQWdCLEdBQXhCO1FBRUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO1FBRXRDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRTNFLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDcEYseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3RGLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUV4RSw0QkFBNEI7UUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5RCxDQUFDO0lBRUwsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxtQ0FBVyxHQUFuQixVQUFvQixJQUFZO1FBRTVCLDJCQUEyQjtRQUMzQixJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFDLHlDQUF5QztRQUN6QyxJQUFJLEtBQUssR0FBVyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFZCxJQUFJLFVBQVUsR0FBYSxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEUsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBRXhCLEtBQUssQ0FBQztvQkFDRixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO3dCQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQzt3QkFBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUQsS0FBSyxDQUFDO2dCQUNWLEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLEtBQUssQ0FBQztZQUVkLENBQUM7WUFFRCxzQkFBc0I7WUFDdEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhDLENBQUM7UUFFRCxvQ0FBb0M7UUFDcEMsSUFBSSxLQUFLLEdBQWEsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV4QyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUVuQixLQUFLLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQztvQkFBQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxVQUFVLENBQUM7b0JBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELEtBQUssQ0FBQztZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLEtBQUssQ0FBQztZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixLQUFLLENBQUM7UUFFZCxDQUFDO0lBRUwsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLGlDQUFTLEdBQWpCLFVBQWtCLElBQVksRUFBRSxLQUFhLEVBQUUsSUFBYTtRQUV4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVmLHNDQUFzQztZQUN0QyxJQUFJLGNBQWMsR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1lBRXRDLGNBQWMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFaEYsSUFBSSxPQUFPLEdBQVcsWUFBWSxHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV0RSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFSixnRUFBZ0U7WUFDaEUsSUFBSSxPQUFPLEdBQVcsRUFBRSxDQUFDO1FBRTdCLENBQUM7UUFFRCxzQkFBc0I7UUFDdEIsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxPQUFPLEdBQUcsVUFBVSxDQUFDO0lBRWhFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGlDQUFTLEdBQWpCLFVBQWtCLElBQVk7UUFFMUIsMEJBQTBCO1FBQzFCLElBQUksSUFBSSxHQUFHLENBQUM7UUFFWixzREFBc0Q7UUFDdEQsSUFBSSxFQUFFLEdBQWEsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUMsd0RBQXdEO1FBQ3hELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBRWpDLElBQUksQ0FBQyxHQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0QixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBRXhCLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXZCLENBQUM7WUFDRCwyREFBMkQ7WUFDM0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV2QixNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5QyxDQUFDO1FBQ0wsQ0FBQztRQUVELHVEQUF1RDtRQUN2RCxNQUFNLENBQUMsRUFBRSxDQUFDO0lBRWQsQ0FBQztJQTFiRDs7T0FFRztJQUNZLDhCQUFnQixHQUFXLENBQUMsQ0FBQztJQTNFNUM7UUFBQyxhQUFNLEVBQUU7OzhEQUFBO0lBS1Q7UUFBQyxhQUFNLEVBQUU7OzZEQUFBO0lBS1Q7UUFBQyxhQUFNLEVBQUU7OzhEQUFBO0lBS1Q7UUFBQyxhQUFNLEVBQUU7OzREQUFBO0lBS1Q7UUFBQyxhQUFNLEVBQUU7O2lFQUFBO0lBS1Q7UUFBQyxhQUFNLEVBQUU7OzBEQUFBO0lBOUJiO1FBQUMsaUJBQVUsRUFBRTs7cUJBQUE7SUF5Z0JiLG9CQUFDO0FBQUQsQ0FBQyxBQXpnQmEsSUF5Z0JiO0FBemdCMEIscUJBQWEsZ0JBeWdCdkMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBTkdVTEFSIDIgTE9DQUxJWkFUSU9OXHJcbiAqIEFuIEFuZ3VsYXIgMiBsaWJyYXJ5IHRvIHRyYW5zbGF0ZSBtZXNzYWdlcywgZGF0ZXMgYW5kIG51bWJlcnMuXHJcbiAqIFdyaXR0ZW4gYnkgUm9iZXJ0byBTaW1vbmV0dGkuXHJcbiAqIE1JVCBsaWNlbnNlLlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vcm9iaXNpbTc0L2FuZ3VsYXIybG9jYWxpemF0aW9uXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogTG9jYWxlU2VydmljZSBjbGFzcy5cclxuICogRGVmaW5lcyBsYW5ndWFnZSwgZGVmYXVsdCBsb2NhbGUgJiBjdXJyZW5jeS5cclxuICogXHJcbiAqIEluc3RhbnRpYXRlIHRoaXMgY2xhc3Mgb25seSBvbmNlIGluIHRoZSByb3V0ZSBjb21wb25lbnQgaW4gb3JkZXIgdG8gYWNjZXNzIHRoZSBkYXRhIG9mIGxvY2F0aW9uIGZyb20gYW55d2hlcmUgaW4gdGhlIGFwcGxpY2F0aW9uOiBcclxuICogXHJcbiAqIEZJUlNUIFNDRU5BUklPIC0gRGF0ZXMgJiBudW1iZXJzLlxyXG4gKiBcclxuICogaW1wb3J0IHtMb2NhbGVTZXJ2aWNlfSBmcm9tICdhbmd1bGFyMmxvY2FsaXphdGlvbi9hbmd1bGFyMmxvY2FsaXphdGlvbic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgICAgc2VsZWN0b3I6ICdhcHAtY29tcG9uZW50JyxcclxuICogICAgIC4uLlxyXG4gKiAgICAgcHJvdmlkZXJzOiBbTG9jYWxlU2VydmljZV0gLy8gSW5oZXJpdGVkIGJ5IGFsbCBkZXNjZW5kYW50cy5cclxuICogfSlcclxuICogXHJcbiAqIGV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG4gKiBcclxuICogICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2NhbGU6IExvY2FsZVNlcnZpY2UpIHtcclxuICogXHJcbiAqICAgICAgICAgLy8gUmVxdWlyZWQ6IGRlZmF1bHQgbGFuZ3VhZ2UgKElTTyA2MzkgdHdvLWxldHRlciBvciB0aHJlZS1sZXR0ZXIgY29kZSkgYW5kIGNvdW50cnkgKElTTyAzMTY2IHR3by1sZXR0ZXIsIHVwcGVyY2FzZSBjb2RlKS5cclxuICogICAgICAgICB0aGlzLmxvY2FsZS5kZWZpbmVQcmVmZXJyZWRMb2NhbGUoJ2VuJywgJ1VTJyk7XHJcbiAqIFxyXG4gKiAgICAgICAgIC8vIE9wdGlvbmFsOiBkZWZhdWx0IGN1cnJlbmN5IChJU08gNDIxNyB0aHJlZS1sZXR0ZXIgY29kZSkuXHJcbiAqICAgICAgICAgdGhpcy5sb2NhbGUuZGVmaW5lUHJlZmVycmVkQ3VycmVuY3koJ1VTRCcpO1xyXG4gKiBcclxuICogICAgICB9XHJcbiAqIFxyXG4gKiB9XHJcbiAqIFxyXG4gKiBTRUNPTkQgU0NFTkFSSU8gLSBNZXNzYWdlcy5cclxuICogXHJcbiAqIGltcG9ydCB7TG9jYWxlU2VydmljZSwgTG9jYWxpemF0aW9uU2VydmljZX0gZnJvbSAnYW5ndWxhcjJsb2NhbGl6YXRpb24vYW5ndWxhcjJsb2NhbGl6YXRpb24nO1xyXG4gKlxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogICAgIHNlbGVjdG9yOiAnYXBwLWNvbXBvbmVudCcsXHJcbiAqICAgICAuLi5cclxuICogICAgIHByb3ZpZGVyczogW0xvY2FsZVNlcnZpY2UsIExvY2FsaXphdGlvblNlcnZpY2VdIC8vIEluaGVyaXRlZCBieSBhbGwgZGVzY2VuZGFudHMuXHJcbiAqIH0pXHJcbiAqIFxyXG4gKiBleHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcclxuICogXHJcbiAqICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9jYWxlOiBMb2NhbGVTZXJ2aWNlLCBwdWJsaWMgbG9jYWxpemF0aW9uOiBMb2NhbGl6YXRpb25TZXJ2aWNlKSB7XHJcbiAqIFxyXG4gKiAgICAgICAgIC8vIEFkZHMgYSBuZXcgbGFuZ3VhZ2UgKElTTyA2MzkgdHdvLWxldHRlciBvciB0aHJlZS1sZXR0ZXIgY29kZSkuXHJcbiAqICAgICAgICAgdGhpcy5sb2NhbGUuYWRkTGFuZ3VhZ2UoJ2VuJyk7XHJcbiAqICAgICAgICAgLy8gQWRkIGEgbmV3IGxhbmd1YWdlIGhlcmUuXHJcbiAqIFxyXG4gKiAgICAgICAgIC8vIFJlcXVpcmVkOiBkZWZhdWx0IGxhbmd1YWdlIGFuZCBleHBpcnkgKE5vIGRheXMpLiBJZiB0aGUgZXhwaXJ5IGlzIG9taXR0ZWQsIHRoZSBjb29raWUgYmVjb21lcyBhIHNlc3Npb24gY29va2llLlxyXG4gKiAgICAgICAgIHRoaXMubG9jYWxlLmRlZmluZVByZWZlcnJlZExhbmd1YWdlKCdlbicsIDMwKTtcclxuICogICAgICAgICAgIFxyXG4gKiAgICAgfVxyXG4gKiBcclxuICogfVxyXG4gKiBcclxuICogVEhJUkQgU0NFTkFSSU8gLSBNZXNzYWdlcywgZGF0ZXMgJiBudW1iZXJzLlxyXG4gKiBcclxuICogaW1wb3J0IHtMb2NhbGVTZXJ2aWNlLCBMb2NhbGl6YXRpb25TZXJ2aWNlfSBmcm9tICdhbmd1bGFyMmxvY2FsaXphdGlvbi9hbmd1bGFyMmxvY2FsaXphdGlvbic7XHJcbiAqXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgICAgc2VsZWN0b3I6ICdhcHAtY29tcG9uZW50JyxcclxuICogICAgIC4uLlxyXG4gKiAgICAgcHJvdmlkZXJzOiBbTG9jYWxlU2VydmljZSwgTG9jYWxpemF0aW9uU2VydmljZV0gLy8gSW5oZXJpdGVkIGJ5IGFsbCBkZXNjZW5kYW50cy5cclxuICogfSlcclxuICogXHJcbiAqIGV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG4gKiBcclxuICogICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2NhbGU6IExvY2FsZVNlcnZpY2UsIHB1YmxpYyBsb2NhbGl6YXRpb246IExvY2FsaXphdGlvblNlcnZpY2UpIHtcclxuICogXHJcbiAqICAgICAgICAgLy8gQWRkcyBhIG5ldyBsYW5ndWFnZSAoSVNPIDYzOSB0d28tbGV0dGVyIG9yIHRocmVlLWxldHRlciBjb2RlKS5cclxuICogICAgICAgICB0aGlzLmxvY2FsZS5hZGRMYW5ndWFnZSgnZW4nKTtcclxuICogICAgICAgICAvLyBBZGQgYSBuZXcgbGFuZ3VhZ2UgaGVyZS5cclxuICogXHJcbiAqICAgICAgICAgLy8gUmVxdWlyZWQ6IGRlZmF1bHQgbGFuZ3VhZ2UsIGNvdW50cnkgKElTTyAzMTY2IHR3by1sZXR0ZXIsIHVwcGVyY2FzZSBjb2RlKSBhbmQgZXhwaXJ5IChObyBkYXlzKS4gSWYgdGhlIGV4cGlyeSBpcyBvbWl0dGVkLCB0aGUgY29va2llIGJlY29tZXMgYSBzZXNzaW9uIGNvb2tpZS5cclxuICogICAgICAgICB0aGlzLmxvY2FsZS5kZWZpbmVQcmVmZXJyZWRMb2NhbGUoJ2VuJywgJ1VTJywgMzApO1xyXG4gKiAgXHJcbiAqICAgICAgICAgLy8gT3B0aW9uYWw6IGRlZmF1bHQgY3VycmVuY3kgKElTTyA0MjE3IHRocmVlLWxldHRlciBjb2RlKS5cclxuICogICAgICAgICB0aGlzLmxvY2FsZS5kZWZpbmVQcmVmZXJyZWRDdXJyZW5jeSgnVVNEJyk7XHJcbiAqIFxyXG4gKiAgICAgfVxyXG4gKiBcclxuICogfVxyXG4gKiBcclxuICogQ2hhbmdpbmcgbGFuZ3VhZ2UuXHJcbiAqIFxyXG4gKiBUbyBjaGFuZ2UgbGFuZ3VhZ2UgYXQgcnVudGltZSwgY2FsbCB0aGUgZm9sbG93aW5nIG1ldGhvZDpcclxuICogIFxyXG4gKiB0aGlzLmxvY2FsZS5zZXRDdXJyZW50TGFuZ3VhZ2UobGFuZ3VhZ2UpO1xyXG4gKiBcclxuICogd2hlcmUgJ2xhbmd1YWdlJyBpcyB0aGUgdHdvLWxldHRlciBvciB0aHJlZS1sZXR0ZXIgY29kZSBvZiB0aGUgbmV3IGxhbmd1YWdlIChJU08gNjM5KS5cclxuICogXHJcbiAqIFxyXG4gKiBDaGFuZ2luZyBsb2NhbGUuXHJcbiAqIFxyXG4gKiBUbyBjaGFuZ2UgbG9jYWxlIGF0IHJ1bnRpbWUsIGNhbGwgdGhlIGZvbGxvd2luZyBtZXRob2Q6XHJcbiAqICBcclxuICogdGhpcy5sb2NhbGUuc2V0Q3VycmVudExvY2FsZShsYW5ndWFnZSwgY291bnRyeSk7XHJcbiAqIFxyXG4gKiB3aGVyZSAnbGFuZ3VhZ2UnIGlzIHRoZSB0d28tbGV0dGVyIG9yIHRocmVlLWxldHRlciBjb2RlIG9mIHRoZSBuZXcgbGFuZ3VhZ2UgKElTTyA2MzkpXHJcbiAqIGFuZCAnY291bnRyeScgaXMgdGhlIHR3by1sZXR0ZXIsIHVwcGVyY2FzZSBjb2RlIG9mIHRoZSBuZXcgY291bnRyeSAoSVNPIDMxNjYpLlxyXG4gKlxyXG4gKiBcclxuICogQ2hhbmdpbmcgY3VycmVuY3kuXHJcbiAqIFxyXG4gKiBUbyBjaGFuZ2UgY3VycmVuY3kgYXQgcnVudGltZSwgY2FsbCB0aGUgZm9sbG93aW5nIG1ldGhvZDpcclxuICogIFxyXG4gKiB0aGlzLmxvY2FsZS5zZXRDdXJyZW50Q3VycmVuY3koY3VycmVuY3kpO1xyXG4gKiBcclxuICogd2hlcmUgJ2N1cnJlbmN5JyBpcyB0aGUgdGhyZWUtbGV0dGVyIGNvZGUgb2YgdGhlIG5ldyBjdXJyZW5jeSAoSVNPIDQyMTcpLlxyXG4gKiBcclxuICogQGF1dGhvciBSb2JlcnRvIFNpbW9uZXR0aVxyXG4gKi9cclxuQEluamVjdGFibGUoKSBleHBvcnQgY2xhc3MgTG9jYWxlU2VydmljZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPdXRwdXQgZm9yIGV2ZW50IGN1cnJlbnQgbGFuZ3VhZ2UgY29kZSBjaGFuZ2VkLlxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgbGFuZ3VhZ2VDb2RlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3V0cHV0IGZvciBldmVudCBjdXJyZW50IGNvdW50cnkgY29kZSBjaGFuZ2VkLlxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgY291bnRyeUNvZGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPdXRwdXQgZm9yIGV2ZW50IGN1cnJlbnQgY3VycmVuY3kgY29kZSBjaGFuZ2VkLlxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgY3VycmVuY3lDb2RlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3V0cHV0IGZvciBldmVudCBzY3JpcHQgY29kZSBjaGFuZ2VkLlxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgc2NyaXB0Q29kZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE91dHB1dCBmb3IgZXZlbnQgbnVtYmVyaW5nIHN5c3RlbSBjaGFuZ2VkLlxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgbnVtYmVyaW5nU3lzdGVtQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3V0cHV0IGZvciBldmVudCBjYWxlbmRhciBjaGFuZ2VkLlxyXG4gICAgICovXHJcbiAgICBAT3V0cHV0KCkgY2FsZW5kYXJDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXJyZW50IGxhbmd1YWdlIGNvZGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VDb2RlOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXJyZW50IGNvdW50cnkgY29kZS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb3VudHJ5Q29kZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3VycmVudCBjdXJyZW5jeSBjb2RlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBsb2NhbGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVmYXVsdExvY2FsZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGF2YWlsYWJsZSBsYW5ndWFnZSBjb2Rlcy5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZUNvZGVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHdoZW4gdGhlIGNvb2tpZSB3aWxsIGJlIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhwaXJ5OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb3B0aW9uYWwgc2NyaXB0IGNvZGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2NyaXB0Q29kZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG9wdGlvbmFsIG51bWJlcmluZyBzeXN0ZW0uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbnVtYmVyaW5nU3lzdGVtOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb3B0aW9uYWwgY2FsZW5kYXIuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsZW5kYXI6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZmVyZW5jZSBjb3VudGVyIGZvciB0aGUgc2VydmljZS4gXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJlZmVyZW5jZUNvdW50ZXI6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGUvZGlzYWJsZSBjb29raWUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVDb29raWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZUNvZGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY291bnRyeUNvZGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY3VycmVuY3lDb2RlID0gXCJcIjtcclxuICAgICAgICB0aGlzLmRlZmF1bHRMb2NhbGUgPSBcIlwiO1xyXG5cclxuICAgICAgICB0aGlzLnNjcmlwdENvZGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubnVtYmVyaW5nU3lzdGVtID0gXCJcIjtcclxuICAgICAgICB0aGlzLmNhbGVuZGFyID0gXCJcIjtcclxuXHJcbiAgICAgICAgLy8gQ291bnRzIHRoZSByZWZlcmVuY2UgdG8gdGhlIHNlcnZpY2UuXHJcbiAgICAgICAgTG9jYWxlU2VydmljZS5yZWZlcmVuY2VDb3VudGVyKys7XHJcblxyXG4gICAgICAgIC8vIEVuYWJsZXMgdGhlIGNvb2tpZXMgZm9yIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiB0aGUgc2VydmljZSAoc2VlIGlzc3VlICMxMSkuXHJcbiAgICAgICAgaWYgKExvY2FsZVNlcnZpY2UucmVmZXJlbmNlQ291bnRlciA9PSAxKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUNvb2tpZSA9IHRydWU7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgbmV3IGxhbmd1YWdlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgVGhlIHR3by1sZXR0ZXIgb3IgdGhyZWUtbGV0dGVyIGNvZGUgb2YgdGhlIG5ldyBsYW5ndWFnZVxyXG4gICAgICovXHJcbiAgICBhZGRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VDb2Rlcy5wdXNoKGxhbmd1YWdlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBwcmVmZXJyZWQgbGFuZ3VhZ2UuIFxyXG4gICAgICogU2VsZWN0cyB0aGUgY3VycmVudCBsYW5ndWFnZSBvZiB0aGUgYnJvd3NlciBpZiBpdCBoYXMgYmVlbiBhZGRlZCwgZWxzZSB0aGUgZGVmYXVsdCBsYW5ndWFnZS4gXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkZWZhdWx0TGFuZ3VhZ2UgVGhlIHR3by1sZXR0ZXIgb3IgdGhyZWUtbGV0dGVyIGNvZGUgb2YgdGhlIGRlZmF1bHQgbGFuZ3VhZ2VcclxuICAgICAqIEBwYXJhbSBleHBpcnkgTnVtYmVyIG9mIGRheXMgb24gdGhlIGV4cGlyeS4gSWYgb21pdHRlZCwgdGhlIGNvb2tpZSBiZWNvbWVzIGEgc2Vzc2lvbiBjb29raWVcclxuICAgICAqL1xyXG4gICAgZGVmaW5lUHJlZmVycmVkTGFuZ3VhZ2UoZGVmYXVsdExhbmd1YWdlOiBzdHJpbmcsIGV4cGlyeT86IG51bWJlcikge1xyXG5cclxuICAgICAgICB0aGlzLmV4cGlyeSA9IGV4cGlyeTtcclxuXHJcbiAgICAgICAgLy8gUGFyc2VzIHRoZSBjb29raWUgXCJsb2NhbGVcIiB0byBleHRyYWN0IHRoZSBjb2Rlcy5cclxuICAgICAgICB0aGlzLnBhcnNlQ29va2llKFwibG9jYWxlXCIpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5sYW5ndWFnZUNvZGUgPT0gXCJcIikge1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0cyB0aGUgY3VycmVudCBsYW5ndWFnZSBvZiB0aGUgYnJvd3NlciBvciB0aGUgZGVmYXVsdCBsYW5ndWFnZS5cclxuICAgICAgICAgICAgdmFyIGJyb3dzZXJMYW5ndWFnZTogc3RyaW5nID0gbmF2aWdhdG9yLmxhbmd1YWdlIHx8IG5hdmlnYXRvci51c2VyTGFuZ3VhZ2UgfHwgbmF2aWdhdG9yLmJyb3dzZXJMYW5ndWFnZSB8fCBuYXZpZ2F0b3Iuc3lzdGVtTGFuZ3VhZ2U7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5kZXg6IG51bWJlciA9IGJyb3dzZXJMYW5ndWFnZS5pbmRleE9mKCctJyk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGJyb3dzZXJMYW5ndWFnZSA9IGJyb3dzZXJMYW5ndWFnZS5zdWJzdHJpbmcoMCwgaW5kZXgpOyAvLyBHZXRzIHRoZSBsYW5ndWFnZSBjb2RlLlxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubGFuZ3VhZ2VDb2Rlcy5sZW5ndGggPiAwICYmIHRoaXMubGFuZ3VhZ2VDb2Rlcy5pbmRleE9mKGJyb3dzZXJMYW5ndWFnZSkgIT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmd1YWdlQ29kZSA9IGJyb3dzZXJMYW5ndWFnZTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYW5ndWFnZUNvZGUgPSBkZWZhdWx0TGFuZ3VhZ2U7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2V0cyB0aGUgZGVmYXVsdCBsb2NhbGUuXHJcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0TG9jYWxlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBwcmVmZXJyZWQgbGFuZ3VhbmdlIGFuZCBjb3VudHJ5LCByZWdhcmRsZXNzIG9mIHRoZSBicm93c2VyIGxhbmd1YWdlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGVmYXVsdExhbmd1YWdlIFRoZSB0d28tbGV0dGVyIG9yIHRocmVlLWxldHRlciBjb2RlIG9mIHRoZSBkZWZhdWx0IGxhbmd1YWdlXHJcbiAgICAgKiBAcGFyYW0gZGVmYXVsdENvdW50cnkgVGhlIHR3by1sZXR0ZXIsIHVwcGVyY2FzZSBjb2RlIG9mIHRoZSBkZWZhdWx0IGNvdW50cnlcclxuICAgICAqIEBwYXJhbSBleHBpcnkgTnVtYmVyIG9mIGRheXMgb24gdGhlIGV4cGlyeS4gSWYgb21pdHRlZCwgdGhlIGNvb2tpZSBiZWNvbWVzIGEgc2Vzc2lvbiBjb29raWVcclxuICAgICAqIEBwYXJhbSBzY3JpcHQgVGhlIG9wdGlvbmFsIGZvdXItbGV0dGVyIHNjcmlwdCBjb2RlXHJcbiAgICAgKiBAcGFyYW0gbnVtYmVyaW5nU3lzdGVtIFRoZSBvcHRpb25hbCBudW1iZXJpbmcgc3lzdGVtIHRvIGJlIHVzZWRcclxuICAgICAqIEBwYXJhbSBjYWxlbmRhciBUaGUgb3B0aW9uYWwgY2FsZW5kYXIgdG8gYmUgdXNlZFxyXG4gICAgICovXHJcbiAgICBkZWZpbmVQcmVmZXJyZWRMb2NhbGUoZGVmYXVsdExhbmd1YWdlOiBzdHJpbmcsIGRlZmF1bHRDb3VudHJ5OiBzdHJpbmcsIGV4cGlyeT86IG51bWJlciwgc2NyaXB0OiBzdHJpbmcgPSBcIlwiLCBudW1iZXJpbmdTeXN0ZW06IHN0cmluZyA9IFwiXCIsIGNhbGVuZGFyOiBzdHJpbmcgPSBcIlwiKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZXhwaXJ5ID0gZXhwaXJ5O1xyXG5cclxuICAgICAgICAvLyBQYXJzZXMgdGhlIGNvb2tpZSBcImxvY2FsZVwiIHRvIGV4dHJhY3QgdGhlIGNvZGVzICYgdGhlIGV4dGVuc2lvbi5cclxuICAgICAgICB0aGlzLnBhcnNlQ29va2llKFwibG9jYWxlXCIpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5sYW5ndWFnZUNvZGUgPT0gXCJcIiB8fCB0aGlzLmNvdW50cnlDb2RlID09IFwiXCIpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VDb2RlID0gZGVmYXVsdExhbmd1YWdlO1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50cnlDb2RlID0gZGVmYXVsdENvdW50cnk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NyaXB0Q29kZSA9IHNjcmlwdDtcclxuICAgICAgICAgICAgdGhpcy5udW1iZXJpbmdTeXN0ZW0gPSBudW1iZXJpbmdTeXN0ZW07XHJcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSBjYWxlbmRhcjtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXRzIHRoZSBkZWZhdWx0IGxvY2FsZS5cclxuICAgICAgICB0aGlzLnNldERlZmF1bHRMb2NhbGUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBwcmVmZXJyZWQgY3VycmVuY3kuIFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGVmYXVsdEN1cnJlbmN5IFRoZSB0aHJlZS1sZXR0ZXIgY29kZSBvZiB0aGUgZGVmYXVsdCBjdXJyZW5jeVxyXG4gICAgICovXHJcbiAgICBkZWZpbmVQcmVmZXJyZWRDdXJyZW5jeShkZWZhdWx0Q3VycmVuY3k6IHN0cmluZykge1xyXG5cclxuICAgICAgICAvLyBQYXJzZXMgdGhlIGNvb2tpZSBcImN1cnJlbmN5XCIgdG8gZXh0cmFjdCB0aGUgY29kZS5cclxuICAgICAgICB0aGlzLnBhcnNlQ29va2llKFwiY3VycmVuY3lcIik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbmN5Q29kZSA9PSBcIlwiKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbmN5Q29kZSA9IGRlZmF1bHRDdXJyZW5jeTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXRzIHRoZSBjb29raWUgXCJjdXJyZW5jeVwiLlxyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZUNvb2tpZSA9PSB0cnVlICYmIHRoaXMubGFuZ3VhZ2VDb2Rlcy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldENvb2tpZShcImN1cnJlbmN5XCIsIHRoaXMuY3VycmVuY3lDb2RlLCB0aGlzLmV4cGlyeSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IGxhbmd1YWdlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIFRoZSB0d28tbGV0dGVyIG9yIHRocmVlLWxldHRlciBjb2RlIG9mIHRoZSBjdXJyZW50IGxhbmd1YWdlXHJcbiAgICAgKi9cclxuICAgIGdldEN1cnJlbnRMYW5ndWFnZSgpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZUNvZGU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBjb3VudHJ5LlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIFRoZSB0d28tbGV0dGVyLCB1cHBlcmNhc2UgY29kZSBvZiB0aGUgY3VycmVudCBjb3VudHJ5XHJcbiAgICAgKi9cclxuICAgIGdldEN1cnJlbnRDb3VudHJ5KCk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvdW50cnlDb2RlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgY3VycmVuY3kuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm4gVGhlIHRocmVlLWxldHRlciBjb2RlIG9mIHRoZSBjdXJyZW50IGN1cnJlbmN5XHJcbiAgICAgKi9cclxuICAgIGdldEN1cnJlbnRDdXJyZW5jeSgpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW5jeUNvZGU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgc2NyaXB0LlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBmb3VyLWxldHRlciBjb2RlIG9mIHRoZSBzY3JpcHRcclxuICAgICAqL1xyXG4gICAgZ2V0U2NyaXB0KCk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnNjcmlwdENvZGU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbnVtYmVyaW5nIHN5c3RlbS5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybiBUaGUgbnVtYmVyaW5nIHN5c3RlbVxyXG4gICAgICovXHJcbiAgICBnZXROdW1iZXJpbmdTeXN0ZW0oKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtYmVyaW5nU3lzdGVtO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNhbGVuZGFyLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBjYWxlbmRhclxyXG4gICAgICovXHJcbiAgICBnZXRDYWxlbmRhcigpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxlbmRhcjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IGxhbmd1YWdlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgVGhlIHR3by1sZXR0ZXIgb3IgdGhyZWUtbGV0dGVyIGNvZGUgb2YgdGhlIG5ldyBsYW5ndWFnZVxyXG4gICAgICovXHJcbiAgICBzZXRDdXJyZW50TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xyXG5cclxuICAgICAgICAvLyBDaGVja3MgaWYgdGhlIGxhbmd1YWdlIGhhcyBjaGFuZ2VkLlxyXG4gICAgICAgIGlmICh0aGlzLmxhbmd1YWdlQ29kZSAhPSBsYW5ndWFnZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gQXNzaWducyB0aGUgdmFsdWUgJiBzZW5kcyBhbiBldmVudC5cclxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZUNvZGUgPSBsYW5ndWFnZTtcclxuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZUNvZGVDaGFuZ2VkLmVtaXQobGFuZ3VhZ2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0cyB0aGUgZGVmYXVsdCBsb2NhbGUuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGVmYXVsdExvY2FsZSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY3VycmVudCBsb2NhbGUuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBsYW5ndWFnZSBUaGUgdHdvLWxldHRlciBvciB0aHJlZS1sZXR0ZXIgY29kZSBvZiB0aGUgbmV3IGxhbmd1YWdlXHJcbiAgICAgKiBAcGFyYW0gY291bnRyeSBUaGUgdHdvLWxldHRlciwgdXBwZXJjYXNlIGNvZGUgb2YgdGhlIG5ldyBjb3VudHJ5XHJcbiAgICAgKiBAcGFyYW0gc2NyaXB0IFRoZSBvcHRpb25hbCBmb3VyLWxldHRlciBzY3JpcHQgY29kZVxyXG4gICAgICogQHBhcmFtIG51bWJlcmluZ1N5c3RlbSBUaGUgb3B0aW9uYWwgbnVtYmVyaW5nIHN5c3RlbSB0byBiZSB1c2VkXHJcbiAgICAgKiBAcGFyYW0gY2FsZW5kYXIgVGhlIG9wdGlvbmFsIGNhbGVuZGFyIHRvIGJlIHVzZWRcclxuICAgICAqL1xyXG4gICAgc2V0Q3VycmVudExvY2FsZShsYW5ndWFnZTogc3RyaW5nLCBjb3VudHJ5OiBzdHJpbmcsIHNjcmlwdDogc3RyaW5nID0gXCJcIiwgbnVtYmVyaW5nU3lzdGVtOiBzdHJpbmcgPSBcIlwiLCBjYWxlbmRhcjogc3RyaW5nID0gXCJcIikge1xyXG5cclxuICAgICAgICAvLyBDaGVja3MgaWYgbGFuZ3VhZ2UsIGNvdW50cnksIHNjcmlwdCBvciBleHRlbnNpb24gaGF2ZSBjaGFuZ2VkLlxyXG4gICAgICAgIGlmICh0aGlzLmxhbmd1YWdlQ29kZSAhPSBsYW5ndWFnZSB8fCB0aGlzLmNvdW50cnlDb2RlICE9IGNvdW50cnkgfHwgdGhpcy5zY3JpcHRDb2RlICE9IHNjcmlwdCB8fCB0aGlzLm51bWJlcmluZ1N5c3RlbSAhPSBudW1iZXJpbmdTeXN0ZW0gfHwgdGhpcy5jYWxlbmRhciAhPSBjYWxlbmRhcikge1xyXG5cclxuICAgICAgICAgICAgLy8gQXNzaWducyB0aGUgdmFsdWVzICYgc2VuZHMgdGhlIGV2ZW50cy5cclxuICAgICAgICAgICAgaWYgKHRoaXMubGFuZ3VhZ2VDb2RlICE9IGxhbmd1YWdlKSB7IHRoaXMubGFuZ3VhZ2VDb2RlID0gbGFuZ3VhZ2U7IHRoaXMubGFuZ3VhZ2VDb2RlQ2hhbmdlZC5lbWl0KGxhbmd1YWdlKTsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudHJ5Q29kZSAhPSBjb3VudHJ5KSB7IHRoaXMuY291bnRyeUNvZGUgPSBjb3VudHJ5OyB0aGlzLmNvdW50cnlDb2RlQ2hhbmdlZC5lbWl0KGNvdW50cnkpOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcmlwdENvZGUgIT0gc2NyaXB0KSB7IHRoaXMuc2NyaXB0Q29kZSA9IHNjcmlwdDsgdGhpcy5zY3JpcHRDb2RlQ2hhbmdlZC5lbWl0KHNjcmlwdCk7IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMubnVtYmVyaW5nU3lzdGVtICE9IG51bWJlcmluZ1N5c3RlbSkgeyB0aGlzLm51bWJlcmluZ1N5c3RlbSA9IG51bWJlcmluZ1N5c3RlbTsgdGhpcy5udW1iZXJpbmdTeXN0ZW1DaGFuZ2VkLmVtaXQobnVtYmVyaW5nU3lzdGVtKTsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxlbmRhciAhPSBjYWxlbmRhcikgeyB0aGlzLmNhbGVuZGFyID0gY2FsZW5kYXI7IHRoaXMuY2FsZW5kYXJDaGFuZ2VkLmVtaXQoY2FsZW5kYXIpOyB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXRzIHRoZSBkZWZhdWx0IGxvY2FsZS5cclxuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0TG9jYWxlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IGN1cnJlbmN5LlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY3VycmVuY3kgVGhlIHRocmVlLWxldHRlciBjb2RlIG9mIHRoZSBuZXcgY3VycmVuY3lcclxuICAgICAqL1xyXG4gICAgc2V0Q3VycmVudEN1cnJlbmN5KGN1cnJlbmN5OiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2tzIGlmIHRoZSBjdXJyZW5jeSBoYXMgY2hhbmdlZC5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW5jeUNvZGUgIT0gY3VycmVuY3kpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEFzc2lnbnMgdGhlIHZhbHVlICYgc2VuZHMgYW4gZXZlbnQuXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3lDb2RlID0gY3VycmVuY3k7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVuY3lDb2RlQ2hhbmdlZC5lbWl0KGN1cnJlbmN5KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldHMgdGhlIGNvb2tpZSBcImN1cnJlbmN5XCIuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVuYWJsZUNvb2tpZSA9PSB0cnVlICYmIHRoaXMubGFuZ3VhZ2VDb2Rlcy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb29raWUoXCJjdXJyZW5jeVwiLCB0aGlzLmN1cnJlbmN5Q29kZSwgdGhpcy5leHBpcnkpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgZGVmYXVsdCBsb2NhbGUuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm4gVGhlIGRlZmF1bHQgbG9jYWxlXHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRMb2NhbGUoKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdExvY2FsZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZHMgdGhlIGRlZmF1bHQgbG9jYWxlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldERlZmF1bHRMb2NhbGUoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGVmYXVsdExvY2FsZSA9IHRoaXMubGFuZ3VhZ2VDb2RlXHJcblxyXG4gICAgICAgIHRoaXMuZGVmYXVsdExvY2FsZSArPSB0aGlzLnNjcmlwdENvZGUgIT0gXCJcIiA/IFwiLVwiICsgdGhpcy5zY3JpcHRDb2RlIDogXCJcIjtcclxuICAgICAgICB0aGlzLmRlZmF1bHRMb2NhbGUgKz0gdGhpcy5jb3VudHJ5Q29kZSAhPSBcIlwiID8gXCItXCIgKyB0aGlzLmNvdW50cnlDb2RlIDogXCJcIjtcclxuXHJcbiAgICAgICAgLy8gQWRkcyB0aGUgJ3UnIChVbmljb2RlKSBleHRlbnNpb24uXHJcbiAgICAgICAgdGhpcy5kZWZhdWx0TG9jYWxlICs9IHRoaXMubnVtYmVyaW5nU3lzdGVtICE9IFwiXCIgfHwgdGhpcy5jYWxlbmRhciAhPSBcIlwiID8gXCItdVwiIDogXCJcIjtcclxuICAgICAgICAvLyBBZGRzIG51bWJlcmluZyBzeXN0ZW0uXHJcbiAgICAgICAgdGhpcy5kZWZhdWx0TG9jYWxlICs9IHRoaXMubnVtYmVyaW5nU3lzdGVtICE9IFwiXCIgPyBcIi1udS1cIiArIHRoaXMubnVtYmVyaW5nU3lzdGVtIDogXCJcIjtcclxuICAgICAgICAvLyBBZGRzIGNhbGVuZGFyLlxyXG4gICAgICAgIHRoaXMuZGVmYXVsdExvY2FsZSArPSB0aGlzLmNhbGVuZGFyICE9IFwiXCIgPyBcIi1jYS1cIiArIHRoaXMuY2FsZW5kYXIgOiBcIlwiO1xyXG5cclxuICAgICAgICAvLyBTZXRzIHRoZSBjb29raWUgXCJsb2NhbGVcIi5cclxuICAgICAgICBpZiAodGhpcy5lbmFibGVDb29raWUgPT0gdHJ1ZSAmJiB0aGlzLmxhbmd1YWdlQ29kZXMubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRDb29raWUoXCJsb2NhbGVcIiwgdGhpcy5kZWZhdWx0TG9jYWxlLCB0aGlzLmV4cGlyeSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgdGhlIGNvb2tpZSB0byBleHRyYWN0IHRoZSBjb2RlcyAmIHRoZSBleHRlbnNpb24uXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBjb29raWVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZUNvb2tpZShuYW1lOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgLy8gVHJpZXMgdG8gZ2V0IHRoZSBjb29raWUuXHJcbiAgICAgICAgdmFyIGNvb2tpZTogc3RyaW5nID0gdGhpcy5nZXRDb29raWUobmFtZSk7XHJcblxyXG4gICAgICAgIC8vIExvb2tzIGZvciB0aGUgJ3UnIChVbmljb2RlKSBleHRlbnNpb24uXHJcbiAgICAgICAgdmFyIGluZGV4OiBudW1iZXIgPSBjb29raWUuc2VhcmNoKCctdScpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGV4dGVuc2lvbnM6IHN0cmluZ1tdID0gY29va2llLnN1YnN0cmluZyhpbmRleCArIDEpLnNwbGl0KCctJyk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZXh0ZW5zaW9ucy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnNbMV0gPT0gXCJudVwiKSB0aGlzLm51bWJlcmluZ1N5c3RlbSA9IGV4dGVuc2lvbnNbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZXh0ZW5zaW9uc1sxXSA9PSBcImNhXCIpIHRoaXMuY2FsZW5kYXIgPSBleHRlbnNpb25zWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyaW5nU3lzdGVtID0gZXh0ZW5zaW9uc1syXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gZXh0ZW5zaW9uc1s0XTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEV4dHJhY3RzIHRoZSBjb2Rlcy5cclxuICAgICAgICAgICAgY29va2llID0gY29va2llLnN1YnN0cmluZygwLCBpbmRleCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3BsaXRzIHRoZSBjb29raWUgdG8gZWFjaCBoeXBoZW4uXHJcbiAgICAgICAgdmFyIGNvZGVzOiBzdHJpbmdbXSA9IGNvb2tpZS5zcGxpdCgnLScpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGNvZGVzLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJsb2NhbGVcIikgdGhpcy5sYW5ndWFnZUNvZGUgPSBjb2Rlc1swXTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5hbWUgPT0gXCJjdXJyZW5jeVwiKSB0aGlzLmN1cnJlbmN5Q29kZSA9IGNvZGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VDb2RlID0gY29kZXNbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50cnlDb2RlID0gY29kZXNbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYW5ndWFnZUNvZGUgPSBjb2Rlc1swXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NyaXB0Q29kZSA9IGNvZGVzWzFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudHJ5Q29kZSA9IGNvZGVzWzJdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb29raWUuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBjb29raWVcclxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgb2YgdGhlIGNvb2tpZVxyXG4gICAgICogQHBhcmFtIGRheXMgTnVtYmVyIG9mIGRheXMgb24gdGhlIGV4cGlyeVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldENvb2tpZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRheXM/OiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKGRheXMgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkcyB0aGUgZXhwaXJ5IGRhdGUgKGluIFVUQyB0aW1lKS5cclxuICAgICAgICAgICAgdmFyIGV4cGlyYXRpb25EYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGV4cGlyYXRpb25EYXRlLnNldFRpbWUoZXhwaXJhdGlvbkRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZXhwaXJlczogc3RyaW5nID0gXCI7IGV4cGlyZXM9XCIgKyBleHBpcmF0aW9uRGF0ZS50b1VUQ1N0cmluZygpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgLy8gQnkgZGVmYXVsdCwgdGhlIGNvb2tpZSBpcyBkZWxldGVkIHdoZW4gdGhlIGJyb3dzZXIgaXMgY2xvc2VkLlxyXG4gICAgICAgICAgICB2YXIgZXhwaXJlczogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGVzIHRoZSBjb29raWUuXHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGNvb2tpZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGNvb2tpZVxyXG4gICAgICogQHJldHVybiBUaGUgdmFsdWUgb2YgdGhlIGNvb2tpZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICAvLyBUaGUgdGV4dCB0byBzZWFyY2ggZm9yLlxyXG4gICAgICAgIG5hbWUgKz0gXCI9XCI7XHJcblxyXG4gICAgICAgIC8vIFNwbGl0cyBkb2N1bWVudC5jb29raWUgb24gc2VtaWNvbG9ucyBpbnRvIGFuIGFycmF5LlxyXG4gICAgICAgIHZhciBjYTogc3RyaW5nW10gPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcclxuXHJcbiAgICAgICAgLy8gTG9vcHMgdGhyb3VnaCB0aGUgY2EgYXJyYXksIGFuZCByZWFkcyBvdXQgZWFjaCB2YWx1ZS5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgYzogc3RyaW5nID0gY2FbaV07XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT0gJyAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgY29va2llIGlzIGZvdW5kLCByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgY29va2llLlxyXG4gICAgICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWUpID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBjb29raWUgaXMgbm90IGZvdW5kLCByZXR1cm5zIGFuIGVtcHR5IHN0cmluZy5cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuXHJcbiAgICB9XHJcblxyXG59Il19