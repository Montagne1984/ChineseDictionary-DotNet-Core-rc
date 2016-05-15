System.register(["angular2/core", "./object.component", "primeng/primeng", "../domain/ipaconsonant"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, object_component_1, primeng_1, ipaconsonant_1;
    var IPAConsonantComponent, IPAConsonantService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (object_component_1_1) {
                object_component_1 = object_component_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (ipaconsonant_1_1) {
                ipaconsonant_1 = ipaconsonant_1_1;
            }],
        execute: function() {
            IPAConsonantComponent = (function (_super) {
                __extends(IPAConsonantComponent, _super);
                function IPAConsonantComponent() {
                    _super.call(this, new IPAConsonantService());
                    this.item = new ipaconsonant_1.IPAConsonant();
                    alert('hi');
                }
                IPAConsonantComponent = __decorate([
                    core_1.Component({
                        selector: "ipaconsonant",
                        templateUrl: "app/components/ipaconsonant.html",
                        directives: [primeng_1.Button, primeng_1.Dialog, primeng_1.DataTable, primeng_1.Column, primeng_1.Header, primeng_1.Footer, primeng_1.InputText],
                        providers: [IPAConsonantService]
                    }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], IPAConsonantComponent);
                return IPAConsonantComponent;
            }(object_component_1.ObjectComponent));
            exports_1("IPAConsonantComponent", IPAConsonantComponent);
            IPAConsonantService = (function () {
                function IPAConsonantService() {
                }
                IPAConsonantService.prototype.get = function () {
                    return [];
                };
                return IPAConsonantService;
            }());
            exports_1("IPAConsonantService", IPAConsonantService);
        }
    }
});
//# sourceMappingURL=ipaconsonant.component.js.map