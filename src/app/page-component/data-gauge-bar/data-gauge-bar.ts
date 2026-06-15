import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-data-gauge-bar',
  imports: [],
  templateUrl: './data-gauge-bar.html',
  styleUrl: './data-gauge-bar.css',
})
export class DataGaugeBarComponent {
  @Input() value: number | any = 25;

  get barColor(): string {
    if (this.value > 25) return '#ef4444';
    if (this.value < 15) return '#ef4444';
    return '#10b981';
  }
}
