import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule, PreloadAllModules} from "@angular/router";
import "hammerjs";
import {NotificationBarModule} from "angular2-notification-bar";

import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";

import {} from "./services/index";

import {  AppComponent } from "./components/index";

import {XLarge} from "./directives/index";
import {MaterialModule} from "@angular/material";
import {ProtectedDirective} from "./directives/protected/protected.directive";
import {BrandApiService} from "./services/brands/brandApi.service";
import {LoginService} from "./services/login/login.service";
import {BrandListComponent} from "./components/brandList/brandList.component";
import {CustomerListComponent} from "./components/customerList/customerList.component";
import {HomeComponent} from "./components/home/home.component";
import {LoadingWheelComponent} from "./components/loading/loading.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {NoContentComponent} from "./components/no-content/no-content.component";
import {ProductListComponent} from "./components/productList/productList.component";
import {SignInComponent} from "./components/signIn/signIn.component";
// import {CustomHttp} from "./services/common/customHttp.service";

const APP_PROVIDERS = [
    BrandApiService,
  LoginService,
    // {
    //   provide: Http,
    //   useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new CustomHttp(backend, defaultOptions),
    //   deps: [XHRBackend, RequestOptions]
    // }
  ]
  ;

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ProtectedDirective,
    BrandListComponent,
    CustomerListComponent,
    HomeComponent,
    LoadingWheelComponent,
    NavigationComponent,
    NoContentComponent,
    ProductListComponent,
    SignInComponent,
    XLarge
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
    NotificationBarModule
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {}

