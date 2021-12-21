import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppController } from '../appController';

@Component({
  selector: 'app-rxjs',
  template: `
   <button color="blue" (click)="appController.redirectTo('components/autocomplete')">
      Autocomplete
    </button>
    <router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsComponent {
  constructor(public appController: AppController) {}
}
