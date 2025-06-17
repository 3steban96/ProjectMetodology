import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow">
      <div className="text-xl font-bold">ProjectMetodology</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/projects" className="hover:text-blue-400">Proyectos</Link>
      </div>
    </nav>
  )
}
