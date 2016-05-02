import {Component, OnInit} from "angular2/core";
import {Button, Dialog, DataTable, Column, Header, Footer, InputText} from "primeng/primeng";
import {IPAConsonant} from "../domain/ipaconsonant"

@Component({
    selector: "static",
    templateUrl: "app/components/ipaconsonant.html",
    directives: [Button, Dialog, DataTable, Column, Header, Footer, InputText]
})
export class IPAConsonantComponent implements OnInit {

    displayDialog: boolean;

    item: Object = new IPAConsonant();

    selectedItem: Object;

    newItem: boolean;

    items: Object[];

    constructor() { }

    ngOnInit() {
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
    }

    showDialogToAdd() {
        this.newItem = true;
        this.item = new Object();
        this.displayDialog = true;
    }

    save() {
        if (this.newItem)
            this.items.push(this.item);
        else
            this.items[this.findSelectedItemIndex()] = this.item;

        this.item = null;
        this.displayDialog = false;
    }

    delete() {
        this.items.splice(this.findSelectedItemIndex(), 1);
        this.item = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newItem = false;
        this.item = this.cloneItem(event.data);
        this.displayDialog = true;
    }

    cloneItem(c: Object): Object {
        let item = new Object();
        for (let prop in c) {
            item[prop] = c[prop];
        }
        return item;
    }

    findSelectedItemIndex(): number {
        return this.items.indexOf(this.selectedItem);
    }
}