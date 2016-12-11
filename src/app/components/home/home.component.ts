import {Component} from "@angular/core";

import {AppState, Title} from "../../services/index";

@Component({
  selector: "home",
  providers: [
    Title
  ],
  templateUrl: "home.html"
})
export class HomeComponent {
  localState: any = {value: ""};
  data: string = "";

  constructor(public appState: AppState, public title: Title) {

  }

  ngOnInit() {
    console.log("hello `Home` component");
    this.title.getData().subscribe(data => this.data = data);
  }

  submitState(value: string) {
    console.log("submitState", value);
    this.appState.set("value", value);
    this.localState.value = "";
  }
}
