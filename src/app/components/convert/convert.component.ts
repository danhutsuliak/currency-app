import { ICurrencyData } from "./../../models/currency";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-convert",
  templateUrl: "./convert.component.html",
})
export class ConvertComponent implements OnInit {
  base_ccy_select = new FormControl("UAH");
  base_ccy_input = new FormControl("");
  ccy_select = new FormControl("USD");
  ccy_input = new FormControl("");
  usdEurRate: number;
  eurUsdRate: number;

  @Input() currencies: ICurrencyData[];

  ngOnInit(): void {
    this.usdEurRate = this.currencies[0].buy / this.currencies[1].buy;
    this.eurUsdRate = this.currencies[1].buy / this.currencies[0].buy;
    // console.log(this.currencies);
    // console.log("usd eur", this.usdEurRate, "eur usd", this.eurUsdRate);
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
    }

    if (this.base_ccy_select.value === "UAH" && this.ccy_select.value === "USD")
      this.ccy_input.setValue(
        (+this.base_ccy_input.value / this.currencies[0].buy).toFixed(3)
      );

    if (this.base_ccy_select.value === "USD" && this.ccy_select.value === "UAH")
      this.ccy_input.setValue(
        (+this.base_ccy_input.value * this.currencies[0].sale).toFixed(3)
      );

    if (this.base_ccy_select.value === "UAH" && this.ccy_select.value === "EUR")
      this.ccy_input.setValue(
        (+this.base_ccy_input.value / this.currencies[1].buy).toFixed(3)
      );

    if (this.base_ccy_select.value === "EUR" && this.ccy_select.value === "UAH")
      this.ccy_input.setValue(
        (+this.base_ccy_input.value * this.currencies[1].sale).toFixed(3)
      );

    if (this.base_ccy_select.value === "USD" && this.ccy_select.value === "EUR")
      this.ccy_input.setValue(
        (+this.base_ccy_input.value * this.usdEurRate).toFixed(3)
      );

    if (this.base_ccy_select.value === "EUR" && this.ccy_select.value === "USD")
      this.ccy_input.setValue(
        (+this.base_ccy_input.value * this.eurUsdRate).toFixed(3)
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

    if (this.base_ccy_select.value === "UAH" && this.ccy_select.value === "USD")
      this.base_ccy_input.setValue(
        (+this.ccy_input.value * this.currencies[0].buy).toFixed(3)
      );

    if (this.base_ccy_select.value === "USD" && this.ccy_select.value === "UAH")
      this.base_ccy_input.setValue(
        (+this.ccy_input.value / this.currencies[0].sale).toFixed(3)
      );

    if (this.base_ccy_select.value === "UAH" && this.ccy_select.value === "EUR")
      this.base_ccy_input.setValue(
        (+this.ccy_input.value * this.currencies[1].buy).toFixed(3)
      );

    if (this.base_ccy_select.value === "EUR" && this.ccy_select.value === "UAH")
      this.base_ccy_input.setValue(
        (+this.ccy_input.value / this.currencies[1].sale).toFixed(3)
      );

    if (this.base_ccy_select.value === "USD" && this.ccy_select.value === "EUR")
      this.base_ccy_input.setValue(
        (+this.ccy_input.value * this.eurUsdRate).toFixed(3)
      );

    if (this.base_ccy_select.value === "EUR" && this.ccy_select.value === "USD")
      this.base_ccy_input.setValue(
        (+this.ccy_input.value * this.usdEurRate).toFixed(3)
      );
  }

  swapCurrencies() {
    let buf = this.base_ccy_select.value;
    this.base_ccy_select.setValue(this.ccy_select.value);
    this.ccy_select.setValue(buf);

    buf = this.base_ccy_input.value;
    this.base_ccy_input.setValue(this.ccy_input.value);
    this.ccy_input.setValue(buf);

    this.updateBaseCcyValue();
  }

  clearInputs() {
    this.base_ccy_input.setValue(null);
    this.ccy_input.setValue(null);
  }
}
