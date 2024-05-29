import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="pt-20">
      <Outlet />
    </main>
  );
};

export default Main;
