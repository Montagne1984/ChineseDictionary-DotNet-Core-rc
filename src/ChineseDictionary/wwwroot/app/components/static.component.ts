import {Component, OnInit} from "angular2/core";
import {InputText} from 'primeng/primeng';

@Component({
    selector: "static",
    template: `
        <h1>My First PrimeNG App</h1>
        <input type="text" pInputText/>
    `,
    directives: [InputText]
    //templateUrl: "app/components/static.html"
})
export class StaticComponent {
    public message = "The 'static.html' was used as the Angular2 'templateUrl'. There is a 'message' property bound to the <blockqoute> element."
}