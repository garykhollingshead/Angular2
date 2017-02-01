import {Injectable} from "@angular/core";
import {Http, Response, RequestOptionsArgs, Headers, RequestMethod} from "@angular/http";
import {Observable} from "rxjs/Rx";

import {LoginService} from "../login/login.service";
import {NotificationBarService, NotificationType} from "angular2-notification-bar";

@Injectable()
export class HttpService {
  constructor(private http: Http, private notificationService: NotificationBarService,
              private loginService: LoginService) { }

  httpGetWithHeaders(url: string): Observable<any> {
    let options: RequestOptionsArgs = {headers: this.getAuthHeaders()};

    return this.http.get(url, options)
      .map(this.returnDataWithHeaders)
      .catch(resp => this.rejectData(resp));
  }

  httpGet(url: string): Observable<any> {
    return this.httpMethod(RequestMethod.Get, url, null);
  }

  httpPut(url: string, data: any): Observable<any> {
    return this.httpMethod(RequestMethod.Put, url, data);
  }

  httpPatch(url: string, data: any): Observable<any> {
    return this.httpMethod(RequestMethod.Patch, url, data);
  }

  httpPost(url: string, data: any): Observable<any> {
    return this.httpMethod(RequestMethod.Post, url, data);
  }

  httpDelete(url: string, data: any): Observable<any> {
    return this.httpMethod(RequestMethod.Delete, url, data);
  }

  private httpMethod(method: RequestMethod, url: string, data: any): Observable<any> {
    let options: RequestOptionsArgs = {
      headers: this.getAuthHeaders(),
      body: data,
      method: method
    };

    return this.http.request(url, options)
      .map(this.returnData)
      .catch(resp => this.rejectData(resp));
  }

  private getAuthHeaders(): Headers{
    return new Headers({
      "Access-Control-Expose-Headers": "Link",
      "Authorization": `Bearer ${this.loginService.accessToken()}`,
      "withCredentials": true
    });
  }

  private returnData(response: Response): Observable<any> {
    return response.json();
  }

  private returnDataWithHeaders(response: Response): Observable<any> {
    let value: any = {
      data: response.json(),
      headers: response.headers
    };
    return value;
  }

  private rejectData(response: Response): Observable<any> {
    let error: string = response.json().message;
    this.notificationService.create({
      message: error || 'Server error',
      type: NotificationType.Error
    });
    return Observable.throw(error || 'Server error');
  }
}
