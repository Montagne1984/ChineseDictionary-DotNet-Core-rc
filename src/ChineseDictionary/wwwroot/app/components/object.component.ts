import {Component, OnInit} from "angular2/core";
import {Button, Dialog, DataTable, Column, Header, Footer, InputText} from "primeng/primeng";

export abstract class ObjectComponent implements OnInit {

    displayDialog: boolean;

    item: Object = new Object();

    selectedItem: Object;

    newItem: boolean;

    items: Object[];

    constructor(private objectService: IObjectService) { }

    ngOnInit() {
        this.objectService.get().then(items => this.items = items);
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

    cloneItem(i: Object): Object {
        let item = new Object();
        for (let prop in i) {
            item[prop] = i[prop];
        }
        return item;
    }

    findSelectedItemIndex(): number {
        return this.items.indexOf(this.selectedItem);
    }
}

export interface IObjectService {
    get();
}