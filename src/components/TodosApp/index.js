import { Component } from "react";

import TodoItem from "../TodoItem";

import "./index.css";

class TodosApp extends Component {
  state = {
    todosList: [],
    userInput: "",
    isFilterActive: false,
  };

  componentDidMount() {
    this.getTodosList();
  }

  getTodosList = async () => {
    const url = "https://jsonplaceholder.typicode.com/users/1/todos";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const updatedData = data.map((eachItem) => ({
      id: eachItem.id,
      title: eachItem.title,
      completed: eachItem.completed,
    }));
    this.setState({ todosList: updatedData });
  };

  toggleIsChecked = (id) => {
    this.setState((prevState) => ({
      todosList: prevState.todosList.map((eachTodo) => {
        if (id === eachTodo.id) {
          return { ...eachTodo, completed: !eachTodo.completed };
        }
        return eachTodo;
      }),
    }));
  };

  onFilter = () => {
    const { isFilterActive } = this.state;

    this.setState({
      isFilterActive: !isFilterActive,
    });
  };

  onChangeUserInput = (event) => {
    this.setState({ userInput: event.target.value });
  };

  addTodo = () => {
    const { todosList, userInput } = this.state;
    const todoId = todosList.length + 1;
    if (userInput !== "") {
      const newTodo = {
        id: todoId,
        title: userInput,
        completed: false,
      };
      this.setState({ todosList: [...todosList, newTodo], userInput: "" });
    }
  };

  deleteTodo = (id) => {
    const { todosList } = this.state;
    const updatedTodosList = todosList.filter((eachTodo) => eachTodo.id !== id);

    this.setState({
      todosList: updatedTodosList,
    });
  };

  /*editTodo = (index) => {
    const { todosList } = this.state;
    const todos = [...todosList];
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      let updatedTodos = [...todos];
      updatedTodos[index].title = editedTodo;
      this.setState({ todosList: updatedTodos });
    }
  };*/

  getFilteredTodoList = () => {
    const { todosList, isFilterActive } = this.state;

    if (isFilterActive) {
      return todosList.filter((eachTodo) => eachTodo.completed === true);
    }
    return todosList;
  };

  render() {
    const { userInput, isFilterActive } = this.state;
    const filterClassName = isFilterActive ? "filter-filled" : "filter-empty";
    const filteredTodoList = this.getFilteredTodoList();
    return (
      <div className="app-container">
        <h1 className="heading">Todos Application</h1>
        <div className="create-task-container">
          <p className="create-task-heading">Create Task</p>

          <input
            type="text"
            className="input-box"
            placeholder="Add Todo"
            value={userInput}
            id="userInput"
            onChange={this.onChangeUserInput}
          />
          <div className="button-container">
            <button type="button" className="add-button" onClick={this.addTodo}>
              Add
            </button>
          </div>
        </div>

        <div className="todo-with-filter">
          <button
            type="button"
            onClick={this.onFilter}
            className={`filter-style ${filterClassName}`}
          >
            Completed
          </button>

          <ul className="todos-list">
            {filteredTodoList.map((eachTodo, index) => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                toggleIsChecked={this.toggleIsChecked}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodosApp;
