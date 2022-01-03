import { Injectable, Injector, OnDestroy, Optional, Self, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export abstract class CommonClass implements OnDestroy {
  destroy$ = new Subject<void>();
  constructor(@Optional() protected router?: Router) {
  }

  redirectTo = (route: string) => this.router?.navigateByUrl(route);

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
