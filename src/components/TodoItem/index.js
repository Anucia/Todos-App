import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";

import "./index.css";

const TodoItem = (props) => {
  const { todoDetails, deleteTodo, toggleIsChecked } = props;
  //const { index } = editTodo;
  const { id, title, completed } = todoDetails;
  const strikeTitle = completed ? "line-through-title" : null;
  const checkedIcon = completed ? (
    <ImCheckboxChecked color="#3b82f6" size={15} />
  ) : (
    <ImCheckboxUnchecked color="#000000" size={15} />
  );

  const onClickDelete = () => {
    deleteTodo(id);
  };

  /*const onClickEdit = () => {
    editTodo(index);
  };*/

  const onClickCheckbox = () => {
    toggleIsChecked(id);
  };

  return (
    <li className="todo-item">
      <button type="button" onClick={onClickCheckbox} className="check-button">
        {checkedIcon}
      </button>
      <div className="todo-container">
        <p className={`title ${strikeTitle}`}>{title}</p>
        <div className="buttons-container">
          <button type="button" className="edit-button">
            <BsPencilSquare color="#181818" size={20} />
          </button>
          <button
            type="button"
            onClick={onClickDelete}
            className="delete-button"
          >
            <RiDeleteBin5Line color="#181818" size={20} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
