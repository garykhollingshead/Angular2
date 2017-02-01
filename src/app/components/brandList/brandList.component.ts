import {Component} from "@angular/core";
import {BrandApiService} from "../../services/index";
import {Brand} from "../../types/index";
import {LoginService} from "../../services/login/login.service";
import {Headers} from "@angular/http";

@Component({
  selector: "brand-list",
  templateUrl: "brandList.html"
})
export class BrandListComponent {
  public allBrands: Brand[];
  public header: Headers;

  constructor(private brandApi: BrandApiService, private loginService: LoginService) {
    if (!this.loginService.isLoggedIn()) {
      return;
    }
    this.brandApi.getBrandsWithHeaders("")
      .subscribe(
        (brands) => {
          this.allBrands = brands.data;
          this.header = brands.headers;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  search(query: string) {
    this.brandApi.getBrandsWithHeaders(query)
      .subscribe(
        (brands) => {
          this.allBrands = brands.data;
          this.header = brands.headers;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateBrandsListsFromPaging(data: Brand[]) {
    this.allBrands = data;
  }
}
