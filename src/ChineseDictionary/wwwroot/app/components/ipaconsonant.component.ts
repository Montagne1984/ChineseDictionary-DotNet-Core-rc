import {Component, OnInit, Injectable} from "@angular/core";
import {ObjectComponent, IObjectService} from "./object.component";
import {Button, Dialog, DataTable, Column, Header, Footer, InputText} from "primeng/primeng";
import {IPAConsonant} from "../domain/ipaconsonant"

@Component({
    selector: "ipaconsonant",
    templateUrl: "app/components/ipaconsonant.html",
    directives: [Button, Dialog, DataTable, Column, Header, Footer, InputText],
    //providers: [IPAConsonantService]
})
@Injectable()
export class IPAConsonantComponent {
    displayDialog: boolean;

    item: IPAConsonant = new IPAConsonant();

    selectedItem: IPAConsonant;

    items: IPAConsonant[];


    newItem: boolean;

    //items: Object[];

    constructor() { }

    ngOnInit() {
        //this.objectService.get().then(items => this.items = items);
        //this.items = [];
    }

    showDialogToAdd() {
        this.newItem = true;
        this.item = new IPAConsonant();
        this.displayDialog = true;
    }

    save() {
        //if (this.newItem)
        //    this.items.push(this.item);
        //else
        //    this.items[this.findSelectedItemIndex()] = this.item;

        //this.item = null;
        //this.displayDialog = false;
    }

    delete() {
        //this.items.splice(this.findSelectedItemIndex(), 1);
        //this.item = null;
        //this.displayDialog = false;
    }

    onRowSelect(event) {
        //this.newItem = false;
        //this.item = this.cloneItem(event.data);
        //this.displayDialog = true;
    }

    cloneItem(i: IPAConsonant): IPAConsonant {
        let item = new IPAConsonant();
        //for (let prop in i) {
        //    item[prop] = i[prop];
        //}
        return item;
    }

    findSelectedItemIndex(): number {
        //return this.items.indexOf(this.selectedItem);
        return 0;
    }
}

//export class IPAConsonantService implements IObjectService {
//    get() {
//        return [];
//    }
//}