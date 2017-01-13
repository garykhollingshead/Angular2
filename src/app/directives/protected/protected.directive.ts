import {Directive} from "@angular/core";
import {LoginService} from "../../services/login/login.service";

@Directive({
  selector: "[protected]"
})
export class ProtectedDirective {

  constructor(private loginService: LoginService) {
    if (!this.loginService.isLoggedIn()) {
      this.loginService.logIn();
    }
  }
}
