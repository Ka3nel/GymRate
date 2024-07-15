import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={Logo} height={75} />
            <h1>GymRate</h1>
          </div>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.username}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link style={{ color: "#0a62d0" }} to="/login">
                Login
              </Link>
              <Link style={{ color: "#0a62d0" }} to="/signup">
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
