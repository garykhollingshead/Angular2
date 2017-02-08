import {Component} from "@angular/core";
import {BrandApiService} from "../../services/index";
import {Brand} from "../../types/index";
import {LoginService} from "../../services/login/login.service";
import {Headers} from "@angular/http";

@Component({
  selector: "brand-list",
  template: `
<div class="pg-header" protected>
  <div class="container-1170">
    <h1 class="title">Brands Homepage</h1>
    <h1>Brands</h1>
    <div class="row">
      <div flex-gt-sm="50" flex="85" class="input-leftIcon">
        <span class="input-icon material-icons">search</span>
        <input #query (keyup)="search(query.value)" placeholder="Search by Parent Brand or Brand"/>
      </div>
    </div>
  </div>
</div>

<div class="pg-body">
  <div class="container-1170">
     <div class="row">
      <div class="details-row">
        <h5>BRANDS</h5>
      </div>
      <div class="actionBtn-row">
        <button md-raised-button class="primaryBtn" >Add New Brand</button>
      </div>
    </div>
    <div class="search-results">
        <table>
          <thead>
          <tr>
            <th>Brand ID</th>
            <th class="column-sort" >Brand Name</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let brand of allBrands">
            <td data-label="Brand ID">{{brand.id}}</td>
            <td data-label="Name"><a >{{brand.name}}</a></td>
          </tr>
          </tbody>
        </table>
      <pager [headers]="header" (onUpdateList)="updateBrandsListsFromPaging($event)"></pager>
    </div>
  </div>
</div>
`
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
