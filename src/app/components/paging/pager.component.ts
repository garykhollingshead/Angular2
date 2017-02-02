import {Component, Input, Output, EventEmitter, OnChanges} from "@angular/core";
import {HttpService} from "../../services/common/http.service";
import {Headers} from "@angular/http";

@Component({
  selector: "pager",
  template: `
<paging-buttons [buttonConfig]="buttonConfiguration" (onButtonClicked)="buttonClicked($event)"> 
</paging-buttons>`
})
export class PagerComponent implements OnChanges {
  @Input() headers: Headers;
  @Output() onUpdateList = new EventEmitter<any>();

  private relations: any = {};
  public buttonConfiguration: any = this.defaultButtonConfiguration();

  constructor(private httpService: HttpService) { }

  ngOnChanges(changes): void {
    if (changes.headers) {
      this.headers = changes.headers.currentValue;
      this.parseResponseHeaders();
    }
  }

  buttonClicked(button: string) {
    let url = this.relations[button];
    if (url)
      this.getData(url);
  }

  getData(url: string) {
    this.httpService.httpGetWithHeaders(url)
      .subscribe((response) => {
        this.headers = response.headers;
        this.parseResponseHeaders();
        this.onUpdateList.emit(response.data);
      });
  }

  private parseResponseHeaders() {
    this.relations = {};
    this.buttonConfiguration = this.defaultButtonConfiguration();
    if (!this.headers)
      return;

    let linkHeader: any = this.headers.get("link");
    if (!linkHeader)
      return;

    let splitLinks = linkHeader.split(",");
    let pattern = /<(.+)>; rel="(.+)"/;

    for (let index = 0; index < splitLinks.length; index++) {
      let link = splitLinks[index];
      let match: string[] = pattern.exec(link);
      let url: string = match[1];
      let rel: string = match[2];
      this.relations[rel] = url;
      this.buttonConfiguration[`show${rel}`] = true;
    }
  }

  private defaultButtonConfiguration(): any {
    return {
      showfirst: false,
      showlast: false,
      shownext: false,
      showprev: false
    };
  }
}
