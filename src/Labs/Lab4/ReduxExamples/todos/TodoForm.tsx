import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const todo = useSelector((state: any) => state.todosReducer.todo);
  const dispatch = useDispatch();
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <input
        className="form-control mr-2"
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
      <button onClick={() => dispatch(addTodo(todo))} className="btn btn-success" id="wd-add-todo-click">
        Add
      </button>
      <button onClick={() => dispatch(updateTodo(todo))} className="btn btn-warning mr-2" id="wd-update-todo-click">
        Update
      </button>
    </li>
  );
}
