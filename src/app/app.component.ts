import { Component } from '@angular/core';
import { AppController } from './appController';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService, Todo, SubscriptionResponse, OnCreateTodoSubscription } from './API.service';
import { Observable, Subscription } from 'rxjs';
import { CommonClass } from './core/common-class';
import { pluck, takeUntil } from 'rxjs/operators';

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

  todo: Todo = {
    name: 'My first todo',
    description: 'Hello world!',
    city: 'Salvador',
  };
  todos = new Array<Todo>();
  todos$ = new Observable<any>();
  private subscription: Subscription | null = null;

  title = 'angular';
  buttons: Buttons = [
    { name: 'RxJS', color: 'yellow', route: 'rxjs' },
    { name: 'Components', color: 'blue', route: 'components' },
    { name: '', color: 'purple', route: '' },
  ];

  constructor(
    public appController: AppController,
    private api: APIService,
    private fb: FormBuilder
  ) {
    super();
  }

  async ngOnInit() {
    /* fetch todos when app loads */
    this.api.ListTodos().then((event) => {
      this.todos = event.items as Todo[];
    });

    this.subscription = <Subscription>this.api.OnCreateTodoListener
    .subscribe(
      (event: any) => {
        const newTodo = event.value.data.onCreateTodo;
        this.todos = [newTodo, ...this.todos];
      }
    );
  }

  onCreate(todo: Todo) {
    this.api
      .CreateTodo(todo)
      .then((event) => {
        console.log('item created!');
        this.createForm.reset();
      })
      .catch((e) => {
        console.log('error creating restaurant...', e);
      });
  }
}
