import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./assets/Navbar";
import AddStudent from "./Student/AddStudent";
import Students from "./Student/Students";
import Depts from "./Departments/Depts";
import AddDepts from "./Departments/AddDepts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Students />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/departments" element={<Depts />} />
          <Route path="/add-department" element={<AddDepts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
