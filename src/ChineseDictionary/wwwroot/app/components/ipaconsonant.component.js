System.register(["angular2/core", "primeng/primeng", "../domain/ipaconsonant"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, primeng_1, ipaconsonant_1;
    var IPAConsonantComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (ipaconsonant_1_1) {
                ipaconsonant_1 = ipaconsonant_1_1;
            }],
        execute: function() {
            IPAConsonantComponent = (function () {
                function IPAConsonantComponent() {
                    this.item = new ipaconsonant_1.IPAConsonant();
                }
                IPAConsonantComponent.prototype.ngOnInit = function () {
                    //this.itemService.getItemsSmall().then(items => this.items = items);
                    this.items = [
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" },
                        { vin: "a", year: "b", brand: "c", color: "d" }
                    ];
                };
                IPAConsonantComponent.prototype.showDialogToAdd = function () {
                    this.newItem = true;
                    this.item = new Object();
                    this.displayDialog = true;
                };
                IPAConsonantComponent.prototype.save = function () {
                    if (this.newItem)
                        this.items.push(this.item);
                    else
                        this.items[this.findSelectedItemIndex()] = this.item;
                    this.item = null;
                    this.displayDialog = false;
                };
                IPAConsonantComponent.prototype.delete = function () {
                    this.items.splice(this.findSelectedItemIndex(), 1);
                    this.item = null;
                    this.displayDialog = false;
                };
                IPAConsonantComponent.prototype.onRowSelect = function (event) {
                    this.newItem = false;
                    this.item = this.cloneItem(event.data);
                    this.displayDialog = true;
                };
                IPAConsonantComponent.prototype.cloneItem = function (c) {
                    var item = new Object();
                    for (var prop in c) {
                        item[prop] = c[prop];
                    }
                    return item;
                };
                IPAConsonantComponent.prototype.findSelectedItemIndex = function () {
                    return this.items.indexOf(this.selectedItem);
                };
                IPAConsonantComponent = __decorate([
                    core_1.Component({
                        selector: "static",
                        templateUrl: "app/components/ipaconsonant.html",
                        directives: [primeng_1.Button, primeng_1.Dialog, primeng_1.DataTable, primeng_1.Column, primeng_1.Header, primeng_1.Footer, primeng_1.InputText]
                    }), 
                    __metadata('design:paramtypes', [])
                ], IPAConsonantComponent);
                return IPAConsonantComponent;
            }());
            exports_1("IPAConsonantComponent", IPAConsonantComponent);
        }
    }
});
//# sourceMappingURL=ipaconsonant.component.js.map