import {Routes} from "@angular/router";
import {
  HomeComponent,
  AboutComponent,
  DetailComponent,
  NoContentComponent
} from "./components/index";

export const ROUTES: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "detail", component: DetailComponent},
  {path: "**", component: NoContentComponent},
];
