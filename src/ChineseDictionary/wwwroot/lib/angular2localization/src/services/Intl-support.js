/**
 * ANGULAR 2 LOCALIZATION
 * An Angular 2 library to translate messages, dates and numbers.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular2localization
 */
"use strict";
/**
 * IntlSupport class.
 * Provides the methods to check if Intl is supported.
 *
 * @author Roberto Simonetti
 */
var IntlSupport = (function () {
    function IntlSupport() {
    }
    /**
     * Support for dates.
     *
     * @param defaultLocale The default locale
     * @return True if the browser supports locales for dates, otherwise false.
     */
    IntlSupport.DateTimeFormat = function (defaultLocale) {
        // Checking for support.
        try {
            new Intl.DateTimeFormat(defaultLocale).format(new Date());
        }
        catch (e) {
            return false;
        }
        return true;
    };
    /**
     * Support for numbers.
     *
     * @param defaultLocale The default locale
     * @return True if the browser supports locales for numbers, otherwise false.
     */
    IntlSupport.NumberFormat = function (defaultLocale) {
        // Checking for support.
        try {
            var n = 0;
            new Intl.NumberFormat(defaultLocale).format(n);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    /**
     * Support for Collator.
     *
     * @param lang The current language code
     * @return True if the browser supports Collator, otherwise false.
     */
    IntlSupport.Collator = function (lang) {
        // Checking for support.
        try {
            new Intl.Collator(lang);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    return IntlSupport;
}());
exports.IntlSupport = IntlSupport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50bC1zdXBwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW50bC1zdXBwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSDs7Ozs7R0FLRztBQUNIO0lBRUk7SUFBZ0IsQ0FBQztJQUVqQjs7Ozs7T0FLRztJQUNJLDBCQUFjLEdBQXJCLFVBQXNCLGFBQXFCO1FBRXZDLHdCQUF3QjtRQUN4QixJQUFJLENBQUM7WUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztRQUU5RCxDQUFFO1FBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVULE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFFakIsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFaEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksd0JBQVksR0FBbkIsVUFBb0IsYUFBcUI7UUFFckMsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQztZQUVELElBQUksQ0FBQyxHQUFXLENBQUMsQ0FBQztZQUVsQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5ELENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVQsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUVqQixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUVoQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxvQkFBUSxHQUFmLFVBQWdCLElBQVk7UUFFeEIsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQztZQUVELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1QixDQUFFO1FBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVULE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFFakIsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFaEIsQ0FBQztJQUVMLGtCQUFDO0FBQUQsQ0FBQyxBQTNFRCxJQTJFQztBQTNFWSxtQkFBVyxjQTJFdkIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBTkdVTEFSIDIgTE9DQUxJWkFUSU9OXHJcbiAqIEFuIEFuZ3VsYXIgMiBsaWJyYXJ5IHRvIHRyYW5zbGF0ZSBtZXNzYWdlcywgZGF0ZXMgYW5kIG51bWJlcnMuXHJcbiAqIFdyaXR0ZW4gYnkgUm9iZXJ0byBTaW1vbmV0dGkuXHJcbiAqIE1JVCBsaWNlbnNlLlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vcm9iaXNpbTc0L2FuZ3VsYXIybG9jYWxpemF0aW9uXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEludGxTdXBwb3J0IGNsYXNzLlxyXG4gKiBQcm92aWRlcyB0aGUgbWV0aG9kcyB0byBjaGVjayBpZiBJbnRsIGlzIHN1cHBvcnRlZC5cclxuICogXHJcbiAqIEBhdXRob3IgUm9iZXJ0byBTaW1vbmV0dGlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJbnRsU3VwcG9ydCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN1cHBvcnQgZm9yIGRhdGVzLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGVmYXVsdExvY2FsZSBUaGUgZGVmYXVsdCBsb2NhbGVcclxuICAgICAqIEByZXR1cm4gVHJ1ZSBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBsb2NhbGVzIGZvciBkYXRlcywgb3RoZXJ3aXNlIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgRGF0ZVRpbWVGb3JtYXQoZGVmYXVsdExvY2FsZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIC8vIENoZWNraW5nIGZvciBzdXBwb3J0LlxyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChkZWZhdWx0TG9jYWxlKS5mb3JtYXQobmV3IERhdGUoKSk7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdXBwb3J0IGZvciBudW1iZXJzLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGVmYXVsdExvY2FsZSBUaGUgZGVmYXVsdCBsb2NhbGVcclxuICAgICAqIEByZXR1cm4gVHJ1ZSBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBsb2NhbGVzIGZvciBudW1iZXJzLCBvdGhlcndpc2UgZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBOdW1iZXJGb3JtYXQoZGVmYXVsdExvY2FsZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIC8vIENoZWNraW5nIGZvciBzdXBwb3J0LlxyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbjogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgICAgIG5ldyBJbnRsLk51bWJlckZvcm1hdChkZWZhdWx0TG9jYWxlKS5mb3JtYXQobik7XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdXBwb3J0IGZvciBDb2xsYXRvci5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGxhbmcgVGhlIGN1cnJlbnQgbGFuZ3VhZ2UgY29kZVxyXG4gICAgICogQHJldHVybiBUcnVlIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIENvbGxhdG9yLCBvdGhlcndpc2UgZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBDb2xsYXRvcihsYW5nOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2tpbmcgZm9yIHN1cHBvcnQuXHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIG5ldyBJbnRsLkNvbGxhdG9yKGxhbmcpO1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgfVxyXG5cclxufSJdfQ==