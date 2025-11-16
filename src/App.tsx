
import { Outlet } from "react-router-dom";
// import DashboardLayout from "./layout/DashboardLayout";

const App = () => {
  return (
    <div style={{ fontFamily: 'Urbanist, sans-serif' }}>
      
      <Outlet/>
    
    </div>
  );
};

export default App;
