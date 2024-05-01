import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AuthenticatedUser from "./AuthenticatedUser";
import AdminLogin from "./AdminLogin";
import AdminRegistration from "./AdminRegistration";
import ProtectedRoute from "./ProtectedRoute";
import MainPortal from "./MainPortal";
import UserLogin from "./UserLogin";
import UserRegistration from "./UserRegistration";
import AddTask from "./AddTask";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        exact
        path="/"
        element={
          <AuthenticatedUser>
            <Home />
          </AuthenticatedUser>
        }
      />
      <Route
        exact
        path="/admin/login"
        element={
          <AuthenticatedUser user="admin">
            <AdminLogin />
          </AuthenticatedUser>
        }
      />
      <Route
        exact
        path="/admin/registration"
        element={
          <AuthenticatedUser user="admin">
            <AdminRegistration />
          </AuthenticatedUser>
        }
      />
      <Route
        exact
        path="/user/registration"
        element={
          <ProtectedRoute user="user">
            <UserRegistration />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/user/login"
        element={
          <AuthenticatedUser user="user">
            <UserLogin />
          </AuthenticatedUser>
        }
      />
      <Route
        exact
        path="/mainPortal"
        element={
          <ProtectedRoute>
            <MainPortal />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/addTask"
        element={
          <ProtectedRoute>
            <AddTask />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<h1>Not Found.</h1>} />
    </Routes>
  </BrowserRouter>
);

export default App;
