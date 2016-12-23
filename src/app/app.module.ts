import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule, PreloadAllModules} from "@angular/router";
import "hammerjs";

import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";

import {APP_RESOLVER_PROVIDERS} from "./app.resolver";
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

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  BrandApi
];

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
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules})
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

