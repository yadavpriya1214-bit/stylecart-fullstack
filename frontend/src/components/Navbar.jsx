import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/Navigation.css";

function Navigation({ cart = [] }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  }

  return (
    <nav className="nav">
      <h2 className="logo">StyleCart</h2>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/category/Women">Women</Link>
        <Link to="/category/Men">Men</Link>

        <Link to="/category/Kids">Kids</Link>
        <Link to="/category/Books">Books</Link>
        <Link to="/orders">My Orders</Link>

          {user?.role === "admin" && (
            <Link to="/admin/orders">Admin</Link>
          )}
                  

        <Link to="/cart">Cart ({cart.length})</Link>

        
        {user ? (
          <div className="profile-container">
            
           
            <div
              className="profile"
              onClick={() => setShowMenu(!showMenu)}
            >
               {user.name}
            </div>

           
            {showMenu && (
              <div className="dropdown">
                <p><strong>{user.name}</strong></p>
                <p>{user.email}</p>
                 <hr />

                <p onClick={handleLogout}>
                  Logout
                </p>
              </div>
            )}

          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navigation;