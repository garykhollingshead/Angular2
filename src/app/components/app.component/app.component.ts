import {Component, ViewEncapsulation} from "@angular/core";

@Component({
  selector: "app",
  encapsulation: ViewEncapsulation.None,
  styles: [
    require("../../../assets/styles/main.scss")
  ],
  template: require("./app.component.html")

})
export class AppComponent {

  constructor() {}

}
