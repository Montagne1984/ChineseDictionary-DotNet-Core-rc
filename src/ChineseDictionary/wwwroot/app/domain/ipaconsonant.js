"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phoneme_1 = require("./phoneme");
var IPAConsonant = (function (_super) {
    __extends(IPAConsonant, _super);
    function IPAConsonant(id, symbol) {
        _super.call(this, id, symbol);
        this.id = id;
        this.symbol = symbol;
    }
    return IPAConsonant;
}(phoneme_1.Phoneme));
exports.IPAConsonant = IPAConsonant;
//# sourceMappingURL=ipaconsonant.js.map