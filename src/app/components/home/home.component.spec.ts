import {
  inject,
  TestBed
} from "@angular/core/testing";

import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from "@angular/http";
import { MockBackend } from "@angular/http/testing";

import {
  AppState,
  Title
} from "../../services/index";

import { HomeComponent } from "./home.component";

describe("Home", () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      AppState,
      Title,
      HomeComponent
    ]
  }));

  it("should have default data", inject([ HomeComponent ], (home: HomeComponent) => {
    expect(home.localState).toEqual({ value: "" });
  }));

  it("should have a title", inject([ HomeComponent ], (home: HomeComponent) => {
    expect(!!home.title).toEqual(true);
  }));

  it("should log ngOnInit", inject([ HomeComponent ], (home: HomeComponent) => {
    spyOn(console, "log");
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
