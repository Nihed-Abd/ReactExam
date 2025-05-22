import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1>Gestion de Projets</h1>
        <ul className="nav-links">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/projects/add">Add Project</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
