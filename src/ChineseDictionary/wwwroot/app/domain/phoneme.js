System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Phoneme;
    return {
        setters:[],
        execute: function() {
            Phoneme = (function () {
                function Phoneme(id, symbol) {
                    this.id = id;
                    this.symbol = symbol;
                }
                return Phoneme;
            }());
            exports_1("Phoneme", Phoneme);
        }
    }
});
//# sourceMappingURL=phoneme.js.map