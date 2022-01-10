import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from 'src/app/interfaces/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() todos!: Todo[] | null;
  @Output() editingTodo = new Subject<Todo>();
  @Output() deleteTodo = new Subject<Todo>();

  constructor() { }

  ngOnInit(): void {
  }

}
