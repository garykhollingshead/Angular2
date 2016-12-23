import {Routes} from "@angular/router";
import {
  HomeComponent,
  BrandListComponent,
  ProductListComponent,
  CustomerListComponent,
  NoContentComponent
} from "./components/index";

export const ROUTES: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "brands", component: BrandListComponent},
  {path: "products", component: ProductListComponent},
  {path: "customers", component: CustomerListComponent},
  {path: "**", component: NoContentComponent}
];
