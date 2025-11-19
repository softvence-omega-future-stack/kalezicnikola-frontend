import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "@/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import CallLogs from "@/pages/CallLogs";
import Calendar from "@/pages/Calendar";
import Patients from "@/pages/Patients";
import AddPatientForm from "@/dashboard/components/Patients/Addpatient";
import PatientProfilePage from "@/dashboard/components/Patients/PatientProfilePage";
import Tasks from "@/pages/Tasks";
import Supports from "@/pages/Supports";
import Settings from "@/pages/Settings";
import AddNewStaff from "@/dashboard/components/Settings/Sidebar/MyStaf/AddNewStaf";
import StaffProfile from "@/dashboard/components/Settings/Sidebar/MyStaf/ViewProfile";
import DoctorProfile from "@/dashboard/components/dashboard/DoctorProfile/DoctorProfile";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import DashboardHome from "@/pages/Admin/DashboardHome/DashboardHome";
import LoginPage from "@/auth/Login";
import SignupPage from "@/auth/SignUpPage";
import ForgetPasswordPage from "@/auth/ForgetPassword";
import OtpPage from "@/auth/OtpPage";
import CreateNewPassword from "@/auth/CreateMewPass";
import Service from "@/components/Service";
import SuccessfullNewPassword from "@/auth/SuccessfullnewPass";
import CoustomerPage from "@/pages/Admin/Customers/CoustomerPage";
import BellingSubscription from "@/pages/Admin/Belling/BellingSubscription";
import AIVoicePage from "@/pages/Admin/AIvoice/AIVoicePage";
import SystemHelthpage from "@/pages/Admin/SystemHealth/SystemHelthpage";
import SecurityPage from "@/pages/Admin/Security/SecurityPage";
import SettingPage from "@/pages/Admin/Settings/Settingpage";
import SupportPage from "@/pages/Admin/Supports/SupportPage";
import Home from "@/pages/Home";





const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
           {
        index: true,
        element: <Home />
      },
        {
    path: "/",
    element: <Home />, 
  },
   
     {
        path:'/login',
        element: <LoginPage />
      },
     {
        path:'/signup',
        element: <SignupPage />
      },
      {
        path:'/forget_password',
        element:<ForgetPasswordPage/>
      },
      {
        path:'/otp',
        element:<OtpPage/>
      },
      {
        path:'/createnew_pass',
        element:<CreateNewPassword/>
      },
      {
        path:'/test',
        element:<Service/>
      },
      {
        path:'/successfull_pass',
        element:<SuccessfullNewPassword/>
      },
    
    ],
  },
    {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "call_logs", element: <CallLogs /> },
      {path:"calendar", element:<Calendar />},
      { path: "patients", element: <Patients/> },
      { path: "add-patient", element: <AddPatientForm/> },
      { path: "patients/:id", element: <PatientProfilePage /> },
      { path: "tasks", element: <Tasks /> },
      { path: "supports", element: <Supports/> },
      { path: "settings", element: <Settings /> },
      
      { path: "settings/staff/add", element: <AddNewStaff /> },
      { path: "settings/staff/profile/:id", element: <StaffProfile /> },
      { path: "doctor-profile", element: <DoctorProfile /> },

   //  { path: "*", element: <NotFound /> },
    ],

  },

  {
    path: "/admin",
    element: <AdminDashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "customers", element: <CoustomerPage /> },
      { path: "belling_subs", element: <BellingSubscription /> },
      { path: "aivoice", element: <AIVoicePage /> },
      { path: "system_health", element: <SystemHelthpage /> },
      { path: "security", element: <SecurityPage /> },
      { path: "settings", element: <SettingPage /> },
      { path: "supports", element: <SupportPage /> },
      
    ],
  }
]);
export default routes;
