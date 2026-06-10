import { Link } from "react-router-dom";
import "../css/Cart.css";

function Cart({ cart = [], setCart }) {

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);

  function handleRemove(indexToRemove) {
    setCart((prev) =>
      prev.filter((item, index) => index !== indexToRemove)
    );
  }

  function increaseQty(id) {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  }

  function decreaseQty(id) {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  }

async function handlePlaceOrder() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const cartItems = cart.map((item) => ({
    _id: item._id,
    name: item.name,
    price: item.price,
    image: item.image,
    qty: item.qty
  }));

  console.log("SENDING:", cartItems);

  try {
    const res = await fetch("http://localhost:5001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: user._id,
        cartItems
      })
    });

    const data = await res.json();
    console.log("RESPONSE:", data);

    if (res.ok) {
      alert("Order placed successfully 🎉");

      setCart([]);
      localStorage.removeItem("cart");

    } else {
      alert(data.message || "Order failed");
    }

  } catch (error) {
    console.log("ERROR:", error);
    alert("Server error");
  }
}

  return (
    <div className="cart-container">
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p className="empty">No items in cart</p>
      ) : (
        <>

          <div className="cart-list">
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>

                <Link to={`/product/${item._id}`}>
                  <img
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `http://localhost:5001/images/${item.image}`
                    }
                    alt={item.name}
                  />
                </Link>

                <h3>
                  <Link to={`/product/${item._id}`}>
                    {item.name}
                  </Link>
                </h3>

                <p>₹{item.price}</p>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item._id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>

              </div>
            ))}
          </div>

          <h2 className="total">Total: ₹{totalPrice}</h2>

          
          <button
            className="order-btn"
            onClick={handlePlaceOrder}
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Place Order
          </button>

        </>
      )}
    </div>
  );
}

export default Cart;