import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {
  return <h2>Access Denied....</h2>;
}

  useEffect(() => {
    fetch("http://localhost:5001/api/orders/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("ALL ORDERS:", data);
        setOrders(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateStatus = async (id, status) => {
  try {
    await fetch(
      `http://localhost:5001/api/orders/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      }
    );

    
    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status } : o
      )
    );

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel - Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
  key={order._id}
  style={{
    border: "1px solid #ccc",
    margin: "10px",
    padding: "10px"
  }}
>
  <p>User: {order.user?.name}</p>
  <p>Email: {order.user?.email}</p>
  <h3>{order.name}</h3>
  <p>Price: ₹{order.price}</p>
  <p>Qty: {order.quantity}</p>

  <p>Status: {order.status}</p>

  <img
    src={order.image}
    alt={order.name}
    width="100"
  />

  <br /><br />

 <button
  style={{ display: "block", marginTop: "10px", background: "red", color: "white" }}
  onClick={() => updateStatus(order._id, "Shipped")}
>
  Ship
</button>

  <button onClick={() => updateStatus(order._id, "Delivered")}>
    Deliver
  </button>

  <button onClick={() => updateStatus(order._id, "Cancelled")}>
    Cancel
  </button>

</div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;