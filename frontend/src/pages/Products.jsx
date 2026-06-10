import "../css/Products.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Products({ setCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  
  function handleAddToCart(product) {
    if (!setCart) return;

    setCart((prev) => {
      const exist = prev.find((item) => item._id === product._id);

      if (exist) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });

    alert("Added to cart....");
  }


function handlePlaceOrder() {
alert("Order Placed Successfully!!!!");
}

  return (
    <div className="container">
      <h1 className="heading">Products</h1>

      <div className="grid">
        {products.map((item) => (
          <div key={item._id} className="card">

           
            <Link to={`/product/${item._id}`}>
              <img
                  src={item.image}
                  alt={item.name}
                  className="image"
                />
            </Link>

           
            <h3>
              <Link
                to={`/product/${item._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {item.name}
              </Link>
            </h3>

           
            <p className="price">₹{item.price}</p>

          
            <button
  className="button"
  onClick={() => handleAddToCart(item)}
>
  Add to Cart
</button>

<button
  className="order-btn"
  onClick={handlePlaceOrder}
>
  Place Order
</button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;