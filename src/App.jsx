import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/dashboard/Dashboard'
import ProjectList from './pages/projects/ProjectList'

function App() {
  return (
    <Router>
      <Navbar />
      <main className="bg-white min-h-screen text-gray-800">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectList />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
