import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppController } from './appController';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService, Todo, UpdateTodoInput } from './API.service';
import { from, Observable, of } from 'rxjs';
import { CommonClass } from './core/common-class';
import { catchError, finalize, pluck, tap } from 'rxjs/operators';
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
    id: [null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    city: ['', Validators.required],
  });

  todos$ = from(this.api.ListTodos()).pipe(pluck('items'), tap(console.log)) as Observable<
    Todo[]
  >;
  isEditing = false;
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
  }

  getTodoList() {
    this.todos$ = from(this.api.ListTodos()).pipe(pluck('items'), tap(console.log)) as Observable<
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

  editingTodo(todo: Todo) {
    this.isEditing = true;
    this.createForm.patchValue({
      id: todo.id,
      name: todo.name,
      description: todo.description,
      city: todo.city,
    });
  }

  editTodo(todo: Todo) {
    from(this.api.UpdateTodo(todo as UpdateTodoInput))
      .pipe(
        finalize(() => {
          this.isEditing = false;
          this.createForm.reset();
        })
      )
      .subscribe(() => this.getTodoList());
    console.log(this.isEditing);
  }

  deleteTodo(id: string = '') {
    from(this.api.DeleteTodo({ id }))
      .pipe(
        finalize(() => {
          this.getTodoList();
          this.createForm.reset();
        })
      )
      .subscribe();
  }
}
