import { GoTrash } from "react-icons/go";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { removeTodo, holdTodo, completedTodo } from "../../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

const Todo = (props: any) => {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(props.completed);
  const navigate =
    useSelector((state: any) => state.tempHold.navigate) !== "TRASH";
  return (
    <div className="flex bg-slate-100 items-center justify-between p-2 rounded-none border border-slate-300 hover:shadow hover:bg-slate-200 my-2">
      <div className="flex items-center w-[90%]">
        <div>
          {completed ? (
            <FaCheckCircle
              className={`text-xl  text-green-500 ${
                navigate ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={() => {
                navigate &&
                  (setCompleted(!completed), dispatch(completedTodo(props.id)));
              }}
            />
          ) : (
            <FaRegCircle
              className={`text-xl ${
                navigate ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={() => {
                navigate &&
                  (setCompleted(!completed), dispatch(completedTodo(props.id)));
              }}
            />
          )}
        </div>
        <div className="ml-3 w-[90%]">
          <span className="text-gray-800 block text-lg font-extralight whitespace-nowrap text-ellipsis w-[95%] overflow-hidden">
            {props.title}
          </span>
          <small className="text-xs text-slate-600">{props.time}</small>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {navigate && (
          <FaRegPenToSquare
            onClick={() => dispatch(holdTodo(props))}
            className="text-xl cursor-pointer"
          />
        )}
        <GoTrash
          className="text-xl cursor-pointer hover:text-rose-600"
          onClick={() => dispatch(removeTodo({ id: props.id }))}
        />
      </div>
    </div>
  );
};

export default Todo;
