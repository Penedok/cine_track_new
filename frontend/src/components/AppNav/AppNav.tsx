import { NavLink } from "react-router-dom";

export default function AppNav() {
  return (
    <nav className="cine-nav" aria-label="Navegação principal">
      <div className="cine-nav-inner">
        {/* <NavLink to="/" className="cine-nav-brand">
          Cine Tracker
        </NavLink> */}

        <div className="cine-nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `cine-nav-link${isActive ? " is-active" : ""}`
            }
          >
            Biblioteca
          </NavLink>
          <NavLink
            to="/sessoes"
            className={({ isActive }) =>
              `cine-nav-link${isActive ? " is-active" : ""}`
            }
          >
            Sessões
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
