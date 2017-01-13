import {Injectable} from "@angular/core";
import {Http, Response, RequestOptionsArgs, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {NotificationBarService, NotificationType} from "angular2-notification-bar";

import {Brand} from "../../types/index";
import {LoginService} from "../login/login.service";

@Injectable()
export class BrandApiService {

  constructor(public http: Http, private notificationService: NotificationBarService,
              private loginService: LoginService) {
  }

  getBrands(searchText: string): Observable<Brand[]> {
    searchText = searchText || "";
    let options: RequestOptionsArgs = {headers: new Headers({"Authorization": `Bearer ${this.loginService.accessToken()}`})};

    return this.http.get(`${CatalogApiUrl}/brands?searchText=${searchText}`, options)
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
