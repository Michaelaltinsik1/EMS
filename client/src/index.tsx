import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';
import DashBoardPage from './Views/Employee/Dashboard';
import AdminDashBoardPage from './Views/Admin/AdminDashBoard';

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
      <Routes>
        <Route index element={<App />} />
        <Route path="dashboard" element={<DashBoardPage />} />
        <Route path="dashboard/admin" element={<AdminDashBoardPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
