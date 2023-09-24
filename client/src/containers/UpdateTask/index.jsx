// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";

// const UpdateTask = () => {
//   const [task, setTask] = useState({
//     task: "",
//     description: "",
//     assign: "",
//     status: "",
//   });

//   const navigate = useNavigate();

//   // get the ID
//   const location = useLocation();
//   const taskId = location.pathname.split("/")[2];

//   useEffect(() => {
//     // getTaskById();
//     axios
//       .get(`http://localhost:5000/tasks/getById/${taskId}`)
//       .then((res) => {
//         console.log(res);
//         setTask(res.data[0]);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [taskId]);

//   // get the task by ID
//   // const getTaskById = async () => {
//   //   const data = await axios
//   //     .get(`http://localhost:5000/tasks/getById/${taskId}`)
//   //     .then((res) => {
//   //       console.log(res);
//   //       setTask(res.data[0]);
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // };

//   const handleChange = (event) => {
//     setTask((prev) => ({
//       ...prev,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   const handleClick = async (event) => {
//     event.preventDefault();
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/tasks/update/${taskId}`,
//         task
//       );
//       setTask({ ...res.data });
//       toast.success("Successfully Updated!");
//       console.log(res);
//       navigate("/");
//     } catch (err) {
//       toast.error("Unable to Update");
//       console.log(err);
//       //    setError(true);
//     }
//   };

//   return (
//     <div>
//       <Container>
//         <h3>Add Task</h3>
//         <br />
//         <Form onSubmit={handleClick}>
//           <Row className="mb-3">
//             <Form.Group as={Col} md="4" />
//             <Form.Group as={Col} md="4" controlId="task">
//               <Form.Label>Task Title</Form.Label>
//               <Form.Control
//                 required
//                 type="text"
//                 name="task"
//                 placeholder="Task Title"
//                 defaultValue={task.task}
//                 onChange={handleChange}
//               />
//               <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//             </Form.Group>
//           </Row>
//           <Row className="mb-3">
//             <Form.Group as={Col} md="4" />
//             <Form.Group as={Col} md="4" controlId="description">
//               <Form.Label>Task Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 placeholder="Task Description"
//                 required
//                 name="description"
//                 defaultValue={task.description}
//                 onChange={handleChange}
//                 rows={3}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please provide a the Task Description.
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Row>
//           <Row className="mb-3">
//             <Form.Group as={Col} md="4" />
//             <Form.Group as={Col} md="4" controlId="status">
//               <Form.Label>Task Status</Form.Label>
//               <Form.Select
//                 name="status"
//                 size="lg"
//                 required
//                 onChange={handleChange}
//                 value={task.status || ""}
//               >
//                 <option value="">Select Status </option>
//                 <option value="Active">Active</option>
//                 <option value="Done">Done</option>
//                 <option value="Backlog">Backlog</option>
//               </Form.Select>
//               <Form.Control.Feedback type="invalid">
//                 Please Select Status.
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Row>
//           <Row className="mb-3">
//             <Form.Group as={Col} md="4" />
//             <Form.Group as={Col} md="4" controlId="assign">
//               <Form.Label>Assign</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Assign"
//                 aria-describedby="inputGroupPrepend"
//                 name="assign"
//                 defaultValue={task.assign}
//                 onChange={handleChange}
//                 required
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please Enter Assign Name.
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Row>
//           <Button variant="success" type="submit">
//             Update
//           </Button>{" "}
//         </Form>
//         <br />
//         <Link to="/">
//           <Button variant="outline-light">Go Back</Button>
//         </Link>
//         {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
//       </Container>
//     </div>
//   );
// };

// export default UpdateTask;
