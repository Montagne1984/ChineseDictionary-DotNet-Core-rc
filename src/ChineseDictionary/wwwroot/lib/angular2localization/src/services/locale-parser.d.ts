/**
 * LocaleParser class.
 * Parses a string and returns a number by default locale.
 *
 * @author Roberto Simonetti
 */
export declare class LocaleParser {
    constructor();
    /**
     * Builds the regular expression for a number by default locale.
     *
     * @param defaultLocale The default locale
     * @param digits The digit info: {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
     * @return A RegExp object
     */
    static NumberRegExpFactory(defaultLocale: string, digits: string): RegExp;
    /**
     * Parses a string and returns a number by default locale.
     *
     * @param s The string to be parsed
     * @param defaultLocale The default locale
     * @return A number. If the string cannot be converted to a number, returns NaN
     */
    static Number(s: string, defaultLocale: string): number;
}
