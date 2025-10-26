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

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
   
    // ],
  },
    {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "call_logs", element: <CallLogs /> },
      {path:"calendar", element:<Calendar />},
      { path: "patients", element: <Patients/> },
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
