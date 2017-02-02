import {Injectable} from "@angular/core";
import {BearerToken} from "../../types/index";
import {Response, Http, RequestOptionsArgs, Headers, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Injectable()
export class LoginService {
  private bearerToken: BearerToken = new BearerToken();
  private redirectTo: string;

  constructor(private http: Http, private location: Location, private router: Router) {
  }

  public logIn(): void {
    this.redirectTo = this.location.path();

    this.location.replaceState("/");
    this.router.navigate(["signin"]);
  }

  public isLoggedIn(): boolean {
    if (this.bearerToken.expires && this.bearerToken.expires.getTime() >= Date.now()){
      return true;
    }
    return false;
  }

  public accessToken(): string {
    return this.bearerToken.accessToken;
  }

  public getNewToken(clientId: string, clientSecret: string) {
    this.getNewTokenFromServer(clientId, clientSecret)
      .subscribe((token) => {
      this.bearerToken = token;
      if (this.redirectTo) {
        this.router.navigateByUrl(this.redirectTo);
      } else {
        this.router.navigate(["home"]);
      }
      });
  }

  private getNewTokenFromServer(clientId: string, clientSecret: string): Observable<BearerToken> {
    let p = new URLSearchParams();
    p.append("client_id", clientId);
    p.append("client_secret", clientSecret);
    p.append("grant_type", "client_credentials");
    let body = p.toString();

    let requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    let options: RequestOptionsArgs = {headers: requestHeaders};

    return this.http.post(`${AuthServerUrl}/token`, body, options)
      .map((response: Response) => {
        let bearerToken = new BearerToken();
        let responseToken = response.json();
        bearerToken.accessToken = responseToken["access_token"];
        bearerToken.tokenType = responseToken["token_type"];
        bearerToken.issued = new Date(responseToken[".issued"]);
        bearerToken.expires = new Date(responseToken[".expires"]);
        return bearerToken;
      })
      .catch(error => {
        console.log(error || 'Server error');
        return Observable.throw(error || 'Server error');
      });
  }
}
