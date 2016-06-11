/**
 * ANGULAR 2 LOCALIZATION
 * An Angular 2 library to translate messages, dates and numbers.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular2localization
 */
import { EventEmitter } from '@angular/core';
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
export declare class LocaleService {
    /**
     * Output for event current language code changed.
     */
    languageCodeChanged: EventEmitter<string>;
    /**
     * Output for event current country code changed.
     */
    countryCodeChanged: EventEmitter<string>;
    /**
     * Output for event current currency code changed.
     */
    currencyCodeChanged: EventEmitter<string>;
    /**
     * Output for event script code changed.
     */
    scriptCodeChanged: EventEmitter<string>;
    /**
     * Output for event numbering system changed.
     */
    numberingSystemChanged: EventEmitter<string>;
    /**
     * Output for event calendar changed.
     */
    calendarChanged: EventEmitter<string>;
    /**
     * Current language code.
     */
    private languageCode;
    /**
     * Current country code.
     */
    private countryCode;
    /**
     * Current currency code.
     */
    private currencyCode;
    /**
     * Default locale.
     */
    private defaultLocale;
    /**
     * The available language codes.
     */
    private languageCodes;
    /**
     * Defines when the cookie will be removed.
     */
    private expiry;
    /**
     * The optional script code.
     */
    private scriptCode;
    /**
     * The optional numbering system.
     */
    private numberingSystem;
    /**
     * The optional calendar.
     */
    private calendar;
    /**
     * Reference counter for the service.
     */
    private static referenceCounter;
    /**
     * Enable/disable cookie.
     */
    enableCookie: boolean;
    constructor();
    /**
     * Adds a new language.
     *
     * @param language The two-letter or three-letter code of the new language
     */
    addLanguage(language: string): void;
    /**
     * Defines the preferred language.
     * Selects the current language of the browser if it has been added, else the default language.
     *
     * @param defaultLanguage The two-letter or three-letter code of the default language
     * @param expiry Number of days on the expiry. If omitted, the cookie becomes a session cookie
     */
    definePreferredLanguage(defaultLanguage: string, expiry?: number): void;
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
    definePreferredLocale(defaultLanguage: string, defaultCountry: string, expiry?: number, script?: string, numberingSystem?: string, calendar?: string): void;
    /**
     * Defines the preferred currency.
     *
     * @param defaultCurrency The three-letter code of the default currency
     */
    definePreferredCurrency(defaultCurrency: string): void;
    /**
     * Gets the current language.
     *
     * @return The two-letter or three-letter code of the current language
     */
    getCurrentLanguage(): string;
    /**
     * Gets the current country.
     *
     * @return The two-letter, uppercase code of the current country
     */
    getCurrentCountry(): string;
    /**
     * Gets the current currency.
     *
     * @return The three-letter code of the current currency
     */
    getCurrentCurrency(): string;
    /**
     * Gets the script.
     *
     * @return The four-letter code of the script
     */
    getScript(): string;
    /**
     * Gets the numbering system.
     *
     * @return The numbering system
     */
    getNumberingSystem(): string;
    /**
     * Gets the calendar.
     *
     * @return The calendar
     */
    getCalendar(): string;
    /**
     * Sets the current language.
     *
     * @param language The two-letter or three-letter code of the new language
     */
    setCurrentLanguage(language: string): void;
    /**
     * Sets the current locale.
     *
     * @param language The two-letter or three-letter code of the new language
     * @param country The two-letter, uppercase code of the new country
     * @param script The optional four-letter script code
     * @param numberingSystem The optional numbering system to be used
     * @param calendar The optional calendar to be used
     */
    setCurrentLocale(language: string, country: string, script?: string, numberingSystem?: string, calendar?: string): void;
    /**
     * Sets the current currency.
     *
     * @param currency The three-letter code of the new currency
     */
    setCurrentCurrency(currency: string): void;
    /**
     * Gets the default locale.
     *
     * @return The default locale
     */
    getDefaultLocale(): string;
    /**
     * Builds the default locale.
     */
    private setDefaultLocale();
    /**
     * Parses the cookie to extract the codes & the extension.
     *
     * @param name The name of the cookie
     */
    private parseCookie(name);
    /**
     * Sets the cookie.
     *
     * @param name The name of the cookie
     * @param value The value of the cookie
     * @param days Number of days on the expiry
     */
    private setCookie(name, value, days?);
    /**
     * Gets the cookie.
     *
     * @param name The name of the cookie
     * @return The value of the cookie
     */
    private getCookie(name);
}
