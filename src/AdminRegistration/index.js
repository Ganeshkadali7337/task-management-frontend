import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const AdminRegistration = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwtToken");

  if (token !== null) {
    console.log("triggered");
    return <Navigate to="/admin/portal" replace />;
  }
  return <Registration navigate={navigate} />;
};

class Registration extends Component {
  state = {
    isLoading: false,
    userName: "",
    mail: "",
    password: "",
    confirmPassword: "",
    Msg: "",
  };

  addUserToDb = async () => {
    const { userName, password, confirmPassword } = this.state;
    //this.setState({ isLoading: true });
    const userDetails = {
      userName,
      password,
      confirmPassword,
    };
    await axios
      .post(
        "https://task-managment-backend-e9sz.onrender.com/admin/register",
        userDetails
      )
      .then((res) => {
        this.setState({
          isLoading: false,
          Msg: `${res.data} please Login `,
          userName: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          Msg: err.response.data,
          userName: "",
          password: "",
          confirmPassword: "",
        });
      });
  };

  onSubmitRegistrationForm = (e) => {
    e.preventDefault();
    const { userName, password, confirmPassword } = this.state;
    if ((userName || password || confirmPassword) === "") {
      this.setState({ Msg: "*enter correct details" });
    } else {
      this.setState({ isLoading: true, Msg: "" }, this.addUserToDb);
    }
  };

  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  };

  onChangePass = (e) => {
    this.setState({ password: e.target.value });
  };

  onChangeConf = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  onClickLog = () => {
    const { navigate } = this.props;
    navigate("/admin/login");
  };

  render() {
    const { isLoading, userName, password, confirmPassword, Msg } = this.state;
    return (
      <div className="home-container">
        <h1>Admin</h1>
        <div className="log-card-container">
          <form className="reg-card" onSubmit={this.onSubmitRegistrationForm}>
            <label htmlFor="name">USER NAME:</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your userName"
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
            <label htmlFor="conf">CONFIRM PASSWORD:</label>
            <input
              id="conf"
              type="password"
              placeholder="Confirm your password"
              className="input-el"
              onChange={this.onChangeConf}
              value={confirmPassword}
            />
            <p
              className={
                Msg.includes("successfully") ? "err-msg green" : "err-msg red"
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
                Register
              </button>
            )}

            <p>Already Registered?</p>
          </form>

          <button onClick={this.onClickLog} className="log-button">
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default AdminRegistration;
