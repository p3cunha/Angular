import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppController } from './appController';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonClass } from './core/common-class';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TodosFacade } from './core/todo.facade';
import { Todo } from './interfaces/todo.interface';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends CommonClass implements OnInit {
  createForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    city: ['', Validators.required],
  });

  get something() {
    return true;
  }

  isEditing = false;
  title = 'angular';
  buttons: Buttons = [
    { name: 'RxJS', color: 'yellow', route: 'rxjs' },
    { name: 'Components', color: 'blue', route: 'components' },
    { name: '', color: 'purple', route: '' },
  ];

  constructor(
    public appController: AppController,
    public todosFacade: TodosFacade,
    private fb: FormBuilder,
    protected router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.todosFacade.loadAlertas().subscribe();
  }

  createTodo(todo: Todo) {
    this.todosFacade
      .createTodo(todo)
      .pipe(finalize(() => this.createForm.reset()))
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
    this.todosFacade
      .updateTodo(todo)
      .pipe(
        finalize(() => {
          this.isEditing = false;
          this.createForm.reset();
        })
      )
      .subscribe();
  }

  deleteTodo(todo: Todo) {
    this.todosFacade.removeTodo(todo).subscribe();
  }
}
