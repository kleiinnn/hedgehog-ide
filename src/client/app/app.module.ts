import {BrowserModule} from "@angular/platform-browser";
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {TextIdeComponent} from "./text-ide/text-ide.component";
import {TextIdeModule} from "./text-ide/text-ide.module";
import {ProgramListComponent} from "./program/program-list.component";
import {ProgramModule} from "./program/program.module";

const appRoutes: Routes = [
    {
        path: '',
        component: ProgramListComponent
    },
    {
        path: 'text-ide/:programName',
        component: TextIdeComponent
    },
    {
        path: '*',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [
        BrowserModule,
        ProgramModule,
        TextIdeModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
