/**
 * ANGULAR 2 LOCALIZATION
 * An Angular 2 library to translate messages, dates and numbers.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular2localization
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('@angular/common/src/facade/lang');
var exceptions_1 = require('@angular/common/src/facade/exceptions');
var intl_1 = require('@angular/common/src/facade/intl');
// Services.
var locale_number_1 = require('./locale-number');
var Intl_support_1 = require('./Intl-support');
/**
 * LocaleParser class.
 * Parses a string and returns a number by default locale.
 *
 * @author Roberto Simonetti
 */
var LocaleParser = (function () {
    function LocaleParser() {
    }
    /**
     * Builds the regular expression for a number by default locale.
     *
     * @param defaultLocale The default locale
     * @param digits The digit info: {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
     * @return A RegExp object
     */
    LocaleParser.NumberRegExpFactory = function (defaultLocale, digits) {
        // Gets digits.
        var minInt = 1;
        var minFraction = 0;
        var maxFraction = 3;
        var re = lang_1.RegExpWrapper.create('^(\\d+)?\\.((\\d+)(\\-(\\d+))?)?$');
        if (lang_1.isPresent(digits)) {
            var parts = lang_1.RegExpWrapper.firstMatch(re, digits);
            if (lang_1.isBlank(parts)) {
                throw new exceptions_1.BaseException(digits + " is not a valid digit info for number");
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
        // Converts numbers & signs to Unicode by default locale.
        var codes = new DecimalCode(defaultLocale);
        var minusSign = codes.minusSign;
        var zero = codes.numbers[0];
        var decimalSeparator = codes.decimalSeparator;
        var nine = codes.numbers[9];
        // Pattern for 1.2-2 digits: /^-?[0-9]{1,}\.[0-9]{2,2}$/
        // Unicode pattern = "^\u002d?[\u0030-\u0039]{1,}\\u002e[\u0030-\u0039]{2,2}$";
        var pattern;
        if (minFraction > 0 && maxFraction > 0) {
            pattern = "^"
                + minusSign
                + "?[" + zero + "-" + nine
                + "]{" + minInt + ",}\\"
                + decimalSeparator
                + "[" + zero + "-" + nine
                + "]{" + minFraction + "," + maxFraction
                + "}$";
        }
        else if (minFraction == 0 && maxFraction > 0) {
            // Decimal separator is optional.
            pattern = "^"
                + minusSign
                + "?[" + zero + "-" + nine
                + "]{" + minInt + ",}\\"
                + decimalSeparator
                + "?[" + zero + "-" + nine
                + "]{" + minFraction + "," + maxFraction
                + "}$";
        }
        else {
            // Integer number.
            pattern = "^"
                + minusSign
                + "?[" + zero + "-" + nine
                + "]{" + minInt + ",}$";
        }
        pattern = eval("'" + pattern + "'");
        var regExp = new RegExp(pattern);
        return regExp;
        // Wonderful, it works!
    };
    /**
     * Parses a string and returns a number by default locale.
     *
     * @param s The string to be parsed
     * @param defaultLocale The default locale
     * @return A number. If the string cannot be converted to a number, returns NaN
     */
    LocaleParser.Number = function (s, defaultLocale) {
        if (s == '' || defaultLocale == '' || defaultLocale == null)
            return null;
        var codes = new DecimalCode(defaultLocale);
        return codes.parse(s);
    };
    return LocaleParser;
}());
exports.LocaleParser = LocaleParser;
/**
 * NumberCode abstract superclass.
 *
 * Converts numbers to Unicode by locales.
 *
 * @author Roberto Simonetti
 */
var NumberCode = (function () {
    function NumberCode(defaultLocale) {
        this.defaultLocale = defaultLocale;
        /**
         * Unicode for numbers from 0 to 9.
         */
        this.numbers = [];
        for (var i = 0; i <= 9; i++) {
            this.numbers.push(this.Unicode(i.toString()));
        }
        // Checks for support for Intl.
        if (Intl_support_1.IntlSupport.NumberFormat(defaultLocale) == true) {
            // Updates Unicode for numbers by default locale.
            for (var i = 0; i <= 9; i++) {
                this.numbers[i] = this.Unicode(locale_number_1.LocaleNumber.format(defaultLocale, i, intl_1.NumberFormatStyle.Decimal, '1.0-0'));
            }
        }
    }
    NumberCode.prototype.Unicode = function (c) {
        return "\\u" + this.HexEncode(c.charCodeAt(0));
    };
    NumberCode.prototype.HexEncode = function (value) {
        var hex = value.toString(16).toUpperCase();
        // With padding.
        hex = "0000".substr(0, 4 - hex.length) + hex;
        return hex;
    };
    return NumberCode;
}());
/**
 * DecimalCode class.
 *
 * Converts numbers & signs to Unicode by locales.
 *
 * @author Roberto Simonetti
 */
var DecimalCode = (function (_super) {
    __extends(DecimalCode, _super);
    function DecimalCode(defaultLocale) {
        _super.call(this, defaultLocale);
        this.defaultLocale = defaultLocale;
        this.minusSign = this.Unicode("-");
        this.decimalSeparator = this.Unicode(".");
        // Checks for support for Intl.
        if (Intl_support_1.IntlSupport.NumberFormat(defaultLocale) == true) {
            // Updates Unicode for signs by default locale.
            var value = -0.9; // Reference value.
            var localeValue = locale_number_1.LocaleNumber.format(defaultLocale, value, intl_1.NumberFormatStyle.Decimal, '1.1-1');
            // Checks Unicode character 'RIGHT-TO-LEFT MARK' (U+200F).
            var index;
            if (this.Unicode(localeValue.charAt(0)) != "\\u200F") {
                // Left to right.
                index = 0;
            }
            else {
                // Right to left.
                index = 1;
            }
            this.minusSign = this.Unicode(localeValue.charAt(index));
            this.decimalSeparator = this.Unicode(localeValue.charAt(index + 2));
        }
    }
    DecimalCode.prototype.parse = function (s) {
        // Splits the String object into an array of characters.
        var characters = s.split('');
        // Builds the value.
        var value = "";
        for (var _i = 0, characters_1 = characters; _i < characters_1.length; _i++) {
            var char = characters_1[_i];
            var charCode = this.Unicode(char);
            // Tries to look for the char code in numbers and signs.
            var index = this.numbers.indexOf(charCode);
            if (index != -1) {
                value += index;
            }
            else if (charCode == this.minusSign) {
                value += "-";
            }
            else if (charCode == this.decimalSeparator) {
                value += ".";
            }
            else {
                return NaN;
            }
        }
        return parseFloat(value);
    };
    return DecimalCode;
}(NumberCode));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvY2FsZS1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgscUJBQStELGlDQUFpQyxDQUFDLENBQUE7QUFDakcsMkJBQTRCLHVDQUF1QyxDQUFDLENBQUE7QUFDcEUscUJBQWdDLGlDQUFpQyxDQUFDLENBQUE7QUFFbEUsWUFBWTtBQUNaLDhCQUEyQixpQkFBaUIsQ0FBQyxDQUFBO0FBQzdDLDZCQUEwQixnQkFBZ0IsQ0FBQyxDQUFBO0FBRTNDOzs7OztHQUtHO0FBQ0g7SUFFSTtJQUFnQixDQUFDO0lBRWpCOzs7Ozs7T0FNRztJQUNJLGdDQUFtQixHQUExQixVQUEyQixhQUFxQixFQUFFLE1BQWM7UUFFNUQsZUFBZTtRQUNmLElBQUksTUFBTSxHQUFXLENBQUMsQ0FBQztRQUN2QixJQUFJLFdBQVcsR0FBVyxDQUFDLENBQUM7UUFDNUIsSUFBSSxXQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQzVCLElBQUksRUFBRSxHQUFXLG9CQUFhLENBQUMsTUFBTSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFFM0UsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFcEIsSUFBSSxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRWpELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sSUFBSSwwQkFBYSxDQUFJLE1BQU0sMENBQXVDLENBQUMsQ0FBQztZQUM5RSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sR0FBRyxvQkFBYSxDQUFDLGlCQUFpQixDQUFDLEtBQUss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QUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUUzQyxLQUFLLElBQUksR0FBRyxDQUFDO1lBRWpCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQUMsQ0FBQztTQUV6QjtRQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFN0IsQ0FBQztJQUVMLGtCQUFDO0FBQUQsQ0FBQyxBQTVFRCxDQUEwQixVQUFVLEdBNEVuQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBTkdVTEFSIDIgTE9DQUxJWkFUSU9OXHJcbiAqIEFuIEFuZ3VsYXIgMiBsaWJyYXJ5IHRvIHRyYW5zbGF0ZSBtZXNzYWdlcywgZGF0ZXMgYW5kIG51bWJlcnMuXHJcbiAqIFdyaXR0ZW4gYnkgUm9iZXJ0byBTaW1vbmV0dGkuXHJcbiAqIE1JVCBsaWNlbnNlLlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vcm9iaXNpbTc0L2FuZ3VsYXIybG9jYWxpemF0aW9uXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIE51bWJlcldyYXBwZXIsIFJlZ0V4cFdyYXBwZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9zcmMvZmFjYWRlL2xhbmcnO1xyXG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xyXG5pbXBvcnQge051bWJlckZvcm1hdFN0eWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vc3JjL2ZhY2FkZS9pbnRsJztcclxuXHJcbi8vIFNlcnZpY2VzLlxyXG5pbXBvcnQge0xvY2FsZU51bWJlcn0gZnJvbSAnLi9sb2NhbGUtbnVtYmVyJztcclxuaW1wb3J0IHtJbnRsU3VwcG9ydH0gZnJvbSAnLi9JbnRsLXN1cHBvcnQnO1xyXG5cclxuLyoqXHJcbiAqIExvY2FsZVBhcnNlciBjbGFzcy5cclxuICogUGFyc2VzIGEgc3RyaW5nIGFuZCByZXR1cm5zIGEgbnVtYmVyIGJ5IGRlZmF1bHQgbG9jYWxlLlxyXG4gKiBcclxuICogQGF1dGhvciBSb2JlcnRvIFNpbW9uZXR0aVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvY2FsZVBhcnNlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkcyB0aGUgcmVndWxhciBleHByZXNzaW9uIGZvciBhIG51bWJlciBieSBkZWZhdWx0IGxvY2FsZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRlZmF1bHRMb2NhbGUgVGhlIGRlZmF1bHQgbG9jYWxlXHJcbiAgICAgKiBAcGFyYW0gZGlnaXRzIFRoZSBkaWdpdCBpbmZvOiB7bWluSW50ZWdlckRpZ2l0c30ue21pbkZyYWN0aW9uRGlnaXRzfS17bWF4RnJhY3Rpb25EaWdpdHN9XHJcbiAgICAgKiBAcmV0dXJuIEEgUmVnRXhwIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgTnVtYmVyUmVnRXhwRmFjdG9yeShkZWZhdWx0TG9jYWxlOiBzdHJpbmcsIGRpZ2l0czogc3RyaW5nKTogUmVnRXhwIHtcclxuXHJcbiAgICAgICAgLy8gR2V0cyBkaWdpdHMuXHJcbiAgICAgICAgdmFyIG1pbkludDogbnVtYmVyID0gMTtcclxuICAgICAgICB2YXIgbWluRnJhY3Rpb246IG51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIG1heEZyYWN0aW9uOiBudW1iZXIgPSAzO1xyXG4gICAgICAgIHZhciByZTogUmVnRXhwID0gUmVnRXhwV3JhcHBlci5jcmVhdGUoJ14oXFxcXGQrKT9cXFxcLigoXFxcXGQrKShcXFxcLShcXFxcZCspKT8pPyQnKTtcclxuXHJcbiAgICAgICAgaWYgKGlzUHJlc2VudChkaWdpdHMpKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2gocmUsIGRpZ2l0cyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNCbGFuayhwYXJ0cykpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGAke2RpZ2l0c30gaXMgbm90IGEgdmFsaWQgZGlnaXQgaW5mbyBmb3IgbnVtYmVyYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzUHJlc2VudChwYXJ0c1sxXSkpIHsgIC8vIE1pbiBpbnRlZ2VyIGRpZ2l0cy5cclxuICAgICAgICAgICAgICAgIG1pbkludCA9IE51bWJlcldyYXBwZXIucGFyc2VJbnRBdXRvUmFkaXgocGFydHNbMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc1ByZXNlbnQocGFydHNbM10pKSB7ICAvLyBNaW4gZnJhY3Rpb24gZGlnaXRzLlxyXG4gICAgICAgICAgICAgICAgbWluRnJhY3Rpb24gPSBOdW1iZXJXcmFwcGVyLnBhcnNlSW50QXV0b1JhZGl4KHBhcnRzWzNdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNQcmVzZW50KHBhcnRzWzVdKSkgeyAgLy8gTWF4IGZyYWN0aW9uIGRpZ2l0cy5cclxuICAgICAgICAgICAgICAgIG1heEZyYWN0aW9uID0gTnVtYmVyV3JhcHBlci5wYXJzZUludEF1dG9SYWRpeChwYXJ0c1s1XSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDb252ZXJ0cyBudW1iZXJzICYgc2lnbnMgdG8gVW5pY29kZSBieSBkZWZhdWx0IGxvY2FsZS5cclxuICAgICAgICB2YXIgY29kZXM6IERlY2ltYWxDb2RlID0gbmV3IERlY2ltYWxDb2RlKGRlZmF1bHRMb2NhbGUpO1xyXG5cclxuICAgICAgICB2YXIgbWludXNTaWduOiBzdHJpbmcgPSBjb2Rlcy5taW51c1NpZ247XHJcbiAgICAgICAgdmFyIHplcm86IHN0cmluZyA9IGNvZGVzLm51bWJlcnNbMF07XHJcbiAgICAgICAgdmFyIGRlY2ltYWxTZXBhcmF0b3I6IHN0cmluZyA9IGNvZGVzLmRlY2ltYWxTZXBhcmF0b3I7XHJcbiAgICAgICAgdmFyIG5pbmU6IHN0cmluZyA9IGNvZGVzLm51bWJlcnNbOV07XHJcblxyXG4gICAgICAgIC8vIFBhdHRlcm4gZm9yIDEuMi0yIGRpZ2l0czogL14tP1swLTldezEsfVxcLlswLTldezIsMn0kL1xyXG4gICAgICAgIC8vIFVuaWNvZGUgcGF0dGVybiA9IFwiXlxcdTAwMmQ/W1xcdTAwMzAtXFx1MDAzOV17MSx9XFxcXHUwMDJlW1xcdTAwMzAtXFx1MDAzOV17MiwyfSRcIjtcclxuICAgICAgICB2YXIgcGF0dGVybjogc3RyaW5nO1xyXG4gICAgICAgIGlmIChtaW5GcmFjdGlvbiA+IDAgJiYgbWF4RnJhY3Rpb24gPiAwKSB7XHJcblxyXG4gICAgICAgICAgICBwYXR0ZXJuID0gXCJeXCJcclxuICAgICAgICAgICAgICAgICsgbWludXNTaWduXHJcbiAgICAgICAgICAgICAgICArIFwiP1tcIiArIHplcm8gKyBcIi1cIiArIG5pbmVcclxuICAgICAgICAgICAgICAgICsgXCJde1wiICsgbWluSW50ICsgXCIsfVxcXFxcIlxyXG4gICAgICAgICAgICAgICAgKyBkZWNpbWFsU2VwYXJhdG9yXHJcbiAgICAgICAgICAgICAgICArIFwiW1wiICsgemVybyArIFwiLVwiICsgbmluZVxyXG4gICAgICAgICAgICAgICAgKyBcIl17XCIgKyBtaW5GcmFjdGlvbiArIFwiLFwiICsgbWF4RnJhY3Rpb25cclxuICAgICAgICAgICAgICAgICsgXCJ9JFwiO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKG1pbkZyYWN0aW9uID09IDAgJiYgbWF4RnJhY3Rpb24gPiAwKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBEZWNpbWFsIHNlcGFyYXRvciBpcyBvcHRpb25hbC5cclxuICAgICAgICAgICAgcGF0dGVybiA9IFwiXlwiXHJcbiAgICAgICAgICAgICAgICArIG1pbnVzU2lnblxyXG4gICAgICAgICAgICAgICAgKyBcIj9bXCIgKyB6ZXJvICsgXCItXCIgKyBuaW5lXHJcbiAgICAgICAgICAgICAgICArIFwiXXtcIiArIG1pbkludCArIFwiLH1cXFxcXCJcclxuICAgICAgICAgICAgICAgICsgZGVjaW1hbFNlcGFyYXRvclxyXG4gICAgICAgICAgICAgICAgKyBcIj9bXCIgKyB6ZXJvICsgXCItXCIgKyBuaW5lXHJcbiAgICAgICAgICAgICAgICArIFwiXXtcIiArIG1pbkZyYWN0aW9uICsgXCIsXCIgKyBtYXhGcmFjdGlvblxyXG4gICAgICAgICAgICAgICAgKyBcIn0kXCI7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJbnRlZ2VyIG51bWJlci5cclxuICAgICAgICAgICAgcGF0dGVybiA9IFwiXlwiXHJcbiAgICAgICAgICAgICAgICArIG1pbnVzU2lnblxyXG4gICAgICAgICAgICAgICAgKyBcIj9bXCIgKyB6ZXJvICsgXCItXCIgKyBuaW5lXHJcbiAgICAgICAgICAgICAgICArIFwiXXtcIiArIG1pbkludCArIFwiLH0kXCI7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwYXR0ZXJuID0gZXZhbChcIidcIiArIHBhdHRlcm4gKyBcIidcIik7XHJcbiAgICAgICAgdmFyIHJlZ0V4cDogUmVnRXhwID0gbmV3IFJlZ0V4cChwYXR0ZXJuKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlZ0V4cDtcclxuXHJcbiAgICAgICAgLy8gV29uZGVyZnVsLCBpdCB3b3JrcyFcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyBhIHN0cmluZyBhbmQgcmV0dXJucyBhIG51bWJlciBieSBkZWZhdWx0IGxvY2FsZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHMgVGhlIHN0cmluZyB0byBiZSBwYXJzZWRcclxuICAgICAqIEBwYXJhbSBkZWZhdWx0TG9jYWxlIFRoZSBkZWZhdWx0IGxvY2FsZVxyXG4gICAgICogQHJldHVybiBBIG51bWJlci4gSWYgdGhlIHN0cmluZyBjYW5ub3QgYmUgY29udmVydGVkIHRvIGEgbnVtYmVyLCByZXR1cm5zIE5hTlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgTnVtYmVyKHM6IHN0cmluZywgZGVmYXVsdExvY2FsZTogc3RyaW5nKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgaWYgKHMgPT0gJycgfHwgZGVmYXVsdExvY2FsZSA9PSAnJyB8fCBkZWZhdWx0TG9jYWxlID09IG51bGwpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICB2YXIgY29kZXM6IERlY2ltYWxDb2RlID0gbmV3IERlY2ltYWxDb2RlKGRlZmF1bHRMb2NhbGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29kZXMucGFyc2Uocyk7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIE51bWJlckNvZGUgYWJzdHJhY3Qgc3VwZXJjbGFzcy5cclxuICogXHJcbiAqIENvbnZlcnRzIG51bWJlcnMgdG8gVW5pY29kZSBieSBsb2NhbGVzLlxyXG4gKiBcclxuICogQGF1dGhvciBSb2JlcnRvIFNpbW9uZXR0aVxyXG4gKi9cclxuYWJzdHJhY3QgY2xhc3MgTnVtYmVyQ29kZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbmljb2RlIGZvciBudW1iZXJzIGZyb20gMCB0byA5LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbnVtYmVyczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkZWZhdWx0TG9jYWxlOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8PSA5OyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubnVtYmVycy5wdXNoKHRoaXMuVW5pY29kZShpLnRvU3RyaW5nKCkpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVja3MgZm9yIHN1cHBvcnQgZm9yIEludGwuXHJcbiAgICAgICAgaWYgKEludGxTdXBwb3J0Lk51bWJlckZvcm1hdChkZWZhdWx0TG9jYWxlKSA9PSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGVzIFVuaWNvZGUgZm9yIG51bWJlcnMgYnkgZGVmYXVsdCBsb2NhbGUuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPD0gOTsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXJzW2ldID0gdGhpcy5Vbmljb2RlKExvY2FsZU51bWJlci5mb3JtYXQoZGVmYXVsdExvY2FsZSwgaSwgTnVtYmVyRm9ybWF0U3R5bGUuRGVjaW1hbCwgJzEuMC0wJykpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2VzIGEgc3RyaW5nIGFuZCByZXR1cm5zIGEgbnVtYmVyIGJ5IGRlZmF1bHQgbG9jYWxlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcyBUaGUgc3RyaW5nIHRvIGJlIHBhcnNlZFxyXG4gICAgICogQHJldHVybiBBIG51bWJlclxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBwYXJzZShzOiBzdHJpbmcpOiBudW1iZXI7XHJcblxyXG4gICAgcHJvdGVjdGVkIFVuaWNvZGUoYzogc3RyaW5nKTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIFwiXFxcXHVcIiArIHRoaXMuSGV4RW5jb2RlKGMuY2hhckNvZGVBdCgwKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBIZXhFbmNvZGUodmFsdWU6IG51bWJlcik6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIHZhciBoZXg6IHN0cmluZyA9IHZhbHVlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIC8vIFdpdGggcGFkZGluZy5cclxuICAgICAgICBoZXggPSBcIjAwMDBcIi5zdWJzdHIoMCwgNCAtIGhleC5sZW5ndGgpICsgaGV4O1xyXG5cclxuICAgICAgICByZXR1cm4gaGV4O1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWNpbWFsQ29kZSBjbGFzcy5cclxuICogXHJcbiAqIENvbnZlcnRzIG51bWJlcnMgJiBzaWducyB0byBVbmljb2RlIGJ5IGxvY2FsZXMuXHJcbiAqIFxyXG4gKiBAYXV0aG9yIFJvYmVydG8gU2ltb25ldHRpXHJcbiAqL1xyXG5jbGFzcyBEZWNpbWFsQ29kZSBleHRlbmRzIE51bWJlckNvZGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5pY29kZSBmb3IgbWludXMgc2lnbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG1pbnVzU2lnbjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5pY29kZSBmb3IgZGVjaW1hbCBzZXBhcmF0b3IuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWNpbWFsU2VwYXJhdG9yOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGRlZmF1bHRMb2NhbGU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGRlZmF1bHRMb2NhbGUpXHJcblxyXG4gICAgICAgIHRoaXMubWludXNTaWduID0gdGhpcy5Vbmljb2RlKFwiLVwiKTtcclxuICAgICAgICB0aGlzLmRlY2ltYWxTZXBhcmF0b3IgPSB0aGlzLlVuaWNvZGUoXCIuXCIpO1xyXG5cclxuICAgICAgICAvLyBDaGVja3MgZm9yIHN1cHBvcnQgZm9yIEludGwuXHJcbiAgICAgICAgaWYgKEludGxTdXBwb3J0Lk51bWJlckZvcm1hdChkZWZhdWx0TG9jYWxlKSA9PSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGVzIFVuaWNvZGUgZm9yIHNpZ25zIGJ5IGRlZmF1bHQgbG9jYWxlLlxyXG4gICAgICAgICAgICB2YXIgdmFsdWU6IG51bWJlciA9IC0wLjk7IC8vIFJlZmVyZW5jZSB2YWx1ZS5cclxuICAgICAgICAgICAgdmFyIGxvY2FsZVZhbHVlOiBzdHJpbmcgPSBMb2NhbGVOdW1iZXIuZm9ybWF0KGRlZmF1bHRMb2NhbGUsIHZhbHVlLCBOdW1iZXJGb3JtYXRTdHlsZS5EZWNpbWFsLCAnMS4xLTEnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrcyBVbmljb2RlIGNoYXJhY3RlciAnUklHSFQtVE8tTEVGVCBNQVJLJyAoVSsyMDBGKS5cclxuICAgICAgICAgICAgdmFyIGluZGV4OiBudW1iZXI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlVuaWNvZGUobG9jYWxlVmFsdWUuY2hhckF0KDApKSAhPSBcIlxcXFx1MjAwRlwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBMZWZ0IHRvIHJpZ2h0LlxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmlnaHQgdG8gbGVmdC5cclxuICAgICAgICAgICAgICAgIGluZGV4ID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5taW51c1NpZ24gPSB0aGlzLlVuaWNvZGUobG9jYWxlVmFsdWUuY2hhckF0KGluZGV4KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVjaW1hbFNlcGFyYXRvciA9IHRoaXMuVW5pY29kZShsb2NhbGVWYWx1ZS5jaGFyQXQoaW5kZXggKyAyKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcGFyc2Uoczogc3RyaW5nKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgLy8gU3BsaXRzIHRoZSBTdHJpbmcgb2JqZWN0IGludG8gYW4gYXJyYXkgb2YgY2hhcmFjdGVycy5cclxuICAgICAgICB2YXIgY2hhcmFjdGVyczogQXJyYXk8c3RyaW5nPiA9IHMuc3BsaXQoJycpO1xyXG5cclxuICAgICAgICAvLyBCdWlsZHMgdGhlIHZhbHVlLlxyXG4gICAgICAgIHZhciB2YWx1ZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgY2hhciBvZiBjaGFyYWN0ZXJzKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2hhckNvZGU6IHN0cmluZyA9IHRoaXMuVW5pY29kZShjaGFyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRyaWVzIHRvIGxvb2sgZm9yIHRoZSBjaGFyIGNvZGUgaW4gbnVtYmVycyBhbmQgc2lnbnMuXHJcbiAgICAgICAgICAgIHZhciBpbmRleDogbnVtYmVyID0gdGhpcy5udW1iZXJzLmluZGV4T2YoY2hhckNvZGUpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBpbmRleDtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhckNvZGUgPT0gdGhpcy5taW51c1NpZ24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBcIi1cIjtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhckNvZGUgPT0gdGhpcy5kZWNpbWFsU2VwYXJhdG9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gXCIuXCI7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgeyByZXR1cm4gTmFOOyB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19