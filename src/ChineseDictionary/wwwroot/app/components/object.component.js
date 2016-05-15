System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ObjectComponent;
    return {
        setters:[],
        execute: function() {
            ObjectComponent = (function () {
                function ObjectComponent(objectService) {
                    this.objectService = objectService;
                    this.item = new Object();
                }
                ObjectComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.objectService.get().then(function (items) { return _this.items = items; });
                };
                ObjectComponent.prototype.showDialogToAdd = function () {
                    this.newItem = true;
                    this.item = new Object();
                    this.displayDialog = true;
                };
                ObjectComponent.prototype.save = function () {
                    if (this.newItem)
                        this.items.push(this.item);
                    else
                        this.items[this.findSelectedItemIndex()] = this.item;
                    this.item = null;
                    this.displayDialog = false;
                };
                ObjectComponent.prototype.delete = function () {
                    this.items.splice(this.findSelectedItemIndex(), 1);
                    this.item = null;
                    this.displayDialog = false;
                };
                ObjectComponent.prototype.onRowSelect = function (event) {
                    this.newItem = false;
                    this.item = this.cloneItem(event.data);
                    this.displayDialog = true;
                };
                ObjectComponent.prototype.cloneItem = function (i) {
                    var item = new Object();
                    for (var prop in i) {
                        item[prop] = i[prop];
                    }
                    return item;
                };
                ObjectComponent.prototype.findSelectedItemIndex = function () {
                    return this.items.indexOf(this.selectedItem);
                };
                return ObjectComponent;
            }());
            exports_1("ObjectComponent", ObjectComponent);
        }
    }
});
//# sourceMappingURL=object.component.js.map