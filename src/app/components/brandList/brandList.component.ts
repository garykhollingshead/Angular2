import { Component } from "@angular/core";
import { BrandApi } from "../../services/index";
import { Brand } from "../../types/index";

@Component({
selector: "brand-list",
templateUrl: "brandList.html"
})
export class BrandListComponent {
  public allBrands: Brand[];


  constructor(private brandApi: BrandApi) {
    this.brandApi.getBrands("")
      .subscribe(
        (brands) => {this.allBrands = brands;},
        (error) => {console.log(error);}
      );
  }

  public search(query: string) {
    this.brandApi.getBrands(query)
      .subscribe(
        (brands) => {this.allBrands = brands;},
        (error) => {console.log(error);}
      );
  }
}