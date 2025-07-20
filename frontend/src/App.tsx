import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  </BrowserRouter>
}

export default App
