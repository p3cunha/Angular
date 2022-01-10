export interface Todo {
  id?: string | null;
  name?: string;
  description?: string;
  city?: string;
  image?: string | null;
  owner?: string | null;
}

export interface Todos extends Array<Todo> {}
