import Header from "./Header";
import Main from "./Main";
import ScrollToTop from "../utils/ScrollToTop";

const AppLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Main />
    </div>
  );
};

export default AppLayout;
