import {Component, OnInit, Input} from "@angular/core";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: "sign-in",
  template: `
<form #signinForm="ngForm" novalidate>
  <div layout="row" layout-align="center center">
    <md-input-container>
      <label>Login Name:</label>
      <input md-input type="text" name="clientId" [(ngModel)]="clientId" >
    </md-input-container>
  </div>
  <div layout="row" layout-align="center center">
    <md-input-container>
      <label>Password:</label>
      <input md-input type="password" name="clientSecret" [(ngModel)]="clientSecret" >
    </md-input-container>
  </div>
  <div layout="row" layout-align="center center">
    <button (click)="login()" [disabled]="signinForm.invalid">Log In</button>
  </div>
</form>
`
})
export class SignInComponent implements OnInit{
  public clientId: string = "TestMcClientApp";
  public clientSecret: string = "TestMcClientApp_Secret";

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
  }

  public login(): void {
    this.loginService.getNewToken(this.clientId, this.clientSecret);
  }
}
