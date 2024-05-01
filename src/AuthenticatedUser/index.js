import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

function AuthenticatedUser({ children, user }) {
  const location = useLocation();
  const navigation = useNavigate();
  const isAuthenticated = sessionStorage.getItem("jwtToken");

  const onClickLogOut = () => {
    sessionStorage.removeItem("jwtToken");
    navigation("/");
  };

  if (isAuthenticated) {
    if (user === undefined) {
      return (
        <div className="home-container">
          <div className="home-card">
            <p>Do you want to Logout?</p>
            <button className="choose-button" onClick={onClickLogOut}>
              Yes
            </button>
          </div>
        </div>
      );
    }
    return (
      <Navigate to={`/${user}/portal`} state={{ from: location }} replace />
    );
  }

  return children;
}

export default AuthenticatedUser;
