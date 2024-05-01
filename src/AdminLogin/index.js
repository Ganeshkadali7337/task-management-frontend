import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtToken");
  if (token !== null) {
    return <Navigate to="/mainPortal" replace />;
  }
  return <Login navigate={navigate} />;
};

class Login extends Component {
  state = {
    isLoading: false,
    userName: "",
    password: "",
    Msg: "",
  };

  loginUser = async () => {
    const { userName, password } = this.state;
    //this.setState({ isLoading: true });
    const userDetails = {
      userName,
      password,
    };
    await axios
      .post(
        "https://task-managment-backend-e9sz.onrender.com/adminLogin",
        userDetails
      )
      .then(async (res) => {
        this.setState({
          isLoading: false,
          Msg: `Login successfull`,
          userName: "",
          password: "",
        });
        let token = await res.data.token;
        const { navigate } = this.props;
        sessionStorage.setItem("jwtToken", token);
        navigate("/mainPortal", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          Msg: err.response.data,
          userName: "",
          password: "",
        });
      });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const { userName, password } = this.state;
    if ((userName || password) === "") {
      this.setState({ Msg: "*enter correct details" });
    } else {
      this.setState({ isLoading: true, Msg: "" }, this.loginUser);
    }
  };

  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  };

  onChangePass = (e) => {
    this.setState({ password: e.target.value });
  };

  onClickReg = () => {
    const { navigate } = this.props;
    navigate("/admin/registration");
  };

  render() {
    const { isLoading, userName, password, Msg } = this.state;
    return (
      <div className="home-container">
        <h1>Admin</h1>
        <div className="log-card-container">
          <form className="reg-card" onSubmit={this.onSubmitForm}>
            <label htmlFor="gmail">USER NAME:</label>
            <input
              id="gmail"
              type="text"
              placeholder="Enter your gmail"
              className="input-el"
              onChange={this.onChangeUserName}
              value={userName}
            />
            <label htmlFor="pass">PASSWORD:</label>
            <input
              id="pass"
              type="password"
              placeholder="Enter your password"
              className="input-el"
              onChange={this.onChangePass}
              value={password}
            />
            <p
              className={
                Msg.includes("successfull") ? "err-msg green" : "err-msg red"
              }
            >
              {Msg}
            </p>
            {isLoading ? (
              <TailSpin
                height="30"
                width="30"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              <button type="submit" className="log-button">
                Login
              </button>
            )}

            <p>New Admin?</p>
          </form>

          <button onClick={this.onClickReg} className="log-button">
            Register Now
          </button>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
