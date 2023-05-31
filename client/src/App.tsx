import SignInPage from './Views/SignInPage';
import { Routes, Route } from 'react-router-dom';
// Admin
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
import { ThemeProvider } from './Components/Features/Context/ThemeProvider';
import { AuthProvider } from './Components/Features/Context/AuthProvider';
import { CacheProvider } from './Components/Features/Context/CacheProvider';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './Views/PageNotFound';
function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <AuthProvider>
          <CacheProvider>
            <ToastContainer />
            <Routes>
              <Route index element={<SignInPage />} />
              <Route element={<Layout isAdmin={true} />}>
                <Route
                  path="/dashboard/admin"
                  element={<DashBoardPageAdmin />}
                />
                <Route
                  path="/department/admin"
                  element={<DepartmentPageAdmin />}
                />
                <Route path="/employee/admin" element={<EmployeePageAdmin />} />
                <Route path="/leave/admin" element={<LeavePageAdmin />} />
                <Route
                  path="/manageaccount/admin"
                  element={<ManageAccountPageAdmin />}
                />
                <Route path="/notice/admin" element={<NoticePageAdmin />} />
                <Route path="/project/admin" element={<ProjectPageAdmin />} />
                <Route path="/role/admin" element={<RolePageAdmin />} />
                <Route
                  path="/timereport/admin"
                  element={<TimeReportPageAdmin />}
                />
              </Route>
              <Route element={<Layout />}>
                <Route path="dashboard" element={<DashBoardPage />} />
                <Route path="leave" element={<LeavePage />} />
                <Route path="manageaccount" element={<ManageAccountPage />} />
                <Route path="notice" element={<NoticePage />} />
                <Route path="project" element={<ProjectPage />} />
                <Route path="timereport" element={<TimeReportPage />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </CacheProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
