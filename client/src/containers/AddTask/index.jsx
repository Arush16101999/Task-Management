import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Container from "react-bootstrap/Container";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const AddTask = () => {
  const [task, setTask] = useState({
    task: "",
    description: "",
    assign: "",
    status: "",
  });

  const handleChange = (event) => {
    // debugger;
    setTask((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    // const name = e.target.name;
    // const value = e.target.value;
    // setTask({ ...task, [name]: value });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      if (
        task.status !== "" &&
        task.assign !== "" &&
        task.description !== "" &&
        task.task !== ""
      ) {
        axios.post("http://localhost:5000/tasks/add", task);
        toast.success("Successfully Added!");
        setTask({});
      } else {
        toast.error("Please enter the empty fields");
      }

      // navigate("/");
    } catch (err) {
      toast.error("This didn't work.");
      console.log(err);
    }
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }

    try {
      if (task.status) {
        axios.post("http://localhost:5000/tasks/add", task);
        setTask({ ...task });
        toast.success("Successfully toasted!");
      } else {
        toast.error("Please add status");
      }

      // navigate("/");
    } catch (err) {
      toast.error("This didn't work.");
      console.log(err);
    }
  };

  return (
    <div>
      <Container>
        <h3>Add Task</h3>
        <br />
        <Form noValidate validated={validated} onSubmit={handleClick}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" />
            <Form.Group as={Col} md="4" controlId="task">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="task"
                placeholder="Task Title"
                defaultValue={task.task}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" />
            <Form.Group as={Col} md="4" controlId="description">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Task Description"
                required
                name="description"
                defaultValue={task.description}
                onChange={handleChange}
                rows={3}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a the Task Description.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" />
            <Form.Group as={Col} md="4" controlId="status">
              <Form.Label>Task Status</Form.Label>
              <Form.Select
                name="status"
                size="lg"
                required
                onChange={handleChange}
              >
                <option value="">Select Status </option>
                <option value="Active">Active</option>
                <option value="Done">Done</option>
                <option value="Backlog">Backlog</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please Select Status.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" />
            <Form.Group as={Col} md="4" controlId="assign">
              <Form.Label>Assign</Form.Label>
              <Form.Control
                type="text"
                placeholder="Assign"
                aria-describedby="inputGroupPrepend"
                name="assign"
                defaultValue={task.assign}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please Enter Assign Name.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button variant="success" type="submit">
            Submit form
          </Button>{" "}
        </Form>
        <br />
        <Link to="/">
          <Button variant="outline-light">Go Back</Button>
        </Link>
        <Toaster position="bottom-right" reverseOrder={false} />
      </Container>
    </div>
  );
};

export default AddTask;
