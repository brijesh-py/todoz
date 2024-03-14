import { IoAddSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { FaRegPenToSquare } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateTodo, togglePopUp, holdTodo } from "../../store/todoSlice";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const dispatch = useDispatch();
  const updateTempHold = useSelector((state: any) => state.updateTempHold);
  const popUp = useSelector((state: any) => state.popUp);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: updateTempHold?.title || "",
      description: updateTempHold?.description || "",
      time: updateTempHold?.time || "",
    },
  });

  useEffect(() => {
    setValue("title", updateTempHold.title);
    setValue("description", updateTempHold.description);
    setValue("time", updateTempHold.time);
  }, [updateTempHold]);

  const handleAddTodo = (e: any) => {
    if (updateTempHold?.id) {
      e.id = updateTempHold.id;
      e.completed = updateTempHold.completed;
    }

    dispatch(addOrUpdateTodo(e));
    navigate("/");
    dispatch(holdTodo([]));
    reset();
  };

  return (
    <div
      className={`w-[100%] bg-gray-200 h-[90vh] flex p-2 justify-center items-center absolute z-10 shadow-lg  border border-slate-300 ${
        popUp ? "hidden" : "flex"
      }`}
    >
      <form
        className="mt-4 max-w-[600px] w-[90vw]  bg-white p-4 shadow-lg"
        onSubmit={handleSubmit(handleAddTodo)}
      >
        <input
          type="text"
          className="w-full p-2 outline-none bg-transparent border-2 border-slate-400 focus:border-slate-800"
          placeholder="Add a todo"
          {...register("title", {
            required: true,
          })}
        />
        <textarea
          {...register("description", {
            required: true,
          })}
          className="max-h-[200px] min-h-[100px] w-full p-2 my-2 outline-none bg-transparent border-2 border-slate-400 focus:border-slate-800"
        ></textarea>
        <input
          {...register("time", {
            required: true,
          })}
          className="w-fit mb-3 p-2 outline-none bg-transparent border-2 border-slate-400 focus:border-slate-800"
          id="file_input"
          type="date"
        />
        <div>
          <button
            type="submit"
            className="px-3 py-2 rounded-sm cursor-pointer bg-sky-300 hover:bg-sky-600 me-2"
          >
            {updateTempHold?.id ? (
              <FaRegPenToSquare className="text-xl" />
            ) : (
              <IoAddSharp className="text-xl" />
            )}
          </button>
          <button
            type="reset"
            className="px-3 py-2 rounded-sm cursor-pointer bg-blue-300 hover:bg-blue-600 me-2"
          >
            <GrPowerReset className="text-xl" />
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-sm cursor-pointer bg-rose-300 hover:bg-rose-600 me-2"
            onClick={() => dispatch(togglePopUp())}
          >
            <IoMdClose className="text-xl" />
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddTodo;
