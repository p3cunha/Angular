import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from 'src/app/API.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() todos!: Todo[] | null;
  @Output() editingTodo = new Subject<Todo>();
  @Output() deleteTodo = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
