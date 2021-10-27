import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AppController {
  constructor(private router: Router) {}

  redirectTo = (route: string) => this.router.navigateByUrl(route);

}
