import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppController } from './appController';
import { ComponentsModule } from './components/components.module';
import { RxjsModule } from './rxjs/rxjs.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RxjsModule,
    ComponentsModule
  ],
  providers: [AppController],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
