import {Component} from 'angular2/core';
import { RouteConfig, AsyncRoute, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, RouteDefinition, Location } from 'angular2/router';
import {StaticComponent} from "./components/static.component";

declare var System: any;

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1><router-outlet></router-outlet>',
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
    new AsyncRoute({
        path: "/sub",
        name: "Sub",
        loader: () => System.import("app/components/mvc.component").then(c => c["MvcComponent"])
    }),
    new AsyncRoute({
        path: "/numbers",
        name: "Numbers",
        loader: () => System.import("app/components/api.component").then(c => c["ApiComponent"])
    })
])
export class AppComponent { }