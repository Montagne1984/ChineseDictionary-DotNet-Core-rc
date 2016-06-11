/**
 * ANGULAR 2 LOCALIZATION
 * An Angular 2 library to translate messages, dates and numbers.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular2localization
 */
"use strict";
var lang_1 = require('@angular/common/src/facade/lang');
var exceptions_1 = require('@angular/common/src/facade/exceptions');
var intl_1 = require('@angular/common/src/facade/intl');
var invalid_pipe_argument_exception_1 = require('@angular/common/src/pipes/invalid_pipe_argument_exception');
/**
 * LocaleNumber class.
 */
var LocaleNumber = (function () {
    function LocaleNumber() {
    }
    LocaleNumber.format = function (defaultLocale, value, style, digits, currency, currencyAsSymbol) {
        if (currency === void 0) { currency = null; }
        if (currencyAsSymbol === void 0) { currencyAsSymbol = false; }
        if (lang_1.isBlank(value))
            return null;
        if (!lang_1.isNumber(value)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(LocaleNumber, value);
        }
        var minInt = 1, minFraction = 0, maxFraction = 3;
        var re = lang_1.RegExpWrapper.create('^(\\d+)?\\.((\\d+)(\\-(\\d+))?)?$');
        if (lang_1.isPresent(digits)) {
            var parts = lang_1.RegExpWrapper.firstMatch(re, digits);
            if (lang_1.isBlank(parts)) {
                throw new exceptions_1.BaseException(digits + " is not a valid digit info for number pipes");
            }
            if (lang_1.isPresent(parts[1])) {
                minInt = lang_1.NumberWrapper.parseIntAutoRadix(parts[1]);
            }
            if (lang_1.isPresent(parts[3])) {
                minFraction = lang_1.NumberWrapper.parseIntAutoRadix(parts[3]);
            }
            if (lang_1.isPresent(parts[5])) {
                maxFraction = lang_1.NumberWrapper.parseIntAutoRadix(parts[5]);
            }
        }
        return intl_1.NumberFormatter.format(value, defaultLocale, style, {
            minimumIntegerDigits: minInt,
            minimumFractionDigits: minFraction,
            maximumFractionDigits: maxFraction,
            currency: currency,
            currencyAsSymbol: currencyAsSymbol
        });
    };
    return LocaleNumber;
}());
exports.LocaleNumber = LocaleNumber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLW51bWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvY2FsZS1udW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUF5RSxpQ0FBaUMsQ0FBQyxDQUFBO0FBQzNHLDJCQUE0Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQ3BFLHFCQUFpRCxpQ0FBaUMsQ0FBQyxDQUFBO0FBQ25GLGdEQUEyQywyREFBMkQsQ0FBQyxDQUFBO0FBRXZHOztHQUVHO0FBQ0g7SUFFRTtJQUFnQixDQUFDO0lBRVYsbUJBQU0sR0FBYixVQUFjLGFBQXFCLEVBQUUsS0FBYSxFQUFFLEtBQXdCLEVBQUUsTUFBYyxFQUFFLFFBQXVCLEVBQUUsZ0JBQWlDO1FBQTFELHdCQUF1QixHQUF2QixlQUF1QjtRQUFFLGdDQUFpQyxHQUFqQyx3QkFBaUM7UUFFdEosRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUVoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFckIsTUFBTSxJQUFJLDhEQUE0QixDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU5RCxDQUFDO1FBRUQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFLFdBQVcsR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLEVBQUUsR0FBRyxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBRW5FLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRCLElBQUksS0FBSyxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVqRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLElBQUksMEJBQWEsQ0FBSSxNQUFNLGdEQUE2QyxDQUFDLENBQUM7WUFDbEYsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixNQUFNLEdBQUcsb0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLFdBQVcsR0FBRyxvQkFBYSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFELENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsV0FBVyxHQUFHLG9CQUFhLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQztRQUVILENBQUM7UUFFRCxNQUFNLENBQUMsc0JBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUU7WUFDekQsb0JBQW9CLEVBQUUsTUFBTTtZQUM1QixxQkFBcUIsRUFBRSxXQUFXO1lBQ2xDLHFCQUFxQixFQUFFLFdBQVc7WUFDbEMsUUFBUSxFQUFFLFFBQVE7WUFDbEIsZ0JBQWdCLEVBQUUsZ0JBQWdCO1NBQ25DLENBQUMsQ0FBQztJQUVMLENBQUM7SUFFSCxtQkFBQztBQUFELENBQUMsQUE5Q0QsSUE4Q0M7QUE5Q1ksb0JBQVksZUE4Q3hCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQU5HVUxBUiAyIExPQ0FMSVpBVElPTlxyXG4gKiBBbiBBbmd1bGFyIDIgbGlicmFyeSB0byB0cmFuc2xhdGUgbWVzc2FnZXMsIGRhdGVzIGFuZCBudW1iZXJzLlxyXG4gKiBXcml0dGVuIGJ5IFJvYmVydG8gU2ltb25ldHRpLlxyXG4gKiBNSVQgbGljZW5zZS5cclxuICogaHR0cHM6Ly9naXRodWIuY29tL3JvYmlzaW03NC9hbmd1bGFyMmxvY2FsaXphdGlvblxyXG4gKi9cclxuXHJcbmltcG9ydCB7aXNOdW1iZXIsIGlzUHJlc2VudCwgaXNCbGFuaywgTnVtYmVyV3JhcHBlciwgUmVnRXhwV3JhcHBlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL3NyYy9mYWNhZGUvbGFuZyc7XHJcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XHJcbmltcG9ydCB7TnVtYmVyRm9ybWF0dGVyLCBOdW1iZXJGb3JtYXRTdHlsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL3NyYy9mYWNhZGUvaW50bCc7XHJcbmltcG9ydCB7SW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL3NyYy9waXBlcy9pbnZhbGlkX3BpcGVfYXJndW1lbnRfZXhjZXB0aW9uJztcclxuXHJcbi8qKlxyXG4gKiBMb2NhbGVOdW1iZXIgY2xhc3MuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9jYWxlTnVtYmVyIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgc3RhdGljIGZvcm1hdChkZWZhdWx0TG9jYWxlOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIHN0eWxlOiBOdW1iZXJGb3JtYXRTdHlsZSwgZGlnaXRzOiBzdHJpbmcsIGN1cnJlbmN5OiBzdHJpbmcgPSBudWxsLCBjdXJyZW5jeUFzU3ltYm9sOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xyXG5cclxuICAgIGlmIChpc0JsYW5rKHZhbHVlKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgaWYgKCFpc051bWJlcih2YWx1ZSkpIHtcclxuXHJcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9uKExvY2FsZU51bWJlciwgdmFsdWUpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbWluSW50ID0gMSwgbWluRnJhY3Rpb24gPSAwLCBtYXhGcmFjdGlvbiA9IDM7XHJcbiAgICB2YXIgcmUgPSBSZWdFeHBXcmFwcGVyLmNyZWF0ZSgnXihcXFxcZCspP1xcXFwuKChcXFxcZCspKFxcXFwtKFxcXFxkKykpPyk/JCcpO1xyXG5cclxuICAgIGlmIChpc1ByZXNlbnQoZGlnaXRzKSkge1xyXG5cclxuICAgICAgdmFyIHBhcnRzID0gUmVnRXhwV3JhcHBlci5maXJzdE1hdGNoKHJlLCBkaWdpdHMpO1xyXG5cclxuICAgICAgaWYgKGlzQmxhbmsocGFydHMpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYCR7ZGlnaXRzfSBpcyBub3QgYSB2YWxpZCBkaWdpdCBpbmZvIGZvciBudW1iZXIgcGlwZXNgKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNQcmVzZW50KHBhcnRzWzFdKSkgeyAgLy8gTWluIGludGVnZXIgZGlnaXRzLlxyXG4gICAgICAgIG1pbkludCA9IE51bWJlcldyYXBwZXIucGFyc2VJbnRBdXRvUmFkaXgocGFydHNbMV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc1ByZXNlbnQocGFydHNbM10pKSB7ICAvLyBNaW4gZnJhY3Rpb24gZGlnaXRzLlxyXG4gICAgICAgIG1pbkZyYWN0aW9uID0gTnVtYmVyV3JhcHBlci5wYXJzZUludEF1dG9SYWRpeChwYXJ0c1szXSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzUHJlc2VudChwYXJ0c1s1XSkpIHsgIC8vIE1heCBmcmFjdGlvbiBkaWdpdHMuXHJcbiAgICAgICAgbWF4RnJhY3Rpb24gPSBOdW1iZXJXcmFwcGVyLnBhcnNlSW50QXV0b1JhZGl4KHBhcnRzWzVdKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTnVtYmVyRm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSwgZGVmYXVsdExvY2FsZSwgc3R5bGUsIHtcclxuICAgICAgbWluaW11bUludGVnZXJEaWdpdHM6IG1pbkludCxcclxuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBtaW5GcmFjdGlvbixcclxuICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBtYXhGcmFjdGlvbixcclxuICAgICAgY3VycmVuY3k6IGN1cnJlbmN5LFxyXG4gICAgICBjdXJyZW5jeUFzU3ltYm9sOiBjdXJyZW5jeUFzU3ltYm9sXHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxufSJdfQ==