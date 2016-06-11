System.registerDynamic("angular2localization/src/services/locale", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Locale = (function() {
    function Locale(locale, localization) {
      this.locale = locale;
      this.localization = localization;
    }
    Object.defineProperty(Locale.prototype, "lang", {
      get: function() {
        return this.localization.languageCode;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Locale.prototype, "defaultLocale", {
      get: function() {
        return this.locale.getDefaultLocale();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Locale.prototype, "currency", {
      get: function() {
        return this.locale.getCurrentCurrency();
      },
      enumerable: true,
      configurable: true
    });
    return Locale;
  }());
  exports.Locale = Locale;
  return module.exports;
});

System.registerDynamic("angular2localization/src/services/localization.service", ["@angular/core", "@angular/http", "rxjs/Observable", "rxjs/add/operator/map", "./locale.service", "./Intl-support"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var http_1 = $__require('@angular/http');
  var Observable_1 = $__require('rxjs/Observable');
  $__require('rxjs/add/operator/map');
  var locale_service_1 = $__require('./locale.service');
  var Intl_support_1 = $__require('./Intl-support');
  var LocalizationService = (function() {
    function LocalizationService(http, locale) {
      var _this = this;
      this.http = http;
      this.locale = locale;
      this.translationData = {};
      this.prefix = "";
      this.loadingMode = LoadingMode.Unknown;
      this.languageCode = "";
      this.loadingMode = LoadingMode.Direct;
      this.serviceState = ServiceState.isWaiting;
      this.locale.languageCodeChanged.subscribe(function(language) {
        return _this.updateTranslation(language);
      });
    }
    LocalizationService.prototype.addTranslation = function(language, translation) {
      this.translationData[language] = translation;
    };
    LocalizationService.prototype.translationProvider = function(prefix) {
      this.prefix = prefix;
      this.loadingMode = LoadingMode.Async;
    };
    LocalizationService.prototype.getTranslation = function(language) {
      var _this = this;
      this.translationData = {};
      this.serviceState = ServiceState.isLoading;
      var url = this.prefix + language + '.json';
      this.http.get(url).map(function(res) {
        return res.json();
      }).subscribe(function(res) {
        _this.translationData[language] = res;
      }, function(error) {
        console.error("Localization service:", error);
      }, function() {
        _this.serviceState = ServiceState.isReady;
        _this.languageCode = language;
      });
    };
    LocalizationService.prototype.translate = function(key) {
      var value;
      if (this.translationData[this.languageCode] != null) {
        var translation = this.translationData[this.languageCode];
        value = translation[key];
      }
      if (value == null || value == "") {
        value = key;
      }
      return value;
    };
    LocalizationService.prototype.translateAsync = function(key) {
      var _this = this;
      return new Observable_1.Observable(function(observer) {
        var value = _this.translate(key);
        observer.next(value);
        observer.complete();
      });
    };
    LocalizationService.prototype.updateTranslation = function(language) {
      if (language === void 0) {
        language = this.locale.getCurrentLanguage();
      }
      if (language != "" && language != this.languageCode) {
        if (this.loadingMode == LoadingMode.Async) {
          this.getTranslation(language);
        } else {
          this.languageCode = language;
          this.serviceState = ServiceState.isReady;
        }
      }
    };
    LocalizationService.prototype.compare = function(key1, key2, extension, options) {
      if (Intl_support_1.IntlSupport.Collator(this.languageCode) == false) {
        return 0;
      }
      var value1 = this.translate(key1);
      var value2 = this.translate(key2);
      ;
      var locale = this.addExtension(this.languageCode, extension);
      return new Intl.Collator(locale).compare(value1, value2);
    };
    LocalizationService.prototype.sort = function(list, keyName, order, extension, options) {
      if (list == null || keyName == null || Intl_support_1.IntlSupport.Collator(this.languageCode) == false)
        return list;
      for (var _i = 0,
          list_1 = list; _i < list_1.length; _i++) {
        var item = list_1[_i];
        var value = this.translate(item[keyName]);
        var translated = keyName.concat("Translated");
        item[translated] = value;
      }
      var locale = this.addExtension(this.languageCode, extension);
      var collator = new Intl.Collator(locale, options);
      list.sort(function(a, b) {
        return collator.compare(a[translated], b[translated]);
      });
      var index = list.indexOf(translated, 0);
      if (index > -1) {
        list.splice(index, 1);
      }
      if (order != null && order == 'desc') {
        list.reverse();
      }
      return list;
    };
    LocalizationService.prototype.sortAsync = function(list, keyName, order, extension, options) {
      var _this = this;
      return new Observable_1.Observable(function(observer) {
        observer.next(_this.sort(list, keyName, order, extension, options));
        observer.complete();
      });
    };
    LocalizationService.prototype.search = function(s, list, keyNames, options) {
      var _this = this;
      if (options === void 0) {
        options = {usage: 'search'};
      }
      if (list == null || keyNames == null || s == "" || Intl_support_1.IntlSupport.Collator(this.languageCode) == false)
        return list;
      var translated = new Array();
      var i = 0;
      for (var i = 0; i < keyNames.length; i++) {
        translated.push(keyNames[i].concat("Translated"));
        for (var _i = 0,
            list_2 = list; _i < list_2.length; _i++) {
          var item = list_2[_i];
          var value = this.translate(item[keyNames[i]]);
          item[translated[i]] = value;
        }
      }
      var locale = this.languageCode;
      var collator = new Intl.Collator(locale, options);
      var matches = list.filter(function(v) {
        var found = false;
        for (var i = 0; i < translated.length; i++) {
          if (_this.match(v[translated[i]], s, collator)) {
            found = true;
            break;
          }
        }
        return found;
      });
      for (var i = 0; i < translated.length; i++) {
        var index = matches.indexOf(translated[i], 0);
        if (index > -1) {
          matches.splice(index, 1);
        }
      }
      return matches;
    };
    LocalizationService.prototype.searchAsync = function(s, list, keyNames, options) {
      var _this = this;
      if (options === void 0) {
        options = {usage: 'search'};
      }
      if (list == null)
        return null;
      if (keyNames == null || s == "" || Intl_support_1.IntlSupport.Collator(this.languageCode) == false)
        return new Observable_1.Observable(function(observer) {
          for (var _i = 0,
              list_3 = list; _i < list_3.length; _i++) {
            var item = list_3[_i];
            observer.next(item);
          }
          observer.complete();
        });
      return new Observable_1.Observable(function(observer) {
        var translated = new Array();
        var i = 0;
        for (var i = 0; i < keyNames.length; i++) {
          translated.push(keyNames[i].concat("Translated"));
          for (var _i = 0,
              list_4 = list; _i < list_4.length; _i++) {
            var item = list_4[_i];
            var value = _this.translate(item[keyNames[i]]);
            item[translated[i]] = value;
          }
        }
        var locale = _this.languageCode;
        var collator = new Intl.Collator(locale, options);
        for (var _a = 0,
            list_5 = list; _a < list_5.length; _a++) {
          var v = list_5[_a];
          for (var i = 0; i < translated.length; i++) {
            if (_this.match(v[translated[i]], s, collator)) {
              observer.next(v);
              break;
            }
          }
        }
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
    LocalizationService.prototype.addExtension = function(locale, extension) {
      if (extension != null && extension != "") {
        locale = locale + "-" + extension;
      }
      return locale;
    };
    LocalizationService.prototype.match = function(v, s, collator) {
      var vLength = v.length;
      var sLength = s.length;
      if (sLength > vLength)
        return false;
      if (sLength == vLength) {
        return collator.compare(v, s) === 0;
      }
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
    LocalizationService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [http_1.Http, locale_service_1.LocaleService])], LocalizationService);
    return LocalizationService;
  }());
  exports.LocalizationService = LocalizationService;
  (function(ServiceState) {
    ServiceState[ServiceState["isReady"] = 0] = "isReady";
    ServiceState[ServiceState["isLoading"] = 1] = "isLoading";
    ServiceState[ServiceState["isWaiting"] = 2] = "isWaiting";
  })(exports.ServiceState || (exports.ServiceState = {}));
  var ServiceState = exports.ServiceState;
  (function(LoadingMode) {
    LoadingMode[LoadingMode["Unknown"] = 0] = "Unknown";
    LoadingMode[LoadingMode["Direct"] = 1] = "Direct";
    LoadingMode[LoadingMode["Async"] = 2] = "Async";
  })(exports.LoadingMode || (exports.LoadingMode = {}));
  var LoadingMode = exports.LoadingMode;
  return module.exports;
});

System.registerDynamic("angular2localization/src/pipes/translate.pipe", ["@angular/core", "@angular/common/src/facade/intl", "../services/localization.service", "../services/locale.service", "../services/locale-number", "../services/Intl-support"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var intl_1 = $__require('@angular/common/src/facade/intl');
  var localization_service_1 = $__require('../services/localization.service');
  var locale_service_1 = $__require('../services/locale.service');
  var locale_number_1 = $__require('../services/locale-number');
  var Intl_support_1 = $__require('../services/Intl-support');
  var TranslatePipe = (function() {
    function TranslatePipe(localization, locale) {
      this.localization = localization;
      this.locale = locale;
    }
    TranslatePipe.prototype.transform = function(key, lang) {
      if (this.localization.serviceState == localization_service_1.ServiceState.isReady) {
        var REGEXP = /^\d+\b/;
        var keyStr = key;
        if (REGEXP.exec(key) != null) {
          var keyNum = parseFloat(key);
          keyStr = key.replace(REGEXP, '');
          keyStr = keyStr.trim();
          if (!isNaN(keyNum) && Intl_support_1.IntlSupport.NumberFormat(this.locale.getDefaultLocale()) == true) {
            key = key.replace(/^\d+/, locale_number_1.LocaleNumber.format(this.locale.getDefaultLocale(), keyNum, intl_1.NumberFormatStyle.Decimal, '1.0-3'));
          }
        }
        var value = this.localization.translate(keyStr);
        return key.replace(keyStr, value);
      }
      return key;
    };
    TranslatePipe = __decorate([core_1.Pipe({
      name: 'translate',
      pure: true
    }), core_1.Injectable(), __metadata('design:paramtypes', [localization_service_1.LocalizationService, locale_service_1.LocaleService])], TranslatePipe);
    return TranslatePipe;
  }());
  exports.TranslatePipe = TranslatePipe;
  return module.exports;
});

System.registerDynamic("angular2localization/src/pipes/locale-date.pipe", ["@angular/core", "@angular/common/src/facade/lang", "@angular/common/src/facade/intl", "@angular/common/src/facade/collection", "@angular/common/src/pipes/invalid_pipe_argument_exception", "../services/Intl-support"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var lang_1 = $__require('@angular/common/src/facade/lang');
  var intl_1 = $__require('@angular/common/src/facade/intl');
  var collection_1 = $__require('@angular/common/src/facade/collection');
  var invalid_pipe_argument_exception_1 = $__require('@angular/common/src/pipes/invalid_pipe_argument_exception');
  var Intl_support_1 = $__require('../services/Intl-support');
  var LocaleDatePipe = (function() {
    function LocaleDatePipe() {}
    LocaleDatePipe.prototype.transform = function(value, defaultLocale, pattern) {
      if (pattern === void 0) {
        pattern = 'mediumDate';
      }
      if (lang_1.isBlank(value))
        return null;
      if (!this.supports(value)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(LocaleDatePipe, value);
      }
      if (lang_1.isNumber(value)) {
        value = lang_1.DateWrapper.fromMillis(value);
      }
      if (Intl_support_1.IntlSupport.DateTimeFormat(defaultLocale) == true) {
        if (collection_1.StringMapWrapper.contains(LocaleDatePipe.ALIASES, pattern)) {
          pattern = collection_1.StringMapWrapper.get(LocaleDatePipe.ALIASES, pattern);
        }
        return intl_1.DateFormatter.format(value, defaultLocale, pattern);
      }
      return value;
    };
    LocaleDatePipe.prototype.supports = function(obj) {
      return lang_1.isDate(obj) || lang_1.isNumber(obj);
    };
    LocaleDatePipe.ALIASES = {
      'medium': 'yMMMdjms',
      'short': 'yMdjm',
      'fullDate': 'yMMMMEEEEd',
      'longDate': 'yMMMMd',
      'mediumDate': 'yMMMd',
      'shortDate': 'yMd',
      'mediumTime': 'jms',
      'shortTime': 'jm'
    };
    LocaleDatePipe = __decorate([core_1.Pipe({
      name: 'localedate',
      pure: true
    }), core_1.Injectable(), __metadata('design:paramtypes', [])], LocaleDatePipe);
    return LocaleDatePipe;
  }());
  exports.LocaleDatePipe = LocaleDatePipe;
  return module.exports;
});

System.registerDynamic("angular2localization/src/pipes/locale-number.pipe", ["@angular/core", "@angular/common/src/facade/intl", "../services/locale-number", "../services/Intl-support"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var intl_1 = $__require('@angular/common/src/facade/intl');
  var locale_number_1 = $__require('../services/locale-number');
  var Intl_support_1 = $__require('../services/Intl-support');
  var LocaleDecimalPipe = (function() {
    function LocaleDecimalPipe() {}
    LocaleDecimalPipe.prototype.transform = function(value, defaultLocale, digits) {
      if (digits === void 0) {
        digits = null;
      }
      if (Intl_support_1.IntlSupport.NumberFormat(defaultLocale) == true) {
        return locale_number_1.LocaleNumber.format(defaultLocale, value, intl_1.NumberFormatStyle.Decimal, digits);
      }
      return value;
    };
    LocaleDecimalPipe = __decorate([core_1.Pipe({
      name: 'localedecimal',
      pure: true
    }), core_1.Injectable(), __metadata('design:paramtypes', [])], LocaleDecimalPipe);
    return LocaleDecimalPipe;
  }());
  exports.LocaleDecimalPipe = LocaleDecimalPipe;
  var LocalePercentPipe = (function() {
    function LocalePercentPipe() {}
    LocalePercentPipe.prototype.transform = function(value, defaultLocale, digits) {
      if (digits === void 0) {
        digits = null;
      }
      if (Intl_support_1.IntlSupport.NumberFormat(defaultLocale) == true) {
        return locale_number_1.LocaleNumber.format(defaultLocale, value, intl_1.NumberFormatStyle.Percent, digits);
      }
      return value;
    };
    LocalePercentPipe = __decorate([core_1.Pipe({
      name: 'localepercent',
      pure: true
    }), core_1.Injectable(), __metadata('design:paramtypes', [])], LocalePercentPipe);
    return LocalePercentPipe;
  }());
  exports.LocalePercentPipe = LocalePercentPipe;
  var LocaleCurrencyPipe = (function() {
    function LocaleCurrencyPipe() {}
    LocaleCurrencyPipe.prototype.transform = function(value, defaultLocale, currency, symbolDisplay, digits) {
      if (symbolDisplay === void 0) {
        symbolDisplay = false;
      }
      if (digits === void 0) {
        digits = null;
      }
      if (Intl_support_1.IntlSupport.NumberFormat(defaultLocale) == true) {
        return locale_number_1.LocaleNumber.format(defaultLocale, value, intl_1.NumberFormatStyle.Currency, digits, currency, symbolDisplay);
      }
      return value + " " + currency;
    };
    LocaleCurrencyPipe = __decorate([core_1.Pipe({
      name: 'localecurrency',
      pure: true
    }), core_1.Injectable(), __metadata('design:paramtypes', [])], LocaleCurrencyPipe);
    return LocaleCurrencyPipe;
  }());
  exports.LocaleCurrencyPipe = LocaleCurrencyPipe;
  return module.exports;
});

System.registerDynamic("angular2localization/src/services/locale.service", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var LocaleService = (function() {
    function LocaleService() {
      this.languageCodeChanged = new core_1.EventEmitter();
      this.countryCodeChanged = new core_1.EventEmitter();
      this.currencyCodeChanged = new core_1.EventEmitter();
      this.scriptCodeChanged = new core_1.EventEmitter();
      this.numberingSystemChanged = new core_1.EventEmitter();
      this.calendarChanged = new core_1.EventEmitter();
      this.languageCodes = [];
      this.enableCookie = false;
      this.languageCode = "";
      this.countryCode = "";
      this.currencyCode = "";
      this.defaultLocale = "";
      this.scriptCode = "";
      this.numberingSystem = "";
      this.calendar = "";
      LocaleService.referenceCounter++;
      if (LocaleService.referenceCounter == 1) {
        this.enableCookie = true;
      }
    }
    LocaleService.prototype.addLanguage = function(language) {
      this.languageCodes.push(language);
    };
    LocaleService.prototype.definePreferredLanguage = function(defaultLanguage, expiry) {
      this.expiry = expiry;
      this.parseCookie("locale");
      if (this.languageCode == "") {
        var browserLanguage = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage;
        var index = browserLanguage.indexOf('-');
        if (index != -1) {
          browserLanguage = browserLanguage.substring(0, index);
        }
        if (this.languageCodes.length > 0 && this.languageCodes.indexOf(browserLanguage) != -1) {
          this.languageCode = browserLanguage;
        } else {
          this.languageCode = defaultLanguage;
        }
      }
      this.setDefaultLocale();
    };
    LocaleService.prototype.definePreferredLocale = function(defaultLanguage, defaultCountry, expiry, script, numberingSystem, calendar) {
      if (script === void 0) {
        script = "";
      }
      if (numberingSystem === void 0) {
        numberingSystem = "";
      }
      if (calendar === void 0) {
        calendar = "";
      }
      this.expiry = expiry;
      this.parseCookie("locale");
      if (this.languageCode == "" || this.countryCode == "") {
        this.languageCode = defaultLanguage;
        this.countryCode = defaultCountry;
        this.scriptCode = script;
        this.numberingSystem = numberingSystem;
        this.calendar = calendar;
      }
      this.setDefaultLocale();
    };
    LocaleService.prototype.definePreferredCurrency = function(defaultCurrency) {
      this.parseCookie("currency");
      if (this.currencyCode == "") {
        this.currencyCode = defaultCurrency;
      }
      if (this.enableCookie == true && this.languageCodes.length > 0) {
        this.setCookie("currency", this.currencyCode, this.expiry);
      }
    };
    LocaleService.prototype.getCurrentLanguage = function() {
      return this.languageCode;
    };
    LocaleService.prototype.getCurrentCountry = function() {
      return this.countryCode;
    };
    LocaleService.prototype.getCurrentCurrency = function() {
      return this.currencyCode;
    };
    LocaleService.prototype.getScript = function() {
      return this.scriptCode;
    };
    LocaleService.prototype.getNumberingSystem = function() {
      return this.numberingSystem;
    };
    LocaleService.prototype.getCalendar = function() {
      return this.calendar;
    };
    LocaleService.prototype.setCurrentLanguage = function(language) {
      if (this.languageCode != language) {
        this.languageCode = language;
        this.languageCodeChanged.emit(language);
        this.setDefaultLocale();
      }
    };
    LocaleService.prototype.setCurrentLocale = function(language, country, script, numberingSystem, calendar) {
      if (script === void 0) {
        script = "";
      }
      if (numberingSystem === void 0) {
        numberingSystem = "";
      }
      if (calendar === void 0) {
        calendar = "";
      }
      if (this.languageCode != language || this.countryCode != country || this.scriptCode != script || this.numberingSystem != numberingSystem || this.calendar != calendar) {
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
        this.setDefaultLocale();
      }
    };
    LocaleService.prototype.setCurrentCurrency = function(currency) {
      if (this.currencyCode != currency) {
        this.currencyCode = currency;
        this.currencyCodeChanged.emit(currency);
        if (this.enableCookie == true && this.languageCodes.length > 0) {
          this.setCookie("currency", this.currencyCode, this.expiry);
        }
      }
    };
    LocaleService.prototype.getDefaultLocale = function() {
      return this.defaultLocale;
    };
    LocaleService.prototype.setDefaultLocale = function() {
      this.defaultLocale = this.languageCode;
      this.defaultLocale += this.scriptCode != "" ? "-" + this.scriptCode : "";
      this.defaultLocale += this.countryCode != "" ? "-" + this.countryCode : "";
      this.defaultLocale += this.numberingSystem != "" || this.calendar != "" ? "-u" : "";
      this.defaultLocale += this.numberingSystem != "" ? "-nu-" + this.numberingSystem : "";
      this.defaultLocale += this.calendar != "" ? "-ca-" + this.calendar : "";
      if (this.enableCookie == true && this.languageCodes.length > 0) {
        this.setCookie("locale", this.defaultLocale, this.expiry);
      }
    };
    LocaleService.prototype.parseCookie = function(name) {
      var cookie = this.getCookie(name);
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
        cookie = cookie.substring(0, index);
      }
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
    LocaleService.prototype.setCookie = function(name, value, days) {
      if (days != null) {
        var expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + expirationDate.toUTCString();
      } else {
        var expires = "";
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    };
    LocaleService.prototype.getCookie = function(name) {
      name += "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    };
    LocaleService.referenceCounter = 0;
    __decorate([core_1.Output(), __metadata('design:type', Object)], LocaleService.prototype, "languageCodeChanged", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], LocaleService.prototype, "countryCodeChanged", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], LocaleService.prototype, "currencyCodeChanged", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], LocaleService.prototype, "scriptCodeChanged", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], LocaleService.prototype, "numberingSystemChanged", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], LocaleService.prototype, "calendarChanged", void 0);
    LocaleService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], LocaleService);
    return LocaleService;
  }());
  exports.LocaleService = LocaleService;
  return module.exports;
});

System.registerDynamic("angular2localization/src/services/locale-number", ["@angular/common/src/facade/lang", "@angular/common/src/facade/exceptions", "@angular/common/src/facade/intl", "@angular/common/src/pipes/invalid_pipe_argument_exception"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('@angular/common/src/facade/lang');
  var exceptions_1 = $__require('@angular/common/src/facade/exceptions');
  var intl_1 = $__require('@angular/common/src/facade/intl');
  var invalid_pipe_argument_exception_1 = $__require('@angular/common/src/pipes/invalid_pipe_argument_exception');
  var LocaleNumber = (function() {
    function LocaleNumber() {}
    LocaleNumber.format = function(defaultLocale, value, style, digits, currency, currencyAsSymbol) {
      if (currency === void 0) {
        currency = null;
      }
      if (currencyAsSymbol === void 0) {
        currencyAsSymbol = false;
      }
      if (lang_1.isBlank(value))
        return null;
      if (!lang_1.isNumber(value)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(LocaleNumber, value);
      }
      var minInt = 1,
          minFraction = 0,
          maxFraction = 3;
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
  return module.exports;
});

System.registerDynamic("angular2localization/src/services/Intl-support", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var IntlSupport = (function() {
    function IntlSupport() {}
    IntlSupport.DateTimeFormat = function(defaultLocale) {
      try {
        new Intl.DateTimeFormat(defaultLocale).format(new Date());
      } catch (e) {
        return false;
      }
      return true;
    };
    IntlSupport.NumberFormat = function(defaultLocale) {
      try {
        var n = 0;
        new Intl.NumberFormat(defaultLocale).format(n);
      } catch (e) {
        return false;
      }
      return true;
    };
    IntlSupport.Collator = function(lang) {
      try {
        new Intl.Collator(lang);
      } catch (e) {
        return false;
      }
      return true;
    };
    return IntlSupport;
  }());
  exports.IntlSupport = IntlSupport;
  return module.exports;
});

System.registerDynamic("angular2localization/src/services/locale-parser", ["@angular/common/src/facade/lang", "@angular/common/src/facade/exceptions", "@angular/common/src/facade/intl", "./locale-number", "./Intl-support"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('@angular/common/src/facade/lang');
  var exceptions_1 = $__require('@angular/common/src/facade/exceptions');
  var intl_1 = $__require('@angular/common/src/facade/intl');
  var locale_number_1 = $__require('./locale-number');
  var Intl_support_1 = $__require('./Intl-support');
  var LocaleParser = (function() {
    function LocaleParser() {}
    LocaleParser.NumberRegExpFactory = function(defaultLocale, digits) {
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
      var codes = new DecimalCode(defaultLocale);
      var minusSign = codes.minusSign;
      var zero = codes.numbers[0];
      var decimalSeparator = codes.decimalSeparator;
      var nine = codes.numbers[9];
      var pattern;
      if (minFraction > 0 && maxFraction > 0) {
        pattern = "^" + minusSign + "?[" + zero + "-" + nine + "]{" + minInt + ",}\\" + decimalSeparator + "[" + zero + "-" + nine + "]{" + minFraction + "," + maxFraction + "}$";
      } else if (minFraction == 0 && maxFraction > 0) {
        pattern = "^" + minusSign + "?[" + zero + "-" + nine + "]{" + minInt + ",}\\" + decimalSeparator + "?[" + zero + "-" + nine + "]{" + minFraction + "," + maxFraction + "}$";
      } else {
        pattern = "^" + minusSign + "?[" + zero + "-" + nine + "]{" + minInt + ",}$";
      }
      pattern = eval("'" + pattern + "'");
      var regExp = new RegExp(pattern);
      return regExp;
    };
    LocaleParser.Number = function(s, defaultLocale) {
      if (s == '' || defaultLocale == '' || defaultLocale == null)
        return null;
      var codes = new DecimalCode(defaultLocale);
      return codes.parse(s);
    };
    return LocaleParser;
  }());
  exports.LocaleParser = LocaleParser;
  var NumberCode = (function() {
    function NumberCode(defaultLocale) {
      this.defaultLocale = defaultLocale;
      this.numbers = [];
      for (var i = 0; i <= 9; i++) {
        this.numbers.push(this.Unicode(i.toString()));
      }
      if (Intl_support_1.IntlSupport.NumberFormat(defaultLocale) == true) {
        for (var i = 0; i <= 9; i++) {
          this.numbers[i] = this.Unicode(locale_number_1.LocaleNumber.format(defaultLocale, i, intl_1.NumberFormatStyle.Decimal, '1.0-0'));
        }
      }
    }
    NumberCode.prototype.Unicode = function(c) {
      return "\\u" + this.HexEncode(c.charCodeAt(0));
    };
    NumberCode.prototype.HexEncode = function(value) {
      var hex = value.toString(16).toUpperCase();
      hex = "0000".substr(0, 4 - hex.length) + hex;
      return hex;
    };
    return NumberCode;
  }());
  var DecimalCode = (function(_super) {
    __extends(DecimalCode, _super);
    function DecimalCode(defaultLocale) {
      _super.call(this, defaultLocale);
      this.defaultLocale = defaultLocale;
      this.minusSign = this.Unicode("-");
      this.decimalSeparator = this.Unicode(".");
      if (Intl_support_1.IntlSupport.NumberFormat(defaultLocale) == true) {
        var value = -0.9;
        var localeValue = locale_number_1.LocaleNumber.format(defaultLocale, value, intl_1.NumberFormatStyle.Decimal, '1.1-1');
        var index;
        if (this.Unicode(localeValue.charAt(0)) != "\\u200F") {
          index = 0;
        } else {
          index = 1;
        }
        this.minusSign = this.Unicode(localeValue.charAt(index));
        this.decimalSeparator = this.Unicode(localeValue.charAt(index + 2));
      }
    }
    DecimalCode.prototype.parse = function(s) {
      var characters = s.split('');
      var value = "";
      for (var _i = 0,
          characters_1 = characters; _i < characters_1.length; _i++) {
        var char = characters_1[_i];
        var charCode = this.Unicode(char);
        var index = this.numbers.indexOf(charCode);
        if (index != -1) {
          value += index;
        } else if (charCode == this.minusSign) {
          value += "-";
        } else if (charCode == this.decimalSeparator) {
          value += ".";
        } else {
          return NaN;
        }
      }
      return parseFloat(value);
    };
    return DecimalCode;
  }(NumberCode));
  return module.exports;
});

System.registerDynamic("angular2localization/src/directives/locale-number-validator.directive", ["@angular/core", "@angular/common", "../services/locale.service", "../services/locale-parser"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var common_1 = $__require('@angular/common');
  var locale_service_1 = $__require('../services/locale.service');
  var locale_parser_1 = $__require('../services/locale-parser');
  function validateLocaleNumber(locale, digits, MIN_VALUE, MAX_VALUE) {
    if (MIN_VALUE === void 0) {
      MIN_VALUE = Number.MIN_VALUE;
    }
    if (MAX_VALUE === void 0) {
      MAX_VALUE = Number.MAX_VALUE;
    }
    var defaultLocale;
    var NUMBER_REGEXP;
    return function(c) {
      if (defaultLocale != locale.getDefaultLocale()) {
        NUMBER_REGEXP = locale_parser_1.LocaleParser.NumberRegExpFactory(locale.getDefaultLocale(), digits);
        defaultLocale = locale.getDefaultLocale();
      }
      if (NUMBER_REGEXP.test(c.value)) {
        var parsedValue;
        parsedValue = locale_parser_1.LocaleParser.Number(c.value, locale.getDefaultLocale());
        if (parsedValue < MIN_VALUE) {
          return {minValue: false};
        } else if (parsedValue > MAX_VALUE) {
          return {maxValue: false};
        }
        return null;
      } else {
        return {format: false};
      }
    };
  }
  exports.validateLocaleNumber = validateLocaleNumber;
  var LocaleNumberValidator = (function() {
    function LocaleNumberValidator(locale) {
      this.locale = locale;
      this.MIN_VALUE = Number.MIN_VALUE;
      this.MAX_VALUE = Number.MAX_VALUE;
    }
    Object.defineProperty(LocaleNumberValidator.prototype, "minValue", {
      set: function(value) {
        this.MIN_VALUE = value || this.MIN_VALUE;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(LocaleNumberValidator.prototype, "maxValue", {
      set: function(value) {
        this.MAX_VALUE = value || this.MAX_VALUE;
      },
      enumerable: true,
      configurable: true
    });
    LocaleNumberValidator.prototype.ngOnInit = function() {
      this.validator = validateLocaleNumber(this.locale, this.digits, this.MIN_VALUE, this.MAX_VALUE);
    };
    LocaleNumberValidator.prototype.validate = function(c) {
      return this.validator(c);
    };
    __decorate([core_1.Input('validateLocaleNumber'), __metadata('design:type', String)], LocaleNumberValidator.prototype, "digits", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Number), __metadata('design:paramtypes', [Number])], LocaleNumberValidator.prototype, "minValue", null);
    __decorate([core_1.Input(), __metadata('design:type', Number), __metadata('design:paramtypes', [Number])], LocaleNumberValidator.prototype, "maxValue", null);
    LocaleNumberValidator = __decorate([core_1.Directive({
      selector: '[validateLocaleNumber][ngControl],[validateLocaleNumber][ngModel],[validateLocaleNumber][ngFormControl]',
      providers: [core_1.provide(common_1.NG_VALIDATORS, {
        useExisting: core_1.forwardRef(function() {
          return LocaleNumberValidator;
        }),
        multi: true
      })]
    }), __metadata('design:paramtypes', [locale_service_1.LocaleService])], LocaleNumberValidator);
    return LocaleNumberValidator;
  }());
  exports.LocaleNumberValidator = LocaleNumberValidator;
  return module.exports;
});

System.registerDynamic("angular2localization/angular2localization", ["./src/services/localization.service", "./src/services/locale.service", "./src/services/locale", "./src/services/locale-number", "./src/services/Intl-support", "./src/services/locale-parser", "./src/pipes/translate.pipe", "./src/pipes/locale-date.pipe", "./src/pipes/locale-number.pipe", "./src/directives/locale-number-validator.directive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('./src/services/localization.service'));
  __export($__require('./src/services/locale.service'));
  __export($__require('./src/services/locale'));
  __export($__require('./src/services/locale-number'));
  __export($__require('./src/services/Intl-support'));
  __export($__require('./src/services/locale-parser'));
  __export($__require('./src/pipes/translate.pipe'));
  __export($__require('./src/pipes/locale-date.pipe'));
  __export($__require('./src/pipes/locale-number.pipe'));
  __export($__require('./src/directives/locale-number-validator.directive'));
  return module.exports;
});
