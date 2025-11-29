
import { Outlet } from "react-router-dom";
import Navbar from "./layout/Navbar";
// import DashboardLayout from "./layout/DashboardLayout";

const App = () => {
  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }}>
      <Navbar/>
      <Outlet/>
    
    </div>
  );
};

export default App;
