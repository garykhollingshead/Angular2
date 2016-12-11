import { Directive, ElementRef, Renderer } from "@angular/core";

@Directive({
  selector: "[x-large]" // using [ ] means selecting attributes
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementStyle(element.nativeElement, "fontSize", "x-large");
  }
}
