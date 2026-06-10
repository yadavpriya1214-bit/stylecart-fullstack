import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/ProductDetails.css";

function ProductDetails({ setCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);


async function handleAddToCart() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  await fetch("http://localhost:5001/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
     user: user._id,
  product: product._id,
  name: product.name,
  price: product.price,
  image: product.image,
  quantity: 1
    })
  });

  alert("Added to cart.....");
}

  function handlePlaceOrder() {
    alert("Order Placed Successfully!");
  }

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="product-page">

      <div className="image-section">
        <img
          src={
            product.image?.startsWith("http")
              ? product.image
              : `http://localhost:5001/images/${product.image}`
          }
          alt={product.name}
        />
      </div>

      <div className="details-section">
        <h1>{product.name}</h1>

        <h2 className="price">₹{product.price}</h2>

        <p className="desc">{product.description}</p>
 
        <button className="cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <button className="order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;