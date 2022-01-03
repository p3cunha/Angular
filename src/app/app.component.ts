import { Component } from '@angular/core';
import { AppController } from './appController';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  APIService,
  Todo,
  SubscriptionResponse,
  OnCreateTodoSubscription,
} from './API.service';
import { from, Observable, of, Subscription } from 'rxjs';
import { CommonClass } from './core/common-class';
import { catchError, finalize, pluck, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

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
export class AppComponent extends CommonClass {
  createForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    city: ['', Validators.required],
  });

  todos$ = from(this.api.ListTodos()).pipe(pluck('items')) as Observable<
    Todo[]
  >;

  title = 'angular';
  buttons: Buttons = [
    { name: 'RxJS', color: 'yellow', route: 'rxjs' },
    { name: 'Components', color: 'blue', route: 'components' },
    { name: '', color: 'purple', route: '' },
  ];

  constructor(
    public appController: AppController,
    private api: APIService,
    private fb: FormBuilder,
    protected router: Router
  ) {
    super();
    console.log('router in app', router);
  }

  getTodoList() {
    this.todos$ = from(this.api.ListTodos()).pipe(pluck('items')) as Observable<
      Todo[]
    >;
  }

  onCreate(todo: Todo) {
    from(this.api.CreateTodo(todo))
      .pipe(
        catchError((e) => {
          console.log('error creating restaurant...', e);
          return of(e);
        }),
        finalize(() => {
          this.getTodoList();
          this.createForm.reset();
        })
      )
      .subscribe();
  }

  deleteTodo(id: string | undefined) {
    if (id)
      from(this.api.DeleteTodo({ id })).subscribe(() => this.getTodoList());
  }
}
