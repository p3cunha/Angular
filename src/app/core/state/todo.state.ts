import { shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo, Todos } from 'src/app/interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosState {
  private _updating$ = new BehaviorSubject<boolean>(false);
  private _hasAppNotifications$ = new BehaviorSubject<boolean>(false);
  private _todos$ = new BehaviorSubject<Todo[]>([]);

  get isUpdating$() {
    return this._updating$.asObservable().pipe(shareReplay());
  }
  set isUpdating(isUpdating: boolean) {
    this._updating$.next(isUpdating);
  }
  get todos$() {
    return this._todos$.asObservable().pipe(shareReplay());
  }
  get todos(): Todos {
    return this._todos$.getValue();
  }
  set todos(todos: Todos) {
    this._todos$.next(todos);
  }
  get hasAppNotifications$() {
    return this._hasAppNotifications$.asObservable().pipe(shareReplay());
  }
  get hasAppNotifications() {
    return this._hasAppNotifications$.getValue();
  }
  set hasAppNotifications(enabled) {
    this._hasAppNotifications$.next(enabled);
  }

  addTodo(todo: Todo) {
    const currentValue = this.todos;
    this.todos = [todo, ...currentValue];
  }

  updateTodo(Todo: Todo) {
    const todosRef = this.todos;
    const TodoRef = todosRef.find(({ id }) => id === Todo.id);
    const TodoIndex = todosRef.indexOf(TodoRef!);
    todosRef[TodoIndex] = Todo;
    this.todos = [...todosRef];
  }

  updateTodoId(TodoToReplace: Todo, addedTodoWithId: Todo) {
    const todos = this.todos;
    const updatedCategoryIndex = todos.findIndex(
      (category) => category === TodoToReplace
    );
    todos[updatedCategoryIndex] = addedTodoWithId;
    this.todos = [...todos];
  }

  removeTodo(todoRemove: Todo) {
    const currentValue = this.todos;
    this.todos = currentValue.filter((todo) => todo !== todoRemove);
  }

  enableAppNotifications(enable: boolean) {
    this.hasAppNotifications = enable;
  }

  putTodoBack(Todo: Todo, index: number) {
    this.todos = [
      ...this.todos.slice(0, index),
      Todo,
      ...this.todos.slice(index),
    ];
  }
}
