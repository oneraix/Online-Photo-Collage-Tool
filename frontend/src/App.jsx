import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Processing from "./pages/Processing"
import Result from "./pages/Result"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/processing/:taskId" element={<Processing />} />
        <Route path="/result/:taskId" element={<Result />} />
      </Routes>
    </Router>
  )
}
