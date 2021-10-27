import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExhaustMapComponent } from './exhaust-map/exhaust-map.component';
import { RxjsComponent } from './rxjs.component';

const routes: Routes = [
  {
    path: '',
    component: RxjsComponent
  },
  {
    path: 'rxjs/exhaustMap',
    component: ExhaustMapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RxjsRoutingModule {}
