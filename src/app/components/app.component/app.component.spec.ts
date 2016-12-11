import { inject, TestBed } from "@angular/core/testing";

import { AppComponent } from "./app.component";
import { AppState } from "../../services/app.service/app.service";

describe("App", () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppState,
      AppComponent
    ]}));

  it("should have a url", inject([ AppComponent ], (app: AppComponent) => {
    expect(app.name).toEqual("Angular 2");
  }));

});
