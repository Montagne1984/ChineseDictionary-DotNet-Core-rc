System.register(["./phoneme"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var phoneme_1;
    var IPAConsonant;
    return {
        setters:[
            function (phoneme_1_1) {
                phoneme_1 = phoneme_1_1;
            }],
        execute: function() {
            IPAConsonant = (function (_super) {
                __extends(IPAConsonant, _super);
                function IPAConsonant(id, symbol) {
                    _super.call(this, id, symbol);
                    this.id = id;
                    this.symbol = symbol;
                }
                return IPAConsonant;
            }(phoneme_1.Phoneme));
            exports_1("IPAConsonant", IPAConsonant);
        }
    }
});
//# sourceMappingURL=ipaconsonant.js.map