import { NumberFormatStyle } from '@angular/common/src/facade/intl';
/**
 * LocaleNumber class.
 */
export declare class LocaleNumber {
    constructor();
    static format(defaultLocale: string, value: number, style: NumberFormatStyle, digits: string, currency?: string, currencyAsSymbol?: boolean): string;
}
