import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { ICurrencyData } from "src/app/models/currency";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  p24Url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

  getUahCurrency(): Observable<ICurrencyData[]> {
    return this.http.get<ICurrencyData[]>(this.p24Url);
  }
}
