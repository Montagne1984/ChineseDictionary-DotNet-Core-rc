/**
 * ANGULAR 2 LOCALIZATION
 * An Angular 2 library to translate messages, dates and numbers.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular2localization
 */
import { PipeTransform } from '@angular/core';
/**
 * 'localedecimal' pipe function.
 */
export declare class LocaleDecimalPipe implements PipeTransform {
    constructor();
    /**
     * LocaleDecimalPipe transform method.
     *
     * @param value The number to be localized
     * @param defaultLocale The default locale
     * @param digits The format of the number
     * @return The locale decimal
     */
    transform(value: any, defaultLocale: string, digits?: string): string;
}
/**
 * 'localepercent' pipe function.
 */
export declare class LocalePercentPipe implements PipeTransform {
    constructor();
    /**
     * LocalePercentPipe transform method.
     *
     * @param value The number to be localized
     * @param defaultLocale The default locale
     * @param digits The format of the number
     * @return The locale percent
     */
    transform(value: any, defaultLocale: string, digits?: string): string;
}
/**
 * 'localecurrency' pipe function.
 */
export declare class LocaleCurrencyPipe implements PipeTransform {
    constructor();
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
    transform(value: any, defaultLocale: string, currency: string, symbolDisplay?: boolean, digits?: string): string;
}
