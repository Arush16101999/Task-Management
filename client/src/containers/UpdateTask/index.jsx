import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
const UpdateTask = () => {
  const [task, setTask] = useState({
    task: "",
    description: "",
    assign: "",
    status: "",
  });

  const navigate = useNavigate();

  // get the ID
  const location = useLocation();
  const taskId = location.pathname.split("/")[2];

  useEffect(() => {
    getTaskById();
  }, []);

  // get the task by ID
  const getTaskById = async () => {
    const data = await axios
      .get(`http://localhost:5000/tasks/getById/${taskId}`)
      .then((res) => {
        console.log(res);
        setTask(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setTask((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/tasks/${taskId}`,
        task
      );
      setTask({ ...res.data });
      console.log(res);
      navigate("/");
    } catch (err) {
      console.log(err);
      //    setError(true);
    }
  };

  return <div>Update</div>;
};

export default UpdateTask;
