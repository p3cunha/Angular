import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { catchError, pluck, shareReplay, take, tap } from 'rxjs/operators';
import { APIService, UpdateTodoInput } from 'src/app/API.service';
import { Todo } from 'src/app/interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private api: APIService) {}

  listTodos() {
    return from(this.api.ListTodos()).pipe(
      pluck('items'),
      tap(console.log),
      take(1)
    );
  }

  createTodo(todo: Todo) {
    return from(this.api.CreateTodo(todo)).pipe(
      this.catchError(),
      shareReplay()
    );
  }

  updateTodo(todo: Todo) {
    return from(this.api.UpdateTodo(todo as UpdateTodoInput)).pipe(
      this.catchError(),
      shareReplay()
    );
  }

  deleteTodo(id: string) {
    return from(this.api.DeleteTodo({ id })).pipe(
      shareReplay()
    );
  }

  catchError() {
    return catchError((e) => {
      console.log('error', e);
      return of(e);
    });
  }
}
