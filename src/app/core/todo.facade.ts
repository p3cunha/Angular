import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  catchError,
  delay,
  finalize,
  take,
  takeUntil,
  tap,
  mergeMap,
  shareReplay,
} from 'rxjs/operators';
import { Todo, Todos } from '../interfaces/todo.interface';
import { TodosService } from './services/todo.service';
import { TodosState } from './state/todo.state';

@Injectable({
  providedIn: 'root',
})
export class TodosFacade {
  private cancelDelete$ = new Subject<void>();
  showSnackBar = new Subject<void>();
  sessionLoaded = false;

  get isUpdating$() {
    return this.todosState.isUpdating$;
  }
  get todos$(): Observable<Todos> {
    return this.todosState.todos$.pipe(shareReplay());
  }
  get hasAppNotifications$() {
    return this.todosState.hasAppNotifications$;
  }

  constructor(
    private todoService: TodosService,
    private todosState: TodosState
  ) {}

  loadAlertas() {
    if (!this.todosState.todos.length)
      return this.todoService.listTodos().pipe(
        tap((todos) => (this.todosState.todos = [...todos])),
        tap(() => this.loadSession())
      );
    else return of();
  }

  loadSession() {
    this.sessionLoaded = true;
  }

  createTodo(alerta: Todo) {
    return this.todoService.createTodo(alerta).pipe(
      take(1),
      tap((alertaRes) => {
        this.todosState.isUpdating = true;
        this.todosState.addTodo(alertaRes);
      }),
      catchError((err) => {
        console.log(err);
        return of(this.todosState.removeTodo(alerta));
      }),
      finalize(() => (this.todosState.isUpdating = false))
    );
    // .subscribe((alertaAtualizado: Todo) => {
    //   // callback de sucesso - nós temos o id gerado pelo servidor, vamos atualizar o estado
    //   // this.todosState.updateAlertaId(alerta, alertaAtualizado);
    // });
  }

  updateTodo(todo: Todo) {
    return this.todoService.updateTodo(todo).pipe(
      take(1),
      tap((alertaRes) => alertaRes && this.todosState.updateTodo(alertaRes)),
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  }

  /** Emite o sinal para cancelar exclusão do alerta;
   * Quando o sinal for emitido, o alerta deve ser posto de volta na lista em sua posição original;
   */
  cancelDelete() {
    this.cancelDelete$.next();
  }

  /** Remover o alerta da interface primeiro;
   * Caso seja emitido um sinal para cancelar a exclusão, cancelar a subscrição na API;
   * Caso o sinal não seja emitido, prosseguir com a subscrição na API
   */
  removeTodo(todo: Todo) {
    const deletedIndex = this.todosState.todos.indexOf(todo);
    this.showSnackBar.next();
    this.todosState.removeTodo(todo);
    return of(todo).pipe(
      take(1),
      // delay(6000),
      takeUntil(
        this.cancelDelete$.pipe(
          take(1),
          tap(() => this.todosState.putTodoBack(todo, deletedIndex))
        )
      ),
      mergeMap(() =>
        this.todoService.deleteTodo(todo.id!).pipe(
          catchError((err) => {
            console.log(err);
            this.todosState.putTodoBack(todo, deletedIndex);
            return of();
          })
        )
      )
    );
  }
}
