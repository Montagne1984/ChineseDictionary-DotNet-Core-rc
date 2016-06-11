/**
 * ANGULAR 2 LOCALIZATION
 * An Angular 2 library to translate messages, dates and numbers.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular2localization
 */
"use strict";
/**
 * Locale superclass.
 * Provides the methods for localization.
 *
 * Extend this class in components to provide the necessary methods for localization:
 *
 * export class AppComponent extends Locale {
 *
 *     constructor(public locale: LocaleService, public localization: LocalizationService) {
 *         super(locale, localization);
 *
 *     }
 *
 * }
 *
 * @author Roberto Simonetti
 */
var Locale = (function () {
    function Locale(locale, localization) {
        this.locale = locale;
        this.localization = localization;
    }
    Object.defineProperty(Locale.prototype, "lang", {
        // Gets the language code for the LocalizationService.
        get: function () {
            return this.localization.languageCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Locale.prototype, "defaultLocale", {
        // Gets the default locale.
        get: function () {
            return this.locale.getDefaultLocale();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Locale.prototype, "currency", {
        // Gets the current currency.
        get: function () {
            return this.locale.getCurrentCurrency();
        },
        enumerable: true,
        configurable: true
    });
    return Locale;
}());
exports.Locale = Locale;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9jYWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFNSDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNIO0lBRUksZ0JBQW1CLE1BQXNCLEVBQVMsWUFBa0M7UUFBakUsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBc0I7SUFBSSxDQUFDO0lBR3pGLHNCQUFJLHdCQUFJO1FBRFIsc0RBQXNEO2FBQ3REO1lBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDO1FBRTFDLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksaUNBQWE7UUFEakIsMkJBQTJCO2FBQzNCO1lBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUUxQyxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLDRCQUFRO1FBRFosNkJBQTZCO2FBQzdCO1lBRUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUU1QyxDQUFDOzs7T0FBQTtJQUVMLGFBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDO0FBekJZLGNBQU0sU0F5QmxCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQU5HVUxBUiAyIExPQ0FMSVpBVElPTlxyXG4gKiBBbiBBbmd1bGFyIDIgbGlicmFyeSB0byB0cmFuc2xhdGUgbWVzc2FnZXMsIGRhdGVzIGFuZCBudW1iZXJzLlxyXG4gKiBXcml0dGVuIGJ5IFJvYmVydG8gU2ltb25ldHRpLlxyXG4gKiBNSVQgbGljZW5zZS5cclxuICogaHR0cHM6Ly9naXRodWIuY29tL3JvYmlzaW03NC9hbmd1bGFyMmxvY2FsaXphdGlvblxyXG4gKi9cclxuXHJcbi8vIFNlcnZpY2VzLlxyXG5pbXBvcnQge0xvY2FsZVNlcnZpY2V9IGZyb20gJy4vbG9jYWxlLnNlcnZpY2UnO1xyXG5pbXBvcnQge0xvY2FsaXphdGlvblNlcnZpY2V9IGZyb20gJy4vbG9jYWxpemF0aW9uLnNlcnZpY2UnO1xyXG5cclxuLyoqXHJcbiAqIExvY2FsZSBzdXBlcmNsYXNzLlxyXG4gKiBQcm92aWRlcyB0aGUgbWV0aG9kcyBmb3IgbG9jYWxpemF0aW9uLlxyXG4gKiBcclxuICogRXh0ZW5kIHRoaXMgY2xhc3MgaW4gY29tcG9uZW50cyB0byBwcm92aWRlIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBmb3IgbG9jYWxpemF0aW9uOlxyXG4gKiBcclxuICogZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBleHRlbmRzIExvY2FsZSB7XHJcbiAqXHJcbiAqICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9jYWxlOiBMb2NhbGVTZXJ2aWNlLCBwdWJsaWMgbG9jYWxpemF0aW9uOiBMb2NhbGl6YXRpb25TZXJ2aWNlKSB7XHJcbiAqICAgICAgICAgc3VwZXIobG9jYWxlLCBsb2NhbGl6YXRpb24pO1xyXG4gKlxyXG4gKiAgICAgfVxyXG4gKlxyXG4gKiB9IFxyXG4gKiBcclxuICogQGF1dGhvciBSb2JlcnRvIFNpbW9uZXR0aVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvY2FsZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGxvY2FsZT86IExvY2FsZVNlcnZpY2UsIHB1YmxpYyBsb2NhbGl6YXRpb24/OiBMb2NhbGl6YXRpb25TZXJ2aWNlKSB7IH1cclxuXHJcbiAgICAvLyBHZXRzIHRoZSBsYW5ndWFnZSBjb2RlIGZvciB0aGUgTG9jYWxpemF0aW9uU2VydmljZS5cclxuICAgIGdldCBsYW5nKCk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsaXphdGlvbi5sYW5ndWFnZUNvZGU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldHMgdGhlIGRlZmF1bHQgbG9jYWxlLlxyXG4gICAgZ2V0IGRlZmF1bHRMb2NhbGUoKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlLmdldERlZmF1bHRMb2NhbGUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0cyB0aGUgY3VycmVudCBjdXJyZW5jeS5cclxuICAgIGdldCBjdXJyZW5jeSgpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGUuZ2V0Q3VycmVudEN1cnJlbmN5KCk7XHJcblxyXG4gICAgfVxyXG5cclxufSJdfQ==