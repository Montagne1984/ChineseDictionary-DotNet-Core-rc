import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LocaleService } from './locale.service';
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
export declare class LocalizationService {
    http: Http;
    locale: LocaleService;
    /**
     * The path prefix for the asynchronous loading.
     */
    private prefix;
    /**
     * The translation data: {languageCode: {key: value}}.
     */
    private translationData;
    /**
     * The language code for the service.
     */
    languageCode: string;
    /**
     * The loading mode for the service.
     */
    loadingMode: LoadingMode;
    /**
     * The service state.
     */
    serviceState: ServiceState;
    constructor(http: Http, locale: LocaleService);
    /**
     * Direct loading: adds new translation data.
     *
     * @param language The two-letter code of the language for the translation data
     * @param translation The new translation data
     */
    addTranslation(language: string, translation: any): void;
    /**
     * Asynchronous loading: defines the translation provider.
     *
     * @param prefix The path prefix of the json files
     */
    translationProvider(prefix: string): void;
    /**
     * Gets the json data.
     *
     * @param language The two-letter or three-letter code of the language
     */
    private getTranslation(language);
    /**
     * Translates a key.
     *
     * @param key The key to be translated
     * @return The value of translation
     */
    translate(key: string): string;
    /**
     * Translates a key.
     *
     * @param key The key to be translated
     * @return An observable of the value of translation
     */
    translateAsync(key: string): Observable<string>;
    /**
     * Updates the language code and loads the translation data for the asynchronous loading.
     *
     * @param language The two-letter or three-letter code of the language
     */
    updateTranslation(language?: string): void;
    /**
     * Compares two keys by the value of translation & the current language code.
     *
     * @param key1, key2 The keys of the values to compare
     * @param extension
     * @param options
     * @return A negative value if the value of translation of key1 comes before the value of translation of key2; a positive value if key1 comes after key2; 0 if they are considered equal or Intl.Collator is not supported
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
     */
    compare(key1: string, key2: string, extension?: string, options?: any): number;
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
    sort(list: Array<any>, keyName: any, order?: string, extension?: string, options?: any): Array<any>;
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
    sortAsync(list: Array<any>, keyName: any, order?: string, extension?: string, options?: any): Observable<Array<any>>;
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
    search(s: string, list: Array<any>, keyNames: any[], options?: any): Array<any>;
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
    searchAsync(s: string, list: Array<any>, keyNames: any[], options?: any): Observable<any>;
    private addExtension(locale, extension?);
    /**
     * Matching algorithm.
     *
     * @param v The value
     * @param s The string to search
     * return True if match, otherwise false
     */
    private match(v, s, collator);
}
/**
 * Defines the service state.
 */
export declare enum ServiceState {
    /**
     * The translation data has been loaded.
     */
    isReady = 0,
    /**
     * The service is loading the data.
     */
    isLoading = 1,
    /**
     * The service is waiting for the data.
     */
    isWaiting = 2,
}
/**
 * Defines the loading mode.
 */
export declare enum LoadingMode {
    /**
     * Initial state.
     */
    Unknown = 0,
    /**
     * Direct loading.
     */
    Direct = 1,
    /**
     * Asynchronous loading.
     */
    Async = 2,
}
