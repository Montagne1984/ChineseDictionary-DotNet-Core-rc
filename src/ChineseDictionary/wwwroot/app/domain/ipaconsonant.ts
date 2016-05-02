import {Phoneme} from "./phoneme"

export class IPAConsonant extends Phoneme {
    constructor(public id?: number, public symbol?: string) {
        super(id, symbol);
    }
}