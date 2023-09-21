import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();

// allows to use json data in express
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is Arushan from backend");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// Connecting to the Data base
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "arush123",
  database: "task_system",
});

/**Get All the Task from the database API */
app.get("/tasks", (req, res) => {
  const q = "SELECT * FROM user";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

/**Add Task API*/
app.post("/tasks/add", (req, res) => {
  const q =
    "INSERT INTO user (`task`, `description`, `assign`, `status`, `priority`) VALUES(?)";
  //   const values = ["task", "description", "assign", "status"];
  //creating post request to add data to the database
  const values = [
    req.body.task,
    req.body.description,
    req.body.assign,
    req.body.status,
    req.body.priority,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Tasks Added successfully");
  });
});

/**Delete Task API*/
app.delete("/tasks/delete/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "DELETE FROM user WHERE id = ?";

  db.query(q, [taskId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Task deleted successfully");
  });
});

/**Get Task By ID API*/
app.get("/tasks/getById/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "SELECT * FROM user WHERE id = ?";

  db.query(q, [taskId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

/**Update Task API*/
app.put("/tasks/update/:id", (req, res) => {
  const taskId = req.params.id;
  const q =
    "UPDATE user SET task = ?, description = ?, assign = ?, status = ?, priority=? WHERE id = ?";
  const values = [
    req.body.task,
    req.body.description,
    req.body.assign,
    req.body.status,
    req.body.priority,
  ];

  db.query(q, [...values, taskId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Task Updated successfully");
  });
});

/**Tracking Task By Status API*/
app.get("/tasks/get-status/:status", (req, res) => {
  const status = req.params.status;
  const q = "SELECT * FROM user WHERE status = ?";

  db.query(q, [status], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
