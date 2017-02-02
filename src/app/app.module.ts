import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule, PreloadAllModules, Routes} from "@angular/router";
import {NotificationBarModule} from "angular2-notification-bar";

import {ProtectedDirective} from "./directives/protected/protected.directive";
import {BrandApiService, HttpService, LoginService} from "./services/index";
import {
  AppComponent,
  BrandListComponent,
  CustomerListComponent,
  HomeComponent,
  LoadingWheelComponent,
  NavigationComponent,
  NoContentComponent,
  ProductListComponent,
  SignInComponent,
  PagingButtonsComponent,
  PagerComponent } from "./components/index";

const APP_PROVIDERS = [
  BrandApiService,
  HttpService,
  LoginService
];
const ROUTES: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "brands", component: BrandListComponent},
  {path: "products", component: ProductListComponent},
  {path: "customers", component: CustomerListComponent},
  {path: "signin", component: SignInComponent},
  {path: "**", component: NoContentComponent}
];

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
    PagingButtonsComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
    NotificationBarModule
  ],
  providers: [
    APP_PROVIDERS
  ]
})
export class AppModule {}

