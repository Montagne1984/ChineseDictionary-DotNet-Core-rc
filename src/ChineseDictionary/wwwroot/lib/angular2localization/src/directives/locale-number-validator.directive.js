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
var common_1 = require('@angular/common');
// Services.
var locale_service_1 = require('../services/locale.service');
var locale_parser_1 = require('../services/locale-parser');
/**
 * Function that takes a Control and returns either null when it’s valid, or and error object if it’s not.
 *
 * @param locale The reference to LocaleService
 * @param digits The format of the number
 * @param MIN_VALUE The minimum value for the number
 * @param MAX_VALUE The maximum value for the number
 * @return An error object: 'format', 'minValue' or 'maxValue'; null in case the value is valid
 */
function validateLocaleNumber(locale, digits, MIN_VALUE, MAX_VALUE) {
    if (MIN_VALUE === void 0) { MIN_VALUE = Number.MIN_VALUE; }
    if (MAX_VALUE === void 0) { MAX_VALUE = Number.MAX_VALUE; }
    var defaultLocale;
    var NUMBER_REGEXP;
    return function (c) {
        // Checks if the default locale has changed. 
        if (defaultLocale != locale.getDefaultLocale()) {
            NUMBER_REGEXP = locale_parser_1.LocaleParser.NumberRegExpFactory(locale.getDefaultLocale(), digits);
            defaultLocale = locale.getDefaultLocale();
        }
        // Checks the format.
        if (NUMBER_REGEXP.test(c.value)) {
            var parsedValue;
            parsedValue = locale_parser_1.LocaleParser.Number(c.value, locale.getDefaultLocale());
            if (parsedValue < MIN_VALUE) {
                return { minValue: false };
            }
            else if (parsedValue > MAX_VALUE) {
                return { maxValue: false };
            }
            return null; // The number is valid.
        }
        else {
            return { format: false };
        }
    };
}
exports.validateLocaleNumber = validateLocaleNumber;
var LocaleNumberValidator = (function () {
    function LocaleNumberValidator(locale) {
        this.locale = locale;
        this.MIN_VALUE = Number.MIN_VALUE;
        this.MAX_VALUE = Number.MAX_VALUE;
    }
    Object.defineProperty(LocaleNumberValidator.prototype, "minValue", {
        set: function (value) {
            this.MIN_VALUE = value || this.MIN_VALUE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocaleNumberValidator.prototype, "maxValue", {
        set: function (value) {
            this.MAX_VALUE = value || this.MAX_VALUE;
        },
        enumerable: true,
        configurable: true
    });
    LocaleNumberValidator.prototype.ngOnInit = function () {
        this.validator = validateLocaleNumber(this.locale, this.digits, this.MIN_VALUE, this.MAX_VALUE);
    };
    LocaleNumberValidator.prototype.validate = function (c) {
        return this.validator(c);
    };
    __decorate([
        core_1.Input('validateLocaleNumber'), 
        __metadata('design:type', String)
    ], LocaleNumberValidator.prototype, "digits", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], LocaleNumberValidator.prototype, "minValue", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], LocaleNumberValidator.prototype, "maxValue", null);
    LocaleNumberValidator = __decorate([
        core_1.Directive({
            selector: '[validateLocaleNumber][ngControl],[validateLocaleNumber][ngModel],[validateLocaleNumber][ngFormControl]',
            providers: [
                core_1.provide(common_1.NG_VALIDATORS, {
                    useExisting: core_1.forwardRef(function () { return LocaleNumberValidator; }),
                    multi: true
                })
            ]
        }), 
        __metadata('design:paramtypes', [locale_service_1.LocaleService])
    ], LocaleNumberValidator);
    return LocaleNumberValidator;
}());
exports.LocaleNumberValidator = LocaleNumberValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLW51bWJlci12YWxpZGF0b3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9jYWxlLW51bWJlci12YWxpZGF0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7QUFFSCxxQkFBNEQsZUFBZSxDQUFDLENBQUE7QUFDNUUsdUJBQWdELGlCQUFpQixDQUFDLENBQUE7QUFFbEUsWUFBWTtBQUNaLCtCQUE0Qiw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3pELDhCQUEyQiwyQkFBMkIsQ0FBQyxDQUFBO0FBRXZEOzs7Ozs7OztHQVFHO0FBQ0gsOEJBQXFDLE1BQXFCLEVBQUUsTUFBYyxFQUFFLFNBQW9DLEVBQUUsU0FBb0M7SUFBMUUseUJBQW9DLEdBQXBDLFlBQW9CLE1BQU0sQ0FBQyxTQUFTO0lBQUUseUJBQW9DLEdBQXBDLFlBQW9CLE1BQU0sQ0FBQyxTQUFTO0lBRWxKLElBQUksYUFBcUIsQ0FBQztJQUMxQixJQUFJLGFBQXFCLENBQUM7SUFFMUIsTUFBTSxDQUFDLFVBQUMsQ0FBVTtRQUVkLDZDQUE2QztRQUM3QyxFQUFFLENBQUMsQ0FBQyxhQUFhLElBQUksTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRTdDLGFBQWEsR0FBRyw0QkFBWSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3BGLGFBQWEsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUU5QyxDQUFDO1FBRUQscUJBQXFCO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5QixJQUFJLFdBQW1CLENBQUM7WUFFeEIsV0FBVyxHQUFHLDRCQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUV0RSxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFFMUIsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO1lBRS9CLENBQUM7WUFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBRS9CLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQztZQUUvQixDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLHVCQUF1QjtRQUV4QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFSixNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFFN0IsQ0FBQztJQUVMLENBQUMsQ0FBQztBQUVOLENBQUM7QUE1Q2UsNEJBQW9CLHVCQTRDbkMsQ0FBQTtBQWtCRDtJQXlCSSwrQkFBbUIsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQXZCaEMsY0FBUyxHQUFXLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFFckMsY0FBUyxHQUFXLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFxQkQsQ0FBQztJQWRwQyxzQkFBSSwyQ0FBUTthQUFaLFVBQWEsS0FBYTtZQUUvQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRTdDLENBQUM7OztPQUFBO0lBRVEsc0JBQUksMkNBQVE7YUFBWixVQUFhLEtBQWE7WUFFL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUU3QyxDQUFDOzs7T0FBQTtJQU1ELHdDQUFRLEdBQVI7UUFFSSxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVwRyxDQUFDO0lBRUQsd0NBQVEsR0FBUixVQUFTLENBQVU7UUFFZixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU3QixDQUFDO0lBNUJEO1FBQUMsWUFBSyxDQUFDLHNCQUFzQixDQUFDOzt5REFBQTtJQUU5QjtRQUFDLFlBQUssRUFBRTs7O3lEQUFBO0lBTVI7UUFBQyxZQUFLLEVBQUU7Ozt5REFBQTtJQWpDWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUseUdBQXlHO1lBQ25ILFNBQVMsRUFBRTtnQkFDUCxjQUFPLENBQUMsc0JBQWEsRUFBRTtvQkFDbkIsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLHFCQUFxQixFQUFyQixDQUFxQixDQUFDO29CQUNwRCxLQUFLLEVBQUUsSUFBSTtpQkFDZCxDQUFDO2FBQ0w7U0FDSixDQUFDOzs2QkFBQTtJQStDRiw0QkFBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0M7QUF2Q1ksNkJBQXFCLHdCQXVDakMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBTkdVTEFSIDIgTE9DQUxJWkFUSU9OXHJcbiAqIEFuIEFuZ3VsYXIgMiBsaWJyYXJ5IHRvIHRyYW5zbGF0ZSBtZXNzYWdlcywgZGF0ZXMgYW5kIG51bWJlcnMuXHJcbiAqIFdyaXR0ZW4gYnkgUm9iZXJ0byBTaW1vbmV0dGkuXHJcbiAqIE1JVCBsaWNlbnNlLlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vcm9iaXNpbTc0L2FuZ3VsYXIybG9jYWxpemF0aW9uXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtEaXJlY3RpdmUsIHByb3ZpZGUsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05HX1ZBTElEQVRPUlMsIENvbnRyb2wsIFZhbGlkYXRvcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbi8vIFNlcnZpY2VzLlxyXG5pbXBvcnQge0xvY2FsZVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2xvY2FsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtMb2NhbGVQYXJzZXJ9IGZyb20gJy4uL3NlcnZpY2VzL2xvY2FsZS1wYXJzZXInO1xyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBDb250cm9sIGFuZCByZXR1cm5zIGVpdGhlciBudWxsIHdoZW4gaXTigJlzIHZhbGlkLCBvciBhbmQgZXJyb3Igb2JqZWN0IGlmIGl04oCZcyBub3QuXHJcbiAqIFxyXG4gKiBAcGFyYW0gbG9jYWxlIFRoZSByZWZlcmVuY2UgdG8gTG9jYWxlU2VydmljZVxyXG4gKiBAcGFyYW0gZGlnaXRzIFRoZSBmb3JtYXQgb2YgdGhlIG51bWJlclxyXG4gKiBAcGFyYW0gTUlOX1ZBTFVFIFRoZSBtaW5pbXVtIHZhbHVlIGZvciB0aGUgbnVtYmVyXHJcbiAqIEBwYXJhbSBNQVhfVkFMVUUgVGhlIG1heGltdW0gdmFsdWUgZm9yIHRoZSBudW1iZXJcclxuICogQHJldHVybiBBbiBlcnJvciBvYmplY3Q6ICdmb3JtYXQnLCAnbWluVmFsdWUnIG9yICdtYXhWYWx1ZSc7IG51bGwgaW4gY2FzZSB0aGUgdmFsdWUgaXMgdmFsaWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUxvY2FsZU51bWJlcihsb2NhbGU6IExvY2FsZVNlcnZpY2UsIGRpZ2l0czogc3RyaW5nLCBNSU5fVkFMVUU6IG51bWJlciA9IE51bWJlci5NSU5fVkFMVUUsIE1BWF9WQUxVRTogbnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRSkge1xyXG5cclxuICAgIHZhciBkZWZhdWx0TG9jYWxlOiBzdHJpbmc7XHJcbiAgICB2YXIgTlVNQkVSX1JFR0VYUDogUmVnRXhwO1xyXG5cclxuICAgIHJldHVybiAoYzogQ29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPT4ge1xyXG5cclxuICAgICAgICAvLyBDaGVja3MgaWYgdGhlIGRlZmF1bHQgbG9jYWxlIGhhcyBjaGFuZ2VkLiBcclxuICAgICAgICBpZiAoZGVmYXVsdExvY2FsZSAhPSBsb2NhbGUuZ2V0RGVmYXVsdExvY2FsZSgpKSB7XHJcblxyXG4gICAgICAgICAgICBOVU1CRVJfUkVHRVhQID0gTG9jYWxlUGFyc2VyLk51bWJlclJlZ0V4cEZhY3RvcnkobG9jYWxlLmdldERlZmF1bHRMb2NhbGUoKSwgZGlnaXRzKTtcclxuICAgICAgICAgICAgZGVmYXVsdExvY2FsZSA9IGxvY2FsZS5nZXREZWZhdWx0TG9jYWxlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2tzIHRoZSBmb3JtYXQuXHJcbiAgICAgICAgaWYgKE5VTUJFUl9SRUdFWFAudGVzdChjLnZhbHVlKSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhcnNlZFZhbHVlOiBudW1iZXI7XHJcblxyXG4gICAgICAgICAgICBwYXJzZWRWYWx1ZSA9IExvY2FsZVBhcnNlci5OdW1iZXIoYy52YWx1ZSwgbG9jYWxlLmdldERlZmF1bHRMb2NhbGUoKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGFyc2VkVmFsdWUgPCBNSU5fVkFMVUUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBtaW5WYWx1ZTogZmFsc2UgfTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhcnNlZFZhbHVlID4gTUFYX1ZBTFVFKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbWF4VmFsdWU6IGZhbHNlIH07XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDsgLy8gVGhlIG51bWJlciBpcyB2YWxpZC5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7IGZvcm1hdDogZmFsc2UgfTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3ZhbGlkYXRlTG9jYWxlTnVtYmVyXVtuZ0NvbnRyb2xdLFt2YWxpZGF0ZUxvY2FsZU51bWJlcl1bbmdNb2RlbF0sW3ZhbGlkYXRlTG9jYWxlTnVtYmVyXVtuZ0Zvcm1Db250cm9sXScsIC8vIFZhbGlkYXRvciB3b3JrcyB3aXRoIG5nQ29udHJvbCwgbmdNb2RlbCBvciBuZ0Zvcm1Db250cm9sIGRpcmVjdGl2ZXMuXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBwcm92aWRlKE5HX1ZBTElEQVRPUlMsIHtcclxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTG9jYWxlTnVtYmVyVmFsaWRhdG9yKSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgXVxyXG59KVxyXG5cclxuLyoqXHJcbiAqIExvY2FsZU51bWJlclZhbGlkYXRvciBjbGFzcy5cclxuICogVmFsaWRhdGVzIGEgbnVtYmVyIGJ5IGRlZmF1bHQgbG9jYWxlLlxyXG4gKiBcclxuICogQGF1dGhvciBSb2JlcnRvIFNpbW9uZXR0aVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvY2FsZU51bWJlclZhbGlkYXRvciBpbXBsZW1lbnRzIFZhbGlkYXRvciwgT25Jbml0IHtcclxuXHJcbiAgICBwcml2YXRlIE1JTl9WQUxVRTogbnVtYmVyID0gTnVtYmVyLk1JTl9WQUxVRTtcclxuXHJcbiAgICBwcml2YXRlIE1BWF9WQUxVRTogbnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvcm1hdDoge21pbkludGVnZXJEaWdpdHN9LnttaW5GcmFjdGlvbkRpZ2l0c30te21heEZyYWN0aW9uRGlnaXRzfS5cclxuICAgICAqL1xyXG4gICAgQElucHV0KCd2YWxpZGF0ZUxvY2FsZU51bWJlcicpIGRpZ2l0czogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHNldCBtaW5WYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIHRoaXMuTUlOX1ZBTFVFID0gdmFsdWUgfHwgdGhpcy5NSU5fVkFMVUU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNldCBtYXhWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIHRoaXMuTUFYX1ZBTFVFID0gdmFsdWUgfHwgdGhpcy5NQVhfVkFMVUU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmFsaWRhdG9yOiBGdW5jdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9jYWxlOiBMb2NhbGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSB2YWxpZGF0ZUxvY2FsZU51bWJlcih0aGlzLmxvY2FsZSwgdGhpcy5kaWdpdHMsIHRoaXMuTUlOX1ZBTFVFLCB0aGlzLk1BWF9WQUxVRSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkYXRlKGM6IENvbnRyb2wpOiBGdW5jdGlvbiB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcihjKTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=