import {Component} from "@angular/core";

@Component({
  selector: "loading-wheel",
  template: `
<div ng-show="vm.isLoading">
  <h3>Loading...</h3>
  <div class='loader'></div>
</div>
`
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
