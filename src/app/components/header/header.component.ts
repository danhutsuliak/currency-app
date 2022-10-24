import { ICurrencyData } from "../../models/currency";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  @Input() currencies: ICurrencyData[];
}
