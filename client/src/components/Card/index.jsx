import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";

const TaskCard = ({ task }) => {
  return (
    <Col xs={7} md={3}>
      <Card
        bg="dark"
        text="white"
        style={{ width: "18rem", height: "16rem" }}
        className="mb-5"
        border="light"
      >
        <Card.Body className="mb-2">
          <Card.Header>{task.task}</Card.Header>
          <Card.Text>{task.description}</Card.Text>
          <Card.Text>
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
          </Card.Text>
          <Card.Text>{task.assign}</Card.Text>
          {/* <Button variant="outline-success">Edit</Button>{" "}
          <Button variant="outline-danger">Delete</Button> */}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TaskCard;
