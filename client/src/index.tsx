import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';

//Admin
import DashBoardPageAdmin from './Views/Admin/AdminDashBoard';
import ProjectPageAdmin from './Views/Admin/ProjectPage';
import RolePageAdmin from './Views/Admin/RolesPage';
import NoticePageAdmin from './Views/Admin/NoticePage';
import DepartmentPageAdmin from './Views/Admin/DepartmentPage';
import EmployeePageAdmin from './Views/Admin/EmployeePage';
import ManageAccountPageAdmin from './Views/Admin/ManageAccountPage';
import LeavePageAdmin from './Views/Admin/LeavePage';
import TimeReportPageAdmin from './Views/Admin/TimeReportPage';
//Employe
import ProjectPage from './Views/Employee/ProjectPage';
import DashBoardPage from './Views/Employee/Dashboard';
import LeavePage from './Views/Employee/LeavePage';
import ManageAccountPage from './Views/Employee/ManageAccountPage';
import NoticePage from './Views/Employee/NoticePage';
import TimeReportPage from './Views/Employee/TimeReportPage';

import Layout from './Components/Features/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: 'dashboard',
//         element: <DashBoardPage />,
//       },
//     ],
//   },
// ]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} />
    <Outlet /> */}
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/*<Route index element={<App />} />
        <Route path="dashboard" element={<DashBoardPage />} />
  <Route path="dashboard/admin" element={<AdminDashBoardPage />} />*/}
        <Route index element={<App />} />
        <Route element={<Layout isAdmin={true} />}>
          <Route path="/dashboard/admin" element={<DashBoardPageAdmin />} />
          <Route path="/department/admin" element={<DepartmentPageAdmin />} />
          <Route path="/employee/admin" element={<EmployeePageAdmin />} />
          <Route path="/leave/admin" element={<LeavePageAdmin />} />
          <Route
            path="/manageaccount/admin"
            element={<ManageAccountPageAdmin />}
          />
          <Route path="/notice/admin" element={<NoticePageAdmin />} />
          <Route path="/project/admin" element={<ProjectPageAdmin />} />
          <Route path="/role/admin" element={<RolePageAdmin />} />
          <Route path="/timereport/admin" element={<TimeReportPageAdmin />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="dashboard" element={<DashBoardPage />} />
          <Route path="leave" element={<LeavePage />} />
          <Route path="manageaccount" element={<ManageAccountPage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="project" element={<ProjectPage />} />
          <Route path="timereport" element={<TimeReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
