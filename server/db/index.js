// import mysql from "mysql2";

// /** Connecting to the Data base */
// export default db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "arush123",
//   database: "task_system",
// });

// const q =
//   "INSERT INTO user (`task`, `description`, `assign`, `status`) VALUES(?)";
//   const values = ["task", "description", "assign", "status"];

// const values = [
//   req.body.task,
//   req.body.description,
//   req.body.assign,
//   req.body.status,
// ];
// db.query(ADD_TASK_QUERY, [values], (err, data) => {
//   if (err) return res.json(err);
//   return res.json("Tasks Added successfully");
// });

// db.query(GET_TASK_QUERY, (err, data) => {
//   if (err) {
//     //   return res.json(err);
//     console.error("Error retrieving to get tasks:", err);
//     return res.status(500).json({ error: "Server error" });
//   } else {
//     return res.status(200).json(data);
//   }
// });

// const taskId = req.params.id;
// // const q = "DELETE FROM user WHERE id = ?";

// if (!taskId || isNaN(taskId)) {
//   return res.status(400).json({ error: "Please provide a valid id" });
// }

// db.query(DELETE_TASK_QUERY, [taskId], (err, data) => {
//   if (err) return res.json(err);
//   return res.json("Task deleted successfully");
// });

// const taskId = req.params.id;

// // const q = "SELECT * FROM user WHERE id = ?";

// db.query(GRT_TASK_BY_ID_QUERY, [taskId], (err, data) => {
//   if (err) {
//     console.error("Error retrieving to get tasks:", err);
//     return res.status(500).json({ error: "Server error" });
//     //   return res.json(err);
//   } else {
//     // return res.json(data);
//     return res.status(200).json(data);
//   }
// });

// const taskId = req.params.id;

// const check = "SELECT * FROM user WHERE id = ?";
// console.log(check);
// db.query(check, [taskId], (err, data) => {
//   console.log(data);
//   if (data && data.length > 0) {
//     // const q =
//     //   "UPDATE user SET task = ?, description = ?, assign = ?, status = ? WHERE id = ?";

//     const values = [
//       req.body.task,
//       req.body.description,
//       req.body.assign,
//       req.body.status,
//     ];

//     db.query(UPDATE_TASK_QUERY, [...values, taskId], (err, data) => {
//       if (err) {
//         console.error("Error retrieving to get tasks:", err);
//         return res.status(500).json({ error: "Server error" });
//         //   return res.json(err);
//       } else {
//         return res.status(200).json("Task Updated successfully");
//         // return res.json("Task Updated successfully");
//       }
//     });
//   } else {
//     return res.status(404).json({ error: "Task ID not found" });
//   }
// });
