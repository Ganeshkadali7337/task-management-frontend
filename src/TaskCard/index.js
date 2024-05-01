import { GoDotFill } from "react-icons/go";
import "./index.css";

const TaskCard = (props) => {
  const { data, role, changeStatus, onDeleteTask } = props;
  const {
    _id,
    title,
    assignedBy,
    status,
    createdAt,
    description,
    assigneeName,
  } = data;
  const myDate = new Date(createdAt);
  const date = myDate.getDate();
  const month = myDate.getMonth();
  const year = myDate.getFullYear();
  const onChnageStatus = (e) => {
    changeStatus(e.target.value, _id);
  };

  const onClickDelete = () => {
    onDeleteTask(_id);
  };

  return (
    <li>
      <div className="task-card-container">
        <div className="container2">
          <GoDotFill className={`dot ${status}`} />
          <div>
            <h1 className="para3">{title}</h1>
            {role === "ADMIN" ? (
              <p className="para4">
                created at: {date}-{month}-{year}
              </p>
            ) : (
              <p className="para3">Assignedby: {assignedBy}</p>
            )}
            <details className="details">
              <summary>Description</summary>
              <p>{description}</p>
            </details>
          </div>
        </div>
        <div className="container3">
          {role === "ADMIN" ? (
            <div className="status-containner">
              <p className="para4">Status: {status}</p>
              <p className="para3">assigned to: {assigneeName}</p>
            </div>
          ) : (
            <div>
              <select
                onChange={onChnageStatus}
                className="select"
                name="status"
                value={status}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">InProgress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}
          {role === "ADMIN" ? (
            <button onClick={onClickDelete} className="delete-task-btn">
              Delete
            </button>
          ) : (
            <p className="para4">
              createdAt: {date}-{month}-{year}
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
