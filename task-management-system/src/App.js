import React, { useState } from "react";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    description: "Task 1",
    assignee: "Mark Andonian",
    status: "In Progress",
    priority: 1,
    dueDate: "2023-07-31",
  },
  {
    id: 2,
    description: "Task 2",
    assignee: "Radina Trendafilova",
    status: "In Progress",
    priority: 4,
    dueDate: "2023-08-25",
  },
  {
    id: 3,
    description: "Task 3",
    assignee: "Nikolay Kaloyanov",
    status: "In Progress",
    priority: 2,
    dueDate: "2023-08-10",
  },
  {
    id: 4,
    description: "Task 4",
    assignee: "Ralica Goranoca",
    status: "In Progress",
    priority: 2,
    dueDate: "2023-09-20",
  },
];

const TaskManagementSystem = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setSelectedTask(null);
  };

  const handleTaskClick = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setSelectedTask(task);
  };

  const handleSaveTask = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate the form inputs manually
    if (
      !selectedTask.description ||
      !selectedTask.assignee ||
      !selectedTask.status ||
      !selectedTask.priority ||
      !selectedTask.dueDate
    ) {
      alert("Please fill all fields before saving the task.");
      return; // Abort the save process if any field is missing
    }

    if (selectedTask.dueDate === "Invalid Date") {
      alert("Please enter a valid due date.");
      return; // Abort the save process if the date is invalid
    }

    if (!selectedTask.id) {
      // If there's no selectedTask.id, it means we're creating a new task.
      const formData = {
        id: tasks.length + 1,
        description: selectedTask.description,
        assignee: selectedTask.assignee,
        status: selectedTask.status,
        priority: selectedTask.priority,
        dueDate: selectedTask.dueDate,
      };
      setTasks((prevTasks) => [...prevTasks, formData]);
    } else {
      // If there's a selectedTask.id, it means we're updating an existing task.
      const updatedTasks = tasks.map((task) =>
        task.id === selectedTask.id ? selectedTask : task
      );
      setTasks(updatedTasks);
    }

    setSelectedTask(null);
  };

  const handleClearTask = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1>Task Management System</h1>
      </div>
      {/* List Section */}
      <div className="content">
        <div className="content-list">
          <ul>
            {tasks.map((task) => (
              <li key={task.id} onClick={() => handleTaskClick(task.id)}>
                <p className="id">{task.id}</p>
                <p className="field1">{task.description}</p>
                <p className="field2">{task.assignee}</p>
                <p className="field3">{task.status}</p>
                <p className="field1">{task.priority}</p>
                <p className="field2">{task.dueDate}</p>
                <button
                  className="deleteButton"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Details Section */}
        <div className="content-details">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="inputs">
              <label>Description:</label>
              <input
                type="text"
                id="field1"
                value={selectedTask ? selectedTask.description : ""}
                required
                onChange={(e) =>
                  setSelectedTask((prevTask) => ({
                    ...prevTask,
                    description: e.target.value,
                  }))
                }
              />
              <label>Assignee:</label>
              <input
                type="text"
                id="field2"
                value={selectedTask ? selectedTask.assignee : ""}
                required
                onChange={(e) =>
                  setSelectedTask((prevTask) => ({
                    ...prevTask,
                    assignee: e.target.value,
                  }))
                }
              />
              <label>Status:</label>
              <input
                type="text"
                id="field3"
                value={selectedTask ? selectedTask.status : ""}
                required
                onChange={(e) =>
                  setSelectedTask((prevTask) => ({
                    ...prevTask,
                    status: e.target.value,
                  }))
                }
              />
              <label>Priority:</label>
              <input
                type="number"
                id="field4"
                value={selectedTask ? selectedTask.priority : ""}
                required
                onChange={(e) =>
                  setSelectedTask((prevTask) => ({
                    ...prevTask,
                    priority: parseInt(e.target.value),
                  }))
                }
              />
              <label>Due date:</label>
              <input
                type="date"
                id="field5"
                value={selectedTask ? selectedTask.dueDate : ""}
                required
                onChange={(e) =>
                  setSelectedTask((prevTask) => ({
                    ...prevTask,
                    dueDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="buttons">
              <button id="saveButton" type="submit" onClick={handleSaveTask}>
                Save
              </button>
              <button id="clearButton" onClick={handleClearTask}>
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Footer */}
      <div className="footer">
        <p>Some text, so the footer is not empty</p>
      </div>{" "}
    </div>
  );
};

export default TaskManagementSystem;
