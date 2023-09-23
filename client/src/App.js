import "./App.css";
import TaskManagement from "./containers/TaskManagement";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTask from "./containers/AddTask";
import UpdateTask from "./containers/UpdateTask";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <NavBar /> */}
        {/* <TaskManagement /> */}
        <Toaster position="bottom-right" reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={TaskManagement} />
            <Route path="/addTask" Component={AddTask} />
            <Route path="/updateTask/:id" Component={UpdateTask} />
          </Routes>
        </BrowserRouter>
        {/* <TaskManagement /> */}
      </header>
    </div>
  );
}

export default App;
