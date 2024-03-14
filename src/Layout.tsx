import { Header, Sidebar, AddTodo, Container } from "./components";
const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="sm:ml-64 relative">
        <AddTodo />
        <div className="relative mx-auto w-[100%] md:w-[80%] p-2">
          <div className=" p-2 sm:p-4 relative">
            <Container />
          </div>
        </div>
      </main>
    </>
  );
};
export default Layout;
