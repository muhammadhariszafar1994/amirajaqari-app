import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Customizer from "../pages/customizer";

const MyRoutes = () => {


  return (
    <Router>
      <Routes>
        <Route
          path="/customizer"
          element={<Customizer />}
        />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
