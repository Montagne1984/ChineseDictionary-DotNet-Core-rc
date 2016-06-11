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
var lang_1 = require('@angular/common/src/facade/lang');
var intl_1 = require('@angular/common/src/facade/intl');
var collection_1 = require('@angular/common/src/facade/collection');
var invalid_pipe_argument_exception_1 = require('@angular/common/src/pipes/invalid_pipe_argument_exception');
// Services.
var Intl_support_1 = require('../services/Intl-support');
/**
 * 'localedate' pipe function.
 */
var LocaleDatePipe = (function () {
    function LocaleDatePipe() {
    }
    /**
     * LocaleDatePipe transform method.
     *
     * @param value The date to be localized
     * @param defaultLocale The default locale
     * @param pattern The format of the date
     * @return The locale date
     */
    LocaleDatePipe.prototype.transform = function (value, defaultLocale, pattern) {
        if (pattern === void 0) { pattern = 'mediumDate'; }
        if (lang_1.isBlank(value))
            return null;
        if (!this.supports(value)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(LocaleDatePipe, value);
        }
        if (lang_1.isNumber(value)) {
            value = lang_1.DateWrapper.fromMillis(value);
        }
        // Checks for support for Intl.
        if (Intl_support_1.IntlSupport.DateTimeFormat(defaultLocale) == true) {
            if (collection_1.StringMapWrapper.contains(LocaleDatePipe.ALIASES, pattern)) {
                pattern = collection_1.StringMapWrapper.get(LocaleDatePipe.ALIASES, pattern);
            }
            return intl_1.DateFormatter.format(value, defaultLocale, pattern);
        }
        // Returns the date without localization.
        return value;
    };
    LocaleDatePipe.prototype.supports = function (obj) { return lang_1.isDate(obj) || lang_1.isNumber(obj); };
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
    LocaleDatePipe = __decorate([
        core_1.Pipe({
            name: 'localedate',
            pure: true
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocaleDatePipe);
    return LocaleDatePipe;
}());
exports.LocaleDatePipe = LocaleDatePipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLWRhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvY2FsZS1kYXRlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7OztBQUVILHFCQUE4QyxlQUFlLENBQUMsQ0FBQTtBQUM5RCxxQkFBZ0UsaUNBQWlDLENBQUMsQ0FBQTtBQUNsRyxxQkFBNEIsaUNBQWlDLENBQUMsQ0FBQTtBQUM5RCwyQkFBK0IsdUNBQXVDLENBQUMsQ0FBQTtBQUN2RSxnREFBMkMsMkRBQTJELENBQUMsQ0FBQTtBQUV2RyxZQUFZO0FBQ1osNkJBQTBCLDBCQUEwQixDQUFDLENBQUE7QUFFckQ7O0dBRUc7QUFnRFc7SUFhVjtJQUFnQixDQUFDO0lBRWpCOzs7Ozs7O09BT0c7SUFDSCxrQ0FBUyxHQUFULFVBQVUsS0FBVSxFQUFFLGFBQXFCLEVBQUUsT0FBOEI7UUFBOUIsdUJBQThCLEdBQTlCLHNCQUE4QjtRQUV2RSxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRWhDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEIsTUFBTSxJQUFJLDhEQUE0QixDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVsRSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsQixLQUFLLEdBQVMsa0JBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEQsQ0FBQztRQUVELCtCQUErQjtRQUMvQixFQUFFLENBQUMsQ0FBQywwQkFBVyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRXBELEVBQUUsQ0FBQyxDQUFDLDZCQUFnQixDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFN0QsT0FBTyxHQUFXLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRTVFLENBQUM7WUFFRCxNQUFNLENBQUMsb0JBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUvRCxDQUFDO1FBRUQseUNBQXlDO1FBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFFakIsQ0FBQztJQUVPLGlDQUFRLEdBQWhCLFVBQWlCLEdBQVEsSUFBYSxNQUFNLENBQUMsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLGVBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUF2RHJFLHNCQUFPLEdBQThCO1FBQ3hDLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLFlBQVksRUFBRSxPQUFPO1FBQ3JCLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLFlBQVksRUFBRSxLQUFLO1FBQ25CLFdBQVcsRUFBRSxJQUFJO0tBQ3BCLENBQUM7SUExRE47UUFBQyxXQUFJLENBQUM7WUFDRixJQUFJLEVBQUUsWUFBWTtZQUNsQixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7UUE0Q0QsaUJBQVUsRUFBRTs7c0JBQUE7SUEyRGIscUJBQUM7QUFBRCxDQUFDLEFBM0RhLElBMkRiO0FBM0QwQixzQkFBYyxpQkEyRHhDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQU5HVUxBUiAyIExPQ0FMSVpBVElPTlxyXG4gKiBBbiBBbmd1bGFyIDIgbGlicmFyeSB0byB0cmFuc2xhdGUgbWVzc2FnZXMsIGRhdGVzIGFuZCBudW1iZXJzLlxyXG4gKiBXcml0dGVuIGJ5IFJvYmVydG8gU2ltb25ldHRpLlxyXG4gKiBNSVQgbGljZW5zZS5cclxuICogaHR0cHM6Ly9naXRodWIuY29tL3JvYmlzaW03NC9hbmd1bGFyMmxvY2FsaXphdGlvblxyXG4gKi9cclxuXHJcbmltcG9ydCB7SW5qZWN0YWJsZSwgUGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNEYXRlLCBpc051bWJlciwgaXNQcmVzZW50LCBEYXRlV3JhcHBlciwgaXNCbGFua30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL3NyYy9mYWNhZGUvbGFuZyc7XHJcbmltcG9ydCB7RGF0ZUZvcm1hdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL3NyYy9mYWNhZGUvaW50bCc7XHJcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XHJcbmltcG9ydCB7SW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL3NyYy9waXBlcy9pbnZhbGlkX3BpcGVfYXJndW1lbnRfZXhjZXB0aW9uJztcclxuXHJcbi8vIFNlcnZpY2VzLlxyXG5pbXBvcnQge0ludGxTdXBwb3J0fSBmcm9tICcuLi9zZXJ2aWNlcy9JbnRsLXN1cHBvcnQnO1xyXG5cclxuLyoqXHJcbiAqICdsb2NhbGVkYXRlJyBwaXBlIGZ1bmN0aW9uLlxyXG4gKi9cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ2xvY2FsZWRhdGUnLFxyXG4gICAgcHVyZTogdHJ1ZVxyXG59KVxyXG5cclxuLyoqXHJcbiAqIExvY2FsZURhdGVQaXBlIGNsYXNzLlxyXG4gKiBMb2NhbGl6ZXMgZGF0ZXMuXHJcbiAqIFxyXG4gKiBHZXR0aW5nIHRoZSBsb2NhbCBkYXRlOlxyXG4gKiBcclxuICogZXhwcmVzc2lvbiB8IGxvY2FsZWRhdGVbOmRlZmF1bHRMb2NhbGVbOmZvcm1hdF1dXHJcbiAqIFxyXG4gKiB3aGVyZSAnZXhwcmVzc2lvbicgaXMgYSBkYXRlIG9iamVjdCBvciBhIG51bWJlciAobWlsbGlzZWNvbmRzIHNpbmNlIFVUQyBlcG9jaCkgYW5kICdmb3JtYXQnIGluZGljYXRlcyB3aGljaCBkYXRlL3RpbWUgY29tcG9uZW50cyB0byBpbmNsdWRlLlxyXG4gKiBcclxuICogRm9yIGV4YW1wbGUsIHRvIGdldCB0aGUgbG9jYWwgZGF0ZSwgYWRkIGluIHRoZSB0ZW1wbGF0ZTpcclxuICogXHJcbiAqIHt7IHRvZGF5IHwgbG9jYWxlZGF0ZTpkZWZhdWx0TG9jYWxlOidmdWxsRGF0ZScgfX1cclxuICogXHJcbiAqIGFuZCBpbmNsdWRlIGluIHRoZSBjb21wb25lbnQ6XHJcbiAqIFxyXG4gKiBpbXBvcnQge0xvY2FsZVNlcnZpY2V9IGZyb20gJ2FuZ3VsYXIybG9jYWxpemF0aW9uL2FuZ3VsYXIybG9jYWxpemF0aW9uJztcclxuICogaW1wb3J0IHtMb2NhbGVEYXRlUGlwZX0gZnJvbSAnYW5ndWxhcjJsb2NhbGl6YXRpb24vYW5ndWxhcjJsb2NhbGl6YXRpb24nO1xyXG4gKiBcclxuICogQENvbXBvbmVudCh7XHJcbiAqICAgICAuLi5cclxuICogICAgIHBpcGVzOiBbTG9jYWxlRGF0ZVBpcGVdXHJcbiAqIH0pXHJcbiAqIFxyXG4gKiBleHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcclxuICogXHJcbiAqICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9jYWxlOiBMb2NhbGVTZXJ2aWNlKSB7XHJcbiAqICAgICAgICAgLi4uXHJcbiAqICAgICB9XHJcbiAqIFxyXG4gKiAgICAgLy8gR2V0cyB0aGUgZGVmYXVsdCBsb2NhbGUuXHJcbiAqICAgICBnZXQgZGVmYXVsdExvY2FsZSgpOiBzdHJpbmcge1xyXG4gKlxyXG4gKiAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZS5nZXREZWZhdWx0TG9jYWxlKCk7XHJcbiAqICAgICAgXHJcbiAqICAgICB9XHJcbiAqIFxyXG4gKiB9XHJcbiAqIFxyXG4gKiBAYXV0aG9yIFJvYmVydG8gU2ltb25ldHRpXHJcbiAqIEBzZWUgQW5ndWxhciAyIERhdGVQaXBlIGZvciBmdXJ0aGVyIGluZm9ybWF0aW9uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpIGV4cG9ydCBjbGFzcyBMb2NhbGVEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICAgIHN0YXRpYyBBTElBU0VTOiB7IFtrZXk6IHN0cmluZ106IFN0cmluZyB9ID0ge1xyXG4gICAgICAgICdtZWRpdW0nOiAneU1NTWRqbXMnLFxyXG4gICAgICAgICdzaG9ydCc6ICd5TWRqbScsXHJcbiAgICAgICAgJ2Z1bGxEYXRlJzogJ3lNTU1NRUVFRWQnLFxyXG4gICAgICAgICdsb25nRGF0ZSc6ICd5TU1NTWQnLFxyXG4gICAgICAgICdtZWRpdW1EYXRlJzogJ3lNTU1kJyxcclxuICAgICAgICAnc2hvcnREYXRlJzogJ3lNZCcsXHJcbiAgICAgICAgJ21lZGl1bVRpbWUnOiAnam1zJyxcclxuICAgICAgICAnc2hvcnRUaW1lJzogJ2ptJ1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9jYWxlRGF0ZVBpcGUgdHJhbnNmb3JtIG1ldGhvZC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSBkYXRlIHRvIGJlIGxvY2FsaXplZFxyXG4gICAgICogQHBhcmFtIGRlZmF1bHRMb2NhbGUgVGhlIGRlZmF1bHQgbG9jYWxlXHJcbiAgICAgKiBAcGFyYW0gcGF0dGVybiBUaGUgZm9ybWF0IG9mIHRoZSBkYXRlXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBsb2NhbGUgZGF0ZVxyXG4gICAgICovXHJcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgZGVmYXVsdExvY2FsZTogc3RyaW5nLCBwYXR0ZXJuOiBzdHJpbmcgPSAnbWVkaXVtRGF0ZScpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICBpZiAoaXNCbGFuayh2YWx1ZSkpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydHModmFsdWUpKSB7XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbihMb2NhbGVEYXRlUGlwZSwgdmFsdWUpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc051bWJlcih2YWx1ZSkpIHtcclxuXHJcbiAgICAgICAgICAgIHZhbHVlID0gPERhdGU+RGF0ZVdyYXBwZXIuZnJvbU1pbGxpcyh2YWx1ZSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2tzIGZvciBzdXBwb3J0IGZvciBJbnRsLlxyXG4gICAgICAgIGlmIChJbnRsU3VwcG9ydC5EYXRlVGltZUZvcm1hdChkZWZhdWx0TG9jYWxlKSA9PSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyhMb2NhbGVEYXRlUGlwZS5BTElBU0VTLCBwYXR0ZXJuKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBhdHRlcm4gPSA8c3RyaW5nPlN0cmluZ01hcFdyYXBwZXIuZ2V0KExvY2FsZURhdGVQaXBlLkFMSUFTRVMsIHBhdHRlcm4pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIERhdGVGb3JtYXR0ZXIuZm9ybWF0KHZhbHVlLCBkZWZhdWx0TG9jYWxlLCBwYXR0ZXJuKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm5zIHRoZSBkYXRlIHdpdGhvdXQgbG9jYWxpemF0aW9uLlxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdXBwb3J0cyhvYmo6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gaXNEYXRlKG9iaikgfHwgaXNOdW1iZXIob2JqKTsgfVxyXG5cclxufSJdfQ==