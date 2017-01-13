import {Component} from "@angular/core";
import {BrandApiService} from "../../services/index";
import {Brand} from "../../types/index";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: "brand-list",
  templateUrl: "brandList.html"
})
export class BrandListComponent {
  public allBrands: Brand[];

  constructor(private brandApi: BrandApiService, private loginService: LoginService) {
    if (!this.loginService.isLoggedIn()) {
      return;
    }
    this.brandApi.getBrands("")
      .subscribe(
        (brands) => {
          this.allBrands = brands;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public search(query: string) {
    this.brandApi.getBrands(query)
      .subscribe(
        (brands) => {
          this.allBrands = brands;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
