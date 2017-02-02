import {Component} from "@angular/core";

@Component({
  selector: "navigation",
  template: `
<!--<notifications-bar class="notifications"></notifications-bar>-->
<div class="navbar navbar-default" role="navigation">
  <div class="container-1170">
    <div class="navbar-header">
      <a class="navbar-brand" href=""><b>RAD</b>min</a>
    </div>

    <div class="collapse navbar-collapse" id="js-navbar-collapse">
      <ul class="nav navbar-nav">
        <li><a routerLink="home">Home</a></li>
        <li><a routerLink="brands">Brands</a></li>
        <li><a routerLink="products">Products</a></li>
        <li><a routerLink="customers">Customers</a></li>
      </ul>
    </div>

  </div>
</div>
`
})
export class NavigationComponent {}
