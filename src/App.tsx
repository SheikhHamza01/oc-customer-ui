// import React from "react";
// import { BrowserRouter, Navigate, Outlet, Route, Routes, useParams} from "react-router-dom";
// import Sidebar from "./Components/ui/sidebar";
// import SubscriptionList from "./Pages/AccountList";
// import SubscriptionRequest from "./Pages/wizard/index";
// import { useTheme } from "./contexts/themeContext";

// const App: React.FC = () => {
//   const { theme } = useTheme();
//   return (
//   <div className={`bg-theme-${theme} text-color-${theme} min-h-screen pt-[32px] pr-[32px]`}>
//     <div className="flex gap-[32px]">
//       <Sidebar />
//       <main className="flex-1 ">
//         <SubscriptionList />
//       </main>
//     </div>
//   </div>
// );
// }

// export default App;

import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Sidebar from "./shared/components/ui/sidebar";
import SubscriptionList from "./pages/AccountList";
import CustomerDashboard from "./pages/Dashboard/customerDashboard";
import { Index as SubscriptionRequest } from "./pages/Wizard";
import { useTheme } from "./contexts/themeContext";

const Layout: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`bg-theme-${theme} text-color-${theme} min-h-screen pt-[32px] pr-[32px]`}
    >
      <div className="flex gap-[32px]">
        <Sidebar />
        <main className="flex-1">
          <Outlet /> {/* page content render hoga */}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout ke andar nested routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/subscription/list" replace />} />
          <Route path="subscription/list" element={<SubscriptionList />} />
          <Route path="subscription/request" element={<SubscriptionRequest />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
