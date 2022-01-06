import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { ComponentsRoutingModule } from "./components-routing.module";
import { ComponentsComponent } from "./components.component";
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  declarations: [ComponentsComponent, AutocompleteComponent, TodoListComponent],
  imports: [CommonModule, FormsModule, ComponentsRoutingModule],
  exports: [TodoListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
