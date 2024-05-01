import { Link } from "react-router-dom";

import "./index.css";

const Home = () => (
  <div className="home-container">
    <div className="home-card">
      <p className="signup-para">SIGN UP AS:</p>
      <Link to="/admin/login">
        <button className="choose-button">Admin</button>
      </Link>
      <p>OR</p>
      <Link to="/user/login">
        <button className="choose-button">User</button>
      </Link>
    </div>
  </div>
);

export default Home;
