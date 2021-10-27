import { NgModule } from "@angular/core";
import { ExhaustMapComponent } from "./exhaust-map/exhaust-map.component";
import { RxjsRoutingModule } from "./rxjs-routing.module";
import { RxjsComponent } from "./rxjs.component";

@NgModule({
  declarations: [
    RxjsComponent,
    ExhaustMapComponent
  ],
  imports: [
    RxjsRoutingModule
  ],
  exports: [
  ]
})
export class RxjsModule {}
