import { ICurrencyData } from "./../../models/currency";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-convert",
  templateUrl: "./convert.component.html",
})
export class ConvertComponent implements OnInit {
  base_ccy_select = new FormControl<"UAH" | "EUR" | "USD">("UAH");
  base_ccy_input = new FormControl("");
  ccy_select = new FormControl<"UAH" | "EUR" | "USD">("USD");
  ccy_input = new FormControl("");
  usdEurRate: number;
  eurUsdRate: number;

  @Input() currencies: ICurrencyData[];
  currencyRates: {
    UAH_USD: number;
    UAH_EUR: number;
    UAH_UAH: number;
    USD_UAH: number;
    USD_EUR: number;
    USD_USD: number;
    EUR_UAH: number;
    EUR_USD: number;
    EUR_EUR: number;
  };

  ngOnInit(): void {
    this.usdEurRate = this.currencies[0].buy / this.currencies[1].buy;
    this.eurUsdRate = this.currencies[1].buy / this.currencies[0].buy;

    this.currencyRates = {
      UAH_USD: this.currencies[0].buy,
      UAH_EUR: this.currencies[1].buy,
      UAH_UAH: 1,

      USD_UAH: 1 / this.currencies[0].sale,
      USD_EUR: this.usdEurRate,
      USD_USD: 1,

      EUR_UAH: 1 / this.currencies[1].sale,
      EUR_USD: this.eurUsdRate,
      EUR_EUR: 1,
    };
  }

  // fires when first input is changed
  updateCcyValue() {
    if (
      this.base_ccy_input.value === null ||
      this.base_ccy_input.value === ""
    ) {
      return;
    }

    if (this.base_ccy_select.value === this.ccy_select.value) {
      this.ccy_input.setValue(this.base_ccy_input.value);
      return;
    }

    if (this.base_ccy_select.value === null || this.ccy_select.value === null) {
      return;
    }

    this.ccy_input.setValue(
      (
        +this.base_ccy_input.value *
        this.currencyRates[
          `${this.ccy_select.value}_${this.base_ccy_select.value}`
        ]
      ).toFixed(3)
    );
  }

  // fires when second input is changed
  updateBaseCcyValue() {
    if (this.ccy_input.value === null || this.ccy_input.value === "") {
      return;
    }

    if (this.base_ccy_select.value === this.ccy_select.value) {
      this.base_ccy_input.setValue(this.ccy_input.value);
    }

    if (this.base_ccy_select.value === null || this.ccy_select.value === null) {
      return;
    }

    this.base_ccy_input.setValue(
      (
        +this.ccy_input.value *
        this.currencyRates[
          `${this.base_ccy_select.value}_${this.ccy_select.value}`
        ]
      ).toFixed(3)
    );
  }

  swapCurrencies() {
    const buf = this.base_ccy_select.value!;
    this.base_ccy_select.setValue(this.ccy_select.value);
    this.ccy_select.setValue(buf);

    const buf2 = this.base_ccy_input.value;
    this.base_ccy_input.setValue(this.ccy_input.value);
    this.ccy_input.setValue(buf2);

    this.updateBaseCcyValue();
  }

  clearInputs() {
    this.base_ccy_input.setValue(null);
    this.ccy_input.setValue(null);
  }
}
