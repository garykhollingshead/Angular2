import {Injectable} from "@angular/core";
import {Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class CustomHttp extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let urlParts: any = {
      isAPIRequest: false
    };
    if (typeof url === "string") {
      urlParts = this.getUrlParts(url);
    } else {
      urlParts = this.getUrlParts(url.url);
    }
    if (!urlParts.isAPIRequest) {
      return super.request(url, options);
    }
    let apiProxyUrl = urlParts.host + '/admin/proxy?url=' + encodeURIComponent(urlParts.urlPath);

    return super.request(apiProxyUrl, options);
  }

  private getUrlParts(urlPath: string): any {
    let url = new URL(urlPath);
    let apiBasePaths = [CatalogApiUrl, ProgramApiUrl, TemplateApiRoot];
    let indexOfApi = urlPath.indexOf(apiBasePaths.find(path => urlPath.indexOf(path) !== -1));

    return {
      host: url.host,
      urlPath: url.pathname,
      isAPIRequest: indexOfApi !== -1
    };
  }
}
