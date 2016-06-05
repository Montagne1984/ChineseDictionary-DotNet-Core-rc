"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var phoneme_1 = require("./phoneme");
var IPAVowel = (function (_super) {
    __extends(IPAVowel, _super);
    function IPAVowel(id, symbol) {
        _super.call(this, id, symbol);
        this.id = id;
        this.symbol = symbol;
    }
    return IPAVowel;
}(phoneme_1.Phoneme));
exports.IPAVowel = IPAVowel;
//# sourceMappingURL=ipavowel.js.map