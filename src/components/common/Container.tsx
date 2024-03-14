import { IoAddSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { togglePopUp } from "../../store/todoSlice";
import { Todo, NotFound } from "../";

const Container = () => {
  const dispatch = useDispatch();
  const navigate = useSelector((state: any) => state.tempHold.navigate);
  const todo = useSelector((state: any) => state.tempHold.todo);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className=" text-xl sm:text-2xl md:text-3xl text-sky-700 font-black capitalize">
          {navigate.toLowerCase()}
        </h1>
        <button
          onClick={() => dispatch(togglePopUp())}
          className="px-3 py-1 rounded-sm cursor-pointer bg-sky-300 hover:bg-sky-600 me-2"
        >
          <IoAddSharp className="text-2xl" />
        </button>
      </div>
      <div className="mt-3 h-[60vh] overflow-scroll scroll-0">
        {todo?.map((item: any) => {
          return <Todo {...item} key={item.id} />;
        })}
        {todo.length === 0 && <NotFound />}
      </div>
    </>
  );
};

export default Container;
