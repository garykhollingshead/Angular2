import {Component} from "@angular/core";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: "sign-in",
  template: `
<form #signinForm="ngForm" novalidate>
  <div layout="row" layout-align="center center">
    <div>
      <label>Login Name:</label>
      <input type="text" name="clientId" [(ngModel)]="clientId" >
    </div>
  </div>
  <div layout="row" layout-align="center center">
    <div>
      <label>Password:</label>
      <input type="password" name="clientSecret" [(ngModel)]="clientSecret" >
    </div>
  </div>
  <div layout="row" layout-align="center center">
    <button (click)="login()" [disabled]="signinForm.invalid">Log In</button>
  </div>
</form>
`
})
export class SignInComponent{
  public clientId: string = "TestMcClientApp";
  public clientSecret: string = "TestMcClientApp_Secret";

  constructor(private loginService: LoginService) {}

  public login(): void {
    this.loginService.getNewToken(this.clientId, this.clientSecret);
  }
}
