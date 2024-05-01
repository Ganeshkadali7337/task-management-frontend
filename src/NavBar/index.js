import { useNavigate } from "react-router-dom";
import "./index.css";

const Navbar = (props) => {
  const { user } = props;
  const navigate = useNavigate();
  const onClickLogout = () => {
    sessionStorage.removeItem("jwtToken");
    navigate("/", { replace: true });
  };
  return (
    <div className="nav-container">
      <p className="logo">TaskManagement</p>
      <div className="log-container">
        <button className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
