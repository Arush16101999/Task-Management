import React from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const TaskTable = (props) => {
  const { handleDeleteTask, filteredTasks } = props;
  return (
    <Table bordered hover variant="dark">
      <thead>
        <tr>
          <th>Task</th>
          <th>Description</th>
          <th>Status</th>
          <th>Assign To</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredTasks.map((task, index) => (
          <tr key={index}>
            <td>{task.task}</td>
            <td>{task.description}</td>
            <td>
              <Badge
                bg={
                  task.status === "Done"
                    ? "info"
                    : task.status === "Active"
                    ? "success"
                    : "warning"
                }
              >
                {task.status}
              </Badge>
            </td>
            <td>{task.assign}</td>
            <td>
              <Link to={`/updateTask/${task.id}`}>
                <Button variant="primary">Edit</Button>
              </Link>{" "}
              <Button
                variant="danger"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskTable;
