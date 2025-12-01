

import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

const App = () => {
  const location = useLocation();

  // যেসব route-এ navbar & footer দেখাবে না
  const authRoutes = [
    "/login",
    "/signup",
    "/forget_password",
    "/otp",
    "/createnew_pass",
    "/successfull_pass"
  ];

  const hideLayout = authRoutes.includes(location.pathname);

  return (
    <div className="bg-[#F3F6F6] min-h-screen">
      {!hideLayout && <Navbar />}   {/* Auth page ছাড়া বাকি সব পেজে navbar */}

      <Outlet />

      {!hideLayout && <Footer />}   {/* Auth page ছাড়া বাকি সব পেজে footer */}
    </div>
  );
};

export default App;


// import { Outlet } from "react-router-dom";



// const App = () => {
//   return (
//     <div >
      
//       <Outlet/>
    
//     </div>
//   );
// };

// export default App;
