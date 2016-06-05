"use strict";
var ObjectComponent = (function () {
    //items: Object[];
    function ObjectComponent() {
    }
    ObjectComponent.prototype.ngOnInit = function () {
        //this.objectService.get().then(items => this.items = items);
        //this.items = [];
    };
    ObjectComponent.prototype.showDialogToAdd = function () {
        //this.newItem = true;
        //this.item = new Object();
        //this.displayDialog = true;
    };
    ObjectComponent.prototype.save = function () {
        //if (this.newItem)
        //    this.items.push(this.item);
        //else
        //    this.items[this.findSelectedItemIndex()] = this.item;
        //this.item = null;
        //this.displayDialog = false;
    };
    ObjectComponent.prototype.delete = function () {
        //this.items.splice(this.findSelectedItemIndex(), 1);
        //this.item = null;
        //this.displayDialog = false;
    };
    ObjectComponent.prototype.onRowSelect = function (event) {
        //this.newItem = false;
        //this.item = this.cloneItem(event.data);
        //this.displayDialog = true;
    };
    //cloneItem(i: Object): Object {
    //    let item = new Object();
    //    //for (let prop in i) {
    //    //    item[prop] = i[prop];
    //    //}
    //    return item;
    //}
    ObjectComponent.prototype.findSelectedItemIndex = function () {
        //return this.items.indexOf(this.selectedItem);
        return 0;
    };
    return ObjectComponent;
}());
exports.ObjectComponent = ObjectComponent;
//# sourceMappingURL=object.component.js.map