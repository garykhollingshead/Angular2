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

  private getUrlParts(url: string): any {
    let apiBasePaths = [CatalogApiRoot, ProgramApiRoot, TemplateApiRoot];
    let indexOfApi = url.indexOf(apiBasePaths.find(path => url.indexOf(path) !== -1));

    return {
      host: url.substring(0, indexOfApi),
      urlPath: url.substring(indexOfApi),
      isAPIRequest: indexOfApi !== -1
    };
  }
}
