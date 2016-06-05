import {Component} from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {StaticComponent} from "./components/static.component";
//import {ConsonantComponent} from "./components/consonant.component";
import {IPAConsonantComponent} from "./components/ipaconsonant.component";

declare var System: any;

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]
})
@RouteConfig([
    {
        path: '/index',
        name: 'Index',
        component: StaticComponent,
        useAsDefault: true
    },
    //{
    //    path: '/consonant',
    //    name: 'Consonant',
    //    component: ConsonantComponent
    //},
    {
        path: '/ipaconsonant',
        name: 'IPAConsonant',
        component: IPAConsonantComponent
    },
    //new AsyncRoute({
    //    path: "/sub",
    //    name: "Sub",
    //    loader: () => System.import("app/components/mvc.component").then(c => c["MvcComponent"])
    //}),
    //new AsyncRoute({
    //    path: "/numbers",
    //    name: "Numbers",
    //    loader: () => System.import("app/components/api.component").then(c => c["ApiComponent"])
    //})
])
export class AppComponent { }