import { Component } from '@angular/core';
import { AppController } from './appController';

enum ButtonColor {
  RED = 'red',
  YELLOW = 'yellow',
  PURPLE = 'purple',
  BLUE = 'blue',
}
interface Button {
  name: string;
  color: 'red' | 'yellow' | 'purple' | 'blue';
  route: string;
}

interface Buttons extends Array<Button> {}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular';
  buttons: Buttons = [
    { name: 'RxJS', color: 'yellow', route: 'rxjs' },
    { name: 'Components', color: 'blue', route: 'components' },
    { name: '', color: 'purple', route: '' },
  ];

  constructor(public appController: AppController) {}
}
