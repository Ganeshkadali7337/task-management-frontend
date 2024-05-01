import { Component } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Navbar from "../NavBar";
import TaskCard from "../TaskCard";

import axios from "axios";
import "./index.css";

const MainPortal = () => {
  const navigate = useNavigate();
  return <Portal navigate={navigate} />;
};
class Portal extends Component {
  state = {
    isGetProfile: false,
    tasks: [],
    failed: false,
    errMsg: "",
    role: "",
  };
  getProfile = async () => {
    const token = sessionStorage.getItem("jwtToken");
    await axios
      .get("https://task-managment-backend-e9sz.onrender.com/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        const tasks = res.data.tasks;
        const role = res.data.role;
        this.setState({ isGetProfile: true, tasks: tasks, role: role });
      })
      .catch((err) => {
        console.log(err);
        let error = err.response.status;
        console.log(error);
        let msg = error === 400 ? "Un Authorized" : err.response.data;
        this.setState({
          isGetProfile: true,
          failed: true,
          errMsg: msg,
        });
      });
  };

  addUser = async () => {
    const { navigate } = this.props;
    navigate("/user/registration");
  };

  componentDidMount() {
    this.getProfile();
  }

  renderAddUserCard = () => (
    <div className="add-user-card">
      <p className="para1">Add Users To Assign Tasks</p>
      <button onClick={this.addUser} className="add-user-btn">
        Add User
      </button>
    </div>
  );

  renderStatusReport = () => {
    const { tasks, role } = this.state;
    const totalTasks = tasks.length;
    const pending = tasks.filter((each) => each.status === "Pending");
    const completed = tasks.filter((each) => each.status === "Completed");
    const inProgress = tasks.filter((each) => each.status === "InProgress");
    return (
      <div className="report-card">
        <p className="para2">
          Total tasks: <span className="count">{totalTasks}</span>
        </p>
        <p className="para2">
          Pending: <span className="count-pending">{pending.length}</span>
        </p>
        <p className="para2">
          InProgress:{" "}
          <span className="count-inprogress">{inProgress.length}</span>
        </p>
        <p className="para2">
          Completed: <span className="count-completed">{completed.length}</span>
        </p>
      </div>
    );
  };

  changeStatus = async (value, id) => {
    const token = sessionStorage.getItem("jwtToken");
    await axios
      .put(
        `https://task-managment-backend-e9sz.onrender.com/tasks/${id}`,
        {
          status: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({ isGetProfile: false }, this.getProfile);
        alert("status updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addTask = () => {
    const { navigate } = this.props;
    navigate("/addTask");
  };

  onDeleteTask = async (id) => {
    const token = sessionStorage.getItem("jwtToken");
    await axios
      .delete(`https://task-managment-backend-e9sz.onrender.com/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ isGetProfile: false }, this.getProfile);
        alert("Task Deleted Successfully.");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isGetProfile: false }, this.getProfile);
        alert(err.response.data);
      });
  };

  render() {
    const { isGetProfile, tasks, role, failed, errMsg } = this.state;
    console.log(tasks, role);
    return (
      <div className="main">
        {!isGetProfile ? (
          <div className="spinner">
            <TailSpin
              height="50"
              width="50"
              color="black"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div>
            {!failed ? (
              <div className="portal-main-container">
                <Navbar />
                <div className="content">
                  {role === "ADMIN" && this.renderAddUserCard()}
                  <div className="add-task-continer">
                    <h1 className="heading">MyTasks</h1>
                    {role === "ADMIN" && (
                      <button className="add-task-btn" onClick={this.addTask}>
                        {" "}
                        Add Task
                      </button>
                    )}
                  </div>
                  <div className="task-list-container">
                    {tasks.length === 0 && (
                      <h1 className="heading2">
                        No Tasks {role === "ADMIN" ? "Added" : "Assigned"}
                      </h1>
                    )}
                    <ul className="task-list">
                      {tasks.map((each) => (
                        <TaskCard
                          onDeleteTask={this.onDeleteTask}
                          changeStatus={this.changeStatus}
                          data={each}
                          key={each._id}
                          role={role}
                        />
                      ))}
                    </ul>
                  </div>
                  {this.renderStatusReport()}
                </div>
              </div>
            ) : (
              <h1>{errMsg}</h1>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default MainPortal;
