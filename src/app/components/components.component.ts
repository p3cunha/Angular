import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppController } from '../appController';

@Component({
  selector: 'app-rxjs',
  template: `
    <app-combo-box [list]="itemList"></app-combo-box>
    <router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsComponent {
  itemList = ['carrot', 'banana', 'apple', 'potato', 'tomato', 'cabbage', 'turnip', 'okra', 'onion', 'cherries', 'plum', 'mango'];
  constructor(public appController: AppController) {}
}
