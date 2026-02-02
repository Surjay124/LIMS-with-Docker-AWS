import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboards
// Dashboards
import ClientDashboard from './pages/client/Dashboard';
import NewIntake from './pages/client/NewIntake';
import ClientIntakeHistory from './pages/client/ClientIntakeHistory';
import ClientCaseDetails from './pages/client/ClientCaseDetails';
import RateService from './pages/client/RateService';
import ClientProfile from './pages/client/ClientProfile';
import StaffDashboard from './pages/staff/Dashboard';
import ReviewIntake from './pages/staff/ReviewIntake';
import LawyerDashboard from './pages/lawyer/Dashboard';
import LawyerCaseDetails from './pages/lawyer/LawyerCaseDetails';
import AdminDashboard from './pages/admin/Dashboard';
import ActivityLogs from './pages/common/ActivityLogs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route index element={<Navigate to="login" replace />} />
          </Route>

          {/* Protected Client Routes */}
          <Route path="/client" element={<DashboardLayout allowedRoles={['CLIENT']} />}>
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="intakes/new" element={<NewIntake />} />
            <Route path="intakes" element={<ClientIntakeHistory />} />
            <Route path="cases/:id" element={<ClientCaseDetails />} />
            <Route path="cases/:id/rate" element={<RateService />} />
            <Route path="profile" element={<ClientProfile />} />
            <Route path="logs" element={<ActivityLogs />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Protected Staff Routes */}
          <Route path="/staff" element={<DashboardLayout allowedRoles={['STAFF']} />}>
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="intakes/:id/review" element={<ReviewIntake />} />
            <Route path="logs" element={<ActivityLogs />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Protected Lawyer Routes */}
          <Route path="/lawyer" element={<DashboardLayout allowedRoles={['LAWYER']} />}>
            <Route path="dashboard" element={<LawyerDashboard />} />
            <Route path="cases/:id" element={<LawyerCaseDetails />} />
            <Route path="logs" element={<ActivityLogs />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<DashboardLayout allowedRoles={['ADMIN']} />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="logs" element={<ActivityLogs />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Root Redirect */}
          <Route path="/" element={<Navigate to="/auth/login" replace />} />

          {/* 404 - Redirect to Login (or auth check will handle it) */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
