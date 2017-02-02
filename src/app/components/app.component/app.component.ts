import {Component, ViewEncapsulation} from "@angular/core";

@Component({
  selector: "app",
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    "../../../assets/styles/main.scss"
  ],
  template: `
<notification-bar></notification-bar>
<navigation></navigation>

<main>
  <router-outlet></router-outlet>
</main>

<footer>
  <div class="container-1170">
    <div layout="row" layout-align="center center">
      <i class="material-icons">pets</i> &nbsp; from the Rabid Kittens
    </div>
  </div>
</footer>
`

})
export class AppComponent {}
