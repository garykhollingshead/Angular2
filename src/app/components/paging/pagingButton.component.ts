import {Component, Output, EventEmitter, Input} from "@angular/core";

@Component({
  selector: "paging-buttons",
  templateUrl: `
<div class="paging-container">
  <button md-raised-button (click)="buttonClicked('first')" [disabled]="!buttonConfig.showfirst" class="page-btn first">First
  </button>
  <button md-raised-button (click)="buttonClicked('prev')" [disabled]="!buttonConfig.showprev" class="page-btn prev"><i class="material-icons">&#xE314;</i> <b>Prev</b>
  </button>
  <button md-raised-button (click)="buttonClicked('next')" [disabled]="!buttonConfig.shownext" class="page-btn next"><b>Next</b> <i class="material-icons">&#xE315;</i>
  </button>
  <button md-raised-button (click)="buttonClicked('last')" [disabled]="!buttonConfig.showlast" class="page-btn last">Last
  </button>
</div>`
})
export class PagingButtonsComponent {
  @Input() buttonConfig: any = {};
  @Output() onButtonClicked: EventEmitter<string> = new EventEmitter<string>();

  buttonClicked(button: string) {
    this.onButtonClicked.emit(button);
  }
}
