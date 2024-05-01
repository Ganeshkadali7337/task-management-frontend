import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const AddTask = () => {
  const navigate = useNavigate();
  return <Registration navigate={navigate} />;
};

class Registration extends Component {
  state = {
    isLoading: false,
    title: "",
    description: "",
    asigneeId: "",
    Msg: "",
    users: [],
    role: "",
    isGettingProfile: false,
  };

  addTaskToDb = async () => {
    const { title, description, asigneeId } = this.state;
    //this.setState({ isLoading: true });
    const token = sessionStorage.getItem("jwtToken");

    const taskDetails = {
      title,
      description,
      assigneeId: asigneeId,
    };
    console.log(taskDetails);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios
      .post(
        "https://task-managment-backend-e9sz.onrender.com/tasks",
        taskDetails,
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          isLoading: false,
          Msg: `${res.data} `,
          title: "",
          description: "",
          asigneeId: "",
        });
        alert(res.data);
        const { navigate } = this.props;
        navigate("/mainPortal");
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
        alert(err.message);
      });
  };

  onSubmitRegistrationForm = (e) => {
    e.preventDefault();
    const { title, description, asigneeId } = this.state;
    if ((title || description || asigneeId) === "") {
      this.setState({ Msg: "*enter correct details" });
    } else if (asigneeId === "select user") {
      this.setState({ Msg: "*enter correct details" });
    } else {
      this.setState({ isLoading: true, Msg: "" }, this.addTaskToDb);
    }
  };

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  onChangeAssignee = (e) => {
    console.log(e.target.value);
    this.setState({ asigneeId: e.target.value });
  };

  getUsers = async () => {
    const token = sessionStorage.getItem("jwtToken");
    await axios
      .get("https://task-managment-backend-e9sz.onrender.com/userProfiles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.filteredUsers.length === 0) {
          alert(
            "you are not added any user, please add the users to assign the task for them"
          );
          const { navigate } = this.props;
          navigate("/mainPortal");
        } else {
          this.setState({
            users: res.data.filteredUsers,
            role: res.data.role,
            isGettingProfile: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          Msg: err.message,
          isGettingProfile: false,
        });
      });
  };

  componentDidMount() {
    this.setState({ isGettingProfile: true }, this.getUsers);
  }

  render() {
    const {
      isLoading,
      title,
      description,
      asigneeId,
      Msg,
      role,
      users,
      isGettingProfile,
    } = this.state;
    return (
      <div className="home-container">
        {isGettingProfile ? (
          <TailSpin
            height="30"
            width="30"
            color="black"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <div className="home-container">
            {role === "ADMIN" ? (
              <div>
                <h1>Add Task</h1>
                <div className="log-card-container">
                  <form
                    className="reg-card"
                    onSubmit={this.onSubmitRegistrationForm}
                  >
                    <label htmlFor="name">TITLE:</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="title"
                      className="input-el"
                      onChange={this.onChangeTitle}
                      value={title}
                    />
                    <label htmlFor="pass">Description:</label>
                    <input
                      id="pass"
                      type="text"
                      placeholder="description"
                      className="input-el"
                      onChange={this.onChangeDescription}
                      value={description}
                    />
                    <label htmlFor="conf">ASSIGN TO:</label>
                    <select
                      onChange={this.onChangeAssignee}
                      id="conf"
                      value={asigneeId}
                    >
                      <option>select user</option>
                      {users.map((each) => (
                        <option key={each._id} value={each._id}>
                          {each.userName}
                        </option>
                      ))}
                    </select>
                    <p
                      className={
                        Msg.includes("successfully")
                          ? "err-msg green"
                          : "err-msg red"
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
                        Add Task
                      </button>
                    )}
                  </form>
                </div>
              </div>
            ) : (
              <h1>Un Authorized</h1>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default AddTask;
