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
var localization_service_1 = require('../services/localization.service');
var locale_service_1 = require('../services/locale.service');
var locale_number_1 = require('../services/locale-number');
var Intl_support_1 = require('../services/Intl-support');
/**
 * 'translate' pipe function.
 */
var TranslatePipe = (function () {
    function TranslatePipe(localization, locale) {
        this.localization = localization;
        this.locale = locale;
    }
    /**
     * TranslatePipe transform method.
     *
     * @param key The key to be translated
     * @param lang The current language code for the LocalizationService
     * @return The value of translation
     */
    TranslatePipe.prototype.transform = function (key, lang) {
        // Checks the service state.
        if (this.localization.serviceState == localization_service_1.ServiceState.isReady) {
            var REGEXP = /^\d+\b/;
            var keyStr = key;
            // i18n plural.
            if (REGEXP.exec(key) != null) {
                // Tries to extract the number.
                var keyNum = parseFloat(key);
                // Tries to extract the string. 
                keyStr = key.replace(REGEXP, '');
                keyStr = keyStr.trim();
                // Checks the number & support for Intl.
                if (!isNaN(keyNum) && Intl_support_1.IntlSupport.NumberFormat(this.locale.getDefaultLocale()) == true) {
                    // Localizes the number.
                    key = key.replace(/^\d+/, locale_number_1.LocaleNumber.format(this.locale.getDefaultLocale(), keyNum, intl_1.NumberFormatStyle.Decimal, '1.0-3'));
                }
            }
            // Gets the value of translation for the key string.
            var value = this.localization.translate(keyStr);
            return key.replace(keyStr, value);
        }
        return key;
    };
    TranslatePipe = __decorate([
        core_1.Pipe({
            name: 'translate',
            pure: true
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [localization_service_1.LocalizationService, locale_service_1.LocaleService])
    ], TranslatePipe);
    return TranslatePipe;
}());
exports.TranslatePipe = TranslatePipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFuc2xhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7O0FBRUgscUJBQThDLGVBQWUsQ0FBQyxDQUFBO0FBQzlELHFCQUFnQyxpQ0FBaUMsQ0FBQyxDQUFBO0FBRWxFLFlBQVk7QUFDWixxQ0FBZ0Qsa0NBQWtDLENBQUMsQ0FBQTtBQUNuRiwrQkFBNEIsNEJBQTRCLENBQUMsQ0FBQTtBQUN6RCw4QkFBMkIsMkJBQTJCLENBQUMsQ0FBQTtBQUN2RCw2QkFBMEIsMEJBQTBCLENBQUMsQ0FBQTtBQUVyRDs7R0FFRztBQXVEVztJQUVWLHVCQUFtQixZQUFpQyxFQUFTLE1BQXFCO1FBQS9ELGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBSSxDQUFDO0lBRXZGOzs7Ozs7T0FNRztJQUNILGlDQUFTLEdBQVQsVUFBVSxHQUFXLEVBQUUsSUFBWTtRQUUvQiw0QkFBNEI7UUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLElBQUksbUNBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRXpELElBQUksTUFBTSxHQUFXLFFBQVEsQ0FBQztZQUM5QixJQUFJLE1BQU0sR0FBVyxHQUFHLENBQUM7WUFFekIsZUFBZTtZQUNmLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFM0IsK0JBQStCO2dCQUMvQixJQUFJLE1BQU0sR0FBVyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRXJDLGdDQUFnQztnQkFDaEMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUV2Qix3Q0FBd0M7Z0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLDBCQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBRXJGLHdCQUF3QjtvQkFDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLDRCQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsd0JBQWlCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRS9ILENBQUM7WUFFTCxDQUFDO1lBRUQsb0RBQW9EO1lBQ3BELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWhELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV0QyxDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUVmLENBQUM7SUF0R0w7UUFBQyxXQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFtREQsaUJBQVUsRUFBRTs7cUJBQUE7SUFrRGIsb0JBQUM7QUFBRCxDQUFDLEFBbERhLElBa0RiO0FBbEQwQixxQkFBYSxnQkFrRHZDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQU5HVUxBUiAyIExPQ0FMSVpBVElPTlxyXG4gKiBBbiBBbmd1bGFyIDIgbGlicmFyeSB0byB0cmFuc2xhdGUgbWVzc2FnZXMsIGRhdGVzIGFuZCBudW1iZXJzLlxyXG4gKiBXcml0dGVuIGJ5IFJvYmVydG8gU2ltb25ldHRpLlxyXG4gKiBNSVQgbGljZW5zZS5cclxuICogaHR0cHM6Ly9naXRodWIuY29tL3JvYmlzaW03NC9hbmd1bGFyMmxvY2FsaXphdGlvblxyXG4gKi9cclxuXHJcbmltcG9ydCB7SW5qZWN0YWJsZSwgUGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TnVtYmVyRm9ybWF0U3R5bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9zcmMvZmFjYWRlL2ludGwnO1xyXG5cclxuLy8gU2VydmljZXMuXHJcbmltcG9ydCB7TG9jYWxpemF0aW9uU2VydmljZSwgU2VydmljZVN0YXRlfSBmcm9tICcuLi9zZXJ2aWNlcy9sb2NhbGl6YXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7TG9jYWxlU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvbG9jYWxlLnNlcnZpY2UnO1xyXG5pbXBvcnQge0xvY2FsZU51bWJlcn0gZnJvbSAnLi4vc2VydmljZXMvbG9jYWxlLW51bWJlcic7XHJcbmltcG9ydCB7SW50bFN1cHBvcnR9IGZyb20gJy4uL3NlcnZpY2VzL0ludGwtc3VwcG9ydCc7XHJcblxyXG4vKipcclxuICogJ3RyYW5zbGF0ZScgcGlwZSBmdW5jdGlvbi5cclxuICovXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICd0cmFuc2xhdGUnLFxyXG4gICAgcHVyZTogdHJ1ZVxyXG59KVxyXG5cclxuLyoqXHJcbiAqIFRyYW5zbGF0ZVBpcGUgY2xhc3MuXHJcbiAqIFRyYW5zbGF0ZXMgbWVzc2FnZXMuXHJcbiAqIFxyXG4gKiBHZXR0aW5nIHRoZSBtZXNzYWdlIHRyYW5zbGF0aW9uOlxyXG4gKiBcclxuICogZXhwcmVzc2lvbiB8IHRyYW5zbGF0ZTpsYW5nXHJcbiAqIFxyXG4gKiB3aGVyZSAnZXhwcmVzc2lvbicgaXMgYSBzdHJpbmcga2V5IHRoYXQgaW5kaWNhdGVzIHRoZSBtZXNzYWdlIHRvIHRyYW5zbGF0ZSBhbmQgJ2xhbmcnIGlzIHRoZSBsYW5ndWFnZSBjb2RlIGZvciB0aGUgTG9jYWxpemF0aW9uU2VydmljZS5cclxuICogXHJcbiAqIEZvciBleGFtcGxlLCB0byBnZXQgdGhlIHRyYW5zbGF0aW9uLCBhZGQgaW4gdGhlIHRlbXBsYXRlOlxyXG4gKiBcclxuICoge3sgJ1RJVExFJyB8IHRyYW5zbGF0ZTpsYW5nIH19XHJcbiAqIFxyXG4gKiBhbmQgaW5jbHVkZSBpbiB0aGUgY29tcG9uZW50OlxyXG4gKiBcclxuICogaW1wb3J0IHtMb2NhbGl6YXRpb25TZXJ2aWNlfSBmcm9tICdhbmd1bGFyMmxvY2FsaXphdGlvbi9hbmd1bGFyMmxvY2FsaXphdGlvbic7XHJcbiAqIGltcG9ydCB7VHJhbnNsYXRlUGlwZX0gZnJvbSAnYW5ndWxhcjJsb2NhbGl6YXRpb24vYW5ndWxhcjJsb2NhbGl6YXRpb24nO1xyXG4gKiBcclxuICogQENvbXBvbmVudCh7XHJcbiAqICAgICAuLi5cclxuICogICAgIHBpcGVzOiBbVHJhbnNsYXRlUGlwZV1cclxuICogfSlcclxuICogXHJcbiAqIGV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG4gKiBcclxuICogICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2NhbGl6YXRpb246IExvY2FsaXphdGlvblNlcnZpY2UpIHtcclxuICogICAgICAgICAuLi5cclxuICogICAgIH1cclxuICogXHJcbiAqICAgICAvLyBHZXRzIHRoZSBsYW5ndWFnZSBjb2RlIGZvciB0aGUgTG9jYWxpemF0aW9uU2VydmljZS5cclxuICogICAgIGdldCBsYW5nKCk6IHN0cmluZyB7XHJcbiAqXHJcbiAqICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxpemF0aW9uLmxhbmd1YWdlQ29kZTtcclxuICogICAgICBcclxuICogICAgIH1cclxuICogXHJcbiAqIH1cclxuICogXHJcbiAqIFdpdGggQW5ndWxhciAyIEkxOG5TZWxlY3RQaXBlIHRoYXQgZGlzcGxheXMgdGhlIHN0cmluZyB0aGF0IG1hdGNoZXMgdGhlIGN1cnJlbnQgdmFsdWU6XHJcbiAqXHJcbiAqIHt7IGV4cHJlc3Npb24gfCBpMThuU2VsZWN0Om1hcHBpbmcgfCB0cmFuc2xhdGU6bGFuZyB9fVxyXG4gKiBcclxuICogV2l0aCBBbmd1bGFyIDIgSTE4blBsdXJhbFBpcGUgdGhhdCBwbHVyYWxpemVzIHRoZSB2YWx1ZSBwcm9wZXJseTpcclxuICpcclxuICoge3sgZXhwcmVzc2lvbiB8IGkxOG5QbHVyYWw6bWFwcGluZyB8IHRyYW5zbGF0ZTpsYW5nIH19XHJcbiAqIFxyXG4gKiBAYXV0aG9yIFJvYmVydG8gU2ltb25ldHRpXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpIGV4cG9ydCBjbGFzcyBUcmFuc2xhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGxvY2FsaXphdGlvbjogTG9jYWxpemF0aW9uU2VydmljZSwgcHVibGljIGxvY2FsZTogTG9jYWxlU2VydmljZSkgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGVQaXBlIHRyYW5zZm9ybSBtZXRob2QuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBiZSB0cmFuc2xhdGVkXHJcbiAgICAgKiBAcGFyYW0gbGFuZyBUaGUgY3VycmVudCBsYW5ndWFnZSBjb2RlIGZvciB0aGUgTG9jYWxpemF0aW9uU2VydmljZVxyXG4gICAgICogQHJldHVybiBUaGUgdmFsdWUgb2YgdHJhbnNsYXRpb25cclxuICAgICAqL1xyXG4gICAgdHJhbnNmb3JtKGtleTogc3RyaW5nLCBsYW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICAvLyBDaGVja3MgdGhlIHNlcnZpY2Ugc3RhdGUuXHJcbiAgICAgICAgaWYgKHRoaXMubG9jYWxpemF0aW9uLnNlcnZpY2VTdGF0ZSA9PSBTZXJ2aWNlU3RhdGUuaXNSZWFkeSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIFJFR0VYUDogUmVnRXhwID0gL15cXGQrXFxiLztcclxuICAgICAgICAgICAgdmFyIGtleVN0cjogc3RyaW5nID0ga2V5O1xyXG5cclxuICAgICAgICAgICAgLy8gaTE4biBwbHVyYWwuXHJcbiAgICAgICAgICAgIGlmIChSRUdFWFAuZXhlYyhrZXkpICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcmllcyB0byBleHRyYWN0IHRoZSBudW1iZXIuXHJcbiAgICAgICAgICAgICAgICB2YXIga2V5TnVtOiBudW1iZXIgPSBwYXJzZUZsb2F0KGtleSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVHJpZXMgdG8gZXh0cmFjdCB0aGUgc3RyaW5nLiBcclxuICAgICAgICAgICAgICAgIGtleVN0ciA9IGtleS5yZXBsYWNlKFJFR0VYUCwgJycpO1xyXG4gICAgICAgICAgICAgICAga2V5U3RyID0ga2V5U3RyLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVja3MgdGhlIG51bWJlciAmIHN1cHBvcnQgZm9yIEludGwuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKGtleU51bSkgJiYgSW50bFN1cHBvcnQuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLmdldERlZmF1bHRMb2NhbGUoKSkgPT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBMb2NhbGl6ZXMgdGhlIG51bWJlci5cclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXkucmVwbGFjZSgvXlxcZCsvLCBMb2NhbGVOdW1iZXIuZm9ybWF0KHRoaXMubG9jYWxlLmdldERlZmF1bHRMb2NhbGUoKSwga2V5TnVtLCBOdW1iZXJGb3JtYXRTdHlsZS5EZWNpbWFsLCAnMS4wLTMnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gR2V0cyB0aGUgdmFsdWUgb2YgdHJhbnNsYXRpb24gZm9yIHRoZSBrZXkgc3RyaW5nLlxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmxvY2FsaXphdGlvbi50cmFuc2xhdGUoa2V5U3RyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBrZXkucmVwbGFjZShrZXlTdHIsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ga2V5O1xyXG5cclxuICAgIH1cclxuXHJcbn0iXX0=