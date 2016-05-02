System.register(["angular2/core", 'primeng/primeng'], function(exports_1, context_1) {
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
    var core_1, primeng_1;
    var ConsonantComponent, Consonant;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            }],
        execute: function() {
            ConsonantComponent = (function () {
                function ConsonantComponent() {
                    this.consonant = new Consonant();
                }
                ConsonantComponent.prototype.ngOnInit = function () {
                    //this.consonantService.getConsonantsSmall().then(consonants => this.consonants = consonants);
                    this.consonants = [
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
                ConsonantComponent.prototype.showDialogToAdd = function () {
                    this.newConsonant = true;
                    this.consonant = new Consonant();
                    this.displayDialog = true;
                };
                ConsonantComponent.prototype.save = function () {
                    if (this.newConsonant)
                        this.consonants.push(this.consonant);
                    else
                        this.consonants[this.findSelectedConsonantIndex()] = this.consonant;
                    this.consonant = null;
                    this.displayDialog = false;
                };
                ConsonantComponent.prototype.delete = function () {
                    this.consonants.splice(this.findSelectedConsonantIndex(), 1);
                    this.consonant = null;
                    this.displayDialog = false;
                };
                ConsonantComponent.prototype.onRowSelect = function (event) {
                    this.newConsonant = false;
                    this.consonant = this.cloneConsonant(event.data);
                    this.displayDialog = true;
                };
                ConsonantComponent.prototype.cloneConsonant = function (c) {
                    var consonant = new Consonant();
                    for (var prop in c) {
                        consonant[prop] = c[prop];
                    }
                    return consonant;
                };
                ConsonantComponent.prototype.findSelectedConsonantIndex = function () {
                    return this.consonants.indexOf(this.selectedConsonant);
                };
                ConsonantComponent = __decorate([
                    core_1.Component({
                        selector: "static",
                        templateUrl: "app/components/consonant.html",
                        directives: [primeng_1.Button, primeng_1.Dialog, primeng_1.DataTable, primeng_1.Column, primeng_1.Header, primeng_1.Footer, primeng_1.InputText]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ConsonantComponent);
                return ConsonantComponent;
            }());
            exports_1("ConsonantComponent", ConsonantComponent);
            Consonant = (function () {
                function Consonant(vin, year, brand, color) {
                    this.vin = vin;
                    this.year = year;
                    this.brand = brand;
                    this.color = color;
                }
                return Consonant;
            }());
        }
    }
});
//# sourceMappingURL=consonant.component.js.map