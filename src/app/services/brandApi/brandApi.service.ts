import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {NotificationBarService, NotificationType} from "angular2-notification-bar";

import {Brand} from "../../types/index";

@Injectable()
export class BrandApi {

  constructor(public http: Http, private notificationService: NotificationBarService) {
  }

  getBrands(searchText: string): Observable<Brand[]> {
    searchText = searchText || "";
    console.log([ApiHost, CatalogApiRoot, "/brands?searchText=", searchText]);
    return this.http.get(ApiHost + CatalogApiRoot + "/brands?searchText=" + searchText)
      .map((response: Response) => response.json())
      .catch(error => {
        this.notificationService.create({
          message: error || 'Server error',
          type: NotificationType.Error
        });
        return Observable.throw(error || 'Server error');
      });
  };

}
