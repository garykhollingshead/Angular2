import {Component} from "@angular/core";

@Component({
  selector: "loading-wheel",
  template: require("./loading.html")
})
export class LoadingWheelComponent {
  public isLoading: boolean = false;

  constructor() {}

  public start():void {
    this.isLoading = true;
  }

  public stop(): void {
    this.isLoading = false;
  }
}
