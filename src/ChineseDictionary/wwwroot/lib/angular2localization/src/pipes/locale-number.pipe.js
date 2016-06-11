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
var intl_1 = require('@angular/common/src/facade/intl');
// Services.
var locale_number_1 = require('../services/locale-number');
var Intl_support_1 = require('../services/Intl-support');
/**
 * 'localedecimal' pipe function.
 */
var LocaleDecimalPipe = (function () {
    function LocaleDecimalPipe() {
    }
    /**
     * LocaleDecimalPipe transform method.
     *
     * @param value The number to be localized
     * @param defaultLocale The default locale
     * @param digits The format of the number
     * @return The locale decimal
     */
    LocaleDecimalPipe.prototype.transform = function (value, defaultLocale, digits) {
        if (digits === void 0) { digits = null; }
        // Checks for support for Intl.
        if (Intl_support_1.IntlSupport.NumberFormat(defaultLocale) == true) {
            return locale_number_1.LocaleNumber.format(defaultLocale, value, intl_1.NumberFormatStyle.Decimal, digits);
        }
        // Returns the number without localization.
        return value;
    };
    LocaleDecimalPipe = __decorate([
        core_1.Pipe({
            name: 'localedecimal',
            pure: true
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocaleDecimalPipe);
    return LocaleDecimalPipe;
}());
exports.LocaleDecimalPipe = LocaleDecimalPipe;
/**
 * 'localepercent' pipe function.
 */
var LocalePercentPipe = (function () {
    function LocalePercentPipe() {
    }
    /**
     * LocalePercentPipe transform method.
     *
     * @param value The number to be localized
     * @param defaultLocale The default locale
     * @param digits The format of the number
     * @return The locale percent
     */
    LocalePercentPipe.prototype.transform = function (value, defaultLocale, digits) {
        if (digits === void 0) { digits = null; }
        // Checks for support for Intl.
        if (Intl_support_1.IntlSupport.NumberFormat(defaultLocale) == true) {
            return locale_number_1.LocaleNumber.format(defaultLocale, value, intl_1.NumberFormatStyle.Percent, digits);
        }
        // Returns the number without localization.
        return value;
    };
    LocalePercentPipe = __decorate([
        core_1.Pipe({
            name: 'localepercent',
            pure: true
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocalePercentPipe);
    return LocalePercentPipe;
}());
exports.LocalePercentPipe = LocalePercentPipe;
/**
 * 'localecurrency' pipe function.
 */
var LocaleCurrencyPipe = (function () {
    function LocaleCurrencyPipe() {
    }
    /**
     * LocaleCurrencyPipe transform method.
     *
     * @param value The number to be localized
     * @param defaultLocale The default locale
     * @param currency The current currency
     * @param symbolDisplay Indicates whether to use the currency symbol
     * @param digits The format of the number
     * @return The locale currency
     */
    LocaleCurrencyPipe.prototype.transform = function (value, defaultLocale, currency, symbolDisplay, digits) {
        if (symbolDisplay === void 0) { symbolDisplay = false; }
        if (digits === void 0) { digits = null; }
        // Checks for support for Intl.
        if (Intl_support_1.IntlSupport.NumberFormat(defaultLocale) == true) {
            return locale_number_1.LocaleNumber.format(defaultLocale, value, intl_1.NumberFormatStyle.Currency, digits, currency, symbolDisplay);
        }
        // Returns the number without localization & currency.
        return value + " " + currency;
    };
    LocaleCurrencyPipe = __decorate([
        core_1.Pipe({
            name: 'localecurrency',
            pure: true
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocaleCurrencyPipe);
    return LocaleCurrencyPipe;
}());
exports.LocaleCurrencyPipe = LocaleCurrencyPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLW51bWJlci5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9jYWxlLW51bWJlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7QUFFSCxxQkFBOEMsZUFBZSxDQUFDLENBQUE7QUFDOUQscUJBQWdDLGlDQUFpQyxDQUFDLENBQUE7QUFFbEUsWUFBWTtBQUNaLDhCQUEyQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3ZELDZCQUEwQiwwQkFBMEIsQ0FBQyxDQUFBO0FBRXJEOztHQUVHO0FBa0RXO0lBRVY7SUFBZ0IsQ0FBQztJQUVqQjs7Ozs7OztPQU9HO0lBQ0gscUNBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxhQUFxQixFQUFFLE1BQXFCO1FBQXJCLHNCQUFxQixHQUFyQixhQUFxQjtRQUU5RCwrQkFBK0I7UUFDL0IsRUFBRSxDQUFDLENBQUMsMEJBQVcsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVsRCxNQUFNLENBQUMsNEJBQVksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSx3QkFBaUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFeEYsQ0FBQztRQUVELDJDQUEyQztRQUMzQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBRWpCLENBQUM7SUF6RUw7UUFBQyxXQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsZUFBZTtZQUNyQixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7UUE4Q0QsaUJBQVUsRUFBRTs7eUJBQUE7SUEwQmIsd0JBQUM7QUFBRCxDQUFDLEFBMUJhLElBMEJiO0FBMUIwQix5QkFBaUIsb0JBMEIzQyxDQUFBO0FBRUQ7O0dBRUc7QUE4Q1c7SUFFVjtJQUFnQixDQUFDO0lBRWpCOzs7Ozs7O09BT0c7SUFDSCxxQ0FBUyxHQUFULFVBQVUsS0FBVSxFQUFFLGFBQXFCLEVBQUUsTUFBcUI7UUFBckIsc0JBQXFCLEdBQXJCLGFBQXFCO1FBRTlELCtCQUErQjtRQUMvQixFQUFFLENBQUMsQ0FBQywwQkFBVyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRWxELE1BQU0sQ0FBQyw0QkFBWSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLHdCQUFpQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV4RixDQUFDO1FBRUQsMkNBQTJDO1FBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFFakIsQ0FBQztJQXJFTDtRQUFDLFdBQUksQ0FBQztZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQztRQTBDRCxpQkFBVSxFQUFFOzt5QkFBQTtJQTBCYix3QkFBQztBQUFELENBQUMsQUExQmEsSUEwQmI7QUExQjBCLHlCQUFpQixvQkEwQjNDLENBQUE7QUFFRDs7R0FFRztBQXVEVztJQUVWO0lBQWdCLENBQUM7SUFFakI7Ozs7Ozs7OztPQVNHO0lBQ0gsc0NBQVMsR0FBVCxVQUFVLEtBQVUsRUFDaEIsYUFBcUIsRUFDckIsUUFBZ0IsRUFDaEIsYUFBOEIsRUFDOUIsTUFBcUI7UUFEckIsNkJBQThCLEdBQTlCLHFCQUE4QjtRQUM5QixzQkFBcUIsR0FBckIsYUFBcUI7UUFFckIsK0JBQStCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLDBCQUFXLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFbEQsTUFBTSxDQUFDLDRCQUFZLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsd0JBQWlCLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFbEgsQ0FBQztRQUVELHNEQUFzRDtRQUN0RCxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUM7SUFFbEMsQ0FBQztJQXBGTDtRQUFDLFdBQUksQ0FBQztZQUNGLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO1FBbURELGlCQUFVLEVBQUU7OzBCQUFBO0lBZ0NiLHlCQUFDO0FBQUQsQ0FBQyxBQWhDYSxJQWdDYjtBQWhDMEIsMEJBQWtCLHFCQWdDNUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBTkdVTEFSIDIgTE9DQUxJWkFUSU9OXHJcbiAqIEFuIEFuZ3VsYXIgMiBsaWJyYXJ5IHRvIHRyYW5zbGF0ZSBtZXNzYWdlcywgZGF0ZXMgYW5kIG51bWJlcnMuXHJcbiAqIFdyaXR0ZW4gYnkgUm9iZXJ0byBTaW1vbmV0dGkuXHJcbiAqIE1JVCBsaWNlbnNlLlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vcm9iaXNpbTc0L2FuZ3VsYXIybG9jYWxpemF0aW9uXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtJbmplY3RhYmxlLCBQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOdW1iZXJGb3JtYXRTdHlsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL3NyYy9mYWNhZGUvaW50bCc7XHJcblxyXG4vLyBTZXJ2aWNlcy5cclxuaW1wb3J0IHtMb2NhbGVOdW1iZXJ9IGZyb20gJy4uL3NlcnZpY2VzL2xvY2FsZS1udW1iZXInO1xyXG5pbXBvcnQge0ludGxTdXBwb3J0fSBmcm9tICcuLi9zZXJ2aWNlcy9JbnRsLXN1cHBvcnQnO1xyXG5cclxuLyoqXHJcbiAqICdsb2NhbGVkZWNpbWFsJyBwaXBlIGZ1bmN0aW9uLlxyXG4gKi9cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2xvY2FsZWRlY2ltYWwnLFxyXG4gICAgcHVyZTogdHJ1ZVxyXG59KVxyXG5cclxuLyoqXHJcbiAqIExvY2FsZURlY2ltYWxQaXBlIGNsYXNzLlxyXG4gKiBMb2NhbGl6ZXMgZGVjaW1hbCBudW1iZXJzLlxyXG4gKiBcclxuICogR2V0dGluZyB0aGUgbG9jYWwgZGVjaW1hbDpcclxuICogXHJcbiAqIGV4cHJlc3Npb24gfCBsb2NhbGVkZWNpbWFsWzpkZWZhdWx0TG9jYWxlOltkaWdpdEluZm9dXVxyXG4gKiBcclxuICogd2hlcmUgJ2V4cHJlc3Npb24nIGlzIGEgbnVtYmVyIGFuZCAnZGlnaXRJbmZvJyBoYXMgdGhlIGZvbGxvd2luZyBmb3JtYXQ6XHJcbiAqIFxyXG4gKiB7bWluSW50ZWdlckRpZ2l0c30ue21pbkZyYWN0aW9uRGlnaXRzfS17bWF4RnJhY3Rpb25EaWdpdHN9XHJcbiAqIFxyXG4gKiBGb3IgZXhhbXBsZSwgdG8gZ2V0IHRoZSBsb2NhbCBkZWNpbWFsLCBhZGQgaW4gdGhlIHRlbXBsYXRlOlxyXG4gKiBcclxuICoge3sgcGkgfCBsb2NhbGVkZWNpbWFsOmRlZmF1bHRMb2NhbGU6JzEuNS01JyB9fVxyXG4gKiBcclxuICogYW5kIGluY2x1ZGUgaW4gdGhlIGNvbXBvbmVudDpcclxuICogXHJcbiAqIGltcG9ydCB7TG9jYWxlU2VydmljZX0gZnJvbSAnYW5ndWxhcjJsb2NhbGl6YXRpb24vYW5ndWxhcjJsb2NhbGl6YXRpb24nO1xyXG4gKiBpbXBvcnQge0xvY2FsZURlY2ltYWxQaXBlfSBmcm9tICdhbmd1bGFyMmxvY2FsaXphdGlvbi9hbmd1bGFyMmxvY2FsaXphdGlvbic7XHJcbiAqIFxyXG4gKiBAQ29tcG9uZW50KHtcclxuICogICAgIC4uLlxyXG4gKiAgICAgcGlwZXM6IFtMb2NhbGVEZWNpbWFsUGlwZV1cclxuICogfSlcclxuICogXHJcbiAqIGV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG4gKiBcclxuICogICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2NhbGU6IExvY2FsZVNlcnZpY2UpIHtcclxuICogICAgICAgICAuLi5cclxuICogICAgIH1cclxuICogXHJcbiAqICAgICAvLyBHZXRzIHRoZSBkZWZhdWx0IGxvY2FsZS5cclxuICogICAgIGdldCBkZWZhdWx0TG9jYWxlKCk6IHN0cmluZyB7XHJcbiAqXHJcbiAqICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlLmdldERlZmF1bHRMb2NhbGUoKTtcclxuICogICAgICBcclxuICogICAgIH1cclxuICogXHJcbiAqIH1cclxuICogXHJcbiAqIEBhdXRob3IgUm9iZXJ0byBTaW1vbmV0dGlcclxuICogQHNlZSBBbmd1bGFyIDIgRGVjaW1hbFBpcGUgZm9yIGZ1cnRoZXIgaW5mb3JtYXRpb25cclxuICovXHJcbkBJbmplY3RhYmxlKCkgZXhwb3J0IGNsYXNzIExvY2FsZURlY2ltYWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvY2FsZURlY2ltYWxQaXBlIHRyYW5zZm9ybSBtZXRob2QuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgbnVtYmVyIHRvIGJlIGxvY2FsaXplZFxyXG4gICAgICogQHBhcmFtIGRlZmF1bHRMb2NhbGUgVGhlIGRlZmF1bHQgbG9jYWxlXHJcbiAgICAgKiBAcGFyYW0gZGlnaXRzIFRoZSBmb3JtYXQgb2YgdGhlIG51bWJlclxyXG4gICAgICogQHJldHVybiBUaGUgbG9jYWxlIGRlY2ltYWxcclxuICAgICAqL1xyXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGRlZmF1bHRMb2NhbGU6IHN0cmluZywgZGlnaXRzOiBzdHJpbmcgPSBudWxsKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2tzIGZvciBzdXBwb3J0IGZvciBJbnRsLlxyXG4gICAgICAgIGlmIChJbnRsU3VwcG9ydC5OdW1iZXJGb3JtYXQoZGVmYXVsdExvY2FsZSkgPT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIExvY2FsZU51bWJlci5mb3JtYXQoZGVmYXVsdExvY2FsZSwgdmFsdWUsIE51bWJlckZvcm1hdFN0eWxlLkRlY2ltYWwsIGRpZ2l0cyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJucyB0aGUgbnVtYmVyIHdpdGhvdXQgbG9jYWxpemF0aW9uLlxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogJ2xvY2FsZXBlcmNlbnQnIHBpcGUgZnVuY3Rpb24uXHJcbiAqL1xyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnbG9jYWxlcGVyY2VudCcsXHJcbiAgICBwdXJlOiB0cnVlXHJcbn0pXHJcblxyXG4vKipcclxuICogTG9jYWxlUGVyY2VudFBpcGUgY2xhc3MuXHJcbiAqIExvY2FsaXplcyBwZXJjZW50IG51bWJlcnMuXHJcbiAqIFxyXG4gKiBHZXR0aW5nIHRoZSBsb2NhbCBwZXJjZW50YWdlOlxyXG4gKiBcclxuICogZXhwcmVzc2lvbiB8IGxvY2FsZXBlcmNlbnRbOmRlZmF1bHRMb2NhbGU6W2RpZ2l0SW5mb11dXHJcbiAqIFxyXG4gKiBGb3IgZXhhbXBsZSwgdG8gZ2V0IHRoZSBsb2NhbCBwZXJjZW50YWdlLCBhZGQgaW4gdGhlIHRlbXBsYXRlOlxyXG4gKiBcclxuICoge3sgYSB8IGxvY2FsZXBlcmNlbnQ6ZGVmYXVsdExvY2FsZTonMS4xLTEnIH19XHJcbiAqIFxyXG4gKiBhbmQgaW5jbHVkZSBpbiB0aGUgY29tcG9uZW50OlxyXG4gKiBcclxuICogaW1wb3J0IHtMb2NhbGVTZXJ2aWNlfSBmcm9tICdhbmd1bGFyMmxvY2FsaXphdGlvbi9hbmd1bGFyMmxvY2FsaXphdGlvbic7XHJcbiAqIGltcG9ydCB7TG9jYWxlUGVyY2VudFBpcGV9IGZyb20gJ2FuZ3VsYXIybG9jYWxpemF0aW9uL2FuZ3VsYXIybG9jYWxpemF0aW9uJztcclxuICogXHJcbiAqIEBDb21wb25lbnQoe1xyXG4gKiAgICAgLi4uXHJcbiAqICAgICBwaXBlczogW0xvY2FsZVBlcmNlbnRQaXBlXVxyXG4gKiB9KVxyXG4gKiBcclxuICogZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XHJcbiAqIFxyXG4gKiAgICAgY29uc3RydWN0b3IocHVibGljIGxvY2FsZTogTG9jYWxlU2VydmljZSkge1xyXG4gKiAgICAgICAgIC4uLlxyXG4gKiAgICAgfVxyXG4gKiBcclxuICogICAgIC8vIEdldHMgdGhlIGRlZmF1bHQgbG9jYWxlLlxyXG4gKiAgICAgZ2V0IGRlZmF1bHRMb2NhbGUoKTogc3RyaW5nIHtcclxuICpcclxuICogICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGUuZ2V0RGVmYXVsdExvY2FsZSgpO1xyXG4gKiAgICAgIFxyXG4gKiAgICAgfVxyXG4gKiBcclxuICogfVxyXG4gKiBcclxuICogQGF1dGhvciBSb2JlcnRvIFNpbW9uZXR0aVxyXG4gKiBAc2VlIEFuZ3VsYXIgMiBQZXJjZW50UGlwZSBmb3IgZnVydGhlciBpbmZvcm1hdGlvblxyXG4gKi9cclxuQEluamVjdGFibGUoKSBleHBvcnQgY2xhc3MgTG9jYWxlUGVyY2VudFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9jYWxlUGVyY2VudFBpcGUgdHJhbnNmb3JtIG1ldGhvZC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSBudW1iZXIgdG8gYmUgbG9jYWxpemVkXHJcbiAgICAgKiBAcGFyYW0gZGVmYXVsdExvY2FsZSBUaGUgZGVmYXVsdCBsb2NhbGVcclxuICAgICAqIEBwYXJhbSBkaWdpdHMgVGhlIGZvcm1hdCBvZiB0aGUgbnVtYmVyXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBsb2NhbGUgcGVyY2VudFxyXG4gICAgICovXHJcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgZGVmYXVsdExvY2FsZTogc3RyaW5nLCBkaWdpdHM6IHN0cmluZyA9IG51bGwpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICAvLyBDaGVja3MgZm9yIHN1cHBvcnQgZm9yIEludGwuXHJcbiAgICAgICAgaWYgKEludGxTdXBwb3J0Lk51bWJlckZvcm1hdChkZWZhdWx0TG9jYWxlKSA9PSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gTG9jYWxlTnVtYmVyLmZvcm1hdChkZWZhdWx0TG9jYWxlLCB2YWx1ZSwgTnVtYmVyRm9ybWF0U3R5bGUuUGVyY2VudCwgZGlnaXRzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm5zIHRoZSBudW1iZXIgd2l0aG91dCBsb2NhbGl6YXRpb24uXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiAnbG9jYWxlY3VycmVuY3knIHBpcGUgZnVuY3Rpb24uXHJcbiAqL1xyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnbG9jYWxlY3VycmVuY3knLFxyXG4gICAgcHVyZTogdHJ1ZVxyXG59KVxyXG5cclxuLyoqXHJcbiAqIExvY2FsZUN1cnJlbmN5UGlwZSBjbGFzcy5cclxuICogTG9jYWxpemVzIGN1cnJlbmNpZXMuXHJcbiAqIFxyXG4gKiBHZXR0aW5nIHRoZSBsb2NhbCBjdXJyZW5jeTpcclxuICogXHJcbiAqIGV4cHJlc3Npb24gfCBsb2NhbGVjdXJyZW5jeVs6ZGVmYXVsdExvY2FsZVs6Y3VycmVuY3lbOnN5bWJvbERpc3BsYXlbOmRpZ2l0SW5mb11dXV1cclxuICogXHJcbiAqIHdoZXJlICdzeW1ib2xEaXNwbGF5JyBpcyBhIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRvIHVzZSB0aGUgY3VycmVuY3kgc3ltYm9sIChlLmcuICQpIG9yIHRoZSBjdXJyZW5jeSBjb2RlIChlLmcuIFVTRCkgaW4gdGhlIG91dHB1dC4gXHJcbiAqIFxyXG4gKiBGb3IgZXhhbXBsZSwgdG8gZ2V0IHRoZSBsb2NhbCBjdXJyZW5jeSwgYWRkIGluIHRoZSB0ZW1wbGF0ZTpcclxuICogXHJcbiAqIHt7IGIgfCBsb2NhbGVjdXJyZW5jeTpkZWZhdWx0TG9jYWxlOmN1cnJlbmN5OnRydWU6JzEuMi0yJyB9fVxyXG4gKiBcclxuICogYW5kIGluY2x1ZGUgaW4gdGhlIGNvbXBvbmVudDpcclxuICogXHJcbiAqIGltcG9ydCB7TG9jYWxlU2VydmljZX0gZnJvbSAnYW5ndWxhcjJsb2NhbGl6YXRpb24vYW5ndWxhcjJsb2NhbGl6YXRpb24nO1xyXG4gKiBpbXBvcnQge0xvY2FsZUN1cnJlbmN5UGlwZX0gZnJvbSAnYW5ndWxhcjJsb2NhbGl6YXRpb24vYW5ndWxhcjJsb2NhbGl6YXRpb24nO1xyXG4gKiBcclxuICogQENvbXBvbmVudCh7XHJcbiAqICAgICAuLi5cclxuICogICAgIHBpcGVzOiBbTG9jYWxlQ3VycmVuY3lQaXBlXVxyXG4gKiB9KVxyXG4gKiBcclxuICogZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XHJcbiAqIFxyXG4gKiAgICAgY29uc3RydWN0b3IocHVibGljIGxvY2FsZTogTG9jYWxlU2VydmljZSkge1xyXG4gKiAgICAgICAgIC4uLlxyXG4gKiAgICAgfVxyXG4gKiBcclxuICogICAgIC8vIEdldHMgdGhlIGRlZmF1bHQgbG9jYWxlLlxyXG4gKiAgICAgZ2V0IGRlZmF1bHRMb2NhbGUoKTogc3RyaW5nIHtcclxuICpcclxuICogICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGUuZ2V0RGVmYXVsdExvY2FsZSgpO1xyXG4gKiAgICAgIFxyXG4gKiAgICAgfVxyXG4gKiBcclxuICogICAgIC8vIEdldHMgdGhlIGN1cnJlbnQgY3VycmVuY3kuXHJcbiAqICAgICBnZXQgY3VycmVuY3koKTogc3RyaW5nIHtcclxuICpcclxuICogICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGUuZ2V0Q3VycmVudEN1cnJlbmN5KCk7XHJcbiAqICAgICAgXHJcbiAqICAgICB9XHJcbiAqIFxyXG4gKiB9XHJcbiAqIFxyXG4gKiBAYXV0aG9yIFJvYmVydG8gU2ltb25ldHRpXHJcbiAqIEBzZWUgQW5ndWxhciAyIEN1cnJlbmN5UGlwZSBmb3IgZnVydGhlciBpbmZvcm1hdGlvblxyXG4gKi9cclxuQEluamVjdGFibGUoKSBleHBvcnQgY2xhc3MgTG9jYWxlQ3VycmVuY3lQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvY2FsZUN1cnJlbmN5UGlwZSB0cmFuc2Zvcm0gbWV0aG9kLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIG51bWJlciB0byBiZSBsb2NhbGl6ZWRcclxuICAgICAqIEBwYXJhbSBkZWZhdWx0TG9jYWxlIFRoZSBkZWZhdWx0IGxvY2FsZVxyXG4gICAgICogQHBhcmFtIGN1cnJlbmN5IFRoZSBjdXJyZW50IGN1cnJlbmN5XHJcbiAgICAgKiBAcGFyYW0gc3ltYm9sRGlzcGxheSBJbmRpY2F0ZXMgd2hldGhlciB0byB1c2UgdGhlIGN1cnJlbmN5IHN5bWJvbFxyXG4gICAgICogQHBhcmFtIGRpZ2l0cyBUaGUgZm9ybWF0IG9mIHRoZSBudW1iZXJcclxuICAgICAqIEByZXR1cm4gVGhlIGxvY2FsZSBjdXJyZW5jeVxyXG4gICAgICovXHJcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSxcclxuICAgICAgICBkZWZhdWx0TG9jYWxlOiBzdHJpbmcsXHJcbiAgICAgICAgY3VycmVuY3k6IHN0cmluZyxcclxuICAgICAgICBzeW1ib2xEaXNwbGF5OiBib29sZWFuID0gZmFsc2UsXHJcbiAgICAgICAgZGlnaXRzOiBzdHJpbmcgPSBudWxsKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2tzIGZvciBzdXBwb3J0IGZvciBJbnRsLlxyXG4gICAgICAgIGlmIChJbnRsU3VwcG9ydC5OdW1iZXJGb3JtYXQoZGVmYXVsdExvY2FsZSkgPT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIExvY2FsZU51bWJlci5mb3JtYXQoZGVmYXVsdExvY2FsZSwgdmFsdWUsIE51bWJlckZvcm1hdFN0eWxlLkN1cnJlbmN5LCBkaWdpdHMsIGN1cnJlbmN5LCBzeW1ib2xEaXNwbGF5KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm5zIHRoZSBudW1iZXIgd2l0aG91dCBsb2NhbGl6YXRpb24gJiBjdXJyZW5jeS5cclxuICAgICAgICByZXR1cm4gdmFsdWUgKyBcIiBcIiArIGN1cnJlbmN5O1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19