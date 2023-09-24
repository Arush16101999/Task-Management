import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Container from "react-bootstrap/Container";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const AddTask = () => {
  const [task, setTask] = useState({
    task: "",
    description: "",
    assign: "",
    status: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTaskById(id);
      // axios
      //   .get(`http://localhost:5000/tasks/getById/${id}`)
      //   .then((res) => {
      //     console.log(res);
      //     setTask({ ...res.data[0] });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }, [id]);

  // get the task by ID
  const getTaskById = async (id) => {
    const data = await axios
      .get(`http://localhost:5000/tasks/getById/${id}`)
      .then((res) => {
        console.log(res);
        setTask(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    // debugger;
    setTask((prev) => ({ ...prev, [event.target.name]: event.target.value }));
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
        if (!id) {
          await axios.post("http://localhost:5000/tasks/add", task);
          toast.success("Task Successfully Added!");
          setTask({ task: "", description: "", assign: "", status: "" });
          // navigate("/");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          const res = await axios.put(
            `http://localhost:5000/tasks/update/${id}`,
            task
          );
          setTask({ ...res.data });
          toast.success("Task Successfully Updated!");
          console.log(res);
          navigate("/");
        }
      } else {
        toast.error("Please enter the empty fields");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  };

  // const handleSubmit = async (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     setValidated(true);
  //   }

  //   try {
  //     if (task.status) {
  //       axios.post("http://localhost:5000/tasks/add", task);
  //       setTask({ ...task });
  //       toast.success("Successfully toasted!");
  //     } else {
  //       toast.error("Please add status");
  //     }

  //     // navigate("/");
  //   } catch (err) {
  //     toast.error("This didn't work.");
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <Container>
        <h3>Add Task</h3>
        <br />
        <Form noValidate onSubmit={handleClick}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" />
            <Form.Group as={Col} md="4" controlId="task">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="task"
                placeholder="Task Title"
                defaultValue={task.task || ""}
                onChange={handleChange}
              />
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
                defaultValue={task.description || ""}
                onChange={handleChange}
                rows={3}
              />
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
                value={task.status || ""}
              >
                <option value="">Select Status </option>
                <option value="Active">Active</option>
                <option value="Done">Done</option>
                <option value="Backlog">Backlog</option>
              </Form.Select>
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
                defaultValue={task.assign || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Button variant="success" type="submit">
            {id ? "Update Task" : "Add Task"}
          </Button>{" "}
        </Form>
        <br />
        <Link to="/">
          <Button variant="outline-light">Go Back</Button>
        </Link>
      </Container>
    </div>
  );
};

export default AddTask;
