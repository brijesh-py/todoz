import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "./Layout";

const routers = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      key={"inbox"}
      element={<Layout />}
      children={[
        <Route key={"inbox"} path="" element={<Layout />} />,
        <Route key={"today"} path="today" element={<Layout />} />,
        <Route key={"upcoming"} path="upcoming" element={<Layout />} />,
        <Route key={"completed"} path="completed" element={<Layout />} />,
        <Route key={"trash"} path="trash" element={<Layout />} />,
      ]}
    />,
  ])
);
export default routers;
