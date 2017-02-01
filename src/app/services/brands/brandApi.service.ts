import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

import {Brand, BrandWithHeaders} from "../../types/index";
import {HttpService} from "../common/http.service";

@Injectable()
export class BrandApiService {

  constructor(public http: HttpService) { }

  getBrands(searchText: string): Observable<Brand[]> {
    return this.http.httpGet(`${CatalogApiUrl}/brands?searchText=${searchText || ""}`);
  };

  getBrandsWithHeaders(searchText: string): Observable<BrandWithHeaders> {
    return this.http.httpGetWithHeaders(`${CatalogApiUrl}/brands?pageSize=5&searchText=${searchText || ""}`);
  }
}
