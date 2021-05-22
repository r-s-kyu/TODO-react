import { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo.jsx";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState(["洗濯", "買い物"]);
  const [completeTodos, setCompleteTodos] = useState(["掃除"]);
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newTodos = [...incompleteTodos];
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    newTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newTodos);
  };

  const onClickReturn = (index) => {
    const newCompleteTodos = [...completeTodos];
    const newIncomleteTodos = [...incompleteTodos, completeTodos[index]];
    newCompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncomleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickReturn(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
