/**
 * ANGULAR 2 LOCALIZATION
 * An Angular 2 library to translate messages, dates and numbers.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular2localization
 */
import { OnInit } from '@angular/core';
import { Control, Validator } from '@angular/common';
import { LocaleService } from '../services/locale.service';
/**
 * Function that takes a Control and returns either null when it’s valid, or and error object if it’s not.
 *
 * @param locale The reference to LocaleService
 * @param digits The format of the number
 * @param MIN_VALUE The minimum value for the number
 * @param MAX_VALUE The maximum value for the number
 * @return An error object: 'format', 'minValue' or 'maxValue'; null in case the value is valid
 */
export declare function validateLocaleNumber(locale: LocaleService, digits: string, MIN_VALUE?: number, MAX_VALUE?: number): (c: Control) => {
    [key: string]: any;
};
export declare class LocaleNumberValidator implements Validator, OnInit {
    locale: LocaleService;
    private MIN_VALUE;
    private MAX_VALUE;
    /**
     * Format: {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}.
     */
    digits: string;
    minValue: number;
    maxValue: number;
    private validator;
    constructor(locale: LocaleService);
    ngOnInit(): void;
    validate(c: Control): Function;
}
