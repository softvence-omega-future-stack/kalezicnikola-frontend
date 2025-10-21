import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Dashboard from "@/pages/Dashboard";
import DashboardLayout from "@/layout/DashboardLayout";
import CallLogs from "@/pages/CallLogs";
import Calendar from "@/pages/Calendar";
import Patients from "@/pages/Patients";
import Tasks from "@/pages/Tasks";
import Supports from "@/pages/Supports";
import Settings from "@/pages/Settings";

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
      { path: "patients", element: <Patients /> },
      { path: "tasks", element: <Tasks /> },
      { path: "supports", element: <Supports/> },
      { path: "settings", element: <Settings /> },
   //  { path: "*", element: <NotFound /> },
    ],

  },
]);
export default routes;
