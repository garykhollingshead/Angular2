import { inject, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, ConnectionBackend, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";

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
      HomeComponent
    ]
  }));

  it("should log ngOnInit", inject([ HomeComponent ], (home: HomeComponent) => {
    spyOn(console, "log");
    expect(console.log).not.toHaveBeenCalled();
  }));

});
