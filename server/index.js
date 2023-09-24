import express from "express";
import cors from "cors";
import mysql from "mysql2";
import {
  ADD_TASK_QUERY,
  DELETE_TASK_QUERY,
  GET_STATUS_QUERY,
  GET_TASK_QUERY,
  GRT_TASK_BY_ID_QUERY,
  UPDATE_TASK_QUERY,
} from "./query/index.js";

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
app.get("/tasks", async (req, res) => {
  //   const q = "SELECT * FROM user";
  try {
    const data = await new Promise((resolve, reject) => {
      db.query(GET_TASK_QUERY, (err, data) => {
        if (err) {
          console.error("Error retrieving to get tasks:", err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

/**Add Task API*/
app.post("/tasks/add", async (req, res) => {
  //creating post request to add data to the database

  try {
    const values = [
      req.body.task,
      req.body.description,
      req.body.assign,
      req.body.status,
    ];

    await new Promise((resolve, reject) => {
      db.query(ADD_TASK_QUERY, [values], (err, data) => {
        if (err) {
          console.error("Error adding task:", err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    return res.json("Task added successfully");
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

/**Delete Task API*/
app.delete("/tasks/delete/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!taskId || isNaN(taskId)) {
      return res.status(400).json({ error: "Please provide a valid ID" });
    }

    await new Promise((resolve, reject) => {
      db.query(DELETE_TASK_QUERY, [taskId], (err, data) => {
        if (err) {
          console.error("Error deleting task:", err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    return res.json("Task deleted successfully");
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

/**Get Task By ID API*/
app.get("/tasks/getById/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    // Ensure taskId is a valid number
    if (!taskId || isNaN(taskId)) {
      return res.status(400).json({ error: "Please provide a valid task ID" });
    }

    const data = await new Promise((resolve, reject) => {
      db.query(GRT_TASK_BY_ID_QUERY, [taskId], (err, data) => {
        if (err) {
          console.error("Error retrieving task by ID:", err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving task by ID:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

/**Update Task API*/
app.put("/tasks/update/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const check = "SELECT * FROM user WHERE id = ?";
    console.log(check);

    // Check if the task with the provided ID exists
    const existingTask = await new Promise((resolve, reject) => {
      db.query(check, [taskId], (err, data) => {
        if (err) {
          console.error("Error checking task existence:", err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    if (existingTask && existingTask.length > 0) {
      const values = [
        req.body.task,
        req.body.description,
        req.body.assign,
        req.body.status,
      ];

      await new Promise((resolve, reject) => {
        db.query(UPDATE_TASK_QUERY, [...values, taskId], (err, data) => {
          if (err) {
            console.error("Error updating task:", err);
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

      return res.status(200).json("Task Updated successfully");
    } else {
      return res.status(404).json({ error: "Task ID not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

/**Tracking Task By Status API*/
app.get("/tasks/get-status/:status", (req, res) => {
  const status = req.params.status;

  // const q = "SELECT * FROM user WHERE status = ?";

  db.query(GET_STATUS_QUERY, [status], (err, data) => {
    if (err) {
      console.error("Error retrieving to get tasks:", err);
      return res.status(500).json({ error: "Server error" });
      // return res.json(err);
    } else {
      return res.status(200).json(data);
      // return res.json(data);
    }
  });
});
