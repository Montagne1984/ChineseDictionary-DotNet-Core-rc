import {Component, OnInit, Injectable} from "angular2/core";
import {ObjectComponent, IObjectService} from "./object.component";
import {Button, Dialog, DataTable, Column, Header, Footer, InputText} from "primeng/primeng";
import {IPAConsonant} from "../domain/ipaconsonant"

@Component({
    selector: "ipaconsonant",
    templateUrl: "app/components/ipaconsonant.html",
    directives: [Button, Dialog, DataTable, Column, Header, Footer, InputText],
    providers: [IPAConsonantService]
})
@Injectable()
export class IPAConsonantComponent extends ObjectComponent {

    item: IPAConsonant = new IPAConsonant();

    selectedItem: IPAConsonant;

    items: IPAConsonant[];

    constructor() {
        super(new IPAConsonantService());
        alert('hi');
    }
}

export class IPAConsonantService implements IObjectService {
    get() {
        return [];
    }
}