import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule, PreloadAllModules } from "@angular/router";

import { ENV_PROVIDERS } from "./environment";
import { ROUTES } from "./app.routes";

import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { AppState } from "./services/index";
import {
  HomeComponent,
  AboutComponent,
  DetailComponent,
  AppComponent,
  NoContentComponent
} from "./components/index";

import { XLarge } from "./directives/index";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    DetailComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    XLarge
  ],
  imports: [ // import Angular"s modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular"s dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appState: AppState) {}

}

