import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import TaskCard from "../../components/Card";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  // const [filterPriority, setFilterPriority] = useState("");

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const data = await axios.get("http://localhost:5000/tasks");
      if (data) {
        console.log(data);
        setTasks(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/delete/${id}`);
      getAllTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTasks = tasks.filter((track) => {
    return track.status.toLowerCase().includes(filterStatus.toLowerCase());
  });

  const handleChange = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <Container fluid>
      <Row>
        <Col>Task Management</Col>
      </Row>
      <Row>
        <Link to="/addTask">
          <Button variant="outline-light">Add Task</Button>
        </Link>
        <Col />
        <Col md={4}>
          <b>Filter By Status </b>
          <Select
            value={filterStatus}
            label="Status"
            // autoWidth
            sx={{ minWidth: 120 }}
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="backlog">Backlog</MenuItem>
          </Select>
        </Col>
      </Row>
      <Row>
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
      </Row>
      {/* <Row>
        {filteredTasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </Row> */}
    </Container>
  );
};

export default TaskManagement;
