import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { AnimeComponent } from "../../mal-recommendation-system/src/main-page/components/anime/anime.component";


@NgModule({
    declarations: [
        AppComponent,
        AnimeComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }