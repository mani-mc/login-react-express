import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../src/pages/Login"
import Dashboard from "../src/pages/Dashboard"
import "./App.css"


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}> </Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
