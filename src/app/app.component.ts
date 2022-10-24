import { ICurrencyData } from "./models/currency";
import { Component, OnInit } from "@angular/core";
import { Observable, tap } from "rxjs";
import { CurrencyService } from "src/app/services/http.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "currency-app";
  currencies: ICurrencyData[] = [];
  loading = false;
  currencies$: Observable<ICurrencyData[]>;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.loading = true;
    this.currencies$ = this.currencyService.getUahCurrency().pipe(
      tap(() => {
        this.loading = false;
      })
    );
  }
}
