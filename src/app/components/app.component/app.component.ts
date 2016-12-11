import {Component} from "@angular/core";

import {AppState} from "../../services/app.service/app.service";

@Component({
  selector: "app",
  styleUrls: [
    "app.component.css"
  ],
  templateUrl: "app.component.html"

})
export class AppComponent {
  name: string = "Angular 2";

  constructor(public appState: AppState) {

  }

  ngOnInit() {
    console.log("Initial App State", this.appState.state);
  }

}
