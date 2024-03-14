import { GoInbox } from "react-icons/go";
import { IoTodayOutline } from "react-icons/io5";
import { MdOutlineUpcoming } from "react-icons/md";
import { FaRegCheckSquare } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { navigateTodo } from "../../store/todoSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <aside
      id="default-sidebar"
      className="fixed top-14 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-slate-300"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 ">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                `flex items-center p-2  rounded-lg group  hover:text-white ${
                  isActive
                    ? "text-sky-600 hover:bg-sky-400"
                    : "text-gray-900 hover:bg-slate-400"
                }`
              }
              onClick={() => dispatch(navigateTodo("INBOX"))}
            >
              <GoInbox className="text-xl" />
              <span className="ms-3">Inbox</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/today"
              className={({ isActive, isPending }) =>
                `flex items-center p-2  rounded-lg group  hover:text-white ${
                  isActive
                    ? "text-sky-600 hover:bg-sky-400"
                    : "text-gray-900 hover:bg-slate-400"
                }`
              }
              onClick={() => dispatch(navigateTodo("TODAY"))}
            >
              <IoTodayOutline className="text-xl" />
              <span className="ms-3">Today</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upcoming"
              className={({ isActive, isPending }) =>
                `flex items-center p-2  rounded-lg group  hover:text-white ${
                  isActive
                    ? "text-sky-600 hover:bg-sky-400"
                    : "text-gray-900 hover:bg-slate-400"
                }`
              }
              onClick={() => dispatch(navigateTodo("UPCOMING"))}
            >
              <MdOutlineUpcoming className="text-xl" />
              <span className="ms-3">Upcoming</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/completed"
              className={({ isActive, isPending }) =>
                `flex items-center p-2  rounded-lg group  hover:text-white ${
                  isActive
                    ? "text-sky-600 hover:bg-sky-400"
                    : "text-gray-900 hover:bg-slate-400"
                }`
              }
              onClick={() => dispatch(navigateTodo("COMPLETED"))}
            >
              <FaRegCheckSquare className="text-xl" />
              <span className="ms-3">Completed</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trash"
              className={({ isActive, isPending }) =>
                `flex items-center p-2  rounded-lg group  hover:text-white ${
                  isActive
                    ? "text-sky-600 hover:bg-sky-400"
                    : "text-gray-900 hover:bg-slate-400"
                }`
              }
              onClick={() => dispatch(navigateTodo("TRASH"))}
            >
              <IoTrashBinOutline className="text-xl" />
              <span className="ms-3">Trash</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default Sidebar;
