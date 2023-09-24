export const ADD_TASK_QUERY =
  "INSERT INTO user (`task`, `description`, `assign`, `status`) VALUES(?)";

export const GET_TASK_QUERY = "SELECT * FROM user";

export const DELETE_TASK_QUERY = "DELETE FROM user WHERE id = ?";

export const GRT_TASK_BY_ID_QUERY = "SELECT * FROM user WHERE id = ?";

export const UPDATE_TASK_QUERY =
  "UPDATE user SET task = ?, description = ?, assign = ?, status = ? WHERE id = ?";

export const GET_STATUS_QUERY = "SELECT * FROM user WHERE status = ?";
