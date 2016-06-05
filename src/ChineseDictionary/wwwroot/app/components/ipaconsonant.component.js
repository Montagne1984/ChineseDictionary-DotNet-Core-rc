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
var core_1 = require("@angular/core");
var primeng_1 = require("primeng/primeng");
var ipaconsonant_1 = require("../domain/ipaconsonant");
var IPAConsonantComponent = (function () {
    //items: Object[];
    function IPAConsonantComponent() {
        this.item = new ipaconsonant_1.IPAConsonant();
    }
    IPAConsonantComponent.prototype.ngOnInit = function () {
        //this.objectService.get().then(items => this.items = items);
        //this.items = [];
    };
    IPAConsonantComponent.prototype.showDialogToAdd = function () {
        this.newItem = true;
        this.item = new ipaconsonant_1.IPAConsonant();
        this.displayDialog = true;
    };
    IPAConsonantComponent.prototype.save = function () {
        //if (this.newItem)
        //    this.items.push(this.item);
        //else
        //    this.items[this.findSelectedItemIndex()] = this.item;
        //this.item = null;
        //this.displayDialog = false;
    };
    IPAConsonantComponent.prototype.delete = function () {
        //this.items.splice(this.findSelectedItemIndex(), 1);
        //this.item = null;
        //this.displayDialog = false;
    };
    IPAConsonantComponent.prototype.onRowSelect = function (event) {
        //this.newItem = false;
        //this.item = this.cloneItem(event.data);
        //this.displayDialog = true;
    };
    IPAConsonantComponent.prototype.cloneItem = function (i) {
        var item = new ipaconsonant_1.IPAConsonant();
        //for (let prop in i) {
        //    item[prop] = i[prop];
        //}
        return item;
    };
    IPAConsonantComponent.prototype.findSelectedItemIndex = function () {
        //return this.items.indexOf(this.selectedItem);
        return 0;
    };
    IPAConsonantComponent = __decorate([
        core_1.Component({
            selector: "ipaconsonant",
            templateUrl: "app/components/ipaconsonant.html",
            directives: [primeng_1.Button, primeng_1.Dialog, primeng_1.DataTable, primeng_1.Column, primeng_1.Header, primeng_1.Footer, primeng_1.InputText],
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], IPAConsonantComponent);
    return IPAConsonantComponent;
}());
exports.IPAConsonantComponent = IPAConsonantComponent;
//export class IPAConsonantService implements IObjectService {
//    get() {
//        return [];
//    }
//} 
//# sourceMappingURL=ipaconsonant.component.js.map