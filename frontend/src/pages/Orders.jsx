import { useEffect, useState } from "react";
import "../css/Cart.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      console.log("No user found");
      return;
    }

    fetch(`http://localhost:5001/api/orders/myorders/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("ORDERS DATA:", data);
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.log(err));
  }, []);

 
  async function handleCancelOrder(orderId) {
    try {
      const res = await fetch(
        `http://localhost:5001/api/orders/${orderId}/cancel`,
        {
          method: "PUT"
        }
      );

      const data = await res.json();
      console.log("CANCEL RESPONSE:", data);

      alert("Order cancelled...");

     
      setOrders((prev) =>
        prev.filter((order) => order._id !== orderId)
      );

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="cart-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>

          
            <h3>Status: {order.status}</h3>

            <div className="cart-list">

              <div className="cart-item">

               
                <img
                  src={order.image}
                  alt={order.name}
                  style={{ width: "100px" }}
                />

              
                <h3>{order.name}</h3>

                <p>₹{order.price}</p>

                
                <p>Qty: {order.quantity}</p>

                
                {order.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px",
                      marginTop: "10px"
                    }}
                  >
                    Cancel Order
                  </button>
                )}

              </div>
            </div>

            
            <h2>Total: ₹{order.totalPrice}</h2>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;