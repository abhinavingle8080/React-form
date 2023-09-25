import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";

function App() {
  return (
      <>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path={"/register"} element={<StudentForm/>}/>
            <Route path={"/list"} element={<StudentList/>}/>
            <Route path={"/login"} element={<LoginPage/>}/>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
