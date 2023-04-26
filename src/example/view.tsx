import { Vvm } from "../svvm";
import {
  AddTodoViewModel,
  createAddTodoViewModel,
  createTodoItemViewModel,
  createTodoListViewModel,
  TodoItemViewModel,
  TodoListViewModel,
} from "./viewModel";

function AddTodoView(vm: AddTodoViewModel) {
  return (
    <div>
      <input
        type="text"
        value={vm.addTodoText}
        onChange={(e) => vm.setAddTodoText(e.target.value)}
      />
      <button onClick={() => vm.addTodo()} disabled={vm.addTodoText === ""}>
        +
      </button>
    </div>
  );
}

function TodoItemView(vm: TodoItemViewModel) {
  return (
    <div key={vm.item.key}>
      <input
        type="checkbox"
        checked={vm.item.completed}
        onChange={() => vm.toggleComplete()}
      />
      <span
        style={{
          textDecoration: vm.item.completed ? "line-through" : undefined,
        }}
      >
        {vm.item.description}
      </span>
      <button onClick={() => vm.delete()}>x</button>
    </div>
  );
}

function TodoListView(vm: TodoListViewModel) {
  return (
    <div>
      {vm.todoList.map((item) => (
        <Vvm<TodoItemViewModel>
          key={item.key}
          view={TodoItemView}
          viewModel={createTodoItemViewModel(item)}
        />
      ))}
    </div>
  );
}

export function App() {
  return (
    <div>
      <Vvm<AddTodoViewModel>
        view={AddTodoView}
        viewModel={createAddTodoViewModel()}
      />
      <Vvm<TodoListViewModel>
        view={TodoListView}
        viewModel={createTodoListViewModel()}
      />
    </div>
  );
}
