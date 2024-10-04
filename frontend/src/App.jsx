import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Jobs from "./pages/Jobs"
import Browser from "./pages/Browser"
import Profile from "./pages/Profile"
import JobDescription from "./pages/JobDescription"
function App() {
 

  return (
    <>
      <Router>
         
          <Routes>
           <Route path="/" element={<Layout></Layout>}>
              <Route index element={<Home></Home>}></Route>
            </Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/browser" element={<Browser></Browser>}></Route>
            <Route path="/jobs" element={<Jobs></Jobs>}></Route>
            <Route path="/jobs/description/:id" element={<JobDescription></JobDescription>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
          </Routes>
       
      </Router>
       
    </>
  )
}

export default App
