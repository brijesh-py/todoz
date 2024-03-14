import { useDispatch } from "react-redux";
import { searchTodo } from "../../store/todoSlice";
const Header = () => {
  const dispatch = useDispatch();
  const handleSearch = (e: string) => {
    dispatch(searchTodo(e));
  };
  return (
    <header className="w-full border-b border-slate-300 ">
      <div className="w-[100%] mx-auto p-2 flex items-center justify-between">
        <a href="" className="text-xl text-sky-700 font-black">
          Todoz
        </a>
        <div className="flex items-center max-w-sm mx-auto">
          <div className="relative w-full">
            <input
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Search todo..."
              required
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
