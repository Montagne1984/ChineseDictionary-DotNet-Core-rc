import {Component, OnInit} from "angular2/core";
import {Button} from 'primeng/primeng';
import {Dialog} from 'primeng/primeng';
import {DataTable} from 'primeng/primeng';
import {Column} from 'primeng/primeng';

@Component({
    selector: "static",
    templateUrl: "app/components/consonant.html"
})
export class ConsonantComponent implements OnInit {

    displayDialog: boolean;

    consonant: Consonant = new Consonant();

    selectedConsonant: Consonant;

    newCar: boolean;

    consonants: Consonant[];

    constructor() { }

    ngOnInit() {
        //this.consonantService.getCarsSmall().then(consonants => this.consonants = consonants);
        this.consonants = [];
    }

    showDialogToAdd() {
        this.newCar = true;
        this.consonant = new Consonant();
        this.displayDialog = true;
    }

    save() {
        if (this.newCar)
            this.consonants.push(this.consonant);
        else
            this.consonants[this.findSelectedConsonantIndex()] = this.consonant;

        this.consonant = null;
        this.displayDialog = false;
    }

    delete() {
        this.consonants.splice(this.findSelectedConsonantIndex(), 1);
        this.consonant = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCar = false;
        this.consonant = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    cloneCar(c: Consonant): Consonant {
        let car = new Consonant();
        for (let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }

    findSelectedConsonantIndex(): number {
        return this.consonants.indexOf(this.selectedConsonant);
    }
}

class Consonant {
    constructor(public vin?, public year?, public brand?, public color?) { }
}
