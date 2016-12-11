import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class Title {
  value = "Angular 2";
  constructor(public http: Http) {

  }

  getData(): Observable<any> {
    console.log("Title#getData(): Get Data");
    // return this.http.get("/assets/data.json")
    // .map(res => res.json());
    return Observable.of({
      value: "Angular2"
    });
  }

}
