import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Dashboard from "@/pages/Dashboard";
import DashboardLayout from "@/layout/DashboardLayout";
import CallLogs from "@/pages/CallLogs";
import Calendar from "@/pages/Calendar";

import Tasks from "@/pages/Tasks";
import Supports from "@/pages/Supports";
import Settings from "@/pages/Settings";
import AddNewStaff from "@/dashboard/components/Settings/Sidebar/MyStaf/AddNewStaf";
import StaffProfile from "@/dashboard/components/Settings/Sidebar/MyStaf/ViewProfile";
import DoctorProfile from "@/dashboard/components/dashboard/DoctorProfile/DoctorProfile";

import PatientProfilePage from "@/dashboard/components/Patients/PatientProfilePage";
import Patients from "@/pages/Patients";
import LoginPage from "@/auth/Login";
import SignupPage from "@/auth/SignUpPage";
import ForgotPasswordPage from "@/auth/ForgetPassword";
import OtpPage from "@/auth/OtpPage";
import CreateNewPassword from "@/auth/CreateMewPass";
import SuccessfullNewPassword from "@/auth/SuccessfullnewPass";
import AddPatientForm from "@/dashboard/components/Patients/Addpatient";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
     {
        index: true,
        element: <LoginPage />
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
        element:<ForgotPasswordPage/>
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
]);
export default routes;
