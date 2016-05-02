import {Phoneme} from "./phoneme"

export class IPAVowel extends Phoneme {
    constructor(public id: number, public symbol: string) {
        super(id, symbol);
    }
}