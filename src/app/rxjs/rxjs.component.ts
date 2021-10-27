import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppController } from '../appController';

@Component({
  selector: 'app-rxjs',
  template: `<button color="blue" (click)="appController.redirectTo('rxjs/exhaustMap')">
      ExhaustMap
    </button>
    <!-- <button (click)="appController.redirectTo('rxjs/concatMap')">
      ConcatMap
    </button> -->
    <router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsComponent {
  constructor(public appController: AppController) {}
}
