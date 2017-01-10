import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule, RequestOptions, XHRBackend, Http} from "@angular/http";
import {RouterModule, PreloadAllModules} from "@angular/router";
import "hammerjs";
import {NotificationBarModule} from "angular2-notification-bar";

import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";

import {BrandApi} from "./services/index";

import {
  HomeComponent,
  BrandListComponent,
  CustomerListComponent,
  ProductListComponent,
  AppComponent,
  NoContentComponent,
  NavigationComponent
} from "./components/index";

import {XLarge} from "./directives/index";
import {MaterialModule} from "@angular/material";
import {CustomHttp} from "./services/common/customHttp.service";

// Application wide providers
const APP_PROVIDERS = [
    BrandApi,
    {
      provide: Http,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new CustomHttp(backend, defaultOptions),
      deps: [XHRBackend, RequestOptions]
    }
  ]
  ;

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    BrandListComponent,
    CustomerListComponent,
    ProductListComponent,
    HomeComponent,
    NoContentComponent,
    NavigationComponent,
    XLarge
  ],
  imports: [ // import Angular"s modules
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
    NotificationBarModule
  ],
  providers: [ // expose our Services and Providers into Angular"s dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor() {
  }

}

