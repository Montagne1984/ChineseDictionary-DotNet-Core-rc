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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
// Services.
var locale_service_1 = require('./locale.service');
var Intl_support_1 = require('./Intl-support');
/**
 * LocalizationService class.
 * Gets the translation data and performs operations.
 *
 * Direct loading.
 *
 * To initialize LocalizationService for the direct loading, add the following code in the body of constructor of the route component:
 *
 * var translationEN = {
 *      TITLE: 'Angular 2 Localization',
 *      CHANGE_LANGUAGE: 'Change language',
 *      ...
 * }
 * // Add a new translation here.
 *
 * // Required: adds a new translation with the given language code.
 * this.localization.addTranslation('en', translationEN);
 * // Add a new translation with the given language code here.
 * this.localization.updateTranslation(); // Need to update the translation.
 *
 * Asynchronous loading.
 *
 * To initialize LocalizationService for the asynchronous loading, add the following code in the body of constructor of the route component:
 *
 * // Required: initializes the translation provider with the given path prefix.
 * this.localization.translationProvider('./resources/locale-');
 * this.localization.updateTranslation(); // Need to update the translation.
 *
 * and create the json files of the translations such as 'locale-en.json':
 *
 * {
 *     "TITLE": "Angular 2 Localization",
 *     "CHANGE_LANGUAGE": "Change language",
 *     ...
 * }
 *
 * @author Roberto Simonetti
 */
var LocalizationService = (function () {
    function LocalizationService(http, locale) {
        var _this = this;
        this.http = http;
        this.locale = locale;
        /**
         * The translation data: {languageCode: {key: value}}.
         */
        this.translationData = {};
        this.prefix = "";
        this.loadingMode = LoadingMode.Unknown;
        this.languageCode = "";
        // Initializes the loading mode.
        this.loadingMode = LoadingMode.Direct;
        // Initializes the service state.
        this.serviceState = ServiceState.isWaiting;
        // When the language changes, subscribes to the event & call updateTranslation method.
        this.locale.languageCodeChanged.subscribe(
        // Generator or next.
        function (language) { return _this.updateTranslation(language); });
    }
    /**
     * Direct loading: adds new translation data.
     *
     * @param language The two-letter code of the language for the translation data
     * @param translation The new translation data
     */
    LocalizationService.prototype.addTranslation = function (language, translation) {
        // Adds the new translation data.
        this.translationData[language] = translation;
    };
    /**
     * Asynchronous loading: defines the translation provider.
     *
     * @param prefix The path prefix of the json files
     */
    LocalizationService.prototype.translationProvider = function (prefix) {
        this.prefix = prefix;
        // Updates the loading mode.
        this.loadingMode = LoadingMode.Async;
    };
    /**
     * Gets the json data.
     *
     * @param language The two-letter or three-letter code of the language
     */
    LocalizationService.prototype.getTranslation = function (language) {
        var _this = this;
        // Initializes the translation data & the service state.
        this.translationData = {};
        this.serviceState = ServiceState.isLoading;
        var url = this.prefix + language + '.json';
        // Angular 2 Http module.
        this.http.get(url)
            .map(function (res) { return res.json(); })
            .subscribe(
        // Observer or next.
        function (res) {
            // Assigns the observer to the translation data.
            _this.translationData[language] = res;
        }, 
        // Error.
        function (error) {
            console.error("Localization service:", error);
        }, 
        // Complete.
        function () {
            // Updates the service state.
            _this.serviceState = ServiceState.isReady;
            // Updates the language code of the service.
            _this.languageCode = language;
        });
    };
    /**
     * Translates a key.
     *
     * @param key The key to be translated
     * @return The value of translation
     */
    LocalizationService.prototype.translate = function (key) {
        var value;
        if (this.translationData[this.languageCode] != null) {
            // Gets the translation by language code. 
            var translation = this.translationData[this.languageCode];
            // Gets the value of translation by key.   
            value = translation[key];
        }
        // If the value of translation is not present, the same key is returned (see issue #1).
        if (value == null || value == "") {
            value = key;
        }
        return value;
    };
    /**
     * Translates a key.
     *
     * @param key The key to be translated
     * @return An observable of the value of translation
     */
    LocalizationService.prototype.translateAsync = function (key) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            // Gets the value of translation for the key.
            var value = _this.translate(key);
            observer.next(value);
            observer.complete();
        });
    };
    /**
     * Updates the language code and loads the translation data for the asynchronous loading.
     *
     * @param language The two-letter or three-letter code of the language
     */
    LocalizationService.prototype.updateTranslation = function (language) {
        if (language === void 0) { language = this.locale.getCurrentLanguage(); }
        if (language != "" && language != this.languageCode) {
            // Asynchronous loading.
            if (this.loadingMode == LoadingMode.Async) {
                // Updates the translation data.  
                this.getTranslation(language);
            }
            else {
                // Updates the language code of the service.
                this.languageCode = language;
                // Updates the service state.
                this.serviceState = ServiceState.isReady;
            }
        }
    };
    /* Intl.Collator */
    /**
     * Compares two keys by the value of translation & the current language code.
     *
     * @param key1, key2 The keys of the values to compare
     * @param extension
     * @param options
     * @return A negative value if the value of translation of key1 comes before the value of translation of key2; a positive value if key1 comes after key2; 0 if they are considered equal or Intl.Collator is not supported
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
     */
    LocalizationService.prototype.compare = function (key1, key2, extension, options) {
        // Checks for support for Intl.
        if (Intl_support_1.IntlSupport.Collator(this.languageCode) == false) {
            return 0;
        }
        // Gets the value of translation for the keys.
        var value1 = this.translate(key1);
        var value2 = this.translate(key2);
        ;
        var locale = this.addExtension(this.languageCode, extension);
        return new Intl.Collator(locale).compare(value1, value2);
    };
    /**
     * Sorts an array of objects or an array of arrays by the current language code.
     *
     * @param list The array to be sorted
     * @param keyName The column that contains the keys of the values to be ordered
     * @param order 'asc' or 'desc'. The default value is 'asc'.
     * @param extension
     * @param options
     * @return The same sorted list or the same list if Intl.Collator is not supported
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
     */
    LocalizationService.prototype.sort = function (list, keyName, order, extension, options) {
        if (list == null || keyName == null || Intl_support_1.IntlSupport.Collator(this.languageCode) == false)
            return list;
        // Gets the value of translation for the keys.
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            // Gets the value of translation for the key.
            var value = this.translate(item[keyName]);
            // Adds a new column for translated values.
            var translated = keyName.concat("Translated");
            // Updates the value in the list.
            item[translated] = value;
        }
        var locale = this.addExtension(this.languageCode, extension);
        // Intl.Collator.
        var collator = new Intl.Collator(locale, options); // It can be passed directly to Array.prototype.sort.
        list.sort(function (a, b) {
            return collator.compare(a[translated], b[translated]);
        });
        // Removes the column of translated values.
        var index = list.indexOf(translated, 0);
        if (index > -1) {
            list.splice(index, 1);
        }
        // Descending order.
        if (order != null && order == 'desc') {
            list.reverse();
        }
        return list;
    };
    /**
     * Sorts an array of objects or an array of arrays by the current language code.
     *
     * @param list The array to be sorted
     * @param keyName The column that contains the keys of the values to be ordered
     * @param order 'asc' or 'desc'. The default value is 'asc'.
     * @param extension
     * @param options
     * @return An observable of the sorted list or of the same list if Intl.Collator is not supported
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
     */
    LocalizationService.prototype.sortAsync = function (list, keyName, order, extension, options) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            // Gets the sorted list.
            observer.next(_this.sort(list, keyName, order, extension, options));
            observer.complete();
        });
    };
    /**
     * Matches a string into an array of objects or an array of arrays.
     *
     * @param s The string to search
     * @param list The array to look for
     * @param keyNames An array that contains the columns to look for
     * @param options
     * @return A filtered list or the same list if Intl.Collator is not supported
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
     */
    LocalizationService.prototype.search = function (s, list, keyNames, options) {
        var _this = this;
        if (options === void 0) { options = { usage: 'search' }; }
        if (list == null || keyNames == null || s == "" || Intl_support_1.IntlSupport.Collator(this.languageCode) == false)
            return list;
        // Gets the value of translation for the each column.
        var translated = new Array();
        var i = 0;
        for (var i = 0; i < keyNames.length; i++) {
            // Adds a new column for translated values.
            translated.push(keyNames[i].concat("Translated"));
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var item = list_2[_i];
                // Gets the values of translation for the column.
                var value = this.translate(item[keyNames[i]]);
                // Updates the value in the list.
                item[translated[i]] = value;
            }
        }
        var locale = this.languageCode;
        // Intl.Collator.
        var collator = new Intl.Collator(locale, options);
        var matches = list.filter(function (v) {
            var found = false;
            for (var i = 0; i < translated.length; i++) {
                // Calls matching algorithm.
                if (_this.match(v[translated[i]], s, collator)) {
                    found = true;
                    break;
                }
            }
            return found;
        });
        // Removes the columns of translated values.
        for (var i = 0; i < translated.length; i++) {
            var index = matches.indexOf(translated[i], 0);
            if (index > -1) {
                matches.splice(index, 1);
            }
        }
        return matches;
    };
    /**
     * Matches a string into an array of objects or an array of arrays.
     *
     * @param s The string to search
     * @param list The array to look for
     * @param keyNames An array that contains the columns to look for
     * @param options
     * @return An observable for each element of the filtered list or the same list if Intl.Collator is not supported
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
     */
    LocalizationService.prototype.searchAsync = function (s, list, keyNames, options) {
        var _this = this;
        if (options === void 0) { options = { usage: 'search' }; }
        if (list == null)
            return null;
        if (keyNames == null || s == "" || Intl_support_1.IntlSupport.Collator(this.languageCode) == false)
            return new Observable_1.Observable(function (observer) {
                for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                    var item = list_3[_i];
                    observer.next(item);
                }
                observer.complete();
            });
        return new Observable_1.Observable(function (observer) {
            // Gets the value of translation for the each column.
            var translated = new Array();
            var i = 0;
            for (var i = 0; i < keyNames.length; i++) {
                // Adds a new column for translated values.
                translated.push(keyNames[i].concat("Translated"));
                for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
                    var item = list_4[_i];
                    // Gets the values of translation for the column.
                    var value = _this.translate(item[keyNames[i]]);
                    // Updates the value in the list.
                    item[translated[i]] = value;
                }
            }
            var locale = _this.languageCode;
            // Intl.Collator.
            var collator = new Intl.Collator(locale, options);
            for (var _a = 0, list_5 = list; _a < list_5.length; _a++) {
                var v = list_5[_a];
                for (var i = 0; i < translated.length; i++) {
                    // Calls matching algorithm.
                    if (_this.match(v[translated[i]], s, collator)) {
                        observer.next(v);
                        break;
                    }
                }
            }
            // Removes the columns of translated values.
            for (var i = 0; i < translated.length; i++) {
                var index = list.indexOf(translated[i], 0);
                if (index > -1) {
                    list.splice(index, 1);
                }
            }
            ;
            observer.complete();
        });
    };
    LocalizationService.prototype.addExtension = function (locale, extension) {
        // Adds extension.
        if (extension != null && extension != "") {
            locale = locale + "-" + extension;
        }
        return locale;
    };
    /**
     * Matching algorithm.
     *
     * @param v The value
     * @param s The string to search
     * return True if match, otherwise false
     */
    LocalizationService.prototype.match = function (v, s, collator) {
        var vLength = v.length;
        var sLength = s.length;
        if (sLength > vLength)
            return false; // The search string is longer than value.
        if (sLength == vLength) {
            return collator.compare(v, s) === 0;
        }
        // Tries to search the substring.
        var found = false;
        for (var i = 0; i < vLength - (sLength - 1); i++) {
            var str = v.substr(i, sLength);
            if (collator.compare(str, s) === 0) {
                found = true;
                break;
            }
        }
        return found;
    };
    LocalizationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, locale_service_1.LocaleService])
    ], LocalizationService);
    return LocalizationService;
}());
exports.LocalizationService = LocalizationService;
/**
 * Defines the service state.
 */
(function (ServiceState) {
    /**
     * The translation data has been loaded.
     */
    ServiceState[ServiceState["isReady"] = 0] = "isReady";
    /**
     * The service is loading the data.
     */
    ServiceState[ServiceState["isLoading"] = 1] = "isLoading";
    /**
     * The service is waiting for the data.
     */
    ServiceState[ServiceState["isWaiting"] = 2] = "isWaiting";
})(exports.ServiceState || (exports.ServiceState = {}));
var ServiceState = exports.ServiceState;
/**
 * Defines the loading mode.
 */
(function (LoadingMode) {
    /**
     * Initial state.
     */
    LoadingMode[LoadingMode["Unknown"] = 0] = "Unknown";
    /**
     * Direct loading.
     */
    LoadingMode[LoadingMode["Direct"] = 1] = "Direct";
    /**
     * Asynchronous loading.
     */
    LoadingMode[LoadingMode["Async"] = 2] = "Async";
})(exports.LoadingMode || (exports.LoadingMode = {}));
var LoadingMode = exports.LoadingMode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2NhbGl6YXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7O0FBRUgscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLHFCQUE2QixlQUFlLENBQUMsQ0FBQTtBQUU3QywyQkFBeUIsaUJBQWlCLENBQUMsQ0FBQTtBQUMzQyxRQUFPLHVCQUF1QixDQUFDLENBQUE7QUFFL0IsWUFBWTtBQUNaLCtCQUE0QixrQkFBa0IsQ0FBQyxDQUFBO0FBQy9DLDZCQUEwQixnQkFBZ0IsQ0FBQyxDQUFBO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNHO0FBQ1c7SUEyQlYsNkJBQW1CLElBQVUsRUFBUyxNQUFxQjtRQTNCakQsaUJBcWdCYjtRQTFlc0IsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWU7UUFwQjNEOztXQUVHO1FBQ0ssb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFtQjlCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV2QixnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBRXRDLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFFM0Msc0ZBQXNGO1FBQ3RGLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUztRQUVyQyxxQkFBcUI7UUFDckIsVUFBQyxRQUFnQixJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFoQyxDQUFnQyxDQUV6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QUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBRWpCLENBQUM7SUFuZ0JMO1FBQUMsaUJBQVUsRUFBRTs7MkJBQUE7SUFxZ0JiLDBCQUFDO0FBQUQsQ0FBQyxBQXJnQmEsSUFxZ0JiO0FBcmdCMEIsMkJBQW1CLHNCQXFnQjdDLENBQUE7QUFFRDs7R0FFRztBQUNILFdBQVksWUFBWTtJQUVwQjs7T0FFRztJQUNILHFEQUFPLENBQUE7SUFDUDs7T0FFRztJQUNILHlEQUFTLENBQUE7SUFDVDs7T0FFRztJQUNILHlEQUFTLENBQUE7QUFFYixDQUFDLEVBZlcsb0JBQVksS0FBWixvQkFBWSxRQWV2QjtBQWZELElBQVksWUFBWSxHQUFaLG9CQWVYLENBQUE7QUFFRDs7R0FFRztBQUNILFdBQVksV0FBVztJQUVuQjs7T0FFRztJQUNILG1EQUFPLENBQUE7SUFDUDs7T0FFRztJQUNILGlEQUFNLENBQUE7SUFDTjs7T0FFRztJQUNILCtDQUFLLENBQUE7QUFFVCxDQUFDLEVBZlcsbUJBQVcsS0FBWCxtQkFBVyxRQWV0QjtBQWZELElBQVksV0FBVyxHQUFYLG1CQWVYLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQU5HVUxBUiAyIExPQ0FMSVpBVElPTlxyXG4gKiBBbiBBbmd1bGFyIDIgbGlicmFyeSB0byB0cmFuc2xhdGUgbWVzc2FnZXMsIGRhdGVzIGFuZCBudW1iZXJzLlxyXG4gKiBXcml0dGVuIGJ5IFJvYmVydG8gU2ltb25ldHRpLlxyXG4gKiBNSVQgbGljZW5zZS5cclxuICogaHR0cHM6Ly9naXRodWIuY29tL3JvYmlzaW03NC9hbmd1bGFyMmxvY2FsaXphdGlvblxyXG4gKi9cclxuXHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7SHR0cCwgUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQge09ic2VydmVyfSBmcm9tICdyeGpzL09ic2VydmVyJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcblxyXG4vLyBTZXJ2aWNlcy5cclxuaW1wb3J0IHtMb2NhbGVTZXJ2aWNlfSBmcm9tICcuL2xvY2FsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtJbnRsU3VwcG9ydH0gZnJvbSAnLi9JbnRsLXN1cHBvcnQnO1xyXG5cclxuLyoqXHJcbiAqIExvY2FsaXphdGlvblNlcnZpY2UgY2xhc3MuXHJcbiAqIEdldHMgdGhlIHRyYW5zbGF0aW9uIGRhdGEgYW5kIHBlcmZvcm1zIG9wZXJhdGlvbnMuXHJcbiAqIFxyXG4gKiBEaXJlY3QgbG9hZGluZy5cclxuICogXHJcbiAqIFRvIGluaXRpYWxpemUgTG9jYWxpemF0aW9uU2VydmljZSBmb3IgdGhlIGRpcmVjdCBsb2FkaW5nLCBhZGQgdGhlIGZvbGxvd2luZyBjb2RlIGluIHRoZSBib2R5IG9mIGNvbnN0cnVjdG9yIG9mIHRoZSByb3V0ZSBjb21wb25lbnQ6XHJcbiAqXHJcbiAqIHZhciB0cmFuc2xhdGlvbkVOID0ge1xyXG4gKiAgICAgIFRJVExFOiAnQW5ndWxhciAyIExvY2FsaXphdGlvbicsXHJcbiAqICAgICAgQ0hBTkdFX0xBTkdVQUdFOiAnQ2hhbmdlIGxhbmd1YWdlJyxcclxuICogICAgICAuLi5cclxuICogfVxyXG4gKiAvLyBBZGQgYSBuZXcgdHJhbnNsYXRpb24gaGVyZS5cclxuICogXHJcbiAqIC8vIFJlcXVpcmVkOiBhZGRzIGEgbmV3IHRyYW5zbGF0aW9uIHdpdGggdGhlIGdpdmVuIGxhbmd1YWdlIGNvZGUuXHJcbiAqIHRoaXMubG9jYWxpemF0aW9uLmFkZFRyYW5zbGF0aW9uKCdlbicsIHRyYW5zbGF0aW9uRU4pO1xyXG4gKiAvLyBBZGQgYSBuZXcgdHJhbnNsYXRpb24gd2l0aCB0aGUgZ2l2ZW4gbGFuZ3VhZ2UgY29kZSBoZXJlLlxyXG4gKiB0aGlzLmxvY2FsaXphdGlvbi51cGRhdGVUcmFuc2xhdGlvbigpOyAvLyBOZWVkIHRvIHVwZGF0ZSB0aGUgdHJhbnNsYXRpb24uXHJcbiAqIFxyXG4gKiBBc3luY2hyb25vdXMgbG9hZGluZy5cclxuICogXHJcbiAqIFRvIGluaXRpYWxpemUgTG9jYWxpemF0aW9uU2VydmljZSBmb3IgdGhlIGFzeW5jaHJvbm91cyBsb2FkaW5nLCBhZGQgdGhlIGZvbGxvd2luZyBjb2RlIGluIHRoZSBib2R5IG9mIGNvbnN0cnVjdG9yIG9mIHRoZSByb3V0ZSBjb21wb25lbnQ6XHJcbiAqIFxyXG4gKiAvLyBSZXF1aXJlZDogaW5pdGlhbGl6ZXMgdGhlIHRyYW5zbGF0aW9uIHByb3ZpZGVyIHdpdGggdGhlIGdpdmVuIHBhdGggcHJlZml4LlxyXG4gKiB0aGlzLmxvY2FsaXphdGlvbi50cmFuc2xhdGlvblByb3ZpZGVyKCcuL3Jlc291cmNlcy9sb2NhbGUtJyk7XHJcbiAqIHRoaXMubG9jYWxpemF0aW9uLnVwZGF0ZVRyYW5zbGF0aW9uKCk7IC8vIE5lZWQgdG8gdXBkYXRlIHRoZSB0cmFuc2xhdGlvbi5cclxuICogXHJcbiAqIGFuZCBjcmVhdGUgdGhlIGpzb24gZmlsZXMgb2YgdGhlIHRyYW5zbGF0aW9ucyBzdWNoIGFzICdsb2NhbGUtZW4uanNvbic6XHJcbiAqIFxyXG4gKiB7XHJcbiAqICAgICBcIlRJVExFXCI6IFwiQW5ndWxhciAyIExvY2FsaXphdGlvblwiLFxyXG4gKiAgICAgXCJDSEFOR0VfTEFOR1VBR0VcIjogXCJDaGFuZ2UgbGFuZ3VhZ2VcIixcclxuICogICAgIC4uLlxyXG4gKiB9XHJcbiAqIFxyXG4gKiBAYXV0aG9yIFJvYmVydG8gU2ltb25ldHRpXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpIGV4cG9ydCBjbGFzcyBMb2NhbGl6YXRpb25TZXJ2aWNlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBwYXRoIHByZWZpeCBmb3IgdGhlIGFzeW5jaHJvbm91cyBsb2FkaW5nLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHByZWZpeDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRyYW5zbGF0aW9uIGRhdGE6IHtsYW5ndWFnZUNvZGU6IHtrZXk6IHZhbHVlfX0uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHJhbnNsYXRpb25EYXRhOiBhbnkgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsYW5ndWFnZSBjb2RlIGZvciB0aGUgc2VydmljZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGxhbmd1YWdlQ29kZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRpbmcgbW9kZSBmb3IgdGhlIHNlcnZpY2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkaW5nTW9kZTogTG9hZGluZ01vZGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2VydmljZSBzdGF0ZS4gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXJ2aWNlU3RhdGU6IFNlcnZpY2VTdGF0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cCwgcHVibGljIGxvY2FsZTogTG9jYWxlU2VydmljZSkge1xyXG5cclxuICAgICAgICB0aGlzLnByZWZpeCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nTW9kZSA9IExvYWRpbmdNb2RlLlVua25vd247XHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZUNvZGUgPSBcIlwiO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplcyB0aGUgbG9hZGluZyBtb2RlLlxyXG4gICAgICAgIHRoaXMubG9hZGluZ01vZGUgPSBMb2FkaW5nTW9kZS5EaXJlY3Q7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemVzIHRoZSBzZXJ2aWNlIHN0YXRlLlxyXG4gICAgICAgIHRoaXMuc2VydmljZVN0YXRlID0gU2VydmljZVN0YXRlLmlzV2FpdGluZztcclxuXHJcbiAgICAgICAgLy8gV2hlbiB0aGUgbGFuZ3VhZ2UgY2hhbmdlcywgc3Vic2NyaWJlcyB0byB0aGUgZXZlbnQgJiBjYWxsIHVwZGF0ZVRyYW5zbGF0aW9uIG1ldGhvZC5cclxuICAgICAgICB0aGlzLmxvY2FsZS5sYW5ndWFnZUNvZGVDaGFuZ2VkLnN1YnNjcmliZShcclxuXHJcbiAgICAgICAgICAgIC8vIEdlbmVyYXRvciBvciBuZXh0LlxyXG4gICAgICAgICAgICAobGFuZ3VhZ2U6IHN0cmluZykgPT4gdGhpcy51cGRhdGVUcmFuc2xhdGlvbihsYW5ndWFnZSlcclxuXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXJlY3QgbG9hZGluZzogYWRkcyBuZXcgdHJhbnNsYXRpb24gZGF0YS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGxhbmd1YWdlIFRoZSB0d28tbGV0dGVyIGNvZGUgb2YgdGhlIGxhbmd1YWdlIGZvciB0aGUgdHJhbnNsYXRpb24gZGF0YVxyXG4gICAgICogQHBhcmFtIHRyYW5zbGF0aW9uIFRoZSBuZXcgdHJhbnNsYXRpb24gZGF0YVxyXG4gICAgICovXHJcbiAgICBhZGRUcmFuc2xhdGlvbihsYW5ndWFnZTogc3RyaW5nLCB0cmFuc2xhdGlvbjogYW55KSB7XHJcblxyXG4gICAgICAgIC8vIEFkZHMgdGhlIG5ldyB0cmFuc2xhdGlvbiBkYXRhLlxyXG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25EYXRhW2xhbmd1YWdlXSA9IHRyYW5zbGF0aW9uO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFzeW5jaHJvbm91cyBsb2FkaW5nOiBkZWZpbmVzIHRoZSB0cmFuc2xhdGlvbiBwcm92aWRlci5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHByZWZpeCBUaGUgcGF0aCBwcmVmaXggb2YgdGhlIGpzb24gZmlsZXNcclxuICAgICAqL1xyXG4gICAgdHJhbnNsYXRpb25Qcm92aWRlcihwcmVmaXg6IHN0cmluZykge1xyXG5cclxuICAgICAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlcyB0aGUgbG9hZGluZyBtb2RlLlxyXG4gICAgICAgIHRoaXMubG9hZGluZ01vZGUgPSBMb2FkaW5nTW9kZS5Bc3luYztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBqc29uIGRhdGEuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBsYW5ndWFnZSBUaGUgdHdvLWxldHRlciBvciB0aHJlZS1sZXR0ZXIgY29kZSBvZiB0aGUgbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUcmFuc2xhdGlvbihsYW5ndWFnZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemVzIHRoZSB0cmFuc2xhdGlvbiBkYXRhICYgdGhlIHNlcnZpY2Ugc3RhdGUuXHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbkRhdGEgPSB7fTtcclxuICAgICAgICB0aGlzLnNlcnZpY2VTdGF0ZSA9IFNlcnZpY2VTdGF0ZS5pc0xvYWRpbmc7XHJcblxyXG4gICAgICAgIHZhciB1cmw6IHN0cmluZyA9IHRoaXMucHJlZml4ICsgbGFuZ3VhZ2UgKyAnLmpzb24nO1xyXG5cclxuICAgICAgICAvLyBBbmd1bGFyIDIgSHR0cCBtb2R1bGUuXHJcbiAgICAgICAgdGhpcy5odHRwLmdldCh1cmwpXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcblxyXG4gICAgICAgICAgICAvLyBPYnNlcnZlciBvciBuZXh0LlxyXG4gICAgICAgICAgICAocmVzOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBc3NpZ25zIHRoZSBvYnNlcnZlciB0byB0aGUgdHJhbnNsYXRpb24gZGF0YS5cclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25EYXRhW2xhbmd1YWdlXSA9IHJlcztcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyBFcnJvci5cclxuICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTG9jYWxpemF0aW9uIHNlcnZpY2U6XCIsIGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyBDb21wbGV0ZS5cclxuICAgICAgICAgICAgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZXMgdGhlIHNlcnZpY2Ugc3RhdGUuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VTdGF0ZSA9IFNlcnZpY2VTdGF0ZS5pc1JlYWR5O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZXMgdGhlIGxhbmd1YWdlIGNvZGUgb2YgdGhlIHNlcnZpY2UuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmd1YWdlQ29kZSA9IGxhbmd1YWdlO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlcyBhIGtleS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGJlIHRyYW5zbGF0ZWRcclxuICAgICAqIEByZXR1cm4gVGhlIHZhbHVlIG9mIHRyYW5zbGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHRyYW5zbGF0ZShrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIHZhciB2YWx1ZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50cmFuc2xhdGlvbkRhdGFbdGhpcy5sYW5ndWFnZUNvZGVdICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldHMgdGhlIHRyYW5zbGF0aW9uIGJ5IGxhbmd1YWdlIGNvZGUuIFxyXG4gICAgICAgICAgICB2YXIgdHJhbnNsYXRpb246IGFueSA9IHRoaXMudHJhbnNsYXRpb25EYXRhW3RoaXMubGFuZ3VhZ2VDb2RlXTtcclxuICAgICAgICAgICAgLy8gR2V0cyB0aGUgdmFsdWUgb2YgdHJhbnNsYXRpb24gYnkga2V5LiAgIFxyXG4gICAgICAgICAgICB2YWx1ZSA9IHRyYW5zbGF0aW9uW2tleV07XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIHZhbHVlIG9mIHRyYW5zbGF0aW9uIGlzIG5vdCBwcmVzZW50LCB0aGUgc2FtZSBrZXkgaXMgcmV0dXJuZWQgKHNlZSBpc3N1ZSAjMSkuXHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gXCJcIikge1xyXG5cclxuICAgICAgICAgICAgdmFsdWUgPSBrZXk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZXMgYSBrZXkuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBiZSB0cmFuc2xhdGVkXHJcbiAgICAgKiBAcmV0dXJuIEFuIG9ic2VydmFibGUgb2YgdGhlIHZhbHVlIG9mIHRyYW5zbGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHRyYW5zbGF0ZUFzeW5jKGtleTogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPHN0cmluZz4oKG9ic2VydmVyOiBPYnNlcnZlcjxzdHJpbmc+KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXRzIHRoZSB2YWx1ZSBvZiB0cmFuc2xhdGlvbiBmb3IgdGhlIGtleS5cclxuICAgICAgICAgICAgdmFyIHZhbHVlOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZShrZXkpO1xyXG5cclxuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGxhbmd1YWdlIGNvZGUgYW5kIGxvYWRzIHRoZSB0cmFuc2xhdGlvbiBkYXRhIGZvciB0aGUgYXN5bmNocm9ub3VzIGxvYWRpbmcuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBsYW5ndWFnZSBUaGUgdHdvLWxldHRlciBvciB0aHJlZS1sZXR0ZXIgY29kZSBvZiB0aGUgbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgdXBkYXRlVHJhbnNsYXRpb24obGFuZ3VhZ2U6IHN0cmluZyA9IHRoaXMubG9jYWxlLmdldEN1cnJlbnRMYW5ndWFnZSgpKSB7XHJcblxyXG4gICAgICAgIGlmIChsYW5ndWFnZSAhPSBcIlwiICYmIGxhbmd1YWdlICE9IHRoaXMubGFuZ3VhZ2VDb2RlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBBc3luY2hyb25vdXMgbG9hZGluZy5cclxuICAgICAgICAgICAgaWYgKHRoaXMubG9hZGluZ01vZGUgPT0gTG9hZGluZ01vZGUuQXN5bmMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGVzIHRoZSB0cmFuc2xhdGlvbiBkYXRhLiAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRyYW5zbGF0aW9uKGxhbmd1YWdlKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlcyB0aGUgbGFuZ3VhZ2UgY29kZSBvZiB0aGUgc2VydmljZS5cclxuICAgICAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2VDb2RlID0gbGFuZ3VhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlcyB0aGUgc2VydmljZSBzdGF0ZS5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZVN0YXRlID0gU2VydmljZVN0YXRlLmlzUmVhZHk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyogSW50bC5Db2xsYXRvciAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tcGFyZXMgdHdvIGtleXMgYnkgdGhlIHZhbHVlIG9mIHRyYW5zbGF0aW9uICYgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UgY29kZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGtleTEsIGtleTIgVGhlIGtleXMgb2YgdGhlIHZhbHVlcyB0byBjb21wYXJlXHJcbiAgICAgKiBAcGFyYW0gZXh0ZW5zaW9uXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAgICogQHJldHVybiBBIG5lZ2F0aXZlIHZhbHVlIGlmIHRoZSB2YWx1ZSBvZiB0cmFuc2xhdGlvbiBvZiBrZXkxIGNvbWVzIGJlZm9yZSB0aGUgdmFsdWUgb2YgdHJhbnNsYXRpb24gb2Yga2V5MjsgYSBwb3NpdGl2ZSB2YWx1ZSBpZiBrZXkxIGNvbWVzIGFmdGVyIGtleTI7IDAgaWYgdGhleSBhcmUgY29uc2lkZXJlZCBlcXVhbCBvciBJbnRsLkNvbGxhdG9yIGlzIG5vdCBzdXBwb3J0ZWRcclxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQ29sbGF0b3JcclxuICAgICAqL1xyXG4gICAgY29tcGFyZShrZXkxOiBzdHJpbmcsIGtleTI6IHN0cmluZywgZXh0ZW5zaW9uPzogc3RyaW5nLCBvcHRpb25zPzogYW55KTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2tzIGZvciBzdXBwb3J0IGZvciBJbnRsLlxyXG4gICAgICAgIGlmIChJbnRsU3VwcG9ydC5Db2xsYXRvcih0aGlzLmxhbmd1YWdlQ29kZSkgPT0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdldHMgdGhlIHZhbHVlIG9mIHRyYW5zbGF0aW9uIGZvciB0aGUga2V5cy5cclxuICAgICAgICB2YXIgdmFsdWUxOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZShrZXkxKTtcclxuICAgICAgICB2YXIgdmFsdWUyOiBzdHJpbmcgPSB0aGlzLnRyYW5zbGF0ZShrZXkyKTs7XHJcblxyXG4gICAgICAgIHZhciBsb2NhbGU6IHN0cmluZyA9IHRoaXMuYWRkRXh0ZW5zaW9uKHRoaXMubGFuZ3VhZ2VDb2RlLCBleHRlbnNpb24pO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IEludGwuQ29sbGF0b3IobG9jYWxlKS5jb21wYXJlKHZhbHVlMSwgdmFsdWUyKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTb3J0cyBhbiBhcnJheSBvZiBvYmplY3RzIG9yIGFuIGFycmF5IG9mIGFycmF5cyBieSB0aGUgY3VycmVudCBsYW5ndWFnZSBjb2RlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gbGlzdCBUaGUgYXJyYXkgdG8gYmUgc29ydGVkXHJcbiAgICAgKiBAcGFyYW0ga2V5TmFtZSBUaGUgY29sdW1uIHRoYXQgY29udGFpbnMgdGhlIGtleXMgb2YgdGhlIHZhbHVlcyB0byBiZSBvcmRlcmVkXHJcbiAgICAgKiBAcGFyYW0gb3JkZXIgJ2FzYycgb3IgJ2Rlc2MnLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAnYXNjJy5cclxuICAgICAqIEBwYXJhbSBleHRlbnNpb25cclxuICAgICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBzYW1lIHNvcnRlZCBsaXN0IG9yIHRoZSBzYW1lIGxpc3QgaWYgSW50bC5Db2xsYXRvciBpcyBub3Qgc3VwcG9ydGVkXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0NvbGxhdG9yXHJcbiAgICAgKi9cclxuICAgIHNvcnQobGlzdDogQXJyYXk8YW55Piwga2V5TmFtZTogYW55LCBvcmRlcj86IHN0cmluZywgZXh0ZW5zaW9uPzogc3RyaW5nLCBvcHRpb25zPzogYW55KTogQXJyYXk8YW55PiB7XHJcblxyXG4gICAgICAgIGlmIChsaXN0ID09IG51bGwgfHwga2V5TmFtZSA9PSBudWxsIHx8IEludGxTdXBwb3J0LkNvbGxhdG9yKHRoaXMubGFuZ3VhZ2VDb2RlKSA9PSBmYWxzZSkgcmV0dXJuIGxpc3Q7XHJcblxyXG4gICAgICAgIC8vIEdldHMgdGhlIHZhbHVlIG9mIHRyYW5zbGF0aW9uIGZvciB0aGUga2V5cy5cclxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldHMgdGhlIHZhbHVlIG9mIHRyYW5zbGF0aW9uIGZvciB0aGUga2V5LlxyXG4gICAgICAgICAgICB2YXIgdmFsdWU6IHN0cmluZyA9IHRoaXMudHJhbnNsYXRlKGl0ZW1ba2V5TmFtZV0pO1xyXG4gICAgICAgICAgICAvLyBBZGRzIGEgbmV3IGNvbHVtbiBmb3IgdHJhbnNsYXRlZCB2YWx1ZXMuXHJcbiAgICAgICAgICAgIHZhciB0cmFuc2xhdGVkOiBzdHJpbmcgPSBrZXlOYW1lLmNvbmNhdChcIlRyYW5zbGF0ZWRcIilcclxuICAgICAgICAgICAgLy8gVXBkYXRlcyB0aGUgdmFsdWUgaW4gdGhlIGxpc3QuXHJcbiAgICAgICAgICAgIGl0ZW1bdHJhbnNsYXRlZF0gPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbG9jYWxlOiBzdHJpbmcgPSB0aGlzLmFkZEV4dGVuc2lvbih0aGlzLmxhbmd1YWdlQ29kZSwgZXh0ZW5zaW9uKTtcclxuXHJcbiAgICAgICAgLy8gSW50bC5Db2xsYXRvci5cclxuICAgICAgICB2YXIgY29sbGF0b3IgPSBuZXcgSW50bC5Db2xsYXRvcihsb2NhbGUsIG9wdGlvbnMpOyAvLyBJdCBjYW4gYmUgcGFzc2VkIGRpcmVjdGx5IHRvIEFycmF5LnByb3RvdHlwZS5zb3J0LlxyXG5cclxuICAgICAgICBsaXN0LnNvcnQoKGEsIGIpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb2xsYXRvci5jb21wYXJlKGFbdHJhbnNsYXRlZF0sIGJbdHJhbnNsYXRlZF0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlcyB0aGUgY29sdW1uIG9mIHRyYW5zbGF0ZWQgdmFsdWVzLlxyXG4gICAgICAgIHZhciBpbmRleCA9IGxpc3QuaW5kZXhPZih0cmFuc2xhdGVkLCAwKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXNjZW5kaW5nIG9yZGVyLlxyXG4gICAgICAgIGlmIChvcmRlciAhPSBudWxsICYmIG9yZGVyID09ICdkZXNjJykge1xyXG5cclxuICAgICAgICAgICAgbGlzdC5yZXZlcnNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU29ydHMgYW4gYXJyYXkgb2Ygb2JqZWN0cyBvciBhbiBhcnJheSBvZiBhcnJheXMgYnkgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UgY29kZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGxpc3QgVGhlIGFycmF5IHRvIGJlIHNvcnRlZFxyXG4gICAgICogQHBhcmFtIGtleU5hbWUgVGhlIGNvbHVtbiB0aGF0IGNvbnRhaW5zIHRoZSBrZXlzIG9mIHRoZSB2YWx1ZXMgdG8gYmUgb3JkZXJlZFxyXG4gICAgICogQHBhcmFtIG9yZGVyICdhc2MnIG9yICdkZXNjJy4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgJ2FzYycuXHJcbiAgICAgKiBAcGFyYW0gZXh0ZW5zaW9uXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAgICogQHJldHVybiBBbiBvYnNlcnZhYmxlIG9mIHRoZSBzb3J0ZWQgbGlzdCBvciBvZiB0aGUgc2FtZSBsaXN0IGlmIEludGwuQ29sbGF0b3IgaXMgbm90IHN1cHBvcnRlZFxyXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9Db2xsYXRvclxyXG4gICAgICovXHJcbiAgICBzb3J0QXN5bmMobGlzdDogQXJyYXk8YW55Piwga2V5TmFtZTogYW55LCBvcmRlcj86IHN0cmluZywgZXh0ZW5zaW9uPzogc3RyaW5nLCBvcHRpb25zPzogYW55KTogT2JzZXJ2YWJsZTxBcnJheTxhbnk+PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxhbnk+KChvYnNlcnZlcjogT2JzZXJ2ZXI8QXJyYXk8YW55Pj4pID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldHMgdGhlIHNvcnRlZCBsaXN0LlxyXG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRoaXMuc29ydChsaXN0LCBrZXlOYW1lLCBvcmRlciwgZXh0ZW5zaW9uLCBvcHRpb25zKSk7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hdGNoZXMgYSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBvYmplY3RzIG9yIGFuIGFycmF5IG9mIGFycmF5cy5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHMgVGhlIHN0cmluZyB0byBzZWFyY2hcclxuICAgICAqIEBwYXJhbSBsaXN0IFRoZSBhcnJheSB0byBsb29rIGZvclxyXG4gICAgICogQHBhcmFtIGtleU5hbWVzIEFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIGNvbHVtbnMgdG8gbG9vayBmb3JcclxuICAgICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJuIEEgZmlsdGVyZWQgbGlzdCBvciB0aGUgc2FtZSBsaXN0IGlmIEludGwuQ29sbGF0b3IgaXMgbm90IHN1cHBvcnRlZFxyXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9Db2xsYXRvclxyXG4gICAgICovXHJcbiAgICBzZWFyY2goczogc3RyaW5nLCBsaXN0OiBBcnJheTxhbnk+LCBrZXlOYW1lczogYW55W10sIG9wdGlvbnM6IGFueSA9IHsgdXNhZ2U6ICdzZWFyY2gnIH0pOiBBcnJheTxhbnk+IHtcclxuXHJcbiAgICAgICAgaWYgKGxpc3QgPT0gbnVsbCB8fCBrZXlOYW1lcyA9PSBudWxsIHx8IHMgPT0gXCJcIiB8fCBJbnRsU3VwcG9ydC5Db2xsYXRvcih0aGlzLmxhbmd1YWdlQ29kZSkgPT0gZmFsc2UpIHJldHVybiBsaXN0O1xyXG5cclxuICAgICAgICAvLyBHZXRzIHRoZSB2YWx1ZSBvZiB0cmFuc2xhdGlvbiBmb3IgdGhlIGVhY2ggY29sdW1uLlxyXG4gICAgICAgIHZhciB0cmFuc2xhdGVkID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuXHJcbiAgICAgICAgdmFyIGk6IG51bWJlciA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IGtleU5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGRzIGEgbmV3IGNvbHVtbiBmb3IgdHJhbnNsYXRlZCB2YWx1ZXMuXHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChrZXlOYW1lc1tpXS5jb25jYXQoXCJUcmFuc2xhdGVkXCIpKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdldHMgdGhlIHZhbHVlcyBvZiB0cmFuc2xhdGlvbiBmb3IgdGhlIGNvbHVtbi5cclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUoaXRlbVtrZXlOYW1lc1tpXV0pO1xyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlcyB0aGUgdmFsdWUgaW4gdGhlIGxpc3QuXHJcbiAgICAgICAgICAgICAgICBpdGVtW3RyYW5zbGF0ZWRbaV1dID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxvY2FsZTogc3RyaW5nID0gdGhpcy5sYW5ndWFnZUNvZGU7XHJcblxyXG4gICAgICAgIC8vIEludGwuQ29sbGF0b3IuXHJcbiAgICAgICAgdmFyIGNvbGxhdG9yID0gbmV3IEludGwuQ29sbGF0b3IobG9jYWxlLCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBsaXN0LmZpbHRlcigodikgPT4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvdW5kOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0cmFuc2xhdGVkLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2FsbHMgbWF0Y2hpbmcgYWxnb3JpdGhtLlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2godlt0cmFuc2xhdGVkW2ldXSwgcywgY29sbGF0b3IpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmVzIHRoZSBjb2x1bW5zIG9mIHRyYW5zbGF0ZWQgdmFsdWVzLlxyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0cmFuc2xhdGVkLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBtYXRjaGVzLmluZGV4T2YodHJhbnNsYXRlZFtpXSwgMCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaGVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWF0Y2hlcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXRjaGVzIGEgc3RyaW5nIGludG8gYW4gYXJyYXkgb2Ygb2JqZWN0cyBvciBhbiBhcnJheSBvZiBhcnJheXMuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBzIFRoZSBzdHJpbmcgdG8gc2VhcmNoXHJcbiAgICAgKiBAcGFyYW0gbGlzdCBUaGUgYXJyYXkgdG8gbG9vayBmb3JcclxuICAgICAqIEBwYXJhbSBrZXlOYW1lcyBBbiBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSBjb2x1bW5zIHRvIGxvb2sgZm9yXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAgICogQHJldHVybiBBbiBvYnNlcnZhYmxlIGZvciBlYWNoIGVsZW1lbnQgb2YgdGhlIGZpbHRlcmVkIGxpc3Qgb3IgdGhlIHNhbWUgbGlzdCBpZiBJbnRsLkNvbGxhdG9yIGlzIG5vdCBzdXBwb3J0ZWRcclxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQ29sbGF0b3JcclxuICAgICAqL1xyXG4gICAgc2VhcmNoQXN5bmMoczogc3RyaW5nLCBsaXN0OiBBcnJheTxhbnk+LCBrZXlOYW1lczogYW55W10sIG9wdGlvbnM6IGFueSA9IHsgdXNhZ2U6ICdzZWFyY2gnIH0pOiBPYnNlcnZhYmxlPGFueT4ge1xyXG5cclxuICAgICAgICBpZiAobGlzdCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGtleU5hbWVzID09IG51bGwgfHwgcyA9PSBcIlwiIHx8IEludGxTdXBwb3J0LkNvbGxhdG9yKHRoaXMubGFuZ3VhZ2VDb2RlKSA9PSBmYWxzZSkgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGFueT4oKG9ic2VydmVyOiBPYnNlcnZlcjxhbnk+KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxhbnk+KChvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PikgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0cyB0aGUgdmFsdWUgb2YgdHJhbnNsYXRpb24gZm9yIHRoZSBlYWNoIGNvbHVtbi5cclxuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZWQgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGk6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBrZXlOYW1lcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZHMgYSBuZXcgY29sdW1uIGZvciB0cmFuc2xhdGVkIHZhbHVlcy5cclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQucHVzaChrZXlOYW1lc1tpXS5jb25jYXQoXCJUcmFuc2xhdGVkXCIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0cyB0aGUgdmFsdWVzIG9mIHRyYW5zbGF0aW9uIGZvciB0aGUgY29sdW1uLlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZTogc3RyaW5nID0gdGhpcy50cmFuc2xhdGUoaXRlbVtrZXlOYW1lc1tpXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZXMgdGhlIHZhbHVlIGluIHRoZSBsaXN0LlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1bdHJhbnNsYXRlZFtpXV0gPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbG9jYWxlOiBzdHJpbmcgPSB0aGlzLmxhbmd1YWdlQ29kZTtcclxuXHJcbiAgICAgICAgICAgIC8vIEludGwuQ29sbGF0b3IuXHJcbiAgICAgICAgICAgIHZhciBjb2xsYXRvciA9IG5ldyBJbnRsLkNvbGxhdG9yKGxvY2FsZSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIGxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdHJhbnNsYXRlZC5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDYWxscyBtYXRjaGluZyBhbGdvcml0aG0uXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2godlt0cmFuc2xhdGVkW2ldXSwgcywgY29sbGF0b3IpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZXMgdGhlIGNvbHVtbnMgb2YgdHJhbnNsYXRlZCB2YWx1ZXMuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0cmFuc2xhdGVkLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gbGlzdC5pbmRleE9mKHRyYW5zbGF0ZWRbaV0sIDApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkRXh0ZW5zaW9uKGxvY2FsZTogc3RyaW5nLCBleHRlbnNpb24/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICAvLyBBZGRzIGV4dGVuc2lvbi5cclxuICAgICAgICBpZiAoZXh0ZW5zaW9uICE9IG51bGwgJiYgZXh0ZW5zaW9uICE9IFwiXCIpIHtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsZSA9IGxvY2FsZSArIFwiLVwiICsgZXh0ZW5zaW9uO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBsb2NhbGU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWF0Y2hpbmcgYWxnb3JpdGhtLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdiBUaGUgdmFsdWVcclxuICAgICAqIEBwYXJhbSBzIFRoZSBzdHJpbmcgdG8gc2VhcmNoXHJcbiAgICAgKiByZXR1cm4gVHJ1ZSBpZiBtYXRjaCwgb3RoZXJ3aXNlIGZhbHNlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbWF0Y2godjogc3RyaW5nLCBzOiBzdHJpbmcsIGNvbGxhdG9yOiBJbnRsLkNvbGxhdG9yKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIHZhciB2TGVuZ3RoOiBudW1iZXIgPSB2Lmxlbmd0aDtcclxuICAgICAgICB2YXIgc0xlbmd0aDogbnVtYmVyID0gcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmIChzTGVuZ3RoID4gdkxlbmd0aCkgcmV0dXJuIGZhbHNlOyAvLyBUaGUgc2VhcmNoIHN0cmluZyBpcyBsb25nZXIgdGhhbiB2YWx1ZS5cclxuXHJcbiAgICAgICAgaWYgKHNMZW5ndGggPT0gdkxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbGxhdG9yLmNvbXBhcmUodiwgcykgPT09IDA7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVHJpZXMgdG8gc2VhcmNoIHRoZSBzdWJzdHJpbmcuXHJcbiAgICAgICAgdmFyIGZvdW5kOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IHZMZW5ndGggLSAoc0xlbmd0aCAtIDEpOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdHI6IHN0cmluZyA9IHYuc3Vic3RyKGksIHNMZW5ndGgpO1xyXG4gICAgICAgICAgICBpZiAoY29sbGF0b3IuY29tcGFyZShzdHIsIHMpID09PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIHRoZSBzZXJ2aWNlIHN0YXRlLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gU2VydmljZVN0YXRlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0cmFuc2xhdGlvbiBkYXRhIGhhcyBiZWVuIGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgaXNSZWFkeSxcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHNlcnZpY2UgaXMgbG9hZGluZyB0aGUgZGF0YS5cclxuICAgICAqL1xyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2VydmljZSBpcyB3YWl0aW5nIGZvciB0aGUgZGF0YS5cclxuICAgICAqL1xyXG4gICAgaXNXYWl0aW5nXHJcblxyXG59XHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgbG9hZGluZyBtb2RlLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gTG9hZGluZ01vZGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbCBzdGF0ZS5cclxuICAgICAqL1xyXG4gICAgVW5rbm93bixcclxuICAgIC8qKlxyXG4gICAgICogRGlyZWN0IGxvYWRpbmcuXHJcbiAgICAgKi9cclxuICAgIERpcmVjdCxcclxuICAgIC8qKlxyXG4gICAgICogQXN5bmNocm9ub3VzIGxvYWRpbmcuXHJcbiAgICAgKi9cclxuICAgIEFzeW5jXHJcblxyXG59ICJdfQ==